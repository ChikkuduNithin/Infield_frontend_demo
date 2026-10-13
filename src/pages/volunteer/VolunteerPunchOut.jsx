import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDemo } from '../../context/DemoContext';
import MobileLayout from '../../layouts/MobileLayout';
import {
  LogOut,
  PlusCircle,
  CheckCircle,
  School,
  Users,
  Package,
  AlertTriangle,
  Calendar,
  Clock,
  ArrowRight,
  RotateCcw,
  Sparkles
} from 'lucide-react';

export default function VolunteerPunchOut() {
  const navigate = useNavigate();
  const { punchState, todayActivities, handlePunchOut, resetAllDemoData } = useDemo();

  const [mode, setMode] = useState('punch_out'); // 'punch_out' | 'continue'
  const [remarks, setRemarks] = useState('All planned school sessions successfully conducted with teacher participation.');
  const [issues, setIssues] = useState('Power fluctuation at Burgampahad primary school; projector could not be used.');
  const [nextDayPlan, setNextDayPlan] = useState('Visit TTWRS Residential School Aswapuram and distribute 60 hygiene kits.');
  const [submitting, setSubmitting] = useState(false);

  // Compute stats from todayActivities
  const schoolsCount = todayActivities.filter(a => a.type === 'school_visit').length || 2;
  const studentsCount = todayActivities.reduce((acc, curr) => acc + (Number(curr.studentsReached) || 0), 0) || 82;
  const kitsCount = todayActivities.reduce((acc, curr) => acc + (Number(curr.quantityAchieved) || 0), 0) || 82;

  const handleConfirmPunchOut = () => {
    setSubmitting(true);
    setTimeout(() => {
      handlePunchOut({
        schoolsCount,
        studentsCount,
        kitsCount,
        remarks,
        issues,
        nextDayPlan
      });
      setSubmitting(false);
    }, 600);
  };

  return (
    <MobileLayout title="Punch-out & Day Summary" showBack={true} role="volunteer">
      <div className="space-y-4 pb-6">
        {/* If already punched out, show completed final state */}
        {punchState.isPunchedOut ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm text-center space-y-4 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-800 mx-auto flex items-center justify-center ring-8 ring-slate-50">
              <CheckCircle className="w-9 h-9 text-emerald-600" />
            </div>

            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-slate-100 px-2.5 py-0.5 rounded-full">
                Attendance Finalized
              </span>
              <h2 className="text-lg font-bold text-slate-900 mt-2">Field Day Completed!</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Punched out at <span className="font-bold text-slate-800 font-mono">{punchState.punchOutTime || '05:45 PM'}</span>.
                Your daily summary has been submitted to your manager.
              </p>
            </div>

            {/* Final Daily Summary Metrics */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-500 block">Schools</span>
                <span className="text-sm font-bold text-slate-900">{schoolsCount}</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-500 block">Students</span>
                <span className="text-sm font-bold text-slate-900">{studentsCount}</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-500 block">Kits</span>
                <span className="text-sm font-bold text-slate-900">{kitsCount}</span>
              </div>
            </div>

            {/* Next Plan Snapshot */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-left text-xs space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Next Day's Plan
              </span>
              <p className="text-slate-700 font-medium">{nextDayPlan}</p>
            </div>

            {/* Navigation & Presentation helper */}
            <div className="space-y-2 pt-2">
              <button
                onClick={() => navigate('/volunteer/dashboard')}
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all"
              >
                Go to Volunteer Dashboard
              </button>

              <button
                onClick={() => navigate('/manager/day-summary')}
                className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition-all"
              >
                View as Manager in Day Summary Report →
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Mode Selector Choice Cards */}
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setMode('punch_out')}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  mode === 'punch_out'
                    ? 'bg-rose-50/80 border-rose-500 ring-2 ring-rose-500/20 shadow-xs'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center mb-2 ${
                  mode === 'punch_out' ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  <LogOut className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-bold text-slate-900">Punch Out Now</h3>
                <p className="text-[10px] text-slate-500 mt-0.5">Finalize today's attendance & submit daily report</p>
              </button>

              <button
                type="button"
                onClick={() => navigate('/volunteer/activity-select')}
                className="p-3 rounded-2xl border bg-white border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/30 text-left transition-all group"
              >
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                  <PlusCircle className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-bold text-slate-900">Add Another Activity</h3>
                <p className="text-[10px] text-slate-500 mt-0.5">Continue field visits before day end</p>
              </button>
            </div>

            {/* Today's Recorded Activity Summary Card */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h3 className="text-xs font-bold text-slate-900">Today's Activity Summary</h3>
                <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                  {todayActivities.length} Sessions Logged
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <div className="w-6 h-6 rounded bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center mb-1">
                    <School className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[10px] text-slate-500 block">Schools</span>
                  <span className="text-xs font-bold text-slate-900">{schoolsCount}</span>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <div className="w-6 h-6 rounded bg-blue-100 text-blue-700 mx-auto flex items-center justify-center mb-1">
                    <Users className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[10px] text-slate-500 block">Students</span>
                  <span className="text-xs font-bold text-slate-900">{studentsCount}</span>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <div className="w-6 h-6 rounded bg-amber-100 text-amber-700 mx-auto flex items-center justify-center mb-1">
                    <Package className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[10px] text-slate-500 block">Kits Achieved</span>
                  <span className="text-xs font-bold text-slate-900">{kitsCount}</span>
                </div>
              </div>
            </div>

            {/* Daily Summary & Feedback Form */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3.5">
              <h3 className="text-xs font-bold text-slate-900">Day Close-out Feedback</h3>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Day Summary Remarks
                </label>
                <textarea
                  rows={2}
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="Summary of today's field performance..."
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 outline-none focus:bg-white focus:border-emerald-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                  <span>Issues or Challenges Faced</span>
                </label>
                <textarea
                  rows={2}
                  value={issues}
                  onChange={(e) => setIssues(e.target.value)}
                  placeholder="Transport delay, kit shortage, weather..."
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 outline-none focus:bg-white focus:border-amber-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Next Working Day's Plan
                </label>
                <input
                  type="text"
                  value={nextDayPlan}
                  onChange={(e) => setNextDayPlan(e.target.value)}
                  placeholder="Target schools or community camps for tomorrow..."
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 outline-none focus:bg-white focus:border-emerald-500"
                />
              </div>

              {/* Confirm Punch Out Button */}
              <button
                type="button"
                onClick={handleConfirmPunchOut}
                disabled={submitting}
                className="w-full py-3 px-4 bg-rose-600 hover:bg-rose-700 active:scale-[0.98] text-white rounded-2xl text-xs font-bold shadow-md shadow-rose-600/20 flex items-center justify-center gap-2 transition-all mt-2"
              >
                {submitting ? (
                  <span>Recording Punch-out...</span>
                ) : (
                  <>
                    <LogOut className="w-4 h-4" />
                    <span>Confirm Punch-out & Submit Summary</span>
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </MobileLayout>
  );
}
