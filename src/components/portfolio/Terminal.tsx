import { useEffect, useRef, useState } from "react";
import { TerminalSquare, X } from "lucide-react";
import { HARSH, SKILLS, PROJECTS } from "./data";

type Line = { type: "in" | "out"; text: string };

const HELP = `Available commands:
  help        Show this help
  about       Who is Harsh
  skills      List skills
  projects    List projects
  resume      Download resume
  github      Open GitHub
  linkedin    Open LinkedIn
  contact     Contact details
  clear       Clear terminal`;

export function Terminal() {
  const [open, setOpen] = useState(false);
  const [history, setHistory] = useState<Line[]>([
    { type: "out", text: "Welcome to harsh.os v1.0.0 — type 'help' to begin." },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  // Konami code
  useEffect(() => {
    const seq = [
      "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
      "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
      "b", "a",
    ];
    let i = 0;
    const h = (e: KeyboardEvent) => {
      const k = e.key;
      if (k.toLowerCase() === seq[i].toLowerCase()) {
        i++;
        if (i === seq.length) {
          setOpen(true);
          setHistory((h) => [...h, { type: "out", text: "🟢 HACKER MODE UNLOCKED" }]);
          i = 0;
        }
      } else {
        i = 0;
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, open]);

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    const add = (out: string) =>
      setHistory((h) => [...h, { type: "in", text: `$ ${raw}` }, { type: "out", text: out }]);
    switch (cmd) {
      case "":
        return;
      case "help":
        return add(HELP);
      case "about":
        return add(`${HARSH.name} — ${HARSH.title}\n${HARSH.summary}`);
      case "skills":
        return add(SKILLS.map((s) => `• ${s.name}`).join("\n"));
      case "projects":
        return add(PROJECTS.map((p) => `• ${p.name} — ${p.tag}`).join("\n"));
      case "resume":
        window.open(HARSH.resumeUrl, "_blank");
        return add("Opening resume.pdf …");
      case "github":
        window.open(HARSH.github, "_blank");
        return add("Opening GitHub…");
      case "linkedin":
        window.open(HARSH.linkedin, "_blank");
        return add("Opening LinkedIn…");
      case "contact":
        return add(`email:    ${HARSH.email}\nphone:    ${HARSH.phone}\nlinkedin: ${HARSH.linkedin}\ngithub:   ${HARSH.github}`);
      case "clear":
        setHistory([]);
        return;
      case "python --version":
        return add("Python 3.12.1");
      case "docker ps":
        return add("CONTAINER ID   IMAGE          STATUS\n9a1b2c3d4e5f   harsh/api      Up 42 hours\n8d7e6f5a4b3c   harsh/worker   Up 42 hours");
      case "kubectl get pods":
        return add("NAME                     READY   STATUS    AGE\napi-7d9c8f6b4-xkz2q      1/1     Running   2d\nworker-66cfd84d-9hbqv    1/1     Running   2d");
      case "fastapi run":
        return add("INFO: Uvicorn running on http://0.0.0.0:8000\nINFO: Application startup complete.");
      default:
        return add(`command not found: ${cmd}`);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 left-6 z-50 grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-white/[0.05] text-white/80 backdrop-blur transition-all hover:scale-105 hover:border-[#ffffff]/60 hover:text-[#ffffff]"
        data-magnetic
        aria-label="Open terminal"
      >
        <TerminalSquare className="h-5 w-5" />
      </button>

      {open && (
        <div className="fixed bottom-24 left-6 z-50 w-[min(92vw,560px)] overflow-hidden rounded-2xl border border-white/15 bg-[#070914]/95 font-mono text-sm shadow-[0_30px_80px_-20px_rgba(220,224,230,0.4)] backdrop-blur-xl animate-[fadeIn_0.3s_ease]">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-500/70" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
              <span className="h-3 w-3 rounded-full bg-green-500/70" />
              <span className="ml-3 text-xs text-white/50">harsh@portfolio — zsh</span>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/40 hover:text-white">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="max-h-[55vh] overflow-y-auto px-4 py-3 text-[12.5px] leading-relaxed">
            {history.map((l, i) => (
              <pre
                key={i}
                className={`whitespace-pre-wrap ${l.type === "in" ? "text-white/90" : "text-[#ffffff]/85"}`}
              >
                {l.text}
              </pre>
            ))}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                run(input);
                setInput("");
              }}
              className="mt-2 flex items-center gap-2"
            >
              <span className="text-[#6b7079]">$</span>
              <input
                autoFocus
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent text-white outline-none"
                placeholder="type 'help'"
              />
            </form>
            <div ref={endRef} />
          </div>
        </div>
      )}
    </>
  );
}
