"use client";

import { motion } from "framer-motion";
import { ChevronRight, Download } from "lucide-react";
import { usePrefs } from "@/context/PrefsContext";
import { useWM } from "@/context/WindowContext";
import { DOCK_APPS } from "@/data/apps";
import { profile } from "@/data/profile";

const rise = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  const { t, ui } = usePrefs();
  const { open } = useWM();

  return (
    <div className="absolute inset-0 overflow-y-auto">
      <motion.div
        className="flex min-h-full flex-col justify-center px-6 py-10 md:px-[9vw] md:pb-32"
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }}
      >
        <motion.div variants={rise} className="mb-8 flex items-center gap-3.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={profile.photo} alt={profile.name} className="h-14 w-14 rounded-full border border-line-strong object-cover" />
          <p className="text-sm text-muted">
            {ui("hero.hi")} <span className="text-fg">{profile.name.split(" ")[0]}</span>
            <br />
            {t(profile.availability)}
          </p>
        </motion.div>

        <motion.h1 variants={rise} className="display text-[clamp(52px,8.4vw,116px)]">
          {profile.name}
        </motion.h1>

        <motion.p variants={rise} className="mt-5 max-w-[34ch] text-[19px] leading-snug text-muted md:text-[22px]">
          <span className="text-fg">{t(profile.role)}.</span> {t(profile.tagline)}
        </motion.p>

        <motion.div variants={rise} className="mt-9 flex flex-wrap gap-3">
          <button className="btn btn-primary" onClick={() => open("projects")}>
            {ui("hero.projects")}
          </button>
          <button className="btn" onClick={() => open("cv")}>
            <Download size={15} strokeWidth={1.8} /> {ui("hero.cv")}
          </button>
        </motion.div>

        {/* Lista de secciones (solo móvil; en escritorio se usa el dock) */}
        <motion.ul variants={rise} className="mt-12 border-t border-line md:hidden">
          {DOCK_APPS.map(({ id, labelKey, Icon }) => (
            <li key={id}>
              <button className="row !px-1" onClick={() => open(id)}>
                <Icon size={18} strokeWidth={1.7} className="text-muted" />
                <span className="flex-1">{ui(labelKey)}</span>
                <ChevronRight size={16} className="text-muted" />
              </button>
            </li>
          ))}
        </motion.ul>
      </motion.div>
    </div>
  );
}
