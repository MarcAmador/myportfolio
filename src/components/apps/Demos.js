"use client";

import { Download, GitBranch, Info, Monitor, Smartphone, SquareTerminal } from "lucide-react";
import { useEffect, useState } from "react";
import { usePrefs } from "@/context/PrefsContext";
import { useWM } from "@/context/WindowContext";
import { projects } from "@/data/projects";
import { TINTS } from "@/data/apps";
import PixelForge from "@/components/demos/PixelForge";
import JavaTerminal from "@/components/demos/JavaTerminal";
import AndroidPhone from "@/components/demos/AndroidPhone";

const DEMOS = [
  { id: "pixel", slug: "pixel-forge", Icon: Monitor, color: "pink", Component: PixelForge },
  { id: "java", slug: "biblioteca-central", Icon: SquareTerminal, color: "blue", Component: JavaTerminal },
  { id: "android", slug: "habitnest", Icon: Smartphone, color: "green", Component: AndroidPhone },
];

export default function Demos({ initial }) {
  const { ui } = usePrefs();
  const { open } = useWM();
  const [active, setActive] = useState(initial && DEMOS.some((d) => d.id === initial) ? initial : "pixel");

  useEffect(() => {
    if (initial && DEMOS.some((d) => d.id === initial)) setActive(initial);
  }, [initial]);

  const demo = DEMOS.find((d) => d.id === active);
  const project = projects.find((p) => p.slug === demo.slug);
  const Demo = demo.Component;

  return (
    <div className="flex min-h-full flex-col md:flex-row">
      <aside className="flex flex-none gap-2 overflow-x-auto border-b-2 border-ink bg-paper-3 p-3 md:w-[210px] md:flex-col md:border-b-0 md:border-r-2">
        <p className="label hidden px-1 pb-1 md:block">{ui("demos.intro")}</p>
        {DEMOS.map((d) => {
          const tint = TINTS[d.color];
          const on = d.id === active;
          return (
            <button
              key={d.id}
              onClick={() => setActive(d.id)}
              aria-pressed={on}
              className={`flex flex-none items-center gap-3 border-2 border-ink p-2 pr-4 text-left transition-all md:pr-2 ${
                on ? "bg-paper-2 shadow-[3px_3px_0_var(--shadow)]" : "border-transparent hover:border-ink"
              }`}
            >
              <span className="tile h-9 w-9 flex-none" style={{ background: tint.bg, color: tint.fg, boxShadow: "none" }}>
                <d.Icon size={18} strokeWidth={2.2} />
              </span>
              <span className="min-w-0">
                <span className="block whitespace-nowrap text-[13.5px] font-semibold leading-tight">{ui(`demos.${d.id}.name`)}</span>
                <span className="mono block whitespace-nowrap text-[10.5px] text-ink-soft">{ui(`demos.${d.id}.kind`)}</span>
              </span>
            </button>
          );
        })}
      </aside>

      <section className="min-w-0 flex-1 p-4 md:p-6">
        <div className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-3">
          <h2 className="display text-[40px] md:text-[48px]">
            {ui(`demos.${demo.id}.name`)}
            <span className="text-orange">.</span>
          </h2>
          <div className="ml-auto flex flex-wrap gap-2">
            <button className="btn btn-sm" onClick={() => open("project", project.slug)}>
              {ui("projects.open")}
            </button>
            {project.links.apk && (
              <a className="btn btn-sm" href={project.links.apk} target="_blank" rel="noreferrer">
                <Download size={12} strokeWidth={2.5} /> APK
              </a>
            )}
            {project.links.repo && (
              <a className="btn btn-sm" href={project.links.repo} target="_blank" rel="noreferrer">
                <GitBranch size={12} strokeWidth={2.5} /> {ui("projects.repo")}
              </a>
            )}
          </div>
        </div>

        <p className="mb-6 flex items-start gap-2 border-2 border-dashed border-ink bg-paper-3 px-3 py-2 text-[13px] text-ink/85">
          <Info size={15} className="mt-0.5 flex-none" />
          {ui(`demos.note.${demo.id}`)}
        </p>

        <div key={demo.id}>
          <Demo />
        </div>
      </section>
    </div>
  );
}
