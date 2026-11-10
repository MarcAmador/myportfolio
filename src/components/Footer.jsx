"use client";

import { GithubIcon, LinkedinIcon } from "@/components/Icons";

import { ArrowUp, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { usePrefs } from "@/context/PrefsContext";

export default function Footer() {
  const { lang, t } = usePrefs();

  return (
    <footer className="border-t border-border bg-surface py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-6 rounded-full bg-accent/15 border border-accent/30 text-accent flex items-center justify-center font-mono font-bold text-xs">
              {profile.name[0]}
            </span>
            <span className="font-bold text-sm text-text">{profile.name}</span>
            <span className="text-text-subtle">•</span>
            <span className="text-xs text-text-muted">{t(profile.role)}</span>
          </div>
          <p className="font-mono text-xs text-text-subtle">
            © {new Date().getFullYear()} {profile.name}. {lang === "es" ? "Casi todos los derechos reservados." : "All rights reserved."}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-text-muted">
            <a
              href="https://github.com/MarcAmador"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:text-accent hover:border-accent transition-colors"
            >
              <GithubIcon size={15} />
            </a>
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:text-accent hover:border-accent transition-colors"
            >
              <LinkedinIcon size={15} />
            </a>
            <a
              href={`mailto:${profile.email}`}
              aria-label="Email"
              className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:text-accent hover:border-accent transition-colors"
            >
              <Mail size={15} />
            </a>
          </div>

          <a
            href="#inicio"
            aria-label="Volver arriba"
            className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-text-muted hover:text-accent hover:border-accent transition-colors ml-2"
            title="Volver arriba"
          >
            <ArrowUp size={15} />
          </a>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-mono text-text-subtle">
        <span>{lang === "es" ? "DISEÑADO CON CRITERIO TÉCNICO" : "DESIGNED WITH ENGINEERING STANDARDS"}</span>
        <div className="flex items-center gap-2">
          <span>ARQ:</span>
          <span className="text-text font-bold">NEXT.JS 16</span>
          <span>//</span>
          <span className="text-accent font-bold">REACT 19</span>
          <span>//</span>
          <span className="text-text font-bold">TAILWIND CSS</span>
        </div>
      </div>
    </footer>
  );
}
