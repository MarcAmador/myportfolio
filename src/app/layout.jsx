import "@fontsource-variable/hanken-grotesk";
import "@fontsource-variable/jetbrains-mono";
import "@fontsource/instrument-serif/400.css";
import "./globals.css";
import { PrefsProvider } from "@/context/PrefsContext";
import { profile } from "@/data/profile";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${profile.name} — ${profile.role.es}`,
    template: `%s · ${profile.name}`,
  },
  description: `${profile.tagline.es} Portafolio de ${profile.name}: proyectos web, Java y Android con demos interactivas.`,
  openGraph: {
    title: `${profile.name} — ${profile.role.es}`,
    description: profile.tagline.es,
    type: "website",
    images: [{ url: profile.photo }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport = {
  themeColor: "#0e1114",
};

// Aplica el tema guardado antes de pintar para evitar parpadeos. Por defecto: oscuro.
const themeInit = `(function(){try{document.documentElement.dataset.theme=localStorage.getItem('theme')||'dark'}catch(e){}})()`;

export default function RootLayout({ children }) {
  return (
    <html lang="es" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>
        <PrefsProvider>{children}</PrefsProvider>
      </body>
    </html>
  );
}
