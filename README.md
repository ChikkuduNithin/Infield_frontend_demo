# MARI Field Monitoring App — Static Frontend Prototype

A modern, high-fidelity static frontend prototype for the internal **MARI Field Monitoring Application**, deployed across **ITC Limited (Paperboards & Specialty Papers Division - PSPD)**, **partner NGOs (Modern Architect Rural India - MARI, Pratham, BTWS)**, zonal managers, and rural field volunteers under **ITC Mission Sunehra Kal**.

Designed specifically for demonstrating the proposed user experience and workflow to non-technical managers and executive leadership.

---

## 1. Executive Summary

This prototype provides a complete, interactive, and responsive simulation of field monitoring operations:
- **Volunteer Mobile Experience (390 × 844 px)**: Mobile phone viewport with simulated selfie attendance, high-precision GPS geofencing, monthly school monitoring targets, interactive attendance calendar (green/red/Sunday blue underline), validated visit forms, historical route trails, and day punch-out summaries.
- **Manager Mobile Experience (390 × 844 px)**: Team roll-call hub (Present / Absent / Leave), volunteer scorecards, team quota completion metrics, Recharts performance graphs, monthly reports with real CSV download, and route audit trails.
- **Admin Web Dashboard (1440 × 900 px Desktop)**: Comprehensive administrative portal with executive KPI cards, weekly velocity area charts, user management (role assignment & modal dialogs), geo-tagged school directory (380 institutions), partner NGO allocation matrix, desktop reports hub, and master data taxonomy.
- **Persistent Presentation Switcher**: A sticky top navigation bar allowing presenters to switch roles instantly between Volunteer, Manager, Admin, and the Screen Showcase Gallery with zero re-login friction, plus a one-click **Reset Demo Data** button.

---

## 2. Technology Stack

- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS & CSS3 Design System (Navy `#0F172A`, Emerald Green `#10B981`, ITC Blue `#1E40AF`, Rose `#DC2626`, Slate `#F8FAFC`)
- **Navigation**: React Router v6
- **Icons**: Lucide React
- **Data Visualizations**: Recharts (Monthly target vs achieved bar charts, activity distribution donut charts, velocity area graphs)
- **Map & Routing**: Leaflet with OpenStreetMap tiles & high-fidelity GIS SVG topology canvas fallback
- **State Management & Persistence**: React Context API with `localStorage` synchronization
- **Automated Screenshot Suite**: Playwright with Chromium headless automation

---

## 3. Application Structure & Screens

### A. Volunteer Mobile App (8 Screens)
1. **Screen 1: Login (`/volunteer/login`)** — MARI & ITC branding, employee ID field, password toggle, remember-me checkbox, simulated validation, and 1-click demo account auto-fill.
2. **Screen 2: Punch-in (`/volunteer/punch-in`)** — Simulated selfie camera capture, GPS coordinates (`17.6534° N, 80.8987° E`), 4.2m precision geofence verification badge, date/time stamp, and attendance confirmation.
3. **Screen 3: Volunteer Dashboard (`/volunteer/dashboard`)** — Active attendance card, monthly targets (24 Schools, 1,200 Students, 450 Kits), 79.2% progress gauge, quick action cards, and today's activity feed.
4. **Screen 4: Attendance Calendar (`/volunteer/calendar`)** — October 2026 calendar grid with **green present dots**, **red absent dots**, **blue underlines beneath Sundays**, color legend, and selected-day detail drawer.
5. **Screen 5: Activity Selection (`/volunteer/activity-select`)** — Interactive cards for School Visit, Hospital Visit, Awareness Programme, Community Visit, Review Meeting, and Other Activity.
6. **Screen 6: School Visit Form (`/volunteer/school-form`)** — School dropdown from master registry, district, Principal Contacted Yes/No toggle, student headcount, quantity achieved, remarks, and GPS watermarked photo attachment.
7. **Screen 7: Route History (`/volunteer/route-history`)** — Historical GIS route preview with 5 recorded waypoint stops, polyline trail, stop timestamps, and distance calculation (14.8 km).
8. **Screen 8: Punch-out & Daily Summary (`/volunteer/punch-out`)** — Toggle to punch out or continue visits, today's aggregated metrics, issues/challenges encountered, next day plan, and final attendance submission.

