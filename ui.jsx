/* ============================================================
   LiveLens — UI primitives + icon set
   ============================================================ */
const { useState, useEffect, useRef } = React;

/* ---------------- ICONS ---------------- */
const Ic = {
  logo: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="3.4" fill="currentColor" />
      <path d="M12 1.5v3M12 19.5v3M1.5 12h3M19.5 12h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  search: (p) => (<svg viewBox="0 0 24 24" fill="none" {...p}><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.7"/><path d="M20 20l-3.2-3.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>),
  plug: (p) => (<svg viewBox="0 0 24 24" fill="none" {...p}><path d="M9 2v6M15 2v6M6 8h12v3a6 6 0 01-12 0V8zM12 17v5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  globe: (p) => (<svg viewBox="0 0 24 24" fill="none" {...p}><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7"/><path d="M3 12h18M12 3c2.8 2.5 2.8 15 0 18M12 3c-2.8 2.5-2.8 15 0 18" stroke="currentColor" strokeWidth="1.4"/></svg>),
  star: (p) => (<svg viewBox="0 0 24 24" fill="none" {...p}><path d="M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.8 6.6 19.5l1.2-6L3.3 9.3l6.1-.7L12 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>),
  trend: (p) => (<svg viewBox="0 0 24 24" fill="none" {...p}><path d="M3 17l5.5-5.5 3.5 3.5L21 6M21 6h-5M21 6v5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  brain: (p) => (<svg viewBox="0 0 24 24" fill="none" {...p}><path d="M9 4a3 3 0 00-3 3 3 3 0 00-2 5 3 3 0 002 5 3 3 0 006 0V5a3 3 0 00-3-1zM15 4a3 3 0 013 3 3 3 0 012 5 3 3 0 01-2 5 3 3 0 01-6 0" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>),
  grid: (p) => (<svg viewBox="0 0 24 24" fill="none" {...p}><rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.7"/><rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.7"/><rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.7"/><rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.7"/></svg>),
  history: (p) => (<svg viewBox="0 0 24 24" fill="none" {...p}><path d="M3 12a9 9 0 109-9 9 9 0 00-7 3.3M3 4v3.3H6.3M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  settings: (p) => (<svg viewBox="0 0 24 24" fill="none" {...p}><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.7"/><path d="M12 2v2.5M12 19.5V22M22 12h-2.5M4.5 12H2M19 5l-1.8 1.8M6.8 17.2L5 19M19 19l-1.8-1.8M6.8 6.8L5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>),
  plus: (p) => (<svg viewBox="0 0 24 24" fill="none" {...p}><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round"/></svg>),
  arrow: (p) => (<svg viewBox="0 0 24 24" fill="none" {...p}><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  back: (p) => (<svg viewBox="0 0 24 24" fill="none" {...p}><path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  check: (p) => (<svg viewBox="0 0 24 24" fill="none" {...p}><path d="M4 12.5l5 5L20 6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  x: (p) => (<svg viewBox="0 0 24 24" fill="none" {...p}><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>),
  share: (p) => (<svg viewBox="0 0 24 24" fill="none" {...p}><circle cx="6" cy="12" r="2.4" stroke="currentColor" strokeWidth="1.6"/><circle cx="18" cy="6" r="2.4" stroke="currentColor" strokeWidth="1.6"/><circle cx="18" cy="18" r="2.4" stroke="currentColor" strokeWidth="1.6"/><path d="M8.1 11l7.8-4M8.1 13l7.8 4" stroke="currentColor" strokeWidth="1.6"/></svg>),
  download: (p) => (<svg viewBox="0 0 24 24" fill="none" {...p}><path d="M12 3v12M7 10l5 5 5-5M4 20h16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  ext: (p) => (<svg viewBox="0 0 24 24" fill="none" {...p}><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  building: (p) => (<svg viewBox="0 0 24 24" fill="none" {...p}><path d="M4 21V5a1 1 0 011-1h9a1 1 0 011 1v16M15 21V9h4a1 1 0 011 1v11M4 21h17M8 8h3M8 12h3M8 16h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  users: (p) => (<svg viewBox="0 0 24 24" fill="none" {...p}><circle cx="9" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.6"/><path d="M3.5 20a5.5 5.5 0 0111 0M16 5.5a3.2 3.2 0 010 5M17.5 14.5a5.5 5.5 0 013 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>),
  news: (p) => (<svg viewBox="0 0 24 24" fill="none" {...p}><path d="M4 5h13a1 1 0 011 1v12a2 2 0 002-2V8M4 5a1 1 0 00-1 1v12a2 2 0 002 2h13M7 9h7M7 13h7M7 17h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  shield: (p) => (<svg viewBox="0 0 24 24" fill="none" {...p}><path d="M12 3l8 3v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>),
  bolt: (p) => (<svg viewBox="0 0 24 24" fill="none" {...p}><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>),
  copy: (p) => (<svg viewBox="0 0 24 24" fill="none" {...p}><rect x="9" y="9" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.6"/><path d="M5 15V5a2 2 0 012-2h10" stroke="currentColor" strokeWidth="1.6"/></svg>),
  doc: (p) => (<svg viewBox="0 0 24 24" fill="none" {...p}><path d="M6 3h8l4 4v14a1 1 0 01-1 1H6a1 1 0 01-1-1V4a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/><path d="M14 3v4h4M8 13h8M8 17h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>),
  layers: (p) => (<svg viewBox="0 0 24 24" fill="none" {...p}><path d="M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5M3 16.5l9 5 9-5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>),
};

/* ---------------- LOGO ---------------- */
function Logo({ size = 26, withText = true }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <span style={{ color: "var(--acc)", display: "flex" }}>
        <Ic.logo style={{ width: size, height: size }} />
      </span>
      {withText && (
        <span style={{ fontWeight: 600, fontSize: 17, letterSpacing: "-0.01em" }}>
          Live<span style={{ color: "var(--acc)" }}>Lens</span>
        </span>
      )}
    </div>
  );
}

/* ---------------- BUTTON ---------------- */
function Btn({ variant = "primary", size, icon, iconRight, block, children, ...rest }) {
  const cls = `btn btn-${variant}${size === "lg" ? " btn-lg" : ""}${block ? " btn-block" : ""}`;
  return (
    <button className={cls} {...rest}>
      {icon}
      {children}
      {iconRight}
    </button>
  );
}

/* ---------------- VERDICT BADGE ---------------- */
const VERDICT_MAP = {
  BUY_SIGNAL: { cls: "buy", label: "BUY SIGNAL" },
  WATCH: { cls: "watch", label: "WATCH" },
  RED_FLAG: { cls: "flag", label: "RED FLAG" },
};
function VerdictBadge({ verdict }) {
  const v = VERDICT_MAP[verdict] || VERDICT_MAP.WATCH;
  return (
    <span className={`badge ${v.cls}`}>
      <span className="tick" />
      {v.label}
    </span>
  );
}

/* ---------------- SENTIMENT BAR ---------------- */
function SentimentBar({ score, animate = true }) {
  const [w, setW] = useState(animate ? 0 : score);
  useEffect(() => {
    if (!animate) return;
    const t = setTimeout(() => setW(score), 120);
    return () => clearTimeout(t);
  }, [score, animate]);
  const color = score >= 70 ? "var(--buy)" : score >= 45 ? "var(--watch)" : "var(--flag)";
  return (
    <div style={{ width: "100%" }}>
      <div style={{ height: 8, background: "var(--surface-2)", borderRadius: 20, overflow: "hidden", border: "1px solid var(--border-soft)" }}>
        <div style={{ height: "100%", width: `${w}%`, background: color, borderRadius: 20, transition: "width 1.1s cubic-bezier(0.22,1,0.36,1)", boxShadow: `0 0 12px ${color}` }} />
      </div>
    </div>
  );
}

Object.assign(window, { Ic, Logo, Btn, VerdictBadge, SentimentBar, VERDICT_MAP });
