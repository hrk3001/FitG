# FITG // FORGE & IRON ATHLETIC CLUB ⚡

> **High-Performance Strength, Olympic Lifting & Contrast Recovery Platform**  
> An uncompromising, full-stack athletic club web application featuring real-time class booking, athlete PR telemetry tracking, digital membership pass generation, and an authentic editorial design crafted to look distinctly human and non-AI.

---

## ⚡ Core Features

- **Live Facility Telemetry**: Real-time floor occupancy gauge tracking active athlete density across platforms and turf.
- **Weekly Training Schedule**: Filterable timetable (by day and training track: Strength & Conditioning, Hyrox Engine, Olympic Barbell Lab, Combat Striking, Contrast Recovery).
- **Interactive Spot Reservation**: Native `<dialog>` modal booking flow with duplicate prevention, capacity enforcement, and instant booking code generation (`FRG-XXXX`).
- **Athlete Locker Room & Digital Pass**:
  - Digital member RFID card with barcode/QR identifier.
  - Personal Record (PR) telemetry vault for compound lifts (Squat, Deadlift, Clean & Jerk, RowErg) with instant backend logging.
  - Active reservation ledger with one-click cancellation to release platform spots.
- **Guest Trial Pass Engine**: 24-hour drop-in pass generator issuing unique verification codes (`PASS-XXXX-FRG`).
- **Staff Operations Desk**: Slide-out administrator drawer for staff check-ins, booking ledger voiding, and telemetry audits.
- **Human-Crafted Aesthetic**: Industrial basalt charcoal (`#090a0c`), high-contrast electric volt lime (`#d4ff00`), architectural concrete typography, and authentic athletic photography. Zero AI clichés.

---

## 🛠️ Architecture & Tech Stack

- **Backend**: Node.js & Express.js REST API
- **Data Persistence**: Zero-dependency atomic file-persisted JSON database (`data/store.json`) with ACID-like swap guarantees. Runs natively on Windows, Linux, and Alpine Docker with zero C++ compilation hassles.
- **Frontend**: Modern HTML5 Semantic Architecture, Native CSS Custom Properties, and Vanilla ES6+ JavaScript (Blistering fast, 0ms hydration lag).
- **Deployment**: Ready for Docker, Render, Railway, Vercel, and Fly.io.

---

## 🚀 Quick Start (Run Locally)

### 1. Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### 2. Installation
```bash
git clone https://github.com/hrk3001/FitG.git
cd FitG
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Or start the production server:
```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📡 REST API Reference

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/health` | `GET` | Health check & uptime monitoring |
| `/api/club` | `GET` | Club telemetry and floor occupancy status |
| `/api/classes` | `GET` | List classes (supports `?day=` and `?category=`) |
| `/api/classes/:id` | `GET` | Class session details and remaining spots |
| `/api/bookings` | `POST` | Reserve a class spot (`classId`, `athleteName`, `athleteEmail`) |
| `/api/bookings` | `GET` | Query bookings by email |
| `/api/bookings/:id` | `DELETE`| Cancel reservation and release platform spot |
| `/api/day-pass` | `POST` | Generate verified 24-hour guest pass |
| `/api/memberships` | `GET` | Membership tiers, pricing, and perks |
| `/api/trainers` | `GET` | Coaching staff roster & credentials |
| `/api/members/me` | `GET` | Demo athlete profile, PRs, and active bookings |
| `/api/members/prs` | `POST` | Log a new Personal Record |
| `/api/admin/overview` | `GET` | Staff desk metrics & booking ledger |

---

## ☁️ Deployment Guide

### Option 1: Docker
```bash
# Build the Docker image
docker build -t fitg-gym .

# Run the container
docker run -p 3000:3000 fitg-gym
```

### Option 2: Render
1. Connect your GitHub repository `https://github.com/hrk3001/FitG` to [Render](https://render.com).
2. The included [`render.yaml`](render.yaml) will automatically configure the build and start commands.
3. Health check path is `/api/health`.

### Option 3: Vercel
1. Import the repository into [Vercel](https://vercel.com).
2. The included [`vercel.json`](vercel.json) routes API calls to the serverless function and serves static assets.

---

## 📄 License
ISC License &copy; 2026 FORGE & IRON ATHLETIC CLUB.
