"use client";

import { motion, useDragControls, useMotionValue } from "framer-motion";
import { Minus, Plus, X } from "lucide-react";
import { useState } from "react";
import { TINTS } from "@/data/apps";
import { useWM } from "@/context/WindowContext";
import { usePrefs } from "@/context/PrefsContext";

export default function Window({ win, title, color = "paper", constraintsRef, children }) {
  const { focusedKey, focus, close, minimize, isMobile } = useWM();
  const { ui } = usePrefs();
  const [maxed, setMaxed] = useState(false);
  const x = useMotionValue(win.x);
  const y = useMotionValue(win.y);
  const controls = useDragControls();

  const focused = focusedKey === win.key;
  const full = isMobile || maxed;
  const tint = TINTS[color] ?? TINTS.paper;

  const boxStyle = full
    ? { x: 0, y: 0, left: 0, top: 0, width: "100%", height: "100%" }
    : { x, y, left: 0, top: 0, width: win.w, height: win.h };

  return (
    <motion.section
      role="dialog"
      aria-label={title}
      className="win pointer-events-auto absolute"
      data-focused={focused}
      style={{ ...boxStyle, zIndex: win.z, "--tint": tint.bg, "--tint-ink": tint.fg, ...(full ? { boxShadow: "none" } : null) }}
      initial={{ opacity: 0, scale: 0.94 }}
      animate={
        win.minimized
          ? { opacity: 0, scale: 0.85, transitionEnd: { display: "none" } }
          : { opacity: 1, scale: 1, display: "flex" }
      }
      exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.12 } }}
      transition={{ type: "spring", stiffness: 420, damping: 32 }}
      drag={!full}
      dragListener={false}
      dragControls={controls}
      dragMomentum={false}
      dragElastic={0}
      dragConstraints={constraintsRef}
      onPointerDownCapture={() => !focused && focus(win.key)}
    >
      <header
        className="win-title"
        onPointerDown={(e) => {
          if (e.target.closest("button") || full) return;
          controls.start(e);
        }}
        onDoubleClick={() => !isMobile && setMaxed((m) => !m)}
      >
        <div className="flex gap-1.5">
          <button className="win-btn" data-kind="close" aria-label={ui("win.close")} onClick={() => close(win.key)}>
            <X size={11} strokeWidth={3} />
          </button>
          {!isMobile && (
            <>
              <button className="win-btn" aria-label={ui("win.min")} onClick={() => minimize(win.key)}>
                <Minus size={11} strokeWidth={3} />
              </button>
              <button
                className="win-btn"
                aria-label={maxed ? ui("win.restore") : ui("win.max")}
                onClick={() => setMaxed((m) => !m)}
              >
                <Plus size={11} strokeWidth={3} />
              </button>
            </>
          )}
        </div>
        <span className="name">{title}</span>
      </header>
      <div className="win-body">{children}</div>
    </motion.section>
  );
}
