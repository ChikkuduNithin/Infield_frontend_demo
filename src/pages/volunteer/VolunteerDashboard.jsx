import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDemo } from '../../context/DemoContext';
import MobileLayout from '../../layouts/MobileLayout';
import {
  School,
  Users,
  Package,
  PlusCircle,
  Calendar,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  TrendingUp,
  Award,
  ArrowUpRight,
  LogOut,
  Sparkles
} from 'lucide-react';

export default function VolunteerDashboard() {
  const navigate = useNavigate();
  const { currentVolunteer, punchState, todayActivities } = useDemo();

  // Targets and achievements
  const target = currentVolunteer.monthlyTarget || { schools: 24, students: 1200, kits: 450 };
  const achieved = currentVolunteer.achieved || { schools: 19, students: 960, kits: 380 };
  const schoolPercent = Math.round((achieved.schools / target.schools) * 100);
  const studentPercent = Math.round((achieved.students / target.students) * 100);
  const kitPercent = Math.round((achieved.kits / target.kits) * 100);

  return (
    <MobileLayout title="Volunteer Dashboard" role="volunteer">
      <div className="space-y-4 pb-4">
        {/* 1. Header Greeting & Profile Bar */}
        <div className="flex items-center justify-between bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3">
            <img
              src={currentVolunteer.avatar}
              alt={currentVolunteer.name}
              className="w-11 h-11 rounded-full object-cover ring-2 ring-emerald-500/30 border border-slate-200"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-slate-500">Namaste,</span>
                <span className="font-bold text-slate-900 text-sm">{currentVolunteer.name}</span>
              </div>
              <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                <span>{currentVolunteer.empId}</span>
                <span>•</span>
                <span className="text-slate-500">{currentVolunteer.district}</span>
              </p>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
            Field Vol
          </span>
        </div>

        {/* 2. Today's Attendance Status Card */}
        <div className={`p-4 rounded-2xl border shadow-sm transition-all ${
          punchState.isPunchedOut
            ? 'bg-slate-900 text-white border-slate-800'
            : punchState.isPunchedIn
              ? 'bg-gradient-to-br from-emerald-700 to-emerald-900 text-white border-emerald-600 shadow-emerald-900/20'
              : 'bg-amber-50 text-amber-950 border-amber-200'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${
                punchState.isPunchedOut ? 'bg-slate-400' : punchState.isPunchedIn ? 'bg-emerald-300 animate-pulse' : 'bg-amber-500'
              }`}></span>
              <span className="text-xs font-bold uppercase tracking-wider">
                Today's Attendance Status
              </span>
            </div>
            <span className="text-[11px] font-mono opacity-80">12 Oct 2026</span>
          </div>

          <div className="flex items-center justify-between mt-3">
            <div>
              <p className="text-xl font-extrabold tracking-tight">
                {punchState.isPunchedOut
                  ? 'Day Completed'
                  : punchState.isPunchedIn
                    ? 'Punched In · Active'
                    : 'Punch-in Pending'}
              </p>
              <p className="text-xs opacity-80 mt-0.5 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 inline" />
                {punchState.isPunchedOut
                  ? `Out: ${punchState.punchOutTime || '05:30 PM'} (In: ${punchState.punchInTime})`
                  : punchState.isPunchedIn
                    ? `Time: ${punchState.punchInTime || '09:08 AM'} · Sarapaka Cluster`
                    : 'Please punch in before visiting schools'}
              </p>
            </div>

            <button
              onClick={() => navigate(
                punchState.isPunchedIn && !punchState.isPunchedOut
                  ? '/volunteer/punch-out'
                  : '/volunteer/punch-in'
              )}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold shadow transition-all ${
                punchState.isPunchedOut
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                  : punchState.isPunchedIn
                    ? 'bg-white hover:bg-emerald-50 text-emerald-800'
                    : 'bg-amber-600 hover:bg-amber-700 text-white'
              }`}
            >
              {punchState.isPunchedOut ? 'View Summary' : punchState.isPunchedIn ? 'Punch Out' : 'Punch In Now'}
            </button>
          </div>
        </div>

        {/* 3. Monthly Target & Progress Overview */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Monthly Target vs Achievement
              </span>
              <h3 className="text-sm font-bold text-slate-900">October 2026 Progress</h3>
            </div>
            <div className="text-right">
              <span className="text-base font-extrabold text-emerald-600 font-mono">{schoolPercent}%</span>
              <span className="text-[10px] text-slate-500 block -mt-1">Overall</span>
            </div>
          </div>

          {/* Master Progress Bar */}
          <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${schoolPercent}%` }}
            />
          </div>

          {/* 3 Metric Mini Cards */}
          <div className="grid grid-cols-3 gap-2 pt-1">
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-center">
              <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center mb-1">
                <School className="w-3.5 h-3.5" />
              </div>
              <span className="text-[10px] text-slate-500 block">Schools</span>
              <span className="text-xs font-bold text-slate-900">{achieved.schools} / {target.schools}</span>
              <span className="text-[9px] text-emerald-600 font-semibold block">{schoolPercent}% Achieved</span>
            </div>

            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-center">
              <div className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 mx-auto flex items-center justify-center mb-1">
                <Users className="w-3.5 h-3.5" />
              </div>
              <span className="text-[10px] text-slate-500 block">Students</span>
              <span className="text-xs font-bold text-slate-900">{achieved.students} / {target.students}</span>
              <span className="text-[9px] text-blue-600 font-semibold block">{studentPercent}% Achieved</span>
            </div>

            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-center">
              <div className="w-6 h-6 rounded-lg bg-amber-100 text-amber-700 mx-auto flex items-center justify-center mb-1">
                <Package className="w-3.5 h-3.5" />
              </div>
              <span className="text-[10px] text-slate-500 block">Kits / Packs</span>
              <span className="text-xs font-bold text-slate-900">{achieved.kits} / {target.kits}</span>
              <span className="text-[9px] text-amber-600 font-semibold block">{kitPercent}% Achieved</span>
            </div>
          </div>
        </div>

        {/* 4. Quick Action Grid */}
        <div>
          <span className="text-xs font-bold text-slate-800 mb-2 block px-1">
            Quick Actions
          </span>
          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={() => navigate('/volunteer/activity-select')}
              className="p-3 bg-white hover:bg-emerald-50/50 border border-slate-200 rounded-2xl text-left shadow-xs transition-all flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <PlusCircle className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-slate-900 text-xs block">Log Activity</span>
                <span className="text-[10px] text-slate-500">School, Camp, Meet</span>
              </div>
            </button>

            <button
              onClick={() => navigate('/volunteer/calendar')}
              className="p-3 bg-white hover:bg-blue-50/50 border border-slate-200 rounded-2xl text-left shadow-xs transition-all flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-slate-900 text-xs block">Attendance</span>
                <span className="text-[10px] text-slate-500">Monthly Calendar</span>
              </div>
            </button>

            <button
              onClick={() => navigate('/volunteer/route-history')}
              className="p-3 bg-white hover:bg-indigo-50/50 border border-slate-200 rounded-2xl text-left shadow-xs transition-all flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-slate-900 text-xs block">Route History</span>
                <span className="text-[10px] text-slate-500">Recorded GPS Waypoints</span>
              </div>
            </button>

            <button
              onClick={() => navigate('/volunteer/punch-out')}
              className="p-3 bg-white hover:bg-rose-50/50 border border-slate-200 rounded-2xl text-left shadow-xs transition-all flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <LogOut className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-slate-900 text-xs block">Day Summary</span>
                <span className="text-[10px] text-slate-500">Punch-out Report</span>
              </div>
            </button>
          </div>
        </div>

        {/* 5. Recent Field Activities Timeline */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-slate-900">Today's Recorded Visits</h3>
            <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
              {todayActivities.length} Completed
            </span>
          </div>

          {todayActivities.length === 0 ? (
            <div className="text-center py-6 text-slate-400 text-xs">
              No activities logged today yet. Click "Log Activity" above.
            </div>
          ) : (
            <div className="space-y-3">
              {todayActivities.map((act) => (
                <div
                  key={act.id}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start justify-between gap-3"
                >
                  <div className="flex items-start gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                      <School className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-900">{act.schoolName || act.typeName}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{act.remarks}</p>
                      <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-600">
                        <span className="font-semibold text-emerald-700">👥 {act.studentsReached} Students</span>
                        <span>•</span>
                        <span>📦 {act.quantityAchieved} Kits</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 shrink-0 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                    {act.time}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </MobileLayout>
  );
}
