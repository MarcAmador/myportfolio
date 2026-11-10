"use client";

import { ArrowUp, Mail, Heart } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import { profile } from "@/data/profile";
import { usePrefs } from "@/context/PrefsContext";

export default function Footer() {
  const { lang, t } = usePrefs();

  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] py-14 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2.5 mb-2">
            <span className="w-7 h-7 rounded-full bg-[var(--accent-cyan)]/15 border border-[var(--accent-cyan)]/30 text-[var(--accent-cyan)] flex items-center justify-center font-mono font-bold text-xs">
              M
            </span>
            <span className="font-bold text-sm text-[var(--text-main)]">{profile.name}</span>
            <span className="text-[var(--text-dim)]">•</span>
            <span className="text-xs text-[var(--text-muted)]">{t(profile.role)}</span>
          </div>
          <p className="font-mono text-xs text-[var(--text-dim)]">
            © {new Date().getFullYear()} {profile.name}. {lang === "es" ? "Diseñado y desarrollado con dedicación artesanal." : "Handcrafted with precision & design care."}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-[var(--text-muted)]">
            <a
              href="https://github.com/MarcAmador"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="w-8 h-8 rounded-xl border border-[var(--border-subtle)] flex items-center justify-center hover:text-[var(--accent-cyan)] hover:border-[var(--accent-cyan)]/50 transition-colors bg-[var(--bg-base)]"
            >
              <GithubIcon size={15} />
            </a>
            <a
              href="https://linkedin.com/in/marcamador"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="w-8 h-8 rounded-xl border border-[var(--border-subtle)] flex items-center justify-center hover:text-[var(--accent-cyan)] hover:border-[var(--accent-cyan)]/50 transition-colors bg-[var(--bg-base)]"
            >
              <LinkedinIcon size={15} />
            </a>
            <a
              href={`mailto:${profile.email}`}
              aria-label="Email"
              className="w-8 h-8 rounded-xl border border-[var(--border-subtle)] flex items-center justify-center hover:text-[var(--accent-cyan)] hover:border-[var(--accent-cyan)]/50 transition-colors bg-[var(--bg-base)]"
            >
              <Mail size={15} />
            </a>
          </div>

          <a
            href="#inicio"
            aria-label="Volver arriba"
            className="w-8 h-8 rounded-xl border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-main)] hover:border-[var(--border-strong)] transition-colors ml-2 bg-[var(--bg-base)]"
            title="Volver arriba"
          >
            <ArrowUp size={15} />
          </a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono text-[var(--text-dim)]">
        <span>{lang === "es" ? "Construido con React 19, Next.js y Tailwind CSS" : "Built with React 19, Next.js & Tailwind CSS"}</span>
        <div className="flex items-center gap-2">
          <span>{lang === "es" ? "Estado del sistema: Óptimo" : "System Status: Optimal"}</span>
          <span className="w-2 h-2 rounded-full bg-[var(--accent-mint)] inline-block animate-pulse" />
        </div>
      </div>
    </footer>
  );
}
