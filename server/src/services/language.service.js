// Simple heuristic-based language detection.

export function detectLanguage(code = "") {
  const trimmed = code.trim();

  // C++
  if (/#include\s*<.*>/i.test(code) || /std::/i.test(code) || /vector<.*>/i.test(code))
    return "cpp";

  // C
  if (/#include\s*<.*>/i.test(code) && !/std::/i.test(code))
    return "c";

  // Java
  if (/class\s+[A-Z][A-Za-z0-9_]*\s*\{/i.test(code) || /public\s+static\s+void\s+main/i.test(code))
    return "java";

  // Python
  if (/def\s+\w+\s*\(/.test(code) || /print\(.+\)/.test(code) || /import\s+\w+/.test(code))
    return "python";

  // JavaScript
  if (/function\s+\w+\s*\(/.test(code) || /console\.log/.test(code) || /=>/.test(code))
    return "javascript";

  // Rust
  if (/fn\s+\w+\s*\(/.test(code) || /let\s+mut\s+/.test(code) || /println!/.test(code))
    return "rust";

  // C#
  if (/using\s+System/.test(code) || /public\s+class/.test(code) || /Console\.WriteLine/.test(code))
    return "csharp";

  // Scala
  if (/object\s+\w+/.test(code) || /def\s+\w+/.test(code) || /val\s+\w+/.test(code))
    return "scala";

  // Default fallback
  return "javascript";  
}
