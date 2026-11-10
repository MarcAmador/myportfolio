"use client";

import { useState } from "react";
import { Mail, Send, CheckCircle2, AlertCircle, Copy, Check } from "lucide-react";
import { usePrefs } from "@/context/PrefsContext";
import { profile } from "@/data/profile";

export default function ContactSection() {
  const { lang, ui } = usePrefs();
  const [status, setStatus] = useState("idle"); // idle | sending | ok | error | invalid
  const [messageText, setMessageText] = useState("");
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.status === 400) return setStatus("invalid");
      if (!res.ok) throw new Error("fail");
      setStatus("ok");
      form.reset();
      setMessageText("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contacto" className="py-20 px-4 sm:px-6 max-w-5xl mx-auto border-t border-border">
      {/* Header */}
      <div className="mb-12">
        <span className="section-label">06 // COMUNICACIÓN DIRECTA</span>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text mb-3">
          {lang === "es" ? "Iniciemos una conversación" : "Let's Get in Touch"}
        </h2>
        <p className="text-text-muted max-w-2xl text-base">
          {lang === "es"
            ? "¿Tienes una vacante, un proyecto o una propuesta técnica? Escríbeme y conversemos."
            : "Have an open role, an exciting project, or a technical inquiry? Drop a line and let's talk."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Direct info (5 cols) */}
        <div className="md:col-span-5 space-y-6">
          <div className="rounded-2xl border border-border bg-surface shadow-sm p-6">
            <h3 className="font-bold text-base text-text mb-2">
              {lang === "es" ? "Respuesta garantizada" : "Prompt response"}
            </h3>
            <p className="text-xs text-text-muted leading-relaxed mb-5">
              {lang === "es"
                ? "Reviso mis mensajes a diario y suelo responder en menos de 24 horas hábiles."
                : "I check messages daily and usually respond within 24 business hours."}
            </p>

            <div className="pt-4 border-t border-border">
              <span className="text-[11px] font-mono text-text-subtle uppercase block mb-1">
                {lang === "es" ? "CORREO ELECTRÓNICO DIRECTO" : "DIRECT EMAIL"}
              </span>
              <div className="flex items-center justify-between gap-2 p-2 rounded-lg bg-surface-hover border border-border">
                <a
                  href={`mailto:${profile.email}`}
                  className="font-mono text-xs text-text hover:text-accent truncate transition-colors"
                >
                  {profile.email}
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  aria-label="Copiar correo"
                  className="p-1 rounded text-text-muted hover:text-text hover:bg-surface transition-colors"
                >
                  {copied ? <Check size={14} className="text-accent" /> : <Copy size={14} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Form (7 cols) */}
        <div className="md:col-span-7 card-swiss p-6 sm:p-8">
          <form onSubmit={onSubmit} className="space-y-4" noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono font-medium text-text-muted mb-1.5 uppercase">
                  {lang === "es" ? "Nombre completo" : "Your Name"}{" "}
                  <span className="text-accent">*</span>
                </label>
                <input
                  name="name"
                  required
                  placeholder={lang === "es" ? "Alex Rivera" : "Jane Doe"}
                  className="input-swiss"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-medium text-text-muted mb-1.5 uppercase">
                  {lang === "es" ? "Correo electrónico" : "Your Email"}{" "}
                  <span className="text-accent">*</span>
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="tu.correo@empresa.com"
                  className="input-swiss"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5 font-mono text-xs text-text-muted">
                <label className="uppercase font-medium">
                  {lang === "es" ? "Propuesta / Mensaje" : "Message / Proposal"}{" "}
                  <span className="text-accent">*</span>
                </label>
                <span className="text-[11px] text-text-subtle">
                  {messageText.length} / 3000
                </span>
              </div>
              <textarea
                name="message"
                required
                rows={4}
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder={
                  lang === "es"
                    ? "Cuéntame sobre el proyecto, requerimiento o vacante..."
                    : "Tell me about your project, role, or proposal..."
                }
                className="input-swiss resize-y min-h-[110px]"
              />
            </div>

            {/* Anti-spam honeypot */}
            <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-accent text-accent-fg shadow-sm hover:opacity-90 transition-all cursor-pointer disabled:opacity-50 w-full sm:w-auto"
              >
                <Send size={14} />
                <span>
                  {status === "sending"
                    ? lang === "es"
                      ? "Enviando mensaje..."
                      : "Sending message..."
                    : lang === "es"
                    ? "Enviar Mensaje"
                    : "Send Message"}
                </span>
              </button>

              <div role="status" aria-live="polite" className="text-xs">
                {status === "ok" && (
                  <span className="inline-flex items-center gap-1.5 text-accent font-medium">
                    <CheckCircle2 size={15} />
                    <span>{lang === "es" ? "¡Mensaje recibido con éxito!" : "Message received successfully!"}</span>
                  </span>
                )}
                {(status === "error" || status === "invalid") && (
                  <span className="inline-flex items-center gap-1.5 text-red-500 font-medium">
                    <AlertCircle size={15} />
                    <span>
                      {status === "invalid"
                        ? lang === "es"
                          ? "Verifica tu correo y mensaje (mínimo 10 caracteres)."
                          : "Please check your email and message (min 10 chars)."
                        : lang === "es"
                        ? "Hubo un problema. Intenta escribir directo a mi correo."
                        : "Something went wrong. Please email directly."}
                    </span>
                  </span>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
