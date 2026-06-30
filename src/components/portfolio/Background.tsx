import { useEffect, useRef } from "react";
import { useDeviceCapabilities } from "@/hooks/useDeviceCapabilities";

export function Background() {
  const caps = useDeviceCapabilities();

  const ref = useRef<HTMLDivElement>(null);
  const disableMouse = caps.reducedMotion || caps.lowEnd || caps.coarsePointer;

  useEffect(() => {
    if (disableMouse) return;
    const el = ref.current;
    if (!el) return;
    let tx = 50, ty = 50, raf = 0, pending = false;
    const apply = () => {
      el.style.setProperty("--mx", `${tx}%`);
      el.style.setProperty("--my", `${ty}%`);
      pending = false;
    };
    const onMove = (e: MouseEvent) => {
      tx = (e.clientX / window.innerWidth) * 100;
      ty = (e.clientY / window.innerHeight) * 100;
      if (!pending) {
        pending = true;
        raf = requestAnimationFrame(apply);
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [disableMouse]);


  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0" style={{ background: "#07060f" }} />
      <div className="absolute inset-0 bg-aurora" />

      {!disableMouse && (
        <div
          ref={ref}
          className="absolute inset-0 will-change-[background]"
          style={{
            background:
              "radial-gradient(500px circle at var(--mx,50%) var(--my,50%), rgba(139,92,246,0.18), transparent 60%)",
          }}
        />
      )}
      {!caps.lowEnd && (
        <div className="absolute inset-0 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      )}
    </div>
  );
}


