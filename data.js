/* ============================================================
   LiveLens — mock data
   ============================================================ */

// ---- The hero brief: Bright Data (the live-demo company) ----
const BRIGHTDATA_BRIEF = {
  company_name: "Bright Data",
  company_url: "brightdata.com",
  tagline: "The world's largest web data platform",
  verdict: "BUY_SIGNAL",
  verdict_reason:
    "Category leader in web data infrastructure with durable demand from the AI training boom, strong profitability signals, and consistent enterprise expansion. Limited public risk surface.",
  overview: {
    founded: "2014",
    headquarters: "Netanya, Israel",
    industry: "Web Data Infrastructure",
    employees: "~800",
    stage: "Private · Profitable",
  },
  sentiment: {
    score: 81,
    label: "Strongly Positive",
    summary:
      "Sentiment across news, developer forums, and review platforms is consistently positive. Most discussion frames Bright Data as the default infrastructure layer for compliant large-scale web data collection.",
  },
  growth_signals: [
    { signal: "Surging demand for training-grade web data from AI labs", strength: "STRONG", source: "TechCrunch · 8 articles" },
    { signal: "Expanding MCP ecosystem integrations across agent frameworks", strength: "STRONG", source: "GitHub · Dev forums" },
    { signal: "Enterprise headcount up ~18% YoY", strength: "MODERATE", source: "LinkedIn" },
    { signal: "Strong inbound developer adoption of free tier", strength: "MODERATE", source: "Reddit · HN" },
  ],
  risk_flags: [
    { flag: "Regulatory scrutiny of web scraping practices in some jurisdictions", severity: "MEDIUM", source: "Legal news" },
    { flag: "Pricing complexity cited in a minority of reviews", severity: "LOW", source: "G2 · Trustpilot" },
  ],
  key_people: [
    { name: "Or Lenchner", role: "Chief Executive Officer", notable: "Led the rebrand and enterprise pivot; frequent industry speaker on ethical data collection." },
    { name: "Derry Shribman", role: "Co-founder & Chairman", notable: "Serial founder; architect of the original proxy network technology." },
    { name: "Ofer Vilenski", role: "Co-founder", notable: "Co-built the company's core infrastructure and compliance framework." },
  ],
  recent_news: [
    { headline: "Bright Data expands MCP server to support autonomous agent workflows", date: "3 days ago", significance: "Directly relevant to the AI-agent tooling wave; widens developer reach." },
    { headline: "Reaffirmed compliance posture after court ruling on public data", date: "2 weeks ago", significance: "Reduces a key regulatory overhang for enterprise buyers." },
    { headline: "New enterprise data products announced for AI training pipelines", date: "1 month ago", significance: "Captures budget from the fastest-growing customer segment." },
  ],
  competitive_position:
    "Holds the dominant position in compliant large-scale web data, ahead of Oxylabs, Zyte, and Apify. Its compliance-first brand and MCP-native developer experience create switching costs that smaller proxy vendors struggle to match.",
  data_freshness: "2026-05-30T14:22:00Z",
  sources_count: 64,
};

// ---- History briefs (lighter, for dashboard + history grid) ----
const HISTORY = [
  {
    id: "bd-001", company_name: "Bright Data", company_url: "brightdata.com",
    verdict: "BUY_SIGNAL", tagline: "The world's largest web data platform",
    sentiment: 81, sources: 64, created: "Just now", industry: "Web Data Infrastructure",
    full: true,
  },
  {
    id: "st-002", company_name: "Stripe", company_url: "stripe.com",
    verdict: "BUY_SIGNAL", tagline: "Financial infrastructure for the internet",
    sentiment: 88, sources: 71, created: "2 hours ago", industry: "Payments",
  },
  {
    id: "fg-003", company_name: "Figment Labs", company_url: "figmentlabs.io",
    verdict: "WATCH", tagline: "AI-native design tooling startup",
    sentiment: 62, sources: 41, created: "Yesterday", industry: "Design Software",
  },
  {
    id: "nv-004", company_name: "Nuvora Health", company_url: "nuvora.health",
    verdict: "RED_FLAG", tagline: "Telehealth platform, Series B",
    sentiment: 34, sources: 38, created: "2 days ago", industry: "Healthtech",
  },
  {
    id: "ar-005", company_name: "Arclight Robotics", company_url: "arclight.ai",
    verdict: "WATCH", tagline: "Warehouse automation hardware",
    sentiment: 58, sources: 47, created: "4 days ago", industry: "Robotics",
  },
  {
    id: "ld-006", company_name: "Lumen Dynamics", company_url: "lumendyn.com",
    verdict: "BUY_SIGNAL", tagline: "Industrial energy optimization",
    sentiment: 76, sources: 52, created: "Last week", industry: "Climate Tech",
  },
];

// ---- The animated research progress stream ----
// Each step: header message + a few tool-call sublines + a target source count.
const RESEARCH_STEPS = [
  {
    icon: "plug",
    message: "Initializing Bright Data MCP session",
    tools: ["mcp.connect → mcp.brightdata.com/sse", "auth ✓  ·  4 tools available"],
    sources: 0,
  },
  {
    icon: "search",
    message: "Searching news & press coverage",
    tools: ['search_engine("Bright Data funding news")', 'search_engine("Bright Data reviews 2026")'],
    sources: 18,
  },
  {
    icon: "globe",
    message: "Scraping company site & LinkedIn",
    tools: ["scrape_as_markdown(brightdata.com)", "scrape_linkedin_company(bright-data)"],
    sources: 33,
  },
  {
    icon: "star",
    message: "Pulling reviews & employee sentiment",
    tools: ["scrape_glassdoor(bright-data)", "scrape_as_markdown(g2.com/bright-data)"],
    sources: 49,
  },
  {
    icon: "trend",
    message: "Extracting growth & risk signals",
    tools: ["analyze · 49 documents", "cross-reference funding + headcount + sentiment"],
    sources: 64,
  },
  {
    icon: "brain",
    message: "Claude synthesizing intelligence brief",
    tools: ["claude-sonnet-4 · structured output", "validating BriefData schema ✓"],
    sources: 64,
  },
];

Object.assign(window, { BRIGHTDATA_BRIEF, HISTORY, RESEARCH_STEPS });
