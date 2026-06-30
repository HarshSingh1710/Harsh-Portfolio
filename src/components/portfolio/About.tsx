import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HARSH, ACHIEVEMENTS } from "./data";
import { Section } from "./Section";

gsap.registerPlugin(ScrollTrigger);

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);

  useEffect(() => {
    const el = ref.current!;
    const obj = { v: 0 };
    const tween = gsap.to(obj, {
      v: value,
      duration: 2.6,
      ease: "power1.out",

      scrollTrigger: { trigger: el, start: "top 85%" },
      onUpdate: () => setVal(obj.v),
    });
    return () => {
      tween.kill();
    };
  }, [value]);

  const isFloat = value % 1 !== 0;
  return (
    <span ref={ref}>
      {isFloat ? val.toFixed(2) : Math.floor(val)}
      {suffix}
    </span>
  );
}

export function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title={<>Engineering <span className="gradient-text">enterprise-grade</span> backend systems.</>}
      subtitle={HARSH.summary}
    >
      <div className="grid gap-6 md:grid-cols-4">
        {ACHIEVEMENTS.map((a, i) => (
          <div
            key={i}
            className="glass group relative overflow-hidden p-6 transition-all hover:-translate-y-1 hover:border-[rgba(220,224,230,0.4)]"
          >
            <div className="font-display text-4xl font-semibold text-white md:text-5xl">
              <Counter value={a.value} suffix={a.suffix} />
            </div>
            <div className="mt-2 text-sm text-white/60">{a.label}</div>
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#ffffff]/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
        ))}
      </div>
    </Section>
  );
}
