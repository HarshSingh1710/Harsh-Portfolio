import { useEffect, useState } from "react";
import { Sparkles, Minus, Wand2 } from "lucide-react";
import { setMotionPref, type MotionPref } from "@/hooks/useDeviceCapabilities";

const OPTIONS: { value: MotionPref; label: string; Icon: typeof Sparkles }[] = [
  { value: "auto", label: "Auto", Icon: Wand2 },
  { value: "full", label: "Full", Icon: Sparkles },
  { value: "reduced", label: "Calm", Icon: Minus },
];

export default function MotionToggle() {
  const [pref, setPref] = useState<MotionPref>("auto");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const read = () =>
      setPref((localStorage.getItem("motion-pref") as MotionPref) || "auto");
    read();
    window.addEventListener("motion-pref-change", read);
    return () => window.removeEventListener("motion-pref-change", read);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 left-6 z-[60] hidden md:block">
      <div
        className="flex items-center gap-1 rounded-full border border-white/10 bg-black/40 p-1 backdrop-blur-md shadow-[0_8px_30px_rgb(0_0_0/0.35)]"
        role="group"
        aria-label="Motion preference"
      >
        {OPTIONS.map(({ value, label, Icon }) => {
          const active = pref === value;
          return (
            <button
              key={value}
              type="button"
              aria-pressed={active}
              onClick={() => {
                setMotionPref(value);
                setPref(value);
              }}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] transition-colors ${
                active
                  ? "bg-white/90 text-black"
                  : "text-white/60 hover:text-white"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
