"use client";

import Link from "next/link";
import { ExternalLink, Play, ArrowRight, Layers, Terminal, Smartphone, Code2 } from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import { usePrefs } from "@/context/PrefsContext";
import { projects } from "@/data/projects";
import Cover from "@/components/Cover";

export default function ProjectsSection({ onSelectDemo }) {
  const { lang, t } = usePrefs();

  const handleLaunchDemo = (demoType) => {
    if (onSelectDemo) {
      onSelectDemo(demoType);
      const el = document.getElementById("demos");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="proyectos" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto border-t border-[var(--border-subtle)] relative">
      {/* Fondo de matriz de puntos sutil */}
      <div className="absolute inset-0 bg-dot-pattern opacity-30 pointer-events-none -z-10" />

      {/* Cabecera de la Sección */}
      <div className="mb-14">
        <div className="flex items-center gap-3 mb-3">
          <span className="folded-ribbon folded-ribbon-cyan text-[11px] rounded-sm">
            PROYECTOS DESTACADOS
          </span>
          <span className="font-mono text-xs text-[var(--text-dim)]">
            {projects.length} {lang === "es" ? "proyectos principales" : "core projects"}
          </span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-main)] mb-4">
          {lang === "es" ? "Software Real y Código en Producción" : "Real Software & Production Code"}
        </h2>
        <p className="text-[var(--text-muted)] max-w-2xl text-base leading-relaxed">
          {lang === "es"
            ? "Tres proyectos que resumen mis áreas de trabajo: una plataforma web completa de comercio, un sistema de gestión por consola en Java 21 y una aplicación móvil nativa para Android."
            : "Three core projects representing my work: a complete web commerce app, a Java 21 console system, and a native Android mobile application."}
        </p>
      </div>

      {/* Bento Grid Asimétrico Modular (Inspirado en image.png e image_2.png) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Proyecto 1: Mercadito (Web Full-Stack) - Ocupa 7 columnas */}
        {projects[0] && (
          <article
            id={`project-${projects[0].slug}`}
            className="lg:col-span-7 rounded-3xl glass-panel-elevated bento-asymmetric-1 border-2 border-sky-400/40 p-6 sm:p-8 flex flex-col justify-between shadow-2xl hover:border-sky-400 transition-all group relative overflow-hidden"
          >
            {/* Cinta superior plegada */}
            <div className="flex items-center justify-between mb-4">
              <span className="folded-ribbon folded-ribbon-cyan text-[10px] rounded-sm">
                WEB // REACT 19 & NEXT.JS
              </span>
              <span className="font-mono text-xs text-[var(--text-dim)]">{projects[0].year}</span>
            </div>

            {/* Visual Cover con marco */}
            <div className="relative aspect-[16/8] rounded-2xl overflow-hidden bg-[var(--bg-base)] border border-[var(--border-strong)] mb-6">
              <Cover slug={projects[0].slug} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>

            {/* Contenido */}
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-main)] group-hover:text-[var(--accent-cyan)] transition-colors mb-2">
                {projects[0].title}
              </h3>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-4">
                {t(projects[0].summary)}
              </p>

              {/* Lista de características clave */}
              <ul className="space-y-1.5 text-xs text-[var(--text-dim)] mb-6 font-mono">
                {t(projects[0].highlights).map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[var(--accent-cyan)] font-bold">▪</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              {/* Píldoras de Stack */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {projects[0].stack.map((s) => (
                  <span
                    key={s}
                    className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-[var(--bg-base)] text-[var(--text-main)] border border-[var(--border-subtle)]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Enlaces y acciones */}
            <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between font-mono text-xs">
              <a
                href={projects[0].links.repo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-[var(--text-muted)] hover:text-[var(--accent-cyan)] transition-colors"
              >
                <GithubIcon size={14} />
                <span>Ver repositorio</span>
              </a>

              <Link
                href={`/projects/${projects[0].slug}`}
                className="inline-flex items-center gap-1 text-[var(--accent-cyan)] font-bold hover:underline"
              >
                <span>Detalles del proyecto</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </article>
        )}

        {/* Columna Derecha con los otros 2 proyectos (Java y Android) - Ocupa 5 columnas */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Proyecto 2: Biblioteca Central (Java 21) */}
          {projects[1] && (
            <article
              id={`project-${projects[1].slug}`}
              className="flex-1 rounded-3xl glass-panel-elevated bento-asymmetric-2 border-2 border-amber-400/40 p-6 flex flex-col justify-between shadow-2xl hover:border-amber-400 transition-all group relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="folded-ribbon folded-ribbon-amber text-[10px] rounded-sm">
                    JAVA 21 // CONSOLA
                  </span>
                  {/* Botón directo para lanzar demo de terminal */}
                  <button
                    onClick={() => handleLaunchDemo("java")}
                    className="folded-ribbon folded-ribbon-white text-[10px] rounded-sm flex items-center gap-1.5 cursor-pointer hover:scale-105 transition-transform"
                    title="Probar en el navegador"
                  >
                    <Play size={10} className="fill-[#090d16]" />
                    <span>Demo en vivo</span>
                  </button>
                </div>

                <h3 className="text-xl font-bold text-[var(--text-main)] group-hover:text-[var(--accent-amber)] transition-colors mb-2">
                  {projects[1].title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed mb-4">
                  {t(projects[1].summary)}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {projects[1].stack.map((s) => (
                    <span
                      key={s}
                      className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-[var(--bg-base)] text-[var(--accent-amber)] border border-amber-500/20"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between font-mono text-xs">
                <a
                  href={projects[1].links.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-[var(--text-muted)] hover:text-[var(--accent-amber)] transition-colors"
                >
                  <GithubIcon size={14} />
                  <span>Código Java</span>
                </a>

                <Link
                  href={`/projects/${projects[1].slug}`}
                  className="inline-flex items-center gap-1 text-[var(--accent-amber)] font-bold hover:underline"
                >
                  <span>Detalles</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </article>
          )}

          {/* Proyecto 3: HabitNest (Android & Kotlin) */}
          {projects[2] && (
            <article
              id={`project-${projects[2].slug}`}
              className="flex-1 rounded-3xl glass-panel-elevated bento-asymmetric-1 border-2 border-white/40 p-6 flex flex-col justify-between shadow-2xl hover:border-white transition-all group relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="folded-ribbon folded-ribbon-white text-[10px] rounded-sm">
                    ANDROID // KOTLIN
                  </span>
                  {/* Botón directo para lanzar demo del teléfono */}
                  <button
                    onClick={() => handleLaunchDemo("android")}
                    className="folded-ribbon folded-ribbon-cyan text-[10px] rounded-sm flex items-center gap-1.5 cursor-pointer hover:scale-105 transition-transform"
                    title="Probar simulador de teléfono"
                  >
                    <Smartphone size={11} />
                    <span>Simulador</span>
                  </button>
                </div>

                <h3 className="text-xl font-bold text-[var(--text-main)] group-hover:text-white transition-colors mb-2">
                  {projects[2].title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed mb-4">
                  {t(projects[2].summary)}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {projects[2].stack.map((s) => (
                    <span
                      key={s}
                      className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-[var(--bg-base)] text-white border border-white/20"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between font-mono text-xs">
                <a
                  href={projects[2].links.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-[var(--text-muted)] hover:text-white transition-colors"
                >
                  <GithubIcon size={14} />
                  <span>Código Kotlin</span>
                </a>

                <Link
                  href={`/projects/${projects[2].slug}`}
                  className="inline-flex items-center gap-1 text-white font-bold hover:underline"
                >
                  <span>Detalles</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </article>
          )}
        </div>
      </div>
    </section>
  );
}
