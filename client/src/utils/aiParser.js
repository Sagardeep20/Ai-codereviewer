
export function parseAiOutput(text) {
  if (!text) return { sections: [], fixedCode: "" };

  // normalize
  const t = text.replace(/\r\n/g, "\n");

  // Try capture FIXED CODE block (heading "### FIXED CODE" or "FIXED CODE")
  let fixedCode = "";
  const fixedMatch = t.match(/(?:###\s*)?FIXED CODE[^\n]*\n(?:```(?:[^\n]*)\n([\s\S]*?)\n```|([\s\S]*))/im);
  if (fixedMatch) fixedCode = (fixedMatch[1] || fixedMatch[2] || "").trim();

  // Target headings we want in order
  const headings = [
    { key: "summary", re: /short summary|summary/i, title: "Summary" },
    { key: "bugs", re: /bugs|issues/i, title: "Bugs / Issues" },
    { key: "time", re: /time complexity/i, title: "Time Complexity" },
    { key: "space", re: /space complexity/i, title: "Space Complexity" },
    { key: "optimizations", re: /optimizations|suggestions|suggest/i, title: "Optimized Version" }
  ];

  // Find index of each heading occurrence
  const lower = t.toLowerCase();
  const indices = headings.map(h => ({ ...h, idx: lower.search(h.re) }));

  // Keep only found headings, sorted by position
  const present = indices.filter(p => p.idx >= 0).sort((a,b) => a.idx - b.idx);

  const sections = [];
  const sliceText = (startIdx, endIdx) => {
    if (startIdx < 0) return "";
    const s = t.slice(startIdx, endIdx === -1 ? undefined : endIdx).trim();
    // remove heading text from the slice if present
    return s.replace(/^(?:\d+\)\s*)?(SHORT SUMMARY|SUMMARY|BUGS\/ISSUES|TIME COMPLEXITY|SPACE COMPLEXITY|OPTIMIZATIONS|FIXED CODE)[:\-\s]*/i, "").trim();
  };

  if (present.length === 0) {
    // Fallback: try split by numbered list ("1) ... 2) ...")
    const blocks = t.split(/\n(?=\d+\)\s)/);
    blocks.forEach(b => {
      const m = b.match(/^\s*(\d+)\)\s*([^\n]+)/);
      const title = m ? m[2].trim() : "Summary";
      const body = b.replace(/^\s*(\d+)\)\s*[^\n]*/, "").trim();
      sections.push({ title, body });
    });
  } else {
    for (let i = 0; i < present.length; i++) {
      const start = present[i].idx;
      // end at next heading index, or before FIXED CODE if present, or EOF
      const end = (i + 1 < present.length) ? present[i+1].idx : (fixedMatch ? t.indexOf(fixedMatch[0]) : -1);
      const body = sliceText(start, end);
      sections.push({ title: present[i].title, body });
    }
  }

  // If still empty, put whole text under Summary
  if (sections.length === 0) sections.push({ title: "Summary", body: t });

  // Fallback: if no fixedCode found, take the first fenced code block
  if (!fixedCode) {
    const fence = t.match(/```(?:[^\n]*)\n([\s\S]*?)\n```/m);
    if (fence) fixedCode = fence[1].trim();
  }

  return { sections, fixedCode };
}
