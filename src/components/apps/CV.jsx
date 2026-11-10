"use client";

import { Download, ExternalLink } from "lucide-react";
import { usePrefs } from "@/context/PrefsContext";
import { profile } from "@/data/profile";

export default function CV() {
  const { t, ui } = usePrefs();
  return (
    <div className="p-7 md:p-9">
      <h2 className="display text-[34px]">{ui("cv.title")}</h2>
      <p className="mt-1 text-sm text-muted">
        {profile.name} · {t(profile.role)}
      </p>
      <p className="mb-6 mt-4 max-w-[42ch] text-[14.5px] text-muted">{ui("cv.sub")}</p>
      <div className="flex flex-wrap gap-3">
        <a className="btn btn-primary" href="/cv?print=1" target="_blank" rel="noreferrer">
          <Download size={15} strokeWidth={1.8} /> {ui("cv.download")}
        </a>
        <a className="btn" href="/cv" target="_blank" rel="noreferrer">
          <ExternalLink size={15} strokeWidth={1.8} /> {ui("cv.open")}
        </a>
      </div>
    </div>
  );
}
