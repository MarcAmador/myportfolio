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
  const time = now.toLocaleTimeString(lang === "es" ? "es-MX" : "en-US", { hour: "2-digit", minute: "2-digit", hour12: false });
  return <span className="tabular-nums">{time}</span>;
}

export default function MenuBar() {
  const { lang, setLang, theme, toggleTheme, ui } = usePrefs();
  const { windows, focusedKey } = useWM();

  const focused = focusedKey ? windows[focusedKey] : null;
  let activeName = null;
  if (focused) {
    activeName = focused.app === "project" ? getProject(focused.payload)?.title : ui(APPS[focused.app].labelKey);
  }

  return (
    <div className="menubar relative z-[9000] flex items-center justify-between px-4">
      <div className="flex min-w-0 items-center gap-3">
        <span className="font-medium text-fg">{profile.name}</span>
        {activeName && <span className="truncate">/ {activeName}</span>}
      </div>

      <div className="flex items-center gap-4">
        <div role="group" aria-label={ui("menu.lang")} className="flex gap-2.5">
          {["es", "en"].map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              aria-pressed={lang === l}
              className={`uppercase transition-colors ${lang === l ? "text-fg" : "hover:text-fg"}`}
            >
              {l}
            </button>
          ))}
        </div>

        <button onClick={toggleTheme} aria-label={ui("menu.theme")} title={ui("menu.theme")} className="transition-colors hover:text-fg">
          {theme === "dark" ? <Sun size={15} strokeWidth={1.8} /> : <Moon size={15} strokeWidth={1.8} />}
        </button>

        <Clock lang={lang} />
      </div>
    </div>
  );
}
