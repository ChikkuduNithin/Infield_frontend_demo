import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDemo } from '../context/DemoContext';
import {
  Smartphone,
  ShieldCheck,
  Building2,
  Image as ImageIcon,
  RotateCcw,
  Maximize2,
  Minimize2,
  UserCheck,
  CheckCircle2
} from 'lucide-react';

export default function DemoNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    activeRole,
    setActiveRole,
    currentVolunteer,
    currentManager,
    currentAdmin,
    punchState,
    resetAllDemoData,
    deviceFrameMode,
    setDeviceFrameMode
  } = useDemo();

  // Determine current active section from URL
  const isVolunteer = location.pathname.startsWith('/volunteer');
  const isManager = location.pathname.startsWith('/manager');
  const isAdmin = location.pathname.startsWith('/admin');
  const isShowcase = location.pathname.startsWith('/showcase');

  const handleRoleChange = (role, defaultPath) => {
    setActiveRole(role);
    navigate(defaultPath);
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-900 text-white border-b border-slate-800 shadow-lg px-3 py-2 text-xs">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Branding & Role Switcher */}
        <div className="flex items-center gap-3">
          <div
            onClick={() => navigate('/')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center font-bold text-slate-950 text-sm shadow">
              M
            </div>
            <div>
              <span className="font-bold tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                MARI Field App
              </span>
              <span className="text-[10px] text-slate-400 block -mt-0.5">
                ITC Mission Sunehra Kal
              </span>
            </div>
          </div>

          <div className="h-5 w-px bg-slate-700 hidden sm:block" />

          {/* Quick Role Switcher Pills */}
          <div className="flex items-center bg-slate-800/90 p-1 rounded-xl border border-slate-700">
            <button
              onClick={() => handleRoleChange('volunteer', '/volunteer/dashboard')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg font-medium transition-all ${
                isVolunteer
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Volunteer App</span>
            </button>

            <button
              onClick={() => handleRoleChange('manager', '/manager/dashboard')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg font-medium transition-all ${
                isManager
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Manager App</span>
            </button>

            <button
              onClick={() => handleRoleChange('admin', '/admin/dashboard')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg font-medium transition-all ${
                isAdmin
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Admin Web</span>
            </button>

            <button
              onClick={() => navigate('/showcase')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg font-medium transition-all ${
                isShowcase
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-amber-400 hover:text-amber-300 hover:bg-slate-700/60'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Screen Gallery</span>
            </button>
          </div>
        </div>

        {/* Right: Status Pill & Controls */}
        <div className="flex items-center gap-2.5">
          {/* Active User Context Pill */}
          <div className="hidden md:flex items-center gap-2 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700/80">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-slate-400 text-[11px]">Role Context:</span>
            <span className="font-semibold text-slate-200">
              {isVolunteer ? currentVolunteer.name : isManager ? currentManager.name : currentAdmin.name}
            </span>
            {isVolunteer && (
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                punchState.isPunchedIn && !punchState.isPunchedOut
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-slate-700 text-slate-300'
              }`}>
                {punchState.isPunchedOut ? 'Punched Out' : punchState.isPunchedIn ? 'Punched In (Active)' : 'Not Punched'}
              </span>
            )}
          </div>

          {/* Toggle Device Frame for Mobile view */}
          {(isVolunteer || isManager) && (
            <button
              onClick={() => setDeviceFrameMode(prev => prev === 'frame' ? 'full' : 'frame')}
              title={deviceFrameMode === 'frame' ? "Switch to Fullscreen Mobile" : "Switch to 390x844 Device Frame"}
              className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1.5 rounded-lg border border-slate-700 transition-colors"
            >
              {deviceFrameMode === 'frame' ? (
                <>
                  <Maximize2 className="w-3.5 h-3.5 text-slate-400" />
                  <span className="hidden sm:inline text-[11px]">390×844 Frame</span>
                </>
              ) : (
                <>
                  <Minimize2 className="w-3.5 h-3.5 text-slate-400" />
                  <span className="hidden sm:inline text-[11px]">Fluid Width</span>
                </>
              )}
            </button>
          )}

          {/* Reset Demo Data Button */}
          <button
            onClick={() => {
              if (window.confirm('Reset all simulated punch-in, form submissions, and user edits to default demo state?')) {
                resetAllDemoData();
              }
            }}
            title="Reset Local Demo State"
            className="flex items-center gap-1 bg-slate-800 hover:bg-rose-900/40 text-slate-300 hover:text-rose-300 px-2.5 py-1.5 rounded-lg border border-slate-700 hover:border-rose-700/50 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden lg:inline text-[11px]">Reset Demo</span>
          </button>
        </div>
      </div>
    </header>
  );
}
