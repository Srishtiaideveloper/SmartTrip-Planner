import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const OUTPUT_DIR = path.join(__dirname, '..', '..', 'W3_Submission', 'Wireframe_Images');

async function main() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  console.log('🚀 Generating wireframe PNGs...');

  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Users\\Srishti\\.cache\\puppeteer\\chrome\\win64-151.0.7893.0\\chrome-win64\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // Read the original wireframes script to extract the HTML string
  const scriptPath = path.join(__dirname, 'wireframes.js');
  const scriptContent = fs.readFileSync(scriptPath, 'utf8');
  
  // Extract the HTML block
  const htmlStart = scriptContent.indexOf('const wireframeHTML = `') + 23;
  const htmlEnd = scriptContent.indexOf('`;', htmlStart);
  let html = scriptContent.substring(htmlStart, htmlEnd);

  // Set the content
  await page.setContent(html, { waitUntil: 'networkidle0' });

  // Get coordinates of all pages
  const pages = await page.$$('.page');
  
  for (let i = 0; i < pages.length; i++) {
    const boundingBox = await pages[i].boundingBox();
    const filePath = path.join(OUTPUT_DIR, `Wireframe_Screen_${i + 1}.png`);
    await pages[i].screenshot({
      path: filePath,
      clip: {
        x: boundingBox.x,
        y: boundingBox.y,
        width: boundingBox.width,
        height: boundingBox.height
      }
    });
    console.log(`✅ Saved: ${filePath}`);
  }

  await browser.close();
  console.log('🎉 Done!');
}

main();
