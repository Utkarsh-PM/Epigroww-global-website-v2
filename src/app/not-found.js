import Link from "next/link";

export const metadata = {
  title: "Page not found — Epigroww Global",
  description: "The page you are looking for doesn't exist or has moved.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section
      style={{
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "8rem 1.5rem 6rem",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: "720px" }}>
        <div
          style={{
            fontSize: "0.72rem",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--ink-60)",
            marginBottom: "1.25rem",
          }}
        >
          — 404
        </div>
        <h1
          style={{
            fontSize: "clamp(2.5rem, 6vw, 4.75rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            margin: 0,
            color: "var(--ink)",
          }}
        >
          This page took a wrong turn.
        </h1>
        <p
          style={{
            marginTop: "1.5rem",
            color: "var(--ink-60)",
            fontSize: "1.05rem",
            lineHeight: 1.6,
          }}
        >
          The page you were looking for doesn't exist, has moved, or never did.
          Let's get you back to something useful.
        </p>
        <div
          style={{
            marginTop: "2.5rem",
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/"
            style={{
              padding: "0.9rem 1.6rem",
              borderRadius: "999px",
              background: "var(--accent)",
              color: "var(--on-accent)",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "0.95rem",
            }}
          >
            Back to home
          </Link>
          <Link
            href="/contact"
            style={{
              padding: "0.9rem 1.6rem",
              borderRadius: "999px",
              border: "1px solid var(--line-strong)",
              color: "var(--ink)",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "0.95rem",
            }}
          >
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}
