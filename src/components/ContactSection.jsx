"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Send, CheckCircle2, AlertCircle, Copy, Check, MessageSquare, Clock, Sparkles } from "lucide-react";
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
    { id: "web", es: "Proyecto Web & React", en: "Web & React Project" },
    { id: "java", es: "Arquitectura Java", en: "Java Architecture" },
    { id: "android", es: "App Android", en: "Android App" },
    { id: "role", es: "Oportunidad Laboral", en: "Job Opportunity" },
    { id: "other", es: "Otro asunto", en: "Other" },
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
        body: JSON.stringify({
          ...formData,
          topic,
        }),
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
    <section id="contacto" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto border-t border-[var(--border-subtle)]">
      {/* Header */}
      <div className="mb-14">
        <div className="flex items-center gap-2 mb-2 font-mono text-xs text-[var(--accent-cyan)] uppercase tracking-wider">
          <MessageSquare size={14} />
          <span>Contacto Directo</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-main)] mb-4">
          {lang === "es" ? "Iniciemos una Conversación" : "Let's Build Something Together"}
        </h2>
        <p className="text-[var(--text-muted)] max-w-2xl text-base leading-relaxed">
          {lang === "es"
            ? "¿Tienes una propuesta técnica, un proyecto en mente o una vacante para tu equipo? Escríbeme y responderé con gusto."
            : "Have an architectural challenge, a product idea, or an engineering role on your team? Drop me a message and let's talk."}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Direct channels and availability (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Card: Direct Email */}
          <div className="p-6 rounded-2xl glass-panel border border-[var(--border-subtle)] shadow-xl space-y-4 hover-glow">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--accent-cyan)]/15 border border-[var(--accent-cyan)]/30 flex items-center justify-center text-[var(--accent-cyan)]">
                <Mail size={18} />
              </div>
              <div>
                <h3 className="font-bold text-base text-[var(--text-main)]">
                  {lang === "es" ? "Correo Electrónico" : "Direct Email"}
                </h3>
                <p className="text-xs text-[var(--text-dim)]">
                  {lang === "es" ? "Bandeja principal" : "Primary inbox"}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-[var(--bg-base)] border border-[var(--border-subtle)]">
              <a
                href={`mailto:${profile.email}`}
                className="font-mono text-xs text-[var(--text-main)] hover:text-[var(--accent-cyan)] truncate transition-colors"
              >
                {profile.email}
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface-elevated)] transition-all cursor-pointer flex items-center gap-1 text-xs font-mono"
                title="Copiar dirección"
              >
                {copied ? (
                  <>
                    <Check size={14} className="text-[var(--accent-mint)]" />
                    <span className="text-[var(--accent-mint)] text-[11px]">Copiado</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span className="text-[11px]">Copiar</span>
                  </>
                )}
              </button>
            </div>

            <div className="pt-2 text-xs text-[var(--text-muted)] flex items-center gap-2 font-mono">
              <Clock size={13} className="text-[var(--accent-amber)]" />
              <span>{lang === "es" ? "Tiempo de respuesta: < 24 horas" : "Response time: < 24 hours"}</span>
            </div>
          </div>

          {/* Card: Social Networks */}
          <div className="p-6 rounded-2xl glass-panel border border-[var(--border-subtle)] shadow-xl space-y-3">
            <h4 className="font-bold text-sm text-[var(--text-main)]">
              {lang === "es" ? "Perfiles y Redes Profesionales" : "Professional Profiles"}
            </h4>

            <div className="grid grid-cols-2 gap-3">
              <a
                href="https://github.com/MarcAmador"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-[var(--bg-base)] border border-[var(--border-subtle)] hover:border-[var(--accent-cyan)]/50 hover:bg-[var(--bg-surface-elevated)] transition-all flex items-center gap-2.5 text-xs font-mono text-[var(--text-main)]"
              >
                <GithubIcon size={16} />
                <span>GitHub</span>
              </a>

              <a
                href="https://linkedin.com/in/marcamador"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-[var(--bg-base)] border border-[var(--border-subtle)] hover:border-[var(--accent-cyan)]/50 hover:bg-[var(--bg-surface-elevated)] transition-all flex items-center gap-2.5 text-xs font-mono text-[var(--text-main)]"
              >
                <LinkedinIcon size={16} />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Contact Form (7 cols) */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 rounded-2xl glass-panel-elevated border border-[var(--border-strong)] shadow-2xl">
            <AnimatePresence mode="wait">
              {status === "ok" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="py-12 text-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-[var(--accent-mint)]/15 border border-[var(--accent-mint)]/30 mx-auto flex items-center justify-center text-[var(--accent-mint)]">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--text-main)]">
                    {lang === "es" ? "¡Mensaje Enviado con Éxito!" : "Message Sent Successfully!"}
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] max-w-md mx-auto leading-relaxed">
                    {lang === "es"
                      ? "Gracias por escribir. He recibido tu mensaje y me pondré en contacto contigo lo más pronto posible."
                      : "Thank you for reaching out. I've received your inquiry and will get back to you shortly."}
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-4 px-5 py-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-strong)] text-xs font-mono text-[var(--text-main)] hover:border-[var(--accent-cyan)] transition-colors"
                  >
                    {lang === "es" ? "Enviar otro mensaje" : "Send another message"}
                  </button>
                </motion.div>
              ) : (
                <form key="form" onSubmit={onSubmit} className="space-y-5" noValidate>
                  {/* Topic Selector Pills */}
                  <div>
                    <label className="block text-xs font-mono text-[var(--text-dim)] uppercase tracking-wider mb-2">
                      {lang === "es" ? "¿Cuál es el motivo de tu mensaje?" : "What is this regarding?"}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {topics.map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setTopic(t.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                            topic === t.id
                              ? "bg-[var(--accent-cyan)] text-[#090d16] font-bold shadow-sm"
                              : "bg-[var(--bg-base)] text-[var(--text-muted)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)]"
                          }`}
                        >
                          {t[lang]}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name and Email Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-[var(--text-dim)] uppercase tracking-wider mb-1.5">
                        {lang === "es" ? "Tu Nombre" : "Your Name"}{" "}
                        <span className="text-[var(--accent-rose)]">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={lang === "es" ? "Ej. Carlos Ruiz" : "e.g. John Doe"}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-base)] border border-[var(--border-subtle)] focus:border-[var(--accent-cyan)] text-[var(--text-main)] placeholder-[var(--text-dim)] focus:outline-none text-sm transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[var(--text-dim)] uppercase tracking-wider mb-1.5">
                        {lang === "es" ? "Correo de Contacto" : "Your Email"}{" "}
                        <span className="text-[var(--accent-rose)]">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder={lang === "es" ? "tu@empresa.com" : "you@company.com"}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-base)] border border-[var(--border-subtle)] focus:border-[var(--accent-cyan)] text-[var(--text-main)] placeholder-[var(--text-dim)] focus:outline-none text-sm transition-colors"
                      />
                    </div>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label className="block text-xs font-mono text-[var(--text-dim)] uppercase tracking-wider mb-1.5">
                      {lang === "es" ? "Mensaje o Descripción del Proyecto" : "Message or Project Details"}{" "}
                      <span className="text-[var(--accent-rose)]">*</span>
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={
                        lang === "es"
                          ? "Cuéntame sobre las metas, la arquitectura o el alcance de lo que necesitas..."
                          : "Tell me about the goals, timeline, or scope of your project..."
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-base)] border border-[var(--border-subtle)] focus:border-[var(--accent-cyan)] text-[var(--text-main)] placeholder-[var(--text-dim)] focus:outline-none text-sm transition-colors resize-y min-h-[110px]"
                    />
                  </div>

                  {/* Feedback warnings */}
                  {status === "invalid" && (
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono flex items-center gap-2">
                      <AlertCircle size={14} />
                      <span>{lang === "es" ? "Por favor completa todos los campos requeridos." : "Please fill out all required fields."}</span>
                    </div>
                  )}

                  {status === "error" && (
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono flex items-center gap-2">
                      <AlertCircle size={14} />
                      <span>
                        {lang === "es"
                          ? `No se pudo enviar el mensaje directamente. Escríbeme a ${profile.email}.`
                          : `Failed to deliver message. Please email me at ${profile.email}.`}
                      </span>
                    </div>
                  )}

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[var(--accent-cyan)] text-[#090d16] font-bold text-sm shadow-lg shadow-[var(--glow-cyan)] hover:opacity-95 transition-all active:scale-[0.98] cursor-pointer disabled:opacity-50"
                  >
                    <Send size={15} />
                    <span>
                      {status === "sending"
                        ? lang === "es"
                          ? "Enviando mensaje..."
                          : "Sending..."
                        : lang === "es"
                        ? "Enviar mensaje"
                        : "Send message"}
                    </span>
                  </button>
                </form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
