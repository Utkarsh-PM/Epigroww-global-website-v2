"use client";
import { useState, useRef, useEffect } from "react";
import "./ApplyBar.scss";

export default function ApplyBar() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const thanksRef = useRef(null);

  // When the form is replaced by the (shorter) success card, the section
  // collapses and content below slides up — leaving the viewport scrolled
  // past the message. Keep the success card in view instead of jumping.
  useEffect(() => {
    if (sent && thanksRef.current) {
      thanksRef.current.scrollIntoView({ block: "center" });
    }
  }, [sent]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (sending) return;
    setError("");
    setSending(true);

    const fd = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "careers",
          firstName: fd.get("firstName") || "",
          lastName: fd.get("lastName") || "",
          email: fd.get("email") || "",
          craft: fd.get("craft") || "",
          why: fd.get("why") || "",
          company_website: fd.get("company_website") || "",
          page: typeof window !== "undefined" ? window.location.pathname : "/careers",
        }),
      });
      const out = await res.json().catch(() => ({}));
      if (!res.ok || !out.ok) {
        throw new Error(out.error || "Something went wrong. Please try again.");
      }
      setSent(true);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="apply" className="ab">
      <div className="ab-inner">
        <div className="ab-left">
          <span className="ab-label">— Don't see your role?</span>
          <h2 className="ab-heading">
            Share your profile.<br />
            We <span className="serif">keep it on file</span> for the next wave.
          </h2>
          <p className="ab-body">
            We open roles in waves — every quarter. If you're the kind of person who'd be a hire before there's a job title for you, drop us a note.
          </p>
        </div>

        <div className="ab-right">
          {!sent ? (
            <form className="ab-form" onSubmit={onSubmit}>
              <div className="ab-field">
                <label>First name</label>
                <input name="firstName" type="text" required />
              </div>
              <div className="ab-field">
                <label>Last name</label>
                <input name="lastName" type="text" required />
              </div>
              <div className="ab-field ab-field-wide">
                <label>Email</label>
                <input name="email" type="email" required />
              </div>
              <div className="ab-field ab-field-wide">
                <label>What do you do?</label>
                <select name="craft" required defaultValue="">
                  <option value="" disabled>Select a craft</option>
                  <option>Media buying</option>
                  <option>Performance creative</option>
                  <option>Brand / film</option>
                  <option>Engineering</option>
                  <option>Data & analytics</option>
                  <option>Ops / PMO</option>
                  <option>Something else</option>
                </select>
              </div>
              <div className="ab-field ab-field-wide">
                <label>Why Epigroww?</label>
                <textarea name="why" rows="4" placeholder="One paragraph beats five."></textarea>
              </div>
              <input
                type="text"
                name="company_website"
                tabIndex="-1"
                autoComplete="off"
                aria-hidden="true"
                style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", opacity: 0 }}
              />
              {error ? (
                <p className="ab-field-wide" style={{ color: "#e5484d", fontSize: "0.85rem", margin: 0 }} role="alert">{error}</p>
              ) : null}
              <button className="ab-submit" type="submit" data-cursor="view" data-cursor-label="Send" disabled={sending}>
                <span>{sending ? "Sending…" : "Send it"}</span>
                <span className="ab-submit-ar">↗</span>
              </button>
            </form>
          ) : (
            <div className="ab-thanks" ref={thanksRef}>
              <div className="ab-check">✓</div>
              <h3>Got it.</h3>
              <p>We read every submission. You'll hear from a human within two weeks.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
