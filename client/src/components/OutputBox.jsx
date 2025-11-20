import React from "react";
import { parseAiOutput } from "../utils/aiParser";

export default function OutputBox({ output, languageHint = "javascript" }) {
  const { sections, fixedCode } = parseAiOutput(output);

  if (!output) {
    return (
      <div className="output-panel card">
        <div className="output-head">
          <div style={{ fontWeight: 700 }}>AI Review Output</div>
        </div>
        <div className="output-body">
          <span className="small-muted">
            AI output will appear here — click “Analyze Code” to run the review.
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="output-panel card">
      <div className="output-head">
        <div style={{ fontWeight: 700 }}>AI Review Output</div>
      </div>

      <div className="output-body">
        {/* Render structured sections */}
        {sections.map((s, i) => (
          <section key={i} style={{ marginBottom: 18 }}>
            <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>
              {s.title}
            </h3>

            <div
              style={{
                marginTop: 8,
                color: "#dbeafe",
                fontSize: 14,
                whiteSpace: "pre-wrap",
              }}
            >
              {s.body || <span className="small-muted">—</span>}
            </div>
          </section>
        ))}

        {/* Render Fixed Code block */}
        {fixedCode ? (
          <section style={{ marginTop: 10 }}>
            <h3 style={{ marginBottom: 8, fontSize: 15, fontWeight: 700 }}>
              Fixed Code
            </h3>

            <pre
              style={{
                background: "#0d1117",
                padding: "12px",
                borderRadius: "8px",
                fontSize: "13px",
                color: "#c9d1d9",
                overflowX: "auto",
                lineHeight: "1.5",
                whiteSpace: "pre",
              }}
            >
{fixedCode}
            </pre>
          </section>
        ) : null}
      </div>
    </div>
  );
}
