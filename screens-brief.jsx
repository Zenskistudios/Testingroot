/* ============================================================
   LiveLens — Full intelligence brief
   ============================================================ */
const { useState, useEffect, useRef } = React;

// Build a brief object for any history id (Bright Data = full data).
function buildBrief(id) {
  const meta = HISTORY.find((h) => h.id === id) || HISTORY[0];
  if (meta.full) return BRIGHTDATA_BRIEF;
  const reasons = {
    BUY_SIGNAL: "Multiple independent growth signals with positive sentiment and a manageable risk surface. Momentum is corroborated across news, hiring, and review data.",
    WATCH: "Mixed signals. Real traction is offset by execution and market-timing uncertainty. Worth tracking, not yet a conviction call.",
    RED_FLAG: "Converging negative indicators across sentiment, retention, and recent news. Material risks outweigh the visible upside at this stage.",
  };
  return {
    ...BRIGHTDATA_BRIEF,
    company_name: meta.company_name,
    company_url: meta.company_url,
    tagline: meta.tagline,
    verdict: meta.verdict,
    verdict_reason: reasons[meta.verdict],
    sources_count: meta.sources,
    overview: { ...BRIGHTDATA_BRIEF.overview, industry: meta.industry },
    sentiment: { ...BRIGHTDATA_BRIEF.sentiment, score: meta.sentiment, label: meta.sentiment >= 70 ? "Positive" : meta.sentiment >= 45 ? "Mixed" : "Negative" },
  };
}

/* ---- section wrapper ---- */
function Section({ icon, title, count, children, delay = 0 }) {
  return (
    <section className="card fade-up" style={{ animationDelay: `${delay}s`, overflow: "hidden" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "15px 20px", borderBottom: "1px solid var(--border-soft)" }}>
        <span style={{ color: "var(--acc)", display: "flex" }}>{React.cloneElement(icon, { style: { width: 17, height: 17 } })}</span>
        <h2 style={{ fontSize: 14, fontWeight: 600, letterSpacing: "0.01em", whiteSpace: "nowrap" }}>{title}</h2>
        {count != null && <span className="mono" style={{ fontSize: 11.5, color: "var(--tx-3)", marginLeft: "auto" }}>{count}</span>}
      </div>
      <div style={{ padding: 20 }}>{children}</div>
    </section>
  );
}