### B. Manager Mobile App (7 Screens)
1. **Screen 1: Manager Dashboard (`/manager/dashboard`)** — Zonal overview, roll-call counters (15 Present, 2 Absent, 1 Leave), 82.8% team completion rate, and live field activity updates.
2. **Screen 2: Manager Punch-in (`/manager/punch-in`)** — Zonal project office geofence verification, manager selfie simulation, and confirmation flow.
3. **Screen 3: Volunteer Performance (`/manager/volunteers`)** — Searchable roster of volunteers, attendance chips, monthly target progress bars, and individual scorecards modal.
4. **Screen 4: Team Performance (`/manager/team-performance`)** — Monthly target vs actual Recharts bar chart, program distribution donut chart, and volunteer leaderboard.
5. **Screen 5: Monthly Report (`/manager/monthly-report`)** — Monthly performance matrix by volunteer and district, filter controls, and real CSV file export button.
6. **Screen 6: Day Summary Report (`/manager/day-summary`)** — Daily audit roll-call, activities logged, schools visited, and students reached.
7. **Screen 7: Volunteer Route History (`/manager/route-history`)** — Field personnel route inspection with volunteer selector, date picker, and GPS checkpoint audit.

### C. Admin Web Dashboard (6 Modules)
1. **Module 1: Executive Dashboard (`/admin/dashboard`)** — High-level KPI metric cards, weekly velocity area chart, district coverage progress bars, and administrative shortcuts.
2. **Module 2: User Management (`/admin/users`)** — Enterprise user directory with role filters, Add User modal, Edit User modal, and account active/inactive toggle.
3. **Module 3: School Registry (`/admin/schools`)** — Geo-tagged directory of 380 schools with UDISE codes, category filters, Add School modal, Edit modal, and detail view drawer.
4. **Module 4: Manager & NGO Matrix (`/admin/managers-orgs`)** — Partner NGO agency profiles (MARI, Pratham, BTWS), supervisor roster, and volunteer manager reassignment modal.
5. **Module 5: Reports Hub (`/admin/reports`)** — Desktop-optimized tabbed reporting suite for Monthly, Daily, Team Performance, and Route Audit with CSV downloads.
6. **Module 6: Master Data & Taxonomy (`/admin/master-data`)** — Administrative taxonomy configuration for States, Districts, School Categories, and Field Activities.

### D. Showcase Gallery (`/showcase`)
- Comprehensive presentation catalog showing visual preview cards of all 21 screens grouped by role, with screen numbers, key UI features, and direct 1-click **Open Screen** launcher buttons.

---

## 4. Setup & Running Instructions

### Prerequisites
- Node.js (v18+)
- PowerShell / Bash

### Installation
```bash
# In the project root
npm.cmd install
```

### Development Server
```bash
# Start local development server with Vite
npm.cmd run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

### Production Build & Preview
```bash
# Build production bundle
npm.cmd run build

# Preview production build locally
npm.cmd run preview
```

---

## 5. Automated Screenshot Capture

To capture high-resolution PNG screenshots of all 23 screens across mobile and desktop viewports:

```bash
# Run the automated Playwright capture script
npm.cmd run screenshots
```

The script will:
1. Spin up the local preview server.
2. Launch a headless browser.
3. Capture each volunteer and manager screen in **390 × 844 px mobile resolution** (retina 2x scale).
4. Capture each admin screen and the showcase gallery in **1440 × 900 px desktop resolution**.
5. Save all screenshots to `screenshots/*.png`.
6. Generate a standalone visual index at `screenshots/index.html`.

You can open `screenshots/index.html` directly in any web browser to review the complete image catalog.

---

## 6. Demo Navigation Guide for Presenters

1. **Role Switcher**: Click on **Volunteer App**, **Manager App**, or **Admin Web** on the top bar at any time.
2. **Mobile Viewport Toggle**: Click **390×844 Frame** on the top bar to toggle between the smartphone bezel frame and fluid full-width mode.
3. **Resetting Data**: If you submit custom forms or change user roles, click **Reset Demo** on the top bar to restore the initial sample dataset immediately.
4. **CSV Export**: On the Monthly Report screen (`/manager/monthly-report` or `/admin/reports`), click **Download Excel / CSV** to verify that real formatted CSV data is generated and downloaded to your computer.

---

## 7. Live Deployment Guide

### Option A: GitHub Pages (Automatic via GitHub Actions)
1. Go to your GitHub repository: [https://github.com/ChikkuduNithin/Infield_frontend_demo](https://github.com/ChikkuduNithin/Infield_frontend_demo)
2. Open **Settings** → **Pages**.
3. Under **Build and deployment** → **Source**, select **GitHub Actions**.
4. The repository includes `.github/workflows/deploy.yml` which automatically builds Vite and deploys the site live to:
   `https://chikkudunithin.github.io/Infield_frontend_demo/`

### Option B: Vercel (1-Click Deployment)
1. Log into [vercel.com](https://vercel.com) and click **Add New Project**.
2. Import `ChikkuduNithin/Infield_frontend_demo`.
3. Vercel automatically detects the Vite build (`npm run build`, output: `dist`).
4. Click **Deploy** to get an immediate production URL (e.g. `https://infield-frontend-demo.vercel.app`).

