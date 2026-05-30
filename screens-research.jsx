/* ============================================================
   LiveLens — Research stream (the demo moment) + Full Brief
   ============================================================ */
const { useState, useEffect, useRef } = React;

/* ================= RESEARCH STREAM ================= */
function Research({ navigate, initialCompany }) {
  const [phase, setPhase] = useState("input"); // input | running | done
  const [company, setCompany] = useState(initialCompany || "");
  const [url, setUrl] = useState("");
  const [step, setStep] = useState(-1);          // index of current step
  const [lines, setLines] = useState([]);        // rendered log lines
  const [sources, setSources] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const timers = useRef([]);

  const clearAll = () => { timers.current.forEach(clearTimeout); timers.current = []; };
  useEffect(() => () => clearAll(), []);

  const pushLine = (line) => setLines((L) => [...L, line]);

  const start = () => {
    const name = company.trim() || "Bright Data";
    setCompany(name);
    setPhase("running");
    setLines([]); setStep(-1); setSources(0); setElapsed(0);

    // elapsed timer
    const t0 = Date.now();
    const elapsedTimer = setInterval(() => setElapsed((Date.now() - t0) / 1000), 100);
    timers.current.push({ _i: elapsedTimer });

    const STEP_MS = 1450;
    let delay = 350;
    let prevSrc = 0;

    RESEARCH_STEPS.forEach((s, i) => {
      // header
      timers.current.push(setTimeout(() => {
        setStep(i);
        pushLine({ type: "head", icon: s.icon, text: s.message, key: `h${i}` });
        // animate source counter toward target across this step
        const from = prevSrc, to = s.sources, dur = STEP_MS - 200;
        const c0 = Date.now();
        const ci = setInterval(() => {
          const p = Math.min(1, (Date.now() - c0) / dur);
          setSources(Math.round(from + (to - from) * p));
          if (p >= 1) clearInterval(ci);
        }, 40);
        timers.current.push({ _i: ci });
        prevSrc = to;
      }, delay));
      // sublines
      s.tools.forEach((tool, j) => {
        timers.current.push(setTimeout(() => pushLine({ type: "tool", text: tool, key: `t${i}-${j}` }), delay + 380 + j * 280));
      });
      delay += STEP_MS;
    });

    // finish
    timers.current.push(setTimeout(() => {
      clearInterval(elapsedTimer);
      setPhase("done");
    }, delay + 250));
  };

  // auto-start if launched with a company
  useEffect(() => {
    if (initialCompany) { setCompany(initialCompany); }
  }, [initialCompany]);

  const pct = phase === "done" ? 100 : Math.round(((step + 1) / RESEARCH_STEPS.length) * 100);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar route="research" navigate={navigate} />
      <main style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        <header style={{ display: "flex", alignItems: "center", gap: 14, padding: "22px 32px", borderBottom: "1px solid var(--border-soft)" }}>
          <button onClick={() => navigate("dashboard")} className="btn btn-bare" style={{ padding: 8 }}><Ic.back style={{ width: 18, height: 18 }} /></button>
          <div>
            <div className="kicker" style={{ marginBottom: 5 }}>New research</div>
            <h1 style={{ fontSize: 21, fontWeight: 600 }}>{phase === "input" ? "Analyze a company" : company}</h1>
          </div>
        </header>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "0 24px" }}>
          {phase === "input" ? (
            <div className="fade-up" style={{ width: "100%", maxWidth: 560, margin: "auto", padding: "40px 0" }}>
              <h2 style={{ fontSize: 28, fontWeight: 600, letterSpacing: "-0.02em", textAlign: "center", marginBottom: 10 }}>Who are we researching?</h2>
              <p style={{ color: "var(--tx-2)", textAlign: "center", marginBottom: 30 }}>Claude will scrape 60+ live sources and synthesize a structured brief.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <label className="field-label">Company name</label>
                  <input className="input" autoFocus value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Bright Data" onKeyDown={(e) => e.key === "Enter" && start()} style={{ fontSize: 16, padding: "14px 16px" }} />
                </div>
                <div>
                  <label className="field-label">Website <span style={{ textTransform: "none", letterSpacing: 0 }}>(optional)</span></label>
                  <input className="input" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="brightdata.com" onKeyDown={(e) => e.key === "Enter" && start()} />
                </div>
                <Btn size="lg" block icon={<Ic.search />} onClick={start} style={{ marginTop: 6 }}>Run live research</Btn>
                <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginTop: 6 }}>
                  {["Bright Data", "Stripe", "OpenAI"].map((s) => (
                    <button key={s} onClick={() => setCompany(s)} className="badge" style={{ cursor: "pointer", padding: "6px 11px" }}>{s}</button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="fade-in" style={{ width: "100%", maxWidth: 720, margin: "0 auto", padding: "28px 0 60px" }}>
              {/* progress header */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  {phase === "running" ? <span className="live-dot" /> : <span style={{ color: "var(--acc)", display: "flex" }}><Ic.check style={{ width: 18, height: 18 }} /></span>}
                  <span className="mono" style={{ fontSize: 13, color: phase === "done" ? "var(--acc)" : "var(--tx-2)" }}>
                    {phase === "done" ? "Brief complete" : "Researching…"}
                  </span>
                </div>
                <div className="mono" style={{ fontSize: 12.5, color: "var(--tx-3)", display: "flex", gap: 18 }}>
                  <span><span style={{ color: "var(--acc)" }}>{sources}</span> sources</span>
                  <span>{elapsed.toFixed(1)}s</span>
                </div>
              </div>

              {/* progress bar */}
              <div style={{ height: 4, background: "var(--surface-2)", borderRadius: 20, overflow: "hidden", marginBottom: 22 }}>
                <div style={{ width: `${pct}%`, height: "100%", background: "var(--acc)", borderRadius: 20, transition: "width 0.5s ease", boxShadow: "0 0 12px var(--acc-glow)" }} />
              </div>

              {/* terminal log */}
              <div className="card" style={{ overflow: "hidden", borderColor: "var(--border-strong)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "11px 16px", borderBottom: "1px solid var(--border)", background: "var(--surface-2)" }}>
                  <Ic.layers style={{ width: 15, height: 15, color: "var(--tx-3)" }} />
                  <span className="mono" style={{ fontSize: 12, color: "var(--tx-3)" }}>bright_data_mcp · research_stream</span>
                </div>
                <div className="mono" style={{ padding: "18px 20px", fontSize: 13, lineHeight: 1.7, minHeight: 280 }}>
                  {lines.map((l) =>
                    l.type === "head" ? (
                      <div key={l.key} className="fade-up" style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 16, marginBottom: 2, color: "var(--tx)" }}>
                        <span style={{ color: "var(--acc)", display: "flex", flexShrink: 0 }}>{React.cloneElement(Ic[l.icon]({}), { style: { width: 15, height: 15 } })}</span>
                        <span style={{ fontWeight: 500 }}>{l.text}</span>
                      </div>
                    ) : (
                      <div key={l.key} className="fade-in" style={{ paddingLeft: 25, color: "var(--tx-3)", fontSize: 12.5, lineHeight: 1.65 }}>
                        <span style={{ color: "var(--acc-dim)" }}>›</span> {l.text}
                      </div>
                    )
                  )}
                  {phase === "running" && <span className="cursor-blink" style={{ display: "inline-block", width: 8, height: 15, background: "var(--acc)", marginLeft: 25, marginTop: 8, verticalAlign: "text-bottom" }} />}
                </div>
              </div>

              {phase === "done" && (
                <div className="fade-up" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 22, flexWrap: "wrap", gap: 14 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <VerdictBadge verdict="BUY_SIGNAL" />
                    <span className="mono" style={{ fontSize: 12.5, color: "var(--tx-3)" }}>{sources} sources · sentiment 81 · {elapsed.toFixed(0)}s</span>
                  </div>
                  <Btn iconRight={<Ic.arrow />} onClick={() => navigate("brief", { id: "bd-001" })}>View intelligence brief</Btn>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

Object.assign(window, { Research });
