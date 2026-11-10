"use client";

import { usePrefs } from "@/context/PrefsContext";

const SKILL_DOMAINS = [
  {
    domain: { es: "Frontend & Web", en: "Frontend & Web" },
    code: "DOMINIO: FRONTEND",
    items: [
      {
        name: "React 19 & Next.js",
        level: { es: "Competente", en: "Proficient" },
        desc: {
          es: "Renderizado híbrido (SSR y SSG), Server Components, App Router y hooks avanzados.",
          en: "Hybrid rendering (SSR & SSG), Server Components, App Router and custom hooks.",
        },
      },
      {
        name: "JavaScript (ES6+) & TypeScript",
        level: { es: "Nivel Sólido", en: "Solid" },
        desc: {
          es: "Manipulación fluida del DOM, asincronía (Async/Await), modularidad y tipado estático.",
          en: "DOM manipulation, asynchronous code (Async/Await), modularity and static typing.",
        },
      },
      {
        name: "Tailwind CSS & Vanilla CSS",
        level: { es: "Competente", en: "Proficient" },
        desc: {
          es: "Diseño responsivo móvil-first, sistemas de diseño con variables CSS y animaciones fluidas.",
          en: "Mobile-first responsive design, design systems with CSS variables and fluid animations.",
        },
      },
    ],
  },
  {
    domain: { es: "Backend & Java", en: "Backend & Java" },
    code: "DOMINIO: BACKEND",
    items: [
      {
        name: "Java 21 & Spring Boot",
        level: { es: "Competente", en: "Proficient" },
        desc: {
          es: "POO avanzada, inyección de dependencias, APIs RESTful seguras y arquitectura por capas.",
          en: "Advanced OOP, dependency injection, secure RESTful APIs and clean layered architecture.",
        },
      },
      {
        name: "Node.js & Express",
        level: { es: "Nivel Sólido", en: "Solid" },
        desc: {
          es: "Construcción de microservicios, middlewares, autenticación JWT y consumo de APIs.",
          en: "Building microservices, custom middlewares, JWT authentication and third-party APIs.",
        },
      },
      {
        name: "JUnit 5 & Testing",
        level: { es: "Práctica Continua", en: "Active" },
        desc: {
          es: "Pruebas unitarias y de integración para garantizar estabilidad y regresiones cero.",
          en: "Unit and integration testing to ensure code stability and zero regressions.",
        },
      },
    ],
  },
  {
    domain: { es: "Móvil & Android", en: "Mobile & Android" },
    code: "DOMINIO: MOBILE",
    items: [
      {
        name: "Kotlin & Jetpack Compose",
        level: { es: "Competente", en: "Proficient" },
        desc: {
          es: "Interfaces declarativas modernas para Android, arquitectura MVVM y coroutines.",
          en: "Modern declarative UI for Android, clean MVVM architecture and Kotlin coroutines.",
        },
      },
      {
        name: "Room Database & Retrofit",
        level: { es: "Nivel Sólido", en: "Solid" },
        desc: {
          es: "Persistencia local offline-first y consumo estructurado de servicios web REST.",
          en: "Offline-first local persistence and structured REST API consumption.",
        },
      },
    ],
  },
  {
    domain: { es: "Bases de Datos & Herramientas", en: "Data & Tooling" },
    code: "DOMINIO: DATA & TOOLS",
    items: [
      {
        name: "PostgreSQL & SQLite",
        level: { es: "Competente", en: "Proficient" },
        desc: {
          es: "Modelado relacional normalizado, integridad referencial, índices y optimización de consultas.",
          en: "Normalized relational modeling, referential integrity, indexes and query optimization.",
        },
      },
      {
        name: "MongoDB & NoSQL",
        level: { es: "Nivel Sólido", en: "Solid" },
        desc: {
          es: "Colecciones documentales dinámicas y agregaciones para esquemas de datos flexibles.",
          en: "Dynamic document collections and aggregations for flexible data structures.",
        },
      },
      {
        name: "Git, GitHub & Docker",
        level: { es: "Competente", en: "Proficient" },
        desc: {
          es: "Flujos de trabajo colaborativos (Git Flow), pull requests y contenedorización de servicios.",
          en: "Collaborative Git workflows, pull requests and service containerization.",
        },
      },
    ],
  },
];

export default function SkillsSection() {
  const { lang, t } = usePrefs();

  return (
    <section id="habilidades" className="py-20 px-4 sm:px-6 max-w-5xl mx-auto border-t border-border">
      {/* Header */}
      <div className="mb-10">
        <span className="section-label">03 // CAPACIDAD TÉCNICA</span>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text mb-3">
          {lang === "es" ? "Competencias y Tecnologías" : "Technical Skills & Stack"}
        </h2>
        <p className="text-text-muted max-w-2xl text-base">
          {lang === "es"
            ? "Evaluación cualitativa de las herramientas con las que resuelvo problemas reales en producción, sin porcentajes subjetivos."
            : "Qualitative assessment of the technologies used to solve real production challenges, without arbitrary percentages."}
        </p>
      </div>

      {/* Grid of Domains */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SKILL_DOMAINS.map((domainBlock, i) => (
          <div key={i} className="rounded-2xl border border-border bg-surface shadow-sm p-5 sm:p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-border">
                <h3 className="font-bold text-base text-text">{t(domainBlock.domain)}</h3>
                <span className="font-mono text-[10.5px] text-accent tracking-wider font-semibold">
                  {domainBlock.code}
                </span>
              </div>

              <div className="space-y-4">
                {domainBlock.items.map((item, j) => (
                  <div key={j} className="text-sm">
                    <div className="flex items-baseline justify-between gap-2 mb-1">
                      <span className="font-semibold text-text">{item.name}</span>
                      <span className="font-mono text-[11px] text-text-subtle uppercase">
                        {t(item.level)}
                      </span>
                    </div>
                    <p className="text-xs text-text-muted leading-relaxed">{t(item.desc)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
