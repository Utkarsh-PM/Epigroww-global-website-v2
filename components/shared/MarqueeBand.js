"use client";
import "./MarqueeBand.scss";

export default function MarqueeBand({ items, reverse = false, speed = 40, accent = false, className = "" }) {
  const loop = [...items, ...items];
  return (
    <div className={`mq-band ${accent ? "mq-accent" : ""} ${className}`}>
      <div
        className="mq-track"
        style={{ animationDuration: `${speed}s`, animationDirection: reverse ? "reverse" : "normal" }}
      >
        {loop.map((item, i) => (
          <span key={i} className="mq-item">
            <span className="mq-dot">✦</span>
            <span>{item}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
