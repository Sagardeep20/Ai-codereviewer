import React from "react";

export default function Navbar() {
  return (
    <header className="app-container header" role="banner">
      <div className="header-left">
        <div style={{
          width:44, height:44, borderRadius:10, background: "linear-gradient(180deg,#2563eb,#60a5fa)",
          display:"flex", alignItems:"center", justifyContent:"center", color:"white", fontWeight:700
        }}>
          AI
        </div>
        <div>
          <div className="header-title">AI Code Reviewer</div>
          {/* subtitle removed on purpose per request */}
        </div>
      </div>

      <div className="small-muted">Monaco • OpenAI • Demo</div>
    </header>
  );
}
