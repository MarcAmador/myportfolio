/**
 * ─────────────────────────────────────────────────────────────
 *  TU INFORMACIÓN PERSONAL
 *  Todo lo que aparece en el portafolio sale de /src/data.
 *  Los textos van en { es: "...", en: "..." } para el cambio de idioma.
 * ─────────────────────────────────────────────────────────────
 */

export const profile = {
  name: "Alex Rivera",
  handle: "alexrivera",
  email: "hola@alexrivera.dev",
  location: { es: "Ciudad de México · remoto", en: "Mexico City · remote" },
  photo: "/avatar.jpg", // reemplázala por tu foto en /public
  role: {
    es: "Desarrollador full stack",
    en: "Full stack developer",
  },
  tagline: {
    es: "Construyo cosas para la web, el escritorio y el bolsillo.",
    en: "I build things for the web, the desktop and your pocket.",
  },
  availability: {
    es: "Disponible para proyectos",
    en: "Open to new projects",
  },
  bio: {
    es: [
      "Soy desarrollador de software con 4 años de experiencia creando productos digitales: aplicaciones web con React y Node, herramientas en Java y apps Android nativas con Kotlin.",
      "Me importa el detalle: que una interfaz se sienta bien al tocarla, que el código se pueda leer dentro de seis meses y que lo que entrego resuelva un problema real.",
      "Cuando no estoy programando probablemente estoy imprimiendo en riso, rodando en bici o intentando que mi gato deje de pisar el teclado.",
    ],
    en: [
      "I'm a software developer with 4 years of experience shipping digital products: React and Node web apps, Java tools and native Android apps in Kotlin.",
      "I care about details: an interface should feel good to touch, code should be readable six months from now, and what I ship should solve a real problem.",
      "When I'm not coding I'm probably risograph printing, cycling, or trying to keep my cat off the keyboard.",
    ],
  },
  facts: [
    { k: { es: "Años programando", en: "Years coding" }, v: "6" },
    { k: { es: "Proyectos publicados", en: "Shipped projects" }, v: "24" },
    { k: { es: "Café por día", en: "Coffees a day" }, v: "3" },
  ],
  socials: [
    { label: "GitHub", url: "https://github.com/" },
    { label: "LinkedIn", url: "https://linkedin.com/" },
    { label: "Instagram", url: "https://instagram.com/" },
  ],
};

export const skills = [
  {
    group: { es: "Web", en: "Web" },
    color: "orange",
    items: [
      { name: "JavaScript", level: 5 },
      { name: "React", level: 5 },
      { name: "Next.js", level: 4 },
      { name: "Node + Express", level: 4 },
      { name: "HTML & CSS", level: 5 },
      { name: "Tailwind", level: 4 },
    ],
  },
  {
    group: { es: "Java y escritorio", en: "Java & desktop" },
    color: "blue",
    items: [
      { name: "Java", level: 5 },
      { name: "Spring Boot", level: 3 },
      { name: "JavaFX / Swing", level: 4 },
      { name: "JUnit", level: 4 },
    ],
  },
  {
    group: { es: "Móvil", en: "Mobile" },
    color: "green",
    items: [
      { name: "Kotlin", level: 4 },
      { name: "Jetpack Compose", level: 4 },
      { name: "Android SDK", level: 4 },
      { name: "Room · Retrofit", level: 3 },
    ],
  },
  {
    group: { es: "Datos y herramientas", en: "Data & tooling" },
    color: "yellow",
    items: [
      { name: "SQL · PostgreSQL", level: 4 },
      { name: "MongoDB", level: 3 },
      { name: "Python", level: 3 },
      { name: "Git · GitHub", level: 5 },
      { name: "Docker", level: 3 },
      { name: "Figma", level: 3 },
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
