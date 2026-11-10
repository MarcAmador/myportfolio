"use client";

import { motion, useDragControls, useMotionValue } from "framer-motion";
import { useState } from "react";
import { useWM } from "@/context/WindowContext";
import { usePrefs } from "@/context/PrefsContext";

export default function Window({ win, title, constraintsRef, children }) {
  const { focusedKey, focus, close, minimize, isMobile } = useWM();
  const { ui } = usePrefs();
  const [maxed, setMaxed] = useState(false);
  const x = useMotionValue(win.x);
  const y = useMotionValue(win.y);
  const controls = useDragControls();

  const focused = focusedKey === win.key;
  const full = isMobile || maxed;

  const boxStyle = full
    ? { x: 0, y: 0, left: 0, top: 0, width: "100%", height: "100%" }
    : { x, y, left: 0, top: 0, width: win.w, height: win.h };

  return (
    <motion.section
      role="dialog"
      aria-label={title}
      className="win pointer-events-auto absolute"
      data-focused={focused}
      data-full={full}
      style={{ ...boxStyle, zIndex: win.z }}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={
        win.minimized
          ? { opacity: 0, scale: 0.92, transitionEnd: { display: "none" } }
          : { opacity: 1, scale: 1, display: "flex" }
      }
      exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.12 } }}
      transition={{ type: "spring", stiffness: 380, damping: 34 }}
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
        <div className="win-dots">
          <button className="win-dot" data-kind="close" aria-label={ui("win.close")} onClick={() => close(win.key)} />
          {!isMobile && (
            <>
              <button className="win-dot" data-kind="min" aria-label={ui("win.min")} onClick={() => minimize(win.key)} />
              <button
                className="win-dot"
                data-kind="max"
                aria-label={maxed ? ui("win.restore") : ui("win.max")}
                onClick={() => setMaxed((m) => !m)}
              />
            </>
          )}
        </div>
        <span className="win-name">{title}</span>
      </header>
      <div className="win-body">{children}</div>
    </motion.section>
  );
}