/* ---- share modal ---- */
function ShareModal({ brief, onClose }) {
  const [pub, setPub] = useState(false);
  const [copied, setCopied] = useState(false);
  const link = `livelens.ai/s/${brief.company_url.split(".")[0]}-7f3a9c`;
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(2,3,4,0.72)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50, padding: 20 }} className="fade-in">
      <div onClick={(e) => e.stopPropagation()} className="card" style={{ width: "100%", maxWidth: 440, padding: 24 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
          <h2 style={{ fontSize: 17, fontWeight: 600 }}>Share brief</h2>
          <button onClick={onClose} className="btn btn-bare" style={{ padding: 6 }}><Ic.x style={{ width: 17, height: 17 }} /></button>
        </div>
        <p style={{ color: "var(--tx-2)", fontSize: 13.5, marginBottom: 20 }}>Generate a public read-only link to this {brief.company_name} brief.</p>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", border: "1px solid var(--border)", borderRadius: 10, marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 500 }}>Public link</div>
            <div className="mono" style={{ fontSize: 11.5, color: "var(--tx-3)" }}>Anyone with the link can view</div>
          </div>
          <button onClick={() => setPub(!pub)} style={{ width: 44, height: 25, borderRadius: 20, background: pub ? "var(--acc)" : "var(--surface-3)", position: "relative", transition: "background 0.18s", flexShrink: 0 }}>
            <span style={{ position: "absolute", top: 3, left: pub ? 22 : 3, width: 19, height: 19, borderRadius: 50, background: pub ? "#05140e" : "var(--tx-3)", transition: "left 0.18s" }} />
          </button>
        </div>

        {pub && (
          <div className="fade-in" style={{ display: "flex", gap: 8 }}>
            <div className="mono input" style={{ display: "flex", alignItems: "center", fontSize: 12.5, color: "var(--acc)", overflow: "hidden", whiteSpace: "nowrap" }}>{link}</div>
            <Btn variant="ghost" icon={copied ? <Ic.check /> : <Ic.copy />} onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 1600); }}>{copied ? "Copied" : "Copy"}</Btn>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---- key fact ---- */
function Fact({ label, value }) {
  return (
    <div>
      <div className="kicker" style={{ marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 14.5, fontWeight: 500 }}>{value}</div>
    </div>
  );
}

/* ================= BRIEF ================= */
function Brief({ navigate, briefId }) {
  const brief = buildBrief(briefId);
  const [share, setShare] = useState(false);
  const [exported, setExported] = useState(false);
  const freshness = new Date(brief.data_freshness).toLocaleString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar route="brief" navigate={navigate} />
      <main style={{ flex: 1, minWidth: 0 }}>
        {/* top bar */}
        <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 32px", borderBottom: "1px solid var(--border-soft)", position: "sticky", top: 0, background: "rgba(7,8,9,0.82)", backdropFilter: "blur(12px)", zIndex: 5, gap: 14 }}>
          <button onClick={() => navigate("history")} className="btn btn-bare" style={{ gap: 8 }}><Ic.back style={{ width: 17, height: 17 }} /> History</button>
          <div style={{ display: "flex", gap: 8 }}>
            <Btn variant="ghost" icon={<Ic.share />} onClick={() => setShare(true)}>Share</Btn>
            <Btn variant="ghost" icon={exported ? <Ic.check /> : <Ic.download />} onClick={() => { setExported(true); setTimeout(() => setExported(false), 1800); }}>{exported ? "Exported" : "Export PDF"}</Btn>
            <Btn icon={<Ic.search />} onClick={() => navigate("research")}>Re-run</Btn>
          </div>
        </header>

        <div style={{ maxWidth: 880, margin: "0 auto", padding: "34px 32px 70px" }}>
          {/* identity */}
          <div className="fade-up" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
            <div style={{ display: "flex", gap: 16 }}>
              <div style={{ width: 54, height: 54, borderRadius: 13, background: "var(--surface-2)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--acc)", flexShrink: 0 }}>
                <Ic.building style={{ width: 26, height: 26 }} />
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                  <h1 style={{ fontSize: 28, fontWeight: 600, letterSpacing: "-0.02em" }}>{brief.company_name}</h1>
                  <VerdictBadge verdict={brief.verdict} />
                </div>
                <p style={{ color: "var(--tx-2)", fontSize: 15, marginTop: 4 }}>{brief.tagline}</p>
                <a className="mono" style={{ fontSize: 12.5, color: "var(--tx-3)", display: "inline-flex", alignItems: "center", gap: 5, marginTop: 8 }}>
                  {brief.company_url} <Ic.ext style={{ width: 12, height: 12 }} />
                </a>
              </div>
            </div>
            <div className="mono" style={{ fontSize: 11.5, color: "var(--tx-3)", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, whiteSpace: "nowrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}><span className="live-dot" style={{ width: 6, height: 6 }} /> live data</div>
              <div>{brief.sources_count} sources</div>
              <div>scraped {freshness}</div>
            </div>
          </div>

          {/* verdict reason */}
          <div className="card fade-up" style={{ marginTop: 26, padding: "18px 20px", borderLeft: `2px solid ${brief.verdict === "BUY_SIGNAL" ? "var(--buy)" : brief.verdict === "WATCH" ? "var(--watch)" : "var(--flag)"}`, animationDelay: "0.05s" }}>
            <div className="kicker" style={{ marginBottom: 8 }}>Verdict rationale</div>
            <p style={{ fontSize: 15.5, lineHeight: 1.6, color: "var(--tx)" }}>{brief.verdict_reason}</p>
          </div>

          {/* overview */}
          <div style={{ marginTop: 16 }}>
            <Section icon={<Ic.building />} title="Company overview" delay={0.1}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 22 }}>
                <Fact label="Founded" value={brief.overview.founded} />
                <Fact label="HQ" value={brief.overview.headquarters} />
                <Fact label="Industry" value={brief.overview.industry} />
                <Fact label="Employees" value={brief.overview.employees} />
                <Fact label="Stage" value={brief.overview.stage} />
              </div>
            </Section>
          </div>

          {/* sentiment */}
          <div style={{ marginTop: 16 }}>
            <Section icon={<Ic.trend />} title="Market sentiment" delay={0.14}>
              <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 16, flexWrap: "wrap" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                  <span style={{ fontSize: 40, fontWeight: 600, letterSpacing: "-0.02em", color: brief.sentiment.score >= 70 ? "var(--buy)" : brief.sentiment.score >= 45 ? "var(--watch)" : "var(--flag)" }}>{brief.sentiment.score}</span>
                  <span className="mono" style={{ fontSize: 13, color: "var(--tx-3)" }}>/ 100</span>
                </div>
                <div style={{ flex: 1, minWidth: 180 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 500, marginBottom: 8 }}>{brief.sentiment.label}</div>
                  <SentimentBar score={brief.sentiment.score} />
                </div>
              </div>
              <p style={{ color: "var(--tx-2)", fontSize: 14, lineHeight: 1.6 }}>{brief.sentiment.summary}</p>
            </Section>
          </div>

          {/* signals + risks two-up */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }} className="brief-two">
            <Section icon={<Ic.bolt />} title="Growth signals" count={brief.growth_signals.length} delay={0.18}>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {brief.growth_signals.map((g, i) => (
                  <div key={i} style={{ display: "flex", gap: 12 }}>
                    <span className={`sev ${g.strength}`} style={{ flexShrink: 0, marginTop: 1 }}>{g.strength}</span>
                    <div>
                      <div style={{ fontSize: 13.5, lineHeight: 1.45 }}>{g.signal}</div>
                      <div className="mono" style={{ fontSize: 11, color: "var(--tx-3)", marginTop: 3 }}>{g.source}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Section>
            <Section icon={<Ic.shield />} title="Risk flags" count={brief.risk_flags.length} delay={0.22}>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {brief.risk_flags.map((r, i) => (
                  <div key={i} style={{ display: "flex", gap: 12 }}>
                    <span className={`sev ${r.severity} risk`} style={{ flexShrink: 0, marginTop: 1 }}>{r.severity}</span>
                    <div>
                      <div style={{ fontSize: 13.5, lineHeight: 1.45 }}>{r.flag}</div>
                      <div className="mono" style={{ fontSize: 11, color: "var(--tx-3)", marginTop: 3 }}>{r.source}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          </div>

          {/* key people */}
          <div style={{ marginTop: 16 }}>
            <Section icon={<Ic.users />} title="Key people" count={brief.key_people.length} delay={0.26}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 16 }}>
                {brief.key_people.map((p, i) => (
                  <div key={i} style={{ display: "flex", gap: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 50, background: "var(--surface-2)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, color: "var(--tx-2)", flexShrink: 0 }}>
                      {p.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 500 }}>{p.name}</div>
                      <div className="mono" style={{ fontSize: 11, color: "var(--acc)", marginBottom: 5 }}>{p.role}</div>
                      <div style={{ fontSize: 12.5, color: "var(--tx-2)", lineHeight: 1.5 }}>{p.notable}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          </div>

          {/* recent news */}
          <div style={{ marginTop: 16 }}>
            <Section icon={<Ic.news />} title="Recent news" count={brief.recent_news.length} delay={0.3}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {brief.recent_news.map((n, i) => (
                  <div key={i} style={{ display: "flex", gap: 16, padding: "12px 0", borderTop: i ? "1px solid var(--border-soft)" : "none" }}>
                    <span className="mono" style={{ fontSize: 11.5, color: "var(--tx-3)", width: 78, flexShrink: 0, paddingTop: 2 }}>{n.date}</span>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 500, lineHeight: 1.4 }}>{n.headline}</div>
                      <div style={{ fontSize: 12.5, color: "var(--tx-2)", marginTop: 4, lineHeight: 1.5 }}>{n.significance}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          </div>

          {/* competitive position */}
          <div style={{ marginTop: 16 }}>
            <Section icon={<Ic.layers />} title="Competitive position" delay={0.34}>
              <p style={{ color: "var(--tx)", fontSize: 14.5, lineHeight: 1.65 }}>{brief.competitive_position}</p>
            </Section>
          </div>

          {/* footer */}
          <div className="mono fade-up" style={{ marginTop: 26, paddingTop: 18, borderTop: "1px solid var(--border-soft)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10, fontSize: 11.5, color: "var(--tx-3)" }}>
            <span>Synthesized by claude-sonnet-4 · {brief.sources_count} live sources via Bright Data MCP</span>
            <span>scraped {freshness}</span>
          </div>
        </div>
      </main>

      {share && <ShareModal brief={brief} onClose={() => setShare(false)} />}
    </div>
  );
}

Object.assign(window, { Brief, buildBrief, ShareModal });
