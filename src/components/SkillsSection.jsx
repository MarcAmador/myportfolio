"use client";

import { motion } from "framer-motion";
import { Code2, Terminal, Smartphone, Database, Cpu, CheckCircle2, Sparkles } from "lucide-react";
import { usePrefs } from "@/context/PrefsContext";

const SKILL_DOMAINS = [
  {
    domain: { es: "Frontend y Experiencia Web", en: "Frontend & Web Experience" },
    icon: Code2,
    accentColor: "text-sky-400",
    borderColor: "hover:border-sky-500/50",
    badgeColor: "bg-sky-500/10 text-sky-400 border-sky-500/30",
    items: [
      {
        name: "React 19 y Next.js",
        level: { es: "Especialista", en: "Specialist" },
        desc: {
          es: "Renderizado híbrido (SSR y SSG), Server Components, App Router y hooks avanzados con enfoque en rendimiento.",
          en: "Hybrid rendering (SSR & SSG), Server Components, App Router, and custom performance-focused hooks.",
        },
      },
      {
        name: "TypeScript y JavaScript (ES6+)",
        level: { es: "Sólido", en: "Solid" },
        desc: {
          es: "Tipado estricto, interfaces escalables, programación funcional y manejo asíncrono robusto.",
          en: "Strict static typing, scalable interfaces, functional programming, and resilient async workflows.",
        },
      },
      {
        name: "Tailwind CSS y Framer Motion",
        level: { es: "Fluido", en: "Fluent" },
        desc: {
          es: "Diseño responsivo móvil-primero, micro-interacciones táctiles y sistemas de diseño basados en variables CSS.",
          en: "Mobile-first responsive layouts, tactile micro-interactions, and design systems driven by CSS variables.",
        },
      },
    ],
  },
  {
    domain: { es: "Backend y Arquitectura Java", en: "Backend & Java Architecture" },
    icon: Terminal,
    accentColor: "text-amber-400",
    borderColor: "hover:border-amber-500/50",
    badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    items: [
      {
        name: "Java 21 y Spring Boot",
        level: { es: "Especialista", en: "Specialist" },
        desc: {
          es: "Programación orientada a objetos avanzada, inyección de dependencias, APIs REST seguras y arquitectura por capas.",
          en: "Advanced OOP, dependency injection, secure RESTful APIs, and clean layered architectures.",
        },
      },
      {
        name: "Node.js y Express",
        level: { es: "Sólido", en: "Solid" },
        desc: {
          es: "Construcción de microservicios, middlewares personalizados, autenticación JWT y manejo seguro de sesiones.",
          en: "Microservice design, custom middlewares, JWT authentication, and secure session management.",
        },
      },
      {
        name: "JUnit 5 y Pruebas Unitarias",
        level: { es: "Práctica continua", en: "Active" },
        desc: {
          es: "Pruebas unitarias y de integración para garantizar estabilidad, refactorizaciones seguras y cero regresiones.",
          en: "Unit and integration testing to ensure stability, fearless refactoring, and zero regressions.",
        },
      },
    ],
  },
  {
    domain: { es: "Desarrollo Móvil Nativo", en: "Native Mobile Development" },
    icon: Smartphone,
    accentColor: "text-purple-400",
    borderColor: "hover:border-purple-500/50",
    badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/30",
    items: [
      {
        name: "Kotlin y Jetpack Compose",
        level: { es: "Especialista", en: "Specialist" },
        desc: {
          es: "Interfaces declarativas fluidas con animaciones nativas, gestión reactiva del estado y soporte para modo oscuro.",
          en: "Declarative fluid UIs with native animations, reactive state management, and first-class dark mode.",
        },
      },
      {
        name: "Arquitectura MVVM y Hilt",
        level: { es: "Sólido", en: "Solid" },
        desc: {
          es: "Separación clara de responsabilidades con ViewModels, StateFlow e inyección de dependencias modular.",
          en: "Clean separation of concerns with ViewModels, StateFlow, and modular dependency injection via Hilt.",
        },
      },
      {
        name: "Room DB y Retrofit",
        level: { es: "Sólido", en: "Solid" },
        desc: {
          es: "Persistencia local sin conexión con SQLite/Room y sincronización eficiente con APIs mediante Retrofit.",
          en: "Offline-first local persistence with SQLite/Room and seamless network sync via Retrofit.",
        },
      },
    ],
  },
  {
    domain: { es: "Persistencia e Infraestructura", en: "Persistence & Infrastructure" },
    icon: Database,
    accentColor: "text-emerald-400",
    borderColor: "hover:border-emerald-500/50",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    items: [
      {
        name: "PostgreSQL, SQLite y MongoDB",
        level: { es: "Sólido", en: "Solid" },
        desc: {
          es: "Diseño de esquemas relacionales, indexación eficiente, transacciones ACID y consultas optimizadas.",
          en: "Relational schema design, efficient indexing, ACID transactions, and optimized SQL queries.",
        },
      },
      {
        name: "Git, GitHub y CI/CD",
        level: { es: "Fluido", en: "Fluent" },
        desc: {
          es: "Flujos de trabajo basados en ramas (Git flow), integración continua, pull requests con pruebas y despliegues automáticos.",
          en: "Branch-based workflows (Git flow), continuous integration, automated test runners, and auto-deployments.",
        },
      },
      {
        name: "Docker y Entornos Cloud",
        level: { es: "Competente", en: "Proficient" },
        desc: {
          es: "Contenedores reproducibles para desarrollo y producción, despliegues en Vercel, Railway y VPS Linux.",
          en: "Reproducible container environments for dev/prod, deployments across Vercel, Railway, and Linux VPS.",
        },
      },
    ],
  },
];

export default function SkillsSection() {
  const { lang } = usePrefs();

  return (
    <section id="habilidades" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto border-t border-[var(--border-subtle)]">
      {/* Header */}
      <div className="mb-14">
        <div className="flex items-center gap-2 mb-2 font-mono text-xs text-[var(--accent-cyan)] uppercase tracking-wider">
          <Cpu size={14} />
          <span>Especialidades Técnicas</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-main)] mb-4">
          {lang === "es" ? "Stack y Metodología" : "Skills & Engineering Stack"}
        </h2>
        <p className="text-[var(--text-muted)] max-w-2xl text-base leading-relaxed">
          {lang === "es"
            ? "Herramientas y lenguajes que utilizo activamente para construir software robusto, escalable y con excelente experiencia de usuario."
            : "Core languages, frameworks, and architectural principles I use to build robust, scalable, and responsive software."}
        </p>
      </div>

      {/* Grid of 4 Engineering Domains */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SKILL_DOMAINS.map((domain, i) => {
          const Icon = domain.icon;
          return (
            <div
              key={i}
              className={`rounded-2xl glass-panel border border-[var(--border-subtle)] ${domain.borderColor} p-6 sm:p-7 shadow-lg transition-all duration-300 hover-glow`}
            >
              {/* Domain Title */}
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-[var(--border-subtle)]">
                <div className="flex items-center gap-2.5">
                  <Icon size={18} className={domain.accentColor} />
                  <h3 className="font-bold text-base text-[var(--text-main)]">
                    {domain.domain[lang]}
                  </h3>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-4">
                {domain.items.map((item, j) => (
                  <div
                    key={j}
                    className="p-3.5 rounded-xl bg-[var(--bg-base)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] transition-colors"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="font-bold text-sm text-[var(--text-main)]">
                        {item.name}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono border ${domain.badgeColor}`}>
                        {item.level[lang]}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                      {item.desc[lang]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
