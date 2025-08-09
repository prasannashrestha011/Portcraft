type CodeMatcher = {
  extractedHTML: string;
  extractedJS: string;
  cssWithoutVariables: string;
  extractedCSS: string;
};
export function CodeMatcher(fetchedCode: string): CodeMatcher {
  const htmlMatch = fetchedCode.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const jsMatch = fetchedCode.match(/<script[^>]*>([\s\S]*?)<\/script>/i);
  const cssMatch = fetchedCode.match(/<style[^>]*>([\s\S]*?)<\/style>/i);

  const extractedHTML = htmlMatch ? htmlMatch[1] : "";
  const extractedJS = jsMatch ? jsMatch[1] : "";
  const extractedCSS = cssMatch ? cssMatch[1] : "";
  const cssWithoutVariables = extractedCSS
    .replace(/var\(--gradient-start\)/g, "#667eea")
    .replace(/var\(--gradient-end\)/g, "#764ba2")
    .replace(/var\(--text-color\)/g, "white")
    .replace(/var\(--card-bg\)/g, "white")
    .replace(/var\(--shadow-color\)/g, "rgba(0, 0, 0, 0.1)")
    .replace(/var\(--base-spacing\)/g, "16px")
    .replace(/var\(--border-radius\)/g, "10px");
  return { extractedHTML, extractedCSS, cssWithoutVariables, extractedJS };
}
export function PrepareHTML_CSS_Structure(html: string, css: string): string {
  const code = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Downloaded Project</title>
  <style>${css} </style>
</head>
<body>
  ${html}
  <script src="script.js"></script>
</body>
</html>`;
  return code;
}
