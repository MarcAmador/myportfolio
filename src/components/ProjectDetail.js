"use client";

import { ArrowLeft, ArrowRight, ArrowUpRight, Download, ExternalLink, Moon, Play, Sun, GitBranch } from "lucide-react";
import Link from "next/link";
import Cover from "@/components/Cover";
import { usePrefs } from "@/context/PrefsContext";
import { useWMOptional } from "@/context/WindowContext";
import { KINDS, projects, getProject } from "@/data/projects";

function Links({ p, onDemo, demoHref }) {
  const { ui } = usePrefs();
  return (
    <div className="flex flex-wrap gap-2.5">
      {p.demo &&
        (onDemo ? (
          <button className="btn btn-primary" onClick={onDemo}>
            <Play size={14} strokeWidth={2.5} /> {ui("projects.demo")}
          </button>
        ) : (
          <Link className="btn btn-primary" href={demoHref}>
            <Play size={14} strokeWidth={2.5} /> {ui("projects.demo")}
          </Link>
        ))}
      {p.links.live && (
        <a className="btn" href={p.links.live} target="_blank" rel="noreferrer">
          <ExternalLink size={14} strokeWidth={2.5} /> {ui("projects.live")}
        </a>
      )}
      {p.links.apk && (
        <a className="btn" href={p.links.apk} target="_blank" rel="noreferrer">
          <Download size={14} strokeWidth={2.5} /> {ui("projects.apk")}
        </a>
      )}
      {p.links.repo && (
        <a className="btn" href={p.links.repo} target="_blank" rel="noreferrer">
          <GitBranch size={14} strokeWidth={2.5} /> {ui("projects.repo")}
        </a>
      )}
    </div>
  );
}

/** variant="window": dentro del escritorio · variant="page": página completa /projects/[slug] */
export default function ProjectDetail({ slug, variant = "window" }) {
  const { t, ui, lang, setLang, theme, toggleTheme } = usePrefs();
  const wm = useWMOptional();
  const p = getProject(slug);
  if (!p) return null;

  const isPage = variant === "page";
  const idx = projects.findIndex((x) => x.slug === slug);
  const next = projects[(idx + 1) % projects.length];

  const body = (
    <article className={isPage ? "mx-auto max-w-5xl px-5 pb-20 pt-8" : "pb-6"}>
      <div className={`relative border-ink ${isPage ? "border-2 shadow-[7px_7px_0_var(--shadow)]" : "border-b-2"}`}>
        <Cover slug={p.slug} color={p.color} className={`block w-full ${isPage ? "aspect-[16/6]" : "aspect-[16/4.2]"}`} />
      </div>

      <div className={`grid gap-8 ${isPage ? "mt-10 md:grid-cols-[1fr_300px]" : "p-5 md:grid-cols-[1fr_240px] md:p-7"}`}>
        <div>
          <p className="label mb-2">
            {t(KINDS[p.kind])} · {p.year}
          </p>
          {isPage ? (
            <h1 className="display text-[64px] md:text-[96px]">
              {p.title}
              <span className="text-orange">.</span>
            </h1>
          ) : (
            <h2 className="display text-[48px] md:text-[60px]">
              {p.title}
              <span className="text-orange">.</span>
            </h2>
          )}
          <p className="mt-4 max-w-[60ch] text-[16px] leading-[1.65]">{t(p.description)}</p>

          <h3 className="label mb-3 mt-8">{ui("projects.highlights")}</h3>
          <ul className="space-y-2">
            {t(p.highlights).map((h) => (
              <li key={h} className="flex gap-3 border-b border-ink/25 pb-2 text-[15px]">
                <span className="mono mt-0.5 text-orange">✺</span>
                {h}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <Links
              p={p}
              onDemo={wm ? () => wm.open("demos", p.demo) : undefined}
              demoHref={`/?open=demos&tab=${p.demo}`}
            />
          </div>
        </div>

        <aside className="h-fit space-y-5 border-2 border-ink bg-paper-3 p-4">
          <div>
            <p className="label mb-2">{ui("projects.stack")}</p>
            <div className="flex flex-wrap gap-1.5">
              {p.stack.map((s) => (
                <span key={s} className="chip bg-paper-2">
                  {s}
                </span>
              ))}
            </div>
          </div>
          {!isPage && (
            <Link href={`/projects/${p.slug}`} className="btn btn-sm w-full justify-between" target="_blank">
              {ui("projects.fullPage")} <ArrowUpRight size={13} strokeWidth={2.5} />
            </Link>
          )}
        </aside>
      </div>
    </article>
  );

  if (!isPage) return body;

  return (
    <div className="min-h-dvh">
      <header className="menubar sticky top-0 z-50 flex items-center justify-between px-3">
        <Link href="/" className="flex items-center gap-2 uppercase hover:text-orange">
          <ArrowLeft size={14} strokeWidth={2.5} /> {ui("detail.back")}
        </Link>
        <div className="flex items-center gap-3">
          <div className="flex border-2 border-ink">
            {["es", "en"].map((l) => (
              <button key={l} onClick={() => setLang(l)} aria-pressed={lang === l} className={`px-1.5 uppercase ${lang === l ? "bg-ink text-paper-2" : "hover:bg-paper-3"}`}>
                {l}
              </button>
            ))}
          </div>
          <button onClick={toggleTheme} aria-label={ui("menu.theme")} className="grid h-[22px] w-[22px] place-items-center border-2 border-ink hover:bg-yellow hover:text-[#1a1814]">
            {theme === "dark" ? <Sun size={13} strokeWidth={2.5} /> : <Moon size={13} strokeWidth={2.5} />}
          </button>
        </div>
      </header>
      {body}
      <footer className="mx-auto flex max-w-5xl items-center justify-between border-t-2 border-ink px-5 py-6">
        <p className="label">{ui("footer.built")}</p>
        <Link href={`/projects/${next.slug}`} className="btn">
          {ui("detail.next")}: {next.title} <ArrowRight size={14} strokeWidth={2.5} />
        </Link>
      </footer>
    </div>
  );
}
