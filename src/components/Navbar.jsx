"use client";

import { Download, Moon, Sun, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { usePrefs } from "@/context/PrefsContext";
import { profile } from "@/data/profile";

export default function Navbar() {
  const { lang, setLang, theme, toggleTheme } = usePrefs();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "#proyectos", es: "Proyectos", en: "Projects" },
    { href: "#demos", es: "Demos", en: "Demos" },
    { href: "#habilidades", es: "Habilidades", en: "Skills" },
    { href: "#experiencia", es: "Experiencia", en: "Experience" },
    { href: "#sobre-mi", es: "Sobre mí", en: "About" },
    { href: "#contacto", es: "Contacto", en: "Contact" },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 py-3 sm:py-4 transition-all">
      <nav
        aria-label="Navegación principal"
        className={`flex items-center justify-between gap-2 sm:gap-6 px-4 sm:px-6 py-2.5 rounded-full border border-border transition-all duration-300 ${
          scrolled ? "bg-[var(--nav-bg)] backdrop-blur-md shadow-lg shadow-black/5" : "bg-[var(--nav-bg)] backdrop-blur-sm"
        }`}
      >
        {/* Logo / Initials */}
        <a href="#inicio" className="flex items-center gap-2 group font-mono text-xs font-semibold tracking-wider text-text">
          <span className="w-7 h-7 rounded-full bg-accent/15 border border-accent/30 text-accent flex items-center justify-center font-bold">
            {profile.name[0]}
          </span>
          <span className="hidden sm:inline-block font-sans text-sm font-semibold tracking-tight group-hover:text-accent transition-colors">
            {profile.name}
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1 sm:gap-2">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-3 py-1.5 text-xs sm:text-[13px] font-medium text-text-muted hover:text-text rounded-full hover:bg-surface-hover transition-colors"
            >
              {item[lang]}
            </a>
          ))}
        </div>

        {/* Controls: Lang, Theme, CV */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <a
            href="/cv"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border text-text-muted hover:text-accent hover:border-accent transition-colors"
            title="Currículum Vitae"
          >
            <Download size={12} />
            <span>CV</span>
          </a>

          {/* Lang toggle */}
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

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Cambiar tema"
            className="w-7 h-7 rounded-full border border-border flex items-center justify-center text-text-muted hover:text-text hover:border-border-strong transition-colors bg-surface"
          >
            {theme === "dark" ? <Sun size={13} /> : <Moon size={13} />}
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Abrir menú"
            className="md:hidden w-7 h-7 rounded-full border border-border flex items-center justify-center text-text-muted"
          >
            {mobileOpen ? <X size={14} /> : <Menu size={14} />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden fixed top-16 inset-x-4 bg-surface border border-border rounded-2xl p-4 shadow-2xl backdrop-blur-xl flex flex-col gap-2">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2 text-sm font-medium text-text-muted hover:text-text hover:bg-surface-hover rounded-lg transition-colors"
            >
              {item[lang]}
            </a>
          ))}
          <a
            href="/cv"
            target="_blank"
            onClick={() => setMobileOpen(false)}
            className="mt-2 flex items-center justify-center gap-2 py-2 text-xs font-mono font-medium border border-border rounded-lg text-accent"
          >
            <Download size={13} />
            <span>{lang === "es" ? "Descargar CV (PDF)" : "Download Resume (PDF)"}</span>
          </a>
        </div>
      )}
    </header>
  );
}
