"use client";

import { Briefcase, GraduationCap, Calendar, Award } from "lucide-react";
import { usePrefs } from "@/context/PrefsContext";
import { experience } from "@/data/profile";

export default function ExperienceSection() {
  const { lang, t } = usePrefs();

  const workItems = experience.filter((e) => e.type === "work");
  const eduItems = experience.filter((e) => e.type === "edu");

  return (
    <section id="experiencia" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto border-t border-[var(--border-subtle)]">
      {/* Header */}
      <div className="mb-14">
        <div className="flex items-center gap-2 mb-2 font-mono text-xs text-[var(--accent-purple)] uppercase tracking-wider">
          <Calendar size={14} />
          <span>Trayectoria y Evolución</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-main)] mb-4">
          {lang === "es" ? "Experiencia y Formación" : "Experience & Education"}
        </h2>
        <p className="text-[var(--text-muted)] max-w-2xl text-base leading-relaxed">
          {lang === "es"
            ? "Mi recorrido profesional construyendo productos de software para miles de usuarios, liderando iniciativas técnicas y fortaleciendo mis fundamentos de ingeniería."
            : "My professional path building software products for thousands of users, leading technical projects, and solidifying engineering foundations."}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Work Column (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-2.5 pb-3 border-b border-[var(--border-subtle)]">
            <Briefcase size={18} className="text-[var(--accent-cyan)]" />
            <h3 className="font-bold text-lg text-[var(--text-main)]">
              {lang === "es" ? "Experiencia Profesional" : "Work Experience"}
            </h3>
          </div>

          <div className="space-y-6">
            {workItems.map((item, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl glass-panel border border-[var(--border-subtle)] hover:border-[var(--border-strong)] transition-all hover-glow"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="font-mono text-xs text-[var(--accent-cyan)] font-semibold">
                    {item.period} {item.periodEnd ? t(item.periodEnd) : ""}
                  </span>
                  {i === 0 && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[var(--accent-mint)]/15 text-[var(--accent-mint)] border border-[var(--accent-mint)]/30">
                      {lang === "es" ? "ROL ACTUAL" : "CURRENT ROLE"}
                    </span>
                  )}
                </div>

                <h4 className="text-lg font-bold text-[var(--text-main)] mb-1">
                  {t(item.title)}
                </h4>

                <p className="text-xs font-mono text-[var(--text-dim)] mb-3">
                  en {item.org}
                </p>

                <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-4">
                  {t(item.desc)}
                </p>

                {item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-[var(--bg-base)] text-[var(--text-muted)] border border-[var(--border-subtle)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Education & Certifications Column (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center gap-2.5 pb-3 border-b border-[var(--border-subtle)]">
            <GraduationCap size={18} className="text-[var(--accent-amber)]" />
            <h3 className="font-bold text-lg text-[var(--text-main)]">
              {lang === "es" ? "Educación y Certificaciones" : "Education & Credentials"}
            </h3>
          </div>

          <div className="space-y-5">
            {eduItems.map((item, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl glass-panel border border-[var(--border-subtle)] hover:border-[var(--border-strong)] transition-all hover-glow"
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="font-mono text-xs text-[var(--accent-amber)] font-semibold">
                    {item.period}
                  </span>
                  <Award size={14} className="text-[var(--accent-amber)]" />
                </div>

                <h4 className="text-base font-bold text-[var(--text-main)] mb-1">
                  {t(item.title)}
                </h4>

                <p className="text-xs font-mono text-[var(--text-dim)] mb-2">
                  {item.org}
                </p>

                <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                  {t(item.desc)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
