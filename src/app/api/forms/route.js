import { NextResponse } from "next/server";

// Always run on the server (Node runtime). The Apps Script URL + secret
// live only here and are never shipped to the browser.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX = {
  short: 160,
  email: 254,
  long: 4000,
  answer: 2200,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Keep only a string, trimmed and length-capped, to avoid abuse / junk rows.
const clean = (value, cap) =>
  typeof value === "string" ? value.trim().slice(0, cap) : "";

// Brand Discovery Questionnaire — the allow-list IS the schema. Anything the
// client sends that isn't named here is dropped, so a crafted payload can never
// inject extra columns into the sheet. Order mirrors
// components/questionnaire/questionnaireSchema.js and the Apps Script tab.
const QUESTIONNAIRE_FIELDS = [
  { key: "name", cap: MAX.short },
  { key: "email", cap: MAX.email },
  { key: "brand", cap: MAX.short },
  { key: "role", cap: MAX.short },
  { key: "websiteUrl", cap: MAX.short },
  { key: "phone", cap: MAX.short },
  { key: "vision", cap: MAX.answer },
  { key: "yearOneGoals", cap: MAX.answer },
  { key: "categories", cap: MAX.answer },
  { key: "usp", cap: MAX.answer },
  { key: "audience", cap: MAX.answer },
  { key: "consumerProblem", cap: MAX.answer },
  { key: "positioning", cap: MAX.short },
  { key: "priceRange", cap: MAX.short },
  { key: "channels", cap: MAX.short },
  { key: "channelsNote", cap: MAX.answer },
  { key: "budget", cap: MAX.short },
  { key: "priorityChannels", cap: MAX.short },
  { key: "brandAssets", cap: MAX.answer },
  { key: "kpis", cap: MAX.short },
  { key: "kpisNote", cap: MAX.answer },
  { key: "competitors", cap: MAX.answer },
  { key: "timelines", cap: MAX.answer },
  { key: "manufacturing", cap: MAX.short },
  { key: "importModel", cap: MAX.answer },
  { key: "opsSetup", cap: MAX.short },
  { key: "opsNote", cap: MAX.answer },
  { key: "partners", cap: MAX.answer },
];

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

  if (formType === "questionnaire") {
    const data = {};
    for (const f of QUESTIONNAIRE_FIELDS) {
      data[f.key] = clean(body[f.key], f.cap);
    }
    if (!data.name) return { error: "Name is required." };
    if (!EMAIL_RE.test(data.email)) return { error: "A valid email is required." };
    return { data };
  }

  return { error: "Unknown form." };
}

export async function POST(request) {
  let body;
  try {
    // Read as text first so an oversized payload is rejected before it is parsed.
    // The questionnaire is the largest legitimate form and sits well under 64KB.
    const raw = await request.text();
    if (raw.length > 96_000) {
      return NextResponse.json({ ok: false, error: "Payload too large." }, { status: 413 });
    }
    body = JSON.parse(raw);
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
    }
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

    // Apps Script answers 200 even when it rejects the payload (unknown form,
    // bad secret). Only treat it as a failure when the body clearly says so —
    // an unparseable body still counts as delivered, as it did before.
    const text = await res.text().catch(() => "");
    if (text) {
      try {
        const parsed = JSON.parse(text);
        if (parsed && parsed.ok === false) {
          console.error("[forms] Sheet webhook rejected:", parsed.error);
          return NextResponse.json(
            { ok: false, error: "Could not save your submission. Please try again." },
            { status: 502 }
          );
        }
      } catch {
        /* non-JSON body — treat as delivered, matching previous behaviour */
      }
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
