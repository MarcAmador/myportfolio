"use client";

import { AlertCircle, CheckCircle2, Send } from "lucide-react";
import { useState } from "react";
import { usePrefs } from "@/context/PrefsContext";
import { profile } from "@/data/profile";

export default function Contact() {
  const { ui } = usePrefs();
  const [status, setStatus] = useState("idle"); // idle | sending | ok | error | invalid

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
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="p-7 md:p-10">
      <h2 className="display text-[34px]">{ui("contact.title")}</h2>
      <p className="mb-7 mt-2 max-w-[44ch] text-muted">{ui("contact.sub")}</p>

      <form onSubmit={onSubmit} className="grid gap-4" noValidate>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-1.5 text-sm text-muted">
            {ui("contact.name")}
            <input name="name" required autoComplete="name" className="input" />
          </label>
          <label className="grid gap-1.5 text-sm text-muted">
            {ui("contact.email")}
            <input name="email" type="email" required autoComplete="email" className="input" />
          </label>
        </div>
        <label className="grid gap-1.5 text-sm text-muted">
          {ui("contact.message")}
          <textarea name="message" required rows={5} className="input resize-y" />
        </label>
        {/* Campo trampa anti-spam: las personas no lo ven */}
        <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

        <div className="flex flex-wrap items-center gap-4">
          <button className="btn btn-primary" disabled={status === "sending"}>
            <Send size={15} strokeWidth={1.8} /> {status === "sending" ? ui("contact.sending") : ui("contact.send")}
          </button>
          <p role="status" aria-live="polite" className="flex items-center gap-2 text-sm">
            {status === "ok" && (
              <>
                <CheckCircle2 size={16} className="text-accent" /> {ui("contact.ok")}
              </>
            )}
            {(status === "error" || status === "invalid") && (
              <>
                <AlertCircle size={16} className="text-muted" /> {ui(status === "error" ? "contact.error" : "contact.invalid")}
              </>
            )}
          </p>
        </div>
      </form>

      <p className="mt-9 border-t border-line pt-5 text-sm text-muted">
        {ui("contact.direct")}{" "}
        <a href={`mailto:${profile.email}`} className="text-fg underline decoration-line-strong underline-offset-4 transition-colors hover:text-accent">
          {profile.email}
        </a>
      </p>
    </div>
  );
}
