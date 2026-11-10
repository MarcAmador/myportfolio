"use client";

import { AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";
import { WindowProvider, useWM } from "@/context/WindowContext";
import { usePrefs } from "@/context/PrefsContext";
import { APPS } from "@/data/apps";
import { getProject } from "@/data/projects";
import About from "@/components/apps/About";
import Projects from "@/components/apps/Projects";
import Demos from "@/components/apps/Demos";
import Skills from "@/components/apps/Skills";
import Experience from "@/components/apps/Experience";
import Contact from "@/components/apps/Contact";
import CV from "@/components/apps/CV";
import ProjectDetail from "@/components/ProjectDetail";
import Hero from "./Hero";
import MenuBar from "./MenuBar";
import Dock from "./Dock";
import Window from "./Window";

function AppBody({ win }) {
  switch (win.app) {
    case "about":
      return <About />;
    case "projects":
      return <Projects />;
    case "demos":
      return <Demos initial={win.payload} />;
    case "skills":
      return <Skills />;
    case "experience":
      return <Experience />;
    case "contact":
      return <Contact />;
    case "cv":
      return <CV />;
    case "project":
      return <ProjectDetail slug={win.payload} variant="window" />;
    default:
      return null;
  }
}

function Shell() {
  const layerRef = useRef(null);
  const { openWindows, focusedKey, close, open } = useWM();
  const { ui } = usePrefs();

  // Enlaces profundos: /?open=demos&tab=java abre esa ventana al cargar
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const app = params.get("open");
    if (app && APPS[app] && app !== "project") {
      open(app, params.get("tab") || undefined);
      window.history.replaceState(null, "", "/");
    }
  }, [open]);

  // Esc cierra la ventana activa (solo si el foco no está en un campo de texto)
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== "Escape" || !focusedKey) return;
      if (["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName)) return;
      close(focusedKey);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [focusedKey, close]);

  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <MenuBar />
      <main className="relative min-h-0 flex-1" aria-label={ui("menu.desktop")}>
        <Hero />
        <div ref={layerRef} className="pointer-events-none absolute inset-0 overflow-hidden">
          <AnimatePresence>
            {openWindows.map((win) => {
              const meta = APPS[win.app];
              const proj = win.app === "project" ? getProject(win.payload) : null;
              return (
                <Window
                  key={win.key}
                  win={win}
                  title={proj ? proj.title : ui(meta.labelKey)}
                  color={proj ? proj.color : meta.color}
                  constraintsRef={layerRef}
                >
                  <AppBody win={win} />
                </Window>
              );
            })}
          </AnimatePresence>
        </div>
        <Dock />
      </main>
    </div>
  );
}

export default function Desktop() {
  return (
    <WindowProvider>
      <Shell />
    </WindowProvider>
  );
}
