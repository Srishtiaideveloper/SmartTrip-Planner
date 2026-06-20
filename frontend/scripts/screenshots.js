/**
 * Automated Screenshot & PDF Generator for W2 Submission
 * Takes 3 screenshots and combines them into a single PDF
 * 
 * Usage: node scripts/generate-screenshots.js
 */

import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const OUTPUT_DIR = path.join(__dirname, '..', '..', 'W2_Submission');
const SCREENSHOTS_DIR = path.join(OUTPUT_DIR, 'screenshots');

const APP_URL = 'http://localhost:5173';

async function main() {
  // Ensure output directories exist
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
    // ── Screenshot 1: Home Page Desktop (1920×1080) ──
    console.log('📸 Taking Screenshot 1: Home Page (Desktop 1920×1080)...');
    const desktopPage = await browser.newPage();
    await desktopPage.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });
    await desktopPage.goto(`${APP_URL}/`, { waitUntil: 'networkidle0', timeout: 30000 });
    await desktopPage.waitForSelector('nav', { timeout: 10000 });
    // Wait for animations to settle
    await new Promise(r => setTimeout(r, 2000));
    const screenshot1 = path.join(SCREENSHOTS_DIR, 'screenshot_home_desktop.png');
    await desktopPage.screenshot({ path: screenshot1, fullPage: false });
    console.log('   ✅ Saved:', screenshot1);
    await desktopPage.close();

    // ── Screenshot 2: Home Page Mobile (iPhone 14 Pro - 393×852) ──
    console.log('📸 Taking Screenshot 2: Home Page (Mobile - iPhone 14 Pro)...');
    const mobilePage = await browser.newPage();
    await mobilePage.setViewport({ width: 393, height: 852, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
    await mobilePage.setUserAgent(
      'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
    );
    await mobilePage.goto(`${APP_URL}/`, { waitUntil: 'networkidle0', timeout: 30000 });
    await mobilePage.waitForSelector('nav', { timeout: 10000 });
    await new Promise(r => setTimeout(r, 2000));
    const screenshot2 = path.join(SCREENSHOTS_DIR, 'screenshot_home_mobile.png');
    await mobilePage.screenshot({ path: screenshot2, fullPage: false });
    console.log('   ✅ Saved:', screenshot2);
    await mobilePage.close();

    // ── Screenshot 3: Dashboard Page Desktop (1920×1080) ──
    console.log('📸 Taking Screenshot 3: Dashboard Page (Desktop 1920×1080)...');
    const dashboardPage = await browser.newPage();
    await dashboardPage.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });
    await dashboardPage.goto(`${APP_URL}/dashboard`, { waitUntil: 'networkidle0', timeout: 30000 });
    await dashboardPage.waitForSelector('nav', { timeout: 10000 });
    await new Promise(r => setTimeout(r, 3000)); // extra wait for charts to render
    const screenshot3 = path.join(SCREENSHOTS_DIR, 'screenshot_dashboard.png');
    await dashboardPage.screenshot({ path: screenshot3, fullPage: false });
    console.log('   ✅ Saved:', screenshot3);
    await dashboardPage.close();

    // ── Generate PDF ──
    console.log('\n📄 Generating PDF...');
    
    // Read screenshots as base64
    const img1 = fs.readFileSync(screenshot1).toString('base64');
    const img2 = fs.readFileSync(screenshot2).toString('base64');
    const img3 = fs.readFileSync(screenshot3).toString('base64');

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
        
        .title-page {
          text-align: center;
        }
        .title-page h1 {
          font-size: 36px;
          font-weight: 700;
          color: #059669;
          margin-bottom: 8px;
        }
        .title-page h2 {
          font-size: 22px;
          font-weight: 600;
          color: #334155;
          margin-bottom: 30px;
        }
        .title-page .meta {
          font-size: 14px;
          color: #64748b;
          line-height: 2;
        }
        .title-page .divider {
          width: 80px;
          height: 3px;
          background: linear-gradient(to right, #10b981, #14b8a6);
          margin: 20px auto;
          border-radius: 2px;
        }

        .screenshot-page {
          text-align: center;
        }
        .screenshot-page h3 {
          font-size: 20px;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 6px;
        }
        .screenshot-page .caption {
          font-size: 13px;
          color: #64748b;
          margin-bottom: 20px;
        }
        .screenshot-page img {
          max-width: 100%;
          max-height: 75vh;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        }
        .screenshot-page .badge {
          display: inline-block;
          padding: 4px 14px;
          background: #ecfdf5;
          color: #059669;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 12px;
        }
      </style>
    </head>
    <body>
      <!-- Title Page -->
      <div class="page title-page">
        <h1>🌍 SmartTrip Planner</h1>
        <h2>Week 2 — Frontend Screenshots</h2>
        <div class="divider"></div>
        <div class="meta">
          <p><strong>Project:</strong> AI-Powered Sustainable Travel Planner</p>
          <p><strong>Tech Stack:</strong> React.js · Vite · Tailwind CSS · Recharts</p>
          <p><strong>Repo:</strong> github.com/Srishtiaideveloper/SmartTrip-Planner</p>
          <p><strong>Date:</strong> ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
        </div>
      </div>

      <!-- Screenshot 1: Home Desktop -->
      <div class="page screenshot-page">
        <span class="badge">Screenshot 1</span>
        <h3>Home Page — Desktop View</h3>
        <p class="caption">Resolution: 1920 × 1080 · Full screen browser window</p>
        <img src="data:image/png;base64,${img1}" alt="Home Page Desktop" />
      </div>

      <!-- Screenshot 2: Home Mobile -->
      <div class="page screenshot-page">
        <span class="badge">Screenshot 2</span>
        <h3>Home Page — Mobile View</h3>
        <p class="caption">Device: iPhone 14 Pro (393 × 852) · Chrome DevTools emulation</p>
        <img src="data:image/png;base64,${img2}" alt="Home Page Mobile" />
      </div>

      <!-- Screenshot 3: Dashboard -->
      <div class="page screenshot-page">
        <span class="badge">Screenshot 3</span>
        <h3>Dashboard Page — Desktop View</h3>
        <p class="caption">Resolution: 1920 × 1080 · Interactive analytics dashboard with Recharts</p>
        <img src="data:image/png;base64,${img3}" alt="Dashboard Desktop" />
      </div>
    </body>
    </html>
    `;

    const pdfPage = await browser.newPage();
    await pdfPage.setContent(htmlContent, { waitUntil: 'networkidle0' });
    
    const pdfPath = path.join(OUTPUT_DIR, 'W2_FrontendScreenshots_InternID.pdf');
    await pdfPage.pdf({
      path: pdfPath,
      format: 'A4',
      printBackground: true,
      margin: { top: '0', right: '0', bottom: '0', left: '0' },
    });
    console.log('   ✅ PDF saved:', pdfPath);
    await pdfPage.close();

    console.log('\n🎉 Done! All files saved in:', OUTPUT_DIR);
    console.log('');
    console.log('📦 Files generated:');
    console.log('   screenshots/screenshot_home_desktop.png');
    console.log('   screenshots/screenshot_home_mobile.png');
    console.log('   screenshots/screenshot_dashboard.png');
    console.log('   W2_FrontendScreenshots_InternID.pdf');
    console.log('');
    console.log('⚠️  Rename the PDF: Replace "InternID" with your actual Intern ID');
    console.log('⚠️  Then ZIP the folder as: W2_Submission_[InternID].zip');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await browser.close();
  }
}

main();
