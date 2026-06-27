<!-- 
  W2 Frontend Screenshots Guide
  ==============================
  
  STEP 1: Take 3 screenshots (instructions below)
  STEP 2: Combine into a single PDF
  STEP 3: Name it: W2_FrontendScreenshots_[YourInternID].pdf
  STEP 4: ZIP everything as: W2_Submission_[YourInternID].zip
-->

# Screenshot Instructions for W2 Submission

## Make sure the dev server is running:
```bash
cd frontend
npm run dev
```
App runs at: http://localhost:5173/

---

## Screenshot 1: Home Page (Desktop View - 1920×1080)

1. Open Chrome → Go to http://localhost:5173/
2. Press F11 for fullscreen (or maximize window to 1920×1080)
3. Press Win + Shift + S (Windows) to take screenshot
4. Save as: screenshot_home_desktop.png

---

## Screenshot 2: Home Page (Mobile View)

1. Open Chrome → Go to http://localhost:5173/
2. Press F12 to open DevTools
3. Click the "Toggle Device Toolbar" icon (phone/tablet icon at top-left of DevTools)
4. Select "iPhone 14 Pro" or "Pixel 7" from the device dropdown
5. Refresh the page
6. Take screenshot: Win + Shift + S
7. Save as: screenshot_home_mobile.png

---

## Screenshot 3: Dashboard Page (Desktop View)

1. Go to http://localhost:5173/dashboard
2. Make sure you're in desktop view (close DevTools device toolbar)
3. Press F11 for fullscreen
4. Take screenshot: Win + Shift + S
5. Save as: screenshot_dashboard.png

---

## Create PDF

### Option A: Using Microsoft Word
1. Open Word → Insert → Pictures → Select all 3 screenshots
2. One screenshot per page, resize to fit
3. Save As → PDF → Name: W2_FrontendScreenshots_[InternID].pdf

### Option B: Using online tool
1. Go to https://www.ilovepdf.com/jpg_to_pdf
2. Upload all 3 screenshots
3. Download as PDF
4. Rename to: W2_FrontendScreenshots_[InternID].pdf

### Option C: Using Chrome Print
1. Open each screenshot in Chrome (drag file into browser)
2. Press Ctrl+P → Destination: Save as PDF
3. Combine using https://www.ilovepdf.com/merge_pdf

---

## Create ZIP

1. Create folder: W2_Submission_[InternID]
2. Put the PDF inside: W2_FrontendScreenshots_[InternID].pdf
3. Right-click folder → Send to → Compressed (zipped) folder
4. Final file: W2_Submission_[InternID].zip

---

## Submission Checklist

- [ ] Dev server runs without errors (npm run dev)
- [ ] Home page has: Navbar, Hero, Card (6 cards in grid), Footer
- [ ] 3 additional routes: /about, /dashboard, /login
- [ ] All routes have Navbar and Footer
- [ ] Layout is responsive (no horizontal scroll on mobile)
- [ ] 4 components in /components folder (Navbar, Hero, Card, Footer)
- [ ] Minimum 3 commits with descriptive messages (feat:, fix:, chore:)
- [ ] 3 screenshots combined into single PDF
- [ ] PDF named: W2_FrontendScreenshots_[InternID].pdf
- [ ] ZIP named: W2_Submission_[InternID].zip
