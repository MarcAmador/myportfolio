import { User, FolderOpen, MonitorPlay, Layers, Briefcase, Mail, FileText, Folder } from "lucide-react";

/**
 * Registro de aplicaciones del escritorio.
 * size: tamaño inicial de la ventana (px) · dock: si aparece en el dock
 */
export const APPS = {
  about: { id: "about", labelKey: "apps.about", Icon: User, size: { w: 680, h: 560 }, dock: true },
  projects: { id: "projects", labelKey: "apps.projects", Icon: FolderOpen, size: { w: 780, h: 580 }, dock: true },
  demos: { id: "demos", labelKey: "apps.demos", Icon: MonitorPlay, size: { w: 900, h: 700 }, dock: true },
  skills: { id: "skills", labelKey: "apps.skills", Icon: Layers, size: { w: 680, h: 540 }, dock: true },
  experience: { id: "experience", labelKey: "apps.experience", Icon: Briefcase, size: { w: 660, h: 600 }, dock: true },
  contact: { id: "contact", labelKey: "apps.contact", Icon: Mail, size: { w: 580, h: 600 }, dock: true },
  cv: { id: "cv", labelKey: "apps.cv", Icon: FileText, size: { w: 520, h: 340 }, dock: true },
  // ventana dinámica para la ficha de un proyecto (no aparece en el dock)
  project: { id: "project", labelKey: "apps.projects", Icon: Folder, size: { w: 720, h: 600 }, dock: false },
};

export const DOCK_APPS = Object.values(APPS).filter((a) => a.dock);
