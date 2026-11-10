"use client";

import { Download, ExternalLink } from "lucide-react";
import { usePrefs } from "@/context/PrefsContext";
import { profile } from "@/data/profile";

export default function CV() {
  const { t, ui } = usePrefs();
  return (
    <div className="grid gap-6 p-5 sm:grid-cols-[170px_1fr] md:p-6">
      {/* Hoja en miniatura */}
      <div className="mx-auto w-[150px] rotate-[-3deg] border-2 border-ink bg-white p-3 text-[#1a1814] shadow-[5px_5px_0_var(--shadow)] sm:w-full" aria-hidden="true">
        <div className="mb-1 h-2.5 w-3/4 bg-[#1a1814]" />
        <div className="mb-3 h-1.5 w-1/2 bg-[#f25c1f]" />
        {[90, 100, 80, 95, 60].map((w, i) => (
          <div key={i} className="mb-1.5 h-1 bg-[#1a1814]/25" style={{ width: `${w}%` }} />
        ))}
        <div className="my-3 h-px bg-[#1a1814]" />
        {[100, 85, 92, 70].map((w, i) => (
          <div key={i} className="mb-1.5 h-1 bg-[#1a1814]/25" style={{ width: `${w}%` }} />
        ))}
      </div>
      <div>
        <h2 className="display text-[40px]">{ui("cv.title")}</h2>
        <p className="label mb-1 mt-1">
          {profile.name} · {t(profile.role)}
        </p>
        <p className="mb-5 max-w-[40ch] text-[14px] text-ink-soft">{ui("cv.sub")}</p>
        <div className="flex flex-wrap gap-3">
          <a className="btn btn-primary" href="/cv?print=1" target="_blank" rel="noreferrer">
            <Download size={14} strokeWidth={2.5} /> {ui("cv.download")}
          </a>
          <a className="btn" href="/cv" target="_blank" rel="noreferrer">
            <ExternalLink size={14} strokeWidth={2.5} /> {ui("cv.open")}
          </a>
        </div>
      </div>
    </div>
  );
}
