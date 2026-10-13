import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDemo } from '../context/DemoContext';
import {
  Smartphone,
  ShieldCheck,
  Building2,
  Image as ImageIcon,
  ArrowRight,
  CheckCircle,
  MapPin,
  School,
  Calendar,
  Users,
  Award,
  Sparkles,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();
  const { setActiveRole } = useDemo();

  const handleLaunchRole = (role, path) => {
    setActiveRole(role);
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans antialiased selection:bg-emerald-500 selection:text-white">
      {/* Hero Header */}
      <div className="relative overflow-hidden border-b border-slate-800 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 py-16 px-6">
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px]"></div>

        <div className="max-w-5xl mx-auto relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>ITC Limited (PSPD) & MARI NGO Initiative</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-3xl mx-auto leading-tight">
            MARI Field Monitoring <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">Prototype</span>
          </h1>

          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Enterprise static frontend prototype designed for non-technical stakeholders to inspect the proposed mobile and desktop experience for field monitoring, attendance, visit audits, and performance reporting.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => handleLaunchRole('volunteer', '/volunteer/dashboard')}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs sm:text-sm font-bold shadow-lg shadow-emerald-600/30 flex items-center gap-2 transition-all active:scale-95"
            >
              <Smartphone className="w-4 h-4" />
              <span>Launch Volunteer Mobile App</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigate('/showcase')}
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-amber-300 rounded-xl text-xs sm:text-sm font-bold border border-slate-700 flex items-center gap-2 transition-all active:scale-95"
            >
              <ImageIcon className="w-4 h-4 text-amber-400" />
              <span>Open Screen Showcase Gallery</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3 Interactive Module Portals */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Select Stakeholder Role to Test</h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Move between modules with zero friction using persistent demo role switcher
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 1. Volunteer Mobile App Card */}
          <div className="bg-slate-900/90 border border-slate-800 hover:border-emerald-500/60 rounded-3xl p-6 flex flex-col justify-between transition-all group hover:shadow-xl hover:shadow-emerald-950/40">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Smartphone className="w-6 h-6" />
              </div>

              <div>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-2 py-0.5 rounded">
                  Mobile 390 × 844
                </span>
                <h3 className="text-lg font-bold text-white mt-2 group-hover:text-emerald-300 transition-colors">
                  Volunteer Mobile App
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Empowering rural field staff visiting government schools, health centres, and community camps.
                </p>
              </div>

              <ul className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Geo-fenced Punch-in with selfie camera</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Monthly target vs achievement gauge</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Interactive Attendance Calendar</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>School visit form with validation</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Route history & Day punch-out</span>
                </li>
              </ul>
            </div>

            <div className="pt-6">
              <button
                onClick={() => handleLaunchRole('volunteer', '/volunteer/dashboard')}
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
              >
                <span>Enter Volunteer Mode</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 2. Manager Mobile App Card */}
          <div className="bg-slate-900/90 border border-slate-800 hover:border-blue-500/60 rounded-3xl p-6 flex flex-col justify-between transition-all group hover:shadow-xl hover:shadow-blue-950/40">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>

              <div>
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest bg-blue-500/10 px-2 py-0.5 rounded">
                  Manager Mobile Experience
                </span>
                <h3 className="text-lg font-bold text-white mt-2 group-hover:text-blue-300 transition-colors">
                  Manager Mobile App
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Enables zonal managers to track assigned volunteer attendance, team quotas, and route audits.
                </p>
              </div>

              <ul className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-blue-400" />
                  <span>Team roll-call: Present, Absent & Leave</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-blue-400" />
                  <span>Individual volunteer scorecards</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-blue-400" />
                  <span>Team target charts & leaderboard</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-blue-400" />
                  <span>Monthly report with real CSV export</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-blue-400" />
                  <span>Historical GPS route checkpoint audits</span>
                </li>
              </ul>
            </div>

            <div className="pt-6">
              <button
                onClick={() => handleLaunchRole('manager', '/manager/dashboard')}
                className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
              >
                <span>Enter Manager Mode</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 3. Admin Web Dashboard Card */}
          <div className="bg-slate-900/90 border border-slate-800 hover:border-indigo-500/60 rounded-3xl p-6 flex flex-col justify-between transition-all group hover:shadow-xl hover:shadow-indigo-950/40">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Building2 className="w-6 h-6" />
              </div>

              <div>
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-2 py-0.5 rounded">
                  Desktop Web Portal
                </span>
                <h3 className="text-lg font-bold text-white mt-2 group-hover:text-indigo-300 transition-colors">
                  Admin Web Dashboard
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Complete desktop governance headquarters for ITC CSR executives & NGO Directors.
                </p>
              </div>

              <ul className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Executive KPI overview & velocity charts</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-indigo-400" />
                  <span>User management with Add/Edit modals</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-indigo-400" />
                  <span>School directory with 380 UDISE records</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Manager & NGO allocation matrix</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Master data taxonomy configuration</span>
                </li>
              </ul>
            </div>

            <div className="pt-6">
              <button
                onClick={() => handleLaunchRole('admin', '/admin/dashboard')}
                className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
              >
                <span>Enter Admin Portal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Presentation Gallery Banner */}
      <div className="max-w-6xl mx-auto px-6 pb-16">
        <div className="bg-gradient-to-r from-amber-500/10 via-slate-900 to-slate-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Manager Presentation Deliverable</span>
            </div>
            <h3 className="text-xl font-bold text-white">Full Screen Showcase Gallery (`/showcase`)</h3>
            <p className="text-xs text-slate-400 max-w-xl">
              Inspect all 21 screens grouped by Volunteer Mobile, Manager Mobile, and Admin Web with direct 1-click launch buttons and detailed feature callouts.
            </p>
          </div>
          <button
            onClick={() => navigate('/showcase')}
            className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-all shrink-0"
          >
            Open Showcase Gallery →
          </button>
        </div>
      </div>
    </div>
  );
}
