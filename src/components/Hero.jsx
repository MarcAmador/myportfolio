"use client";

import { ArrowDown, Download, Mail, Terminal, Sparkles, ExternalLink, Code2 } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import { motion } from "framer-motion";
import { usePrefs } from "@/context/PrefsContext";
import { profile } from "@/data/profile";

export default function Hero() {
  const { lang, t } = usePrefs();

  const techBadges = [
    { name: "React 19", color: "bg-sky-500/10 text-sky-400 border-sky-500/20" },
    { name: "Next.js", color: "bg-slate-500/10 text-slate-300 border-slate-500/20" },
    { name: "Java 21", color: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
    { name: "Spring Boot", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
    { name: "Kotlin", color: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
    { name: "PostgreSQL", color: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
    { name: "Tailwind CSS", color: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20" },
  ];

  return (
    <section id="inicio" className="pt-28 pb-16 sm:pt-36 sm:pb-24 px-4 sm:px-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Left column: Presentation & Headline (7 cols) */}
        <div className="lg:col-span-7">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-xs font-mono mb-6 text-[var(--text-muted)] shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-mint)] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent-mint)]"></span>
            </span>
            <span className="font-medium text-[var(--text-main)]">
              {lang === "es" ? "Disponible para nuevos retos" : "Available for new projects"}
            </span>
            <span className="text-[var(--text-dim)]">•</span>
            <span>{t(profile.location)}</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[var(--text-main)] leading-[1.1] mb-6">
            {lang === "es" ? (
              <>
                Software con alma de <span className="text-[var(--accent-cyan)]">diseño</span> y rigor de <span className="text-[var(--accent-amber)]">ingeniería</span>.
              </>
            ) : (
              <>
                Software crafted with <span className="text-[var(--accent-cyan)]">design clarity</span> and <span className="text-[var(--accent-amber)]">engineering rigor</span>.
              </>
            )}
          </h1>

          {/* Subtitle / Bio description */}
          <p className="text-base sm:text-lg text-[var(--text-muted)] leading-relaxed max-w-2xl mb-8">
            {lang === "es" ? (
              <>
                Soy <strong className="text-[var(--text-main)] font-semibold">{profile.name}</strong>, desarrollador de software enfocado en crear interfaces web reactivas de alto rendimiento, sistemas backend en Java y aplicaciones nativas en Android.
              </>
            ) : (
              <>
                I&apos;m <strong className="text-[var(--text-main)] font-semibold">{profile.name}</strong>, a software developer focused on high-performance reactive web interfaces, scalable Java backend systems, and native Android applications.
              </>
            )}
          </p>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <a
              href="#proyectos"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-[var(--accent-cyan)] text-[#090d16] shadow-lg shadow-[var(--glow-cyan)] hover:opacity-95 transition-all active:scale-[0.98]"
            >
              <span>{lang === "es" ? "Explorar proyectos" : "Explore projects"}</span>
              <ArrowDown size={14} />
            </a>

            <a
              href="#demos"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-[var(--bg-surface)] border border-[var(--border-strong)] text-[var(--text-main)] hover:border-[var(--accent-amber)] hover:text-[var(--accent-amber)] transition-all active:scale-[0.98]"
            >
              <Terminal size={14} className="text-[var(--accent-amber)]" />
              <span>{lang === "es" ? "Probar software en vivo" : "Live interactive demos"}</span>
            </a>

            <a
              href="#contacto"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-main)] hover:border-[var(--border-strong)] transition-all active:scale-[0.98]"
            >
              <Mail size={14} />
              <span>{lang === "es" ? "Contactar" : "Contact"}</span>
            </a>
          </div>

          {/* Tech Badges Ticker */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[var(--border-subtle)]">
            <span className="text-xs font-mono text-[var(--text-dim)] mr-2">Stack principal:</span>
            {techBadges.map((badge) => (
              <span
                key={badge.name}
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono border ${badge.color}`}
              >
                {badge.name}
              </span>
            ))}
          </div>
        </div>

        {/* Right column: Interactive macOS Developer Card (5 cols) */}
        <div className="lg:col-span-5">
          <div className="relative rounded-2xl glass-panel-elevated border border-[var(--border-strong)] shadow-2xl overflow-hidden hover-glow">
            {/* macOS Window Titlebar */}
            <div className="px-4 py-3 bg-[var(--bg-surface)] border-b border-[var(--border-subtle)] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#ef4444]" />
                <span className="w-3 h-3 rounded-full bg-[#f59e0b]" />
                <span className="w-3 h-3 rounded-full bg-[#10b981]" />
                <span className="ml-2 text-xs font-mono text-[var(--text-dim)]">
                  estudio-marcamador.config
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--accent-mint)]/15 text-[var(--accent-mint)] border border-[var(--accent-mint)]/30">
                ACTIVO
              </span>
            </div>

            {/* Profile Avatar & Quick Bio Card */}
            <div className="p-6 space-y-5">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-[var(--border-strong)] bg-[var(--bg-base)] shadow-md shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={profile.photo}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-1 right-1 w-3 h-3 rounded-full bg-[var(--accent-mint)] border-2 border-[var(--bg-surface)]" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-[var(--text-main)] flex items-center gap-1.5">
                    {profile.name}
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--accent-cyan)]/15 text-[var(--accent-cyan)] font-normal">
                      Full Stack
                    </span>
                  </h2>
                  <p className="text-xs text-[var(--text-muted)] font-mono">
                    @{profile.handle}
                  </p>
                  <p className="text-xs text-[var(--text-dim)] mt-0.5">
                    {lang === "es" ? "Especialista en Web, Java y Android" : "Web, Java & Android specialist"}
                  </p>
                </div>
              </div>

              {/* Technical Facts / Terminal-style telemetry */}
              <div className="space-y-2 rounded-xl bg-[var(--bg-base)] p-3.5 border border-[var(--border-subtle)] font-mono text-xs">
                <div className="flex items-center justify-between text-[var(--text-dim)]">
                  <span>&gt; enfoque:</span>
                  <span className="text-[var(--accent-cyan)]">Arquitectura limpia y UX</span>
                </div>
                <div className="flex items-center justify-between text-[var(--text-dim)]">
                  <span>&gt; rendimiento:</span>
                  <span className="text-[var(--accent-mint)]">99% Lighthouse</span>
                </div>
                <div className="flex items-center justify-between text-[var(--text-dim)]">
                  <span>&gt; cobertura:</span>
                  <span className="text-[var(--accent-amber)]">JUnit 5 y Pruebas Unitarias</span>
                </div>
                <div className="flex items-center justify-between text-[var(--text-dim)]">
                  <span>&gt; persistencia:</span>
                  <span className="text-[var(--accent-purple)]">PostgreSQL, SQLite y Room</span>
                </div>
              </div>

              {/* Social Channels Dock */}
              <div className="pt-2 flex items-center justify-between border-t border-[var(--border-subtle)]">
                <div className="flex items-center gap-3 text-xs font-mono text-[var(--text-muted)]">
                  <a
                    href="https://github.com/MarcAmador"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 hover:text-[var(--accent-cyan)] transition-colors"
                  >
                    <GithubIcon size={14} />
                    <span>GitHub</span>
                  </a>
                  <span className="text-[var(--border-strong)]">•</span>
                  <a
                    href="https://linkedin.com/in/marcamador"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 hover:text-[var(--accent-cyan)] transition-colors"
                  >
                    <LinkedinIcon size={14} />
                    <span>LinkedIn</span>
                  </a>
                </div>

                <a
                  href={`mailto:${profile.email}`}
                  className="text-xs font-mono text-[var(--accent-cyan)] hover:underline flex items-center gap-1"
                >
                  <Mail size={12} />
                  <span>Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Pillars: Frontend, Backend, Móvil con acentos cromáticos individuales (NO monocromático) */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Pilar 1: Frontend (Cyan) */}
        <div className="p-5 rounded-2xl glass-panel border border-[var(--border-subtle)] hover:border-[var(--accent-cyan)]/50 transition-colors">
          <div className="flex items-center gap-2 mb-2 font-mono text-xs text-[var(--accent-cyan)]">
            <Code2 size={16} />
            <span className="font-semibold uppercase tracking-wider">Frontend y Experiencia Web</span>
          </div>
          <p className="text-sm text-[var(--text-muted)] leading-relaxed">
            {lang === "es"
              ? "Interfaces reactivas creadas con React 19 y Next.js. Optimización de renderizado (SSR/SSG), Server Components y diseño fluido con Tailwind CSS."
              : "Reactive interfaces built with React 19 and Next.js. Optimized hybrid rendering, Server Components, and responsive Tailwind layouts."}
          </p>
        </div>

        {/* Pilar 2: Backend (Amber) */}
        <div className="p-5 rounded-2xl glass-panel border border-[var(--border-subtle)] hover:border-[var(--accent-amber)]/50 transition-colors">
          <div className="flex items-center gap-2 mb-2 font-mono text-xs text-[var(--accent-amber)]">
            <Terminal size={16} />
            <span className="font-semibold uppercase tracking-wider">Backend y Arquitectura Java</span>
          </div>
          <p className="text-sm text-[var(--text-muted)] leading-relaxed">
            {lang === "es"
              ? "Servicios empresariales robustos en Java 21 y Spring Boot. APIs REST seguras, inyección de dependencias y persistencia en PostgreSQL y SQLite."
              : "Robust enterprise services in Java 21 and Spring Boot. Secure REST APIs, dependency injection, and persistence with PostgreSQL & SQLite."}
          </p>
        </div>

        {/* Pilar 3: Móvil (Purple) */}
        <div className="p-5 rounded-2xl glass-panel border border-[var(--border-subtle)] hover:border-[var(--accent-purple)]/50 transition-colors">
          <div className="flex items-center gap-2 mb-2 font-mono text-xs text-[var(--accent-purple)]">
            <Sparkles size={16} />
            <span className="font-semibold uppercase tracking-wider">Móvil y Android Nativo</span>
          </div>
          <p className="text-sm text-[var(--text-muted)] leading-relaxed">
            {lang === "es"
              ? "Aplicaciones móviles nativas con Kotlin y Jetpack Compose. Arquitectura MVVM, inyección Hilt, base de datos local con Room y sincronización fluida."
              : "Native mobile apps built with Kotlin and Jetpack Compose. Clean MVVM architecture, Hilt injection, local Room persistence, and fluid UX."}
          </p>
        </div>
      </div>
    </section>
  );
}
