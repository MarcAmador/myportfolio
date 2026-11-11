"use client";

import { useState } from "react";
import { Send, Check, Copy, CheckCircle2, AlertCircle, Stamp, Sparkles, MapPin, Clock, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import { usePrefs } from "@/context/PrefsContext";
import { profile } from "@/data/profile";

export default function ContactSection() {
  const { lang } = usePrefs();
  const [status, setStatus] = useState("idle"); // idle | sending | ok | error | invalid
  const [intent, setIntent] = useState("project");
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const intents = [
    { id: "project", es: "✦ Proponer un proyecto", en: "✦ Propose a project" },
    { id: "hire", es: "✦ Oportunidad laboral", en: "✦ Job opportunity" },
    { id: "tech", es: "✦ Consulta técnica", en: "✦ Technical inquiry" },
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
        body: JSON.stringify({ ...formData, topic: intent }),
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
      {/* Patrón de puntos geométrico de fondo */}
      <div className="absolute inset-0 dot-matrix-amber opacity-10 pointer-events-none -z-10" />

      {/* Cabecera */}
      <div className="mb-14 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="origami-ribbon origami-ribbon-amber text-[10px]">
            ESTACIÓN DE DESPACHO DIRECTO
          </span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-main)] mb-3">
          {lang === "es" ? "¿Iniciamos una Conversación?" : "Start a Conversation"}
        </h2>
        <p className="text-[var(--text-muted)] text-base leading-relaxed">
          {lang === "es"
            ? "Escribe un memorándum directo para evaluar un proyecto, colaborar o consultar disponibilidad técnica."
            : "Dispatch a direct note to discuss an upcoming project, discuss an opportunity, or check technical availability."}
        </p>
      </div>

      {/* Estación de Despacho: Tarjeta física estilo Memorándum Postal con banda aérea */}
      <div className="relative rounded-3xl glass-panel-elevated bento-puzzle-l border-2 border-sky-400/50 shadow-2xl overflow-hidden">
        {/* Banda diagonal de correo aéreo clásico (Airmail Strip) */}
        <div className="airmail-strip" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10">
          {/* Columna Izquierda (5 cols): Timbre postal, datos verificados y accesos directos */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              {/* Estampilla Postal Gráfica Interactiva */}
              <div className="postal-stamp mb-6 bg-[var(--bg-base)] border-2 border-dashed border-amber-400/70 p-4 rounded-xl shadow-lg relative overflow-hidden">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-lg bg-[var(--accent-amber)] text-[#090d16] font-extrabold flex items-center justify-center font-mono text-sm shadow-sm">
                      MA
                    </span>
                    <div>
                      <p className="text-xs font-mono font-bold text-[var(--text-main)] uppercase tracking-wider">
                        MARC AMADOR
                      </p>
                      <p className="text-[10px] font-mono text-[var(--accent-amber)]">
                        SELLO OFICIAL ✦ 2026
                      </p>
                    </div>
                  </div>

                  <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-sky-500/20 text-[var(--accent-cyan)] border border-sky-500/30 font-bold uppercase">
                    AIRMAIL
                  </span>
                </div>

                {/* Líneas simuladas de cancelación postal */}
                <div className="mt-3 pt-3 border-t border-dashed border-white/10 font-mono text-[10px] text-[var(--text-dim)] flex items-center justify-between">
                  <span>〰〰 DESPACHO VERIFICADO 〰〰</span>
                  <span className="text-[var(--accent-mint)] font-bold">ACTIVO</span>
                </div>
              </div>

              {/* Botón táctil para copiar correo directo */}
              <div className="space-y-3 font-mono text-xs mb-6">
                <span className="text-[var(--text-dim)] uppercase tracking-wider text-[10px] font-bold block">
                  {lang === "es" ? "Canal de correspondencia:" : "Direct inbox:"}
                </span>

                <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-[var(--bg-base)] border border-[var(--border-strong)] hover:border-[var(--accent-cyan)] transition-colors">
                  <a
                    href={`mailto:${profile.email}`}
                    className="font-bold text-[var(--accent-cyan)] hover:underline truncate"
                  >
                    {profile.email}
                  </a>

                  <button
                    type="button"
                    onClick={copyEmail}
                    className="p-1.5 rounded-lg bg-[var(--bg-surface-elevated)] text-[var(--text-muted)] hover:text-white transition-all cursor-pointer shrink-0"
                    title="Copiar dirección"
                  >
                    {copied ? <Check size={14} className="text-[var(--accent-mint)]" /> : <Copy size={14} />}
                  </button>
                </div>

                {copied && (
                  <p className="text-xs font-mono text-[var(--accent-mint)] flex items-center gap-1.5 animate-fade-in">
                    <CheckCircle2 size={13} />
                    <span>{lang === "es" ? "¡Dirección copiada!" : "Email address copied!"}</span>
                  </p>
                )}
              </div>

              {/* Parámetros de servicio */}
              <div className="space-y-2 text-xs font-mono text-[var(--text-muted)] pt-2 border-t border-[var(--border-subtle)]">
                <div className="flex items-center gap-2">
                  <Clock size={13} className="text-[var(--accent-amber)]" />
                  <span>{lang === "es" ? "Respuesta habitual: < 24 horas" : "Avg response time: < 24 hours"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={13} className="text-[var(--accent-cyan)]" />
                  <span>{lang === "es" ? "Trabajo 100% remoto a nivel global" : "100% remote · Worldwide"}</span>
                </div>
              </div>
            </div>

            {/* Enlaces Sociales en píldoras */}
            <div className="flex items-center gap-2 font-mono text-xs pt-4 border-t border-[var(--border-subtle)]">
              <a
                href="https://github.com/MarcAmador"
                target="_blank"
                rel="noreferrer"
                className="flex-1 px-3 py-2 rounded-xl bg-[var(--bg-base)] border border-[var(--border-subtle)] hover:border-[var(--accent-cyan)] hover:text-[var(--accent-cyan)] transition-colors flex items-center justify-center gap-1.5 text-[var(--text-main)]"
              >
                <GithubIcon size={14} />
                <span>GitHub</span>
              </a>

              <a
                href="https://linkedin.com/in/marcamador"
                target="_blank"
                rel="noreferrer"
                className="flex-1 px-3 py-2 rounded-xl bg-[var(--bg-base)] border border-[var(--border-subtle)] hover:border-[var(--accent-cyan)] hover:text-[var(--accent-cyan)] transition-colors flex items-center justify-center gap-1.5 text-[var(--text-main)]"
              >
                <LinkedinIcon size={14} />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Columna Derecha (7 cols): El Memorándum de Despacho Interactivo */}
          <div className="lg:col-span-7 rounded-2xl bg-[var(--bg-base)] border border-[var(--border-strong)] p-6 sm:p-7 shadow-xl relative">
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-[var(--border-subtle)]">
              <span className="font-mono text-xs font-bold text-[var(--accent-amber)] uppercase tracking-wider flex items-center gap-2">
                <Stamp size={14} />
                <span>{lang === "es" ? "Hoja de Despacho" : "Dispatch Slip"}</span>
              </span>
              <span className="font-mono text-[11px] text-[var(--text-dim)]">
                REF: MA-2026
              </span>
            </div>

            {status === "ok" ? (
              <div className="py-10 text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-[var(--accent-mint)]/20 border-2 border-[var(--accent-mint)] mx-auto flex items-center justify-center text-[var(--accent-mint)] shadow-lg">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-2xl font-bold text-[var(--text-main)]">
                  {lang === "es" ? "¡Memorándum Entregado!" : "Dispatch Note Delivered!"}
                </h3>
                <p className="text-sm text-[var(--text-muted)] max-w-md mx-auto leading-relaxed">
                  {lang === "es"
                    ? "He recibido tu nota correctamente. Te responderé directamente a tu correo en menos de 24 horas laborables."
                    : "I received your note. I'll get back to you at your provided address within 24 business hours."}
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-4 px-5 py-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-strong)] text-xs font-mono text-[var(--text-main)] hover:border-[var(--accent-cyan)] transition-colors cursor-pointer"
                >
                  {lang === "es" ? "Redactar otro mensaje" : "Write another note"}
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-5" noValidate>
                {/* Selector de intención */}
                <div>
                  <label className="block text-xs font-mono text-[var(--text-muted)] mb-2 font-semibold uppercase tracking-wider text-[11px]">
                    {lang === "es" ? "Asunto del despacho:" : "Dispatch topic:"}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {intents.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setIntent(item.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                          intent === item.id
                            ? "bg-[var(--accent-amber)] text-[#090d16] font-bold shadow-md scale-102"
                            : "bg-[var(--bg-surface)] text-[var(--text-muted)] border border-[var(--border-subtle)] hover:text-white hover:border-[var(--border-strong)]"
                        }`}
                      >
                        {item[lang]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Campos de Nombre y Correo */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono text-[var(--text-dim)] uppercase tracking-wider mb-1.5 font-bold">
                      {lang === "es" ? "Remitente / Nombre" : "Sender / Name"}{" "}
                      <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={lang === "es" ? "Ej. Carlos Ruiz" : "e.g. John Doe"}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] focus:border-[var(--accent-cyan)] text-[var(--text-main)] placeholder-[var(--text-dim)] focus:outline-none text-sm transition-colors font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-[var(--text-dim)] uppercase tracking-wider mb-1.5 font-bold">
                      {lang === "es" ? "Correo de Contacto" : "Reply Email"}{" "}
                      <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={lang === "es" ? "carlos@empresa.com" : "john@company.com"}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] focus:border-[var(--accent-cyan)] text-[var(--text-main)] placeholder-[var(--text-dim)] focus:outline-none text-sm transition-colors font-sans"
                    />
                  </div>
                </div>

                {/* Mensaje */}
                <div>
                  <label className="block text-[11px] font-mono text-[var(--text-dim)] uppercase tracking-wider mb-1.5 font-bold">
                    {lang === "es" ? "Especificaciones o Mensaje" : "Message or Specs"}{" "}
                    <span className="text-amber-400">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={
                      lang === "es"
                        ? "Cuéntame los objetivos de tu proyecto, tecnologías que planeas utilizar o detalles sobre los que te gustaría que conversemos..."
                        : "Tell me about your project, timeline, or technical requirements..."
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] focus:border-[var(--accent-cyan)] text-[var(--text-main)] placeholder-[var(--text-dim)] focus:outline-none text-sm transition-colors resize-y min-h-[110px] font-sans"
                  />
                </div>

                {/* Validaciones */}
                {status === "invalid" && (
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono flex items-center gap-2">
                    <AlertCircle size={14} />
                    <span>{lang === "es" ? "Por favor completa tu nombre, correo y mensaje antes de enviar." : "Please fill out name, email, and message."}</span>
                  </div>
                )}

                {status === "error" && (
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-mono flex items-center gap-2">
                    <AlertCircle size={14} />
                    <span>
                      {lang === "es"
                        ? `No se pudo entregar automáticamente. Escríbeme directo a ${profile.email}.`
                        : `Could not send automatically. Please write to ${profile.email}.`}
                    </span>
                  </div>
                )}

                {/* Botón de Timbrado y Despacho */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <span className="text-[11px] font-mono text-[var(--text-dim)]">
                    {lang === "es" ? "✦ Cero spam, respuesta personalizada" : "✦ Zero spam, authentic response"}
                  </span>

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[var(--accent-cyan)] text-[#090d16] font-bold text-sm shadow-lg shadow-[var(--glow-cyan)] hover:opacity-95 transition-all active:scale-95 active:rotate-1 cursor-pointer disabled:opacity-50"
                  >
                    <Send size={14} />
                    <span>
                      {status === "sending"
                        ? lang === "es"
                          ? "Timbrando y enviando..."
                          : "Dispatching..."
                        : lang === "es"
                        ? "Timbrar y Enviar Despacho"
                        : "Seal & Dispatch Note"}
                    </span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
