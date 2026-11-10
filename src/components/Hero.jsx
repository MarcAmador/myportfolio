"use client";

import { ArrowDown, Download, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import { usePrefs } from "@/context/PrefsContext";
import { profile } from "@/data/profile";

export default function Hero() {
  const { lang, t } = usePrefs();

  return (
    <section id="inicio" className="pt-28 pb-16 sm:pt-36 sm:pb-24 px-4 sm:px-6 max-w-5xl mx-auto">
      <div className="flex flex-col-reverse md:flex-row items-start md:items-center justify-between gap-8 md:gap-12">
        {/* Text column */}
        <div className="flex-1">
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-surface text-xs font-mono mb-6 text-text-muted">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            <span className="font-medium text-text">{t(profile.availability)}</span>
            <span className="text-text-subtle">•</span>
            <span>{t(profile.location)}</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-text leading-[1.1] mb-5">
            {lang === "es" ? "Hey, soy " : "Hey, I'm "}
            <span className="text-accent underline decoration-accent/30 underline-offset-8">
              {profile.name}
            </span>
          </h1>

          {/* Subtitle / Bio summary */}
          <p className="text-base sm:text-lg text-text-muted leading-relaxed max-w-2xl mb-8">
            <strong className="text-text font-semibold">{t(profile.role)}</strong>. {t(profile.tagline)}{" "}
            {lang === "es"
              ? "Especializado en interfaces reactivas con React y Next.js, servicios backend en Java/Node y aplicaciones nativas en Android."
              : "Specialized in responsive web interfaces with React & Next.js, backend services in Java/Node, and native Android apps."}
          </p>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <a
              href="#proyectos"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-accent text-accent-fg shadow-sm hover:opacity-90 transition-all active:scale-[0.98]"
            >
              <span>{lang === "es" ? "Ver proyectos" : "View projects"}</span>
              <ArrowDown size={14} />
            </a>
            <a
              href="/cv"
              target="_blank"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-surface border border-border-strong text-text hover:bg-surface-hover hover:border-accent transition-all active:scale-[0.98]"
            >
              <Download size={14} />
              <span>{lang === "es" ? "Descargar CV (PDF)" : "Download Resume"}</span>
            </a>
            <a
              href="#contacto"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-surface border border-border-strong text-text hover:bg-surface-hover hover:border-accent transition-all active:scale-[0.98]"
            >
              <Mail size={14} />
              <span>{lang === "es" ? "Contactar" : "Get in touch"}</span>
            </a>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-3 text-text-muted font-mono text-xs">
            <span className="text-text-subtle">{lang === "es" ? "Redes //" : "Social //"}</span>
            <a
              href="https://github.com/MarcAmador"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-accent transition-colors"
            >
              <GithubIcon size={14} />
              <span>GitHub</span>
            </a>
            <span className="text-text-subtle">/</span>
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-accent transition-colors"
            >
              <LinkedinIcon size={14} />
              <span>LinkedIn</span>
            </a>
            <span className="text-text-subtle">/</span>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-1.5 hover:text-accent transition-colors"
            >
              <Mail size={14} />
              <span>Email</span>
            </a>
          </div>
        </div>

        {/* Avatar column */}
        <div className="relative group self-center md:self-auto">
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden border border-border-strong bg-surface shadow-xl p-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={profile.photo}
              alt={profile.name}
              className="w-full h-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </div>
      </div>

      {/* Technical Highlights / 3 Columns Swiss style */}
      <div className="mt-14 sm:mt-18 grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-border pt-8 text-xs font-mono">
        <div className="p-4 rounded-xl border border-border bg-surface">
          <span className="text-accent font-semibold block mb-1">01 // FRONTEND & WEB</span>
          <p className="text-text-muted font-sans text-xs sm:text-sm">
            {lang === "es"
              ? "React, Next.js (App Router), Tailwind CSS y JavaScript. Interfaces rápidas y accesibles."
              : "React, Next.js (App Router), Tailwind CSS and JavaScript. High-performance accessible UI."}
          </p>
        </div>
        <div className="p-4 rounded-xl border border-border bg-surface">
          <span className="text-accent font-semibold block mb-1">02 // BACKEND & JAVA</span>
          <p className="text-text-muted font-sans text-xs sm:text-sm">
            {lang === "es"
              ? "Java 21, Spring Boot, Node.js y bases de datos relacionales (PostgreSQL, SQLite) y MongoDB."
              : "Java 21, Spring Boot, Node.js and databases (PostgreSQL, SQLite, MongoDB)."}
          </p>
        </div>
        <div className="p-4 rounded-xl border border-border bg-surface">
          <span className="text-accent font-semibold block mb-1">03 // MÓVIL & ANDROID</span>
          <p className="text-text-muted font-sans text-xs sm:text-sm">
            {lang === "es"
              ? "Desarrollo nativo en Kotlin con Jetpack Compose, Room DB y arquitectura limpia MVVM."
              : "Native development in Kotlin with Jetpack Compose, Room DB and clean MVVM architecture."}
          </p>
        </div>
      </div>
    </section>
  );
}
