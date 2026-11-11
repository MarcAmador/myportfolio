"use client";

import { ArrowDown, Mail, Terminal, Sparkles, Code2 } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import { usePrefs } from "@/context/PrefsContext";
import { profile } from "@/data/profile";

export default function Hero() {
  const { lang, t } = usePrefs();

  return (
    <section id="inicio" className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 px-4 sm:px-6 max-w-6xl mx-auto overflow-hidden">
      {/* Elementos geométricos decorativos de fondo */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-48 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Columna Izquierda: Presentación y Título (7 cols) */}
        <div className="lg:col-span-7 relative">
          {/* Cinta doblada con sombra (Folded Ribbon) */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="folded-ribbon folded-ribbon-amber rounded-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#090d16]" />
              <span>{lang === "es" ? "Disponible para proyectos" : "Available for projects"}</span>
            </div>

            <div className="folded-ribbon folded-ribbon-cyan rounded-sm">
              <span>{t(profile.location)}</span>
            </div>
          </div>

          {/* Título Principal: Directo, claro, enérgico y humano */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[var(--text-main)] leading-[1.1] mb-6">
            {lang === "es" ? (
              <>
                Desarrollo software para la <span className="text-[var(--accent-cyan)] underline decoration-[var(--accent-cyan)]/40 decoration-wavy decoration-2">web</span>, servidores en <span className="text-[var(--accent-amber)]">Java</span> y apps en <span className="text-white">Android</span>.
              </>
            ) : (
              <>
                Building software for the <span className="text-[var(--accent-cyan)] underline decoration-[var(--accent-cyan)]/40 decoration-wavy decoration-2">web</span>, backends in <span className="text-[var(--accent-amber)]">Java</span>, and native <span className="text-white">Android</span>.
              </>
            )}
          </h1>

          {/* Texto de biografía humano, natural y sin clichés de IA */}
          <p className="text-base sm:text-lg text-[var(--text-muted)] leading-relaxed max-w-2xl mb-8 font-sans">
            {lang === "es" ? (
              <>
                Hola, soy <strong className="text-[var(--text-main)] font-semibold">{profile.name}</strong>. Me dedico a programar aplicaciones prácticas: interfaces rápidas en React y Next.js, sistemas backend bien estructurados en Java y aplicaciones móviles nativas con Kotlin.
              </>
            ) : (
              <>
                Hi, I&apos;m <strong className="text-[var(--text-main)] font-semibold">{profile.name}</strong>. I write practical software: snappy React & Next.js web applications, structured Java backend services, and native Android apps with Kotlin.
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
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-[var(--bg-surface)] border border-[var(--accent-amber)]/40 text-[var(--accent-amber)] hover:bg-[var(--accent-amber)] hover:text-[#090d16] transition-all active:scale-[0.98] cursor-pointer"
            >
              <Terminal size={14} />
              <span>{lang === "es" ? "Probar software en vivo" : "Live interactive demos"}</span>
            </a>

            <a
              href="#contacto"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-[var(--bg-surface)] border border-[var(--border-strong)] text-[var(--text-main)] hover:border-[var(--accent-cyan)] hover:text-[var(--accent-cyan)] transition-all active:scale-[0.98] cursor-pointer"
            >
              <Mail size={14} />
              <span>{lang === "es" ? "Escribirme" : "Get in touch"}</span>
            </a>
          </div>

          {/* Píldoras de Tecnologías Principales con patrón de puntos */}
          <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-[var(--border-subtle)] font-mono text-xs text-[var(--text-dim)]">
            <span className="font-semibold text-[var(--text-muted)] mr-1">Stack principal:</span>
            {["React 19", "Next.js", "Java 21", "Kotlin", "Spring Boot", "Tailwind CSS", "SQLite"].map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-md bg-[var(--bg-surface)] text-[var(--text-main)] border border-[var(--border-subtle)]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Columna Derecha: Tarjeta Bento Asimétrica con decoración geométrica (5 cols) */}
        <div className="lg:col-span-5 relative">
          {/* Adorno geométrico de esquina (triángulo inclinado decorativo) */}
          <div className="absolute -top-3 -right-3 w-12 h-12 bg-amber-400/20 rounded-lg transform rotate-12 -z-10" />
          <div className="absolute -bottom-3 -left-3 w-16 h-16 bg-sky-400/20 rounded-xl transform -rotate-6 -z-10" />

          {/* Tarjeta Bento con esquinas asimétricas y textura de matriz de puntos */}
          <div className="relative rounded-2xl glass-panel-elevated bento-asymmetric-1 border-2 border-sky-400/40 p-6 sm:p-7 shadow-2xl overflow-hidden hover-glow">
            {/* Cinta de estado en la esquina superior */}
            <div className="absolute top-0 right-0">
              <span className="folded-ribbon folded-ribbon-cyan text-[10px] tracking-wider rounded-bl-lg">
                MARC.DEV // 2026
              </span>
            </div>

            {/* Cabecera de la tarjeta */}
            <div className="flex items-center gap-4 mb-6 pt-2">
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
                <p className="text-xs text-[var(--text-muted)] mt-0.5">
                  Web · Java · Android
                </p>
              </div>
            </div>

            {/* Panel de Datos Técnicos con fondo de puntos */}
            <div className="rounded-xl bg-[var(--bg-base)] p-4 border border-[var(--border-subtle)] bg-dot-pattern space-y-2.5 font-mono text-xs mb-6">
              <div className="flex items-center justify-between text-[var(--text-dim)]">
                <span className="flex items-center gap-1.5 text-[var(--text-muted)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-cyan)]" />
                  Frontend:
                </span>
                <span className="text-[var(--accent-cyan)] font-semibold">React 19 & Next.js</span>
              </div>
              <div className="flex items-center justify-between text-[var(--text-dim)]">
                <span className="flex items-center gap-1.5 text-[var(--text-muted)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-amber)]" />
                  Backend:
                </span>
                <span className="text-[var(--accent-amber)] font-semibold">Java 21 & Spring</span>
              </div>
              <div className="flex items-center justify-between text-[var(--text-dim)]">
                <span className="flex items-center gap-1.5 text-[var(--text-muted)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  Móvil:
                </span>
                <span className="text-white font-semibold">Kotlin & Compose</span>
              </div>
              <div className="flex items-center justify-between text-[var(--text-dim)] pt-1 border-t border-[var(--border-subtle)]">
                <span className="text-[var(--text-dim)]">Demos listas:</span>
                <span className="text-[var(--accent-mint)] font-bold">3 en ejecución</span>
              </div>
            </div>

            {/* Enlaces directos a redes */}
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

      {/* 3 Bloques Modulares Asimétricos (Frontend, Backend, Móvil) */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Bloque 1: Web (Cyan) con esquinas orgánicas */}
        <div className="p-6 rounded-2xl glass-panel bento-asymmetric-1 border-l-4 border-l-[var(--accent-cyan)] border-[var(--border-subtle)] hover:border-[var(--accent-cyan)] transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="folded-ribbon folded-ribbon-cyan text-[10px]">
              01 // WEB
            </span>
            <Code2 size={18} className="text-[var(--accent-cyan)]" />
          </div>
          <h3 className="font-bold text-base text-[var(--text-main)] mb-1">
            React y Next.js
          </h3>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
            {lang === "es"
              ? "Desarrollo interfaces modernas, rápidas y accesibles. Server Components, rutas dinámicas y diseño fluido con Tailwind CSS."
              : "Modern, fast, and accessible interfaces. Server Components, dynamic routing, and fluid layouts with Tailwind CSS."}
          </p>
        </div>

        {/* Bloque 2: Java (Amber) con esquinas orgánicas invertidas */}
        <div className="p-6 rounded-2xl glass-panel bento-asymmetric-2 border-l-4 border-l-[var(--accent-amber)] border-[var(--border-subtle)] hover:border-[var(--accent-amber)] transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="folded-ribbon folded-ribbon-amber text-[10px]">
              02 // BACKEND
            </span>
            <Terminal size={18} className="text-[var(--accent-amber)]" />
          </div>
          <h3 className="font-bold text-base text-[var(--text-main)] mb-1">
            Java 21 y Spring Boot
          </h3>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
            {lang === "es"
              ? "Sistemas estructurados con arquitectura por capas, inyección de dependencias, persistencia en bases de datos y pruebas automatizadas con JUnit."
              : "Structured systems with layered architecture, dependency injection, database persistence, and automated tests with JUnit."}
          </p>
        </div>

        {/* Bloque 3: Android (White/Violet) con esquinas orgánicas */}
        <div className="p-6 rounded-2xl glass-panel bento-asymmetric-1 border-l-4 border-l-white border-[var(--border-subtle)] hover:border-white transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="folded-ribbon folded-ribbon-white text-[10px]">
              03 // MÓVIL
            </span>
            <Sparkles size={18} className="text-white" />
          </div>
          <h3 className="font-bold text-base text-[var(--text-main)] mb-1">
            Android Nativo y Kotlin
          </h3>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
            {lang === "es"
              ? "Aplicaciones nativas en Kotlin con Jetpack Compose. Arquitectura MVVM, almacenamiento local sin conexión en Room y uso de corrutinas."
              : "Native Kotlin apps with Jetpack Compose. MVVM architecture, offline local storage in Room, and reactive coroutines."}
          </p>
        </div>
      </div>
    </section>
  );
}
