/* ============================================================
   LiveLens — root app + state router
   ============================================================ */
const { useState, useEffect, useRef } = React;

function App() {
  // route: { name, params }
  const [route, setRoute] = useState({ name: "landing", params: {} });
  const [pendingCompany, setPendingCompany] = useState(null);

  const navigate = (name, params = {}) => {
    if (name === "research") setPendingCompany(params.company || null);
    setRoute({ name, params });
    window.scrollTo(0, 0);
  };

  const r = route.name;

  let screen;
  if (r === "landing") screen = <Landing navigate={navigate} />;
  else if (r === "login") screen = <AuthScreen navigate={navigate} mode="login" />;
  else if (r === "register") screen = <AuthScreen navigate={navigate} mode="register" />;
  else if (r === "dashboard") screen = <Dashboard navigate={navigate} />;
  else if (r === "history") screen = <History navigate={navigate} />;
  else if (r === "settings") screen = <Settings navigate={navigate} />;
  else if (r === "research") screen = <Research navigate={navigate} initialCompany={pendingCompany} />;
  else if (r === "brief") screen = <Brief navigate={navigate} briefId={route.params.id || "bd-001"} />;
  else screen = <Landing navigate={navigate} />;

  return <React.Fragment key={r}>{screen}</React.Fragment>;
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
