"use client";

import { BarChart3, CheckCheck, Flame, Plus, Check } from "lucide-react";
import { useState } from "react";
import { usePrefs } from "@/context/PrefsContext";

const HABITS = [
  { id: 1, name: { es: "Beber 2 L de agua", en: "Drink 2 L of water" }, time: "08:00", done: true },
  { id: 2, name: { es: "Leer 20 minutos", en: "Read for 20 minutes" }, time: "21:30", done: false },
  { id: 3, name: { es: "Caminar 30 minutos", en: "Walk for 30 minutes" }, time: "18:00", done: false },
  { id: 4, name: { es: "Meditar", en: "Meditate" }, time: "07:15", done: true },
  { id: 5, name: { es: "Practicar código", en: "Practice coding" }, time: "20:00", done: false },
];

const WEEK = {
  es: ["L", "M", "X", "J", "V", "S", "D"],
  en: ["M", "T", "W", "T", "F", "S", "S"],
};
const BASE = [60, 100, 80, 40, 100, 60, 0];

function Ring({ pct }) {
  const r = 30;
  const c = 2 * Math.PI * r;
  return (
    <svg width="76" height="76" viewBox="0 0 76 76" role="img" aria-label={`${pct}%`}>
      <circle cx="38" cy="38" r={r} fill="none" stroke="#1a1814" strokeOpacity=".18" strokeWidth="8" />
      <circle
        cx="38"
        cy="38"
        r={r}
        fill="none"
        stroke="#1f8a5b"
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - pct / 100)}
        transform="rotate(-90 38 38)"
        style={{ transition: "stroke-dashoffset .5s cubic-bezier(.3,1.4,.5,1)" }}
      />
      <text x="38" y="43" textAnchor="middle" fontSize="15" fontWeight="700" fill="#1a1814">
        {pct}%
      </text>
    </svg>
  );
}

export default function AndroidPhone() {
  const { lang, t, ui } = usePrefs();
  const [habits, setHabits] = useState(HABITS);
  const [tab, setTab] = useState("today");

  const done = habits.filter((h) => h.done).length;
  const pct = Math.round((done / habits.length) * 100);
  const streak = 12 + (done === habits.length ? 1 : 0);

  const toggle = (id) => setHabits((hs) => hs.map((h) => (h.id === id ? { ...h, done: !h.done } : h)));
  const add = () =>
    setHabits((hs) => [
      ...hs,
      { id: Date.now(), name: { es: `Nuevo hábito ${hs.length + 1}`, en: `New habit ${hs.length + 1}` }, time: "12:00", done: false },
    ]);

  const week = [...BASE.slice(0, 6), pct];

  return (
    <div className="phone mx-auto flex-none">
      <div className="phone-screen" style={{ fontSize: 12 }}>
        {/* barra de estado */}
        <div className="flex items-center justify-between px-5 pb-1 pt-2 font-mono text-[10px] font-medium">
          <span>9:41</span>
          <span className="h-3 w-3 rounded-full bg-[#14120d]" aria-hidden="true" />
          <span>5G ▮▮▮</span>
        </div>

        {tab === "today" ? (
          <>
            <div className="px-4 pb-2 pt-1">
              <p className="font-mono text-[10px] uppercase tracking-widest opacity-60">{ui("demos.android.today")}</p>
              <h4 className="font-display text-[30px] leading-none">HabitNest</h4>
            </div>

            <div className="mx-3 flex items-center gap-3 rounded-2xl border-2 border-[#1a1814] bg-[#f0b429] p-3">
              <Ring pct={pct} />
              <div>
                <p className="flex items-center gap-1 text-[15px] font-bold">
                  <Flame size={16} /> {streak}
                </p>
                <p className="text-[11px] leading-tight">{ui("demos.android.streak")}</p>
                <p className="mt-1 font-mono text-[10px]">
                  {done}/{habits.length} {ui("demos.android.done")}
                </p>
              </div>
            </div>

            <ul className="mt-2 flex-1 space-y-1.5 overflow-auto px-3 pb-16">
              {habits.map((h) => (
                <li key={h.id}>
                  <button
                    onClick={() => toggle(h.id)}
                    className={`flex w-full items-center gap-2.5 rounded-xl border-2 border-[#1a1814] px-2.5 py-2 text-left transition-colors ${h.done ? "bg-[#9bd0b4]" : "bg-white"}`}
                    aria-pressed={h.done}
                  >
                    <span className={`grid h-5 w-5 flex-none place-items-center rounded-md border-2 border-[#1a1814] ${h.done ? "bg-[#1a1814] text-white" : ""}`}>
                      {h.done && <Check size={12} strokeWidth={3.5} />}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className={`block truncate text-[12.5px] font-semibold ${h.done ? "line-through opacity-60" : ""}`}>{t(h.name)}</span>
                      <span className="font-mono text-[9.5px] opacity-60">{h.time}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            <button
              onClick={add}
              aria-label="Add habit"
              className="absolute bottom-14 right-3 grid h-11 w-11 place-items-center rounded-2xl border-2 border-[#1a1814] bg-[#f25c1f] shadow-[3px_3px_0_#1a1814] active:translate-x-px active:translate-y-px active:shadow-none"
            >
              <Plus size={20} strokeWidth={3} />
            </button>
          </>
        ) : (
          <div className="flex-1 px-4 pt-2">
            <h4 className="font-display text-[30px] leading-none">{lang === "es" ? "Semana" : "This week"}</h4>
            <div className="mt-5 flex h-[210px] items-end justify-between gap-2 border-b-2 border-[#1a1814] px-1">
              {week.map((v, i) => (
                <div key={i} className="flex h-full flex-1 flex-col items-center justify-end gap-1">
                  <span className="font-mono text-[9px]">{v}</span>
                  <div
                    className="w-full rounded-t-md border-2 border-b-0 border-[#1a1814]"
                    style={{ height: `${Math.max(v, 3)}%`, background: i === 6 ? "#f25c1f" : "#1f8a5b", transition: "height .4s" }}
                  />
                </div>
              ))}
            </div>
            <div className="mt-1 flex justify-between px-1 font-mono text-[10px]">
              {WEEK[lang].map((d, i) => (
                <span key={i} className="flex-1 text-center">
                  {d}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* navegación inferior */}
        <nav className="absolute inset-x-0 bottom-0 flex border-t-2 border-[#1a1814] bg-[#f1e8d2]">
          {[
            ["today", CheckCheck, ui("demos.android.today")],
            ["stats", BarChart3, lang === "es" ? "Estadísticas" : "Stats"],
          ].map(([id, Icon, label]) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              aria-pressed={tab === id}
              className="flex flex-1 flex-col items-center gap-0.5 py-2 text-[10px] font-semibold"
            >
              <span className={`grid h-6 w-12 place-items-center rounded-full transition-colors ${tab === id ? "bg-[#1a1814] text-[#f1e8d2]" : ""}`}>
                <Icon size={14} />
              </span>
              {label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
