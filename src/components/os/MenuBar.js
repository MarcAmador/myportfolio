"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { usePrefs } from "@/context/PrefsContext";
import { useWM } from "@/context/WindowContext";
import { APPS } from "@/data/apps";
import { profile } from "@/data/profile";
import { getProject } from "@/data/projects";

function Clock({ lang }) {
  const [now, setNow] = useState(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 15000);
    return () => clearInterval(id);
  }, []);
  if (!now) return <span className="opacity-0">00:00</span>;
  const day = now.toLocaleDateString(lang === "es" ? "es-MX" : "en-US", { weekday: "short", day: "numeric", month: "short" });
  const time = now.toLocaleTimeString(lang === "es" ? "es-MX" : "en-US", { hour: "2-digit", minute: "2-digit", hour12: false });
  return (
    <span className="tabular-nums">
      <span className="hidden lg:inline">{day} · </span>
      {time}
    </span>
  );
}

export default function MenuBar() {
  const { lang, setLang, theme, toggleTheme, ui, t } = usePrefs();
  const { windows, focusedKey } = useWM();

  const focused = focusedKey ? windows[focusedKey] : null;
  let activeName = ui("menu.desktop");
  if (focused) {
    activeName = focused.app === "project" ? getProject(focused.payload)?.title : ui(APPS[focused.app].labelKey);
  }

  return (
    <div className="menubar relative z-[9000] flex items-center justify-between px-3">
      <div className="flex min-w-0 items-center gap-3">
        <span className="grid h-5 w-5 flex-none place-items-center border-2 border-ink bg-orange font-display text-[15px] leading-none text-[#1a1814]">
          {profile.name[0]}
        </span>
        <strong className="truncate font-medium uppercase">{activeName}</strong>
        <span className="hidden text-ink-soft md:inline">· {profile.handle}.os</span>
      </div>

      <div className="flex items-center gap-3">
        <span className="hidden items-center gap-2 text-ink-soft xl:flex">
          <span className="inline-block h-2 w-2 bg-green" />
          {t(profile.availability)}
        </span>

        <div role="group" aria-label={ui("menu.lang")} className="flex border-2 border-ink">
          {["es", "en"].map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              aria-pressed={lang === l}
              className={`px-1.5 uppercase transition-colors ${lang === l ? "bg-ink text-paper-2" : "hover:bg-paper-3"}`}
            >
              {l}
            </button>
          ))}
        </div>

        <button
          onClick={toggleTheme}
          aria-label={ui("menu.theme")}
          title={ui("menu.theme")}
          className="grid h-[22px] w-[22px] place-items-center border-2 border-ink transition-colors hover:bg-yellow hover:text-[#1a1814]"
        >
          {theme === "dark" ? <Sun size={13} strokeWidth={2.5} /> : <Moon size={13} strokeWidth={2.5} />}
        </button>

        <Clock lang={lang} />
      </div>
    </div>
  );
}
