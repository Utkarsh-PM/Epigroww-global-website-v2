import { NextResponse } from "next/server";

// Always run on the server (Node runtime). The Apps Script URL + secret
// live only here and are never shipped to the browser.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX = {
  short: 160,
  email: 254,
  long: 4000,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Keep only a string, trimmed and length-capped, to avoid abuse / junk rows.
const clean = (value, cap) =>
  typeof value === "string" ? value.trim().slice(0, cap) : "";

function validate(formType, body) {
  if (formType === "contact") {
    const data = {
      topic: clean(body.topic, MAX.short),
      name: clean(body.name, MAX.short),
      email: clean(body.email, MAX.email),
      company: clean(body.company, MAX.short),
      role: clean(body.role, MAX.short),
      budget: clean(body.budget, MAX.short),
      brief: clean(body.brief, MAX.long),
    };
    if (!data.name) return { error: "Name is required." };
    if (!EMAIL_RE.test(data.email)) return { error: "A valid email is required." };
    return { data };
  }

  if (formType === "careers") {
    const data = {
      firstName: clean(body.firstName, MAX.short),
      lastName: clean(body.lastName, MAX.short),
      email: clean(body.email, MAX.email),
      craft: clean(body.craft, MAX.short),
      why: clean(body.why, MAX.long),
    };
    if (!data.firstName || !data.lastName) return { error: "Name is required." };
    if (!EMAIL_RE.test(data.email)) return { error: "A valid email is required." };
    return { data };
  }

  return { error: "Unknown form." };
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot — real users never fill this hidden field. Bots do. Pretend
  // success so the bot moves on, but store nothing.
  if (body && typeof body.company_website === "string" && body.company_website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const formType = body?.formType;
  const { data, error } = validate(formType, body || {});
  if (error) {
    return NextResponse.json({ ok: false, error }, { status: 400 });
  }

  const webhookUrl = process.env.GOOGLE_SHEETS_WEBAPP_URL;
  const secret = process.env.GOOGLE_SHEETS_SHARED_SECRET;

  if (!webhookUrl || !secret) {
    console.error("[forms] Missing GOOGLE_SHEETS_WEBAPP_URL or GOOGLE_SHEETS_SHARED_SECRET env vars.");
    return NextResponse.json(
      { ok: false, error: "Form is not configured yet. Please email us directly." },
      { status: 503 }
    );
  }

  const payload = {
    secret,
    formType,
    submittedAt: new Date().toISOString(),
    page: clean(body.page, MAX.short),
    data,
  };

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
      redirect: "follow",
    });
    clearTimeout(timeout);

    if (!res.ok) {
      console.error("[forms] Sheet webhook responded", res.status);
      return NextResponse.json(
        { ok: false, error: "Could not save your submission. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[forms] Sheet webhook failed:", err?.message || err);
    return NextResponse.json(
      { ok: false, error: "Could not save your submission. Please try again." },
      { status: 502 }
    );
  }
}
