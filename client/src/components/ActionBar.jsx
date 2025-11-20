import React from "react";

export default function ActionBar({ onAnalyze, loading, output }) {
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(output || "");
      alert("Output copied to clipboard");
    } catch {
      alert("Copy failed");
    }
  };

  const download = () => {
    if (!output) return;
    const blob = new Blob([output], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ai_review_output.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="actions">
      <button className="btn btn-primary" onClick={onAnalyze} disabled={loading}>
        {loading ? "Analyzing…" : "Analyze Code"}
      </button>
      <button className="btn btn-ghost" onClick={copy}>Copy Output</button>
      <button className="btn btn-ghost" onClick={download}>Download</button>
    </div>
  );
}
