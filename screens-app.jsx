/* ============================================================
   LiveLens — App shell + Dashboard, History, Settings
   ============================================================ */
const { useState, useEffect, useRef } = React;

/* ---------------- BriefCard (used in dashboard + history) ---------------- */
function BriefCard({ b, navigate }) {
  return (
    <button
      className="card brief-card"
      onClick={() => navigate("brief", { id: b.id })}
      style={{ textAlign: "left", padding: 0, overflow: "hidden", cursor: "pointer", transition: "border-color 0.16s, transform 0.16s" }}
    >
      <div className="card-pad" style={{ padding: 18 }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
            <div style={{ width: 38, height: 38, borderRadius: 9, background: "var(--surface-2)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--tx-2)", flexShrink: 0 }}>
              <Ic.building style={{ width: 19, height: 19 }} />
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontWeight: 600, fontSize: 15.5 }}>{b.company_name}</div>
              <div className="mono" style={{ fontSize: 11.5, color: "var(--tx-3)" }}>{b.company_url}</div>
            </div>
          </div>
          <VerdictBadge verdict={b.verdict} />
        </div>
        <p style={{ color: "var(--tx-2)", fontSize: 13.5, margin: "14px 0 16px", lineHeight: 1.5, minHeight: 40 }}>{b.tagline}</p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, width: 92, flexShrink: 0 }}>
            <div style={{ flex: 1 }}><SentimentBar score={b.sentiment} animate={false} /></div>
            <span className="mono" style={{ fontSize: 12, color: "var(--tx-2)" }}>{b.sentiment}</span>
          </div>
          <span className="mono" style={{ fontSize: 11.5, color: "var(--tx-3)", whiteSpace: "nowrap" }}>{b.sources} src · {b.created}</span>
        </div>
      </div>
    </button>
  );
}

/* ---------------- SIDEBAR ---------------- */
function Sidebar({ route, navigate }) {
  const items = [
    { id: "dashboard", icon: <Ic.grid />, label: "Dashboard" },
    { id: "history", icon: <Ic.history />, label: "History" },
    { id: "settings", icon: <Ic.settings />, label: "Settings" },
  ];
  const used = 1, limit = 3;
  return (
    <aside style={{ width: 240, borderRight: "1px solid var(--border)", background: "var(--surface)", display: "flex", flexDirection: "column", flexShrink: 0, position: "sticky", top: 0, height: "100vh" }}>
      <div onClick={() => navigate("landing")} style={{ padding: "22px 22px 24px", cursor: "pointer" }}><Logo /></div>

      <div style={{ padding: "0 14px" }}>
        <Btn block icon={<Ic.plus />} onClick={() => navigate("research")}>New research</Btn>
      </div>

      <nav style={{ padding: "22px 14px", display: "flex", flexDirection: "column", gap: 3 }}>
        {items.map((it) => {
          const active = route === it.id || (route === "brief" && it.id === "history");
          return (
            <button key={it.id} onClick={() => navigate(it.id)} className="nav-item" data-active={active}
              style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: 8, fontSize: 14, color: active ? "var(--tx)" : "var(--tx-2)", background: active ? "var(--surface-2)" : "transparent", fontWeight: active ? 500 : 400 }}>
              <span style={{ display: "flex", color: active ? "var(--acc)" : "var(--tx-3)" }}>{React.cloneElement(it.icon, { style: { width: 18, height: 18 } })}</span>
              {it.label}
            </button>
          );
        })}
      </nav>

      <div style={{ marginTop: "auto", padding: 14 }}>
        <div className="card" style={{ padding: 14, background: "var(--surface-2)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 9 }}>
            <span className="kicker">Free plan</span>
            <span className="mono" style={{ fontSize: 12, color: "var(--tx-2)" }}>{used}/{limit} today</span>
          </div>
          <div style={{ height: 6, background: "var(--surface-3)", borderRadius: 20, overflow: "hidden", marginBottom: 12 }}>
            <div style={{ width: `${(used / limit) * 100}%`, height: "100%", background: "var(--acc)", borderRadius: 20 }} />
          </div>
          <Btn variant="ghost" block icon={<Ic.bolt />} onClick={() => navigate("settings")} style={{ fontSize: 12, padding: "8px" }}>Upgrade to Pro</Btn>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 4px 4px" }}>
          <div style={{ width: 30, height: 30, borderRadius: 50, background: "linear-gradient(135deg, var(--acc-dim), #0c7a57)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#04140d" }}>AL</div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Ada Lovelace</div>
            <div className="mono" style={{ fontSize: 11, color: "var(--tx-3)" }}>analyst@vc.fund</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

/* ---------------- APP SHELL ---------------- */
function AppShell({ route, navigate, title, sub, action, children }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar route={route} navigate={navigate} />
      <main style={{ flex: 1, minWidth: 0, background: "var(--bg)" }}>
        <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "22px 32px", borderBottom: "1px solid var(--border-soft)", position: "sticky", top: 0, background: "rgba(7,8,9,0.82)", backdropFilter: "blur(12px)", zIndex: 5 }}>
          <div>
            {sub && <div className="kicker" style={{ marginBottom: 5 }}>{sub}</div>}
            <h1 style={{ fontSize: 21, fontWeight: 600, letterSpacing: "-0.01em" }}>{title}</h1>
          </div>
          {action}
        </header>
        <div style={{ padding: "30px 32px 60px", maxWidth: 1080, margin: "0 auto" }}>{children}</div>
      </main>
    </div>
  );
}

