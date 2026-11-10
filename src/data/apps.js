import { User, FolderOpen, MonitorPlay, Layers, Briefcase, Mail, FileText, Folder } from "lucide-react";

/** Colores de tinta → variables CSS (y color de texto legible encima) */
export const TINTS = {
  orange: { bg: "var(--orange)", fg: "#1a1814" },
  blue: { bg: "var(--blue)", fg: "var(--on-blue)" },
  green: { bg: "var(--green)", fg: "var(--on-green)" },
  yellow: { bg: "var(--yellow)", fg: "#1a1814" },
  pink: { bg: "var(--pink)", fg: "#1a1814" },
  paper: { bg: "var(--paper-2)", fg: "var(--ink)" },
};

/**
 * Registro de aplicaciones del escritorio.
 * size: tamaño inicial de la ventana (px) · desktop/dock: dónde aparece el ícono
 */
export const APPS = {
  about: { id: "about", labelKey: "apps.about", color: "pink", Icon: User, size: { w: 720, h: 600 }, desktop: true, dock: true },
  projects: { id: "projects", labelKey: "apps.projects", color: "yellow", Icon: FolderOpen, size: { w: 860, h: 580 }, desktop: true, dock: true },
  demos: { id: "demos", labelKey: "apps.demos", color: "green", Icon: MonitorPlay, size: { w: 940, h: 740 }, desktop: true, dock: true },
  skills: { id: "skills", labelKey: "apps.skills", color: "blue", Icon: Layers, size: { w: 760, h: 620 }, desktop: false, dock: true },
  experience: { id: "experience", labelKey: "apps.experience", color: "orange", Icon: Briefcase, size: { w: 720, h: 640 }, desktop: false, dock: true },
  contact: { id: "contact", labelKey: "apps.contact", color: "blue", Icon: Mail, size: { w: 620, h: 650 }, desktop: true, dock: true },
  cv: { id: "cv", labelKey: "apps.cv", color: "paper", Icon: FileText, size: { w: 560, h: 420 }, desktop: true, dock: false },
  // ventana dinámica para la ficha de un proyecto (no aparece en el dock)
  project: { id: "project", labelKey: "apps.projects", color: "yellow", Icon: Folder, size: { w: 780, h: 640 }, desktop: false, dock: false },
};

export const DOCK_APPS = Object.values(APPS).filter((a) => a.dock);
export const DESKTOP_APPS = Object.values(APPS).filter((a) => a.desktop);
