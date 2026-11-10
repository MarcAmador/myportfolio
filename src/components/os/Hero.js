"use client";

import { motion } from "framer-motion";
import { Download, ArrowDownRight } from "lucide-react";
import { usePrefs } from "@/context/PrefsContext";
import { useWM } from "@/context/WindowContext";
import { APPS, DESKTOP_APPS } from "@/data/apps";
import { profile } from "@/data/profile";
import AppTile from "./AppTile";

const TICKER = ["JavaScript", "Java", "Kotlin", "React", "Next.js", "Node", "Android", "Python", "SQL", "Spring"];

function Shapes() {
  // Formas planas superpuestas, como capas de tinta en una impresión riso
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute rounded-full bg-orange"
        style={{ width: "min(46vw, 640px)", aspectRatio: "1", right: "-8vw", top: "-14vw", mixBlendMode: "var(--shape-blend, multiply)" }}
      />
      <div
        className="absolute bg-blue"
        style={{ width: "min(26vw, 340px)", aspectRatio: "1", right: "14vw", bottom: "-6vw", transform: "rotate(12deg)", mixBlendMode: "var(--shape-blend, multiply)", opacity: 0.92 }}
      />
      <div
        className="absolute rounded-full bg-yellow"
        style={{ width: "min(14vw, 180px)", aspectRatio: "1", left: "42vw", bottom: "16vh", mixBlendMode: "var(--shape-blend, multiply)" }}
      />
    </div>
  );
}

function Sticker({ text }) {
  const label = text.repeat(2);
  return (
    <div className="relative grid h-[118px] w-[118px] place-items-center rounded-full border-2 border-ink bg-yellow text-[#1a1814] shadow-[4px_4px_0_var(--shadow)]">
      <svg viewBox="0 0 120 120" className="absolute inset-0" style={{ animation: "spin-slow 18s linear infinite" }} aria-hidden="true">
        <defs>
          <path id="circ" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
        </defs>
        <text fontFamily="var(--font-mono)" fontSize="10.5" letterSpacing="2.2" fill="currentColor" style={{ textTransform: "uppercase" }}>
          <textPath href="#circ">{label}</textPath>
        </text>
      </svg>
      <span className="font-display text-[44px] leading-none">✺</span>
    </div>
  );
}

export default function Hero() {
  const { t, ui } = usePrefs();
  const { open } = useWM();
  const parts = profile.name.split(" ");
  const first = parts[0];
  const rest = parts.slice(1).join(" ");

  return (
    <div className="absolute inset-0 overflow-y-auto overflow-x-hidden md:overflow-hidden">
      <Shapes />

      <div className="relative flex min-h-full flex-col px-5 pb-10 pt-8 md:block md:h-full md:min-h-0 md:px-0 md:pb-0 md:pt-0">
        {/* Titular */}
        <motion.div
          className="md:absolute md:bottom-[170px] md:left-12 lg:bottom-[150px] lg:left-16 xl:left-24"
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } } }}
        >
          <motion.p variants={rise} className="label mb-3 !text-ink">
            {ui("hero.hi")}
          </motion.p>
          <motion.h1 variants={rise} className="display select-none text-[clamp(72px,17vw,96px)] md:text-[clamp(88px,min(13vw,21vh),208px)]">
            {first}
            <br />
            <em className="italic">{rest}</em>
            <span className="text-orange">.</span>
          </motion.h1>
          <motion.p variants={rise} className="mt-5 max-w-[34ch] font-display text-[26px] leading-[1.1] md:text-[34px]">
            {t(profile.role)} <span className="text-ink-soft">—</span> {t(profile.tagline)}
          </motion.p>
          <motion.div variants={rise} className="mt-6 flex flex-wrap gap-3">
            <button className="btn btn-primary" onClick={() => open("projects")}>
              {ui("hero.projects")} <ArrowDownRight size={15} strokeWidth={2.5} />
            </button>
            <button className="btn" onClick={() => open("cv")}>
              <Download size={15} strokeWidth={2.5} /> {ui("hero.cv")}
            </button>
          </motion.div>
          <motion.p variants={rise} className="label mt-5 hidden md:block">
            ← {ui("hero.hint")}
          </motion.p>
        </motion.div>

        {/* Retrato */}
        <motion.figure
          className="relative mx-auto mt-8 w-[210px] md:absolute md:bottom-auto md:left-auto md:right-[200px] md:top-[88px] md:m-0 md:w-[260px] lg:right-[230px] lg:w-[320px] xl:w-[360px]"
          initial={{ opacity: 0, y: 30, rotate: 0 }}
          animate={{ opacity: 1, y: 0, rotate: 4 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 140, damping: 16 }}
        >
          <div className="border-2 border-ink bg-paper-2 p-2.5 pb-9 shadow-[7px_7px_0_var(--shadow)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={profile.photo} alt={profile.name} className="block aspect-square w-full border-2 border-ink object-cover" />
            <figcaption className="mono absolute inset-x-0 bottom-2.5 text-center text-[11px] uppercase tracking-widest">
              {profile.handle}.dev
            </figcaption>
          </div>
          <div className="absolute -right-8 -top-10 hidden md:block">
            <Sticker text={ui("hero.sticker")} />
          </div>
        </motion.figure>

        {/* Íconos: columna a la derecha en escritorio, cuadrícula en móvil */}
        <div className="mt-8 grid grid-cols-4 gap-1 md:absolute md:right-3 md:top-4 md:mt-0 md:flex md:flex-col md:gap-3">
          {Object.values(APPS)
            .filter((a) => a.id !== "project")
            .map((app) => {
              const onDesktop = DESKTOP_APPS.some((d) => d.id === app.id);
              return (
                <button
                  key={app.id}
                  className={`desktop-icon ${onDesktop ? "" : "md:hidden"} !w-full md:!w-[92px]`}
                  onClick={() => open(app.id)}
                  aria-label={`${ui("hero.openWindow")}: ${ui(app.labelKey)}`}
                >
                  <AppTile app={app} size={58} />
                  <span className="cap">{ui(app.labelKey)}</span>
                </button>
              );
            })}
        </div>
      </div>

      {/* Cinta inferior */}
      <div className="absolute inset-x-0 bottom-0 hidden h-8 items-center overflow-hidden border-t-2 border-ink bg-yellow text-[#1a1814] md:flex" aria-hidden="true">
        <div className="mono flex w-max text-[12px] font-medium uppercase tracking-[0.16em]" style={{ animation: "marquee 38s linear infinite" }}>
          {[0, 1].map((k) => (
            <div key={k} className="flex shrink-0">
              {TICKER.map((w) => (
                <span key={w + k} className="px-5">
                  {w} <span className="px-3 text-orange">✺</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const rise = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 160, damping: 20 } },
};
