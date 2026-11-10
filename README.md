# Portafolio · Papel & Tinta

Portafolio en forma de **escritorio de sistema operativo** (ventanas arrastrables, dock, barra de menú) con estética de impresión riso: papel crema, tinta casi negra y tres tintas planas. Hecho con **Next.js (App Router) + JavaScript + Tailwind v4 + Framer Motion**.

## Arrancar

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # comprobar que todo compila
npm run start    # servir la versión de producción
```

## Dónde editar TU contenido

| Qué                                   | Archivo                                           |
| ------------------------------------- | ------------------------------------------------- |
| Nombre, bio, redes, skills, trayectoria | `src/data/profile.js`                             |
| Proyectos (filtros, fichas, enlaces)  | `src/data/projects.js`                            |
| Textos de la interfaz ES/EN           | `src/data/ui.js`                                  |
| Colores, tipografías, sombras         | `src/app/globals.css` (variables al inicio)       |
| Foto                                  | reemplaza `public/avatar.jpg`                     |
| Apps del escritorio (ícono/tamaño)    | `src/data/apps.js`                                |

Todo texto bilingüe va como `{ es: "...", en: "..." }`.

## Cómo está organizado

```
src/
├─ app/
│  ├─ page.js                    → el escritorio (home)
│  ├─ projects/[slug]/page.js    → página completa de cada proyecto (SEO)
│  ├─ cv/page.js                 → CV imprimible (Guardar como PDF)
│  ├─ api/contact/route.js       → backend del formulario (validación)
│  └─ globals.css                → sistema de diseño
├─ context/
│  ├─ PrefsContext.js            → idioma + tema
│  └─ WindowContext.js           → abrir/cerrar/minimizar/enfocar ventanas
├─ components/
│  ├─ os/                        → MenuBar, Dock, Window, Hero, Desktop
│  ├─ apps/                      → contenido de cada ventana
│  ├─ demos/                     → PixelForge, JavaTerminal, AndroidPhone
│  ├─ Cover.js                   → portadas generativas
│  └─ ProjectDetail.js           → ficha (ventana y página)
└─ data/                         → TODO el contenido
```

## Añadir un proyecto

1. Copia un objeto en `src/data/projects.js` y cambia `slug`, textos, `kind` (`web | java | android | python`) y `color`.
2. Listo: aparece en el filtro, en la ventana Proyectos y en `/projects/tu-slug`.

## Añadir una demo propia

1. Crea `src/components/demos/MiDemo.js` (un componente React normal).
2. Regístralo en el arreglo `DEMOS` de `src/components/apps/Demos.js`.
3. Pon `demo: "id"` en el proyecto correspondiente.

**Demos reales de Java/Android:** un navegador no ejecuta Java ni APKs. Opciones, de más simple a más compleja:
- Réplica interactiva en React (lo que hay ahora).
- Un vídeo corto: `<video src="/demos/app.mp4" controls muted loop />` dentro del marco de teléfono.
- Enlace de descarga del APK / `.jar` y al repositorio.
- Java ejecutable de verdad: un backend que compile en sandbox (Judge0, Piston) — avanzado.

## Formulario de contacto

`/api/contact` valida y registra en consola. Para recibir correos: instala `resend`, define `RESEND_API_KEY` y descomenta el bloque `ENVÍO` en `src/app/api/contact/route.js` (o usa Formspree/Web3Forms).

## Publicar

1. Sube el repo a GitHub.
2. Importa en **Vercel** (gratis): detecta Next.js solo.
3. Define `NEXT_PUBLIC_SITE_URL=https://tu-dominio.com` y conecta tu dominio.

## CV en PDF

`/cv` genera un currículum imprimible con tus datos (botón «Descargar / imprimir PDF» → *Guardar como PDF*). Si prefieres tu propio PDF, ponlo en `public/cv.pdf` y enlaza ahí desde `src/components/apps/CV.js`.
