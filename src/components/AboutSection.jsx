"use client";

import { MapPin, Code2, Heart, Sparkles } from "lucide-react";
import { usePrefs } from "@/context/PrefsContext";
import { profile } from "@/data/profile";

export default function AboutSection() {
  const { lang, t } = usePrefs();

  return (
    <section id="sobre-mi" className="py-20 px-4 sm:px-6 max-w-5xl mx-auto border-t border-border">
      {/* Header */}
      <div className="mb-12">
        <span className="section-label">05 // PERFIL PROFESIONAL</span>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text mb-3">
          {lang === "es" ? "Sobre mí" : "About Me"}
        </h2>
        <p className="text-text-muted max-w-2xl text-base">
          {lang === "es"
            ? "Conoce mi trasfondo técnico, metodología de desarrollo y compromiso con el software bien hecho."
            : "Learn about my background, development methodology, and commitment to building solid software."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Profile Card & Stats (4 cols) */}
        <div className="md:col-span-5 space-y-6">
          <div className="rounded-2xl border border-border bg-surface shadow-sm p-5 text-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={profile.photo}
              alt={profile.name}
              className="w-32 h-32 mx-auto rounded-full object-cover border border-border-strong mb-4"
            />
            <h3 className="font-bold text-lg text-text">{profile.name}</h3>
            <p className="text-xs font-mono text-accent mb-2">@{profile.handle}</p>
            <p className="inline-flex items-center gap-1.5 text-xs text-text-muted">
              <MapPin size={13} />
              <span>{t(profile.location)}</span>
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-2">
            {profile.facts.map((fact, i) => (
              <div key={i} className="rounded-2xl border border-border bg-surface shadow-sm p-3 text-center">
                <span className="block text-2xl font-bold text-text font-mono">{fact.v}</span>
                <span className="block text-[11px] text-text-subtle font-mono uppercase mt-0.5 leading-tight">
                  {t(fact.k)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Narrative & Values (7 cols) */}
        <div className="md:col-span-7 space-y-5 text-sm sm:text-base text-text-muted leading-relaxed">
          {t(profile.bio).map((paragraph, i) => (
            <p key={i} className={i === 0 ? "text-text font-medium leading-relaxed" : ""}>
              {paragraph}
            </p>
          ))}

          {/* Core Values Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 font-mono text-xs">
            <div className="p-3.5 rounded-xl border border-border bg-surface">
              <span className="text-accent font-semibold flex items-center gap-1.5 mb-1">
                <Code2 size={14} /> CLEAN ARCHITECTURE
              </span>
              <p className="text-text-muted font-sans text-xs">
                {lang === "es"
                  ? "Código tipado, separación de responsabilidades y mantenibilidad a largo plazo."
                  : "Typed code, separation of concerns, and long-term maintainability."}
              </p>
            </div>
            <div className="p-3.5 rounded-xl border border-border bg-surface">
              <span className="text-accent font-semibold flex items-center gap-1.5 mb-1">
                <Sparkles size={14} /> USER EXPERIENCE
              </span>
              <p className="text-text-muted font-sans text-xs">
                {lang === "es"
                  ? "Atención meticulosa a los micro-detalles, velocidad de carga y accesibilidad."
                  : "Meticulous attention to micro-interactions, loading speed, and accessibility."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
