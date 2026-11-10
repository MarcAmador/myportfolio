"use client";

import { Download, GitBranch, Smartphone, SquareTerminal } from "lucide-react";
import { useEffect, useState } from "react";
import { usePrefs } from "@/context/PrefsContext";
import { useWM } from "@/context/WindowContext";
import { projects } from "@/data/projects";
import JavaTerminal from "@/components/demos/JavaTerminal";
import AndroidPhone from "@/components/demos/AndroidPhone";

const DEMOS = [
  { id: "java", slug: "biblioteca-central", Icon: SquareTerminal, Component: JavaTerminal },
  { id: "android", slug: "habitnest", Icon: Smartphone, Component: AndroidPhone },
];

export default function Demos({ initial }) {
  const { ui } = usePrefs();
  const { open } = useWM();
  const [active, setActive] = useState(DEMOS.some((d) => d.id === initial) ? initial : "java");

  useEffect(() => {
    if (DEMOS.some((d) => d.id === initial)) setActive(initial);
  }, [initial]);

  const demo = DEMOS.find((d) => d.id === active);
  const project = projects.find((p) => p.slug === demo.slug);
  const Demo = demo.Component;

  return (
    <div className="flex min-h-full flex-col md:flex-row">
      <aside className="flex flex-none gap-1 overflow-x-auto border-b border-line p-3 md:w-[210px] md:flex-col md:border-b-0 md:border-r">
        {DEMOS.map((d) => {
          const on = d.id === active;
          return (
            <button
              key={d.id}
              onClick={() => setActive(d.id)}
              aria-pressed={on}
              className={`flex flex-none items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${on ? "bg-surface-2" : "hover:bg-surface-2/60"}`}
            >
              <d.Icon size={18} strokeWidth={1.7} className={on ? "text-accent" : "text-muted"} />
              <span className="min-w-0">
                <span className="block whitespace-nowrap text-[14px] leading-tight">{ui(`demos.${d.id}.name`)}</span>
                <span className="block whitespace-nowrap text-[12px] text-muted">{ui(`demos.${d.id}.kind`)}</span>
              </span>
            </button>
          );
        })}
      </aside>

      <section className="min-w-0 flex-1 p-6 md:p-8">
        <div className="mb-2 flex flex-wrap items-center gap-x-4 gap-y-3">
          <h2 className="display text-[34px]">{ui(`demos.${demo.id}.name`)}</h2>
          <div className="ml-auto flex flex-wrap gap-2">
            <button className="btn btn-sm" onClick={() => open("project", project.slug)}>
              {ui("projects.open")}
            </button>
            {project.links.apk && (
              <a className="btn btn-sm" href={project.links.apk} target="_blank" rel="noreferrer">
                <Download size={13} strokeWidth={1.8} /> APK
              </a>
            )}
            {project.links.repo && (
              <a className="btn btn-sm" href={project.links.repo} target="_blank" rel="noreferrer">
                <GitBranch size={13} strokeWidth={1.8} /> {ui("projects.repo")}
              </a>
            )}
          </div>
        </div>

        <p className="mb-7 max-w-[62ch] text-[13.5px] text-muted">{ui(`demos.note.${demo.id}`)}</p>

        <div key={demo.id}>
          <Demo />
        </div>
      </section>
    </div>
  );
}
