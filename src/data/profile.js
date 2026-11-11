/**
 * ─────────────────────────────────────────────────────────────
 *  TU INFORMACIÓN PERSONAL
 *  Todo lo que aparece en el portafolio sale de /src/data.
 *  Los textos van en { es: "...", en: "..." } para el cambio de idioma.
 * ─────────────────────────────────────────────────────────────
 */

export const profile = {
  name: "Marc Amador",
  handle: "marcamador",
  email: "contacto@marcamador.dev",
  location: { es: "Remoto · Disponible a nivel global", en: "Remote · Worldwide" },
  photo: "/avatar.jpg",
  role: {
    es: "Desarrollador de Software",
    en: "Software Developer",
  },
  tagline: {
    es: "Construyo software veloz, interfaces claras y sistemas que no fallan.",
    en: "Building fast software, clean interfaces, and resilient backend systems.",
  },
  availability: {
    es: "Disponible para proyectos y empleo",
    en: "Open to projects & full-time roles",
  },
  bio: {
    es: [
      "Hola, soy Marc Amador. Desarrollador de software enfocado en construir herramientas prácticas que la gente disfrute utilizar en el día a día.",
      "Mi trabajo abarca desde la concepción de interfaces intuitivas y reactivas en la web, hasta el modelado de servicios backend robustos y aplicaciones móviles fluidas.",
      "Priorizo el código legible, la arquitectura desacoplada y las pruebas automatizadas. Prefiero soluciones elegantes y directas antes que complejidad innecesaria.",
    ],
    en: [
      "Hi, I'm Marc Amador. A software developer focused on building practical, high-performance applications that people genuinely enjoy using.",
      "My work spans intuitive web interfaces, reliable backend services, and native mobile apps designed for real-world usage.",
      "I value clean architecture, automated testing, and thoughtful design over artificial complexity.",
    ],
  },
  facts: [
    { k: { es: "Enfoque", en: "Core focus" }, v: "Web · Java · Móvil" },
    { k: { es: "Demos en vivo", en: "Live demos" }, v: "3 interactivas" },
    { k: { es: "Stack principal", en: "Primary stack" }, v: "React · Java 21 · Kotlin" },
  ],
  socials: [
    { label: "GitHub", url: "https://github.com/MarcAmador" },
    { label: "LinkedIn", url: "https://linkedin.com/in/marcamador" },
  ],
};

export const skills = [
  {
    group: { es: "Web", en: "Web" },
    items: [
      { name: "JavaScript" },
      { name: "React" },
      { name: "Next.js" },
      { name: "Node + Express" },
      { name: "HTML & CSS" },
      { name: "Tailwind" },
    ],
  },
  {
    group: { es: "Java y escritorio", en: "Java & desktop" },
    items: [
      { name: "Java" },
      { name: "Spring Boot" },
      { name: "JavaFX / Swing" },
      { name: "JUnit" },
    ],
  },
  {
    group: { es: "Móvil", en: "Mobile" },
    items: [
      { name: "Kotlin" },
      { name: "Jetpack Compose" },
      { name: "Android SDK" },
      { name: "Room · Retrofit" },
    ],
  },
  {
    group: { es: "Datos y herramientas", en: "Data & tooling" },
    items: [
      { name: "SQL · PostgreSQL" },
      { name: "MongoDB" },
      { name: "Python" },
      { name: "Git · GitHub" },
      { name: "Docker" },
      { name: "Figma" },
    ],
  },
];

export const experience = [
  {
    type: "work",
    period: "2024 — " ,
    periodEnd: { es: "Actualidad", en: "Present" },
    title: { es: "Desarrollador full stack", en: "Full stack developer" },
    org: "Estudio Cometa",
    desc: {
      es: "Lidero el front de una plataforma de reservas usada por 40 mil personas al mes. Reduje el tiempo de carga un 52% y migré el panel interno a Next.js.",
      en: "I lead the front end of a booking platform used by 40k people a month. Cut load time by 52% and migrated the internal dashboard to Next.js.",
    },
    tags: ["React", "Next.js", "Node", "PostgreSQL"],
  },
  {
    type: "work",
    period: "2022 — 2024",
    title: { es: "Desarrollador Android", en: "Android developer" },
    org: "Banqo Fintech",
    desc: {
      es: "Mantuve la app móvil (Kotlin + Compose) con 200 mil descargas. Implementé pagos con QR y modo sin conexión.",
      en: "Maintained the mobile app (Kotlin + Compose) with 200k downloads. Built QR payments and offline mode.",
    },
    tags: ["Kotlin", "Compose", "Room"],
  },
  {
    type: "work",
    period: "2021 — 2022",
    title: { es: "Desarrollador Java junior", en: "Junior Java developer" },
    org: "Logística Norte",
    desc: {
      es: "Escribí servicios internos en Java y Spring para seguimiento de envíos, con pruebas automatizadas.",
      en: "Wrote internal Java/Spring services for shipment tracking, with automated tests.",
    },
    tags: ["Java", "Spring", "JUnit"],
  },
  {
    type: "edu",
    period: "2017 — 2021",
    title: { es: "Ingeniería en Sistemas Computacionales", en: "B.Sc. Computer Systems Engineering" },
    org: "Universidad Nacional",
    desc: {
      es: "Promedio 9.4. Tesis sobre accesibilidad en aplicaciones móviles. Capitán del equipo de programación competitiva.",
      en: "GPA 9.4. Thesis on accessibility in mobile apps. Captain of the competitive programming team.",
    },
    tags: [],
  },
  {
    type: "edu",
    period: "2023",
    title: { es: "Certificación Associate Android Developer", en: "Associate Android Developer certification" },
    org: "Google",
    desc: { es: "Certificación oficial de desarrollo Android.", en: "Official Android development certification." },
    tags: [],
  },
];
