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
  ChevronRight,
  Truck,
  Building,
  GraduationCap
} from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();
  const { setActiveRole } = useDemo();

  const handleLaunchRole = (role, path) => {
    setActiveRole(role);
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans antialiased selection:bg-teal-500 selection:text-white">
      {/* Hero Header */}
      <div className="relative overflow-hidden border-b border-slate-800 bg-slate-900 py-16 px-6">
        <div className="max-w-5xl mx-auto relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-teal-400 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-teal-400"></span>
            <span>ITC Well-being Out of Waste (WoW) Initiative</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-3xl mx-auto leading-tight">
            WOW TeamPulse <span className="text-teal-400">Operations Suite</span>
          </h1>

          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Enterprise static frontend prototype for field monitoring, dry recyclables recovery audits, institutional permissions, and NGO regulatory compliance under the ITC WoW circular economy framework.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => handleLaunchRole('coordinator', '/volunteer/dashboard')}
              className="px-6 py-3 bg-teal-600 hover:bg-teal-500 text-slate-950 rounded-xl text-xs sm:text-sm font-bold shadow-xs flex items-center gap-2 transition-all active:scale-95"
            >
              <Smartphone className="w-4 h-4 text-slate-950" />
              <span>Launch Field Coordinator App</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigate('/showcase')}
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs sm:text-sm font-bold border border-slate-700 flex items-center gap-2 transition-all active:scale-95"
            >
              <ImageIcon className="w-4 h-4 text-teal-400" />
              <span>Open Screen Showcase Gallery</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Interactive Role Portals */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Select Stakeholder Role to Test</h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Simulate end-to-end field workflows with zero friction using the persistent role switcher
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* 1. Field Coordinator Mobile */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between transition-all hover:border-slate-700">
            <div className="space-y-3.5">
              <div className="w-10 h-10 rounded-xl bg-slate-800 text-teal-400 border border-slate-700 flex items-center justify-center">
                <Smartphone className="w-5 h-5" />
              </div>

              <div>
                <span className="text-[10px] font-bold text-teal-400 uppercase tracking-widest bg-slate-800 px-2 py-0.5 rounded">
                  Mobile 390 × 844
                </span>
                <h3 className="text-base font-bold text-white mt-1.5">
                  Field Coordinator App
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Field personnel visiting schools, colleges, and dry waste recovery hubs.
                </p>
              </div>

              <ul className="space-y-1.5 text-xs text-slate-300 pt-2 border-t border-slate-800">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  <span>Mobile OTP login (1-week session)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  <span>Geotagged Selfie Punch-In/Out</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  <span>ISRS Permissions & ISRC Drives</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  <span>Pending Slips Verification Tracker</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  <span>7-Color Attendance Calendar</span>
                </li>
              </ul>
            </div>

            <div className="pt-5">
              <button
                onClick={() => handleLaunchRole('coordinator', '/volunteer/dashboard')}
                className="w-full py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-teal-300 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
              >
                <span>Launch Coordinator</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 2. Zonal Supervisor Mobile */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between transition-all hover:border-slate-700">
            <div className="space-y-3.5">
              <div className="w-10 h-10 rounded-xl bg-slate-800 text-slate-300 border border-slate-700 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-800 px-2 py-0.5 rounded">
                  Supervisor Mobile
                </span>
                <h3 className="text-base font-bold text-white mt-1.5">
                  Zonal Supervisor Portal
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Cluster leaders managing roll-call, recovery targets, and correction requests.
                </p>
              </div>

              <ul className="space-y-1.5 text-xs text-slate-300 pt-2 border-t border-slate-800">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>Cluster Roll-Call & Absenteeism</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>Approve Correction Requests</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>Pending Acknowledgements Audit</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>State Institutional Database</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>Monthly Dry Waste Targets (Kg)</span>
                </li>
              </ul>
            </div>

            <div className="pt-5">
              <button
                onClick={() => handleLaunchRole('manager', '/manager/dashboard')}
                className="w-full py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
              >
                <span>Launch Supervisor</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 3. NGO Admin Console */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between transition-all hover:border-slate-700">
            <div className="space-y-3.5">
              <div className="w-10 h-10 rounded-xl bg-slate-800 text-purple-400 border border-slate-700 flex items-center justify-center">
                <Truck className="w-5 h-5" />
              </div>

              <div>
                <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest bg-slate-800 px-2 py-0.5 rounded">
                  NGO Web Console
                </span>
                <h3 className="text-base font-bold text-white mt-1.5">
                  NGO Admin Console
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  MARI operations center managing franchises, employees, and monthly targets.
                </p>
              </div>

              <ul className="space-y-1.5 text-xs text-slate-300 pt-2 border-t border-slate-800">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                  <span>Employee Database & Roles</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                  <span>Material Collection Franchises</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                  <span>Assign Districts & Targets</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                  <span>Weighbridge Calibration Audit</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                  <span>NGO Statutory Compliance</span>
                </li>
              </ul>
            </div>

            <div className="pt-5">
              <button
                onClick={() => handleLaunchRole('ngo_admin', '/admin/dashboard')}
                className="w-full py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-purple-300 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
              >
                <span>Launch NGO Admin</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 4. WoW Admin National Console */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between transition-all hover:border-slate-700">
            <div className="space-y-3.5">
              <div className="w-10 h-10 rounded-xl bg-slate-800 text-teal-400 border border-slate-700 flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>

              <div>
                <span className="text-[10px] font-bold text-teal-400 uppercase tracking-widest bg-slate-800 px-2 py-0.5 rounded">
                  ITC WoW National HQ
                </span>
                <h3 className="text-base font-bold text-white mt-1.5">
                  WoW Admin Portal
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  National command oversight for multi-state NGOs, state allocation, and audits.
                </p>
              </div>

              <ul className="space-y-1.5 text-xs text-slate-300 pt-2 border-t border-slate-800">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  <span>Manage NGOs & State Mandates</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  <span>Cross-NGO 2026 Holiday Calendar</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  <span>80G/12A Regulatory Approvals</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  <span>All-State Recovery Hub & CSVs</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  <span>Master Taxonomy Configuration</span>
                </li>
              </ul>
            </div>

            <div className="pt-5">
              <button
                onClick={() => handleLaunchRole('wow_admin', '/admin/dashboard')}
                className="w-full py-2.5 px-3 bg-teal-600 hover:bg-teal-500 text-slate-950 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
              >
                <span>Launch WoW Admin</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Presentation Gallery Banner */}
      <div className="max-w-6xl mx-auto px-6 pb-16">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-800 text-teal-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Manager Presentation Deliverable</span>
            </div>
            <h3 className="text-xl font-bold text-white">Full Screen Showcase Gallery (`/showcase`)</h3>
            <p className="text-xs text-slate-400 max-w-xl">
              Inspect all 21 interactive prototype screens categorized across Coordinator Mobile, Supervisor Mobile, NGO Admin Console, and WoW Admin HQ with 1-click launch buttons and PRD v3 feature callouts.
            </p>
          </div>
          <button
            onClick={() => navigate('/showcase')}
            className="px-6 py-3 bg-teal-600 hover:bg-teal-500 text-slate-950 font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-all shrink-0"
          >
            Open Showcase Gallery →
          </button>
        </div>
      </div>
    </div>
  );
}
