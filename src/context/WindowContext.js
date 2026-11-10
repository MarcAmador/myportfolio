"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from "react";
import { APPS } from "@/data/apps";

const WMContext = createContext(null);

const MENUBAR_H = 34;
const DOCK_H = 96;

function computeBox(app, index) {
  const W = typeof window === "undefined" ? 1280 : window.innerWidth;
  const H = typeof window === "undefined" ? 800 : window.innerHeight;
  const areaW = W;
  const areaH = H - MENUBAR_H - DOCK_H + 20;
  const def = APPS[app]?.size ?? { w: 640, h: 480 };
  const w = Math.min(def.w, areaW - 24);
  const h = Math.min(def.h, areaH - 8);
  const step = index % 6;
  const x = Math.max(8, Math.min(areaW - w - 8, (areaW - w) / 2 + step * 30 - 70));
  const y = Math.max(8, Math.min(areaH - h, 18 + step * 26));
  return { x, y, w, h };
}

function reducer(state, action) {
  switch (action.type) {
    case "open": {
      const { key, app, payload } = action;
      const existing = state.windows[key];
      const z = state.z + 1;
      if (existing) {
        return {
          z,
          windows: {
            ...state.windows,
            [key]: { ...existing, open: true, minimized: false, z, payload: payload ?? existing.payload },
          },
        };
      }
      const openCount = Object.values(state.windows).filter((w) => w.open).length;
      return {
        z,
        windows: {
          ...state.windows,
          [key]: { key, app, open: true, minimized: false, z, payload, ...computeBox(app, openCount) },
        },
      };
    }
    case "focus": {
      const w = state.windows[action.key];
      if (!w) return state;
      const z = state.z + 1;
      return { z, windows: { ...state.windows, [action.key]: { ...w, z, minimized: false } } };
    }
    case "close": {
      const w = state.windows[action.key];
      if (!w) return state;
      return { ...state, windows: { ...state.windows, [action.key]: { ...w, open: false } } };
    }
    case "minimize": {
      const w = state.windows[action.key];
      if (!w) return state;
      return { ...state, windows: { ...state.windows, [action.key]: { ...w, minimized: true } } };
    }
    default:
      return state;
  }
}

export function WindowProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { z: 10, windows: {} });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const open = useCallback((app, payload) => {
    const key = app === "project" ? `project:${payload}` : app;
    dispatch({ type: "open", key, app, payload });
    return key;
  }, []);
  const close = useCallback((key) => dispatch({ type: "close", key }), []);
  const minimize = useCallback((key) => dispatch({ type: "minimize", key }), []);
  const focus = useCallback((key) => dispatch({ type: "focus", key }), []);

  const value = useMemo(() => {
    const list = Object.values(state.windows).filter((w) => w.open);
    const visible = list.filter((w) => !w.minimized);
    const top = visible.reduce((a, b) => (!a || b.z > a.z ? b : a), null);
    return {
      windows: state.windows,
      openWindows: list,
      focusedKey: top?.key ?? null,
      isMobile,
      open,
      close,
      minimize,
      focus,
    };
  }, [state.windows, isMobile, open, close, minimize, focus]);

  return <WMContext.Provider value={value}>{children}</WMContext.Provider>;
}

export const useWM = () => {
  const ctx = useContext(WMContext);
  if (!ctx) throw new Error("useWM debe usarse dentro de <WindowProvider>");
  return ctx;
};

/** Versión que no lanza error fuera del escritorio (p. ej. en las páginas de detalle) */
export const useWMOptional = () => useContext(WMContext);
