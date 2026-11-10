"use client";

import { BarChart3, Check, CheckCheck, Flame, Plus } from "lucide-react";
import { useState } from "react";
import { usePrefs } from "@/context/PrefsContext";

// La pantalla del teléfono usa su propia paleta fija (como una app real), independiente del tema.
const C = { ink: "#1d2126", muted: "#6b7078", line: "#dcd8cf", card: "#ffffff", accent: "#2e6b5e", tint: "#dbece5" };

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
const BASE = [60, 100, 80, 40, 100, 60];

function Ring({ pct }) {
  const r = 28;
  const c = 2 * Math.PI * r;
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" role="img" aria-label={`${pct}%`}>
      <circle cx="36" cy="36" r={r} fill="none" stroke={C.line} strokeWidth="6" />
      <circle
        cx="36"
        cy="36"
        r={r}
        fill="none"
        stroke={C.accent}
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - pct / 100)}
        transform="rotate(-90 36 36)"
        style={{ transition: "stroke-dashoffset .5s ease" }}
      />
      <text x="36" y="41" textAnchor="middle" fontSize="14" fontWeight="600" fill={C.ink}>
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

  const week = [...BASE, pct];

  return (
    <div className="phone mx-auto flex-none">
      <div className="phone-screen" style={{ fontSize: 12 }}>
        {/* barra de estado */}
        <div className="flex items-center justify-between px-5 pb-1 pt-2.5 text-[10px] font-medium" style={{ color: C.muted }}>
          <span>9:41</span>
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: C.ink }} aria-hidden="true" />
          <span>5G</span>
        </div>

        {tab === "today" ? (
          <>
            <div className="px-4 pb-3 pt-1">
              <p className="text-[11px]" style={{ color: C.muted }}>
                {ui("demos.android.today")}
              </p>
              <h4 className="font-display text-[28px] leading-none">HabitNest</h4>
            </div>

            <div className="mx-3 flex items-center gap-3 rounded-2xl p-3" style={{ background: C.tint }}>
              <Ring pct={pct} />
              <div>
                <p className="flex items-center gap-1 text-[15px] font-semibold">
                  <Flame size={15} style={{ color: C.accent }} /> {streak}
                </p>
                <p className="text-[11px] leading-tight" style={{ color: C.muted }}>
                  {ui("demos.android.streak")}
                </p>
                <p className="mt-1 text-[11px]">
                  {done}/{habits.length} {ui("demos.android.done")}
                </p>
              </div>
            </div>

            <ul className="mt-2.5 flex-1 space-y-1.5 overflow-auto px-3 pb-20">
              {habits.map((h) => (
                <li key={h.id}>
                  <button
                    onClick={() => toggle(h.id)}
                    aria-pressed={h.done}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors"
                    style={{ background: C.card, border: `1px solid ${C.line}` }}
                  >
                    <span
                      className="grid h-5 w-5 flex-none place-items-center rounded-full"
                      style={h.done ? { background: C.accent, color: "#fff" } : { border: `1.5px solid ${C.line}` }}
                    >
                      {h.done && <Check size={12} strokeWidth={3} />}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className={`block truncate text-[12.5px] font-medium ${h.done ? "line-through opacity-50" : ""}`}>{t(h.name)}</span>
                      <span className="text-[10.5px]" style={{ color: C.muted }}>
                        {h.time}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            <button
              onClick={add}
              aria-label="Add habit"
              className="absolute bottom-16 right-3 grid h-11 w-11 place-items-center rounded-2xl text-white transition-transform active:scale-95"
              style={{ background: C.accent }}
            >
              <Plus size={20} strokeWidth={2.5} />
            </button>
          </>
        ) : (
          <div className="flex-1 px-4 pt-1">
            <h4 className="font-display text-[28px] leading-none">{lang === "es" ? "Semana" : "This week"}</h4>
            <div className="mt-6 flex h-[210px] items-end justify-between gap-2.5 px-1" style={{ borderBottom: `1px solid ${C.line}` }}>
              {week.map((v, i) => (
                <div key={i} className="flex h-full flex-1 flex-col items-center justify-end gap-1">
                  <span className="text-[9.5px]" style={{ color: C.muted }}>
                    {v}
                  </span>
                  <div
                    className="w-full rounded-t-md"
                    style={{ height: `${Math.max(v, 3)}%`, background: i === 6 ? C.accent : C.tint, transition: "height .4s" }}
                  />
                </div>
              ))}
            </div>
            <div className="mt-1.5 flex justify-between px-1 text-[10px]" style={{ color: C.muted }}>
              {WEEK[lang].map((d, i) => (
                <span key={i} className="flex-1 text-center">
                  {d}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* navegación inferior */}
        <nav className="absolute inset-x-0 bottom-0 flex" style={{ background: C.card, borderTop: `1px solid ${C.line}` }}>
          {[
            ["today", CheckCheck, ui("demos.android.today")],
            ["stats", BarChart3, lang === "es" ? "Estadísticas" : "Stats"],
          ].map(([id, Icon, label]) => (
            <button key={id} onClick={() => setTab(id)} aria-pressed={tab === id} className="flex flex-1 flex-col items-center gap-0.5 py-2 text-[10px] font-medium">
              <span
                className="grid h-6 w-12 place-items-center rounded-full transition-colors"
                style={tab === id ? { background: C.tint, color: C.accent } : { color: C.muted }}
              >
                <Icon size={14} />
              </span>
              <span style={{ color: tab === id ? C.ink : C.muted }}>{label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
