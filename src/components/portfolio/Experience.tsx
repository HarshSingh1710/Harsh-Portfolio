import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Section } from "./Section";
import { EXPERIENCE } from "./data";

export function Experience() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title={<>A timeline of <span className="gradient-text">shipped systems</span>.</>}
    >
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-[#d4d7dd] via-[#ffffff] to-transparent md:left-1/2" />

        <div className="space-y-12">
          {EXPERIENCE.map((exp, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="relative pl-12 md:pl-0">
                <div className="absolute left-4 top-2 -translate-x-1/2 md:left-1/2">
                  <div className="h-4 w-4 rounded-full bg-[#ffffff] shadow-[0_0_20px_#ffffff]" />
                </div>

                <div className={`md:flex md:gap-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div className="md:w-1/2 md:px-8">
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="glass group w-full text-left p-6 transition-all hover:border-[rgba(220,224,230,0.4)]"
                      data-magnetic
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-xs uppercase tracking-[0.2em] text-[#ffffff]">{exp.period}</div>
                          <h3 className="mt-1 font-display text-xl font-semibold">{exp.role}</h3>
                          <div className="text-sm text-white/60">{exp.company}</div>
                        </div>
                        <ChevronDown className={`h-5 w-5 text-white/40 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                      </div>
                      <p className="mt-3 text-sm text-white/70">{exp.summary}</p>

                      <div
                        className={`grid gap-3 overflow-hidden transition-all duration-500 ${
                          isOpen ? "mt-4 max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
                        }`}
                      >
                        {exp.projects.map((p) => (
                          <div key={p.name} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                            <div className="font-display text-sm font-semibold text-white">{p.name}</div>
                            <p className="mt-1 text-xs text-white/60">{p.overview}</p>
                            <div className="mt-2 flex flex-wrap gap-1.5">
                              {p.tech.map((t) => (
                                <span key={t} className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] text-white/70">
                                  {t}
                                </span>
                              ))}
                            </div>
                            <div className="mt-2 text-[11px] text-white/50">
                              <span className="text-[#ffffff]">Challenge — </span>{p.challenges}
                            </div>
                            <div className="text-[11px] text-white/50">
                              <span className="text-[#6b7079]">Win — </span>{p.achievements}
                            </div>
                          </div>
                        ))}
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
