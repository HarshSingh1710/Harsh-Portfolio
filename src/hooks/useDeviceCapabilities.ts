import { useEffect, useState } from "react";

export type MotionPref = "auto" | "full" | "reduced";
export type DeviceCaps = {
  reducedMotion: boolean;
  lowEnd: boolean;
  coarsePointer: boolean;
  dprCap: number;
  motionPref: MotionPref;
};

const STORAGE_KEY = "motion-pref";

function readPref(): MotionPref {
  if (typeof window === "undefined") return "auto";
  const v = window.localStorage.getItem(STORAGE_KEY);
  return v === "full" || v === "reduced" ? v : "auto";
}

function detect(pref: MotionPref): DeviceCaps {
  if (typeof window === "undefined") {
    return { reducedMotion: false, lowEnd: false, coarsePointer: false, dprCap: 1.5, motionPref: pref };
  }
  const systemReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const cores = navigator.hardwareConcurrency ?? 8;
  // @ts-expect-error non-standard
  const mem = (navigator.deviceMemory ?? 8) as number;
  const saveData = !!(navigator as any).connection?.saveData;
  const slowConn = ["slow-2g", "2g", "3g"].includes(((navigator as any).connection?.effectiveType) ?? "");
  const autoReduced = systemReduced || saveData || slowConn;
  const reducedMotion = pref === "reduced" ? true : pref === "full" ? false : autoReduced;
  const autoLowEnd = autoReduced || cores <= 4 || mem <= 4;
  const lowEnd = pref === "reduced" ? true : pref === "full" ? false : autoLowEnd;
  const dprCap = lowEnd ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);
  return { reducedMotion, lowEnd, coarsePointer, dprCap, motionPref: pref };
}

export function setMotionPref(pref: MotionPref) {
  if (typeof window === "undefined") return;
  if (pref === "auto") window.localStorage.removeItem(STORAGE_KEY);
  else window.localStorage.setItem(STORAGE_KEY, pref);
  window.dispatchEvent(new CustomEvent("motion-pref-change"));
}

export function useDeviceCapabilities(): DeviceCaps {
  // Start with SSR-safe defaults so server and client first render match.
  const [caps, setCaps] = useState<DeviceCaps>({
    reducedMotion: false,
    lowEnd: false,
    coarsePointer: false,
    dprCap: 1.5,
    motionPref: "auto",
  });
  useEffect(() => {
    const recompute = () => setCaps(detect(readPref()));
    recompute();
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    m.addEventListener?.("change", recompute);
    window.addEventListener("motion-pref-change", recompute);
    window.addEventListener("storage", recompute);
    return () => {
      m.removeEventListener?.("change", recompute);
      window.removeEventListener("motion-pref-change", recompute);
      window.removeEventListener("storage", recompute);
    };
  }, []);
  useEffect(() => {
    const cls = document.documentElement.classList;
    cls.toggle("reduced-motion", caps.reducedMotion);
    cls.toggle("low-end", caps.lowEnd);
  }, [caps.reducedMotion, caps.lowEnd]);
  return caps;
}
