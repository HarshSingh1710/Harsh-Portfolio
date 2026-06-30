import { useRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useDeviceCapabilities } from "@/hooks/useDeviceCapabilities";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "outline";
  asLink?: { href: string; download?: boolean | string; target?: string; rel?: string };
  children: ReactNode;
};

export function MagneticButton({ children, className, variant = "primary", asLink, ...props }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const caps = useDeviceCapabilities();
  const disabled = caps.reducedMotion || caps.lowEnd || caps.coarsePointer;

  const onMove = (e: React.MouseEvent) => {
    if (disabled) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
  };
  const onLeave = () => {
    if (disabled) return;
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  };


  const base =
    "relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-medium tracking-wide transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] magnetic";

  const styles = {
    primary:
      "text-white bg-[linear-gradient(135deg,#d4d7dd,#6b7079,#ffffff)] bg-[length:200%_200%] hover:bg-[position:100%_100%] shadow-[0_10px_40px_-10px_rgba(255,255,255,0.7)] hover:shadow-[0_15px_55px_-10px_rgba(220,224,230,0.6)]",
    outline:
      "text-white border border-[rgba(255,255,255,0.18)] hover:border-[rgba(220,224,230,0.6)] hover:bg-[rgba(220,224,230,0.08)] backdrop-blur",
    ghost: "text-white/80 hover:text-white",
  }[variant];

  const inner = (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className="inline-block" data-magnetic>
      {asLink ? (
        <a {...asLink} className={cn(base, styles, className)}>
          {children}
        </a>
      ) : (
        <button {...props} className={cn(base, styles, className)}>
          {children}
        </button>
      )}
    </div>
  );
  return inner;
}
