import "@fontsource-variable/hanken-grotesk";
import "@fontsource-variable/jetbrains-mono";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
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
  themeColor: "#f1e8d2",
};

// Aplica el tema guardado (o el del sistema) antes de pintar, para evitar parpadeos
const themeInit = `(function(){try{var t=localStorage.getItem('theme');if(!t){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.dataset.theme=t}catch(e){}})()`;

export default function RootLayout({ children }) {
  return (
    <html lang="es" data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>
        <PrefsProvider>{children}</PrefsProvider>
      </body>
    </html>
  );
}
