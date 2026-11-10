"use client";

import { usePrefs } from "@/context/PrefsContext";
import { skills } from "@/data/profile";
import { TINTS } from "@/data/apps";

function Meter({ level }) {
  return (
    <span className="flex gap-[3px]" role="img" aria-label={`${level}/5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} className={`h-2.5 w-2.5 border-[1.5px] border-ink ${n <= level ? "bg-ink" : ""}`} />
      ))}
    </span>
  );
}

export default function Skills() {
  const { t, ui } = usePrefs();
  return (
    <div className="p-5 md:p-7">
      <h2 className="display mb-6 text-[46px] md:text-[56px]">
        {ui("skills.title")}
        <span className="text-orange">.</span>
      </h2>
      <div className="grid gap-5 sm:grid-cols-2">
        {skills.map((g) => (
          <section key={g.group.es} className="panel shadow-[4px_4px_0_var(--shadow)]">
            <h3
              className="mono border-b-2 border-ink px-3.5 py-2 text-[12px] font-medium uppercase tracking-widest"
              style={{ background: TINTS[g.color].bg, color: TINTS[g.color].fg }}
            >
              {t(g.group)}
            </h3>
            <ul className="divide-y divide-ink/20 px-3.5 py-1">
              {g.items.map((it) => (
                <li key={it.name} className="flex items-center justify-between py-2 text-[14.5px]">
                  <span>{it.name}</span>
                  <Meter level={it.level} />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <p className="mono mt-6 border-2 border-dashed border-ink px-4 py-3 text-[12.5px]">
        <span className="text-orange">▸</span> {ui("skills.learning")} <strong className="font-semibold">{ui("skills.learningValue")}</strong>
      </p>
    </div>
  );
}
