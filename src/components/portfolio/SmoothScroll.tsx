import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { useDeviceCapabilities } from "@/hooks/useDeviceCapabilities";

export function SmoothScroll({ children }: { children: ReactNode }) {
  const caps = useDeviceCapabilities();
  useEffect(() => {
    if (caps.reducedMotion) return;
    const lenis = new Lenis({
      duration: caps.lowEnd ? 1.0 : 1.6,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    });
    let raf = 0;
    const tick = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, [caps.reducedMotion, caps.lowEnd]);

  return <>{children}</>;
}
