"use client";

import { TINTS } from "@/data/apps";

/** Ícono de aplicación: baldosa de tinta plana con glifo */
export default function AppTile({ app, size = 56, className = "", style }) {
  const tint = TINTS[app.color] ?? TINTS.paper;
  const { Icon } = app;
  return (
    <span
      className={`tile ${className}`}
      style={{ width: size, height: size, background: tint.bg, color: tint.fg, ...style }}
      aria-hidden="true"
    >
      <Icon size={typeof size === "number" ? Math.round(size * 0.5) : "50%"} strokeWidth={2} />
    </span>
  );
}
