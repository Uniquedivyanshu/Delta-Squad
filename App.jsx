import { useState } from "react";
import "./App.css";
import Analytics from "./Analytics";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { navItems } from "./data/dashboardData";
import { defaultUser } from "./data/mockData";
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import UploadAnalyzePage from "./pages/UploadAnalyzePage";
import ProcessingPage from "./pages/ProcessingPage";
import GeologicalAnalysisPage from "./pages/GeologicalAnalysisPage";
import ReportPage from "./pages/ReportPage";
import DocumentsPage from "./pages/DocumentsPage";
import SettingsPage from "./pages/SettingsPage";
import GeoRiskMapPage from "./pages/GeoRiskMapPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [authError, setAuthError] = useState("");
  const [form, setForm] = useState({
    email: defaultUser.email,
    password: defaultUser.password,
  });
  const [activePage, setActivePage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const currentNav = navItems.find((item) => item.id === activePage) ?? navItems[0];
  const pageTitle = currentNav ? currentNav.label : "Dashboard";

  function handleNavigate(pageId) {
    if (pageId === "logout") {
      setIsLoggedIn(false);
      setActivePage("dashboard");
      setSidebarOpen(false);
      return;
    }

    setActivePage(pageId);
    setSidebarOpen(false);
  }

  function handleAuthChange(event) {
    setForm((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
    setAuthError("");
  }

  function handleAuthSubmit(event) {
    event.preventDefault();

    const trimmedEmail = form.email.trim();
    const trimmedPassword = form.password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      setAuthError("Please enter both email and password.");
      return;
    }

    if (!trimmedEmail.includes("@")) {
      setAuthError("Please enter a valid email address.");
      return;
    }

    if (authMode === "register") {
      setAuthError("");
      setIsLoggedIn(true);
      setActivePage("dashboard");
      return;
    }

    if (trimmedEmail === defaultUser.email && trimmedPassword === defaultUser.password) {
      setAuthError("");
      setIsLoggedIn(true);
      setActivePage("dashboard");
      return;
    }

    setAuthError("Invalid credentials. Try the demo login or register a new account.");
  }

  function handleDemoLogin() {
    setForm({ email: defaultUser.email, password: defaultUser.password });
    setAuthError("");
    setIsLoggedIn(true);
    setActivePage("dashboard");
  }

  function renderPage() {
    switch (activePage) {
      case "dashboard":
        return <DashboardPage onNavigate={handleNavigate} />;
      case "documents":
        return <DocumentsPage />;
      case "upload":
        return (
          <UploadAnalyzePage
            selectedFile={selectedFile}
            onFileSelect={setSelectedFile}
            onResetFile={() => setSelectedFile(null)}
            onAnalyze={() => {
              if (!selectedFile) {
                return;
              }
              setActivePage("processing");
            }}
          />
        );
      case "processing":
        return (
          <ProcessingPage
            selectedFile={selectedFile}
            onComplete={() => setActivePage("analysis")}
          />
        );
      case "analysis":
        return <GeologicalAnalysisPage />;
      case "reports":
        return <ReportPage />;
      case "analytics":
        return <Analytics />;
      case "geo-risk":
        return <GeoRiskMapPage />;
      case "settings":
        return <SettingsPage />;
      default:
        return <DashboardPage onNavigate={handleNavigate} />;
    }
  }

  if (!isLoggedIn) {
    return (
      <AuthPage
        authMode={authMode}
        form={form}
        error={authError}
        onModeChange={setAuthMode}
        onChange={handleAuthChange}
        onSubmit={handleAuthSubmit}
        onDemoLogin={handleDemoLogin}
      />
    );
  }

  return (
    <div className="app-shell">
      <Sidebar
        activePage={activePage}
        onNavigate={handleNavigate}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="main-shell">
        <Header pageTitle={pageTitle} onOpenMenu={() => setSidebarOpen(true)} />
        {renderPage()}
      </div>
    </div>
  );
}

export default App;
