import { useEffect, useRef, useState } from "react";
import { Mail, Phone, Github, Linkedin, Send, CheckCircle2 } from "lucide-react";
import { Section } from "./Section";
import { MagneticButton } from "./MagneticButton";
import { HARSH } from "./data";

export function Contact() {
  const [sent, setSent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      formRef.current?.reset();
    }, 3500);
  };

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title={<>Let's build <span className="gradient-text">something</span> great.</>}
      subtitle="Open to senior backend, platform, and AI engineering roles."
    >
      <div className="grid gap-6 md:grid-cols-5">
        <div className="glass md:col-span-2 p-7 space-y-5">
          <a href={`mailto:${HARSH.email}`} className="group flex items-start gap-4">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/[0.06] border border-white/10 text-[#ffffff]">
              <Mail className="h-4 w-4" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-white/50">Email</div>
              <div className="text-sm text-white group-hover:text-[#ffffff] transition-colors">{HARSH.email}</div>
            </div>
          </a>
          <a href={`tel:${HARSH.phone}`} className="group flex items-start gap-4">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/[0.06] border border-white/10 text-[#ffffff]">
              <Phone className="h-4 w-4" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-white/50">Phone</div>
              <div className="text-sm text-white group-hover:text-[#ffffff] transition-colors">{HARSH.phone}</div>
            </div>
          </a>
          <a href={HARSH.linkedin} target="_blank" rel="noreferrer" className="group flex items-start gap-4">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/[0.06] border border-white/10 text-[#ffffff]">
              <Linkedin className="h-4 w-4" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-white/50">LinkedIn</div>
              <div className="text-sm text-white group-hover:text-[#ffffff] transition-colors">/in/harshsingh</div>
            </div>
          </a>
          <a href={HARSH.github} target="_blank" rel="noreferrer" className="group flex items-start gap-4">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/[0.06] border border-white/10 text-[#ffffff]">
              <Github className="h-4 w-4" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-white/50">GitHub</div>
              <div className="text-sm text-white group-hover:text-[#ffffff] transition-colors">@harshsingh</div>
            </div>
          </a>
        </div>

        <form ref={formRef} onSubmit={submit} className="glass relative md:col-span-3 p-7 space-y-4 overflow-hidden">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name" name="name" />
            <Field label="Email" name="email" type="email" />
          </div>
          <Field label="Subject" name="subject" />
          <Field label="Message" name="message" textarea />
          <div className="pt-2">
            <MagneticButton type="submit">
              <Send className="h-4 w-4" /> Send Message
            </MagneticButton>
          </div>

          {sent && (
            <div className="absolute inset-0 grid place-items-center bg-[#000000]/85 backdrop-blur-sm animate-[fadeIn_0.4s_ease]">
              <div className="text-center">
                <CheckCircle2 className="mx-auto h-14 w-14 text-[#ffffff] drop-shadow-[0_0_20px_#ffffff]" />
                <div className="mt-3 font-display text-xl">Message sent</div>
                <div className="text-sm text-white/60">I'll get back to you shortly.</div>
              </div>
            </div>
          )}
        </form>
      </div>
    </Section>
  );
}

function Field({
  label,
  name,
  type = "text",
  textarea,
}: {
  label: string;
  name: string;
  type?: string;
  textarea?: boolean;
}) {
  const cls =
    "peer w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-transparent outline-none transition-all focus:border-[rgba(220,224,230,0.6)] focus:bg-white/[0.05]";
  return (
    <label className="group relative block">
      {textarea ? (
        <textarea name={name} rows={4} placeholder={label} className={cls} required />
      ) : (
        <input name={name} type={type} placeholder={label} className={cls} required />
      )}
      <span className="pointer-events-none absolute left-3 top-2 -translate-y-5 rounded-full bg-[#000000] px-2 text-[10px] uppercase tracking-[0.2em] text-white/50 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-xs peer-placeholder-shown:text-white/40 peer-focus:top-2 peer-focus:-translate-y-5 peer-focus:text-[10px] peer-focus:text-[#ffffff]">
        {label}
      </span>
    </label>
  );
}
