"use client";

import { usePrefs } from "@/context/PrefsContext";
import { experience } from "@/data/profile";

function Timeline({ items }) {
  const { t } = usePrefs();
  return (
    <ol className="relative border-l border-line-strong pl-6">
      {items.map((e, i) => (
        <li key={i} className="relative pb-8 last:pb-0">
          <span className="absolute -left-[29px] top-2 h-2 w-2 rounded-full bg-accent" />
          <p className="text-[13px] text-muted">
            {e.period}
            {e.periodEnd ? t(e.periodEnd) : ""}
          </p>
          <h4 className="mt-0.5 text-[17px] font-medium">{t(e.title)}</h4>
          <p className="text-[14px] text-muted">{e.org}</p>
          <p className="mt-2 max-w-[60ch] text-[14.5px] leading-relaxed">{t(e.desc)}</p>
          {e.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {e.tags.map((tag) => (
                <span key={tag} className="chip">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </li>
      ))}
    </ol>
  );
}

export default function Experience() {
  const { ui } = usePrefs();
  return (
    <div className="grid gap-12 p-7 md:p-10">
      <section>
        <h2 className="display mb-7 text-[34px]">{ui("exp.work")}</h2>
        <Timeline items={experience.filter((e) => e.type === "work")} />
      </section>
      <section>
        <h2 className="display mb-7 text-[34px]">{ui("exp.edu")}</h2>
        <Timeline items={experience.filter((e) => e.type === "edu")} />
      </section>
    </div>
  );
}
