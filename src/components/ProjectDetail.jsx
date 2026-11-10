"use client";

import { GithubIcon, LinkedinIcon } from "@/components/Icons";

import { ArrowLeft, ArrowRight, Download, ExternalLink, Moon, Play, Sun } from "lucide-react";
import Link from "next/link";
import Cover from "@/components/Cover";
import { usePrefs } from "@/context/PrefsContext";
import { KINDS, getProject, projects } from "@/data/projects";

export default function ProjectDetail({ slug }) {
  const { t, ui, lang, setLang, theme, toggleTheme } = usePrefs();
  const p = getProject(slug);
  if (!p) return null;

  const idx = projects.findIndex((x) => x.slug === slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <div className="min-h-screen bg-bg text-text">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 border-b border-border bg-[var(--nav-bg)] backdrop-blur-md px-4 sm:px-6 py-3 flex items-center justify-between">
        <Link
          href="/#proyectos"
          className="inline-flex items-center gap-2 text-xs font-mono text-text-muted hover:text-accent transition-colors"
        >
          <ArrowLeft size={14} />
          <span>{lang === "es" ? "VOLVER A PROYECTOS" : "BACK TO PROJECTS"}</span>
        </Link>

        <div className="flex items-center gap-3 font-mono text-xs">
          <div className="flex rounded-full border border-border overflow-hidden bg-surface">
            {["es", "en"].map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                className={`px-2 py-0.5 uppercase transition-colors ${
                  lang === l ? "bg-accent text-accent-fg font-semibold" : "text-text-muted hover:text-text"
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          <button
            onClick={toggleTheme}
            aria-label="Cambiar tema"
            className="w-7 h-7 rounded-full border border-border flex items-center justify-center text-text-muted hover:text-text transition-colors bg-surface"
          >
            {theme === "dark" ? <Sun size={13} /> : <Moon size={13} />}
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <span className="section-label mb-2">
          {t(KINDS[p.kind])} // {p.year}
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-text mb-4">
          {p.title}
        </h1>

        <p className="text-base sm:text-lg text-text-muted leading-relaxed mb-8 max-w-2xl">
          {t(p.summary)}
        </p>

        {/* Cover with window frame */}
        <div className="card-swiss overflow-hidden mb-10">
          <div className="px-4 py-2.5 bg-surface border-b border-border flex items-center gap-2 font-mono text-xs text-text-subtle">
            <span className="w-2.5 h-2.5 rounded-full bg-border-strong inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-border-strong inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-border-strong inline-block" />
            <span className="ml-2 text-text-muted text-[11px]">preview://{p.slug}.dev</span>
          </div>
          <div className="aspect-[16/7] bg-surface-hover">
            <Cover slug={p.slug} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Description & Specs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 pb-12 border-b border-border">
          <div className="md:col-span-2 space-y-6">
            <div>
              <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-text-subtle mb-3">
                {lang === "es" ? "ARQUITECTURA Y DETALLES" : "ARCHITECTURE & DETAILS"}
              </h2>
              <p className="text-sm sm:text-base text-text-muted leading-relaxed">
                {t(p.description)}
              </p>
            </div>

            <div>
              <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-text-subtle mb-3">
                {lang === "es" ? "LOGROS Y MÉTRICAS" : "HIGHLIGHTS & METRICS"}
              </h2>
              <ul className="space-y-2 text-sm text-text-muted">
                {t(p.highlights).map((h, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="text-accent font-bold mt-0.5">✓</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="card-swiss p-5">
              <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-text-subtle mb-3">
                {lang === "es" ? "STACK TÉCNICO" : "TECH STACK"}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <span key={s} className="tag-pill">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="card-swiss p-5 space-y-2.5">
              <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-text-subtle mb-3">
                {lang === "es" ? "ENLACES" : "LINKS"}
              </h3>
              {p.demo && (
                <Link
                  href={`/#demos`}
                  className="btn-swiss btn-swiss-primary btn-swiss-sm w-full justify-center"
                >
                  <Play size={12} fill="currentColor" />
                  <span>{lang === "es" ? "Probar Demo Interactiva" : "Try Interactive Demo"}</span>
                </Link>
              )}
              {p.links.live && (
                <a
                  href={p.links.live}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-swiss btn-swiss-sm w-full justify-center"
                >
                  <ExternalLink size={12} />
                  <span>{lang === "es" ? "Abrir sitio web" : "Open live website"}</span>
                </a>
              )}
              {p.links.apk && (
                <a
                  href={p.links.apk}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-swiss btn-swiss-sm w-full justify-center"
                >
                  <Download size={12} />
                  <span>{lang === "es" ? "Descargar APK" : "Download APK"}</span>
                </a>
              )}
              {p.links.repo && (
                <a
                  href={p.links.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-swiss btn-swiss-sm w-full justify-center"
                >
                  <GithubIcon size={12} />
                  <span>{lang === "es" ? "Repositorio en GitHub" : "GitHub Repository"}</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Next Project Footer */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/#proyectos"
            className="text-xs font-mono text-text-muted hover:text-accent transition-colors"
          >
            ← {lang === "es" ? "Volver a todos los proyectos" : "Back to all projects"}
          </Link>
          <Link
            href={`/projects/${next.slug}`}
            className="btn-swiss btn-swiss-sm"
          >
            <span>{lang === "es" ? "Siguiente proyecto" : "Next project"}: {next.title}</span>
            <ArrowRight size={12} />
          </Link>
        </div>
      </main>
    </div>
  );
}
