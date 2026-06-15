# 🌍 SmartTrip Planner

### Smart Itinerary Generator for Personalized Sustainable Travel Experiences

An AI-powered travel planning platform that uses multiple intelligent agents to generate personalized, eco-friendly travel recommendations and optimized itineraries based on user preferences and sustainability goals.

---

## 🚀 Features

* **User Authentication**
  Secure registration and login using JWT-based authentication for personalized access.

* **Travel Preference Management**
  Users can input preferences such as budget, trip duration, destination type, interests, and sustainability priorities.

* **Multi-Agent Recommendation Engine**
  Multiple AI agents (Preference Agent, Destination Agent, Sustainability Agent) collaborate to analyze user inputs and generate accurate, personalized travel recommendations.

* **AI-Powered Itinerary Planner**
  Generates optimized day-wise travel plans including destinations, activities, accommodations, and transportation options.

* **Personalized Dashboard**
  Allows users to save itineraries, view past recommendations, and manage travel plans efficiently.

---

## 🤖 AI Integration

This project uses the **OpenAI API** to implement multiple intelligent agents:

* **Recommendation Agent** – Analyzes user preferences and suggests suitable destinations
* **Itinerary Planner Agent** – Generates structured, day-wise travel plans
* **Sustainability Agent** – Evaluates eco-friendly options and promotes sustainable travel

These agents work together to provide **context-aware, personalized, and intelligent travel experiences**.

---

## 🛠️ Tech Stack

* **Frontend:** React.js + Vite
* **Styling:** Tailwind CSS
* **Backend:** FastAPI (Python)
* **Database:** PostgreSQL
* **Authentication:** JWT-based authentication
* **Charts:** Recharts
* **Icons:** Lucide React
* **Deployment:** Vercel (Frontend), Render (Backend)
* **AI Integration:** OpenAI API

---

## 📂 Project Structure

```
SmartTrip-Planner/
│
├── frontend/                         # React frontend (Vite)
│   ├── index.html                    # HTML entry point
│   ├── package.json                  # Dependencies & scripts
│   ├── vite.config.js                # Vite configuration
│   ├── tailwind.config.js            # Tailwind CSS configuration
│   ├── postcss.config.js             # PostCSS configuration
│   └── src/
│       ├── main.jsx                  # React entry point
│       ├── App.jsx                   # Route definitions
│       ├── index.css                 # Global styles & Tailwind directives
│       ├── components/               # Reusable UI components
│       │   ├── Navbar.jsx            # Responsive navigation bar
│       │   ├── Hero.jsx              # Hero section with animations
│       │   ├── Card.jsx              # Reusable feature/info card
│       │   └── Footer.jsx            # Multi-column footer
│       └── pages/                    # Page components
│           ├── Home.jsx              # Landing page
│           ├── About.jsx             # About & mission page
│           ├── Dashboard.jsx         # Analytics dashboard
│           └── Login.jsx             # Authentication page
│
├── backend/                          # FastAPI backend (coming soon)
│   └── placeholder.txt
│
├── database/                         # Database scripts
│   └── schema.sql
│
├── docs/                             # Documentation
│   └── architecture.md
│
├── README.md
└── .gitignore
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js (v18+)
- npm (v9+)

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173/`

### Available Pages

| Page       | Route        | Description                              |
|------------|--------------|------------------------------------------|
| Home       | `/`          | Landing page with hero, features, CTA    |
| About      | `/about`     | Mission, values, tech stack, team         |
| Dashboard  | `/dashboard` | Analytics, charts, itineraries, eco-score |
| Login      | `/login`     | Sign in / Sign up with social auth       |

---

## 🎯 Project Goal

The goal of this project is to simplify travel planning by providing intelligent, personalized, and sustainable travel recommendations while supporting eco-friendly tourism and local communities.

---

## 📌 Future Enhancements

* Integration with real-time APIs (weather, maps, travel data)
* FastAPI backend with multi-agent AI coordination
* PostgreSQL database with Supabase
* User profile-based personalization
* Interactive UI for itinerary editing and sharing

---
