import { StrictMode, Component, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean; error: string }> {
  state = { hasError: false, error: "" };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error: error.message };
  }

  componentDidCatch(error: Error) {
    console.error("Uygulama hatası:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ fontFamily: "system-ui, sans-serif", maxWidth: 600, margin: "80px auto", padding: 20, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🇪🇺</div>
          <h1 style={{ fontSize: 22, color: "#0f2b5b", marginBottom: 8 }}>Bir şeyler ters gitti</h1>
          <p style={{ color: "#666", marginBottom: 24, fontSize: 14 }}>
            Beklenmeyen bir hata oluştu. Lütfen sayfayı yenileyin.
          </p>
          <p style={{ color: "#999", fontSize: 12, marginBottom: 24, padding: 12, background: "#f5f5f5", borderRadius: 8, textAlign: "left", wordBreak: "break-all" }}>
            {this.state.error}
          </p>
          <button
            onClick={() => { this.setState({ hasError: false, error: "" }); window.location.reload(); }}
            style={{ padding: "12px 32px", background: "#0f2b5b", color: "white", border: "none", borderRadius: 12, fontSize: 16, fontWeight: 700, cursor: "pointer" }}
          >
            Sayfayı Yenile
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
