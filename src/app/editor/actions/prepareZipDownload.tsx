import saveAs from "file-saver";
import JSZip from "jszip";

export function PrepareZipDownload(html: string, css: string, js: string) {
  const indexHtmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Downloaded Project</title>
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
  ${html}
  <script src="script.js"></script>
</body>
</html>`;

  const zip = new JSZip();
  zip.file("index.html", indexHtmlContent);
  zip.file("styles.css", css);
  zip.file("script.js", js);

  zip.generateAsync({ type: "blob" }).then((content) => {
    saveAs(content, "project.zip");
  });
}
