"use client";

import { GithubIcon, LinkedinIcon } from "@/components/Icons";

import { useState } from "react";
import Link from "next/link";
import { ExternalLink, Download, Play, ArrowRight, Layers } from "lucide-react";
import { usePrefs } from "@/context/PrefsContext";
import { KINDS, projects } from "@/data/projects";
import Cover from "@/components/Cover";

export default function ProjectsSection({ onSelectDemo }) {
  const { lang, t, ui } = usePrefs();
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered = projects.filter((p) => activeFilter === "all" || p.kind === activeFilter);

  return (
    <section id="proyectos" className="py-20 px-4 sm:px-6 max-w-5xl mx-auto border-t border-border">
      {/* Section Header */}
      <div className="mb-10">
        <span className="section-label">01 // EVIDENCIA TÉCNICA</span>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text mb-3">
          {lang === "es" ? "Proyectos Realizados" : "Featured Projects"}
        </h2>
        <p className="text-text-muted max-w-2xl text-base">
          {lang === "es"
            ? "Aplicaciones completas con frontend reactivo, arquitecturas backend estructuradas y persistencia en bases de datos reales."
            : "Production-ready applications featuring reactive frontends, structured backends, and persistent databases."}
        </p>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 mt-6">
          <button
            onClick={() => setActiveFilter("all")}
            aria-pressed={activeFilter === "all"}
            className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all ${
              activeFilter === "all"
                ? "bg-accent text-accent-fg font-semibold shadow-sm"
                : "bg-surface border border-border text-text-muted hover:text-text hover:border-border-strong"
            }`}
          >
            {lang === "es" ? "Todos los dominios" : "All domains"} ({projects.length})
          </button>
          {Object.entries(KINDS).map(([k, v]) => {
            const count = projects.filter((p) => p.kind === k).length;
            const isSelected = activeFilter === k;
            return (
              <button
                key={k}
                onClick={() => setActiveFilter(k)}
                aria-pressed={isSelected}
                className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all ${
                  isSelected
                    ? "bg-accent text-accent-fg font-semibold shadow-sm"
                    : "bg-surface border border-border text-text-muted hover:text-text hover:border-border-strong"
                }`}
              >
                {t(v)} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((p) => (
          <article
            key={p.slug}
            className="rounded-2xl border border-border bg-surface shadow-sm hover:border-border-strong flex flex-col overflow-hidden group hover:shadow-xl transition-all duration-300"
          >
            {/* Window header mockup bar (Swiss style) */}
            <div className="px-4 py-2.5 bg-surface border-b border-border flex items-center justify-between text-xs font-mono text-text-subtle select-none">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-border-strong inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-border-strong inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-border-strong inline-block" />
                <span className="ml-2 text-[11px] truncate text-text-muted">
                  preview://{p.slug}.dev
                </span>
              </div>
              <span className="uppercase text-[10px] tracking-wider px-2 py-0.5 rounded bg-surface-hover border border-border text-accent font-semibold">
                {t(KINDS[p.kind])}
              </span>
            </div>

            {/* Visual Cover */}
            <div className="relative aspect-[16/8] overflow-hidden bg-surface-hover border-b border-border">
              <Cover slug={p.slug} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500" />
              {p.demo && (
                <span className="absolute top-3 right-3 bg-accent text-accent-fg text-[11px] font-mono font-bold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                  <Play size={10} fill="currentColor" /> DEMO
                </span>
              )}
            </div>

            {/* Content */}
            <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-baseline justify-between gap-2 mb-2">
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-text group-hover:text-accent transition-colors">
                    {p.title}
                  </h3>
                  <span className="font-mono text-xs text-text-subtle">{p.year}</span>
                </div>

                <p className="text-sm text-text-muted leading-relaxed mb-4">
                  {t(p.summary)}
                </p>

                {/* Highlights */}
                <ul className="mb-5 space-y-1.5 text-xs text-text-muted">
                  {t(p.highlights).slice(0, 2).map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-accent mt-0.5 font-bold">✓</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {p.stack.map((tech) => (
                    <span key={tech} className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-mono text-[11px] bg-surface-hover border border-border text-text-muted">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-border">
                {p.demo && (
                  <a
                    href="#demos"
                    onClick={() => onSelectDemo && onSelectDemo(p.demo)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-accent text-accent-fg shadow-sm hover:opacity-90 transition-all"
                  >
                    <Play size={12} fill="currentColor" />
                    <span>{lang === "es" ? "Probar Demo" : "Try Demo"}</span>
                  </a>
                )}
                {p.links.live && (
                  <a
                    href={p.links.live}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-surface border border-border text-text-muted hover:text-text hover:border-border-strong transition-all"
                  >
                    <ExternalLink size={12} />
                    <span>{lang === "es" ? "En vivo" : "Live"}</span>
                  </a>
                )}
                {p.links.apk && (
                  <a
                    href={p.links.apk}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-surface border border-border text-text-muted hover:text-text hover:border-border-strong transition-all"
                  >
                    <Download size={12} />
                    <span>APK</span>
                  </a>
                )}
                {p.links.repo && (
                  <a
                    href={p.links.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-surface border border-border text-text-muted hover:text-text hover:border-border-strong transition-all"
                  >
                    <GithubIcon size={12} />
                    <span>{lang === "es" ? "Código" : "Code"}</span>
                  </a>
                )}
                <Link
                  href={`/projects/${p.slug}`}
                  className="ml-auto text-xs font-mono text-text-muted hover:text-accent flex items-center gap-1 transition-colors"
                >
                  <span>{lang === "es" ? "Ficha" : "Details"}</span>
                  <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
