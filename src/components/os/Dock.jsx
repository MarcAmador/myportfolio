"use client";

import { motion } from "framer-motion";
import { usePrefs } from "@/context/PrefsContext";
import { useWM } from "@/context/WindowContext";
import { DOCK_APPS } from "@/data/apps";

function DockItem({ app }) {
  const { ui } = usePrefs();
  const { windows, focusedKey, open, minimize } = useWM();
  const w = windows[app.id];
  const isOpen = !!w?.open;
  const { Icon } = app;

  return (
    <div className="group relative">
      <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-line-strong bg-surface px-2 py-1 text-xs text-fg opacity-0 transition-opacity group-hover:opacity-100">
        {ui(app.labelKey)}
      </span>
      <button
        className="dock-item"
        data-open={isOpen}
        aria-label={ui(app.labelKey)}
        onClick={() => (isOpen && focusedKey === app.id ? minimize(app.id) : open(app.id))}
      >
        <Icon size={20} strokeWidth={1.7} />
      </button>
    </div>
  );
}

export default function Dock() {
  const { ui } = usePrefs();
  return (
    <nav aria-label={ui("dock.label")} className="pointer-events-none absolute inset-x-0 bottom-6 z-[8500] hidden justify-center md:flex">
      <motion.div
        className="dock pointer-events-auto"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 260, damping: 26 }}
      >
        {DOCK_APPS.map((app) => (
          <DockItem key={app.id} app={app} />
        ))}
      </motion.div>
    </nav>
  );
}
