"use client";

import { useState } from "react";
import { Send, Check, Copy, CheckCircle2, AlertCircle, MessageSquare, Mail, Sparkles } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import { usePrefs } from "@/context/PrefsContext";
import { profile } from "@/data/profile";

export default function ContactSection() {
  const { lang } = usePrefs();
  const [status, setStatus] = useState("idle"); // idle | sending | ok | error | invalid
  const [topic, setTopic] = useState("web");
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const topics = [
    { id: "web", es: "Proyecto Web o React", en: "Web or React project" },
    { id: "java", es: "Desarrollo en Java", en: "Java development" },
    { id: "android", es: "App Android", en: "Android App" },
    { id: "job", es: "Vacante o Empleo", en: "Job opportunity" },
    { id: "other", es: "Otro asunto", en: "General inquiry" },
  ];

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  async function onSubmit(e) {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus("invalid");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, topic }),
      });

      if (res.status === 400) {
        setStatus("invalid");
        return;
      }
      if (!res.ok) throw new Error("fail");

      setStatus("ok");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contacto" className="py-24 px-4 sm:px-6 max-w-5xl mx-auto border-t border-[var(--border-subtle)] relative">
      {/* Cabecera */}
      <div className="mb-12 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="folded-ribbon folded-ribbon-amber text-[10px] rounded-sm">
            COMUNICACIÓN DIRECTA
          </span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-main)] mb-3">
          {lang === "es" ? "¿Hablamos de un proyecto?" : "Let's Get in Touch"}
        </h2>
        <p className="text-[var(--text-muted)] text-base leading-relaxed">
          {lang === "es"
            ? "Si buscas a alguien para construir una aplicación web, un servicio en Java o una app en Android, escríbeme directamente."
            : "Whether you need someone to build a web application, a Java backend service, or a native Android app, reach out directly."}
        </p>
      </div>

      {/* Contenedor Principal: Nota Interactiva de Contacto con Cintas Plegadas */}
      <div className="relative rounded-3xl glass-panel-elevated bento-asymmetric-1 border-2 border-sky-400/40 p-6 sm:p-10 shadow-2xl overflow-hidden">
        {/* Cinta decorativa superior izquierda */}
        <div className="absolute top-0 left-8">
          <span className="folded-ribbon folded-ribbon-cyan text-[10px] rounded-b-md">
            MENSAJE // MARC AMADOR
          </span>
        </div>

        {/* Canales Directos Rápidos (Barra Superior) */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 pb-6 mb-8 border-b border-[var(--border-subtle)]">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-mono text-[var(--text-dim)]">Correo directo:</span>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[var(--bg-base)] border border-[var(--border-strong)]">
              <a
                href={`mailto:${profile.email}`}
                className="font-mono text-xs font-bold text-[var(--accent-cyan)] hover:underline"
              >
                {profile.email}
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="p-1 rounded-md text-[var(--text-muted)] hover:text-white transition-colors cursor-pointer"
                title="Copiar correo"
              >
                {copied ? <Check size={13} className="text-[var(--accent-mint)]" /> : <Copy size={13} />}
              </button>
            </div>
            {copied && (
              <span className="text-xs font-mono text-[var(--accent-mint)] animate-fade-in">
                {lang === "es" ? "¡Copiado!" : "Copied!"}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-[var(--text-muted)]">
            <a
              href="https://github.com/MarcAmador"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1 rounded-lg bg-[var(--bg-base)] border border-[var(--border-subtle)] hover:text-[var(--accent-cyan)] transition-colors flex items-center gap-1.5"
            >
              <GithubIcon size={14} />
              <span>GitHub</span>
            </a>
            <a
              href="https://linkedin.com/in/marcamador"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1 rounded-lg bg-[var(--bg-base)] border border-[var(--border-subtle)] hover:text-[var(--accent-cyan)] transition-colors flex items-center gap-1.5"
            >
              <LinkedinIcon size={14} />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Formulario / Tarjeta de Envío */}
        {status === "ok" ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-[var(--accent-mint)]/20 border-2 border-[var(--accent-mint)] mx-auto flex items-center justify-center text-[var(--accent-mint)] shadow-lg">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="text-2xl font-bold text-[var(--text-main)]">
              {lang === "es" ? "¡Mensaje enviado!" : "Message Sent!"}
            </h3>
            <p className="text-sm text-[var(--text-muted)] max-w-md mx-auto leading-relaxed">
              {lang === "es"
                ? "He recibido tu mensaje correctamente. Te responderé al correo indicado en menos de 24 horas."
                : "I received your message. I'll get back to you at your provided email within 24 hours."}
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-4 px-4 py-2 rounded-xl bg-[var(--bg-base)] border border-[var(--border-strong)] text-xs font-mono text-[var(--text-main)] hover:border-[var(--accent-cyan)] transition-colors cursor-pointer"
            >
              {lang === "es" ? "Escribir otra nota" : "Send another note"}
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-6" noValidate>
            {/* Selector de tema en píldoras */}
            <div>
              <label className="block text-xs font-mono text-[var(--text-muted)] mb-2 font-semibold">
                {lang === "es" ? "¿Sobre qué te gustaría que hablemos?" : "What would you like to discuss?"}
              </label>
              <div className="flex flex-wrap gap-2">
                {topics.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTopic(t.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                      topic === t.id
                        ? "bg-[var(--accent-amber)] text-[#090d16] font-bold shadow-md"
                        : "bg-[var(--bg-base)] text-[var(--text-muted)] border border-[var(--border-subtle)] hover:text-white hover:border-[var(--border-strong)]"
                    }`}
                  >
                    {t[lang]}
                  </button>
                ))}
              </div>
            </div>

            {/* Campos de Nombre y Correo */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-[var(--text-dim)] uppercase tracking-wider mb-1.5">
                  {lang === "es" ? "Tu Nombre" : "Your Name"}{" "}
                  <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={lang === "es" ? "Ej. Carlos Ruiz" : "e.g. John Doe"}
                  className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-base)] border border-[var(--border-subtle)] focus:border-[var(--accent-cyan)] text-[var(--text-main)] placeholder-[var(--text-dim)] focus:outline-none text-sm transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[var(--text-dim)] uppercase tracking-wider mb-1.5">
                  {lang === "es" ? "Tu Correo Electrónico" : "Your Email"}{" "}
                  <span className="text-amber-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder={lang === "es" ? "carlos@empresa.com" : "john@company.com"}
                  className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-base)] border border-[var(--border-subtle)] focus:border-[var(--accent-cyan)] text-[var(--text-main)] placeholder-[var(--text-dim)] focus:outline-none text-sm transition-colors"
                />
              </div>
            </div>

            {/* Mensaje */}
            <div>
              <label className="block text-xs font-mono text-[var(--text-dim)] uppercase tracking-wider mb-1.5">
                {lang === "es" ? "¿En qué te puedo ayudar?" : "How can I help you?"}{" "}
                <span className="text-amber-400">*</span>
              </label>
              <textarea
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder={
                  lang === "es"
                    ? "Cuéntame de qué se trata el proyecto, la tecnología que planeas usar o cualquier detalle que consideres importante..."
                    : "Tell me about your project, timeline, or any technical requirements..."
                }
                className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-base)] border border-[var(--border-subtle)] focus:border-[var(--accent-cyan)] text-[var(--text-main)] placeholder-[var(--text-dim)] focus:outline-none text-sm transition-colors resize-y min-h-[100px]"
              />
            </div>

            {/* Mensajes de error/validación */}
            {status === "invalid" && (
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono flex items-center gap-2">
                <AlertCircle size={14} />
                <span>{lang === "es" ? "Por favor completa tu nombre, correo y mensaje." : "Please fill out name, email, and message."}</span>
              </div>
            )}

            {status === "error" && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-mono flex items-center gap-2">
                <AlertCircle size={14} />
                <span>
                  {lang === "es"
                    ? `No se pudo entregar la nota automáticamente. Puedes escribirme directo a ${profile.email}.`
                    : `Could not send message automatically. Please email me directly at ${profile.email}.`}
                </span>
              </div>
            )}

            {/* Botón de envío */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <span className="text-xs font-mono text-[var(--text-dim)]">
                {lang === "es" ? "✓ Respuesta habitual en menos de 24 horas" : "✓ Usually replies within 24 hours"}
              </span>

              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[var(--accent-cyan)] text-[#090d16] font-bold text-sm shadow-lg shadow-[var(--glow-cyan)] hover:opacity-95 transition-all active:scale-[0.98] cursor-pointer disabled:opacity-50"
              >
                <Send size={14} />
                <span>
                  {status === "sending"
                    ? lang === "es"
                      ? "Enviando..."
                      : "Sending..."
                    : lang === "es"
                    ? "Enviar mensaje"
                    : "Send message"}
                </span>
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
