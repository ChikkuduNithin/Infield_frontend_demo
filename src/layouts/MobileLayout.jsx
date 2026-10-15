import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDemo } from '../context/DemoContext';
import {
  Home,
  Calendar,
  MapPin,
  ClipboardList,
  CheckCircle,
  LogOut,
  ChevronLeft,
  Bell,
  Users,
  BarChart3,
  FileText,
  User,
  Wifi,
  Battery,
  Recycle,
  AlertCircle
} from 'lucide-react';

export default function MobileLayout({
  children,
  title = "WOW TeamPulse",
  showBack = false,
  role = "coordinator",
  hideBottomNav = false,
  rightAction = null
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const { deviceFrameMode, punchState, pendingActivities } = useDemo();

  // Navigation Items
  const coordinatorNav = [
    { label: "Overview", path: "/volunteer/dashboard", icon: Home },
    { label: "New Task", path: "/volunteer/activity-select", icon: ClipboardList },
    { label: "Calendar", path: "/volunteer/calendar", icon: Calendar },
    { label: "Route Trail", path: "/volunteer/route-history", icon: MapPin },
    {
      label: punchState.isPunchedIn && !punchState.isPunchedOut ? "Punch Out" : "Punch In",
      path: punchState.isPunchedIn && !punchState.isPunchedOut ? "/volunteer/punch-out" : "/volunteer/punch-in",
      icon: punchState.isPunchedIn && !punchState.isPunchedOut ? LogOut : CheckCircle,
      highlight: true
    }
  ];

  const managerNav = [
    { label: "Overview", path: "/manager/dashboard", icon: Home },
    { label: "Team Roster", path: "/manager/volunteers", icon: Users },
    { label: "Performance", path: "/manager/team-performance", icon: BarChart3 },
    { label: "Reports", path: "/manager/monthly-report", icon: FileText },
    { label: "Attendance", path: "/manager/punch-in", icon: CheckCircle, highlight: true }
  ];

  const navItems = (role === "coordinator" || role === "volunteer") ? coordinatorNav : managerNav;

  const content = (
    <div className="flex flex-col h-full bg-slate-100 text-slate-800 relative select-none">
      {/* 1. Mobile Status Bar (Realistic enterprise mobile status bar) */}
      <div className="bg-slate-950 text-white px-5 pt-2 pb-1.5 flex items-center justify-between text-[11px] font-medium tracking-tight shrink-0 z-20">
        <span className="font-semibold text-slate-200">10:45 AM</span>
        {/* Dynamic Island spacer in frame mode */}
        {deviceFrameMode === 'frame' && (
          <div className="w-20 h-4 bg-slate-900 border border-slate-800 rounded-full mx-auto" />
        )}
        <div className="flex items-center gap-1.5 text-slate-300">
          <span className="text-[10px] font-mono text-teal-400 font-bold">4G/LTE</span>
          <Wifi className="w-3 h-3 text-slate-300" />
          <div className="flex items-center gap-0.5">
            <span className="text-[10px] text-slate-300">92%</span>
            <Battery className="w-3.5 h-3.5 text-teal-400" />
          </div>
        </div>
      </div>

      {/* 2. Enterprise Header */}
      <header className="bg-white border-b border-slate-200 px-3.5 py-2.5 flex items-center justify-between shadow-2xs shrink-0 z-10">
        <div className="flex items-center gap-2.5 min-w-0">
          {showBack ? (
            <button
              onClick={() => navigate(-1)}
              className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors -ml-1 shrink-0"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          ) : (
            <div className="w-8 h-8 rounded-lg bg-teal-700 flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-2xs">
              <Recycle className="w-4 h-4" />
            </div>
          )}
          <div className="min-w-0">
            <h1 className="text-xs font-bold text-slate-900 leading-tight truncate">{title}</h1>
            <p className="text-[10px] text-slate-500 flex items-center gap-1 truncate">
              <span>ITC WoW TeamPulse</span>
              <span>•</span>
              <span className="text-teal-700 font-bold uppercase tracking-wider text-[9px]">
                {role === 'coordinator' || role === 'volunteer' ? 'Coordinator' : 'Field Manager'}
              </span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {rightAction ? (
            rightAction
          ) : (
            <>
              {pendingActivities && pendingActivities.length > 0 && (
                <button
                  onClick={() => navigate('/volunteer/dashboard')}
                  title={`${pendingActivities.length} Pending Acknowledgement Forms`}
                  className="px-1.5 py-1 bg-amber-50 border border-amber-200 text-amber-800 rounded-md text-[10px] font-bold flex items-center gap-1 hover:bg-amber-100"
                >
                  <AlertCircle className="w-3 h-3 text-amber-600" />
                  <span>{pendingActivities.length} Pending</span>
                </button>
              )}
              <button
                onClick={() => navigate(role === 'manager' ? '/manager/login' : '/volunteer/login')}
                className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700 text-xs font-semibold hover:bg-slate-100"
                title="Account / Relogin"
              >
                <User className="w-4 h-4 text-slate-600" />
              </button>
            </>
          )}
        </div>
      </header>

      {/* 3. Main Scrollable Page Area */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden p-3.5 pb-20">
        {children}
      </main>

      {/* 4. Bottom Tab Bar Navigation */}
      {!hideBottomNav && (
        <nav className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-2 py-1.5 flex items-center justify-around shadow-sm z-20">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            if (item.highlight) {
              return (
                <button
                  key={item.label}
                  onClick={() => navigate(item.path)}
                  className="flex flex-col items-center justify-center -mt-3.5 group"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-xs transition-transform group-active:scale-95 border ${
                    item.label === 'Punch Out'
                      ? 'bg-rose-600 text-white border-rose-700 shadow-rose-600/10'
                      : 'bg-teal-700 text-white border-teal-800 shadow-teal-700/10'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`text-[10px] mt-0.5 font-bold ${
                    item.label === 'Punch Out' ? 'text-rose-700' : 'text-teal-800'
                  }`}>
                    {item.label}
                  </span>
                </button>
              );
            }

            return (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg transition-colors min-w-[54px] ${
                  isActive
                    ? 'text-teal-800 font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Icon className={`w-4 h-4 mb-0.5 ${isActive ? 'text-teal-700 scale-105' : 'text-slate-400'}`} />
                <span className="text-[10px]">{item.label}</span>
              </button>
            );
          })}
        </nav>
      )}
    </div>
  );

  // If frame mode is enabled, wrap inside clean device frame
  if (deviceFrameMode === 'frame') {
    return (
      <div className="min-h-[calc(100vh-48px)] py-6 px-3 flex flex-col items-center justify-center bg-slate-900 border-x border-slate-800">
        {/* Device Wrapper */}
        <div className="mobile-device-frame relative shadow-xl rounded-[28px] overflow-hidden border border-slate-700">
          {content}
        </div>
        <p className="text-slate-400 text-xs mt-3 text-center font-mono">
          Viewport: 390 × 844 px · Enterprise Field Mobile Standard
        </p>
      </div>
    );
  }

  // Fluid responsive mode
  return (
    <div className="max-w-md mx-auto min-h-screen bg-slate-100 shadow-xs border-x border-slate-200">
      {content}
    </div>
  );
}
