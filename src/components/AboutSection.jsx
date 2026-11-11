"use client";

import { MapPin, Code2, Sparkles, Terminal, Heart, User, CheckCircle2 } from "lucide-react";
import { usePrefs } from "@/context/PrefsContext";
import { profile } from "@/data/profile";

export default function AboutSection() {
  const { lang, t } = usePrefs();

  return (
    <section id="sobre-mi" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto border-t border-[var(--border-subtle)] relative">
      <div className="absolute inset-0 dot-matrix-cyan opacity-10 pointer-events-none -z-10" />

      {/* Cabecera */}
      <div className="mb-14">
        <div className="flex items-center gap-2 mb-3">
          <span className="origami-ribbon origami-ribbon-cyan text-[10px]">
            FILOSOFÍA DE TRABAJO
          </span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-main)] mb-4">
          {lang === "es" ? "Cómo Trabajo y Qué Priorizo" : "How I Work & What I Value"}
        </h2>
        <p className="text-[var(--text-muted)] max-w-2xl text-base leading-relaxed">
          {lang === "es"
            ? "Criterios claros que aplico al escribir código, diseñar interfaces y colaborar en proyectos de ingeniería."
            : "The principles I apply when writing code, architecting backends, and collaborating on software projects."}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Profile Card & Stats (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl glass-panel-elevated bento-puzzle-l border-2 border-sky-400/40 p-6 text-center hover-glow shadow-2xl relative overflow-hidden">
            <div className="relative w-32 h-32 mx-auto rounded-2xl overflow-hidden border-2 border-[var(--accent-cyan)] bg-[var(--bg-base)] mb-4 shadow-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={profile.photo}
                alt={profile.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-extrabold text-xl text-[var(--text-main)]">{profile.name}</h3>
            <p className="text-xs font-mono text-[var(--accent-cyan)] font-semibold mb-2">@{profile.handle}</p>
            <p className="inline-flex items-center gap-1.5 text-xs text-[var(--text-muted)] font-mono">
              <MapPin size={13} className="text-[var(--accent-amber)]" />
              <span>{t(profile.location)}</span>
            </p>
          </div>

          {/* Quick Metrics Bento */}
          <div className="grid grid-cols-3 gap-3">
            {profile.facts.map((fact, i) => (
              <div
                key={i}
                className="rounded-2xl glass-panel border border-[var(--border-subtle)] p-3.5 text-center hover:border-amber-400/50 transition-colors"
              >
                <span className="block text-xs font-bold text-[var(--text-main)] font-mono">
                  {fact.v}
                </span>
                <span className="block text-[10px] text-[var(--text-dim)] font-mono uppercase mt-1 leading-tight">
                  {t(fact.k)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Narrative & Values (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-7 sm:p-8 rounded-3xl glass-panel bento-puzzle-r border-2 border-amber-400/30 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="origami-ribbon origami-ribbon-amber text-[10px]">
                ENFOQUE DIRECTO
              </span>
            </div>

            {t(profile.bio).map((paragraph, i) => (
              <p
                key={i}
                className={`text-sm sm:text-base leading-relaxed ${
                  i === 0 ? "text-[var(--text-main)] font-medium" : "text-[var(--text-muted)]"
                }`}
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* 2 Core Values Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl glass-panel bento-puzzle-notch border-l-4 border-l-[var(--accent-cyan)] border-[var(--border-subtle)] hover:border-sky-400 transition-colors">
              <span className="text-[var(--accent-cyan)] font-bold text-xs font-mono flex items-center gap-1.5 mb-2">
                <Code2 size={15} /> CÓDIGO CLARO Y MANTENIBLE
              </span>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed font-sans">
                {lang === "es"
                  ? "Escribo código pensando en quien lo leerá después. Nombres descriptivos, responsabilidades aisladas y pruebas automáticas para evitar dolores de cabeza."
                  : "I write code with future maintainers in mind. Clear names, isolated responsibilities, and automated tests to prevent headaches."}
              </p>
            </div>

            <div className="p-5 rounded-2xl glass-panel bento-puzzle-notch border-l-4 border-l-[var(--accent-amber)] border-[var(--border-subtle)] hover:border-amber-400 transition-colors">
              <span className="text-[var(--accent-amber)] font-bold text-xs font-mono flex items-center gap-1.5 mb-2">
                <Sparkles size={15} /> RENDIMIENTO Y USABILIDAD
              </span>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed font-sans">
                {lang === "es"
                  ? "Las aplicaciones deben responder sin demoras. Optimizo la carga inicial, reduzco dependencias innecesarias y cuido que cada botón o formulario se entienda a la primera."
                  : "Applications must respond immediately. I optimize load times, cut unnecessary bloat, and make sure every flow is intuitive."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
