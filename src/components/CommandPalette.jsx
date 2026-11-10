"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Terminal,
  Smartphone,
  Layers,
  Sparkles,
  Download,
  Mail,
  Moon,
  Sun,
  Globe,
  ArrowRight,
  ExternalLink,
  X,
  Code2
} from "lucide-react";
import { usePrefs } from "@/context/PrefsContext";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";

export default function CommandPalette({ isOpen, onClose, onSelectDemo }) {
  const { lang, setLang, theme, toggleTheme } = usePrefs();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Close with Esc or open with Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open trigger handled by parent or custom state
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Reset selected index when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // List of all actionable commands
  const allActions = useMemo(() => {
    return [
      // Navegación
      {
        id: "nav-proyectos",
        group: lang === "es" ? "Navegación" : "Navigation",
        title: lang === "es" ? "Ir a Proyectos" : "Go to Projects",
        icon: Layers,
        badge: "#proyectos",
        perform: () => {
          document.getElementById("proyectos")?.scrollIntoView({ behavior: "smooth" });
          onClose();
        },
      },
      {
        id: "nav-demos",
        group: lang === "es" ? "Navegación" : "Navigation",
        title: lang === "es" ? "Ir a Laboratorio de Demos" : "Go to Interactive Demos",
        icon: Code2,
        badge: "#demos",
        perform: () => {
          document.getElementById("demos")?.scrollIntoView({ behavior: "smooth" });
          onClose();
        },
      },
      {
        id: "nav-skills",
        group: lang === "es" ? "Navegación" : "Navigation",
        title: lang === "es" ? "Ver Stack y Habilidades" : "View Skills & Stack",
        icon: Sparkles,
        badge: "#habilidades",
        perform: () => {
          document.getElementById("habilidades")?.scrollIntoView({ behavior: "smooth" });
          onClose();
        },
      },
      {
        id: "nav-contacto",
        group: lang === "es" ? "Navegación" : "Navigation",
        title: lang === "es" ? "Contactar a Marc Amador" : "Contact Marc Amador",
        icon: Mail,
        badge: "#contacto",
        perform: () => {
          document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
          onClose();
        },
      },

      // Demos
      {
        id: "demo-java",
        group: lang === "es" ? "Demos en Vivo" : "Live Demos",
        title: lang === "es" ? "Ejecutar Terminal Java 21 (Motor de Préstamos)" : "Run Java 21 Terminal Demo",
        icon: Terminal,
        badge: "Java 21",
        color: "text-amber-400",
        perform: () => {
          if (onSelectDemo) onSelectDemo("java");
          document.getElementById("demos")?.scrollIntoView({ behavior: "smooth" });
          onClose();
        },
      },
      {
        id: "demo-android",
        group: lang === "es" ? "Demos en Vivo" : "Live Demos",
        title: lang === "es" ? "Probar Simulador HabitNest (Android & Kotlin)" : "Test HabitNest Phone (Android)",
        icon: Smartphone,
        badge: "Kotlin",
        color: "text-purple-400",
        perform: () => {
          if (onSelectDemo) onSelectDemo("android");
          document.getElementById("demos")?.scrollIntoView({ behavior: "smooth" });
          onClose();
        },
      },
      {
        id: "demo-web",
        group: lang === "es" ? "Demos en Vivo" : "Live Demos",
        title: lang === "es" ? "Abrir Laboratorio React & Métricas" : "Open React & Metrics Lab",
        icon: Code2,
        badge: "React 19",
        color: "text-sky-400",
        perform: () => {
          if (onSelectDemo) onSelectDemo("web");
          document.getElementById("demos")?.scrollIntoView({ behavior: "smooth" });
          onClose();
        },
      },

      // Proyectos destacados
      ...projects.map((p) => ({
        id: `project-${p.slug}`,
        group: lang === "es" ? "Proyectos" : "Projects",
        title: p.title,
        subtitle: p.stack.slice(0, 3).join(" • "),
        icon: Layers,
        badge: p.kind.toUpperCase(),
        perform: () => {
          const el = document.getElementById(`project-${p.slug}`);
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          } else {
            document.getElementById("proyectos")?.scrollIntoView({ behavior: "smooth" });
          }
          onClose();
        },
      })),

      // Acciones rápidas
      {
        id: "action-theme",
        group: lang === "es" ? "Preferencias" : "Preferences",
        title:
          theme === "dark"
            ? lang === "es"
              ? "Cambiar a Modo Claro"
              : "Switch to Light Mode"
            : lang === "es"
            ? "Cambiar a Modo Oscuro"
            : "Switch to Dark Mode",
        icon: theme === "dark" ? Sun : Moon,
        perform: () => {
          toggleTheme();
          onClose();
        },
      },
      {
        id: "action-lang",
        group: lang === "es" ? "Preferencias" : "Preferences",
        title:
          lang === "es"
            ? "Cambiar idioma a Inglés (English)"
            : "Switch language to Spanish (Español)",
        icon: Globe,
        perform: () => {
          setLang(lang === "es" ? "en" : "es");
          onClose();
        },
      },
      {
        id: "action-cv",
        group: lang === "es" ? "Documentos" : "Documents",
        title: lang === "es" ? "Descargar Currículum Vitae (PDF)" : "Download Resume (PDF)",
        icon: Download,
        perform: () => {
          window.open("/cv", "_blank");
          onClose();
        },
      },
      {
        id: "action-copy-email",
        group: lang === "es" ? "Contacto" : "Contact",
        title: `${lang === "es" ? "Copiar correo:" : "Copy email:"} ${profile.email}`,
        icon: Mail,
        perform: () => {
          navigator.clipboard.writeText(profile.email);
          onClose();
        },
      },
    ];
  }, [lang, theme, toggleTheme, setLang, onSelectDemo, onClose]);

  // Filter actions based on query
  const filtered = useMemo(() => {
    if (!query.trim()) return allActions;
    const q = query.toLowerCase();
    return allActions.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.group.toLowerCase().includes(q) ||
        (a.badge && a.badge.toLowerCase().includes(q)) ||
        (a.subtitle && a.subtitle.toLowerCase().includes(q))
    );
  }, [allActions, query]);

  // Key navigation (up, down, enter)
  const handleKeyNav = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].perform();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
          className="relative w-full max-w-xl rounded-2xl glass-panel-elevated overflow-hidden border border-[var(--border-strong)] shadow-2xl z-10"
          onKeyDown={handleKeyNav}
        >
          {/* Search Header */}
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[var(--border-subtle)] bg-[var(--bg-surface)]">
            <Search className="w-5 h-5 text-[var(--accent-cyan)] shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={lang === "es" ? "Escribe un comando o busca en el portafolio..." : "Type a command or search..."}
              className="w-full bg-transparent border-0 text-[var(--text-main)] placeholder-[var(--text-dim)] focus:outline-none text-sm font-sans"
            />
            <span className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[11px] font-mono text-[var(--text-dim)] bg-[var(--bg-base)] border border-[var(--border-subtle)]">
              ESC
            </span>
            <button
              onClick={onClose}
              className="sm:hidden p-1 rounded-md text-[var(--text-dim)] hover:text-[var(--text-main)]"
            >
              <X size={16} />
            </button>
          </div>

          {/* List of Results */}
          <div className="max-h-[380px] overflow-y-auto p-2 space-y-1">
            {filtered.length === 0 ? (
              <div className="py-12 text-center text-xs text-[var(--text-dim)] font-mono">
                {lang === "es" ? "No se encontraron comandos para tu búsqueda." : "No matching commands found."}
              </div>
            ) : (
              filtered.map((item, index) => {
                const isSelected = index === selectedIndex;
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => item.perform()}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-left transition-colors font-sans text-xs sm:text-[13px] ${
                      isSelected
                        ? "bg-[var(--accent-cyan)] text-[#090d16] font-medium"
                        : "text-[var(--text-main)] hover:bg-[var(--bg-surface)]"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`p-1.5 rounded-lg shrink-0 ${
                          isSelected
                            ? "bg-black/15 text-[#090d16]"
                            : "bg-[var(--bg-base)] text-[var(--text-muted)] border border-[var(--border-subtle)]"
                        }`}
                      >
                        <Icon size={14} className={item.color || ""} />
                      </div>
                      <div className="truncate">
                        <span className="block truncate">{item.title}</span>
                        {item.subtitle && (
                          <span
                            className={`block text-[11px] font-mono truncate ${
                              isSelected ? "text-[#090d16]/75" : "text-[var(--text-dim)]"
                            }`}
                          >
                            {item.subtitle}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {item.badge && (
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                            isSelected
                              ? "bg-black/20 text-[#090d16] font-semibold"
                              : "bg-[var(--bg-base)] text-[var(--text-muted)] border border-[var(--border-subtle)]"
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                      <ArrowRight
                        size={12}
                        className={`transition-transform ${isSelected ? "translate-x-0.5" : "opacity-0"}`}
                      />
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Footer Shortcuts */}
          <div className="px-4 py-2 border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] flex items-center justify-between text-[11px] font-mono text-[var(--text-dim)]">
            <div className="flex items-center gap-3">
              <span>↑↓ Navegar</span>
              <span>↵ Seleccionar</span>
            </div>
            <span>Spotlight Marc OS</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
