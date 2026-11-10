/**
 * PROYECTOS (contenido de ejemplo — reemplázalo por los tuyos)
 *
 * kind:  "web" | "java" | "android" | "python"   → se usa para los filtros
 * demo:  "java" | "android" | null     → abre la demo interactiva
 */

export const KINDS = {
  web: { es: "Web", en: "Web" },
  java: { es: "Java", en: "Java" },
  android: { es: "Android", en: "Android" },
  python: { es: "Python", en: "Python" },
};

export const projects = [
  {
    slug: "mercadito",
    title: "Mercadito",
    year: 2025,
    kind: "web",
    demo: null,
    stack: ["JavaScript", "React", "Express", "MongoDB", "Stripe"],
    summary: {
      es: "Marketplace para productores locales con pagos y panel de vendedores.",
      en: "Marketplace for local producers with payments and a seller dashboard.",
    },
    description: {
      es: "Una tienda en línea donde pequeños productores publican sus artículos y cobran sin intermediarios. Incluye carrito persistente, pagos con Stripe, panel de ventas en tiempo real y búsqueda con filtros.",
      en: "An online shop where small producers list items and get paid with no middlemen. Includes persistent cart, Stripe payments, a real-time sales dashboard and filtered search.",
    },
    highlights: {
      es: ["120 vendedores activos en el primer trimestre", "API REST con Express y autenticación JWT", "Carga inicial de 1.1 s en 4G gracias a división de código"],
      en: ["120 active sellers in the first quarter", "REST API with Express and JWT auth", "1.1 s first load on 4G thanks to code splitting"],
    },
    links: { repo: "https://github.com/", live: "https://example.com" },
  },
  {
    slug: "pixel-forge",
    title: "Pixel Forge",
    year: 2025,
    kind: "web",
    demo: null,
    stack: ["JavaScript", "React", "Canvas"],
    summary: {
      es: "Editor de pixel art en el navegador, con paleta, relleno y exportación a PNG.",
      en: "Pixel art editor in the browser, with palette, fill and PNG export.",
    },
    description: {
      es: "Editor de pixel art con paleta, borrador, relleno y exportación a PNG. Todo corre en el cliente sin dependencias de dibujo: solo React y un canvas.",
      en: "Pixel art editor with palette, eraser, fill and PNG export. It all runs on the client with no drawing libraries: just React and a canvas.",
    },
    highlights: {
      es: ["Deshacer ilimitado con pila de estados", "Exporta PNG a cualquier escala", "Funciona con táctil y ratón"],
      en: ["Unlimited undo with a state stack", "Exports PNG at any scale", "Works with touch and mouse"],
    },
    links: { repo: "https://github.com/", live: "https://example.com" },
  },
  {
    slug: "turnoya",
    title: "TurnoYa",
    year: 2024,
    kind: "web",
    demo: null,
    stack: ["Next.js", "Node", "PostgreSQL", "Tailwind"],
    summary: {
      es: "Sistema de citas para clínicas, con recordatorios automáticos.",
      en: "Appointment system for clinics, with automatic reminders.",
    },
    description: {
      es: "Plataforma de reservas para clínicas pequeñas. Los pacientes agendan en 3 toques, y el sistema envía recordatorios por correo y WhatsApp. Reduje las citas perdidas un 38%.",
      en: "Booking platform for small clinics. Patients book in 3 taps and the system sends email and WhatsApp reminders. Missed appointments dropped 38%.",
    },
    highlights: {
      es: ["Calendario con disponibilidad por doctor", "Recordatorios programados con cron", "Panel administrativo con exportación a CSV"],
      en: ["Per-doctor availability calendar", "Scheduled reminders via cron", "Admin dashboard with CSV export"],
    },
    links: { repo: "https://github.com/", live: "https://example.com" },
  },
  {
    slug: "biblioteca-central",
    title: "Biblioteca Central",
    year: 2023,
    kind: "java",
    demo: "java",
    stack: ["Java 21", "SQLite", "JUnit", "Maven"],
    summary: {
      es: "Gestor de biblioteca por consola con préstamos y multas.",
      en: "Console library manager with loans and fines.",
    },
    description: {
      es: "Aplicación de consola para administrar libros, socios y préstamos. Arquitectura por capas (modelo, repositorio, servicio) con persistencia en SQLite y cobertura de pruebas del 85%.",
      en: "Console app to manage books, members and loans. Layered architecture (model, repository, service) with SQLite persistence and 85% test coverage.",
    },
    highlights: {
      es: ["Patrón repositorio y principios SOLID", "85% de cobertura con JUnit 5", "Cálculo automático de multas por retraso"],
      en: ["Repository pattern and SOLID principles", "85% coverage with JUnit 5", "Automatic late-fee calculation"],
    },
    links: { repo: "https://github.com/" },
  },
  {
    slug: "dungeon-swing",
    title: "Dungeon Swing",
    year: 2022,
    kind: "java",
    demo: null,
    stack: ["Java", "Swing", "Java 2D"],
    summary: {
      es: "Videojuego roguelike de escritorio hecho con Swing puro.",
      en: "Desktop roguelike game made with plain Swing.",
    },
    description: {
      es: "Un roguelike por turnos con mazmorras generadas proceduralmente, inventario y enemigos con IA simple. Hecho sin motores, solo Java 2D y mucho cariño.",
      en: "A turn-based roguelike with procedurally generated dungeons, inventory and simple-AI enemies. No engines, just Java 2D and lots of love.",
    },
    highlights: {
      es: ["Generación procedural con BSP", "Búsqueda A* para los enemigos", "Distribuido como .jar ejecutable"],
      en: ["BSP procedural generation", "A* pathfinding for enemies", "Shipped as an executable .jar"],
    },
    links: { repo: "https://github.com/" },
  },
  {
    slug: "habitnest",
    title: "HabitNest",
    year: 2025,
    kind: "android",
    demo: "android",
    stack: ["Kotlin", "Jetpack Compose", "Room", "Hilt"],
    summary: {
      es: "App de hábitos con rachas y recordatorios. Prueba la réplica.",
      en: "Habit tracker with streaks and reminders. Try the replica.",
    },
    description: {
      es: "App Android nativa para construir hábitos. Rachas, estadísticas semanales y recordatorios inteligentes. Todo guardado en el dispositivo con Room, interfaz 100% Jetpack Compose y soporte para tema oscuro.",
      en: "Native Android app for building habits. Streaks, weekly stats and smart reminders. Stored on-device with Room, 100% Jetpack Compose UI and dark theme support.",
    },
    highlights: {
      es: ["Arquitectura MVVM con Hilt", "Widgets de pantalla de inicio", "Más de 5,000 descargas en Play Store"],
      en: ["MVVM architecture with Hilt", "Home screen widgets", "5,000+ downloads on Play Store"],
    },
    links: { repo: "https://github.com/", apk: "https://example.com/habitnest.apk" },
  },
  {
    slug: "clima-local",
    title: "Clima Local",
    year: 2023,
    kind: "android",
    demo: null,
    stack: ["Java", "Android SDK", "Retrofit", "OpenWeather"],
    summary: {
      es: "Clima por geolocalización con widget y modo sin conexión.",
      en: "Geolocated weather with widget and offline mode.",
    },
    description: {
      es: "Mi primera app publicada. Muestra el clima actual y el pronóstico a 5 días según tu ubicación, con caché local para funcionar sin conexión.",
      en: "My first published app. Shows current weather and a 5-day forecast based on your location, with local cache to work offline.",
    },
    highlights: {
      es: ["Consumo de API REST con Retrofit", "Caché con SQLite", "Widget de 2x2 en pantalla de inicio"],
      en: ["REST API consumption with Retrofit", "SQLite caching", "2x2 home screen widget"],
    },
    links: { repo: "https://github.com/", apk: "https://example.com/clima.apk" },
  },
  {
    slug: "datalens",
    title: "DataLens",
    year: 2024,
    kind: "python",
    demo: null,
    stack: ["Python", "Pandas", "BeautifulSoup", "Matplotlib"],
    summary: {
      es: "Scraper y análisis de precios de vivienda con reportes automáticos.",
      en: "Housing price scraper and analysis with automatic reports.",
    },
    description: {
      es: "Pipeline que recolecta anuncios de vivienda, limpia los datos, detecta oportunidades por zona y genera un reporte PDF semanal.",
      en: "Pipeline that collects housing listings, cleans the data, spots opportunities by area and generates a weekly PDF report.",
    },
    highlights: {
      es: ["Más de 80 mil anuncios procesados", "Detección de valores atípicos", "Reporte PDF programado"],
      en: ["80k+ listings processed", "Outlier detection", "Scheduled PDF report"],
    },
    links: { repo: "https://github.com/" },
  },
];

export const getProject = (slug) => projects.find((p) => p.slug === slug);
