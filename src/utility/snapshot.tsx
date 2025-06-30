export async function getSnapshot(path: string) {
  if (!path) return null;

  const apiKey = process.env.BROWSERLESS_API_KEY;
  if (!apiKey) {
    console.error("BROWSERLESS_API_KEY is not set");
    return null;
  }

  console.log("Taking screenshot of:", path);

  try {
    const res = await fetch(
      `https://production-sfo.browserless.io/screenshot?token=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: "https://portfolio-builder-phi-three.vercel.app/",
          gotoOptions: {
            waitUntil: "networkidle2", // Wait for network stability
            timeout: 30000, // 30s timeout
          },
          options: {
            fullPage: true,
          },
          // Use only the minimal required options
        }),
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Screenshot API Error:", res.status, errorText);
      return null;
    }

    return res.arrayBuffer();
  } catch (err) {
    console.error("Screenshot error:", err);
    return null;
  }
}