/* ---------------- DASHBOARD ---------------- */
function Dashboard({ navigate }) {
  const stats = [
    { label: "Briefs run", value: "6", sub: "all time" },
    { label: "Buy signals", value: "3", sub: "50% of briefs" },
    { label: "Avg sentiment", value: "67", sub: "across portfolio" },
    { label: "Sources scanned", value: "313", sub: "live web pages" },
  ];
  return (
    <AppShell
      route="dashboard" navigate={navigate}
      sub="Welcome back, Ada"
      title="Dashboard"
      action={<Btn icon={<Ic.plus />} onClick={() => navigate("research")}>New research</Btn>}
    >
      {/* quick search */}
      <div className="card fade-up" style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 10px 10px 18px", marginBottom: 28, borderColor: "var(--border-strong)" }}>
        <span style={{ color: "var(--acc)", display: "flex" }}><Ic.search style={{ width: 19, height: 19 }} /></span>
        <input className="input" style={{ border: "none", background: "transparent", boxShadow: "none", padding: "10px 0" }} placeholder="Research a company — try “Bright Data”" onKeyDown={(e) => e.key === "Enter" && navigate("research")} />
        <Btn icon={<Ic.search />} onClick={() => navigate("research")}>Analyze</Btn>
      </div>

      {/* stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 14, marginBottom: 34 }}>
        {stats.map((s, i) => (
          <div key={i} className="card card-pad fade-up" style={{ padding: 18, animationDelay: `${i * 0.05}s` }}>
            <div className="kicker">{s.label}</div>
            <div style={{ fontSize: 30, fontWeight: 600, margin: "8px 0 2px", letterSpacing: "-0.02em" }}>{s.value}</div>
            <div className="mono" style={{ fontSize: 11.5, color: "var(--tx-3)" }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* recent */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <h2 style={{ fontSize: 16, fontWeight: 600 }}>Recent briefs</h2>
        <button onClick={() => navigate("history")} className="mono" style={{ fontSize: 12.5, color: "var(--tx-2)", display: "flex", alignItems: "center", gap: 6 }}>
          View all <Ic.arrow style={{ width: 13, height: 13 }} />
        </button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
        {HISTORY.slice(0, 4).map((b, i) => (
          <div key={b.id} className="fade-up" style={{ animationDelay: `${0.1 + i * 0.05}s` }}>
            <BriefCard b={b} navigate={navigate} />
          </div>
        ))}
      </div>
    </AppShell>
  );
}

/* ---------------- HISTORY ---------------- */
function History({ navigate }) {
  const [filter, setFilter] = useState("ALL");
  const filters = ["ALL", "BUY_SIGNAL", "WATCH", "RED_FLAG"];
  const list = filter === "ALL" ? HISTORY : HISTORY.filter((b) => b.verdict === filter);
  return (
    <AppShell
      route="history" navigate={navigate}
      sub={`${HISTORY.length} briefs`}
      title="Research history"
      action={<Btn icon={<Ic.plus />} onClick={() => navigate("research")}>New research</Btn>}
    >
      <div style={{ display: "flex", gap: 8, marginBottom: 22, flexWrap: "wrap" }}>
        {filters.map((f) => (
          <button key={f} onClick={() => setFilter(f)} className="badge" style={{ cursor: "pointer", padding: "7px 13px", background: filter === f ? "var(--surface-3)" : "var(--surface)", borderColor: filter === f ? "var(--border-strong)" : "var(--border)", color: filter === f ? "var(--tx)" : "var(--tx-3)" }}>
            {f === "ALL" ? "All" : (VERDICT_MAP[f]?.label || f)}
          </button>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
        {list.map((b, i) => (
          <div key={b.id} className="fade-up" style={{ animationDelay: `${i * 0.04}s` }}>
            <BriefCard b={b} navigate={navigate} />
          </div>
        ))}
      </div>
    </AppShell>
  );
}

/* ---------------- SETTINGS ---------------- */
function Settings({ navigate }) {
  const [tier, setTier] = useState("free");
  const Row = ({ label, children }) => (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 0", borderBottom: "1px solid var(--border-soft)", gap: 20 }}>
      <span style={{ fontSize: 14, color: "var(--tx-2)" }}>{label}</span>
      {children}
    </div>
  );
  return (
    <AppShell route="settings" navigate={navigate} sub="Account" title="Settings">
      <div style={{ maxWidth: 640, display: "flex", flexDirection: "column", gap: 28 }}>
        {/* profile */}
        <section className="card card-pad fade-up">
          <h2 style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>Profile</h2>
          <div style={{ marginTop: 10 }}>
            <Row label="Full name"><input className="input" defaultValue="Ada Lovelace" style={{ maxWidth: 260 }} /></Row>
            <Row label="Email"><span className="mono" style={{ fontSize: 13, color: "var(--tx-3)" }}>analyst@vc.fund</span></Row>
            <div style={{ paddingTop: 18 }}><Btn icon={<Ic.check />}>Save changes</Btn></div>
          </div>
        </section>

        {/* plan */}
        <section className="card card-pad fade-up" style={{ animationDelay: "0.06s" }}>
          <h2 style={{ fontSize: 15, fontWeight: 600, marginBottom: 16 }}>Plan & usage</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[{ id: "free", name: "Free", price: "$0", q: "3 / day", feats: ["News + web scraping", "PDF export", "7-day history"] },
              { id: "pro", name: "Pro", price: "$49", q: "50 / day", feats: ["+ LinkedIn & Glassdoor", "Priority queue", "Unlimited history"] }].map((p) => (
              <button key={p.id} onClick={() => setTier(p.id)} style={{ textAlign: "left", padding: 18, borderRadius: 10, border: `1px solid ${tier === p.id ? "var(--acc-line)" : "var(--border)"}`, background: tier === p.id ? "var(--acc-glow)" : "var(--surface-2)", cursor: "pointer" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontWeight: 600, fontSize: 15 }}>{p.name}</span>
                  {tier === p.id && <span style={{ color: "var(--acc)", display: "flex" }}><Ic.check style={{ width: 17, height: 17 }} /></span>}
                </div>
                <div style={{ margin: "8px 0 14px" }}><span className="mono" style={{ fontSize: 24, fontWeight: 600 }}>{p.price}</span><span className="mono" style={{ fontSize: 12, color: "var(--tx-3)" }}>/mo · {p.q}</span></div>
                <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                  {p.feats.map((f, j) => (
                    <div key={j} className="mono" style={{ fontSize: 12, color: "var(--tx-2)", display: "flex", gap: 8, alignItems: "center" }}>
                      <Ic.check style={{ width: 13, height: 13, color: "var(--acc)", flexShrink: 0 }} />{f}
                    </div>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* api */}
        <section className="card card-pad fade-up" style={{ animationDelay: "0.12s" }}>
          <h2 style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>Integrations</h2>
          <Row label="Bright Data MCP">
            <span className="badge buy"><span className="tick" />Connected</span>
          </Row>
          <Row label="Anthropic API">
            <span className="badge buy"><span className="tick" />Connected</span>
          </Row>
          <div style={{ paddingTop: 18 }}>
            <Btn variant="ghost" onClick={() => navigate("landing")} icon={<Ic.x />}>Sign out</Btn>
          </div>
        </section>
      </div>
    </AppShell>
  );
}

Object.assign(window, { Dashboard, History, Settings, AppShell, Sidebar, BriefCard });
