"use client";

import { ChevronRight } from "lucide-react";
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
      <div className="sticky top-0 z-10 flex flex-wrap items-center gap-2 border-b border-line bg-surface px-5 py-3">
        <button className="chip" aria-pressed={filter === "all"} onClick={() => setFilter("all")}>
          {ui("projects.all")}
        </button>
        {Object.entries(KINDS).map(([k, v]) => (
          <button key={k} className="chip" aria-pressed={filter === k} onClick={() => setFilter(k)}>
            {t(v)}
          </button>
        ))}
        <span className="ml-auto text-[13px] text-muted">
          {list.length} {ui("projects.count")}
        </span>
      </div>

      <ul>
        {list.map((p) => (
          <li key={p.slug}>
            <button className="row" onClick={() => open("project", p.slug)} aria-label={`${ui("projects.open")}: ${p.title}`}>
              <Cover slug={p.slug} className="h-14 w-20 flex-none rounded-lg border border-line" />
              <span className="min-w-0 flex-1">
                <span className="flex items-baseline gap-3">
                  <span className="display text-[24px]">{p.title}</span>
                  <span className="text-[13px] text-muted">
                    {t(KINDS[p.kind])} · {p.year}
                  </span>
                </span>
                <span className="mt-0.5 block truncate text-[14px] text-muted">{t(p.summary)}</span>
              </span>
              <ChevronRight size={18} className="flex-none text-muted" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
