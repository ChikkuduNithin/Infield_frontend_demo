import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDemo } from '../context/DemoContext';
import {
  LayoutDashboard,
  Users,
  School,
  Building2,
  FileSpreadsheet,
  Database,
  ChevronRight,
  Menu,
  X,
  Search,
  Bell,
  ExternalLink,
  ShieldAlert,
  LogOut,
  Sparkles
} from 'lucide-react';

export default function AdminLayout({ children, title = "Admin Management Portal", subtitle = "ITC Mission Sunehra Kal & NGO Governance" }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentAdmin, users, schools, ngos } = useDemo();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { label: "User Management", path: "/admin/users", icon: Users, badge: users.length },
    { label: "School Management", path: "/admin/schools", icon: School, badge: schools.length },
    { label: "Managers & NGOs", path: "/admin/managers-orgs", icon: Building2, badge: ngos.length },
    { label: "Reports Hub", path: "/admin/reports", icon: FileSpreadsheet },
    { label: "Master Data", path: "/admin/master-data", icon: Database },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col antialiased">
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <aside
          className={`bg-slate-900 text-slate-300 flex flex-col shrink-0 transition-all duration-300 border-r border-slate-800 ${
            sidebarOpen ? 'w-64' : 'w-20'
          }`}
        >
          {/* Logo & Platform Info */}
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-emerald-400 flex items-center justify-center font-bold text-slate-950 text-xl shadow-md shrink-0">
                M
              </div>
              {sidebarOpen && (
                <div className="truncate">
                  <h2 className="font-bold text-white text-sm tracking-tight leading-none">MARI Portal</h2>
                  <span className="text-[10px] text-emerald-400 font-medium">ITC CSR Admin HQ</span>
                </div>
              )}
            </div>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 p-3 space-y-1.5 overflow-y-auto">
            {sidebarOpen && (
              <p className="px-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Administration
              </p>
            )}
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;

              return (
                <button
                  key={item.label}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'hover:bg-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                  title={!sidebarOpen ? item.label : undefined}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`} />
                  {sidebarOpen && (
                    <div className="flex-1 flex items-center justify-between text-left truncate">
                      <span className="truncate">{item.label}</span>
                      {item.badge !== undefined && (
                        <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                          isActive ? 'bg-emerald-700 text-emerald-100' : 'bg-slate-800 text-slate-400'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )}
                </button>
              );
            })}

            {/* Quick Links Section */}
            {sidebarOpen && (
              <div className="pt-6 mt-6 border-t border-slate-800/80">
                <p className="px-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Presentation Demos
                </p>
                <button
                  onClick={() => navigate('/showcase')}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-amber-400 hover:bg-slate-800 hover:text-amber-300 transition-colors"
                >
                  <Sparkles className="w-4 h-4 shrink-0" />
                  <span>Screen Gallery</span>
                </button>
                <button
                  onClick={() => navigate('/volunteer/dashboard')}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors"
                >
                  <ExternalLink className="w-4 h-4 shrink-0" />
                  <span>Launch Volunteer App</span>
                </button>
                <button
                  onClick={() => navigate('/manager/dashboard')}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors"
                >
                  <ExternalLink className="w-4 h-4 shrink-0" />
                  <span>Launch Manager App</span>
                </button>
              </div>
            )}
          </nav>

          {/* User Profile in Sidebar footer */}
          <div className="p-3 border-t border-slate-800 bg-slate-950/40">
            <div className="flex items-center gap-3">
              <img
                src={currentAdmin.avatar}
                alt={currentAdmin.name}
                className="w-8 h-8 rounded-full object-cover border border-slate-700"
              />
              {sidebarOpen && (
                <div className="truncate flex-1">
                  <p className="text-xs font-semibold text-slate-200 truncate">{currentAdmin.name}</p>
                  <p className="text-[10px] text-emerald-400 truncate">{currentAdmin.designation}</p>
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Right Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {/* Top Admin Header */}
          <header className="bg-white border-b border-slate-200 px-6 py-4 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-20 shadow-xs">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-0.5">
                <span>ITC Mission Sunehra Kal</span>
                <ChevronRight className="w-3 h-3 text-slate-400" />
                <span className="text-slate-900 font-medium">{title}</span>
              </div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">{title}</h1>
              <p className="text-xs text-slate-500">{subtitle}</p>
            </div>

            {/* Header Right Actions */}
            <div className="flex items-center gap-3">
              <div className="hidden lg:flex items-center gap-2 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-xl text-xs text-slate-500">
                <Search className="w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Quick search records..."
                  className="bg-transparent border-none outline-none text-xs w-44 placeholder-slate-400 text-slate-700"
                />
              </div>

              <div className="flex items-center gap-2 border-l border-slate-200 pl-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  System Online
                </span>
              </div>
            </div>
          </header>

          {/* Main Body */}
          <main className="p-6 flex-1">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
