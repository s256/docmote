import { useState, useEffect } from "react";

export default function App() {
  const [url, setUrl] = useState("");

  const handleSubmit = async () => {
    if (url.startsWith("http")) {
      await window.docmoteAPI.saveUrl(url);
      window.location.reload();
    } else {
      alert("Please enter a valid URL.");
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        background: "#ffffff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
        padding: "0 20px",
      }}
    >
      <div
        style={{
          padding: "48px 32px 32px",
          borderRadius: "16px",
          width: "100%",
          maxWidth: "440px",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            WebkitAppRegion: "drag",
            fontSize: "24px",
            fontWeight: "600",
            marginBottom: "32px",
          }}
        >
          Welcome to Docmote
        </h1>

        <input
          type="text"
          placeholder="Enter your Docmost instance URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{
            padding: "12px 14px",
            width: "100%",
            fontSize: "15px",
            border: "1px solid #ddd",
            borderRadius: "10px",
            backgroundColor: "#fafafa",
            color: "#000",
            outline: "none",
            marginBottom: "16px",
            textAlign: "center",
          }}
          onFocus={(e) => (e.target.style.border = "1px solid #aaa")}
          onBlur={(e) => (e.target.style.border = "1px solid #ddd")}
        />

        <button
          onClick={handleSubmit}
          style={{
            width: "100%",
            padding: "12px",
            fontSize: "15px",
            fontWeight: "500",
            color: "#fff",
            background: "#000",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            transition: "background 0.2s ease",
          }}
          onMouseOver={(e) => (e.target.style.background = "#333")}
          onMouseOut={(e) => (e.target.style.background = "#000")}
        >
          Connect
        </button>
      </div>
    </div>
  );
}
