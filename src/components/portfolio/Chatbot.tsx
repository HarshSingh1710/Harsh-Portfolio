import { useEffect, useMemo, useRef, useState } from "react";
import { Send, X, Sparkles, Download, Linkedin, Github, Mail, Calendar, Code2, type LucideIcon } from "lucide-react";
import { HARSH } from "./data";

type CTA = { label: string; href?: string; action?: () => void; icon?: LucideIcon };
type Msg = { role: "user" | "assistant"; text: string; cta?: CTA[] };

const QUICK = [
  { label: "Why hire Harsh?", icon: Sparkles },
  { label: "Show projects", icon: Code2 },
  { label: "Resume", icon: Download },
  { label: "Book a call", icon: Calendar },
];

function answer(q: string): { text: string; cta?: CTA[] } {
  const s = q.toLowerCase();
  const mailto = (subject: string) =>
    `mailto:${HARSH.email}?subject=${encodeURIComponent(subject)}`;

  if (s.includes("resume") || s.includes("cv")) {
    return {
      text: "Here's Harsh's resume — fresh, recruiter-ready and under 2 pages. ⚡",
      cta: [{ label: "Download Resume", href: HARSH.resumeUrl, icon: Download }],
    };
  }
  if (s.includes("hire") || s.includes("why") || s.includes("work")) {
    return {
      text:
        "Short version: 4+ years shipping Python backends that power real factories — MES, WMS, traceability and AI platforms across 12 plants. Senior-level FastAPI/Django, microservices, AWS, Docker, OpenAI/RAG. Available now for full-time or contract.\n\nWant me on your team?",
      cta: [
        { label: "Email Harsh", href: mailto("Let's work together"), icon: Mail },
        { label: "Book a call", href: mailto("Intro call — 20 min"), icon: Calendar },
      ],
    };
  }
  if (s.includes("book") || s.includes("call") || s.includes("meet")) {
    return {
      text: "Easiest path — send a quick email and Harsh will share a calendar slot within 24h.",
      cta: [{ label: "Email to book", href: mailto("Intro call — 20 min"), icon: Calendar }],
    };
  }
  if (s.includes("linkedin")) {
    return { text: "Linking you in 👇", cta: [{ label: "Open LinkedIn", href: HARSH.linkedin, icon: Linkedin }] };
  }
  if (s.includes("github")) {
    return { text: "Repos & code samples →", cta: [{ label: "Open GitHub", href: HARSH.github, icon: Github }] };
  }
  if (s.includes("email") || s.includes("contact") || s.includes("mail") || s.includes("phone") || s.includes("call")) {
    return {
      text: `📧 ${HARSH.email}\n📞 ${HARSH.phone}\n\nUsually replies the same day.`,
      cta: [{ label: "Email Harsh", href: mailto("Hello Harsh"), icon: Mail }],
    };
  }
  if (s.includes("python") || s.includes("experience") || s.includes("skill") || s.includes("stack")) {
    return {
      text:
        "4+ years deep in Python — FastAPI, Django, async, Celery, Postgres, Redis, Kafka, Docker, K8s, AWS, plus OpenAI/RAG/LangChain. Comfortable owning a service from architecture to on-call.",
    };
  }
  if (s.includes("project") || s.includes("portfolio") || s.includes("show")) {
    return {
      text:
        "Highlights:\n• MES — real-time shop-floor execution\n• WMS — warehouse mgmt at scale\n• Traceability — full genealogy\n• Manufacturing Interlocking\n• Process Automation\n• Packaging Solution\n• AI Knowledge Assistant (RAG)\n• Enterprise API Platform",
      cta: [{ label: "Scroll to projects", action: () => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }), icon: Code2 }],
    };
  }
  if (s.includes("who")) {
    return { text: `${HARSH.name} — ${HARSH.title}.\n\n${HARSH.summary}` };
  }
  return {
    text:
      "I'm Warrior ⚔️ — ask me about Harsh's skills, projects, or say 'hire', 'resume', 'book a call'.",
  };
}

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [unread, setUnread] = useState(true);
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      role: "assistant",
      text: "Hey 👋 I'm Warrior — Harsh's AI assistant.\nLooking to hire a senior Python backend dev? Ask me anything.",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, typing, open]);

  // Gentle nudge after 12s if user hasn't opened it
  useEffect(() => {
    if (open) return;
    const t = setTimeout(() => setUnread(true), 12000);
    return () => clearTimeout(t);
  }, [open]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMsgs((m) => [...m, { role: "user", text }]);
    setInput("");
    setTyping(true);
    const { text: reply, cta } = answer(text);
    let i = 0;
    setTimeout(() => {
      setMsgs((m) => [...m, { role: "assistant", text: "" }]);
      const id = setInterval(() => {
        i += 2;
        setMsgs((m) => {
          const copy = [...m];
          copy[copy.length - 1] = { role: "assistant", text: reply.slice(0, i) };
          return copy;
        });
        if (i >= reply.length) {
          clearInterval(id);
          setTyping(false);
          if (cta) {
            setMsgs((m) => {
              const copy = [...m];
              copy[copy.length - 1] = { ...copy[copy.length - 1], cta };
              return copy;
            });
          }
        }
      }, 16);
    }, 380);
  };

  const launcherGradient = useMemo(
    () => "conic-gradient(from 0deg, #8b5cf6, #3b82f6, #22d3ee, #a855f7, #8b5cf6)",
    [],
  );

  return (
    <>
      {/* Launcher */}
      <button
        onClick={() => { setOpen((o) => !o); setUnread(false); }}
        className="group fixed bottom-6 right-6 z-50 grid h-16 w-16 place-items-center rounded-full transition-transform hover:scale-105"
        aria-label="Open Warrior AI"
        data-magnetic
      >
        {/* Animated conic glow ring */}
        <span
          aria-hidden
          className="absolute inset-0 rounded-full opacity-90 blur-md animate-[spin_8s_linear_infinite]"
          style={{ background: launcherGradient }}
        />
        <span
          aria-hidden
          className="absolute inset-[3px] rounded-full"
          style={{ background: "radial-gradient(circle at 30% 25%, #1b1830 0%, #07060f 70%)" }}
        />
        <span aria-hidden className="absolute inset-0 rounded-full ring-1 ring-white/15" />
        <span className="relative z-10 flex h-full w-full items-center justify-center text-white">
          {open ? (
            <X className="h-5 w-5" />
          ) : (
            <span className="font-display text-2xl leading-none">⚔️</span>
          )}
        </span>
        {!open && unread && (
          <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-[#07060f] animate-pulse" />
        )}
      </button>

      {/* Panel */}
      {open && (
        <div
          className="fixed bottom-24 right-6 z-50 flex h-[min(74vh,620px)] w-[min(94vw,420px)] flex-col overflow-hidden rounded-[28px] border border-white/10 shadow-[0_40px_120px_-20px_rgba(139,92,246,0.45)] animate-[fadeIn_0.3s_ease]"
          style={{
            background:
              "linear-gradient(180deg, rgba(20,16,40,0.92) 0%, rgba(7,6,15,0.96) 100%)",
            backdropFilter: "blur(18px)",
          }}
        >
          {/* Gradient top accent */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 -top-px h-px"
            style={{ background: "linear-gradient(90deg, transparent, #a78bfa, #22d3ee, transparent)" }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full opacity-40 blur-3xl"
            style={{ background: "radial-gradient(circle, #8b5cf6, transparent 70%)" }}
          />

          {/* Header */}
          <div className="relative flex items-center gap-3 border-b border-white/10 px-4 py-3.5">
            <div className="relative grid h-10 w-10 place-items-center rounded-full">
              <span
                aria-hidden
                className="absolute inset-0 rounded-full animate-[spin_6s_linear_infinite] opacity-90"
                style={{ background: launcherGradient }}
              />
              <span
                aria-hidden
                className="absolute inset-[2px] rounded-full"
                style={{ background: "#0b0918" }}
              />
              <Sparkles className="relative z-10 h-4 w-4 text-white" />
              <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-[#0b0918]" />
            </div>
            <div className="flex-1">
              <div className="font-display text-sm font-semibold tracking-wide">
                ⚔️ Warrior
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-white/55">
                <span className="h-1 w-1 rounded-full bg-emerald-400" />
                Online · usually replies instantly
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="rounded-full p-1.5 text-white/60 hover:bg-white/5 hover:text-white"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="relative flex-1 space-y-3 overflow-y-auto px-4 py-4 text-sm">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[88%] ${m.role === "user" ? "items-end" : "items-start"} flex flex-col gap-2`}>
                  <div
                    className={`whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 leading-relaxed ${
                      m.role === "user"
                        ? "bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-[0_10px_30px_-12px_rgba(139,92,246,0.6)]"
                        : "border border-white/10 bg-white/[0.04] text-white/90"
                    }`}
                  >
                    {m.text}
                    {m.role === "assistant" && typing && i === msgs.length - 1 && (
                      <span className="ml-1 inline-flex gap-1 align-middle">
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/70 [animation-delay:-0.3s]" />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/70 [animation-delay:-0.15s]" />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/70" />
                      </span>
                    )}
                  </div>
                  {m.cta && (
                    <div className="flex flex-wrap gap-2">
                      {m.cta.map((c) => {
                        const Icon = c.icon;
                        const cls =
                          "inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.05] px-3 py-1.5 text-[11px] font-medium text-white/90 transition-colors hover:border-violet-400/60 hover:text-white hover:bg-white/[0.08]";
                        return c.href ? (
                          <a key={c.label} href={c.href} target="_blank" rel="noreferrer" className={cls}>
                            {Icon && <Icon className="h-3.5 w-3.5" />}
                            {c.label}
                          </a>
                        ) : (
                          <button key={c.label} onClick={c.action} className={cls}>
                            {Icon && <Icon className="h-3.5 w-3.5" />}
                            {c.label}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>

          {/* Composer */}
          <div className="relative border-t border-white/10 px-3 pt-2.5">
            <div className="mb-2 flex flex-wrap gap-1.5">
              {QUICK.map(({ label, icon: Icon }) => (
                <button
                  key={label}
                  onClick={() => send(label)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-white/75 transition-colors hover:border-violet-400/50 hover:text-white"
                >
                  <Icon className="h-3 w-3" />
                  {label}
                </button>
              ))}
            </div>
            <form
              onSubmit={(e) => { e.preventDefault(); send(input); }}
              className="relative flex items-center gap-2 pb-3"
            >
              <div className="relative flex-1">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask Warrior anything…"
                  className="w-full rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm outline-none transition-colors focus:border-violet-400/60 focus:bg-white/[0.06]"
                />
              </div>
              <button
                type="submit"
                aria-label="Send"
                className="relative grid h-10 w-10 place-items-center rounded-full text-white transition-transform hover:scale-105"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-full"
                  style={{ background: "linear-gradient(135deg, #8b5cf6, #3b82f6)" }}
                />
                <Send className="relative z-10 h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
