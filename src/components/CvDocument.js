"use client";

import { Printer } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { usePrefs } from "@/context/PrefsContext";
import { experience, profile, skills } from "@/data/profile";
import { projects } from "@/data/projects";

export default function CvDocument() {
  const { t, ui, lang, setLang } = usePrefs();

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("print") === "1") {
      const id = setTimeout(() => window.print(), 600);
      return () => clearTimeout(id);
    }
  }, []);

  const L = lang === "es"
    ? { sum: "Perfil", exp: "Experiencia", edu: "Educación", skills: "Habilidades", proj: "Proyectos destacados" }
    : { sum: "Profile", exp: "Experience", edu: "Education", skills: "Skills", proj: "Selected projects" };

  return (
    <div className="min-h-dvh bg-paper-3 py-6 print:bg-white print:py-0">
      <div className="no-print mx-auto mb-4 flex max-w-[820px] flex-wrap items-center justify-between gap-3 px-4">
        <Link href="/" className="btn btn-sm">← {ui("detail.back")}</Link>
        <div className="flex items-center gap-3">
          <div className="flex border-2 border-ink font-mono text-xs">
            {["es", "en"].map((l) => (
              <button key={l} onClick={() => setLang(l)} aria-pressed={lang === l} className={`px-2 py-1 uppercase ${lang === l ? "bg-ink text-paper-2" : ""}`}>
                {l}
              </button>
            ))}
          </div>
          <button className="btn btn-sm btn-primary" onClick={() => window.print()}>
            <Printer size={13} strokeWidth={2.5} /> {ui("cv.download")}
          </button>
        </div>
      </div>

      {/* La hoja siempre es blanca/tinta: es un documento, no parte del tema */}
      <article className="mx-auto max-w-[820px] border-2 border-[#1a1814] bg-white p-8 text-[13px] leading-[1.5] text-[#1a1814] shadow-[7px_7px_0_#1a1814] print:max-w-none print:border-0 print:p-0 print:shadow-none md:p-12">
        <header className="flex items-end justify-between gap-6 border-b-2 border-[#1a1814] pb-5">
          <div>
            <h1 className="display text-[56px]">{profile.name}</h1>
            <p className="mt-1 font-display text-[24px] text-[#f25c1f]">{t(profile.role)}</p>
          </div>
          <ul className="mono text-right text-[11.5px] leading-relaxed">
            <li>{profile.email}</li>
            <li>{t(profile.location)}</li>
            {profile.socials.map((s) => (
              <li key={s.label}>{s.url.replace("https://", "")}</li>
            ))}
          </ul>
        </header>

        <Section title={L.sum}>
          <p>{t(profile.bio)[0]} {t(profile.bio)[1]}</p>
        </Section>

        <Section title={L.exp}>
          {experience.filter((e) => e.type === "work").map((e, i) => (
            <Item key={i} e={e} t={t} />
          ))}
        </Section>

        <Section title={L.edu}>
          {experience.filter((e) => e.type === "edu").map((e, i) => (
            <Item key={i} e={e} t={t} />
          ))}
        </Section>

        <Section title={L.skills}>
          <ul className="grid gap-1 sm:grid-cols-2">
            {skills.map((g) => (
              <li key={g.group.es}>
                <strong>{t(g.group)}:</strong> {g.items.map((i) => i.name).join(", ")}
              </li>
            ))}
          </ul>
        </Section>

        <Section title={L.proj}>
          <ul className="grid gap-1.5">
            {projects.slice(0, 5).map((p) => (
              <li key={p.slug}>
                <strong>{p.title}</strong> ({p.year}) — {t(p.summary)} <span className="mono text-[11px] opacity-70">[{p.stack.slice(0, 4).join(" · ")}]</span>
              </li>
            ))}
          </ul>
        </Section>
      </article>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section className="mt-6 break-inside-avoid">
      <h2 className="mono mb-2 border-b border-[#1a1814]/40 pb-1 text-[11.5px] font-semibold uppercase tracking-[0.14em]">{title}</h2>
      {children}
    </section>
  );
}

function Item({ e, t }) {
  return (
    <div className="mb-3 break-inside-avoid">
      <div className="flex items-baseline justify-between gap-4">
        <p>
          <strong>{t(e.title)}</strong> · {e.org}
        </p>
        <span className="mono whitespace-nowrap text-[11.5px]">
          {e.period}
          {e.periodEnd ? t(e.periodEnd) : ""}
        </span>
      </div>
      <p className="opacity-85">{t(e.desc)}</p>
    </div>
  );
}
