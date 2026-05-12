"use client";
import { useState } from "react";
import "./ApplyBar.scss";

export default function ApplyBar({ data = {} }) {
  const [sent, setSent] = useState(false);
  const label = data.label || "— Don't see your role?";
  const headPrefix = data.headingPrefix || "Share your profile.";
  const headAccent = data.headingAccent || "We keep it on file";
  const headSuffix = data.headingSuffix || "for the next wave.";
  const body = data.body || "We open roles in waves — every quarter. If you're the kind of person who'd be a hire before there's a job title for you, drop us a note.";

  const onSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="apply" className="ab">
      <div className="ab-inner">
        <div className="ab-left">
          <span className="ab-label">{label}</span>
          <h2 className="ab-heading">
            {headPrefix}<br />
            <span className="serif">{headAccent}</span> {headSuffix}
          </h2>
          <p className="ab-body">{body}</p>
        </div>

        <div className="ab-right">
          {!sent ? (
            <form className="ab-form" onSubmit={onSubmit}>
              <div className="ab-field">
                <label>First name</label>
                <input type="text" required />
              </div>
              <div className="ab-field">
                <label>Last name</label>
                <input type="text" required />
              </div>
              <div className="ab-field ab-field-wide">
                <label>Email</label>
                <input type="email" required />
              </div>
              <div className="ab-field ab-field-wide">
                <label>What do you do?</label>
                <select required defaultValue="">
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
                <textarea rows="4" placeholder="One paragraph beats five."></textarea>
              </div>
              <button className="ab-submit" data-cursor="view" data-cursor-label="Send">
                <span>Send it</span>
                <span className="ab-submit-ar">↗</span>
              </button>
            </form>
          ) : (
            <div className="ab-thanks">
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
