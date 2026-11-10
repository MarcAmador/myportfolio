"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Cover from "@/components/Cover";
import { usePrefs } from "@/context/PrefsContext";
import { useWM } from "@/context/WindowContext";
import { KINDS, projects } from "@/data/projects";

export default function Projects() {
  const { t, ui } = usePrefs();
  const { open } = useWM();
  const [filter, setFilter] = useState("all");

  const list = projects.filter((p) => filter === "all" || p.kind === filter);

  return (
    <div className="flex min-h-full flex-col">
      <div className="sticky top-0 z-10 flex flex-wrap items-center gap-2 border-b-2 border-ink bg-paper-3 px-4 py-2.5">
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filtros">
          <button className="chip" aria-pressed={filter === "all"} onClick={() => setFilter("all")}>
            {ui("projects.all")} · {projects.length}
          </button>
          {Object.entries(KINDS).map(([k, v]) => (
            <button key={k} className="chip" aria-pressed={filter === k} onClick={() => setFilter(k)}>
              {t(v)} · {projects.filter((p) => p.kind === k).length}
            </button>
          ))}
        </div>
        <span className="label ml-auto">
          {list.length} {ui("projects.count")}
        </span>
      </div>

      <motion.div layout className="grid gap-5 p-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((p) => (
            <motion.button
              layout
              key={p.slug}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
              onClick={() => open("project", p.slug)}
              className="group panel flex cursor-pointer flex-col overflow-hidden text-left shadow-[4px_4px_0_var(--shadow)] transition-[transform,box-shadow] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[7px_7px_0_var(--shadow)]"
              aria-label={`${ui("projects.open")}: ${p.title}`}
            >
              <div className="relative border-b-2 border-ink">
                <Cover slug={p.slug} color={p.color} className="block aspect-[5/3] w-full" />
                <span className="chip absolute left-2 top-2 !border-2 bg-paper-2 uppercase">{t(KINDS[p.kind])}</span>
                {p.demo && <span className="chip absolute right-2 top-2 !border-2 bg-ink text-paper-2">DEMO</span>}
              </div>
              <div className="flex flex-1 flex-col gap-1.5 p-3.5">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="display text-[28px]">{p.title}</h3>
                  <span className="mono text-[11px] text-ink-soft">{p.year}</span>
                </div>
                <p className="text-[13.5px] leading-snug text-ink/80">{t(p.summary)}</p>
                <div className="mt-auto flex flex-wrap gap-1 pt-2">
                  {p.stack.slice(0, 3).map((s) => (
                    <span key={s} className="mono text-[10.5px] text-ink-soft">
                      #{s.replace(/\s/g, "")}
                    </span>
                  ))}
                </div>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
