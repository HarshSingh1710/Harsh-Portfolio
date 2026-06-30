import { Github, Linkedin, Mail } from "lucide-react";
import { HARSH } from "./data";

export function Footer() {
  return (
    <footer className="relative mt-20 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="text-center">
          <p className="font-display text-3xl leading-tight tracking-tight md:text-5xl">
            <span className="gradient-text">"Building scalable backend systems</span>
            <br />
            <span className="text-white/85">one API at a time."</span>
          </p>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 md:flex-row">
          <div className="text-xs text-white/40">
            © {new Date().getFullYear()} {HARSH.name} · Crafted with obsession.
          </div>
          <div className="flex items-center gap-5 text-white/60">
            <a href={HARSH.github} target="_blank" rel="noreferrer" className="hover:text-white"><Github className="h-4 w-4" /></a>
            <a href={HARSH.linkedin} target="_blank" rel="noreferrer" className="hover:text-white"><Linkedin className="h-4 w-4" /></a>
            <a href={`mailto:${HARSH.email}`} className="hover:text-white"><Mail className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
