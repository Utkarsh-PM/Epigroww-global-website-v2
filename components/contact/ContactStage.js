"use client";
import { useState } from "react";
import "./ContactStage.scss";

const DEFAULT_TOPICS = [
  { v: "media", label: "Media / Performance", blurb: "$10K+/mo ad spend brief" },
  { v: "brand", label: "Brand / Creative", blurb: "Launches, films, identity" },
  { v: "tech", label: "Tech / Engineering", blurb: "Build, migrate, or automate" },
  { v: "partnership", label: "Partnership", blurb: "Press, collabs, co-sell" },
  { v: "careers", label: "Careers", blurb: "Hiring is on /careers — still welcome" },
  { v: "other", label: "Something else", blurb: "Say hi" },
];

const DEFAULT_BUDGETS = ["< $10K", "$10K – $50K", "$50K – $250K", "$250K+", "Not sure yet"];

function mapTopics(rows) {
  if (!Array.isArray(rows) || rows.length === 0) return DEFAULT_TOPICS;
  return rows.map((t) => ({ v: t.value || "", label: t.label || "", blurb: t.blurb || "" }));
}

function mapBudgets(rows) {
  if (!Array.isArray(rows) || rows.length === 0) return DEFAULT_BUDGETS;
  return rows.map((b) => b.label).filter(Boolean);
}

export default function ContactStage({ data = {}, form = {}, siteSettings = {} }) {
  const TOPICS = mapTopics(form.topics);
  const BUDGETS = mapBudgets(form.budgets);
  const [topic, setTopic] = useState(TOPICS[0]?.v || "media");
  const [budget, setBudget] = useState(BUDGETS[1] || "$10K – $50K");
  const [sent, setSent] = useState(false);
  const label = data.label || "— Direct lines";
  const noteText = data.noteText || "Most briefs get a human reply within 24 hours.";
  const email = siteSettings.email || "hello@epigrowwglobal.com";
  const phone = siteSettings.phone || "+91 98765 43210";
  const partnerships = siteSettings.partnershipsEmail || "partners@epigrowwglobal.com";
  const press = siteSettings.pressEmail || "press@epigrowwglobal.com";
  const thanksHeading = form.thanksHeading || "Brief received.";
  const thanksBody = form.thanksBody || "A human — not an auto-responder — will read this and reply within 24 hours.";

  const onSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section className="cs">
      <div className="cs-inner">
        <div className="cs-left">
          <div className="cs-bracket">
            <span>{label}</span>
          </div>
          <a className="cs-contact-a" href={`mailto:${email}`} data-cursor="hover">
            <span className="cs-contact-lab">Email</span>
            <span className="cs-contact-val">{email}</span>
          </a>
          <a className="cs-contact-a" href={`tel:${phone.replace(/\s+/g, "")}`} data-cursor="hover">
            <span className="cs-contact-lab">WhatsApp</span>
            <span className="cs-contact-val">{phone}</span>
          </a>
          <a className="cs-contact-a" href={`mailto:${partnerships}`} data-cursor="hover">
            <span className="cs-contact-lab">Partnerships</span>
            <span className="cs-contact-val">{partnerships}</span>
          </a>
          <a className="cs-contact-a" href={`mailto:${press}`} data-cursor="hover">
            <span className="cs-contact-lab">Press</span>
            <span className="cs-contact-val">{press}</span>
          </a>

          <div className="cs-note">{noteText}</div>
        </div>

        <div className="cs-right">
          {!sent ? (
            <form className="cs-form" onSubmit={onSubmit}>
              <div className="cs-step">
                <div className="cs-step-num">01 — Why are you here?</div>
                <div className="cs-chips">
                  {TOPICS.map((t) => (
                    <button
                      key={t.v}
                      type="button"
                      className={`cs-chip ${topic === t.v ? "is-active" : ""}`}
                      onClick={() => setTopic(t.v)}
                      data-cursor="hover"
                    >
                      <span className="cs-chip-label">{t.label}</span>
                      <span className="cs-chip-blurb">{t.blurb}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="cs-step">
                <div className="cs-step-num">02 — About you</div>
                <div className="cs-row">
                  <div className="cs-field">
                    <label>Full name</label>
                    <input required />
                  </div>
                  <div className="cs-field">
                    <label>Work email</label>
                    <input type="email" required />
                  </div>
                </div>
                <div className="cs-row">
                  <div className="cs-field">
                    <label>Company</label>
                    <input />
                  </div>
                  <div className="cs-field">
                    <label>Role</label>
                    <input />
                  </div>
                </div>
              </div>

              <div className="cs-step">
                <div className="cs-step-num">03 — Scope</div>
                <div className="cs-chips cs-chips-sm">
                  {BUDGETS.map((b) => (
                    <button
                      key={b}
                      type="button"
                      className={`cs-chip cs-chip-sm ${budget === b ? "is-active" : ""}`}
                      onClick={() => setBudget(b)}
                      data-cursor="hover"
                    >{b}</button>
                  ))}
                </div>
                <div className="cs-field cs-field-full">
                  <label>Tell us about the ambition</label>
                  <textarea rows="4" placeholder="The shape of the brief — goals, timelines, what good looks like, whatever you can share." />
                </div>
              </div>

              <button className="cs-submit" type="submit" data-cursor="view" data-cursor-label="Send">
                <span>Send the brief</span>
                <span className="cs-submit-ar">↗</span>
              </button>
            </form>
          ) : (
            <div className="cs-thanks">
              <div className="cs-check">✓</div>
              <h3>{thanksHeading}</h3>
              <p>{thanksBody}</p>
              <a href="/work" className="cs-thanks-link">In the meantime, explore the work ↗</a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
