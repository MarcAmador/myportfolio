"use client";

import { Download, Eraser, PaintBucket, Pencil, RotateCcw, Trash2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePrefs } from "@/context/PrefsContext";

const N = 16;
const PALETTE = ["#1a1814", "#f1e8d2", "#f25c1f", "#f0b429", "#1f8a5b", "#2330c4", "#f3a6c0", "#8a5a3c", "#6b6558", "#ffffff", "#7a1f1f", "#9bd0b4"];
const empty = () => Array(N * N).fill(null);

function flood(cells, start, color) {
  const target = cells[start];
  if (target === color) return cells;
  const next = cells.slice();
  const stack = [start];
  while (stack.length) {
    const i = stack.pop();
    if (next[i] !== target) continue;
    next[i] = color;
    const x = i % N;
    if (x > 0) stack.push(i - 1);
    if (x < N - 1) stack.push(i + 1);
    if (i >= N) stack.push(i - N);
    if (i < N * (N - 1)) stack.push(i + N);
  }
  return next;
}

// Un pequeño corazón inicial para que no arranque vacío
function seed() {
  const c = empty();
  const heart = ["..XX..XX..", ".XXXXXXXX.", "XXXXXXXXXX", "XXXXXXXXXX", ".XXXXXXXX.", "..XXXXXX..", "...XXXX...", "....XX...."];
  heart.forEach((row, y) =>
    [...row].forEach((ch, x) => {
      if (ch === "X") c[(y + 4) * N + x + 3] = "#f25c1f";
    })
  );
  [[5, 5], [6, 5]].forEach(([x, y]) => (c[(y + 3) * N + x + 3] = "#f9f4e6"));
  return c;
}

export default function PixelForge() {
  const { ui } = usePrefs();
  const [cells, setCells] = useState(seed);
  const [history, setHistory] = useState([]);
  const [color, setColor] = useState(PALETTE[2]);
  const [tool, setTool] = useState("pencil");
  const painting = useRef(false);
  const boardRef = useRef(null);
  const cellsRef = useRef(cells);
  cellsRef.current = cells;

  const push = useCallback(() => setHistory((h) => [...h.slice(-49), cellsRef.current]), []);

  const cellAt = (e) => {
    const r = boardRef.current.getBoundingClientRect();
    const x = Math.floor(((e.clientX - r.left) / r.width) * N);
    const y = Math.floor(((e.clientY - r.top) / r.height) * N);
    if (x < 0 || y < 0 || x >= N || y >= N) return -1;
    return y * N + x;
  };

  const paint = (i) => {
    if (i < 0) return;
    const val = tool === "eraser" ? null : color;
    setCells((c) => {
      if (c[i] === val) return c;
      const n = c.slice();
      n[i] = val;
      return n;
    });
  };

  const onDown = (e) => {
    const i = cellAt(e);
    if (i < 0) return;
    push();
    if (tool === "fill") {
      setCells((c) => flood(c, i, color));
      return;
    }
    painting.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    paint(i);
  };
  const onMove = (e) => painting.current && paint(cellAt(e));
  const onUp = () => (painting.current = false);

  const historyRef = useRef(history);
  historyRef.current = history;
  const undo = useCallback(() => {
    const h = historyRef.current;
    if (!h.length) return;
    setCells(h[h.length - 1]);
    setHistory(h.slice(0, -1));
  }, []);

  const exportPng = () => {
    const S = 20;
    const cv = document.createElement("canvas");
    cv.width = cv.height = N * S;
    const ctx = cv.getContext("2d");
    cells.forEach((c, i) => {
      if (!c) return;
      ctx.fillStyle = c;
      ctx.fillRect((i % N) * S, Math.floor(i / N) * S, S, S);
    });
    const a = document.createElement("a");
    a.download = "pixel-forge.png";
    a.href = cv.toDataURL("image/png");
    a.click();
  };

  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") {
        e.preventDefault();
        undo();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [undo]);

  const tools = [
    { id: "pencil", label: ui("demos.pixel.pencil"), Icon: Pencil },
    { id: "eraser", label: ui("demos.pixel.eraser"), Icon: Eraser },
    { id: "fill", label: ui("demos.pixel.fill"), Icon: PaintBucket },
  ];

  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:justify-center">
      <div
        ref={boardRef}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        className="grid aspect-square w-full max-w-[400px] flex-none cursor-crosshair touch-none select-none border-2 border-ink bg-ink/20 shadow-[5px_5px_0_var(--shadow)]"
        style={{ gridTemplateColumns: `repeat(${N}, 1fr)`, gap: 1 }}
        role="application"
        aria-label="Pixel Forge canvas"
      >
        {cells.map((c, i) => (
          <div
            key={i}
            style={{ background: c ?? (((i % N) + Math.floor(i / N)) % 2 ? "var(--paper-3)" : "var(--paper-2)") }}
          />
        ))}
      </div>

      <div className="flex w-full max-w-[400px] flex-col gap-4 sm:w-[190px]">
        <div>
          <p className="label mb-2">Tools</p>
          <div className="grid grid-cols-3 gap-2">
            {tools.map(({ id, label, Icon }) => (
              <button
                key={id}
                title={label}
                aria-label={label}
                aria-pressed={tool === id}
                onClick={() => setTool(id)}
                className="grid h-10 place-items-center border-2 border-ink bg-paper-2 shadow-[2px_2px_0_var(--shadow)] transition aria-pressed:translate-x-px aria-pressed:translate-y-px aria-pressed:bg-ink aria-pressed:text-paper-2 aria-pressed:shadow-none hover:bg-yellow hover:text-[#1a1814]"
              >
                <Icon size={17} strokeWidth={2.2} />
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="label mb-2">Palette</p>
          <div className="grid grid-cols-6 gap-1.5">
            {PALETTE.map((p) => (
              <button
                key={p}
                aria-label={p}
                aria-pressed={color === p}
                onClick={() => {
                  setColor(p);
                  if (tool === "eraser") setTool("pencil");
                }}
                className="aspect-square border-2 border-ink transition-transform aria-pressed:-translate-y-0.5 aria-pressed:shadow-[0_3px_0_var(--ink)] hover:-translate-y-0.5"
                style={{ background: p }}
              />
            ))}
          </div>
        </div>

        <div className="grid gap-2">
          <button className="btn btn-sm justify-center" onClick={undo} disabled={!history.length}>
            <RotateCcw size={13} strokeWidth={2.5} /> {ui("demos.pixel.undo")}
          </button>
          <button
            className="btn btn-sm justify-center"
            onClick={() => {
              push();
              setCells(empty());
            }}
          >
            <Trash2 size={13} strokeWidth={2.5} /> {ui("demos.pixel.clear")}
          </button>
          <button className="btn btn-sm btn-primary justify-center" onClick={exportPng}>
            <Download size={13} strokeWidth={2.5} /> {ui("demos.pixel.export")}
          </button>
        </div>
      </div>
    </div>
  );
}
