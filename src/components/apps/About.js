"use client";

import { ArrowUpRight, MapPin } from "lucide-react";
import { usePrefs } from "@/context/PrefsContext";
import { profile } from "@/data/profile";

export default function About() {
  const { t, ui } = usePrefs();
  return (
    <div className="grid gap-6 p-5 md:grid-cols-[220px_1fr] md:p-7">
      <aside className="flex flex-col gap-4">
        <div className="panel rotate-[-2deg] p-2 pb-6 shadow-[5px_5px_0_var(--shadow)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={profile.photo} alt={profile.name} className="block aspect-square w-full border-2 border-ink object-cover" />
          <p className="mono mt-2 text-center text-[11px] uppercase tracking-widest">{profile.name}</p>
        </div>
        <p className="flex items-center gap-2 font-mono text-[12px] text-ink-soft">
          <MapPin size={14} /> {t(profile.location)}
        </p>
        <div>
          <p className="label mb-2">{ui("about.socials")}</p>
          <div className="flex flex-wrap gap-2">
            {profile.socials.map((s) => (
              <a key={s.label} href={s.url} target="_blank" rel="noreferrer" className="btn btn-sm">
                {s.label} <ArrowUpRight size={12} strokeWidth={2.5} />
              </a>
            ))}
          </div>
        </div>
      </aside>

      <section>
        <h2 className="display mb-1 text-[46px] md:text-[56px]">
          {ui("about.title")}
          <span className="text-orange">.</span>
        </h2>
        <p className="label mb-5">{t(profile.role)}</p>
        <div className="space-y-4 text-[15.5px] leading-[1.65]">
          {t(profile.bio).map((p, i) => (
            <p key={i} className={i === 0 ? "text-[17px] font-medium" : "text-ink/85"}>
              {p}
            </p>
          ))}
        </div>

        <dl className="mt-7 grid grid-cols-3 border-2 border-ink">
          {profile.facts.map((f, i) => (
            <div key={i} className={`p-3 md:p-4 ${i ? "border-l-2 border-ink" : ""} ${["bg-yellow", "bg-pink", "bg-orange"][i]} text-[#1a1814]`}>
              <dd className="display text-[44px] md:text-[56px]">{f.v}</dd>
              <dt className="mono text-[10.5px] uppercase leading-tight tracking-wider">{t(f.k)}</dt>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
