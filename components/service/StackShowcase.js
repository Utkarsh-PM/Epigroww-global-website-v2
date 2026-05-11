"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./StackShowcase.scss";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const LAYERS = [
  {
    name: "Experience layer",
    tech: ["Next.js", "React", "TypeScript", "Tailwind", "GSAP", "Framer Motion", "Three.js"],
    purpose: "What your customer sees. Green Core Web Vitals, <2s LCP, clean animation, accessible.",
  },
  {
    name: "Commerce layer",
    tech: ["Shopify Plus", "WooCommerce", "Headless Commerce", "Medusa", "Stripe", "Razorpay", "Klarna"],
    purpose: "The checkout, the catalog, the cart logic. Localized, tax-aware, conversion-optimized.",
  },
  {
    name: "Growth layer",
    tech: ["GA4", "Segment", "BigQuery", "Looker Studio", "CAPI", "Server-side GTM"],
    purpose: "The measurement spine. One definition of revenue, one definition of CAC, shared everywhere.",
  },
  {
    name: "CRM & lifecycle",
    tech: ["HubSpot", "Salesforce", "Klaviyo", "Braze", "MoEngage", "WhatsApp API"],
    purpose: "Flows that carry customers from first-touch to 5th purchase, on autopilot with a kill-switch.",
  },
  {
    name: "AI & automation",
    tech: ["OpenAI", "Anthropic Claude", "LangChain", "RAG", "Zapier", "Make", "n8n"],
    purpose: "Assistants and agents that handle tier-1 support, internal ops, and the long tail of repetitive work.",
  },
];

export default function StackShowcase() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".ss-layer").forEach((layer, i) => {
        gsap.fromTo(
          layer,
          { x: i % 2 === 0 ? -40 : 40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.95,
            ease: "power3.out",
            scrollTrigger: { trigger: layer, start: "top 85%" },
          }
        );
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="ss">
      <div className="ss-inner">
        <div className="ss-head">
          <span className="ss-label">— The stack</span>
          <h2 className="ss-heading">
            Five layers we build on<br />
            <span className="serif">— and maintain past launch.</span>
          </h2>
        </div>

        <div className="ss-layers">
          {LAYERS.map((l, i) => (
            <div key={i} className="ss-layer">
              <div className="ss-layer-num">L{String(i + 1).padStart(2, "0")}</div>
              <div className="ss-layer-body">
                <h3>{l.name}</h3>
                <p>{l.purpose}</p>
                <ul>
                  {l.tech.map((t) => <li key={t}>{t}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
