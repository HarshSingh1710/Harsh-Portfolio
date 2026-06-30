import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Github, Linkedin, Mail, ArrowRight, Download } from "lucide-react";
import { HARSH, ROLES } from "./data";
import { Typewriter } from "./Typewriter";
import { MagneticButton } from "./MagneticButton";
import { ParticleGlobe } from "./ParticleGlobe";

export function Hero() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-eyebrow", { y: 16, opacity: 0, duration: 1.2, delay: 0.5 })
        .from(
          ".hero-char",
          { yPercent: 100, opacity: 0, stagger: 0.06, duration: 1.6, ease: "power4.out" },
          "-=0.7"
        )
        .from(".hero-sub", { y: 20, opacity: 0, duration: 1.2 }, "-=0.9")
        .from(".hero-stack", { y: 14, opacity: 0, duration: 1 }, "-=0.8")
        .from(".hero-cta", { y: 14, opacity: 0, stagger: 0.12, duration: 0.9 }, "-=0.6")
        .from(".hero-social", { opacity: 0, x: -10, stagger: 0.1, duration: 0.7 }, "-=0.4");

    }, root);
    return () => ctx.revert();
  }, []);

  const name = HARSH.name.toUpperCase().split("");

  return (
    <div ref={root} className="relative min-h-screen w-full overflow-hidden">
      {/* 3D globe behind */}
      <div className="absolute inset-0">
        <ParticleGlobe className="absolute inset-0 h-full w-full opacity-90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#000000_75%)]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 pt-28">
        <div className="hero-eyebrow mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-white/70 backdrop-blur">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#ffffff] shadow-[0_0_10px_#ffffff]" />
          Available for Senior Backend Roles
        </div>

        <h1 className="font-display text-[14vw] leading-[0.88] tracking-tight md:text-[10rem]">
          <span className="block overflow-hidden">
            {name.slice(0, 5).map((c, i) => (
              <span key={i} className="hero-char inline-block gradient-text">
                {c === " " ? "\u00A0" : c}
              </span>
            ))}
          </span>
          <span className="block overflow-hidden">
            {name.slice(6).map((c, i) => (
              <span key={i} className="hero-char inline-block gradient-text">
                {c === " " ? "\u00A0" : c}
              </span>
            ))}
          </span>
        </h1>

        <p className="hero-sub mt-6 max-w-2xl font-display text-xl text-white/85 md:text-3xl">
          <Typewriter words={ROLES} />
        </p>

        <p className="hero-stack mt-3 max-w-xl text-sm text-white/55 md:text-base">
          FastAPI · Django · Microservices · AWS · Docker · Ms SQL Server
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <MagneticButton
            asLink={{ href: HARSH.resumeUrl, download: true }}
            className="hero-cta"
          >
            <Download className="h-4 w-4" /> Download Resume
          </MagneticButton>
          <MagneticButton
            variant="outline"
            asLink={{ href: "#projects" }}
            className="hero-cta"
          >
            View Projects <ArrowRight className="h-4 w-4" />
          </MagneticButton>
          <MagneticButton variant="ghost" asLink={{ href: "#contact" }} className="hero-cta">
            Hire Me →
          </MagneticButton>
        </div>

        <div className="mt-12 flex items-center gap-5 text-white/55">
          <a href={HARSH.github} target="_blank" rel="noreferrer" className="hero-social hover:text-white transition-colors" data-magnetic>
            <Github className="h-5 w-5" />
          </a>
          <a href={HARSH.linkedin} target="_blank" rel="noreferrer" className="hero-social hover:text-white transition-colors" data-magnetic>
            <Linkedin className="h-5 w-5" />
          </a>
          <a href={`mailto:${HARSH.email}`} className="hero-social hover:text-white transition-colors" data-magnetic>
            <Mail className="h-5 w-5" />
          </a>
        </div>
      </div>

      {/* Scroll cue — vertical, right edge, hidden on small screens to avoid CTA overlap */}
      <div className="pointer-events-none absolute bottom-10 right-6 z-10 hidden lg:flex flex-col items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-white/40">
        <span style={{ writingMode: "vertical-rl" }}>scroll</span>
        <div className="h-12 w-px bg-gradient-to-b from-white/60 to-transparent" />
      </div>
    </div>
  );
}
