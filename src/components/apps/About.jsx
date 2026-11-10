"use client";

import { ArrowUpRight, MapPin } from "lucide-react";
import { usePrefs } from "@/context/PrefsContext";
import { profile } from "@/data/profile";

export default function About() {
  const { t, ui } = usePrefs();
  return (
    <div className="p-7 md:p-10">
      <div className="mb-8 flex items-center gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={profile.photo} alt={profile.name} className="h-16 w-16 rounded-full border border-line-strong object-cover" />
        <div>
          <h2 className="display text-[34px]">{ui("about.title")}</h2>
          <p className="flex items-center gap-1.5 text-sm text-muted">
            <MapPin size={13} /> {t(profile.location)}
          </p>
        </div>
      </div>

      <div className="max-w-[60ch] space-y-4 leading-[1.7]">
        {t(profile.bio).map((p, i) => (
          <p key={i} className={i === 0 ? "text-[17px] text-fg" : "text-muted"}>
            {p}
          </p>
        ))}
      </div>

      <dl className="mt-9 grid max-w-[460px] grid-cols-3 border-y border-line py-5">
        {profile.facts.map((f, i) => (
          <div key={i} className={i ? "border-l border-line pl-5" : ""}>
            <dd className="display text-[40px]">{f.v}</dd>
            <dt className="text-[13px] leading-tight text-muted">{t(f.k)}</dt>
          </div>
        ))}
      </dl>

      <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm">
        {profile.socials.map((s) => (
          <a key={s.label} href={s.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-muted transition-colors hover:text-accent">
            {s.label} <ArrowUpRight size={14} />
          </a>
        ))}
      </div>
    </div>
  );
}
