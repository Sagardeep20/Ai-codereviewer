import React, { useState } from "react";
import Navbar from "../components/Navbar";
import CodeEditor from "../components/CodeEditor";
import OutputBox from "../components/OutputBox";
import ActionBar from "../components/ActionBar";
import api from "../api/axiosConfig";

// Language detection function
function detectLanguage(code) {
  if (!code || typeof code !== "string") return "unknown";

  const c = code.toLowerCase();

  // C / C++
  if (/#include\s*<|std::|cout<<|cin>>|using\s+namespace\s+std|int\s+main\(/.test(code)) {
    if (/\bcout\b|\bstd::|\bvector<|#include\s*<bits\/stdc\+\+/.test(code)) return "cpp";
    if (/#include\s*<stdio.h>|printf\(|malloc\(|free\(/.test(code)) return "c";
  }

  // Java
  if (/\bpublic\s+class\b|\bSystem\.out\.println\b|\bpublic\s+static\s+void\s+main\b/.test(code))
    return "java";

  // C#
  if (/\busing\s+System;|\bConsole\.WriteLine\b|\bnamespace\b/.test(code) && /\bclass\b/.test(code))
    return "csharp";

  // Rust
  if (/\bfn\s+main\s*\(|println!|let\s+mut\b|use\s+std::/.test(code)) return "rust";

  // Scala
  if (/\bobject\s+\w+\s+extends\b|\bdef\s+main\(args: Array\[String\]\)/.test(code)) return "scala";

  // Python
  if (/^\s*def\s+\w+\(|^\s*import\s+\w+|print\(|if __name__ == ['"]__main__['"]/.test(code))
    return "python";

  // JavaScript
  if (/\bfunction\b|\bconsole\.log\b|\bconst\b|\blet\b|=>/.test(code))
    return "javascript";

  return "unknown";
}

export default function Home() {
  const starter = `// Example code - paste your code here
function greet(name) {
  console.log("Hello, " + name);
}
greet("World");`;

  const [code, setCode] = useState(starter);
  const [language, setLanguage] = useState("javascript");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const analyzeCode = async () => {
    const detected = detectLanguage(code);

    if (detected !== "unknown" && detected !== language) {
      setOutput(
        `Language mismatch detected.
Selected: ${language} — Detected: ${detected}.
Please select the correct language or paste ${language} code.`
      );
      return;
    }

    setLoading(true);
    setOutput("Analyzing... please wait.");

    try {
      const res = await api.post("/review", { code, language });
      setOutput(res.data.output);
    } catch (err) {
      console.error(err);
      setOutput("Error analyzing code. Check server logs or API key.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* BACKGROUND */}
      <div className="min-h-screen relative">
        {/* Blurred image */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-center bg-cover"
          style={{
            backgroundImage: "url('/bg.webp')",
            filter: "blur(12px) saturate(85%)",
            transform: "scale(1.03)",
            zIndex: 0,
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/55" />

        {/* CONTENT */}
        <div className="relative z-10">
          <Navbar />

          <main className="app-container max-w-7xl mx-auto px-6 py-8">

            {/* Language Select */}
            <div className="quick-card card rounded-xl p-4 bg-white/4 border border-white/10 backdrop-blur-sm mb-4 shadow-md">
              <div className="flex items-center justify-between">
                <div className="text-white font-semibold text-lg">Choose language</div>

                <select
                  className="p-2 bg-[rgba(255,255,255,0.05)] rounded text-white border border-white/10"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                  <option value="cpp">C++</option>
                  <option value="c">C</option>
                  <option value="java">Java</option>
                  <option value="rust">Rust</option>
                  <option value="csharp">C#</option>
                  <option value="scala">Scala</option>
                </select>
              </div>
            </div>

            {/* Editor + Output */}
            <section className="grid-2 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="rounded-2xl overflow-hidden bg-white/6 border border-white/10 backdrop-blur-md shadow-lg">
                <div className="px-6 py-4 border-b border-white/10">
                  <h3 className="text-slate-100 font-semibold text-lg">Put your code here</h3>
                </div>
                <div className="p-4">
                  <CodeEditor code={code} setCode={setCode} language={language} />
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden bg-white/6 border border-white/10 backdrop-blur-md shadow-lg">
                <div className="px-6 py-4 border-b border-white/10">
                  <h3 className="text-slate-100 font-semibold text-lg">AI Review Output</h3>
                </div>
                <div className="p-4">
                  <OutputBox
                    output={output}
                    languageHint={language === "cpp" ? "cpp" : language}
                  />
                </div>
              </div>
            </section>

            {/* Analyze Button */}
            <div className="mt-6">
              <ActionBar onAnalyze={analyzeCode} loading={loading} output={output} />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
