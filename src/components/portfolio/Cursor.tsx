import { useEffect, useRef } from "react";
import { useDeviceCapabilities } from "@/hooks/useDeviceCapabilities";

export function Cursor() {
  const caps = useDeviceCapabilities();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (caps.coarsePointer || caps.reducedMotion || caps.lowEnd) return;


    const dot = dotRef.current!;
    const ring = ringRef.current!;
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;

    const move = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
    };
    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a,button,[data-magnetic]")) {
        ring.classList.add("scale-150", "bg-[rgba(220,224,230,0.12)]");
      } else {
        ring.classList.remove("scale-150", "bg-[rgba(220,224,230,0.12)]");
      }
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", onOver);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, [caps.coarsePointer, caps.reducedMotion, caps.lowEnd]);

  if (caps.coarsePointer || caps.reducedMotion || caps.lowEnd) return null;

  return (

    <>
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] -ml-5 -mt-5 h-10 w-10 rounded-full border border-violet-300/50 transition-[transform,background-color] duration-200 ease-out"
        style={{ boxShadow: "0 0 18px rgba(139,92,246,0.45)", willChange: "transform" }}
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] -ml-1 -mt-1 h-2 w-2 rounded-full bg-violet-300"
        style={{ willChange: "transform" }}
      />
    </>

  );
}
