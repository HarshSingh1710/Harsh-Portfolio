import { useEffect, useState } from "react";

const LOGS = [
  "› Initializing FastAPI runtime...",
  "› Connecting PostgreSQL cluster...",
  "› Spinning up microservices...",
  "› Loading OpenAI bridge...",
  "› Deploying portfolio...",
  "› Welcome, Harsh Singh.",
];

export function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [pct, setPct] = useState(0);
  const [line, setLine] = useState(0);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    let p = 0;
    const id = setInterval(() => {
      p = Math.min(100, p + Math.random() * 9 + 3);
      setPct(p);
      setLine(Math.floor((p / 100) * (LOGS.length - 1)));
      if (p >= 100) {
        clearInterval(id);
        setTimeout(() => setHide(true), 400);
        setTimeout(onDone, 900);
      }
    }, 130);
    return () => clearInterval(id);
  }, [onDone]);

  return (
    <div
      className={`fixed inset-0 z-[200] grid place-items-center bg-[#000000] transition-opacity duration-500 ${
        hide ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="bg-aurora pointer-events-none absolute inset-0 opacity-50" />
      <div className="relative w-[min(92vw,560px)] font-mono text-sm">
        <div className="mb-6 font-display text-2xl gradient-text">harsh.singh@dev:~$</div>
        <div className="space-y-1 text-[#ffffff]/90">
          {LOGS.slice(0, line + 1).map((l, i) => (
            <div key={i} className="opacity-90">{l}</div>
          ))}
        </div>
        <div className="mt-6 h-[3px] w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full bg-[linear-gradient(90deg,#d4d7dd,#ffffff,#6b7079)] shadow-[0_0_18px_#ffffff]"
            style={{ width: `${pct}%`, transition: "width 120ms linear" }}
          />
        </div>
        <div className="mt-2 flex justify-between text-[11px] text-white/50">
          <span>booting…</span>
          <span>{Math.floor(pct)}%</span>
        </div>
      </div>
    </div>
  );
}
