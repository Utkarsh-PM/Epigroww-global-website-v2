/**
 * Big Epigroww wordmark shown on the admin login screen.
 * Mounted via payload.config.js → admin.components.graphics.Logo.
 */
import React from "react";

export default function Logo() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 14,
        padding: "12px 0",
      }}
    >
      <img
        src="/logo.png"
        alt="Epigroww Global"
        style={{ height: 56, width: "auto" }}
      />
      <div
        style={{
          fontSize: 11,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          opacity: 0.55,
          fontWeight: 500,
        }}
      >
        Content Management · v1.0
      </div>
    </div>
  );
}
