"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { usePrefs } from "@/context/PrefsContext";
import { useWM } from "@/context/WindowContext";
import { DOCK_APPS } from "@/data/apps";
import AppTile from "./AppTile";

function DockItem({ app, mouseX }) {
  const ref = useRef(null);
  const { ui } = usePrefs();
  const { windows, focusedKey, open, minimize } = useWM();
  const w = windows[app.id];
  const isOpen = w?.open;
  const isFocused = focusedKey === app.id;

  const distance = useTransform(mouseX, (v) => {
    const b = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return v - b.x - b.width / 2;
  });
  const size = useSpring(useTransform(distance, [-130, 0, 130], [50, 76, 50]), { mass: 0.1, stiffness: 180, damping: 14 });

  const onClick = () => {
    if (isOpen && isFocused) minimize(app.id);
    else open(app.id);
  };

  return (
    <div className="group relative flex flex-col items-center">
      <span className="pointer-events-none absolute -top-9 whitespace-nowrap border-2 border-ink bg-ink px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider text-paper-2 opacity-0 transition-opacity group-hover:opacity-100">
        {ui(app.labelKey)}
      </span>
      <motion.button
        ref={ref}
        onClick={onClick}
        aria-label={ui(app.labelKey)}
        style={{ width: size, height: size }}
        className="cursor-pointer border-0 bg-transparent p-0"
        whileTap={{ scale: 0.92 }}
      >
        <AppTile app={app} size="100%" className="h-full w-full" style={{ width: "100%", height: "100%" }} />
      </motion.button>
      <span className={`mt-1 h-1.5 w-1.5 ${isOpen ? "bg-ink" : "bg-transparent"}`} />
    </div>
  );
}

export default function Dock() {
  const mouseX = useMotionValue(Infinity);
  const { ui } = usePrefs();
  return (
    <nav
      aria-label={ui("dock.label")}
      className="pointer-events-none absolute inset-x-0 bottom-11 z-[8500] hidden justify-center md:flex"
    >
      <motion.div
        className="dock pointer-events-auto"
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 22 }}
      >
        {DOCK_APPS.map((app) => (
          <DockItem key={app.id} app={app} mouseX={mouseX} />
        ))}
      </motion.div>
    </nav>
  );
}
