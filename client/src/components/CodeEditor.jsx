import React from "react";
import Editor from "@monaco-editor/react";

export default function CodeEditor({ code, setCode, language }) {
  return (
    <div className="editor-panel card">
      {/* single-line header: 'Put your code here' */}
      <div className="editor-top">
        <div>
          <div style={{ fontWeight:700 }}>Put your code here</div>
        </div>
        <div className="small-muted"></div>
      </div>

      <div className="editor-wrap" style={{ padding: 12 }}>
        <div style={{ height: "100%", minHeight: 420 }}>
          <Editor
            height="420px"
            defaultLanguage={language}
            language={language}
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value)}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              wordWrap: "on",
              automaticLayout: true,
              scrollBeyondLastLine: false,
              glyphMargin: true
            }}
          />
        </div>
      </div>
    </div>
  );
}
