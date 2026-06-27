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

* **RESTful API Backend**
  Full CRUD operations for trips, JWT authentication, dashboard analytics, and search — all powered by FastAPI.

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
* **Database:** In-memory (PostgreSQL planned for Week 5)
* **Authentication:** JWT-based authentication (python-jose + passlib/bcrypt)
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
│   ├── vite.config.js                # Vite configuration + API proxy
│   ├── tailwind.config.js            # Tailwind CSS configuration
│   ├── postcss.config.js             # PostCSS configuration
│   └── src/
│       ├── main.jsx                  # React entry point
│       ├── App.jsx                   # Route definitions
│       ├── index.css                 # Global styles & Tailwind directives
│       ├── services/
│       │   └── api.js                # Centralized API client (fetch)
│       ├── context/
│       │   ├── ThemeContext.jsx       # Dark/Light theme context
│       │   └── AuthContext.jsx        # Authentication context
│       ├── components/               # Reusable UI components
│       │   ├── Navbar.jsx            # Responsive navigation bar
│       │   ├── Hero.jsx              # Hero section with animations
│       │   ├── Card.jsx              # Reusable feature/info card
│       │   ├── Footer.jsx            # Multi-column footer
│       │   └── ui/                   # Component library
│       │       ├── Button.jsx        # Button component
│       │       ├── Input.jsx         # Input component
│       │       ├── Loader.jsx        # Loading indicators (spinner, dots, skeleton, pulse)
│       │       ├── Modal.jsx         # Accessible modal dialog
│       │       ├── Toast.jsx         # Toast notification system
│       │       └── index.js          # Barrel export
│       └── pages/                    # Page components
│           ├── Home.jsx              # Landing page
│           ├── About.jsx             # About & mission page
│           ├── Dashboard.jsx         # Analytics dashboard (API-connected)
│           ├── Login.jsx             # Authentication page (API-connected)
│           └── Showcase.jsx          # Component showcase
│
├── backend/                          # FastAPI backend (Python)
│   ├── server.py                     # Main app — CORS, routes, exception handlers
│   ├── config.py                     # Environment config loader
│   ├── requirements.txt              # Python dependencies
│   ├── .env                          # Environment variables (gitignored)
│   ├── .env.example                  # Template for env vars
│   ├── auth/
│   │   ├── __init__.py
│   │   └── utils.py                  # JWT token + bcrypt password hashing
│   ├── models/
│   │   ├── __init__.py
│   │   ├── user.py                   # User Pydantic schemas
│   │   ├── trip.py                   # Trip Pydantic schemas
│   │   └── stats.py                  # Dashboard stats schemas
│   ├── data/
│   │   ├── __init__.py
│   │   └── store.py                  # In-memory data store + seed data
│   └── routes/
│       ├── __init__.py
│       ├── auth_routes.py            # /api/auth/* endpoints
│       ├── trip_routes.py            # /api/trips/* endpoints
│       └── dashboard_routes.py       # /api/dashboard/* endpoints
│
├── database/                         # Database scripts
│   └── schema.sql
│
├── docs/                             # Documentation
│   └── architecture.md
│
├── W4_APICollection_26100787.json    # Postman collection (Week 4)
├── README.md
└── .gitignore
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js (v18+)
- npm (v9+)
- Python (v3.10+)
- pip

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create a virtual environment
python -m venv venv

# Activate the virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Copy environment template and configure
cp .env.example .env
# Edit .env with your preferred SECRET_KEY

# Start the backend server
uvicorn server:app --reload --port 8000
```

The API will be available at `http://localhost:8000`
Interactive API docs (Swagger UI) at `http://localhost:8000/docs`

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

> **Note:** The Vite dev server is configured to proxy `/api` requests to `http://localhost:8000`, so both servers can run simultaneously without CORS issues.

### Running Both Servers

Open two terminal windows:

**Terminal 1 — Backend:**
```bash
cd backend
venv\Scripts\activate   # or source venv/bin/activate
uvicorn server:app --reload --port 8000
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
```

### Demo Credentials

Use these to log in immediately:
- **Email:** `srishti@example.com`
- **Password:** `password123`

---

## 🔗 API Endpoints

| # | Method | Endpoint | Auth | Description |
|---|--------|----------|------|-------------|
| 1 | `GET` | `/api/health` | No | Health check |
| 2 | `POST` | `/api/auth/register` | No | Register new user |
| 3 | `POST` | `/api/auth/login` | No | Login → JWT token |
| 4 | `GET` | `/api/auth/me` | Yes | Get current user |
| 5 | `GET` | `/api/trips` | Yes | List all trips |
| 6 | `GET` | `/api/trips/{id}` | Yes | Get single trip |
| 7 | `POST` | `/api/trips` | Yes | Create trip |
| 8 | `PUT` | `/api/trips/{id}` | Yes | Update trip |
| 9 | `DELETE` | `/api/trips/{id}` | Yes | Delete trip |
| 10 | `GET` | `/api/trips/search?q=` | Yes | Search trips |
| 11 | `GET` | `/api/dashboard/stats` | Yes | Dashboard stats |
| 12 | `GET` | `/api/dashboard/activity` | Yes | Activity chart data |

---

## 📊 Available Pages

| Page       | Route        | Description                              |
|------------|--------------|------------------------------------------|
| Home       | `/`          | Landing page with hero, features, CTA    |
| About      | `/about`     | Mission, values, tech stack, team         |
| Dashboard  | `/dashboard` | Analytics, charts, itineraries, eco-score |
| Login      | `/login`     | Sign in / Sign up with API auth          |
| Showcase   | `/showcase`  | Component library showcase               |

---

## 🎯 Project Goal

The goal of this project is to simplify travel planning by providing intelligent, personalized, and sustainable travel recommendations while supporting eco-friendly tourism and local communities.

---

## 📌 Future Enhancements

* Integration with real-time APIs (weather, maps, travel data)
* PostgreSQL database with Supabase (Week 5)
* Multi-agent AI coordination with OpenAI
* User profile-based personalization
* Interactive UI for itinerary editing and sharing

---
