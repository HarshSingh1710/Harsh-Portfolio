import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  className,
}: {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  subtitle?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("relative mx-auto w-full max-w-7xl px-6 py-28 md:py-36", className)}>
      {(eyebrow || title || subtitle) && (
        <div className="mb-14 max-w-3xl">
          {eyebrow && (
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/60">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ffffff] shadow-[0_0_10px_#ffffff]" />
              {eyebrow}
            </div>
          )}
          {title && (
            <h2 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
              {title}
            </h2>
          )}
          {subtitle && <p className="mt-4 text-base text-white/60 md:text-lg">{subtitle}</p>}
        </div>
      )}
      {children}
    </section>
  );
}
