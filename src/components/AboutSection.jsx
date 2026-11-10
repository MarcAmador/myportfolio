"use client";

import { MapPin, Code2, Sparkles, Terminal, Heart, User, CheckCircle2 } from "lucide-react";
import { usePrefs } from "@/context/PrefsContext";
import { profile } from "@/data/profile";

export default function AboutSection() {
  const { lang, t } = usePrefs();

  return (
    <section id="sobre-mi" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto border-t border-[var(--border-subtle)]">
      {/* Header */}
      <div className="mb-14">
        <div className="flex items-center gap-2 mb-2 font-mono text-xs text-[var(--accent-mint)] uppercase tracking-wider">
          <User size={14} />
          <span>Perfil y Filosofía</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-main)] mb-4">
          {lang === "es" ? "Sobre Mí y Mi Método" : "About Me & Philosophy"}
        </h2>
        <p className="text-[var(--text-muted)] max-w-2xl text-base leading-relaxed">
          {lang === "es"
            ? "Conoce mi enfoque de trabajo, los principios que guían mis decisiones técnicas y mi compromiso con el software bien diseñado."
            : "Learn about my work ethos, the principles behind my architectural choices, and my commitment to well-crafted software."}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Profile Card & Stats (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl glass-panel border border-[var(--border-subtle)] p-6 text-center hover-glow shadow-xl">
            <div className="relative w-32 h-32 mx-auto rounded-2xl overflow-hidden border border-[var(--border-strong)] bg-[var(--bg-base)] mb-4 shadow-md">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={profile.photo}
                alt={profile.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-bold text-xl text-[var(--text-main)]">{profile.name}</h3>
            <p className="text-xs font-mono text-[var(--accent-cyan)] mb-2">@{profile.handle}</p>
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
                className="rounded-2xl glass-panel border border-[var(--border-subtle)] p-4 text-center hover:border-[var(--border-strong)] transition-colors"
              >
                <span className="block text-2xl font-extrabold text-[var(--text-main)] font-mono">
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
          <div className="p-7 rounded-2xl glass-panel border border-[var(--border-subtle)] space-y-4">
            <h3 className="text-lg font-bold text-[var(--text-main)] flex items-center gap-2">
              <Sparkles size={16} className="text-[var(--accent-cyan)]" />
              <span>{lang === "es" ? "Artesanía en el Código" : "Code Craftsmanship"}</span>
            </h3>

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

          {/* 3 Core Values Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl glass-panel border border-[var(--border-subtle)] hover:border-[var(--accent-cyan)]/40 transition-colors">
              <span className="text-[var(--accent-cyan)] font-bold text-xs font-mono flex items-center gap-1.5 mb-2">
                <Code2 size={15} /> ARQUITECTURA LIMPIA
              </span>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed font-sans">
                {lang === "es"
                  ? "Tipado estricto, separación de responsabilidades y modularidad para que el sistema crezca sin volverse frágil."
                  : "Strict typing, separation of concerns, and modularity so systems can scale without becoming fragile."}
              </p>
            </div>

            <div className="p-5 rounded-xl glass-panel border border-[var(--border-subtle)] hover:border-[var(--accent-mint)]/40 transition-colors">
              <span className="text-[var(--accent-mint)] font-bold text-xs font-mono flex items-center gap-1.5 mb-2">
                <Sparkles size={15} /> EXPERIENCIA FLUIDA
              </span>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed font-sans">
                {lang === "es"
                  ? "Atención obsesiva a los micro-detalles: tiempos de respuesta menores a 100ms, transiciones suaves y accesibilidad."
                  : "Obsessive attention to micro-details: sub-100ms response times, silky transitions, and accessibility."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
