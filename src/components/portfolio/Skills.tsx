import { useState } from "react";
import { Section } from "./Section";
import { SKILLS } from "./data";

const SLUG: Record<string, string> = {
  Python: "python",
  FastAPI: "fastapi",
  Django: "django",
  Flask: "flask",
  PostgreSQL: "postgresql",
  MySQL: "mysql",
  MongoDB: "mongodb",
  Redis: "redis",
  RabbitMQ: "rabbitmq",
  Kafka: "apachekafka",
  Docker: "docker",
  Kubernetes: "kubernetes",
  AWS: "amazonwebservices",
  "GitHub Actions": "githubactions",
  Jenkins: "jenkins",
  OpenAI: "openai",
  LangChain: "langchain",
  Linux: "linux",
  Git: "git",
  Swagger: "swagger",
};

function logoUrl(name: string) {
  const slug = SLUG[name];
  return slug ? `https://cdn.simpleicons.org/${slug}/c4b5fd` : null;
}

export function Skills() {
  const [active, setActive] = useState<string | null>(null);
  return (
    <Section
      id="skills"
      eyebrow="Toolkit"
      title={<>The <span className="gradient-text">stack</span> I ship with.</>}
      subtitle="Hover any skill to expand its detail and proficiency."
    >
      <div className="flex flex-wrap gap-3">
        {SKILLS.map((s) => {
          const isActive = active === s.name;
          const url = logoUrl(s.name);
          return (
            <div
              key={s.name}
              onMouseEnter={() => setActive(s.name)}
              onMouseLeave={() => setActive(null)}
              className={`group relative cursor-default overflow-hidden rounded-2xl border bg-white/[0.04] transition-[width,border-color] duration-500 ${
                isActive ? "w-[320px] border-violet-400/50" : "w-auto border-white/10"
              }`}
              data-magnetic
            >
              <div className="flex items-center gap-3 px-5 py-3">
                {url ? (
                  <img src={url} alt="" width={18} height={18} loading="lazy" decoding="async" className="h-[18px] w-[18px] opacity-90" />
                ) : (
                  <span className="h-2 w-2 rounded-full bg-gradient-to-r from-violet-400 to-blue-400 shadow-[0_0_10px_#8b5cf6]" />
                )}
                <span className="font-display text-sm font-medium tracking-wide text-white">{s.name}</span>
                <span className="text-xs text-white/40">{s.group}</span>
              </div>
              <div
                className={`grid transition-[grid-template-rows,opacity] duration-500 ${
                  isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-5 pb-4">
                    <p className="mb-2 text-xs text-white/70">{s.desc}</p>
                    <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-[linear-gradient(90deg,#8b5cf6,#3b82f6)]"
                        style={{ width: `${s.level}%` }}
                      />
                    </div>
                    <div className="mt-1 text-right text-[10px] tabular-nums text-white/50">{s.level}%</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Infinite marquee */}
      <div className="relative mt-16 overflow-hidden border-y border-white/10 py-6 [mask-image:linear-gradient(90deg,transparent,black_15%,black_85%,transparent)]">
        <div className="flex w-max animate-marquee gap-12 whitespace-nowrap font-display text-2xl uppercase tracking-[0.2em] text-white/30">
          {[...SKILLS, ...SKILLS].map((s, i) => {
            const url = logoUrl(s.name);
            return (
              <span key={i} className="flex items-center gap-4">
                {url && <img src={url} alt="" width={22} height={22} loading="lazy" decoding="async" className="h-[22px] w-[22px] opacity-70" />}
                {s.name}
                <span className="text-violet-400/60">✦</span>
              </span>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

