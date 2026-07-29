"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { STEPS } from "./questionnaireSchema";
import "./QuestionnaireForm.scss";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Every answer lands in the sheet as a string. Multi-selects are joined so a
// single cell stays readable for whoever opens the tab.
const serialise = (value) =>
  Array.isArray(value) ? value.join(" · ") : typeof value === "string" ? value : "";

export default function QuestionnaireForm() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const honeypot = useRef("");

  const panelRef = useRef(null);
  const anchorRef = useRef(null);
  const headingRef = useRef(null);
  const doneRef = useRef(null);

  const total = STEPS.length;
  const current = STEPS[step];
  const isLast = step === total - 1;

  const answeredCount = useMemo(
    () =>
      Object.values(answers).filter((v) =>
        Array.isArray(v) ? v.length > 0 : String(v || "").trim() !== ""
      ).length,
    [answers]
  );

  const setValue = useCallback((key, value) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => (prev[key] ? { ...prev, [key]: "" } : prev));
  }, []);

  const toggleMulti = useCallback((key, option) => {
    setAnswers((prev) => {
      const list = Array.isArray(prev[key]) ? prev[key] : [];
      return {
        ...prev,
        [key]: list.includes(option)
          ? list.filter((o) => o !== option)
          : [...list, option],
      };
    });
  }, []);

  // Bring the panel back into view on step change — Lenis owns the scroll, so
  // hand it the target rather than fighting it with a native jump.
  const scrollToForm = useCallback(() => {
    const el = anchorRef.current;
    if (!el) return;
    const lenis = typeof window !== "undefined" ? window.__lenis : null;
    if (lenis && typeof lenis.scrollTo === "function") {
      lenis.scrollTo(el, { offset: -110 });
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  // Animate the panel in whenever the step changes.
  useEffect(() => {
    if (sent) return;
    const el = panelRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      gsap.set(el.querySelectorAll(".qn-anim"), { opacity: 1, y: 0 });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".qn-anim",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.55, stagger: 0.05, ease: "power3.out" }
      );
    }, el);
    return () => ctx.revert();
  }, [step, sent]);

  useEffect(() => {
    if (sent && doneRef.current) {
      doneRef.current.scrollIntoView({ block: "center" });
    }
  }, [sent]);

  const validateStep = (index) => {
    const next = {};
    STEPS[index].fields.forEach((f) => {
      if (!f.required) return;
      const v = String(answers[f.key] || "").trim();
      if (!v) next[f.key] = `${f.label} is required.`;
      else if (f.type === "email" && !EMAIL_RE.test(v))
        next[f.key] = "Enter a valid email address.";
    });
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const goTo = (index) => {
    if (index === step) return;
    // Moving forward past the contact step requires the contact step to be valid.
    if (index > 0 && step === 0 && !validateStep(0)) {
      setFormError("Add your name and a valid work email to continue.");
      return;
    }
    setFormError("");
    setStep(index);
    scrollToForm();
    window.requestAnimationFrame(() => {
      if (headingRef.current) headingRef.current.focus();
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (sending) return;

    if (!validateStep(0)) {
      setStep(0);
      setFormError("Add your name and a valid work email before submitting.");
      scrollToForm();
      return;
    }

    setFormError("");
    setSending(true);

    const payload = {};
    STEPS.forEach((s) =>
      s.fields.forEach((f) => {
        payload[f.key] = serialise(answers[f.key]);
      })
    );

    try {
      const res = await fetch("/api/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "questionnaire",
          ...payload,
          company_website: honeypot.current,
          page:
            typeof window !== "undefined"
              ? window.location.pathname
              : "/questionnaire",
        }),
      });
      const out = await res.json().catch(() => ({}));
      if (!res.ok || !out.ok) {
        throw new Error(out.error || "Something went wrong. Please try again.");
      }
      setSent(true);
    } catch (err) {
      setFormError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const progress = Math.round(((step + 1) / total) * 100);

  if (sent) {
    return (
      <section className="qn">
        <div className="qn-inner qn-inner-done">
          <div className="qn-done" ref={doneRef}>
            <span className="qn-done-mark" aria-hidden="true">
              ✓
            </span>
            <h2 className="qn-done-head">Discovery received.</h2>
            <p className="qn-done-body">
              Thank you{answers.name ? `, ${String(answers.name).split(" ")[0]}` : ""}.
              Your answers are with the strategy team. We read every submission
              ourselves — expect a considered reply, not an auto-responder, within
              two working days.
            </p>
            <div className="qn-done-links">
              <a className="qn-done-cta" href="/case-studies" data-cursor="hover">
                <span>See what we&apos;ve done for brands like yours</span>
                <span className="qn-done-arr" aria-hidden="true">
                  ↗
                </span>
              </a>
              <a
                className="qn-done-mail"
                href="mailto:business@epigrowwglobal.com"
                data-cursor="hover"
              >
                business@epigrowwglobal.com
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="qn">
      <span ref={anchorRef} className="qn-anchor" aria-hidden="true" />
      <div className="qn-inner">
        {/* ── Progress rail ─────────────────────────────────────────── */}
        <aside className="qn-rail" aria-label="Questionnaire sections">
          <div className="qn-rail-sticky">
            <div className="qn-rail-head">
              <span className="qn-rail-lab">— Sections</span>
              <span className="qn-rail-count">
                {String(step + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
            </div>

            <div
              className="qn-bar"
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Questionnaire progress"
            >
              <span className="qn-bar-fill" style={{ width: `${progress}%` }} />
            </div>

            <ol className="qn-steps">
              {STEPS.map((s, i) => (
                <li key={s.id}>
                  <button
                    type="button"
                    className={`qn-step ${i === step ? "is-active" : ""} ${
                      i < step ? "is-done" : ""
                    }`}
                    onClick={() => goTo(i)}
                    aria-current={i === step ? "step" : undefined}
                    data-cursor="hover"
                  >
                    <span className="qn-step-num">{s.num}</span>
                    <span className="qn-step-title">{s.title}</span>
                  </button>
                </li>
              ))}
            </ol>

            <p className="qn-rail-note">
              {answeredCount} answered · nothing is saved until you submit.
            </p>
          </div>
        </aside>

        {/* ── Panel ─────────────────────────────────────────────────── */}
        <form className="qn-form" onSubmit={onSubmit} noValidate>
          <div className="qn-panel" ref={panelRef}>
            <div className="qn-panel-head qn-anim">
              <span className="qn-panel-num">{current.num}</span>
              <h2
                className="qn-panel-title"
                tabIndex={-1}
                ref={headingRef}
              >
                {current.title}
              </h2>
              <p className="qn-panel-blurb">{current.blurb}</p>
            </div>

            <div className="qn-fields">
              {current.fields.map((f) => {
                const isGroup = f.type === "choice" || f.type === "multi";
                const labelId = `qn-label-${f.key}`;
                const LabelTag = isGroup ? "span" : "label";
                const labelProps = isGroup
                  ? { id: labelId }
                  : { htmlFor: `qn-${f.key}` };

                return (
                <div
                  key={f.key}
                  className={`qn-field qn-anim ${f.half ? "is-half" : ""}`}
                >
                  <LabelTag className="qn-label" {...labelProps}>
                    <span className="qn-label-text">{f.label}</span>
                    {f.required ? (
                      <span className="qn-req">Required</span>
                    ) : f.optional ? (
                      <span className="qn-opt">Optional</span>
                    ) : null}
                  </LabelTag>
                  {f.hint ? <p className="qn-hint">{f.hint}</p> : null}

                  {f.type === "textarea" ? (
                    <textarea
                      id={`qn-${f.key}`}
                      name={f.key}
                      rows={f.rows || 3}
                      className="qn-input qn-textarea"
                      value={answers[f.key] || ""}
                      onChange={(e) => setValue(f.key, e.target.value)}
                      placeholder={f.placeholder || ""}
                      maxLength={2000}
                    />
                  ) : f.type === "choice" ? (
                    <div
                      className="qn-chips"
                      role="radiogroup"
                      aria-labelledby={labelId}
                    >
                      {f.options.map((o) => {
                        const active = answers[f.key] === o;
                        return (
                          <button
                            key={o}
                            type="button"
                            role="radio"
                            aria-checked={active}
                            className={`qn-chip ${active ? "is-active" : ""}`}
                            onClick={() => setValue(f.key, active ? "" : o)}
                            data-cursor="hover"
                          >
                            {o}
                          </button>
                        );
                      })}
                    </div>
                  ) : f.type === "multi" ? (
                    <div className="qn-chips" role="group" aria-labelledby={labelId}>
                      {f.options.map((o) => {
                        const list = Array.isArray(answers[f.key])
                          ? answers[f.key]
                          : [];
                        const active = list.includes(o);
                        return (
                          <button
                            key={o}
                            type="button"
                            aria-pressed={active}
                            className={`qn-chip ${active ? "is-active" : ""}`}
                            onClick={() => toggleMulti(f.key, o)}
                            data-cursor="hover"
                          >
                            {o}
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <input
                      id={`qn-${f.key}`}
                      name={f.key}
                      type={f.type}
                      className="qn-input"
                      value={answers[f.key] || ""}
                      onChange={(e) => setValue(f.key, e.target.value)}
                      placeholder={f.placeholder || ""}
                      autoComplete={f.autoComplete || "off"}
                      maxLength={200}
                      required={!!f.required}
                      aria-required={f.required ? "true" : undefined}
                      aria-invalid={errors[f.key] ? "true" : undefined}
                      aria-describedby={errors[f.key] ? `qn-err-${f.key}` : undefined}
                    />
                  )}

                  {errors[f.key] ? (
                    <p className="qn-error" id={`qn-err-${f.key}`} role="alert">
                      {errors[f.key]}
                    </p>
                  ) : null}
                </div>
                );
              })}
            </div>

            {/* Honeypot — hidden from humans, irresistible to bots. */}
            <input
              type="text"
              name="company_website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              onChange={(e) => {
                honeypot.current = e.target.value;
              }}
              className="qn-trap"
            />

            {formError ? (
              <p className="qn-form-error" role="alert">
                {formError}
              </p>
            ) : null}

            <div className="qn-actions">
              <button
                type="button"
                className="qn-btn qn-btn-ghost"
                onClick={() => goTo(Math.max(0, step - 1))}
                disabled={step === 0}
                data-cursor="hover"
              >
                ← Back
              </button>

              {isLast ? (
                <button
                  type="submit"
                  className="qn-btn qn-btn-solid"
                  disabled={sending}
                  data-cursor="view"
                  data-cursor-label="Submit"
                >
                  <span>{sending ? "Submitting…" : "Submit discovery"}</span>
                  <span className="qn-btn-arr" aria-hidden="true">
                    ↗
                  </span>
                </button>
              ) : (
                <button
                  type="button"
                  className="qn-btn qn-btn-solid"
                  onClick={() => goTo(step + 1)}
                  data-cursor="hover"
                >
                  <span>Continue</span>
                  <span className="qn-btn-arr" aria-hidden="true">
                    →
                  </span>
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
