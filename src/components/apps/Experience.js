"use client";

import { usePrefs } from "@/context/PrefsContext";
import { experience } from "@/data/profile";

function Timeline({ items }) {
  const { t } = usePrefs();
  return (
    <ol className="relative ml-1 border-l-2 border-ink pl-6">
      {items.map((e, i) => (
        <li key={i} className="relative pb-7 last:pb-0">
          <span className={`absolute -left-[33px] top-1.5 h-3.5 w-3.5 border-2 border-ink ${e.type === "work" ? "bg-orange" : "bg-blue"}`} />
          <p className="mono text-[11.5px] uppercase tracking-wider text-ink-soft">
            {e.period}
            {e.periodEnd ? t(e.periodEnd) : ""}
          </p>
          <h4 className="display mt-0.5 text-[28px] leading-none">{t(e.title)}</h4>
          <p className="mono mt-1 text-[12.5px] font-medium">@ {e.org}</p>
          <p className="mt-2 max-w-[62ch] text-[14.5px] leading-relaxed text-ink/85">{t(e.desc)}</p>
          {e.tags.length > 0 && (
            <div className="mt-2.5 flex flex-wrap gap-1.5">
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
    <div className="grid gap-10 p-5 md:p-7">
      <section>
        <h2 className="display mb-6 text-[46px] md:text-[56px]">
          {ui("exp.work")}
          <span className="text-orange">.</span>
        </h2>
        <Timeline items={experience.filter((e) => e.type === "work")} />
      </section>
      <section>
        <h2 className="display mb-6 text-[46px] md:text-[56px]">
          {ui("exp.edu")}
          <span className="text-blue">.</span>
        </h2>
        <Timeline items={experience.filter((e) => e.type === "edu")} />
      </section>
    </div>
  );
}
