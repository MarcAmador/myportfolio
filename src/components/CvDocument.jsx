"use client";

import { Printer, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { usePrefs } from "@/context/PrefsContext";
import { experience, profile, skills } from "@/data/profile";
import { projects } from "@/data/projects";

export default function CvDocument() {
  const { t, lang, setLang } = usePrefs();

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("print") === "1") {
      const id = setTimeout(() => window.print(), 500);
      return () => clearTimeout(id);
    }
  }, []);

  const workItems = experience.filter((e) => e.type === "work");
  const eduItems = experience.filter((e) => e.type === "edu");

  return (
    <div className="min-h-screen bg-[#090d16] text-[#f1f5f9] py-8 px-4 sm:px-6 print:bg-white print:text-black print:p-0 print:m-0">
      {/* Top Action Bar (hidden when printing) */}
      <div className="no-print max-w-[820px] mx-auto mb-6 flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl glass-panel-elevated border border-[var(--border-strong)]">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
        >
          <ArrowLeft size={14} />
          <span>{lang === "es" ? "Volver al portafolio" : "Back to portfolio"}</span>
        </Link>

        <div className="flex items-center gap-3">
          <div className="flex rounded-full border border-[var(--border-subtle)] overflow-hidden bg-[var(--bg-base)] p-0.5 text-xs font-mono">
            {["es", "en"].map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-2.5 py-0.5 rounded-full uppercase transition-colors ${
                  lang === l
                    ? "bg-[var(--accent-cyan)] text-[#090d16] font-bold"
                    : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold bg-[var(--accent-cyan)] text-[#090d16] shadow-md hover:opacity-90 transition-all cursor-pointer"
          >
            <Printer size={14} />
            <span>{lang === "es" ? "Imprimir / Guardar PDF" : "Print / Save PDF"}</span>
          </button>
        </div>
      </div>

      {/* Printable Sheet (Always high-contrast white paper) */}
      <article className="print-page mx-auto max-w-[820px] rounded-2xl bg-white text-[#111827] p-8 sm:p-12 shadow-2xl border border-gray-200 print:max-w-none print:rounded-none print:border-0 print:p-0 print:shadow-none print:m-0 font-sans text-[12.5px] leading-relaxed">
        {/* Header */}
        <header className="border-b-2 border-gray-900 pb-5 mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-950 font-sans">
              {profile.name}
            </h1>
            <p className="text-base font-semibold text-sky-800 mt-1">
              {t(profile.role)}
            </p>
          </div>

          <div className="text-left sm:text-right font-mono text-[11px] text-gray-700 space-y-0.5">
            <p className="font-semibold text-gray-950">{profile.email}</p>
            <p>{t(profile.location)}</p>
            <p>github.com/MarcAmador</p>
            <p>linkedin.com/in/marcamador</p>
          </div>
        </header>

        {/* Resumen Profesional */}
        <section className="mb-6 break-inside-avoid">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-sky-900 border-b border-gray-200 pb-1 mb-2">
            {lang === "es" ? "Perfil Profesional" : "Professional Summary"}
          </h2>
          <p className="text-gray-800 leading-normal">
            {t(profile.bio)[0]} {t(profile.bio)[1]}
          </p>
        </section>

        {/* Experiencia Laboral */}
        <section className="mb-6">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-sky-900 border-b border-gray-200 pb-1 mb-3">
            {lang === "es" ? "Experiencia Laboral" : "Work Experience"}
          </h2>
          <div className="space-y-4">
            {workItems.map((item, i) => (
              <div key={i} className="break-inside-avoid">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-bold text-[13px] text-gray-950">
                    {t(item.title)}{" "}
                    <span className="font-medium text-gray-700">· {item.org}</span>
                  </h3>
                  <span className="font-mono text-[11px] font-semibold text-gray-600">
                    {item.period} {item.periodEnd ? t(item.periodEnd) : ""}
                  </span>
                </div>
                <p className="text-gray-800 mt-1 text-[12px] leading-normal">{t(item.desc)}</p>
                {item.tags.length > 0 && (
                  <p className="font-mono text-[10.5px] text-gray-600 mt-1">
                    <span className="font-semibold text-gray-700">Tecnologías:</span>{" "}
                    {item.tags.join(" · ")}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Proyectos Destacados */}
        <section className="mb-6">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-sky-900 border-b border-gray-200 pb-1 mb-3">
            {lang === "es" ? "Proyectos de Software Destacados" : "Key Software Projects"}
          </h2>
          <div className="space-y-3">
            {projects.map((p) => (
              <div key={p.slug} className="break-inside-avoid">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="font-bold text-[13px] text-gray-950">
                    {p.title}{" "}
                    <span className="font-normal text-gray-600 text-[11.5px]">
                      ({p.year})
                    </span>
                  </h3>
                  <span className="font-mono text-[10.5px] text-gray-700 font-semibold">
                    {p.stack.join(" · ")}
                  </span>
                </div>
                <p className="text-gray-800 text-[12px] mt-0.5 leading-normal">
                  {t(p.summary)}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Educación y Certificaciones */}
        <section className="mb-6 break-inside-avoid">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-sky-900 border-b border-gray-200 pb-1 mb-3">
            {lang === "es" ? "Educación y Certificaciones" : "Education & Credentials"}
          </h2>
          <div className="space-y-2.5">
            {eduItems.map((item, i) => (
              <div key={i} className="flex items-baseline justify-between gap-2">
                <div>
                  <h3 className="font-bold text-[12.5px] text-gray-950">
                    {t(item.title)}{" "}
                    <span className="font-normal text-gray-700">· {item.org}</span>
                  </h3>
                  <p className="text-[11.5px] text-gray-700">{t(item.desc)}</p>
                </div>
                <span className="font-mono text-[11px] font-semibold text-gray-600 shrink-0">
                  {item.period}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Habilidades Técnicas */}
        <section className="break-inside-avoid">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-sky-900 border-b border-gray-200 pb-1 mb-2">
            {lang === "es" ? "Habilidades Técnicas" : "Technical Skills"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-[11.5px]">
            <div>
              <strong className="text-gray-950">Frontend:</strong> React 19, Next.js, TypeScript, Tailwind CSS
            </div>
            <div>
              <strong className="text-gray-950">Backend:</strong> Java 21, Spring Boot, Node.js, Express, JUnit 5
            </div>
            <div>
              <strong className="text-gray-950">Móvil:</strong> Kotlin, Android SDK, Jetpack Compose, Room DB
            </div>
            <div>
              <strong className="text-gray-950">Bases de datos:</strong> PostgreSQL, SQLite, MongoDB, JDBC
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}
