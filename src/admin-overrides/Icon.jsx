/**
 * Small Epigroww mark shown in the admin top nav.
 * Mounted via payload.config.js → admin.components.graphics.Icon.
 */
import React from "react";

export default function Icon() {
  return (
    <img
      src="/logo.png"
      alt="Epigroww"
      style={{ height: 26, width: "auto", display: "block" }}
    />
  );
}
