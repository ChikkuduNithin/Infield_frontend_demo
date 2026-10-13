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
  ArrowRight
} from 'lucide-react';

export default function ShowcaseGallery() {
  const navigate = useNavigate();
  const { setActiveRole } = useDemo();
  const [filter, setFilter] = useState('all');

  const screens = [
    // --- 1. Volunteer Mobile App (8 screens) ---
    {
      id: 'vol-login',
      group: 'volunteer',
      roleLabel: 'Volunteer Mobile App',
      screenNumber: 'Screen 1',
      title: 'Volunteer Login',
      path: '/volunteer/login',
      img: '01_volunteer_login.png',
      description: 'MARI & ITC co-branding, employee ID authentication, remember-me checkbox, quick demo auto-fill credentials, and simulated validation.',
      keyFeatures: ['Employee ID input', 'Password visibility toggle', 'Demo auto-fill button', 'Branding header'],
      color: 'emerald',
      icon: Smartphone
    },
    {
      id: 'vol-punchin',
      group: 'volunteer',
      roleLabel: 'Volunteer Mobile App',
      screenNumber: 'Screen 2',
      title: 'Field Punch-in (Geo-fenced)',
      path: '/volunteer/punch-in',
      img: '02_volunteer_punch_in.png',
      description: 'Selfie photo capture preview, GPS coordinates display (17.6534° N, 80.8987° E), territory geofence lock status, and confirmation flow.',
      keyFeatures: ['Live camera selfie simulation', 'High precision GPS coordinates', 'Geofence territory match', 'Success status card'],
      color: 'emerald',
      icon: Camera
    },
    {
      id: 'vol-dash',
      group: 'volunteer',
      roleLabel: 'Volunteer Mobile App',
      screenNumber: 'Screen 3',
      title: 'Volunteer Home Dashboard',
      path: '/volunteer/dashboard',
      img: '03_volunteer_dashboard.png',
      description: 'Greeting, today’s active attendance card, monthly school target progress (79.2%), metric bars, quick actions, and recent activity logs.',
      keyFeatures: ['Active attendance card', 'Monthly target vs achievement gauge', 'Quick action cards', 'Recent school visits list'],
      color: 'emerald',
      icon: School
    },
    {
      id: 'vol-cal',
      group: 'volunteer',
      roleLabel: 'Volunteer Mobile App',
      screenNumber: 'Screen 4',
      title: 'Attendance Calendar',
      path: '/volunteer/calendar',
      img: '04_volunteer_calendar.png',
      description: 'Monthly calendar grid with green present indicators, red absent indicators, blue underlines on Sundays, legend, and selected-day detail drawer.',
      keyFeatures: ['Green present chips', 'Red absent dots', 'Blue Sunday underline', 'Day detail panel with punch in/out'],
      color: 'emerald',
      icon: Calendar
    },
    {
      id: 'vol-act-sel',
      group: 'volunteer',
      roleLabel: 'Volunteer Mobile App',
      screenNumber: 'Screen 5',
      title: 'Activity Selection Menu',
      path: '/volunteer/activity-select',
      img: '05_volunteer_activity_select.png',
      description: 'Visual category cards for School Visit, Hospital Visit, Awareness Programme, Community Visit, Meeting, and Other Activity.',
      keyFeatures: ['6 program activity types', 'Icon-badged category cards', 'One-click launch to specific form'],
      color: 'emerald',
      icon: Layers
    },
    {
      id: 'vol-form',
      group: 'volunteer',
      roleLabel: 'Volunteer Mobile App',
      screenNumber: 'Screen 6',
      title: 'School Visit & Activity Form',
      path: '/volunteer/school-form?type=school_visit',
      img: '06_volunteer_school_form.png',
      description: 'Validated submission form with searchable school picker, district, principal contacted toggle, student headcount, remarks, and photo attachment.',
      keyFeatures: ['School master dropdown', 'Principal contacted Yes/No toggle', 'Students reached counter', 'GPS photo preview'],
      color: 'emerald',
      icon: FileSpreadsheet
    },
    {
      id: 'vol-route',
      group: 'volunteer',
      roleLabel: 'Volunteer Mobile App',
      screenNumber: 'Screen 7',
      title: 'Route History & GIS Preview',
      path: '/volunteer/route-history',
      img: '07_volunteer_route_history.png',
      description: 'Historical GPS route visualizer with waypoints, connecting route line, chronological stop timeline, and total distance (14.8 km).',
      keyFeatures: ['Interactive map visualizer', '5 recorded GPS waypoints', 'Stop-by-stop timestamped timeline', 'Logged distance calculation'],
      color: 'emerald',
      icon: MapPin
    },
    {
      id: 'vol-punchout',
      group: 'volunteer',
      roleLabel: 'Volunteer Mobile App',
      screenNumber: 'Screen 8',
      title: 'Punch-out & Daily Summary',
      path: '/volunteer/punch-out',
      img: '08_volunteer_punch_out.png',
      description: 'Option to punch out or continue visits, comprehensive end-of-day summary metrics, field challenges textarea, and next day plan.',
      keyFeatures: ['Punch out vs continue toggle', 'Automated aggregate metrics', 'Next day work plan input', 'Final attendance submission'],
      color: 'emerald',
      icon: CheckCircle
    },

    // --- 2. Manager Mobile App (7 screens) ---
    {
      id: 'mgr-dash',
      group: 'manager',
      roleLabel: 'Manager Mobile App',
      screenNumber: 'Screen 1',
      title: 'Manager Dashboard',
      path: '/manager/dashboard',
      img: '09_manager_dashboard.png',
      description: 'Zonal supervisory overview with roll-call counts (15 Present, 2 Absent, 1 Leave), team target progress (82.8%), and quick report shortcuts.',
      keyFeatures: ['Live attendance roll-call', 'Monthly cluster target gauge', 'Team field activity feed', 'Manager punch status'],
      color: 'blue',
      icon: ShieldCheck
    },
    {
      id: 'mgr-punch',
      group: 'manager',
      roleLabel: 'Manager Mobile App',
      screenNumber: 'Screen 2',
      title: 'Manager Punch-in',
      path: '/manager/punch-in',
      img: '10_manager_punch_in.png',
      description: 'Headquarters geofence verification, manager selfie capture simulation, coordinates timestamp, and confirmation flow.',
      keyFeatures: ['Zonal base geofence verification', 'Selfie camera simulation', 'One-click attendance confirmation'],
      color: 'blue',
      icon: Camera
    },
    {
      id: 'mgr-vol-perf',
      group: 'manager',
      roleLabel: 'Manager Mobile App',
      screenNumber: 'Screen 3',
      title: 'Volunteer Performance Scorecards',
      path: '/manager/volunteers',
      img: '11_manager_volunteer_performance.png',
      description: 'Searchable volunteer roster with attendance status chips, monthly target achievement percentages, and individual performance modal.',
      keyFeatures: ['Real-time search & filters', 'Target completion progress bars', 'Detailed volunteer scorecard drawer'],
      color: 'blue',
      icon: Users
    },
    {
      id: 'mgr-team-perf',
      group: 'manager',
      roleLabel: 'Manager Mobile App',
      screenNumber: 'Screen 4',
      title: 'Team Performance Analytics',
      path: '/manager/team-performance',
      img: '12_manager_team_performance.png',
      description: 'Monthly target vs achievement Recharts bar graph, activity distribution donut chart, and volunteer leaderboard rankings.',
      keyFeatures: ['Recharts trend bar chart', 'Program activity donut chart', 'Volunteer leaderboard ranking'],
      color: 'blue',
      icon: BarChart3
    },
    {
      id: 'mgr-monthly',
      group: 'manager',
      roleLabel: 'Manager Mobile App',
      screenNumber: 'Screen 5',
      title: 'Monthly Report & Excel Export',
      path: '/manager/monthly-report',
      img: '13_manager_monthly_report.png',
      description: 'Monthly performance matrix by volunteer and district, aggregate KPIs, and real CSV file export button for ITC CSR audits.',
      keyFeatures: ['Month & district filters', 'Planned vs visited matrix', 'Real CSV file download export'],
      color: 'blue',
      icon: FileSpreadsheet
    },
    {
      id: 'mgr-day-sum',
      group: 'manager',
      roleLabel: 'Manager Mobile App',
      screenNumber: 'Screen 6',
      title: 'Day Summary Roll-Call Report',
      path: '/manager/day-summary',
      img: '14_manager_day_summary.png',
      description: 'Date-based daily audit report showing present/absent roll call, activities logged, schools visited, and students reached.',
      keyFeatures: ['Date selector', 'Present, absent & leave breakdown', 'Searchable daily volunteer roll call'],
      color: 'blue',
      icon: Calendar
    },
    {
      id: 'mgr-route-hist',
      group: 'manager',
      roleLabel: 'Manager Mobile App',
      screenNumber: 'Screen 7',
      title: 'Volunteer Route Audit',
      path: '/manager/route-history',
      img: '15_manager_route_history.png',
      description: 'Historical volunteer route tracking with volunteer picker, date selector, map route preview, and GPS breadcrumb integrity audit.',
      keyFeatures: ['Volunteer dropdown selector', 'Audit date picker', 'Historical GPS route preview', 'Stop duration timestamps'],
      color: 'blue',
      icon: MapPin
    },

    // --- 3. Admin Web Dashboard (6 modules) ---
    {
      id: 'adm-dash',
      group: 'admin',
      roleLabel: 'Admin Web Dashboard',
      screenNumber: 'Module 1',
      title: 'Executive Admin Dashboard',
      path: '/admin/dashboard',
      img: '16_admin_dashboard.png',
      description: 'Executive HQ command centre with 6 core KPIs, weekly student reach velocity area chart, district coverage matrix, and quick navigation.',
      keyFeatures: ['6 High-level KPI metric cards', 'Weekly velocity area chart', 'District coverage progress bars', 'Executive controls'],
      color: 'indigo',
      icon: Building2
    },
    {
      id: 'adm-users',
      group: 'admin',
      roleLabel: 'Admin Web Dashboard',
      screenNumber: 'Module 2',
      title: 'User Management & Role Access',
      path: '/admin/users',
      img: '17_admin_users.png',
      description: 'Comprehensive table of all users, search & role filters, Add User modal, Edit User modal, and account active/inactive toggle.',
      keyFeatures: ['User search & role filters', 'Add/Edit modal forms', 'Role assignment (Volunteer, Manager, Admin)', 'Account activation toggle'],
      color: 'indigo',
      icon: Users
    },
    {
      id: 'adm-schools',
      group: 'admin',
      roleLabel: 'Admin Web Dashboard',
      screenNumber: 'Module 3',
      title: 'School Registry & Geo-Directory',
      path: '/admin/schools',
      img: '18_admin_schools.png',
      description: 'Geo-tagged database of project schools with UDISE codes, category filters, Add School modal, Edit modal, and detailed view drawer.',
      keyFeatures: ['Searchable school catalog', 'UDISE code tracking', 'Add/Edit school modal', 'Headmaster contact directory'],
      color: 'indigo',
      icon: School
    },
    {
      id: 'adm-mgr-org',
      group: 'admin',
      roleLabel: 'Admin Web Dashboard',
      screenNumber: 'Module 4',
      title: 'Managers & NGO Allocation Matrix',
      path: '/admin/managers-orgs',
      img: '19_admin_managers_orgs.png',
      description: 'Partner NGO registry (MARI, Pratham, BTWS), supervisor matrix, and reassigning volunteers to managers.',
      keyFeatures: ['NGO agency profiles', 'Volunteer supervisor allocation table', 'Reassign manager modal dialog'],
      color: 'indigo',
      icon: Building2
    },
    {
      id: 'adm-reports',
      group: 'admin',
      roleLabel: 'Admin Web Dashboard',
      screenNumber: 'Module 5',
      title: 'Reports Hub (Desktop Layout)',
      path: '/admin/reports',
      img: '20_admin_reports.png',
      description: 'Desktop-optimized reporting suite with Monthly Reports, Daily Roll-Call, Team Performance Charts, and Route History with CSV exports.',
      keyFeatures: ['Tabbed report views', 'Monthly & daily breakdown', 'Interactive route map audit', 'CSV download utilities'],
      color: 'indigo',
      icon: FileSpreadsheet
    },
    {
      id: 'adm-master',
      group: 'admin',
      roleLabel: 'Admin Web Dashboard',
      screenNumber: 'Module 6',
      title: 'Master Data & Taxonomy',
      path: '/admin/master-data',
      img: '21_admin_master_data.png',
      description: 'Jurisdictional master data tabs for States, Districts, School Categories, and Field Activity types with Add Entry modal.',
      keyFeatures: ['State & district taxonomy', 'School classification hierarchy', 'Add master entry modal forms'],
      color: 'indigo',
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-3">
              <span>Presentation Deliverable</span>
              <span>•</span>
              <span>All 21 Screens Implemented</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Screen Showcase & Presentation Index
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Visual catalog of all frontend prototype screens across Volunteer Mobile App, Manager Mobile App, and Admin Web Dashboard.
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
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow"
            >
              Back to Portal Home
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 pt-8 space-y-8">
        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/80 p-2.5 rounded-2xl border border-slate-800">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <button
              onClick={() => setFilter('all')}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
                filter === 'all'
                  ? 'bg-slate-100 text-slate-900 shadow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              All Prototype Screens ({screens.length})
            </button>
            <button
              onClick={() => setFilter('volunteer')}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                filter === 'volunteer'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-emerald-400 hover:text-emerald-300 hover:bg-slate-800'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Volunteer Mobile (8 Screens)</span>
            </button>
            <button
              onClick={() => setFilter('manager')}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                filter === 'manager'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-blue-400 hover:text-blue-300 hover:bg-slate-800'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Manager Mobile (7 Screens)</span>
            </button>
            <button
              onClick={() => setFilter('admin')}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                filter === 'admin'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-indigo-400 hover:text-indigo-300 hover:bg-slate-800'
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

            const badgeColorClass =
              screen.color === 'emerald'
                ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                : screen.color === 'blue'
                  ? 'bg-blue-500/15 text-blue-300 border-blue-500/30'
                  : 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30';

            const buttonClass =
              screen.color === 'emerald'
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                : screen.color === 'blue'
                  ? 'bg-blue-600 hover:bg-blue-500 text-white'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white';

            return (
              <div
                key={screen.id}
                className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-3xl p-5 flex flex-col justify-between transition-all hover:shadow-xl group"
              >
                <div className="space-y-4">
                  {/* Top Bar */}
                  <div className="flex items-center justify-between">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wider ${badgeColorClass}`}>
                      {screen.roleLabel} · {screen.screenNumber}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">{screen.path.split('?')[0]}</span>
                  </div>

                  {/* Rendered Screenshot Preview Thumbnail */}
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 group/img cursor-pointer" onClick={() => handleOpenScreen(screen)}>
                    <img
                      src={`${import.meta.env.BASE_URL}screenshots/${screen.img || `${String(screens.findIndex(s => s.id === screen.id) + 1).padStart(2, '0')}_${screen.id.replace(/-/g, '_')}.png`}`}
                      alt={screen.title}
                      className="w-full h-full object-cover object-top opacity-90 group-hover/img:opacity-100 group-hover/img:scale-102 transition-all duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-2.5">
                      <span className="text-[10px] bg-slate-900/90 text-slate-200 px-2 py-0.5 rounded-md font-mono border border-slate-700">
                        {screen.group === 'admin' ? 'Desktop 1440px' : 'Mobile 390px'} Preview
                      </span>
                    </div>
                  </div>

                  {/* Title & Icon */}
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                      screen.color === 'emerald' ? 'bg-emerald-500/20 text-emerald-400' : screen.color === 'blue' ? 'bg-blue-500/20 text-blue-400' : 'bg-indigo-500/20 text-indigo-400'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                        {screen.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                        {screen.description}
                      </p>
                    </div>
                  </div>

                  {/* Visual Preview / Key Elements Chips */}
                  <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800/80 space-y-2">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                      Screen UI Components
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {screen.keyFeatures.map((feat, idx) => (
                        <span key={idx} className="text-[11px] bg-slate-900 border border-slate-800 text-slate-300 px-2 py-0.5 rounded-lg flex items-center gap-1">
                          <CheckCircle className="w-3 h-3 text-emerald-400" />
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
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm active:scale-95 ${buttonClass}`}
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
