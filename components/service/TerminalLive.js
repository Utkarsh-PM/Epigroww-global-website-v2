"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./TerminalLive.scss";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const CODE_LINES = [
  { t: "comment", txt: "// Deploy: JK Lifestyle · Shopify Plus → performance mode" },
  { t: "code", txt: "const stack = await epigroww.stack({" },
  { t: "code", txt: "  platform: 'shopify-plus'," },
  { t: "code", txt: "  stores: ['in','ae','global']," },
  { t: "code", txt: "  integrations: ['klaviyo','gtm-ss','meta-capi']" },
  { t: "code", txt: "});" },
  { t: "log", txt: "✓ Core Web Vitals · LCP 1.4s · CLS 0.02 · INP 92ms" },
  { t: "log", txt: "✓ Lighthouse · Perf 98 · SEO 100 · Access 100" },
  { t: "log", txt: "✓ 4-region edge caching enabled" },
  { t: "accent", txt: "→ Stack shipped · 6 weeks · zero downtime" },
];

const AI_CONVO = [
  { who: "client", txt: "What's our best performing creative this month?" },
  { who: "ai", txt: "Across Meta + Google · it's the 'Infinity · 30s hero' — 4.2× ROAS, top 5% CTR in category. Want the incrementality read-out?", delay: 1400 },
  { who: "client", txt: "Yes. Also show me cannibalization vs. the static set." },
  { who: "ai", txt: "Running geo-holdout analysis… 74% incremental. Static set is 38% cannibalized by hero — suggest rotating static to retention flows.", delay: 1600 },
];

export default function TerminalLive() {
  const ref = useRef(null);
  const [shown, setShown] = useState(0);
  const [convoIdx, setConvoIdx] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".tl-head-word",
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1,
          ease: "power4.out",
          stagger: 0.05,
          scrollTrigger: { trigger: ".tl-head", start: "top 80%" },
        }
      );
      gsap.fromTo(
        ".tl-pane",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: ".tl-grid", start: "top 80%" },
        }
      );

      // Stage the terminal lines once panel is in view
      ScrollTrigger.create({
        trigger: ".tl-terminal",
        start: "top 75%",
        once: true,
        onEnter: () => {
          CODE_LINES.forEach((_, i) => {
            setTimeout(() => setShown((s) => Math.max(s, i + 1)), 350 + i * 520);
          });
        },
      });

      ScrollTrigger.create({
        trigger: ".tl-chat",
        start: "top 75%",
        once: true,
        onEnter: () => {
          AI_CONVO.forEach((m, i) => {
            const t = AI_CONVO.slice(0, i).reduce((acc, mm) => acc + (mm.delay || 700), 400);
            setTimeout(() => setConvoIdx((c) => Math.max(c, i + 1)), t);
          });
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="tl">
      <div className="tl-inner">
        <div className="tl-head">
          <span className="tl-label">— Live panel · engineering in flight</span>
          <h2 className="tl-heading">
            <span className="word-wrap"><span className="tl-head-word">Two</span></span>{" "}
            <span className="word-wrap"><span className="tl-head-word">windows</span></span>{" "}
            <span className="word-wrap"><span className="tl-head-word">into</span></span>{" "}
            <span className="word-wrap"><span className="tl-head-word serif">how</span></span>{" "}
            <span className="word-wrap"><span className="tl-head-word serif">we</span></span>{" "}
            <span className="word-wrap"><span className="tl-head-word serif">build.</span></span>
          </h2>
          <p className="tl-lede">
            A live stack deployment on the left. An AI growth assistant answering real client questions on the right. Both shipped in production for named brands.
          </p>
        </div>

        <div className="tl-grid">
          <div className="tl-pane tl-terminal" aria-label="Terminal session">
            <div className="tl-window-top">
              <div className="tl-dots">
                <span /><span /><span />
              </div>
              <span className="tl-window-title">~/epigroww · deploy · jk-lifestyle</span>
              <span className="tl-window-meta">zsh · 14:32 IST</span>
            </div>
            <div className="tl-window-body tl-font">
              <div className="tl-prompt">epigroww@core <span className="tl-arrow">❯</span> ship</div>
              {CODE_LINES.slice(0, shown).map((line, i) => (
                <div key={i} className={`tl-line tl-line-${line.t}`}>
                  {line.txt}
                </div>
              ))}
              {shown < CODE_LINES.length && (
                <div className="tl-cursor" aria-hidden="true">▍</div>
              )}
              {shown === CODE_LINES.length && (
                <div className="tl-done">
                  <span>Build time · 4.2s</span>
                  <span>Status · 200 OK</span>
                </div>
              )}
            </div>
          </div>

          <div className="tl-pane tl-chat" aria-label="AI assistant conversation">
            <div className="tl-window-top tl-chat-top">
              <div className="tl-chat-id">
                <span className="tl-chat-avatar">◉</span>
                <div>
                  <span className="tl-chat-name">Epigroww · Growth assistant</span>
                  <span className="tl-chat-sub">LLM-native · pod-trained</span>
                </div>
              </div>
              <span className="tl-chat-status">
                <span className="tl-chat-dot" />
                Live
              </span>
            </div>

            <div className="tl-chat-body">
              {AI_CONVO.slice(0, convoIdx).map((m, i) => (
                <div key={i} className={`tl-msg tl-msg-${m.who}`}>
                  <div className="tl-msg-bubble">{m.txt}</div>
                  <div className="tl-msg-meta">
                    {m.who === "client" ? "Client · JK Lifestyle" : "Assistant"}
                  </div>
                </div>
              ))}
              {convoIdx < AI_CONVO.length && convoIdx > 0 && (
                <div className="tl-typing">
                  <span /><span /><span />
                </div>
              )}
            </div>

            <div className="tl-chat-footer">
              <span className="tl-chat-input">Ask anything about your growth stack…</span>
              <span className="tl-chat-send">↗</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
