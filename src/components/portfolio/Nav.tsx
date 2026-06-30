import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { HARSH } from "./data";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 30);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div
          className={`flex items-center justify-between rounded-full border px-5 py-3 transition-all ${
            scrolled
              ? "border-white/10 bg-[#070914]/70 backdrop-blur-xl shadow-[0_10px_40px_-10px_rgba(255,255,255,0.4)]"
              : "border-transparent"
          }`}
        >
          <a href="#" className="flex items-center gap-2.5 font-display text-sm font-semibold tracking-wide" data-magnetic>
            <span
              className="relative grid h-8 w-8 place-items-center rounded-xl text-[12px] font-bold text-white shadow-[0_0_24px_rgba(139,92,246,0.55)]"
              style={{ background: "linear-gradient(135deg,#8b5cf6 0%,#6366f1 55%,#3b82f6 100%)" }}
            >
              <span className="absolute inset-0 rounded-xl ring-1 ring-white/25" />
              HS
            </span>
            <span className="hidden gradient-text sm:inline">{HARSH.name}</span>
          </a>

          <nav className="hidden gap-1 md:flex">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-full px-4 py-1.5 text-sm text-white/70 transition-colors hover:bg-white/[0.05] hover:text-white"
                data-magnetic
              >
                {l.label}
              </a>
            ))}
          </nav>
          <a
            href={HARSH.resumeUrl}
            download
            className="hidden rounded-full px-5 py-1.5 text-xs font-semibold text-white shadow-[0_0_20px_rgba(139,92,246,0.45)] transition-transform hover:scale-[1.03] md:inline"
            style={{ background: "linear-gradient(135deg,#8b5cf6,#6366f1 55%,#3b82f6)" }}
            data-magnetic
          >
            Resume
          </a>

          <button className="md:hidden" onClick={() => setOpen((o) => !o)}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <div className="mt-2 rounded-2xl border border-white/10 bg-[#070914]/90 p-4 backdrop-blur-xl md:hidden">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm text-white/80 hover:bg-white/[0.05]"
              >
                {l.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
