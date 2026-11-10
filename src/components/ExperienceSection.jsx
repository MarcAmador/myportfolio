"use client";

import { Briefcase, GraduationCap } from "lucide-react";
import { usePrefs } from "@/context/PrefsContext";
import { experience } from "@/data/profile";

export default function ExperienceSection() {
  const { lang, t, ui } = usePrefs();

  const workItems = experience.filter((e) => e.type === "work");
  const eduItems = experience.filter((e) => e.type === "edu");

  return (
    <section id="experiencia" className="py-20 px-4 sm:px-6 max-w-5xl mx-auto border-t border-border">
      {/* Header */}
      <div className="mb-12">
        <span className="section-label">04 // TRAYECTORIA</span>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text mb-3">
          {lang === "es" ? "Experiencia y Formación" : "Experience & Education"}
        </h2>
        <p className="text-text-muted max-w-2xl text-base">
          {lang === "es"
            ? "Trayectoria práctica en desarrollo de software, responsabilidades asumidas y bases académicas."
            : "Practical journey in software engineering, technical responsibilities, and formal education."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
        {/* Work Column */}
        <div>
          <div className="flex items-center gap-2 mb-6 pb-2 border-b border-border">
            <Briefcase size={18} className="text-accent" />
            <h3 className="font-bold text-lg text-text">
              {lang === "es" ? "Experiencia Laboral" : "Work Experience"}
            </h3>
          </div>

          <ol className="relative border-l border-border ml-2 space-y-8">
            {workItems.map((item, i) => (
              <li key={i} className="ml-6 relative">
                {/* Dot */}
                <span className="absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full bg-accent border-2 border-bg" />

                <div className="flex flex-wrap items-baseline gap-2 mb-1">
                  <span className="font-mono text-xs text-text-subtle font-medium">
                    {item.period} {item.periodEnd ? t(item.periodEnd) : ""}
                  </span>
                  {i === 0 && (
                    <span className="px-2 py-0.2 rounded-full text-[10px] font-mono font-semibold bg-accent-soft text-accent">
                      {lang === "es" ? "ACTUAL" : "PRESENT"}
                    </span>
                  )}
                </div>

                <h4 className="text-base font-semibold text-text">{t(item.title)}</h4>
                <p className="text-xs font-mono text-accent mb-2">@ {item.org}</p>
                <p className="text-sm text-text-muted leading-relaxed mb-3">{t(item.desc)}</p>

                {item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span key={tag} className="tag-pill text-[10.5px]">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ol>
        </div>

        {/* Education Column */}
        <div>
          <div className="flex items-center gap-2 mb-6 pb-2 border-b border-border">
            <GraduationCap size={18} className="text-accent" />
            <h3 className="font-bold text-lg text-text">
              {lang === "es" ? "Educación & Certificaciones" : "Education & Credentials"}
            </h3>
          </div>

          <ol className="relative border-l border-border ml-2 space-y-8">
            {eduItems.map((item, i) => (
              <li key={i} className="ml-6 relative">
                {/* Dot */}
                <span className="absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full bg-border-strong border-2 border-bg" />

                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-mono text-xs text-text-subtle font-medium">
                    {item.period}
                  </span>
                </div>

                <h4 className="text-base font-semibold text-text">{t(item.title)}</h4>
                <p className="text-xs font-mono text-text-muted mb-2">@ {item.org}</p>
                <p className="text-sm text-text-muted leading-relaxed">{t(item.desc)}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
