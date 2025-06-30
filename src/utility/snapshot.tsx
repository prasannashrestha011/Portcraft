import pup from "puppeteer";
export async function getSnapshot(path: string) {
  if (!path) return;
  const browser = await pup.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const newPage = await browser.newPage();
  await newPage.goto(path, { waitUntil: "networkidle2" });
  const buffer = (await newPage.screenshot({
    fullPage: true,
    type: "png",
  })) as Buffer;
  await browser.close();
  return buffer;
}
