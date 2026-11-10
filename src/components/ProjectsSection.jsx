"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Play, ArrowRight, Layers, Sparkles, Terminal, Smartphone, Code2 } from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import { usePrefs } from "@/context/PrefsContext";
import { KINDS, projects } from "@/data/projects";
import Cover from "@/components/Cover";

export default function ProjectsSection({ onSelectDemo }) {
  const { lang, t } = usePrefs();
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered = projects.filter((p) => activeFilter === "all" || p.kind === activeFilter);

  // Stack color helpers
  const getKindBadge = (kind) => {
    switch (kind) {
      case "web":
        return {
          label: "Web & React",
          badge: "bg-sky-500/15 text-sky-400 border-sky-500/30",
          glow: "hover:border-sky-500/50 hover:shadow-sky-500/10",
        };
      case "java":
        return {
          label: "Java Backend",
          badge: "bg-amber-500/15 text-amber-400 border-amber-500/30",
          glow: "hover:border-amber-500/50 hover:shadow-amber-500/10",
        };
      case "android":
        return {
          label: "Android Nativo",
          badge: "bg-purple-500/15 text-purple-400 border-purple-500/30",
          glow: "hover:border-purple-500/50 hover:shadow-purple-500/10",
        };
      case "python":
        return {
          label: "Python & Datos",
          badge: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
          glow: "hover:border-emerald-500/50 hover:shadow-emerald-500/10",
        };
      default:
        return {
          label: kind,
          badge: "bg-slate-500/15 text-slate-400 border-slate-500/30",
          glow: "hover:border-slate-500/50",
        };
    }
  };

  const handleLaunchDemo = (demoType) => {
    if (onSelectDemo) {
      onSelectDemo(demoType);
      const el = document.getElementById("demos");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="proyectos" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto border-t border-[var(--border-subtle)]">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-2 font-mono text-xs text-[var(--accent-cyan)] uppercase tracking-wider">
          <Layers size={14} />
          <span>Portafolio de Ingeniería</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-main)] mb-4">
          {lang === "es" ? "Proyectos y Arquitecturas" : "Featured Projects & Architectures"}
        </h2>
        <p className="text-[var(--text-muted)] max-w-2xl text-base leading-relaxed">
          {lang === "es"
            ? "Aplicaciones completas donde diseño y solidez técnica se combinan: interfaces web reactivas, arquitecturas en Java con pruebas unitarias y apps Android nativas."
            : "Complete applications combining tactile UX and architectural rigor: reactive web frontends, tested Java backends, and native Android apps."}
        </p>

        {/* Filter Pills with DaisyUI / macOS styling */}
        <div className="flex flex-wrap items-center gap-2 mt-8">
          <button
            onClick={() => setActiveFilter("all")}
            aria-pressed={activeFilter === "all"}
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all ${
              activeFilter === "all"
                ? "bg-[var(--accent-cyan)] text-[#090d16] font-bold shadow-md shadow-[var(--glow-cyan)]"
                : "bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-main)] hover:border-[var(--border-strong)]"
            }`}
          >
            {lang === "es" ? "Todos los proyectos" : "All projects"} ({projects.length})
          </button>

          {Object.entries(KINDS).map(([k, v]) => {
            const count = projects.filter((p) => p.kind === k).length;
            const isSelected = activeFilter === k;
            return (
              <button
                key={k}
                onClick={() => setActiveFilter(k)}
                aria-pressed={isSelected}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all ${
                  isSelected
                    ? "bg-[var(--accent-cyan)] text-[#090d16] font-bold shadow-md shadow-[var(--glow-cyan)]"
                    : "bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-main)] hover:border-[var(--border-strong)]"
                }`}
              >
                {t(v)} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects Grid: Responsive Bento Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((p, idx) => {
          const isFeatured = idx === 0 && activeFilter === "all";
          const kindInfo = getKindBadge(p.kind);

          return (
            <article
              key={p.slug}
              id={`project-${p.slug}`}
              className={`group rounded-2xl glass-panel border border-[var(--border-subtle)] ${kindInfo.glow} shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden ${
                isFeatured ? "md:col-span-2 lg:col-span-2" : ""
              }`}
            >
                <div>
                  {/* Card Header (macOS window style) */}
                  <div className="px-4 py-2.5 bg-[var(--bg-surface)] border-b border-[var(--border-subtle)] flex items-center justify-between text-xs font-mono text-[var(--text-dim)]">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]/80" />
                      <span className="ml-2 font-mono text-[11px] text-[var(--text-muted)] truncate max-w-[140px] sm:max-w-none">
                        {p.slug}.release
                      </span>
                    </div>

                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono border ${kindInfo.badge}`}>
                      {kindInfo.label}
                    </span>
                  </div>

                  {/* Visual Cover with Hover Physics */}
                  <div className={`relative overflow-hidden bg-[var(--bg-base)] border-b border-[var(--border-subtle)] ${
                    isFeatured ? "aspect-[16/7]" : "aspect-[16/9]"
                  }`}>
                    <Cover slug={p.slug} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    
                    {/* Live Demo Trigger Badge */}
                    {p.demo && (
                      <button
                        onClick={() => handleLaunchDemo(p.demo)}
                        className="absolute top-3 right-3 px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-[var(--bg-base)]/90 backdrop-blur-md text-[var(--text-main)] border border-[var(--border-strong)] shadow-lg hover:scale-105 transition-transform flex items-center gap-1.5 cursor-pointer"
                      >
                        <Play size={10} className="fill-[var(--accent-cyan)] text-[var(--accent-cyan)]" />
                        <span>Demo interactiva</span>
                      </button>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <div className="flex items-baseline justify-between gap-3 mb-2">
                      <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-main)] group-hover:text-[var(--accent-cyan)] transition-colors">
                        {p.title}
                      </h3>
                      <span className="font-mono text-xs text-[var(--text-dim)]">{p.year}</span>
                    </div>

                    <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-4">
                      {t(p.summary)}
                    </p>

                    {/* Highlights with subtle bullet points */}
                    <ul className="mb-5 space-y-1.5 text-xs text-[var(--text-dim)] font-sans">
                      {t(p.highlights).slice(0, 2).map((h, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-[var(--accent-cyan)] mt-0.5">•</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tech Stack Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {p.stack.map((st) => (
                        <span
                          key={st}
                          className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-[var(--bg-base)] text-[var(--text-muted)] border border-[var(--border-subtle)]"
                        >
                          {st}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="px-6 py-4 bg-[var(--bg-surface)]/50 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-3">
                    {p.links?.repo && (
                      <a
                        href={p.links.repo}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
                        title="Ver repositorio en GitHub"
                      >
                        <GithubIcon size={14} />
                        <span>Código</span>
                      </a>
                    )}
                    {p.links?.live && (
                      <a
                        href={p.links.live}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 text-[var(--text-muted)] hover:text-[var(--accent-cyan)] transition-colors"
                        title="Ver despliegue en producción"
                      >
                        <ExternalLink size={13} />
                        <span>En vivo</span>
                      </a>
                    )}
                  </div>

                  <Link
                    href={`/projects/${p.slug}`}
                    className="inline-flex items-center gap-1.5 text-[var(--text-main)] hover:text-[var(--accent-cyan)] font-medium transition-colors"
                  >
                    <span>Detalles</span>
                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            );
          })}
      </div>
    </section>
  );
}
