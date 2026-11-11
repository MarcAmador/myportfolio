"use client";

import { ArrowDown, Mail, Terminal, Sparkles, Code2, Layers, Cpu } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import { usePrefs } from "@/context/PrefsContext";
import { profile } from "@/data/profile";

export default function Hero() {
  const { lang, t } = usePrefs();

  return (
    <section id="inicio" className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 px-4 sm:px-6 max-w-6xl mx-auto overflow-hidden">
      {/* Elementos geométricos decorativos de fondo con rotación y formas asimétricas */}
      <div className="absolute top-16 right-6 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-44 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Marca de fondo de matriz geométrica */}
      <div className="absolute -top-10 right-20 w-36 h-36 dot-matrix-cyan opacity-25 pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-44 h-44 dot-matrix-amber opacity-20 pointer-events-none -z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Columna Izquierda: Presentación y Título (7 cols) */}
        <div className="lg:col-span-7 relative">
          {/* Cintas origami con pliegues tridimensionales */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="origami-ribbon origami-ribbon-amber">
              <span className="w-2 h-2 rounded-full bg-[#090d16] inline-block animate-pulse" />
              <span>{lang === "es" ? "Disponible para proyectos" : "Available for projects"}</span>
            </div>

            <div className="origami-ribbon origami-ribbon-cyan">
              <span>{t(profile.location)}</span>
            </div>

            <span className="font-mono text-xs text-[var(--accent-cyan)] font-bold tracking-widest hidden sm:inline-block">
              ✦ EDICIÓN 2026
            </span>
          </div>

          {/* Título Principal: Directo, humano, contundente y sin clichés */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[var(--text-main)] leading-[1.08] mb-6">
            {lang === "es" ? (
              <>
                Construyo software <span className="text-[var(--accent-cyan)] underline decoration-[var(--accent-cyan)]/40 decoration-wavy decoration-2">veloz</span>, interfaces claras y sistemas que no fallan.
              </>
            ) : (
              <>
                Building <span className="text-[var(--accent-cyan)] underline decoration-[var(--accent-cyan)]/40 decoration-wavy decoration-2">fast</span> software, clean interfaces, and resilient systems.
              </>
            )}
          </h1>

          {/* Texto de biografía auténtico, con personalidad de desarrollador */}
          <p className="text-base sm:text-lg text-[var(--text-muted)] leading-relaxed max-w-2xl mb-8 font-sans">
            {lang === "es" ? (
              <>
                Hola, soy <strong className="text-[var(--text-main)] font-semibold">{profile.name}</strong>. Me apasiona resolver problemas reales creando aplicaciones web interactivas, servicios backend estructurados y software móvil que se siente ligero en la mano. Menos complejidad artificial, más rendimiento y código legible.
              </>
            ) : (
              <>
                Hi, I&apos;m <strong className="text-[var(--text-main)] font-semibold">{profile.name}</strong>. I build practical digital products: responsive web apps, structured backend services, and native mobile software that feels lightweight. Less artificial complexity, more speed and readable code.
              </>
            )}
          </p>

          {/* Botones de acción principales */}
          <div className="flex flex-wrap items-center gap-3 mb-10">
            <a
              href="#proyectos"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-[var(--accent-cyan)] text-[#090d16] shadow-lg shadow-[var(--glow-cyan)] hover:opacity-95 transition-all active:scale-[0.98] cursor-pointer"
            >
              <span>{lang === "es" ? "Ver proyectos" : "View projects"}</span>
              <ArrowDown size={14} />
            </a>

            <a
              href="#demos"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-[var(--bg-surface)] border border-[var(--accent-amber)]/50 text-[var(--accent-amber)] hover:bg-[var(--accent-amber)] hover:text-[#090d16] transition-all active:scale-[0.98] cursor-pointer"
            >
              <Terminal size={14} />
              <span>{lang === "es" ? "Probar software en vivo" : "Live interactive demos"}</span>
            </a>

            <a
              href="#contacto"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-[var(--bg-surface)] border border-[var(--border-strong)] text-[var(--text-main)] hover:border-[var(--accent-cyan)] hover:text-[var(--accent-cyan)] transition-all active:scale-[0.98] cursor-pointer"
            >
              <Mail size={14} />
              <span>{lang === "es" ? "Estación de despacho" : "Dispatch memo"}</span>
            </a>
          </div>

          {/* Píldoras de Herramientas Principales con estilo modular */}
          <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-[var(--border-subtle)] font-mono text-xs text-[var(--text-dim)]">
            <span className="font-semibold text-[var(--text-muted)] mr-1 flex items-center gap-1.5">
              <Cpu size={13} className="text-[var(--accent-cyan)]" /> Herramientas activas:
            </span>
            {["React 19", "Next.js", "Java 21", "Spring Boot", "Kotlin", "Compose", "PostgreSQL", "SQLite"].map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-md bg-[var(--bg-surface)] text-[var(--text-main)] border border-[var(--border-subtle)] hover:border-[var(--accent-cyan)]/40 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Columna Derecha: Tarjeta Bento Asimétrica con contornos inspirados en image.png (5 cols) */}
        <div className="lg:col-span-5 relative">
          {/* Adornos geométricos con inclinación y sombra (estilo cintas y polígonos doblados) */}
          <div className="absolute -top-3 -right-3 w-14 h-14 bg-amber-400/20 rounded-2xl transform rotate-12 -z-10 border border-amber-400/40" />
          <div className="absolute -bottom-3 -left-3 w-16 h-16 bg-sky-400/20 rounded-2xl transform -rotate-6 -z-10 border border-sky-400/40" />

          {/* Tarjeta Bento con esquina recortada asimétrica y textura de matriz de puntos */}
          <div className="relative rounded-3xl glass-panel-elevated bento-puzzle-l border-2 border-sky-400/50 p-6 sm:p-7 shadow-2xl overflow-hidden hover-glow">
            {/* Cinta superior derecha tipo origami sin ningún slash */}
            <div className="absolute top-0 right-0">
              <span className="origami-ribbon origami-ribbon-cyan text-[10px] tracking-wider rounded-none rounded-bl-xl shadow-md">
                MARC AMADOR ✦ 2026
              </span>
            </div>

            {/* Cabecera de la tarjeta con avatar e identidad */}
            <div className="flex items-center gap-4 mb-6 pt-3">
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-[var(--accent-cyan)] bg-[var(--bg-base)] shadow-lg shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={profile.photo}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h2 className="text-lg font-bold text-[var(--text-main)] flex items-center gap-2">
                  {profile.name}
                </h2>
                <p className="text-xs font-mono text-[var(--accent-amber)] font-semibold">
                  @{profile.handle}
                </p>
                <div className="flex items-center gap-1.5 mt-1 font-mono text-[11px] text-[var(--text-muted)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-mint)]" />
                  <span>En línea · Disponible</span>
                </div>
              </div>
            </div>

            {/* Panel de Datos y Enfoque Profesional (Legible y limpio con acento sutil) */}
            <div className="rounded-2xl bg-[var(--bg-base)]/90 backdrop-blur-sm p-4 border border-[var(--border-strong)] space-y-3 font-mono text-xs mb-6 shadow-inner relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 dot-matrix-cyan opacity-15 pointer-events-none -z-10" />

              <div className="flex items-start justify-between gap-2">
                <span className="text-[var(--text-dim)] uppercase tracking-wider text-[10px]">Rol:</span>
                <span className="text-[var(--text-main)] font-semibold text-right">Desarrollador de Software</span>
              </div>
              <div className="flex items-start justify-between gap-2">
                <span className="text-[var(--text-dim)] uppercase tracking-wider text-[10px]">Especialidad:</span>
                <span className="text-[var(--accent-cyan)] font-semibold text-right">Web Full-Stack · Java · Móvil</span>
              </div>
              <div className="flex items-start justify-between gap-2">
                <span className="text-[var(--text-dim)] uppercase tracking-wider text-[10px]">Filosofía:</span>
                <span className="text-[var(--text-muted)] text-right font-sans text-[11px]">Diseño intuitivo, cero redundancia y código probado.</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-[var(--border-subtle)] text-[11px]">
                <span className="text-[var(--accent-amber)] font-bold">Laboratorio interactivo:</span>
                <span className="px-2 py-0.5 rounded-full bg-[var(--accent-mint)]/20 text-[var(--accent-mint)] font-bold">3 demos activas</span>
              </div>
            </div>

            {/* Enlaces directos a redes y contacto */}
            <div className="flex items-center justify-between pt-2 border-t border-[var(--border-subtle)] font-mono text-xs">
              <div className="flex items-center gap-3 text-[var(--text-muted)]">
                <a
                  href="https://github.com/MarcAmador"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 hover:text-[var(--accent-cyan)] transition-colors"
                >
                  <GithubIcon size={14} />
                  <span>GitHub</span>
                </a>
                <span>•</span>
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
                className="text-xs font-mono font-bold text-[var(--accent-cyan)] hover:underline"
              >
                {profile.email}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Bloques Modulares Asimétricos (Frontend, Backend, Móvil) inspirados en Bento Grid de image_2.png */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Bloque 1: Web (Cyan) con esquinas orgánicas y cinta origami */}
        <div className="p-6 rounded-3xl glass-panel bento-puzzle-l border-2 border-sky-400/40 hover:border-sky-400 transition-all hover-glow group">
          <div className="flex items-center justify-between mb-4">
            <span className="origami-ribbon origami-ribbon-cyan text-[10px]">
              01 ✦ FRONTEND
            </span>
            <Code2 size={18} className="text-[var(--accent-cyan)] group-hover:scale-110 transition-transform" />
          </div>
          <h3 className="font-bold text-lg text-[var(--text-main)] mb-1.5">
            React 19 & Next.js
          </h3>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
            {lang === "es"
              ? "Interfaces reactivas, Server Components y renderizado híbrido. Navegación instantánea y diseño limpio con Tailwind CSS."
              : "Snappy reactive interfaces, Server Components, and hybrid rendering. Instant navigation and clean Tailwind CSS layouts."}
          </p>
        </div>

        {/* Bloque 2: Java (Amber) con esquinas orgánicas invertidas y cinta origami */}
        <div className="p-6 rounded-3xl glass-panel bento-puzzle-notch border-2 border-amber-400/40 hover:border-amber-400 transition-all hover-glow group">
          <div className="flex items-center justify-between mb-4">
            <span className="origami-ribbon origami-ribbon-amber text-[10px]">
              02 ✦ SERVIDOR
            </span>
            <Terminal size={18} className="text-[var(--accent-amber)] group-hover:scale-110 transition-transform" />
          </div>
          <h3 className="font-bold text-lg text-[var(--text-main)] mb-1.5">
            Java 21 & Spring Boot
          </h3>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
            {lang === "es"
              ? "Servicios estructurados por capas, APIs REST robustas, persistencia en bases de datos y pruebas automatizadas con JUnit."
              : "Structured layered services, robust REST APIs, SQL persistence, and automated test coverage with JUnit."}
          </p>
        </div>

        {/* Bloque 3: Android (White) con esquinas orgánicas y cinta origami */}
        <div className="p-6 rounded-3xl glass-panel bento-puzzle-r border-2 border-white/40 hover:border-white transition-all hover-glow group">
          <div className="flex items-center justify-between mb-4">
            <span className="origami-ribbon origami-ribbon-white text-[10px]">
              03 ✦ NATIVO
            </span>
            <Sparkles size={18} className="text-white group-hover:scale-110 transition-transform" />
          </div>
          <h3 className="font-bold text-lg text-[var(--text-main)] mb-1.5">
            Android & Kotlin
          </h3>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
            {lang === "es"
              ? "Aplicaciones móviles nativas con Jetpack Compose. Arquitectura MVVM, funcionamiento sin conexión con Room y corrutinas."
              : "Native mobile apps built with Jetpack Compose. Clean MVVM architecture, offline persistence with Room, and reactive coroutines."}
          </p>
        </div>
      </div>
    </section>
  );
}
