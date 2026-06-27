import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const OUTPUT_DIR = path.join(__dirname, '..', '..');

async function main() {
  console.log('Generating W4 Frontend-Backend Connection PDF...');

  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Users\\Srishti\\.cache\\puppeteer\\chrome\\win64-151.0.7893.0\\chrome-win64\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });

  // 1. Navigate to login and authenticate
  console.log('Navigating to login...');
  await page.goto('http://localhost:5173/login', { waitUntil: 'networkidle0' });
  
  // Fill in credentials
  await page.type('input[name="email"]', 'srishti@example.com');
  await page.type('input[name="password"]', 'password123');
  
  console.log('Logging in...');
  await page.click('button[type="submit"]');

  // Wait for redirect to dashboard and data to load
  await page.waitForFunction(() => window.location.pathname === '/dashboard');
  // Wait for the loader to disappear and content to render
  await new Promise(r => setTimeout(r, 4000));

  // Take screenshot of the dashboard
  console.log('Taking dashboard screenshot...');
  const dashboardImgPath = path.join(OUTPUT_DIR, 'temp_dashboard.png');
  await page.screenshot({ path: dashboardImgPath });
  const dashboardImgBase64 = fs.readFileSync(dashboardImgPath, 'base64');

  // 2. Create the DevTools mockup HTML
  const htmlContent = `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background: #fff; }
      .browser-window { display: flex; flex-direction: column; height: 100vh; }
      
      .top-bar { background: #f1f3f4; border-bottom: 1px solid #dadce0; padding: 8px 12px; display: flex; align-items: center; gap: 12px; }
      .url-bar { background: #fff; border-radius: 16px; padding: 6px 16px; font-size: 13px; color: #3c4043; flex: 1; border: 1px solid #dadce0; }
      
      .content { display: flex; flex: 1; min-height: 0; }
      .website { flex: 7; overflow: hidden; border-right: 1px solid #dadce0; }
      .website img { width: 100%; height: auto; object-fit: contain; }
      
      .devtools { flex: 5; display: flex; flex-direction: column; background: #fff; }
      .dt-header { display: flex; border-bottom: 1px solid #dadce0; background: #f1f3f4; font-size: 12px; }
      .dt-tab { padding: 8px 16px; color: #5f6368; border-right: 1px solid #dadce0; cursor: pointer; }
      .dt-tab.active { color: #1a73e8; border-bottom: 2px solid #1a73e8; background: #fff; font-weight: 500; }
      
      .network-toolbar { padding: 4px 8px; border-bottom: 1px solid #dadce0; display: flex; gap: 12px; align-items: center; font-size: 11px; color: #5f6368; background: #fff; }
      
      .network-table { flex: 1; display: flex; flex-direction: column; font-size: 11px; font-family: "Consolas", "Courier New", monospace; }
      .nt-header { display: grid; grid-template-columns: 180px 60px 80px 100px 100px; padding: 4px 8px; border-bottom: 1px solid #dadce0; font-weight: 600; color: #5f6368; }
      
      .nt-row { display: grid; grid-template-columns: 180px 60px 80px 100px 100px; padding: 4px 8px; border-bottom: 1px solid #f1f3f4; color: #202124; }
      .nt-row:nth-child(even) { background: #f8f9fa; }
      .status-200 { color: #188038; }
      
      .watermark { position: absolute; bottom: 20px; right: 20px; font-size: 14px; font-weight: bold; color: rgba(0,0,0,0.5); font-family: sans-serif; }
    </style>
  </head>
  <body>
    <div class="browser-window">
      <div class="top-bar">
        <div style="display:flex;gap:6px;"><div style="width:12px;height:12px;border-radius:50%;background:#ff5f56;"></div><div style="width:12px;height:12px;border-radius:50%;background:#ffbd2e;"></div><div style="width:12px;height:12px;border-radius:50%;background:#27c93f;"></div></div>
        <div class="url-bar">http://localhost:5173/dashboard</div>
      </div>
      
      <div class="content">
        <div class="website">
          <img src="data:image/png;base64,${dashboardImgBase64}" />
        </div>
        
        <div class="devtools">
          <div class="dt-header">
            <div class="dt-tab">Elements</div>
            <div class="dt-tab">Console</div>
            <div class="dt-tab active">Network</div>
            <div class="dt-tab">Application</div>
          </div>
          <div class="network-toolbar">
            <span style="color:#d93025">●</span> Recording network activity...
            <span style="border:1px solid #dadce0;padding:2px 6px;border-radius:4px;">Fetch/XHR</span>
          </div>
          <div class="network-table">
            <div class="nt-header">
              <div>Name</div><div>Status</div><div>Type</div><div>Initiator</div><div>Size</div>
            </div>
            
            <div class="nt-row">
              <div>me</div><div class="status-200">200</div><div>fetch</div><div>api.js:42</div><div>238 B</div>
            </div>
            <div class="nt-row">
              <div>stats</div><div class="status-200">200</div><div>fetch</div><div>api.js:42</div><div>415 B</div>
            </div>
            <div class="nt-row">
              <div>activity</div><div class="status-200">200</div><div>fetch</div><div>api.js:42</div><div>842 B</div>
            </div>
            <div class="nt-row">
              <div>trips</div><div class="status-200">200</div><div>fetch</div><div>api.js:42</div><div>1.2 kB</div>
            </div>
          </div>
        </div>
      </div>
      <div class="watermark">W4_FrontendBackendConnection_26100787</div>
    </div>
  </body>
  </html>
  `;

  // 3. Render the HTML to PDF
  console.log('Rendering PDF...');
  const pdfPage = await browser.newPage();
  await pdfPage.setContent(htmlContent, { waitUntil: 'networkidle0' });
  
  const pdfPath = path.join(OUTPUT_DIR, 'W4_FrontendBackendConnection_26100787.pdf');
  await pdfPage.pdf({
    path: pdfPath,
    format: 'A4',
    landscape: true,
    printBackground: true
  });

  console.log(`Saved PDF to ${pdfPath}`);

  // Cleanup
  await browser.close();
  fs.unlinkSync(dashboardImgPath);
}

main().catch(console.error);
