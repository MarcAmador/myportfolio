"use client";

import { useState, useTransition } from "react";
import { Play, RefreshCw, Zap, Database, Server, Clock, CheckCircle2, Copy, Check } from "lucide-react";
import { usePrefs } from "@/context/PrefsContext";

const SAMPLE_DATA = [
  { id: "ORD-9421", client: "Elena Morales", items: 3, total: "$124.50", status: "entregado", ms: 14 },
  { id: "ORD-9422", client: "Carlos Fuentes", items: 1, total: "$42.00", status: "en_camino", ms: 18 },
  { id: "ORD-9423", client: "Lucía Vargas", items: 5, total: "$310.20", status: "pendiente", ms: 22 },
  { id: "ORD-9424", client: "Javier Méndez", items: 2, total: "$88.00", status: "entregado", ms: 12 },
  { id: "ORD-9425", client: "Sofía Navarro", items: 4, total: "$195.80", status: "en_camino", ms: 16 },
];

export default function WebLab() {
  const { lang } = usePrefs();
  const [filter, setFilter] = useState("todos");
  const [useCache, setUseCache] = useState(true);
  const [simulatedDelay, setSimulatedDelay] = useState(15);
  const [isPending, startTransition] = useTransition();
  const [lastFetchedAt, setLastFetchedAt] = useState("Justo ahora");
  const [copied, setCopied] = useState(false);

  const filtered = SAMPLE_DATA.filter((item) => {
    if (filter === "todos") return true;
    return item.status === filter;
  });

  const handleRefresh = () => {
    startTransition(() => {
      setSimulatedDelay(useCache ? 12 : 145);
      setLastFetchedAt(new Date().toLocaleTimeString());
    });
  };

  const copyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(filtered, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-[var(--border-subtle)] bg-[#090d16] text-[#f1f5f9] overflow-hidden shadow-2xl font-sans">
      {/* Mac window header */}
      <div className="px-4 py-3 bg-[#0d121f] border-b border-[var(--border-subtle)] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#ef4444]" />
            <span className="w-3 h-3 rounded-full bg-[#f59e0b]" />
            <span className="w-3 h-3 rounded-full bg-[#10b981]" />
          </div>
          <span className="ml-3 text-xs font-mono text-[#94a3b8] flex items-center gap-1.5">
            <Server size={12} className="text-[#38bdf8]" />
            <span>api.marcamador.dev/v1/telemetry</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#38bdf8]/15 text-[#38bdf8] border border-[#38bdf8]/30">
            React 19 Server Actions
          </span>
        </div>
      </div>

      {/* Control Toolbar */}
      <div className="p-4 bg-[#0b101c] border-b border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-[#94a3b8] text-[11px] mr-1">Filtro:</span>
          {["todos", "entregado", "en_camino", "pendiente"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-2.5 py-1 rounded-lg font-mono text-xs transition-colors capitalize ${
                filter === f
                  ? "bg-[#38bdf8] text-[#090d16] font-semibold"
                  : "bg-[#161d2e] text-[#94a3b8] hover:text-[#f1f5f9] border border-[var(--border-subtle)]"
              }`}
            >
              {f.replace("_", " ")}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-xs text-[#94a3b8] cursor-pointer">
            <input
              type="checkbox"
              checked={useCache}
              onChange={(e) => setUseCache(e.target.checked)}
              className="accent-[#38bdf8] rounded"
            />
            <span>Caché en el Edge</span>
          </label>

          <button
            onClick={handleRefresh}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#161d2e] hover:bg-[#1f293d] border border-[var(--border-subtle)] text-[#f1f5f9] font-mono transition-colors"
          >
            <RefreshCw size={12} className={isPending ? "animate-spin text-[#38bdf8]" : ""} />
            <span>Re-validar</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Data view + Telemetry inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[var(--border-subtle)]">
        {/* Left: Interactive Data Table (7 cols) */}
        <div className="lg:col-span-7 p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-[#94a3b8] uppercase tracking-wider">
              Registros procesados ({filtered.length})
            </span>
            <span className="text-[11px] font-mono text-[#34d399] flex items-center gap-1">
              <Zap size={11} /> Tiempo de respuesta: {simulatedDelay}ms
            </span>
          </div>

          <div className="space-y-2">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-lg bg-[#0e1422] border border-[var(--border-subtle)] hover:border-[#38bdf8]/40 transition-colors flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[#38bdf8] font-medium">{item.id}</span>
                  <div>
                    <span className="text-[#f1f5f9] font-medium block">{item.client}</span>
                    <span className="text-[#64748b] text-[11px] font-mono">{item.items} artículos</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium ${
                      item.status === "entregado"
                        ? "bg-[#10b981]/15 text-[#34d399] border border-[#10b981]/30"
                        : item.status === "en_camino"
                        ? "bg-[#38bdf8]/15 text-[#38bdf8] border border-[#38bdf8]/30"
                        : "bg-[#fbbf24]/15 text-[#fbbf24] border border-[#fbbf24]/30"
                    }`}
                  >
                    {item.status.replace("_", " ")}
                  </span>
                  <span className="font-mono text-[#f1f5f9] font-semibold">{item.total}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Live Telemetry & JSON inspect (5 cols) */}
        <div className="lg:col-span-5 p-4 bg-[#0a0e18] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-[#94a3b8] uppercase tracking-wider flex items-center gap-1.5">
                <Database size={12} className="text-[#a78bfa]" /> Telemetría del Servidor
              </span>
              <button
                onClick={copyJson}
                className="text-[11px] font-mono text-[#94a3b8] hover:text-[#f1f5f9] flex items-center gap-1 transition-colors"
              >
                {copied ? <Check size={12} className="text-[#34d399]" /> : <Copy size={12} />}
                <span>{copied ? "Copiado" : "Copiar JSON"}</span>
              </button>
            </div>

            {/* Metrics pills */}
            <div className="grid grid-cols-2 gap-2 mb-4 font-mono text-[11px]">
              <div className="p-2.5 rounded-lg bg-[#0e1422] border border-[var(--border-subtle)]">
                <span className="text-[#64748b] block text-[10px]">ESTADO SSR</span>
                <span className="text-[#34d399] font-semibold">200 OK (Hidratado)</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#0e1422] border border-[var(--border-subtle)]">
                <span className="text-[#64748b] block text-[10px]">CACHE HIT</span>
                <span className="text-[#38bdf8] font-semibold">{useCache ? "99.4% (Edge)" : "BYPASS"}</span>
              </div>
            </div>

            {/* JSON Code snippet */}
            <div className="p-3 rounded-lg bg-[#050810] border border-[var(--border-subtle)] font-mono text-[11px] text-[#94a3b8] overflow-x-auto max-h-[170px]">
              <pre className="text-[#38bdf8]">
                {JSON.stringify(
                  {
                    endpoint: "/api/v1/orders",
                    cache: useCache ? "HIT" : "MISS",
                    latencyMs: simulatedDelay,
                    totalCount: filtered.length,
                    timestamp: lastFetchedAt,
                  },
                  null,
                  2
                )}
              </pre>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] font-mono text-[#64748b]">
            <span className="flex items-center gap-1 text-[#34d399]">
              <CheckCircle2 size={12} /> Listo para producción
            </span>
            <span>Next.js 16 + React 19</span>
          </div>
        </div>
      </div>
    </div>
  );
}
