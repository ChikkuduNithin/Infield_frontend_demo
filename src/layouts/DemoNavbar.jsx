import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDemo } from '../context/DemoContext';
import {
  Smartphone,
  ShieldCheck,
  Building2,
  Globe2,
  Image as ImageIcon,
  RotateCcw,
  Maximize2,
  Minimize2,
  CheckCircle2,
  Recycle
} from 'lucide-react';

export default function DemoNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    activeRole,
    setActiveRole,
    currentCoordinator,
    currentManager,
    currentNgoAdmin,
    currentWowAdmin,
    punchState,
    resetAllDemoData,
    deviceFrameMode,
    setDeviceFrameMode
  } = useDemo();

  // Determine current active section from URL
  const isCoordinator = location.pathname.startsWith('/volunteer');
  const isManager = location.pathname.startsWith('/manager');
  const isAdmin = location.pathname.startsWith('/admin');
  const isShowcase = location.pathname.startsWith('/showcase');

  const handleRoleChange = (role, defaultPath) => {
    setActiveRole(role);
    navigate(defaultPath);
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-950 text-white border-b border-slate-800 shadow-md px-3 py-2 text-xs select-none">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Branding & Role Switcher */}
        <div className="flex items-center gap-3">
          <div
            onClick={() => navigate('/')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-7 h-7 rounded-lg bg-teal-600 flex items-center justify-center font-bold text-white text-xs shadow-sm">
              <Recycle className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold tracking-tight text-white group-hover:text-teal-400 transition-colors">
                  WOW TeamPulse
                </span>
                <span className="text-[9px] bg-teal-900/80 text-teal-300 font-semibold px-1.5 py-0.2 rounded border border-teal-700/50">
                  ITC WoW
                </span>
              </div>
              <span className="text-[10px] text-slate-400 block -mt-0.5">
                Well-being Out of Waste · Field Monitoring
              </span>
            </div>
          </div>

          <div className="h-5 w-px bg-slate-800 hidden sm:block" />

          {/* Quick Role Switcher Pills */}
          <div className="flex items-center bg-slate-900 p-0.5 rounded-lg border border-slate-800 gap-0.5">
            <button
              onClick={() => handleRoleChange('coordinator', '/volunteer/dashboard')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md font-semibold transition-all ${
                isCoordinator
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5 text-teal-400" />
              <span>Coordinator</span>
            </button>

            <button
              onClick={() => handleRoleChange('manager', '/manager/dashboard')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md font-semibold transition-all ${
                isManager
                  ? 'bg-blue-700 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>Manager</span>
            </button>

            <button
              onClick={() => handleRoleChange('ngo_admin', '/admin/dashboard')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md font-semibold transition-all ${
                isAdmin && activeRole === 'ngo_admin'
                  ? 'bg-purple-700 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Building2 className="w-3.5 h-3.5 text-purple-400" />
              <span>NGO Admin</span>
            </button>

            <button
              onClick={() => handleRoleChange('wow_admin', '/admin/dashboard')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md font-semibold transition-all ${
                isAdmin && activeRole === 'wow_admin'
                  ? 'bg-indigo-700 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Globe2 className="w-3.5 h-3.5 text-indigo-400" />
              <span>WoW Admin</span>
            </button>

            <button
              onClick={() => navigate('/showcase')}
              className={`flex items-center gap-1.5 px-2 py-1.5 rounded-md font-medium transition-all ${
                isShowcase
                  ? 'bg-amber-700 text-white shadow-xs'
                  : 'text-amber-400/90 hover:text-amber-300 hover:bg-slate-800'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Screens</span>
            </button>
          </div>
        </div>

        {/* Right: Active Context & Controls */}
        <div className="flex items-center gap-2">
          {/* Active Context User */}
          <div className="hidden lg:flex items-center gap-2 bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
            <span className="text-slate-400 text-[11px]">Logged as:</span>
            <span className="font-semibold text-slate-200">
              {isCoordinator
                ? currentCoordinator.name
                : isManager
                  ? currentManager.name
                  : activeRole === 'ngo_admin'
                    ? currentNgoAdmin.name
                    : currentWowAdmin.name}
            </span>
            <span className="text-[10px] text-slate-400 font-mono">
              ({isCoordinator
                ? currentCoordinator.empId
                : isManager
                  ? currentManager.empId
                  : activeRole === 'ngo_admin'
                    ? currentNgoAdmin.empId
                    : currentWowAdmin.empId})
            </span>
          </div>

          {/* Toggle Device Frame for Mobile view */}
          {(isCoordinator || isManager) && (
            <button
              onClick={() => setDeviceFrameMode(prev => prev === 'frame' ? 'full' : 'frame')}
              title={deviceFrameMode === 'frame' ? "Switch to Fullscreen Mobile View" : "Switch to 390x844 Mobile Device Frame"}
              className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1.5 rounded-md border border-slate-700 text-[11px] font-medium transition-colors"
            >
              {deviceFrameMode === 'frame' ? (
                <>
                  <Maximize2 className="w-3.5 h-3.5 text-slate-400" />
                  <span className="hidden sm:inline">390×844 Frame</span>
                </>
              ) : (
                <>
                  <Minimize2 className="w-3.5 h-3.5 text-teal-400" />
                  <span className="hidden sm:inline">Full View</span>
                </>
              )}
            </button>
          )}

          {/* Reset Demo Data */}
          <button
            onClick={() => {
              if (window.confirm('Reset all WOW TeamPulse local demo state back to default factory records?')) {
                resetAllDemoData();
              }
            }}
            title="Reset sample state to default"
            className="flex items-center gap-1 text-slate-400 hover:text-rose-400 hover:bg-slate-800 px-2 py-1.5 rounded-md border border-transparent hover:border-slate-700 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden xl:inline text-[11px]">Reset Data</span>
          </button>
        </div>
      </div>
    </header>
  );
}
