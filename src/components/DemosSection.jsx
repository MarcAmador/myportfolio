"use client";

import { GithubIcon, LinkedinIcon } from "@/components/Icons";

import { useState } from "react";
import { Terminal, Smartphone, Download, Info } from "lucide-react";
import { usePrefs } from "@/context/PrefsContext";
import JavaTerminal from "@/components/demos/JavaTerminal";
import AndroidPhone from "@/components/demos/AndroidPhone";

export default function DemosSection({ selectedTab, onTabChange }) {
  const { lang, ui } = usePrefs();
  const [internalTab, setInternalTab] = useState("java");

  const currentTab = selectedTab || internalTab;
  const setTab = (t) => {
    setInternalTab(t);
    if (onTabChange) onTabChange(t);
  };

  return (
    <section id="demos" className="py-20 px-4 sm:px-6 max-w-5xl mx-auto border-t border-border">
      {/* Header */}
      <div className="mb-10">
        <span className="section-label">02 // DEMOS INTERACTIVAS</span>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text mb-3">
          {lang === "es" ? "Software que puedes probar aquí" : "Interactive Software Demos"}
        </h2>
        <p className="text-text-muted max-w-2xl text-base">
          {lang === "es"
            ? "Explora réplicas interactivas y código real de aplicaciones construidas en Java y Android sin salir del navegador."
            : "Test-drive interactive replicas and view real production code for Java and Android applications right in your browser."}
        </p>

        {/* Demo Switcher Tabs */}
        <div className="flex flex-wrap items-center gap-2 mt-6">
          <button
            onClick={() => setTab("java")}
            aria-pressed={currentTab === "java"}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
              currentTab === "java"
                ? "bg-surface border border-accent text-text shadow-sm"
                : "bg-surface/50 border border-border text-text-muted hover:text-text"
            }`}
          >
            <Terminal size={16} className={currentTab === "java" ? "text-accent" : "text-text-subtle"} />
            <span>Biblioteca Central (Java 21)</span>
          </button>
          <button
            onClick={() => setTab("android")}
            aria-pressed={currentTab === "android"}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
              currentTab === "android"
                ? "bg-surface border border-accent text-text shadow-sm"
                : "bg-surface/50 border border-border text-text-muted hover:text-text"
            }`}
          >
            <Smartphone size={16} className={currentTab === "android" ? "text-accent" : "text-text-subtle"} />
            <span>HabitNest (Android & Kotlin)</span>
          </button>
        </div>
      </div>

      {/* Demo Showcase Container */}
      <div className="rounded-2xl border border-border bg-surface shadow-sm p-5 sm:p-8 bg-surface">
        {currentTab === "java" && (
          <div>
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-border">
              <div>
                <h3 className="text-xl font-bold text-text">Biblioteca Central</h3>
                <p className="text-xs font-mono text-text-muted mt-0.5">
                  Java 21 · Arquitectura por capas · SQLite · Pruebas JUnit 5
                </p>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="https://github.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-surface border border-border text-text-muted hover:text-text hover:border-border-strong transition-all"
                >
                  <GithubIcon size={13} />
                  <span>{lang === "es" ? "Ver repositorio" : "View repo"}</span>
                </a>
              </div>
            </div>

            <div className="mb-6 p-3 rounded-lg bg-surface-hover border border-border text-xs text-text-muted flex items-start gap-2.5">
              <Info size={16} className="text-accent flex-none mt-0.5" />
              <span>
                {lang === "es"
                  ? "Esta terminal reproduce la lógica y comandos del programa Java real. Puedes teclear comandos como 'listar', 'prestar 2 Ana' o cambiar a la pestaña 'LoanService.java' para inspeccionar el código fuente."
                  : "This terminal mirrors the logic and output of the actual Java application. You can type commands like 'list', 'loan 2 Ana' or inspect the real 'LoanService.java' source code."}
              </span>
            </div>

            <JavaTerminal />
          </div>
        )}

        {currentTab === "android" && (
          <div>
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-border">
              <div>
                <h3 className="text-xl font-bold text-text">HabitNest</h3>
                <p className="text-xs font-mono text-text-muted mt-0.5">
                  Kotlin · Jetpack Compose · Room Database · MVVM Architecture
                </p>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="https://example.com/habitnest.apk"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-accent text-accent-fg shadow-sm hover:opacity-90 transition-all"
                >
                  <Download size={13} />
                  <span>{lang === "es" ? "Descargar APK" : "Download APK"}</span>
                </a>
                <a
                  href="https://github.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-surface border border-border text-text-muted hover:text-text hover:border-border-strong transition-all"
                >
                  <GithubIcon size={13} />
                  <span>{lang === "es" ? "Código" : "Code"}</span>
                </a>
              </div>
            </div>

            <div className="mb-6 p-3 rounded-lg bg-surface-hover border border-border text-xs text-text-muted flex items-start gap-2.5">
              <Info size={16} className="text-accent flex-none mt-0.5" />
              <span>
                {lang === "es"
                  ? "Emulador visual interactivo de la app nativa en Android. Puedes marcar hábitos como completados para ver cómo se actualiza el anillo de progreso y la racha en tiempo real."
                  : "Interactive visual emulator of the native Android application. Toggle habits to see the live progress ring and streak updates in real time."}
              </span>
            </div>

            <AndroidPhone />
          </div>
        )}
      </div>
    </section>
  );
}
