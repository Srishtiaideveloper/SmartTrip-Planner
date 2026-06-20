/**
 * Generates responsive screenshots and dark/light mode screenshots as a PDF for W3 submission.
 * Captures the Dashboard page at:
 * - Mobile: 375px
 * - Tablet: 768px
 * - Desktop: 1440px (Light Mode)
 * - Desktop: 1440px (Dark Mode)
 *
 * Usage: node scripts/generate-responsive-screenshots.js
 */

import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const OUTPUT_DIR = path.join(__dirname, '..', '..', 'W3_Submission');
const SCREENSHOTS_DIR = path.join(OUTPUT_DIR, 'screenshots_w3');

const APP_URL = 'http://localhost:5173/dashboard';

async function main() {
  if (!fs.existsSync(SCREENSHOTS_DIR)) {
    fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
  }

  console.log('🚀 Launching browser...');
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Users\\Srishti\\.cache\\puppeteer\\chrome\\win64-151.0.7893.0\\chrome-win64\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    defaultViewport: null,
  });

  try {
    const page = await browser.newPage();
    
    // Helper to capture a screenshot
    const capture = async (filename, width, height, isMobile = false) => {
      console.log(`📸 Taking Screenshot: ${filename} (${width}x${height})...`);
      await page.setViewport({ width, height, deviceScaleFactor: 2, isMobile, hasTouch: isMobile });
      await page.goto(APP_URL, { waitUntil: 'networkidle0', timeout: 30000 });
      // Wait for any animations to settle
      await new Promise(r => setTimeout(r, 2000));
      const filepath = path.join(SCREENSHOTS_DIR, filename);
      await page.screenshot({ path: filepath, fullPage: true });
      console.log(`   ✅ Saved: ${filepath}`);
      return filepath;
    };

    // Make sure we start in dark mode (default)
    await page.goto(APP_URL, { waitUntil: 'networkidle0' });
    await page.evaluate(() => localStorage.setItem('smarttrip-theme', 'dark'));

    // ── 1. Mobile (375px) ──
    const mobileImg = await capture('dashboard_mobile.png', 375, 812, true);

    // ── 2. Tablet (768px) ──
    const tabletImg = await capture('dashboard_tablet.png', 768, 1024, false);

    // ── 3. Desktop Dark (1440px) ──
    const desktopDarkImg = await capture('dashboard_desktop_dark.png', 1440, 900, false);

    // Switch to Light Mode
    console.log('🔄 Switching to Light Mode...');
    await page.evaluate(() => {
      localStorage.setItem('smarttrip-theme', 'light');
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    });
    await new Promise(r => setTimeout(r, 1000)); // Wait for transition

    // ── 4. Desktop Light (1440px) ──
    const desktopLightImg = await capture('dashboard_desktop_light.png', 1440, 900, false);

    await page.close();

    // ── Generate PDF ──
    console.log('\n📄 Generating PDF...');
    
    const readBase64 = (file) => fs.readFileSync(file).toString('base64');

    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', sans-serif; background: #fff; color: #1e293b; }
        
        .page {
          page-break-after: always;
          width: 100%;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px 50px;
        }
        .page:last-child { page-break-after: avoid; }
        
        .title-page { text-align: center; }
        .title-page h1 { font-size: 36px; font-weight: 700; color: #059669; margin-bottom: 8px; }
        .title-page h2 { font-size: 22px; font-weight: 600; color: #334155; margin-bottom: 30px; }
        .title-page .meta { font-size: 14px; color: #64748b; line-height: 2; }
        .title-page .divider {
          width: 80px; height: 3px; background: linear-gradient(to right, #10b981, #14b8a6);
          margin: 20px auto; border-radius: 2px;
        }

        .screenshot-page { text-align: center; }
        .screenshot-page h3 { font-size: 20px; font-weight: 700; color: #1e293b; margin-bottom: 6px; }
        .screenshot-page .caption { font-size: 13px; color: #64748b; margin-bottom: 20px; }
        .screenshot-page img {
          max-width: 100%; max-height: 75vh; border: 1px solid #e2e8f0; border-radius: 8px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08); object-fit: contain;
        }
        .screenshot-page .badge {
          display: inline-block; padding: 4px 14px; background: #ecfdf5; color: #059669;
          border-radius: 20px; font-size: 11px; font-weight: 600; text-transform: uppercase;
          letter-spacing: 0.5px; margin-bottom: 12px;
        }
      </style>
    </head>
    <body>
      <div class="page title-page">
        <h1>🌍 SmartTrip Planner</h1>
        <h2>Week 3 — Responsive & Theme Screenshots</h2>
        <div class="divider"></div>
        <div class="meta">
          <p><strong>Deliverable 3 & 4:</strong> Responsive Layouts & Dark/Light Mode</p>
          <p><strong>Page:</strong> Dashboard</p>
          <p><strong>Date:</strong> ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
        </div>
      </div>

      <div class="page screenshot-page">
        <span class="badge">Mobile</span>
        <h3>Dashboard — Mobile View</h3>
        <p class="caption">Viewport: 375px wide</p>
        <img src="data:image/png;base64,${readBase64(mobileImg)}" alt="Mobile" />
      </div>

      <div class="page screenshot-page">
        <span class="badge">Tablet</span>
        <h3>Dashboard — Tablet View</h3>
        <p class="caption">Viewport: 768px wide</p>
        <img src="data:image/png;base64,${readBase64(tabletImg)}" alt="Tablet" />
      </div>

      <div class="page screenshot-page">
        <span class="badge">Desktop / Dark Theme</span>
        <h3>Dashboard — Desktop (Dark Mode)</h3>
        <p class="caption">Viewport: 1440px wide · Default Theme</p>
        <img src="data:image/png;base64,${readBase64(desktopDarkImg)}" alt="Desktop Dark" />
      </div>

      <div class="page screenshot-page">
        <span class="badge">Desktop / Light Theme</span>
        <h3>Dashboard — Desktop (Light Mode)</h3>
        <p class="caption">Viewport: 1440px wide · Toggled Theme</p>
        <img src="data:image/png;base64,${readBase64(desktopLightImg)}" alt="Desktop Light" />
      </div>
    </body>
    </html>
    `;

    const pdfPage = await browser.newPage();
    await pdfPage.setContent(htmlContent, { waitUntil: 'load' });
    
    const pdfPath = path.join(OUTPUT_DIR, 'W3_ResponsiveScreenshots_26100787.pdf');
    await pdfPage.pdf({
      path: pdfPath,
      format: 'A4',
      printBackground: true,
      margin: { top: '0', right: '0', bottom: '0', left: '0' },
    });
    console.log('   ✅ PDF saved:', pdfPath);
    await pdfPage.close();

    console.log('\n🎉 Done! PDF created at:', pdfPath);
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await browser.close();
  }
}

main();
