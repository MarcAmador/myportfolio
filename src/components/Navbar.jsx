"use client";

import { Download, Moon, Sun, Menu, X, Search, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePrefs } from "@/context/PrefsContext";
import { profile } from "@/data/profile";

export default function Navbar({ onOpenCommandPalette }) {
  const { lang, setLang, theme, toggleTheme } = usePrefs();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ["inicio", "proyectos", "demos", "habilidades", "experiencia", "sobre-mi", "contacto"];
      const current = sections.find((sec) => {
        const el = document.getElementById(sec);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 140 && rect.bottom >= 140;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "#proyectos", id: "proyectos", es: "Proyectos", en: "Projects" },
    { href: "#demos", id: "demos", es: "Demos", en: "Demos" },
    { href: "#habilidades", id: "habilidades", es: "Habilidades", en: "Skills" },
    { href: "#experiencia", id: "experiencia", es: "Experiencia", en: "Experience" },
    { href: "#sobre-mi", id: "sobre-mi", es: "Sobre mí", en: "About" },
    { href: "#contacto", id: "contacto", es: "Contacto", en: "Contact" },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-40 flex justify-center px-4 py-3 sm:py-4 transition-all pointer-events-none">
      <nav
        aria-label="Navegación principal"
        className={`pointer-events-auto flex items-center justify-between gap-3 sm:gap-6 px-4 sm:px-6 py-2 rounded-full border transition-all duration-300 ${
          scrolled
            ? "glass-panel-elevated shadow-xl border-[var(--border-strong)]"
            : "glass-panel border-[var(--border-subtle)]"
        }`}
      >
        {/* Brand identity: Marc Amador */}
        <a
          href="#inicio"
          className="flex items-center gap-2.5 group font-mono text-xs font-semibold tracking-wider text-[var(--text-main)]"
        >
          <div className="relative w-7 h-7 rounded-full bg-gradient-to-tr from-[var(--accent-cyan)] to-[var(--accent-purple)] p-[1.5px] shadow-sm">
            <div className="w-full h-full rounded-full bg-[var(--bg-base)] flex items-center justify-center font-bold text-[var(--text-main)] group-hover:scale-105 transition-transform">
              M
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-sans text-xs sm:text-[13px] font-bold tracking-tight text-[var(--text-main)] group-hover:text-[var(--accent-cyan)] transition-colors">
              Marc Amador
            </span>
          </div>
        </a>

        {/* Desktop Nav Links with Sliding Indicator */}
        <div className="hidden lg:flex items-center gap-1 relative">
          {navLinks.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.href}
                href={item.href}
                className={`relative px-3 py-1.5 text-xs sm:text-[13px] font-medium transition-colors ${
                  isActive
                    ? "text-[var(--text-main)] font-semibold"
                    : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavPill"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    className="absolute inset-0 rounded-full bg-[var(--bg-surface-elevated)] border border-[var(--border-strong)] shadow-sm -z-10"
                  />
                )}
                <span>{item[lang]}</span>
              </a>
            );
          })}
        </div>

        {/* Action Controls & Raycast Search */}
        <div className="flex items-center gap-2 font-mono text-xs">
          {/* Spotlight / Command Palette Trigger */}
          <button
            onClick={onOpenCommandPalette}
            type="button"
            className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] text-[var(--text-muted)] hover:text-[var(--text-main)] transition-all cursor-pointer"
            title={lang === "es" ? "Abrir buscador (⌘K)" : "Search commands (⌘K)"}
          >
            <Search size={13} className="text-[var(--accent-cyan)]" />
            <span className="hidden sm:inline text-[11px] font-sans">
              {lang === "es" ? "Buscar..." : "Search..."}
            </span>
            <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.2 rounded text-[10px] font-mono bg-[var(--bg-base)] text-[var(--text-dim)] border border-[var(--border-subtle)]">
              ⌘K
            </kbd>
          </button>

          {/* Lang toggle */}
          <div className="flex rounded-full border border-[var(--border-subtle)] overflow-hidden bg-[var(--bg-surface)] p-0.5">
            {["es", "en"].map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                className={`px-2 py-0.5 text-[11px] uppercase rounded-full transition-colors ${
                  lang === l
                    ? "bg-[var(--accent-cyan)] text-[#090d16] font-bold shadow-sm"
                    : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Cambiar tema"
            className="w-7 h-7 rounded-full border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-main)] hover:border-[var(--border-strong)] transition-colors bg-[var(--bg-surface)]"
          >
            {theme === "dark" ? (
              <Sun size={13} className="text-[var(--accent-amber)]" />
            ) : (
              <Moon size={13} className="text-[var(--accent-purple)]" />
            )}
          </button>

          {/* CV Button */}
          <a
            href="/cv"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[var(--border-subtle)] hover:border-[var(--accent-cyan)] text-[var(--text-main)] hover:text-[var(--accent-cyan)] transition-colors bg-[var(--bg-surface)]"
            title="Currículum Vitae"
          >
            <Download size={12} />
            <span className="font-sans font-medium text-xs">CV</span>
          </a>

          {/* Mobile hamburger menu */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Abrir menú"
            className="lg:hidden w-7 h-7 rounded-full border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)]"
          >
            {mobileOpen ? <X size={14} /> : <Menu size={14} />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.96 }}
            className="pointer-events-auto lg:hidden fixed top-16 inset-x-4 glass-panel-elevated rounded-2xl p-4 shadow-2xl border border-[var(--border-strong)] flex flex-col gap-2"
          >
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2 text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface-elevated)] rounded-xl transition-colors"
              >
                {item[lang]}
              </a>
            ))}
            <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between">
              <a
                href="/cv"
                target="_blank"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 text-xs font-mono font-medium text-[var(--accent-cyan)]"
              >
                <Download size={13} />
                <span>{lang === "es" ? "Descargar CV (PDF)" : "Download Resume (PDF)"}</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
