/**
 * Generates lo-fi wireframe screens as a PDF for W3 submission.
 * Creates 5 wireframed screens: Home, Dashboard, Trip Detail/List, Login/Signup, AI Feature.
 * Lo-fi style: grey boxes, placeholder text, no colour.
 *
 * Usage: node scripts/generate-wireframes.js
 */

import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const OUTPUT_DIR = path.join(__dirname, '..', '..', 'W3_Submission');

async function main() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  console.log('🚀 Generating wireframes PDF...');

  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Users\\Srishti\\.cache\\puppeteer\\chrome\\win64-151.0.7893.0\\chrome-win64\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const wireframeHTML = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { font-family: 'Inter', sans-serif; background: #fff; color: #374151; }

      .page {
        page-break-after: always;
        width: 1440px;
        min-height: 900px;
        padding: 40px;
        position: relative;
        border: 2px solid #e5e7eb;
        background: #fafafa;
      }
      .page:last-child { page-break-after: avoid; }

      .page-label {
        position: absolute;
        top: 12px;
        right: 16px;
        font-size: 11px;
        font-weight: 600;
        color: #9ca3af;
        text-transform: uppercase;
        letter-spacing: 1px;
      }

      /* Wireframe primitives */
      .wf-box {
        background: #e5e7eb;
        border: 1.5px solid #d1d5db;
        border-radius: 8px;
      }
      .wf-box-dark {
        background: #d1d5db;
        border: 1.5px solid #9ca3af;
        border-radius: 8px;
      }
      .wf-text { color: #6b7280; font-size: 14px; }
      .wf-text-sm { color: #9ca3af; font-size: 12px; }
      .wf-text-lg { color: #374151; font-size: 18px; font-weight: 600; }
      .wf-text-xl { color: #374151; font-size: 28px; font-weight: 700; }
      .wf-text-2xl { color: #374151; font-size: 40px; font-weight: 700; line-height: 1.2; }
      .wf-btn {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 10px 24px;
        background: #9ca3af;
        border-radius: 10px;
        color: #fff;
        font-size: 14px;
        font-weight: 600;
      }
      .wf-btn-outline {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 10px 24px;
        background: transparent;
        border: 1.5px solid #d1d5db;
        border-radius: 10px;
        color: #6b7280;
        font-size: 14px;
        font-weight: 600;
      }
      .wf-input {
        width: 100%;
        padding: 12px 16px;
        border: 1.5px solid #d1d5db;
        border-radius: 10px;
        background: #f3f4f6;
        color: #9ca3af;
        font-size: 14px;
      }
      .wf-avatar {
        width: 40px;
        height: 40px;
        background: #d1d5db;
        border-radius: 50%;
        border: 1.5px solid #9ca3af;
      }
      .wf-icon {
        width: 40px;
        height: 40px;
        background: #d1d5db;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        color: #6b7280;
      }
      .wf-divider {
        height: 1px;
        background: #e5e7eb;
        margin: 16px 0;
      }

      /* Layout helpers */
      .flex { display: flex; }
      .flex-col { flex-direction: column; }
      .items-center { align-items: center; }
      .justify-between { justify-content: space-between; }
      .justify-center { justify-content: center; }
      .gap-2 { gap: 8px; }
      .gap-3 { gap: 12px; }
      .gap-4 { gap: 16px; }
      .gap-6 { gap: 24px; }
      .gap-8 { gap: 32px; }
      .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
      .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }
      .grid-4 { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 16px; }
      .w-full { width: 100%; }
      .text-center { text-align: center; }
      .mx-auto { margin-left: auto; margin-right: auto; }
      .mb-2 { margin-bottom: 8px; }
      .mb-3 { margin-bottom: 12px; }
      .mb-4 { margin-bottom: 16px; }
      .mb-6 { margin-bottom: 24px; }
      .mb-8 { margin-bottom: 32px; }
      .mt-4 { margin-top: 16px; }
      .p-4 { padding: 16px; }
      .p-6 { padding: 24px; }
      .p-8 { padding: 32px; }
      .flex-1 { flex: 1; }

      /* Navbar wireframe */
      .wf-nav {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px 40px;
        border-bottom: 1.5px solid #e5e7eb;
        margin-bottom: 32px;
        background: #fff;
      }
      .wf-nav-brand {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .wf-nav-logo {
        width: 36px;
        height: 36px;
        background: #d1d5db;
        border-radius: 10px;
      }
      .wf-nav-links {
        display: flex;
        gap: 32px;
      }
      .wf-nav-link {
        color: #6b7280;
        font-size: 14px;
        font-weight: 500;
      }
      .wf-nav-link.active {
        color: #374151;
        font-weight: 600;
        border-bottom: 2px solid #9ca3af;
        padding-bottom: 2px;
      }
    </style>
  </head>
  <body>

    <!-- ═══════════ SCREEN 1: HOME ═══════════ -->
    <div class="page">
      <div class="page-label">Screen 1 / 5 — Home Page</div>

      <!-- Nav -->
      <div class="wf-nav">
        <div class="wf-nav-brand">
          <div class="wf-nav-logo"></div>
          <span class="wf-text-lg">SmartTrip</span>
        </div>
        <div class="wf-nav-links">
          <span class="wf-nav-link active">Home</span>
          <span class="wf-nav-link">About</span>
          <span class="wf-nav-link">Dashboard</span>
          <span class="wf-nav-link">Login</span>
        </div>
        <div class="flex gap-2">
          <span class="wf-btn-outline">Sign In</span>
          <span class="wf-btn">Get Started</span>
        </div>
      </div>

      <!-- Hero -->
      <div class="text-center mb-8" style="padding: 60px 120px 40px">
        <div class="wf-box" style="display:inline-block; padding:6px 20px; border-radius:20px; margin-bottom:20px;">
          <span class="wf-text-sm">● AI-Powered Sustainable Travel Planning</span>
        </div>
        <div class="wf-text-2xl mb-4">Plan Smarter. Travel Greener.<br/>Explore Further.</div>
        <div class="wf-text mb-6" style="max-width:600px; margin:0 auto">
          Our multi-agent AI system crafts personalized itineraries that balance your preferences with eco-friendly choices.
        </div>
        <div class="flex justify-center gap-3 mb-8">
          <span class="wf-btn">Start Planning →</span>
          <span class="wf-btn-outline">▶ See How It Works</span>
        </div>
        <div class="grid-4" style="max-width:700px; margin:0 auto">
          <div class="wf-box p-4 text-center"><div class="wf-text-lg">50K+</div><div class="wf-text-sm">Trips Planned</div></div>
          <div class="wf-box p-4 text-center"><div class="wf-text-lg">120+</div><div class="wf-text-sm">Destinations</div></div>
          <div class="wf-box p-4 text-center"><div class="wf-text-lg">98%</div><div class="wf-text-sm">Satisfaction</div></div>
          <div class="wf-box p-4 text-center"><div class="wf-text-lg">2.4K</div><div class="wf-text-sm">CO₂ Saved</div></div>
        </div>
      </div>

      <!-- Feature Cards -->
      <div style="padding: 0 40px">
        <div class="text-center mb-6">
          <div class="wf-text-xl">Everything You Need to Travel Smart</div>
        </div>
        <div class="grid-3">
          ${['Multi-Agent AI Engine', 'Optimized Itineraries', 'Sustainable Travel', 'Secure & Private', 'Personal Dashboard', 'Instant Generation'].map(t => `
            <div class="wf-box p-6">
              <div class="wf-icon mb-3">■</div>
              <div class="wf-text-lg mb-2">${t}</div>
              <div class="wf-text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Brief feature description.</div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Footer -->
      <div style="position:absolute; bottom:0; left:0; right:0; padding:16px 40px; border-top:1.5px solid #e5e7eb; background:#fff;">
        <div class="flex justify-between items-center">
          <span class="wf-text-sm">© 2026 SmartTrip Planner</span>
          <div class="flex gap-4">
            <span class="wf-text-sm">Privacy</span>
            <span class="wf-text-sm">Terms</span>
            <span class="wf-text-sm">Contact</span>
          </div>
        </div>
      </div>
    </div>

    <!-- ═══════════ SCREEN 2: DASHBOARD ═══════════ -->
    <div class="page">
      <div class="page-label">Screen 2 / 5 — Dashboard</div>

      <div class="wf-nav">
        <div class="wf-nav-brand">
          <div class="wf-nav-logo"></div>
          <span class="wf-text-lg">SmartTrip</span>
        </div>
        <div class="wf-nav-links">
          <span class="wf-nav-link">Home</span>
          <span class="wf-nav-link">About</span>
          <span class="wf-nav-link active">Dashboard</span>
          <span class="wf-nav-link">Login</span>
        </div>
        <div class="flex gap-2 items-center">
          <div class="wf-icon" style="width:32px;height:32px;">☀</div>
          <div class="wf-avatar"></div>
        </div>
      </div>

      <div style="padding: 0 40px">
        <!-- Header -->
        <div class="flex justify-between items-center mb-6">
          <div>
            <div class="wf-text-xl">Welcome back, Srishti 👋</div>
            <div class="wf-text-sm mt-4">Here's your travel overview</div>
          </div>
          <div class="flex gap-2">
            <div class="wf-input" style="width:200px;">🔍 Search trips...</div>
            <span class="wf-btn">+ New Trip</span>
          </div>
        </div>

        <!-- Stats -->
        <div class="grid-4 mb-6">
          ${[['24', 'Total Trips', '↑ +12%'], ['18', 'Destinations', '↑ +8%'], ['2.4t', 'CO₂ Saved', '↑ +23%'], ['92', 'Eco Score', '↑ +5pt']].map(([val, label, change]) => `
            <div class="wf-box p-6">
              <div class="flex justify-between items-center mb-3">
                <div class="wf-icon" style="width:36px;height:36px;">■</div>
                <span class="wf-text-sm">${change}</span>
              </div>
              <div class="wf-text-xl">${val}</div>
              <div class="wf-text-sm">${label}</div>
            </div>
          `).join('')}
        </div>

        <!-- Chart + Eco Score -->
        <div class="flex gap-4 mb-6">
          <div class="wf-box p-6 flex-1" style="flex:2">
            <div class="wf-text-lg mb-4">Trip Activity</div>
            <div class="wf-box-dark" style="height:200px; display:flex; align-items:flex-end; padding:16px; gap:8px;">
              ${[40, 20, 60, 45, 80, 55, 95, 35, 70, 50, 25, 40].map(h => `<div style="flex:1; height:${h}%; background:#b0b8c4; border-radius:4px 4px 0 0;"></div>`).join('')}
            </div>
            <div class="flex justify-between mt-4">
              ${['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map(m => `<span class="wf-text-sm" style="font-size:10px">${m}</span>`).join('')}
            </div>
          </div>
          <div class="wf-box p-6" style="flex:1">
            <div class="wf-text-lg mb-4">Eco Impact</div>
            <div style="width:120px;height:120px;border-radius:50%;border:10px solid #d1d5db;margin:0 auto 16px;display:flex;align-items:center;justify-content:center;">
              <span class="wf-text-xl">92</span>
            </div>
            <div style="space-y:8px">
              ${['Transport 35%', 'Accommodation 25%', 'Activities 20%', 'Food 20%'].map(l => `
                <div class="flex justify-between mb-2"><span class="wf-text-sm">${l.split(' ')[0]}</span><span class="wf-text-sm">${l.split(' ')[1]}</span></div>
                <div class="wf-box" style="height:6px;border-radius:3px;margin-bottom:8px"><div class="wf-box-dark" style="height:100%;width:${l.split(' ')[1]};border-radius:3px"></div></div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Recent Itineraries -->
        <div class="wf-box p-6">
          <div class="wf-text-lg mb-4">Recent Itineraries</div>
          ${['Bali, Indonesia — 7 days — $1,200 — Score: 94', 'Swiss Alps — 5 days — $2,100 — Score: 88', 'Kyoto, Japan — 6 days — $1,800 — Score: 96'].map(t => `
            <div class="flex items-center justify-between p-4 wf-box mb-2">
              <div class="flex items-center gap-3">
                <div class="wf-icon" style="width:36px;height:36px;">■</div>
                <span class="wf-text">${t}</span>
              </div>
              <span class="wf-text-sm">→</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <!-- ═══════════ SCREEN 3: TRIP DETAIL / LIST VIEW ═══════════ -->
    <div class="page">
      <div class="page-label">Screen 3 / 5 — Trip Detail / List View</div>

      <div class="wf-nav">
        <div class="wf-nav-brand">
          <div class="wf-nav-logo"></div>
          <span class="wf-text-lg">SmartTrip</span>
        </div>
        <div class="wf-nav-links">
          <span class="wf-nav-link">Home</span>
          <span class="wf-nav-link active">Dashboard</span>
          <span class="wf-nav-link">About</span>
        </div>
        <div class="flex gap-2 items-center">
          <div class="wf-avatar"></div>
        </div>
      </div>

      <div style="padding: 0 40px">
        <!-- Breadcrumb -->
        <div class="wf-text-sm mb-6">Dashboard → Trip Detail</div>

        <!-- Trip Header -->
        <div class="flex gap-6 mb-6">
          <div class="wf-box-dark" style="width:360px; height:220px; border-radius:16px; display:flex; align-items:center; justify-content:center;">
            <span class="wf-text" style="font-size:48px;">🏝️</span>
          </div>
          <div class="flex-1">
            <div class="wf-text-2xl mb-2">Bali Adventure</div>
            <div class="wf-text mb-4">Indonesia • 7 Days • Dec 15–22, 2025</div>
            <div class="grid-3 mb-4">
              <div class="wf-box p-4 text-center"><div class="wf-text-lg">$1,200</div><div class="wf-text-sm">Budget</div></div>
              <div class="wf-box p-4 text-center"><div class="wf-text-lg">94</div><div class="wf-text-sm">Eco Score</div></div>
              <div class="wf-box p-4 text-center"><div class="wf-text-lg">12</div><div class="wf-text-sm">Activities</div></div>
            </div>
            <div class="flex gap-2">
              <span class="wf-btn">Edit Itinerary</span>
              <span class="wf-btn-outline">Share Trip</span>
              <span class="wf-btn-outline">Download PDF</span>
            </div>
          </div>
        </div>

        <!-- Day-wise Itinerary -->
        <div class="wf-text-xl mb-4">Day-wise Itinerary</div>
        <div class="flex gap-4">
          <div style="flex:2">
            ${[1, 2, 3].map(d => `
              <div class="wf-box p-6 mb-3">
                <div class="flex justify-between items-center mb-3">
                  <div class="wf-text-lg">Day ${d}</div>
                  <span class="wf-text-sm">${d === 1 ? 'Dec 15' : d === 2 ? 'Dec 16' : 'Dec 17'}</span>
                </div>
                ${['Morning Activity — Lorem ipsum placeholder text', 'Afternoon Activity — Lorem ipsum placeholder text', 'Evening Activity — Lorem ipsum placeholder text'].map(a => `
                  <div class="flex items-center gap-3 mb-2">
                    <div class="wf-icon" style="width:28px;height:28px;font-size:10px;">■</div>
                    <span class="wf-text-sm">${a}</span>
                  </div>
                `).join('')}
              </div>
            `).join('')}
          </div>
          <div style="flex:1">
            <div class="wf-box p-6">
              <div class="wf-text-lg mb-4">Trip Summary</div>
              <div class="wf-text-sm mb-2">🏨 Accommodation: Eco Resort</div>
              <div class="wf-text-sm mb-2">🚗 Transport: Electric Shuttle</div>
              <div class="wf-text-sm mb-2">🍽️ Meals: Local Restaurants</div>
              <div class="wf-text-sm mb-2">🌿 Carbon Offset: 0.3t</div>
              <div class="wf-divider"></div>
              <div class="wf-text-sm mb-2">Tags:</div>
              <div class="flex gap-2">
                <span class="wf-box p-4" style="padding:4px 12px;border-radius:20px"><span class="wf-text-sm">Beach</span></span>
                <span class="wf-box p-4" style="padding:4px 12px;border-radius:20px"><span class="wf-text-sm">Culture</span></span>
                <span class="wf-box p-4" style="padding:4px 12px;border-radius:20px"><span class="wf-text-sm">Eco</span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ═══════════ SCREEN 4: LOGIN / SIGNUP ═══════════ -->
    <div class="page" style="display:flex;align-items:center;justify-content:center;">
      <div class="page-label">Screen 4 / 5 — Login / Signup</div>

      <div class="flex gap-8" style="width:1000px;">
        <!-- Left: Branding -->
        <div style="flex:1;padding:40px;">
          <div class="flex items-center gap-3 mb-8">
            <div class="wf-nav-logo" style="width:48px;height:48px;"></div>
            <span class="wf-text-xl">SmartTrip</span>
          </div>
          <div class="wf-text-2xl mb-4" style="font-size:32px;">Your Sustainable Travel Journey Starts Here</div>
          <div class="wf-text mb-8">Join thousands of conscious travelers who plan smarter with AI.</div>
          ${['Personalized AI itineraries', 'Eco-friendly recommendations', 'Save and manage plans', 'Track sustainability impact'].map(f => `
            <div class="flex items-center gap-3 mb-3">
              <div style="width:8px;height:8px;background:#b0b8c4;border-radius:50%"></div>
              <span class="wf-text-sm">${f}</span>
            </div>
          `).join('')}
        </div>

        <!-- Right: Form -->
        <div style="flex:1;">
          <div class="wf-box p-8" style="border-radius:20px;">
            <!-- Toggle -->
            <div class="flex mb-6" style="background:#f3f4f6;border-radius:12px;padding:4px;">
              <div style="flex:1;text-align:center;padding:10px;background:#d1d5db;border-radius:10px;" class="wf-text" >Sign In</div>
              <div style="flex:1;text-align:center;padding:10px;" class="wf-text-sm">Sign Up</div>
            </div>

            <div class="wf-text-xl mb-2">Welcome back</div>
            <div class="wf-text-sm mb-6">Sign in to access your travel dashboard</div>

            <!-- Social -->
            <div class="grid-2 mb-4">
              <div class="wf-box p-4 text-center"><span class="wf-text-sm">⬡ Google</span></div>
              <div class="wf-box p-4 text-center"><span class="wf-text-sm">⬡ GitHub</span></div>
            </div>

            <div class="flex items-center gap-3 mb-4">
              <div style="flex:1;height:1px;background:#e5e7eb;"></div>
              <span class="wf-text-sm">OR</span>
              <div style="flex:1;height:1px;background:#e5e7eb;"></div>
            </div>

            <!-- Form -->
            <div class="mb-3"><div class="wf-text-sm mb-2">Email Address</div><div class="wf-input">✉ you@example.com</div></div>
            <div class="mb-3"><div class="wf-text-sm mb-2">Password</div><div class="wf-input">🔒 ••••••••</div></div>
            <div class="flex justify-between items-center mb-4">
              <div class="flex items-center gap-2"><div class="wf-box" style="width:16px;height:16px;border-radius:4px;"></div><span class="wf-text-sm">Remember me</span></div>
              <span class="wf-text-sm">Forgot password?</span>
            </div>
            <div class="wf-btn w-full text-center" style="display:block;">Sign In →</div>
            <div class="wf-text-sm text-center mt-4">By continuing, you agree to Terms & Privacy Policy</div>
          </div>
        </div>
      </div>
    </div>

    <!-- ═══════════ SCREEN 5: AI FEATURE ═══════════ -->
    <div class="page">
      <div class="page-label">Screen 5 / 5 — AI Trip Generator</div>

      <div class="wf-nav">
        <div class="wf-nav-brand">
          <div class="wf-nav-logo"></div>
          <span class="wf-text-lg">SmartTrip</span>
        </div>
        <div class="wf-nav-links">
          <span class="wf-nav-link">Home</span>
          <span class="wf-nav-link">Dashboard</span>
          <span class="wf-nav-link active">AI Planner</span>
        </div>
        <div class="flex gap-2 items-center"><div class="wf-avatar"></div></div>
      </div>

      <div style="padding: 0 40px;">
        <div class="text-center mb-8">
          <div class="wf-box" style="display:inline-block;padding:6px 20px;border-radius:20px;margin-bottom:16px;">
            <span class="wf-text-sm">✨ Multi-Agent AI System</span>
          </div>
          <div class="wf-text-2xl mb-2" style="font-size:32px;">AI-Powered Trip Generator</div>
          <div class="wf-text">Tell our AI agents your preferences and get a personalized, sustainable itinerary</div>
        </div>

        <div class="flex gap-6">
          <!-- Left: Input Form -->
          <div class="wf-box p-8" style="flex:1;border-radius:20px;">
            <div class="wf-text-lg mb-6">Your Preferences</div>
            <div class="mb-4"><div class="wf-text-sm mb-2">Destination Type</div><div class="wf-input">🌍 Beach, Mountain, City...</div></div>
            <div class="mb-4"><div class="wf-text-sm mb-2">Budget Range</div><div class="wf-input">💰 $500 - $2,000</div></div>
            <div class="grid-2 mb-4">
              <div><div class="wf-text-sm mb-2">Duration</div><div class="wf-input">📅 7 days</div></div>
              <div><div class="wf-text-sm mb-2">Travelers</div><div class="wf-input">👥 2 adults</div></div>
            </div>
            <div class="mb-4"><div class="wf-text-sm mb-2">Interests</div>
              <div class="flex gap-2">
                ${['Culture', 'Adventure', 'Food', 'Nature', 'History'].map(t => `<span class="wf-box" style="padding:6px 16px;border-radius:20px"><span class="wf-text-sm">${t}</span></span>`).join('')}
              </div>
            </div>
            <div class="mb-4"><div class="wf-text-sm mb-2">Sustainability Priority</div>
              <div class="wf-box" style="height:8px;border-radius:4px;position:relative;">
                <div class="wf-box-dark" style="height:100%;width:75%;border-radius:4px;"></div>
                <div style="position:absolute;top:-4px;left:75%;width:16px;height:16px;background:#9ca3af;border-radius:50%;border:2px solid #fff;"></div>
              </div>
              <div class="flex justify-between mt-4"><span class="wf-text-sm">Low</span><span class="wf-text-sm">High</span></div>
            </div>
            <div class="mb-4"><div class="wf-text-sm mb-2">Special Notes</div><div class="wf-input" style="height:80px;">Type any special requirements...</div></div>
            <div class="wf-btn w-full text-center" style="display:block;">✨ Generate AI Itinerary →</div>
          </div>

          <!-- Right: AI Agent Status -->
          <div style="flex:1;" class="flex flex-col gap-4">
            <div class="wf-box p-6" style="border-radius:16px;">
              <div class="wf-text-lg mb-4">AI Agent Pipeline</div>
              ${[
                ['🧠', 'Preference Agent', 'Analyzing your inputs...', 'Active'],
                ['🗺️', 'Destination Agent', 'Matching destinations...', 'Queued'],
                ['🌿', 'Sustainability Agent', 'Evaluating eco-impact...', 'Queued']
              ].map(([icon, name, desc, status]) => `
                <div class="flex items-center gap-4 p-4 wf-box mb-3">
                  <div class="wf-icon">${icon}</div>
                  <div class="flex-1">
                    <div class="wf-text" style="font-weight:600">${name}</div>
                    <div class="wf-text-sm">${desc}</div>
                  </div>
                  <span class="wf-box" style="padding:4px 12px;border-radius:20px"><span class="wf-text-sm">${status}</span></span>
                </div>
              `).join('')}
            </div>

            <div class="wf-box p-6" style="border-radius:16px;">
              <div class="wf-text-lg mb-4">Preview: Generated Itinerary</div>
              <div class="wf-box-dark p-4 mb-3" style="border-radius:12px;">
                <div class="wf-text" style="font-weight:600;">Day 1 — Arrival & Exploration</div>
                <div class="wf-text-sm mt-4">Check-in at eco-resort • Local market tour • Sunset beach walk</div>
              </div>
              <div class="wf-box-dark p-4 mb-3" style="border-radius:12px;">
                <div class="wf-text" style="font-weight:600;">Day 2 — Cultural Immersion</div>
                <div class="wf-text-sm mt-4">Temple visit • Traditional cooking class • Artisan village</div>
              </div>
              <div class="wf-box-dark p-4" style="border-radius:12px;">
                <div class="wf-text" style="font-weight:600;">Day 3 — Nature & Adventure</div>
                <div class="wf-text-sm mt-4">Rainforest trek • Waterfall visit • Stargazing experience</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </body>
  </html>
  `;

  const page = await browser.newPage();
  await page.setContent(wireframeHTML, { waitUntil: 'networkidle0' });

  const pdfPath = path.join(OUTPUT_DIR, 'W3_Wireframes_26100787.pdf');
  await page.pdf({
    path: pdfPath,
    width: '1440px',
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
  });
  console.log('✅ Wireframes PDF saved:', pdfPath);

  await browser.close();
  console.log('🎉 Done!');
}

main();
