"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ModelMatrix.scss";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const MODELS = [
  {
    name: "Claude",
    family: "Anthropic · Opus / Sonnet",
    initial: "C",
    description: "Long-horizon reasoning, careful tool use, and best-in-class writing. Our default for nuanced workflows and customer-facing copilots.",
    tags: ["Reasoning", "Long context", "Tool use", "Writing"],
    metrics: [
      { lab: "Context", val: "200K" },
      { lab: "Modes", val: "Text · Vision" },
      { lab: "Best for", val: "Agentic" },
    ],
  },
  {
    name: "GPT-4o",
    family: "OpenAI · 4o / 4o-mini",
    initial: "G",
    description: "Multimodal speed, function-calling, and the broadest ecosystem. Our pick for voice copilots, fast classifiers, and high-volume retrieval.",
    tags: ["Multimodal", "Function calling", "Speed", "Vision"],
    metrics: [
      { lab: "Context", val: "128K" },
      { lab: "Modes", val: "Text · Vision · Voice" },
      { lab: "Best for", val: "Realtime" },
    ],
  },
  {
    name: "Llama 3.1",
    family: "Meta · 405B / 70B (Open)",
    initial: "L",
    description: "Open-weight frontier model — fine-tunable, self-hostable, and the foundation for compliance-sensitive deployments and on-prem agents.",
    tags: ["Open weights", "Fine-tune", "On-prem", "RAG"],
    metrics: [
      { lab: "Context", val: "128K" },
      { lab: "Modes", val: "Text" },
      { lab: "Best for", val: "Private data" },
    ],
  },
  {
    name: "Gemini",
    family: "Google · 1.5 Pro / Flash",
    initial: "G",
    description: "Massive context window and native multimodality. Our choice when the workload is video, very long documents, or Workspace-anchored tasks.",
    tags: ["1M context", "Video", "Workspace", "Code"],
    metrics: [
      { lab: "Context", val: "1M" },
      { lab: "Modes", val: "Text · Vision · Audio · Video" },
      { lab: "Best for", val: "Mega context" },
    ],
  },
];

export default function ModelMatrix() {
  const ref = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".mm-head-word",
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1,
          ease: "power4.out",
          stagger: 0.05,
          scrollTrigger: { trigger: ".mm-head", start: "top 85%" },
        }
      );
      gsap.utils.toArray(".mm-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            delay: (i % 2) * 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 92%" },
          }
        );
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="mm">
      <div className="mm-grid-bg" aria-hidden="true" />
      <div className="mm-inner">
        <div className="mm-head">
          <span className="mm-label">
            <span className="mm-label-dot" />
            <span>— Model catalogue</span>
          </span>
          <h2 className="mm-heading">
            <span className="word-wrap"><span className="mm-head-word">Picked</span></span>{" "}
            <span className="word-wrap"><span className="mm-head-word">by</span></span>{" "}
            <span className="word-wrap"><span className="mm-head-word">workload</span></span>
            <span className="word-wrap"><span className="mm-head-word">,</span></span>{" "}
            <span className="word-wrap"><span className="mm-head-word serif">not</span></span>{" "}
            <span className="word-wrap"><span className="mm-head-word serif">by</span></span>{" "}
            <span className="word-wrap"><span className="mm-head-word serif">hype.</span></span>
          </h2>
          <p className="mm-intro">
            We benchmark frontier and open models against your use case — context, latency, cost, governance — and pick the one that ships in production, not the one that wins on Twitter this week.
          </p>
        </div>

        <div className="mm-stage">
          <div className="mm-grid">
            {MODELS.map((m, i) => (
              <article
                key={m.name}
                className={`mm-card ${active === i ? "is-active" : ""}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                tabIndex={0}
                data-cursor="hover"
              >
                <div className="mm-card-head">
                  <span className="mm-card-mark">{m.initial}</span>
                  <div className="mm-card-name-block">
                    <span className="mm-card-name">{m.name}</span>
                    <span className="mm-card-family">{m.family}</span>
                  </div>
                  <span className="mm-card-idx">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <p className="mm-card-desc">{m.description}</p>
                <ul className="mm-card-tags">
                  {m.tags.map((t) => <li key={t}>{t}</li>)}
                </ul>
                <div className="mm-card-meta">
                  {m.metrics.map((mt) => (
                    <div key={mt.lab}>
                      <span className="mm-card-meta-lab">{mt.lab}</span>
                      <span className="mm-card-meta-val">{mt.val}</span>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className="mm-aside">
            <div className="mm-aside-head">
              <span>Selected · {MODELS[active].name}</span>
              <span className="mm-aside-pulse" />
            </div>
            <div className="mm-aside-body">
              <p>{MODELS[active].description}</p>
              <div className="mm-aside-foot">
                <span>{MODELS[active].family}</span>
                <span>{MODELS[active].metrics.find(m => m.lab === 'Context')?.val} context</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
