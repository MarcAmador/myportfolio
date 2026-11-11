/**
 * PROYECTOS PRINCIPALES DE MARC AMADOR
 * Tres proyectos sólidos y reales que cubren Web, Java y Android.
 */

export const KINDS = {
  web: { es: "Web y Full Stack", en: "Web & Full Stack" },
  java: { es: "Java y Backend", en: "Java & Backend" },
  android: { es: "Android Nativo", en: "Native Android" },
};

export const projects = [
  {
    slug: "mercadito",
    title: "Mercadito",
    year: 2025,
    kind: "web",
    demo: null,
    stack: ["React 19", "Next.js", "Express", "MongoDB", "Stripe"],
    summary: {
      es: "Tienda en línea completa: catálogo de productos, carrito persistente en el navegador y pagos procesados con Stripe.",
      en: "Full e-commerce shop: product catalog, browser-persistent cart, and Stripe payment processing.",
    },
    description: {
      es: "Plataforma de comercio electrónico pensada para pequeños comercios locales. Permite navegar productos con filtros rápidos, agregar al carrito con persistencia local y completar compras reales mediante Stripe Checkout. El backend está construido en Express con autenticación segura y base de datos en MongoDB.",
      en: "E-commerce platform designed for local shops. Features instant category filtering, persistent cart state, and real payment checkout with Stripe. The backend is built with Express, JWT authentication, and MongoDB.",
    },
    highlights: {
      es: [
        "Pasarela de pagos funcional integrada con webhooks de Stripe",
        "API REST en Node/Express con autenticación por tokens",
        "Diseño responsivo y carga rápida sin recargar la página",
      ],
      en: [
        "Functional payment gateway integrated with Stripe webhooks",
        "REST API in Node/Express with token authentication",
        "Responsive design and fast transitions without full page reloads",
      ],
    },
    links: { repo: "https://github.com/MarcAmador", live: "https://example.com" },
  },
  {
    slug: "biblioteca-central",
    title: "Biblioteca Central",
    year: 2024,
    kind: "java",
    demo: "java",
    stack: ["Java 21", "SQLite", "JUnit 5", "Maven"],
    summary: {
      es: "Sistema de gestión y préstamos por consola en Java 21. Incluye cálculo de multas, persistencia en SQLite y pruebas unitarias.",
      en: "Console library and loan manager in Java 21 with automatic fines, SQLite storage, and unit tests.",
    },
    description: {
      es: "Aplicación de escritorio y consola orientada a administrar inventarios de libros, registros de socios y control de devoluciones. Aplica arquitectura limpia por capas (Modelo, Repositorio y Servicio) con persistencia en SQLite mediante JDBC y una batería de pruebas automatizadas con JUnit 5.",
      en: "Console application to manage book catalogs, member registrations, and loan tracking. Follows a clean layered architecture (Model, Repository, Service) with SQLite persistence via JDBC and automated JUnit 5 test coverage.",
    },
    highlights: {
      es: [
        "Separación clara de responsabilidades y principios SOLID",
        "Pruebas unitarias con JUnit 5 para validar reglas de negocio",
        "Cálculo automático de días de vencimiento y recargos por demora",
      ],
      en: [
        "Clean separation of concerns adhering to SOLID principles",
        "Unit tests with JUnit 5 covering business rules",
        "Automatic due date tracking and late fee calculation",
      ],
    },
    links: { repo: "https://github.com/MarcAmador" },
  },
  {
    slug: "habitnest",
    title: "HabitNest",
    year: 2025,
    kind: "android",
    demo: "android",
    stack: ["Kotlin", "Jetpack Compose", "Room DB", "MVVM"],
    summary: {
      es: "App nativa de Android para registrar hábitos diarios y rachas. Funciona 100% sin conexión con base de datos Room.",
      en: "Native Android habit tracker with streaks. Works 100% offline with on-device Room database.",
    },
    description: {
      es: "Aplicación móvil desarrollada desde cero con Kotlin y Jetpack Compose. Diseñada para registrar metas diarias con un solo toque, visualizar el progreso semanal y mantener al usuario motivado mediante contadores de rachas. No requiere conexión a internet: todos los datos se guardan de forma local y segura en el dispositivo con Room.",
      en: "Native mobile app built from scratch using Kotlin and Jetpack Compose. Designed to track daily habits with one tap, visualize weekly progress, and keep streaks alive. Fully offline-first with local Room database persistence.",
    },
    highlights: {
      es: [
        "Interfaz declarativa fluida con animaciones nativas en Compose",
        "Arquitectura MVVM con StateFlow para reactividad sin bloqueos",
        "Almacenamiento local rápido con Room y SQLite",
      ],
      en: [
        "Fluid declarative UI with native Compose micro-animations",
        "Clean MVVM architecture with StateFlow for non-blocking UI",
        "Fast local persistence with Room and SQLite",
      ],
    },
    links: { repo: "https://github.com/MarcAmador" },
  },
];

export const getProject = (slug) => projects.find((p) => p.slug === slug);
