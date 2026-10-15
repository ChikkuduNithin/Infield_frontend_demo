import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDemo } from '../../context/DemoContext';
import {
  Smartphone,
  ShieldCheck,
  Building2,
  ExternalLink,
  Filter,
  CheckCircle,
  Eye,
  Camera,
  Calendar,
  School,
  MapPin,
  FileSpreadsheet,
  Users,
  BarChart3,
  Layers,
  ArrowRight,
  Truck,
  Building,
  GraduationCap
} from 'lucide-react';

export default function ShowcaseGallery() {
  const navigate = useNavigate();
  const { setActiveRole } = useDemo();
  const [filter, setFilter] = useState('all');

  const screens = [
    // --- 1. Coordinator Mobile App (8 screens) ---
    {
      id: 'vol-login',
      group: 'coordinator',
      roleLabel: 'Coordinator Mobile App',
      screenNumber: 'Screen 1',
      title: 'Coordinator Login (10-Digit Mobile)',
      path: '/volunteer/login',
      img: '01_volunteer_login.png',
      description: 'ITC WoW branding, 10-digit mobile number authentication with 1-week session persistence, remember-me toggle, demo credentials auto-fill, and simulated validation.',
      keyFeatures: ['10-digit mobile number login', '1-week active session badge', 'Password visibility toggle', 'Demo auto-fill button'],
      color: 'teal',
      icon: Smartphone
    },
    {
      id: 'vol-punchin',
      group: 'coordinator',
      roleLabel: 'Coordinator Mobile App',
      screenNumber: 'Screen 2',
      title: 'Geotagged Selfie Punch-In',
      path: '/volunteer/punch-in',
      img: '02_volunteer_punch_in.png',
      description: 'Geotagged selfie capture preview, GPS coordinates display (17.6534° N, 80.8987° E), cluster geofence lock verification, and attendance submission flow.',
      keyFeatures: ['Geotagged selfie simulation', 'High precision GPS coordinates', 'Cluster geofence verification', 'Punch-in confirmation card'],
      color: 'teal',
      icon: Camera
    },
    {
      id: 'vol-dash',
      group: 'coordinator',
      roleLabel: 'Coordinator Mobile App',
      screenNumber: 'Screen 3',
      title: 'Coordinator Home & Pending Slips',
      path: '/volunteer/dashboard',
      img: '03_volunteer_dashboard.png',
      description: 'Monthly target vs actual recovery (Kg, Schools, Colleges), pending activities drawer (missing collection slips), official holiday modal, and downloads repository.',
      keyFeatures: ['Actual vs Plan Dry Waste (Kg)', 'Pending activities drawer for slips', 'Official 2026 holiday calendar modal', 'Downloads & slip formats modal'],
      color: 'teal',
      icon: School
    },
    {
      id: 'vol-cal',
      group: 'coordinator',
      roleLabel: 'Coordinator Mobile App',
      screenNumber: 'Screen 4',
      title: 'Attendance Calendar & Corrections',
      path: '/volunteer/calendar',
      img: '04_volunteer_calendar.png',
      description: '7 attendance color codes (Today, Holiday, Full day, Half day, Absent, Leave, Corrected), Sunday blue indicators, and Raise Correction Request modal with mandatory leave slip upload.',
      keyFeatures: ['7 PRD attendance color codes', 'Sunday blue indicator', 'Missed punch correction request', 'Absent to Leave with slip upload'],
      color: 'teal',
      icon: Calendar
    },
    {
      id: 'vol-act-sel',
      group: 'coordinator',
      roleLabel: 'Coordinator Mobile App',
      screenNumber: 'Screen 5',
      title: 'Task Selection (6 Official Workflows)',
      path: '/volunteer/activity-select',
      img: '05_volunteer_activity_select.png',
      description: '6 official PRD task workflows: School Visit (ISRS & ISRC), College Visit, Corporate Visit, Household Propagation, Office Visits, and Other Activities.',
      keyFeatures: ['School ISRS/ISRC workflow', 'College collection drive', 'Corporate recovery module', 'Sub-task capability badges'],
      color: 'teal',
      icon: Layers
    },
    {
      id: 'vol-form',
      group: 'coordinator',
      roleLabel: 'Coordinator Mobile App',
      screenNumber: 'Screen 6',
      title: 'Master Task Form (ISRS / ISRC)',
      path: '/volunteer/school-form?type=school_visit',
      img: '06_volunteer_school_form.png',
      description: 'ISRS Permission (Yes/No + Consent upload), ISRS Awareness, ISRC Collection Drive (Franchise selector, Day 1 & Day 2 Kg logic, weighbridge Net weight, and acknowledgement slip upload).',
      keyFeatures: ['ISRS Permission Consent upload', 'Franchise dropdown selector', 'Day 1 & Day 2 Kg collection logic', 'Weighbridge Net weight Kg input'],
      color: 'teal',
      icon: FileSpreadsheet
    },
    {
      id: 'vol-route',
      group: 'coordinator',
      roleLabel: 'Coordinator Mobile App',
      screenNumber: 'Screen 7',
      title: 'Route History & GPS Trail',
      path: '/volunteer/route-history',
      img: '07_volunteer_route_history.png',
      description: 'Historical GPS breadcrumbs recorded during coordinator punch-in and collection drives, connecting route line, checkpoint timeline, and 14.8 km distance.',
      keyFeatures: ['Historical GPS breadcrumbs', '5 verified collection stops', 'Timestamped visit timeline', 'Logged distance calculation'],
      color: 'teal',
      icon: MapPin
    },
    {
      id: 'vol-punchout',
      group: 'coordinator',
      roleLabel: 'Coordinator Mobile App',
      screenNumber: 'Screen 8',
      title: 'Geotagged Punch-Out & Reconciliation',
      path: '/volunteer/punch-out',
      img: '08_volunteer_punch_out.png',
      description: 'Geotagged selfie on punch-out, daily reconciliation metrics (Schools, Colleges, Dry Waste Kg), challenges textarea, and tomorrow’s work plan.',
      keyFeatures: ['Geotagged selfie punch-out', 'Daily dry waste reconciliation', 'Tomorrow’s institutional plan', 'Final attendance submission'],
      color: 'teal',
      icon: CheckCircle
    },

    // --- 2. Supervisor Mobile App (7 screens) ---
    {
      id: 'mgr-dash',
      group: 'manager',
      roleLabel: 'Supervisor Mobile App',
      screenNumber: 'Screen 1',
      title: 'Supervisor Dashboard & Roll-Call',
      path: '/manager/dashboard',
      img: '09_manager_dashboard.png',
      description: 'Zonal supervisory overview with coordinator roll-call, pending activities review, approve coordinator correction requests, and NGO compliance tracker modal.',
      keyFeatures: ['Live coordinator roll-call', 'Approve correction requests modal', 'Pending slips review drawer', 'NGO compliance tracker modal'],
      color: 'slate',
      icon: ShieldCheck
    },
    {
      id: 'mgr-punch',
      group: 'manager',
      roleLabel: 'Supervisor Mobile App',
      screenNumber: 'Screen 2',
      title: 'Supervisor Attendance Punch-In',
      path: '/manager/punch-in',
      img: '10_manager_punch_in.png',
      description: 'Zonal office geofence verification, supervisor geotagged selfie capture simulation, coordinates timestamp, and confirmation flow.',
      keyFeatures: ['Zonal base geofence verification', 'Supervisor selfie simulation', 'One-click attendance confirmation'],
      color: 'slate',
      icon: Camera
    },
    {
      id: 'mgr-vol-perf',
      group: 'manager',
      roleLabel: 'Supervisor Mobile App',
      screenNumber: 'Screen 3',
      title: 'Coordinator Performance & State DB',
      path: '/manager/volunteers',
      img: '11_manager_volunteer_performance.png',
      description: 'Coordinator dry waste scorecards + State Database (TS) tab with full list of Schools, Colleges, and Corporates with CSV export capability.',
      keyFeatures: ['Coordinator scorecards', 'State Database (TS) institutional tab', 'Detailed coordinator drawer', 'Export State Database CSV'],
      color: 'slate',
      icon: Users
    },
    {
      id: 'mgr-team-perf',
      group: 'manager',
      roleLabel: 'Supervisor Mobile App',
      screenNumber: 'Screen 4',
      title: 'Team Recovery Velocity',
      path: '/manager/team-performance',
      img: '12_manager_team_performance.png',
      description: 'Monthly dry waste target vs achieved Recharts bar graph (Kg), task stream distribution chart, and coordinator recovery leaderboard.',
      keyFeatures: ['Dry waste recovery trend bar chart', 'Task stream distribution donut', 'Coordinator scorecards leaderboard'],
      color: 'slate',
      icon: BarChart3
    },
    {
      id: 'mgr-monthly',
      group: 'manager',
      roleLabel: 'Supervisor Mobile App',
      screenNumber: 'Screen 5',
      title: 'Monthly Report & Recovery CSV',
      path: '/manager/monthly-report',
      img: '13_manager_monthly_report.png',
      description: 'Monthly recovery performance matrix by coordinator and district, dry waste Kg, pending slips flag, and real CSV file export.',
      keyFeatures: ['Month & district filters', 'Planned vs collected Kg matrix', 'Pending collection slips audit', 'Real CSV file download export'],
      color: 'slate',
      icon: FileSpreadsheet
    },
    {
      id: 'mgr-day-sum',
      group: 'manager',
      roleLabel: 'Supervisor Mobile App',
      screenNumber: 'Screen 6',
      title: 'Day Summary & Deliverables',
      path: '/manager/day-summary',
      img: '14_manager_day_summary.png',
      description: 'Date-based daily audit report showing coordinator roll-call, schools visited, colleges covered, dry waste collected, and slip verification status.',
      keyFeatures: ['Date selector', 'Roll-call attendance breakdown', 'Net dry waste recovery totals', 'Slip verification status chips'],
      color: 'slate',
      icon: Calendar
    },
    {
      id: 'mgr-route-hist',
      group: 'manager',
      roleLabel: 'Supervisor Mobile App',
      screenNumber: 'Screen 7',
      title: 'Coordinator Route Audit',
      path: '/manager/route-history',
      img: '15_manager_route_history.png',
      description: 'Historical GPS route visualizer with coordinator selector, date picker, map route preview, and GPS breadcrumb integrity audit.',
      keyFeatures: ['Coordinator dropdown selector', 'Audit date picker', 'Historical GPS route preview', 'Stop duration timestamps'],
      color: 'slate',
      icon: MapPin
    },

    // --- 3. Admin Web Console (6 modules) ---
    {
      id: 'adm-dash',
      group: 'admin',
      roleLabel: 'Admin Web Console',
      screenNumber: 'Module 1',
      title: 'Executive Admin Dashboard',
      path: '/admin/dashboard',
      img: '16_admin_dashboard.png',
      description: 'Command centre with 6 core KPIs, weekly dry waste recovery velocity area chart, district coverage matrix, and governance navigation.',
      keyFeatures: ['Dry waste tonnage metrics (MT)', 'Weekly recovery velocity area chart', 'District coverage progress bars', 'Executive governance controls'],
      color: 'slate',
      icon: Building2
    },
    {
      id: 'adm-users',
      group: 'admin',
      roleLabel: 'Admin Web Console',
      screenNumber: 'Module 2',
      title: 'Employee Database & Roles',
      path: '/admin/users',
      img: '17_admin_users.png',
      description: 'Employee directory with 10-digit mobile login keys, search & role filters, Add/Edit modal forms, and account active/inactive toggle.',
      keyFeatures: ['Registered mobile login keys', 'Add/Edit employee modal forms', 'Role assignment (4 tiers)', 'Account status toggle'],
      color: 'slate',
      icon: Users
    },
    {
      id: 'adm-schools',
      group: 'admin',
      roleLabel: 'Admin Web Console',
      screenNumber: 'Module 3',
      title: 'State Database (Schools/Colleges/Corp)',
      path: '/admin/schools',
      img: '18_admin_schools.png',
      description: 'Institutional directory covering Schools (UDISE), Colleges, and Corporates with category filters, Add/Edit modals, and detailed view drawer.',
      keyFeatures: ['Schools, Colleges & Corporates tabs', 'UDISE & registration tracking', 'Add/Edit institution modals', 'Stakeholder contact directory'],
      color: 'slate',
      icon: School
    },
    {
      id: 'adm-mgr-org',
      group: 'admin',
      roleLabel: 'Admin Web Console',
      screenNumber: 'Module 4',
      title: 'Franchise Database & NGO Allocation',
      path: '/admin/managers-orgs',
      img: '19_admin_managers_orgs.png',
      description: 'Franchise Database (code, vendor, vehicle, GST, status) for NGO Admin, plus NGO State Mandates and coordinator supervisory roster.',
      keyFeatures: ['Material collection franchise CRUD', 'Vehicle registration & GST tracking', 'NGO state allocation matrix', 'Reassign supervisor modal dialog'],
      color: 'slate',
      icon: Truck
    },
    {
      id: 'adm-reports',
      group: 'admin',
      roleLabel: 'Admin Web Console',
      screenNumber: 'Module 5',
      title: 'Reports & Recovery Hub',
      path: '/admin/reports',
      img: '20_admin_reports.png',
      description: 'Desktop-optimized reporting suite with Monthly Recovery, Daily Roll-Call, Team Performance Charts, Route History, and PRD downloads repository.',
      keyFeatures: ['Dry waste recovery breakdowns', 'Daily weighbridge reconciliation', 'Interactive route map audit', 'PRD official downloads repository'],
      color: 'slate',
      icon: FileSpreadsheet
    },
    {
      id: 'adm-master',
      group: 'admin',
      roleLabel: 'Admin Web Console',
      screenNumber: 'Module 6',
      title: 'Holiday Calendar & Master Data',
      path: '/admin/master-data',
      img: '21_admin_master_data.png',
      description: 'Official 2026 holiday calendar (cross-NGO policy), 6 PRD task workflow schemas, operational districts, and state taxonomy.',
      keyFeatures: ['Official 2026 holiday calendar', '6 PRD task category schemas', 'District & state taxonomy', 'Add master entry modal forms'],
      color: 'slate',
      icon: Layers
    }
  ];

  const filteredScreens = filter === 'all'
    ? screens
    : screens.filter(s => s.group === filter);

  const handleOpenScreen = (screen) => {
    setActiveRole(screen.group);
    navigate(screen.path);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased pb-20">
      {/* Header Banner */}
      <div className="bg-slate-900 border-b border-slate-800 py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-teal-400 text-xs font-semibold mb-3">
              <span>PRD v3 Enterprise Prototype</span>
              <span>•</span>
              <span>21 Screens Implemented</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              WOW TeamPulse Screens Catalog
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Visual catalog of all frontend prototype screens across Coordinator Mobile, Supervisor Mobile, NGO Admin Console, and WoW Admin HQ.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold transition-all"
            >
              Print / Save PDF
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-slate-950 rounded-xl text-xs font-bold transition-all shadow-xs"
            >
              Back to Portal Home
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 pt-8 space-y-8">
        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900 p-2.5 rounded-2xl border border-slate-800">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <button
              onClick={() => setFilter('all')}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
                filter === 'all'
                  ? 'bg-slate-100 text-slate-900 shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              All Prototype Screens ({screens.length})
            </button>
            <button
              onClick={() => setFilter('coordinator')}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                filter === 'coordinator'
                  ? 'bg-teal-600 text-slate-950 shadow-xs'
                  : 'text-teal-400 hover:text-teal-300 hover:bg-slate-800'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Coordinator Mobile (8 Screens)</span>
            </button>
            <button
              onClick={() => setFilter('manager')}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                filter === 'manager'
                  ? 'bg-slate-700 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-300 hover:bg-slate-800'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Supervisor Mobile (7 Screens)</span>
            </button>
            <button
              onClick={() => setFilter('admin')}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                filter === 'admin'
                  ? 'bg-slate-700 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Admin Web (6 Modules)</span>
            </button>
          </div>

          <span className="text-xs text-slate-500 font-mono pr-2">
            Click any card to launch interactive screen
          </span>
        </div>

        {/* Screen Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredScreens.map((screen) => {
            const Icon = screen.icon;

            return (
              <div
                key={screen.id}
                className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 flex flex-col justify-between transition-all hover:shadow-lg group"
              >
                <div className="space-y-4">
                  {/* Top Bar */}
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wider bg-slate-800 text-slate-300 border-slate-700">
                      {screen.roleLabel} · {screen.screenNumber}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">{screen.path.split('?')[0]}</span>
                  </div>

                  {/* Rendered Screenshot Preview Thumbnail */}
                  <div
                    className="relative aspect-[16/10] rounded-xl overflow-hidden bg-slate-950 border border-slate-800 cursor-pointer"
                    onClick={() => handleOpenScreen(screen)}
                  >
                    <img
                      src={`${import.meta.env.BASE_URL}screenshots/${screen.img || `${String(screens.findIndex(s => s.id === screen.id) + 1).padStart(2, '0')}_${screen.id.replace(/-/g, '_')}.png`}`}
                      alt={screen.title}
                      className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 transition-opacity"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-2.5">
                      <span className="text-[10px] bg-slate-900/90 text-slate-200 px-2 py-0.5 rounded font-mono border border-slate-700">
                        {screen.group === 'admin' ? 'Desktop 1440px' : 'Mobile 390px'} Preview
                      </span>
                    </div>
                  </div>

                  {/* Title & Icon */}
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-slate-800 text-teal-400 border border-slate-700">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white group-hover:text-teal-400 transition-colors">
                        {screen.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                        {screen.description}
                      </p>
                    </div>
                  </div>

                  {/* Visual Preview / Key Elements Chips */}
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                      Screen UI Components
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {screen.keyFeatures.map((feat, idx) => (
                        <span key={idx} className="text-[11px] bg-slate-900 border border-slate-800 text-slate-300 px-2 py-0.5 rounded flex items-center gap-1 font-mono">
                          <CheckCircle className="w-3 h-3 text-teal-400" />
                          <span>{feat}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Open Interactive Prototype Screen Action Button */}
                <div className="pt-4 mt-2 border-t border-slate-800 flex items-center justify-between gap-3">
                  <span className="text-[11px] text-slate-500 font-mono">
                    {screen.group === 'admin' ? 'Desktop 1280px+' : 'Mobile 390 × 844'}
                  </span>

                  <button
                    onClick={() => handleOpenScreen(screen)}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700"
                  >
                    <span>Open Screen</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
