import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDemo } from '../../context/DemoContext';
import MobileLayout from '../../layouts/MobileLayout';
import { TEAM_PERFORMANCE_METRICS } from '../../data/mockData';
import {
  Users,
  UserCheck,
  UserX,
  Clock,
  ClipboardList,
  BarChart3,
  MapPin,
  FileSpreadsheet,
  ChevronRight,
  TrendingUp,
  School,
  CheckCircle2,
  Calendar
} from 'lucide-react';

export default function ManagerDashboard() {
  const navigate = useNavigate();
  const { currentManager, managerPunchState } = useDemo();
  const metrics = TEAM_PERFORMANCE_METRICS;

  return (
    <MobileLayout title="Manager Overview" role="manager">
      <div className="space-y-4 pb-4">
        {/* Profile & Greeting Header */}
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={currentManager.avatar}
              alt={currentManager.name}
              className="w-11 h-11 rounded-full object-cover ring-2 ring-blue-500/30 border border-slate-200"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-slate-500">Namaste,</span>
                <span className="font-bold text-slate-900 text-sm">{currentManager.name}</span>
              </div>
              <p className="text-[11px] text-blue-700 font-semibold">
                {currentManager.designation} · {currentManager.district}
              </p>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200">
            Zonal Mgr
          </span>
        </div>

        {/* Manager Attendance & Cluster Status */}
        <div className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-800 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                Manager Punch Status
              </span>
            </div>
            <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-300 font-mono">
              12 Oct 2026
            </span>
          </div>

          <div className="flex items-center justify-between mt-2">
            <div>
              <p className="text-base font-bold text-white">On Duty · Zonal HQ</p>
              <p className="text-xs text-slate-400 mt-0.5">
                In: {managerPunchState.punchInTime} · Bhadrachalam Road
              </p>
            </div>
            <button
              onClick={() => navigate('/manager/punch-in')}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow"
            >
              Verify Punch
            </button>
          </div>
        </div>

        {/* Team Attendance Snapshot Cards (Present, Absent, Leave) */}
        <div>
          <span className="text-xs font-bold text-slate-800 mb-2 block px-1">
            Team Attendance Today (18 Volunteers)
          </span>
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-white p-3 rounded-2xl border border-emerald-200 shadow-xs text-center">
              <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center mb-1">
                <UserCheck className="w-4 h-4" />
              </div>
              <span className="text-[10px] text-slate-500 block">Present</span>
              <span className="text-base font-extrabold text-emerald-700 font-mono">
                {metrics.presentToday}
              </span>
              <span className="text-[9px] text-emerald-600 font-semibold block">83.3% On Field</span>
            </div>

            <div className="bg-white p-3 rounded-2xl border border-rose-200 shadow-xs text-center">
              <div className="w-7 h-7 rounded-lg bg-rose-100 text-rose-700 mx-auto flex items-center justify-center mb-1">
                <UserX className="w-4 h-4" />
              </div>
              <span className="text-[10px] text-slate-500 block">Absent</span>
              <span className="text-base font-extrabold text-rose-600 font-mono">
                {metrics.absentToday}
              </span>
              <span className="text-[9px] text-rose-600 font-semibold block">Unexcused</span>
            </div>

            <div className="bg-white p-3 rounded-2xl border border-amber-200 shadow-xs text-center">
              <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 mx-auto flex items-center justify-center mb-1">
                <Clock className="w-4 h-4" />
              </div>
              <span className="text-[10px] text-slate-500 block">On Leave</span>
              <span className="text-base font-extrabold text-amber-600 font-mono">
                {metrics.onLeaveToday}
              </span>
              <span className="text-[9px] text-amber-600 font-semibold block">Sanctioned</span>
            </div>
          </div>
        </div>

        {/* Team Completion & Target Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-2.5">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Team Achievement
              </span>
              <h3 className="text-xs font-bold text-slate-900">October Cluster Target</h3>
            </div>
            <div className="text-right">
              <span className="text-sm font-extrabold text-blue-700 font-mono">
                {metrics.teamCompletionRate}%
              </span>
              <span className="text-[10px] text-slate-500 block -mt-0.5">
                {metrics.teamAchievedSchools} / {metrics.teamTargetSchools} Schools
              </span>
            </div>
          </div>

          <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-blue-700 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${metrics.teamCompletionRate}%` }}
            />
          </div>

          <div className="flex justify-between items-center text-[11px] text-slate-600 pt-1">
            <span>Today's Total Field Activities: <strong>{metrics.totalActivitiesToday}</strong></span>
            <button
              onClick={() => navigate('/manager/team-performance')}
              className="text-blue-600 font-semibold hover:underline flex items-center gap-0.5"
            >
              Analytics <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Quick Access Menu Cards */}
        <div>
          <span className="text-xs font-bold text-slate-800 mb-2 block px-1">
            Monitoring Modules
          </span>
          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={() => navigate('/manager/volunteers')}
              className="p-3 bg-white hover:bg-blue-50/40 border border-slate-200 rounded-2xl text-left shadow-xs transition-all flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-slate-900 text-xs block">Volunteers</span>
                <span className="text-[10px] text-slate-500">Field Scorecards</span>
              </div>
            </button>

            <button
              onClick={() => navigate('/manager/monthly-report')}
              className="p-3 bg-white hover:bg-emerald-50/40 border border-slate-200 rounded-2xl text-left shadow-xs transition-all flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-slate-900 text-xs block">Monthly Report</span>
                <span className="text-[10px] text-slate-500">Excel / CSV Export</span>
              </div>
            </button>

            <button
              onClick={() => navigate('/manager/day-summary')}
              className="p-3 bg-white hover:bg-amber-50/40 border border-slate-200 rounded-2xl text-left shadow-xs transition-all flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-slate-900 text-xs block">Day Summary</span>
                <span className="text-[10px] text-slate-500">Cluster Daily Feed</span>
              </div>
            </button>

            <button
              onClick={() => navigate('/manager/route-history')}
              className="p-3 bg-white hover:bg-purple-50/40 border border-slate-200 rounded-2xl text-left shadow-xs transition-all flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-slate-900 text-xs block">Route Audit</span>
                <span className="text-[10px] text-slate-500">Volunteer GPS Paths</span>
              </div>
            </button>
          </div>
        </div>

        {/* Live Volunteer Activity Feed */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="text-xs font-bold text-slate-900">Recent Field Updates</h3>
            <span className="text-[10px] text-blue-600 font-semibold cursor-pointer" onClick={() => navigate('/manager/day-summary')}>
              View All 38
            </span>
          </div>

          <div className="space-y-2.5">
            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-xs flex items-start gap-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
              <div className="flex-1">
                <p className="font-bold text-slate-900">Suresh Babu (MARI-VOL-103)</p>
                <p className="text-[11px] text-slate-600 mt-0.5">Completed School Visit at KGBV Manuguru (42 students reached)</p>
                <span className="text-[10px] text-slate-400 font-mono mt-1 block">11:15 AM · Manuguru Mandal</span>
              </div>
            </div>

            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-xs flex items-start gap-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
              <div className="flex-1">
                <p className="font-bold text-slate-900">Rajesh Kumar (MARI-VOL-101)</p>
                <p className="text-[11px] text-slate-600 mt-0.5">Health hygiene session at ZPHS Sarapaka (48 students reached)</p>
                <span className="text-[10px] text-slate-400 font-mono mt-1 block">10:15 AM · Sarapaka</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}
