import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Github, ExternalLink } from "lucide-react";
import { Section } from "./Section";
import { PROJECTS } from "./data";

gsap.registerPlugin(ScrollTrigger);

export function Projects() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".project-card").forEach((card) => {
        gsap.from(card, {
          y: 36,
          opacity: 0,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 88%" },
        });

      });
    }, root);
    return () => ctx.revert();
  }, []);

  const onTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateZ(0)`;
    const glow = el.querySelector<HTMLElement>(".tilt-glow");
    if (glow) {
      glow.style.background = `radial-gradient(400px circle at ${e.clientX - r.left}px ${e.clientY - r.top}px, rgba(220,224,230,0.18), transparent 60%)`;
    }
  };
  const onTiltLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
  };

  return (
    <Section
      id="projects"
      eyebrow="Selected Work"
      title={<>Production systems, <span className="gradient-text">end to end</span>.</>}
      subtitle="From real-time MES platforms to RAG knowledge assistants."
    >
      <div ref={root} className="grid gap-6 md:grid-cols-2">
        {PROJECTS.map((p) => (
          <div
            key={p.id}
            className="project-card group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl transition-[border-color,box-shadow] duration-500 hover:border-[rgba(220,224,230,0.45)] hover:shadow-[0_25px_80px_-20px_rgba(220,224,230,0.35)]"
            onMouseMove={onTilt}
            onMouseLeave={onTiltLeave}
            style={{ transformStyle: "preserve-3d" }}
            data-magnetic
          >
            <div className="tilt-glow pointer-events-none absolute inset-0" />
            <div className={`absolute -right-20 -top-20 h-56 w-56 rounded-full bg-gradient-to-br ${p.color} opacity-30 blur-3xl transition-opacity group-hover:opacity-60`} />

            <div className="relative">
              <div className="mb-4 text-[10px] uppercase tracking-[0.25em] text-[#ffffff]/80">{p.tag}</div>
              <h3 className="font-display text-2xl font-semibold leading-tight md:text-3xl">{p.name}</h3>
              <p className="mt-3 max-w-md text-sm text-white/65">{p.blurb}</p>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {p.tech.map((t) => (
                  <span key={t} className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[11px] text-white/75">
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-7 flex items-center gap-3">
                <a className="inline-flex items-center gap-1.5 text-xs text-white/70 hover:text-white" href="#">
                  <Github className="h-3.5 w-3.5" /> Code
                </a>
                <a className="inline-flex items-center gap-1.5 text-xs text-white/70 hover:text-white" href="#">
                  <ExternalLink className="h-3.5 w-3.5" /> Live
                </a>
                <a className="ml-auto inline-flex items-center gap-1 text-xs font-medium text-[#ffffff] hover:gap-2 transition-all" href="#">
                  Open Project <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
