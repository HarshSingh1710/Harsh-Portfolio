import { ArrowRight, Calendar, CheckCircle2, Zap } from "lucide-react";
import { MagneticButton } from "./MagneticButton";
import { HARSH } from "./data";

const VALUE = [
  { icon: Zap, title: "Ship in weeks, not quarters", desc: "Production-grade FastAPI / Django services with CI/CD, tests and observability from day one." },
  { icon: CheckCircle2, title: "Scaled to 12 plants, 100+ APIs", desc: "Battle-tested across MES, WMS, traceability and AI platforms — not toy projects." },
  { icon: Calendar, title: "Async-first, timezone friendly", desc: "Clear updates, fast iteration, and clean handoffs. Available immediately for senior roles & contracts." },
];

export function HireBanner() {
  return (
    <section id="hire" className="relative mx-auto max-w-7xl px-6 py-28">
      <div className="grid gap-10 md:grid-cols-3">
        {VALUE.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-white/25"
          >
            <div
              className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: "radial-gradient(400px circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,0.08), transparent 60%)" }}
            />
            <Icon className="h-6 w-6 text-white/80" />
            <h3 className="mt-4 font-display text-xl">{title}</h3>
            <p className="mt-2 text-sm text-white/60">{desc}</p>
          </div>
        ))}
      </div>

      <div className="relative mt-16 overflow-hidden rounded-3xl border border-white/10 p-10 md:p-14">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-80"
          style={{
            background:
              "radial-gradient(800px circle at 20% 20%, rgba(139,92,246,0.25), transparent 60%), radial-gradient(700px circle at 80% 80%, rgba(59,130,246,0.22), transparent 60%), #07060f",
          }}
        />
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">Hire Harsh</p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl leading-tight md:text-5xl">
              Need a backend that <span className="gradient-text">won't break at scale</span>?
            </h2>
            <p className="mt-3 max-w-xl text-white/65">
              Full-time, contract, or fractional senior backend help — APIs, microservices, AI/RAG, manufacturing platforms. Let's talk this week.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <MagneticButton asLink={{ href: `mailto:${HARSH.email}?subject=Project%20Inquiry` }} className="!px-6">
              Hire Me <ArrowRight className="h-4 w-4" />
            </MagneticButton>
            <MagneticButton variant="outline" asLink={{ href: HARSH.resumeUrl, download: true }} className="!px-6">
              Download Resume
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
