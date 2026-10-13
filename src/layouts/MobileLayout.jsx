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
  Battery
} from 'lucide-react';

export default function MobileLayout({
  children,
  title = "MARI Field App",
  showBack = false,
  role = "volunteer",
  hideBottomNav = false,
  rightAction = null
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const { deviceFrameMode, punchState, managerPunchState } = useDemo();

  // Navigation Items
  const volunteerNav = [
    { label: "Home", path: "/volunteer/dashboard", icon: Home },
    { label: "Activities", path: "/volunteer/activity-select", icon: ClipboardList },
    { label: "Calendar", path: "/volunteer/calendar", icon: Calendar },
    { label: "Route", path: "/volunteer/route-history", icon: MapPin },
    {
      label: punchState.isPunchedIn && !punchState.isPunchedOut ? "Punch Out" : "Punch In",
      path: punchState.isPunchedIn && !punchState.isPunchedOut ? "/volunteer/punch-out" : "/volunteer/punch-in",
      icon: punchState.isPunchedIn && !punchState.isPunchedOut ? LogOut : CheckCircle,
      highlight: true
    }
  ];

  const managerNav = [
    { label: "Overview", path: "/manager/dashboard", icon: Home },
    { label: "Volunteers", path: "/manager/volunteers", icon: Users },
    { label: "Team", path: "/manager/team-performance", icon: BarChart3 },
    { label: "Reports", path: "/manager/monthly-report", icon: FileText },
    { label: "Punch", path: "/manager/punch-in", icon: CheckCircle, highlight: true }
  ];

  const navItems = role === "volunteer" ? volunteerNav : managerNav;

  const content = (
    <div className="flex flex-col h-full bg-slate-50 text-slate-800 relative select-none">
      {/* 1. Mobile Status Bar (Realistic simulated phone header) */}
      <div className="bg-slate-900 text-white px-5 pt-2 pb-1.5 flex items-center justify-between text-[11px] font-medium tracking-tight shrink-0 z-20">
        <span className="font-semibold text-slate-100">10:45 AM</span>
        {/* Dynamic Island spacer in frame mode */}
        {deviceFrameMode === 'frame' && (
          <div className="w-20 h-4 bg-black rounded-full mx-auto" />
        )}
        <div className="flex items-center gap-1.5 text-slate-300">
          <span className="text-[10px] font-mono text-emerald-400 font-bold">5G</span>
          <Wifi className="w-3 h-3" />
          <div className="flex items-center gap-0.5">
            <span className="text-[10px]">94%</span>
            <Battery className="w-3.5 h-3.5 text-emerald-400" />
          </div>
        </div>
      </div>

      {/* 2. Application Header */}
      <header className="bg-white border-b border-slate-200 px-4 py-2.5 flex items-center justify-between shadow-sm shrink-0 z-10">
        <div className="flex items-center gap-2.5">
          {showBack ? (
            <button
              onClick={() => navigate(-1)}
              className="w-8 h-8 rounded-full flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors -ml-1"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          ) : (
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-emerald-500 flex items-center justify-center text-white font-bold text-sm shadow-sm">
              M
            </div>
          )}
          <div>
            <h1 className="text-sm font-bold text-slate-900 leading-tight line-clamp-1">{title}</h1>
            <p className="text-[10px] text-slate-500 flex items-center gap-1">
              <span>ITC Mission Sunehra Kal</span>
              <span>•</span>
              <span className="text-emerald-700 font-semibold uppercase">{role}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {rightAction ? (
            rightAction
          ) : (
            <>
              <button
                onClick={() => alert('Simulated notification: Daily cluster review scheduled at 5:00 PM.')}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-100 relative"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white"></span>
              </button>
              <button
                onClick={() => navigate(role === 'volunteer' ? '/volunteer/login' : '/manager/login')}
                className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 text-xs font-semibold"
                title="Switch User / Login"
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
        <nav className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-2 py-1.5 flex items-center justify-around shadow-lg z-20">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            if (item.highlight) {
              return (
                <button
                  key={item.label}
                  onClick={() => navigate(item.path)}
                  className="flex flex-col items-center justify-center -mt-4 group"
                >
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center shadow-md transition-transform group-active:scale-95 ${
                    item.label === 'Punch Out'
                      ? 'bg-rose-600 text-white shadow-rose-500/30 ring-4 ring-rose-100'
                      : 'bg-emerald-600 text-white shadow-emerald-500/30 ring-4 ring-emerald-100'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`text-[10px] mt-0.5 font-semibold ${
                    item.label === 'Punch Out' ? 'text-rose-600' : 'text-emerald-700'
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
                    ? 'text-emerald-700 font-semibold'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <Icon className={`w-4 h-4 mb-0.5 ${isActive ? 'text-emerald-600 scale-110' : ''}`} />
                <span className="text-[10px]">{item.label}</span>
              </button>
            );
          })}
        </nav>
      )}
    </div>
  );

  // If frame mode is enabled and screen is wide enough, wrap inside realistic iPhone frame
  if (deviceFrameMode === 'frame') {
    return (
      <div className="min-h-[calc(100vh-48px)] py-6 px-3 flex flex-col items-center justify-center bg-slate-950/90 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px]">
        {/* Device Wrapper */}
        <div className="mobile-device-frame relative shadow-2xl">
          {content}
        </div>
        <p className="text-slate-400 text-xs mt-3 text-center">
          📱 390 × 844 px Mobile Prototype Viewport · Use top bar to toggle Fluid Width
        </p>
      </div>
    );
  }

  // Fluid responsive mode (fits mobile browser or expanded view)
  return (
    <div className="max-w-md mx-auto min-h-screen bg-white shadow-md">
      {content}
    </div>
  );
}
