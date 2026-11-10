"use client";

import { usePrefs } from "@/context/PrefsContext";
import { skills } from "@/data/profile";

export default function Skills() {
  const { t, ui } = usePrefs();
  return (
    <div className="p-7 md:p-10">
      <h2 className="display mb-8 text-[34px]">{ui("skills.title")}</h2>

      <div className="space-y-7">
        {skills.map((g) => (
          <section key={g.group.es} className="grid gap-3 sm:grid-cols-[150px_1fr]">
            <h3 className="pt-1 text-sm text-muted">{t(g.group)}</h3>
            <ul className="flex flex-wrap gap-2">
              {g.items.map((it) => (
                <li key={it.name} className="rounded-lg border border-line bg-surface-2 px-3 py-1.5 text-[14px]">
                  {it.name}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <p className="mt-9 border-t border-line pt-5 text-sm text-muted">
        {ui("skills.learning")} <span className="text-fg">{ui("skills.learningValue")}</span>
      </p>
    </div>
  );
}
