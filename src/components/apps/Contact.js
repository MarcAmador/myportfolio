"use client";

import { Send, CheckCircle2, AlertTriangle } from "lucide-react";
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
    <div className="p-5 md:p-7">
      <h2 className="display text-[46px] md:text-[56px]">
        {ui("contact.title")}
        <span className="text-orange">.</span>
      </h2>
      <p className="mb-6 mt-1 max-w-[46ch] text-ink-soft">{ui("contact.sub")}</p>

      <form onSubmit={onSubmit} className="grid gap-4" noValidate>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-1.5">
            <span className="label">{ui("contact.name")}</span>
            <input name="name" required autoComplete="name" className="input" />
          </label>
          <label className="grid gap-1.5">
            <span className="label">{ui("contact.email")}</span>
            <input name="email" type="email" required autoComplete="email" className="input" />
          </label>
        </div>
        <label className="grid gap-1.5">
          <span className="label">{ui("contact.message")}</span>
          <textarea name="message" required rows={5} className="input resize-y" />
        </label>
        {/* Campo trampa anti-spam: los humanos no lo ven */}
        <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

        <div className="flex flex-wrap items-center gap-4">
          <button className="btn btn-primary" disabled={status === "sending"}>
            <Send size={14} strokeWidth={2.5} /> {status === "sending" ? ui("contact.sending") : ui("contact.send")}
          </button>
          <p role="status" aria-live="polite" className="flex items-center gap-2 text-[13.5px]">
            {status === "ok" && (
              <>
                <CheckCircle2 size={16} className="text-green" /> {ui("contact.ok")}
              </>
            )}
            {(status === "error" || status === "invalid") && (
              <>
                <AlertTriangle size={16} className="text-orange" /> {ui(status === "error" ? "contact.error" : "contact.invalid")}
              </>
            )}
          </p>
        </div>
      </form>

      <p className="mono mt-8 border-t-2 border-ink pt-4 text-[12.5px]">
        {ui("contact.direct")}{" "}
        <a href={`mailto:${profile.email}`} className="underline decoration-orange decoration-2 underline-offset-4 hover:bg-yellow hover:text-[#1a1814]">
          {profile.email}
        </a>
      </p>
    </div>
  );
}
