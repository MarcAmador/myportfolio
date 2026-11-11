"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Smartphone, Code2, Sparkles, Cpu, ExternalLink } from "lucide-react";
import { usePrefs } from "@/context/PrefsContext";
import JavaTerminal from "@/components/demos/JavaTerminal";
import AndroidPhone from "@/components/demos/AndroidPhone";
import WebLab from "@/components/demos/WebLab";

export default function DemosSection({ selectedTab, onTabChange }) {
  const { lang } = usePrefs();
  const [internalTab, setInternalTab] = useState("java");

  const currentTab = selectedTab || internalTab;
  const setTab = (t) => {
    setInternalTab(t);
    if (onTabChange) onTabChange(t);
  };

  const tabs = [
    {
      id: "java",
      title: "Java 21 — Motor de Préstamos",
      subtitle: "Terminal interactiva y arquitectura en capas",
      icon: Terminal,
      color: "text-amber-400",
      pillColor: "border-amber-500/30 bg-amber-500/10 text-amber-400",
    },
    {
      id: "android",
      title: "Android — Simulador HabitNest",
      subtitle: "App nativa con Kotlin y Jetpack Compose",
      icon: Smartphone,
      color: "text-purple-400",
      pillColor: "border-purple-500/30 bg-purple-500/10 text-purple-400",
    },
    {
      id: "web",
      title: "React 19 — Telemetría Web",
      subtitle: "Estado reactivo y caché en el Edge",
      icon: Code2,
      color: "text-sky-400",
      pillColor: "border-sky-500/30 bg-sky-500/10 text-sky-400",
    },
  ];

  return (
    <section id="demos" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto border-t border-[var(--border-subtle)]">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-3">
          <span className="folded-ribbon folded-ribbon-amber text-[10px] rounded-sm">
            SOFTWARE EN EJECUCIÓN
          </span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-main)] mb-4">
          {lang === "es" ? "Laboratorio de Software en Vivo" : "Live Software Lab"}
        </h2>
        <p className="text-[var(--text-muted)] max-w-2xl text-base leading-relaxed">
          {lang === "es"
            ? "Prueba aplicaciones reales corriendo directamente en tu navegador: la terminal de servicios en Java 21, el simulador nativo de Android y el laboratorio de telemetría en React 19."
            : "Interact with functional software directly in your browser: the Java 21 service terminal, the native Android habit tracker, and the React 19 telemetry sandbox."}
        </p>

        {/* Studio Environment Switcher with Framer Motion slide */}
        <div className="flex flex-wrap items-center gap-2 mt-8 p-1.5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] w-fit">
          {tabs.map((tab) => {
            const isActive = currentTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setTab(tab.id)}
                className={`relative px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium flex items-center gap-2 transition-all cursor-pointer ${
                  isActive ? "text-[var(--text-main)] font-semibold" : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeDemoTab"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    className="absolute inset-0 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-strong)] shadow-sm -z-10"
                  />
                )}
                <Icon size={16} className={tab.color} />
                <span>{tab.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Demo Viewport */}
      <div className="rounded-2xl glass-panel-elevated border border-[var(--border-strong)] p-6 sm:p-8 shadow-2xl">
        <AnimatePresence mode="wait">
          {currentTab === "java" && (
            <motion.div
              key="java"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-[var(--border-subtle)]">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl font-bold text-[var(--text-main)]">
                      Biblioteca Central — Motor de Préstamos
                    </h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-amber-500/15 text-amber-400 border border-amber-500/30">
                      Java 21
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[var(--text-muted)]">
                    {lang === "es"
                      ? "Arquitectura limpia por capas (Modelo, Repositorio, Servicio) con cálculo de multas y persistencia."
                      : "Clean layered architecture (Model, Repository, Service) with automatic fines and persistence."}
                  </p>
                </div>

                <div className="flex items-center gap-2 font-mono text-xs text-[var(--text-dim)]">
                  <span>SQLite • JUnit 5 • SOLID</span>
                </div>
              </div>

              <JavaTerminal />
            </motion.div>
          )}

          {currentTab === "android" && (
            <motion.div
              key="android"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-[var(--border-subtle)]">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl font-bold text-[var(--text-main)]">
                      HabitNest — Gestor de Hábitos
                    </h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-purple-500/15 text-purple-400 border border-purple-500/30">
                      Android Nativo • Kotlin
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[var(--text-muted)]">
                    {lang === "es"
                      ? "Simulación interactiva de la interfaz en Jetpack Compose, con rachas diarias y almacenamiento en Room."
                      : "Interactive Jetpack Compose replica with streak counters, progress ring, and Room local persistence."}
                  </p>
                </div>

                <div className="flex items-center gap-2 font-mono text-xs text-[var(--text-dim)]">
                  <span>MVVM • Hilt • Room DB</span>
                </div>
              </div>

              <div className="flex justify-center py-4">
                <AndroidPhone />
              </div>
            </motion.div>
          )}

          {currentTab === "web" && (
            <motion.div
              key="web"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-[var(--border-subtle)]">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl font-bold text-[var(--text-main)]">
                      Telemetría y Estado Reactivo
                    </h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-sky-500/15 text-sky-400 border border-sky-500/30">
                      React 19 • Next.js
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[var(--text-muted)]">
                    {lang === "es"
                      ? "Prueba en vivo la re-validación de caché, transiciones asíncronas con useTransition y filtrado en milisegundos."
                      : "Live testing of cache revalidation, asynchronous transitions with useTransition, and sub-millisecond filtering."}
                  </p>
                </div>

                <div className="flex items-center gap-2 font-mono text-xs text-[var(--text-dim)]">
                  <span>Server Actions • Edge Cache • App Router</span>
                </div>
              </div>

              <WebLab />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
