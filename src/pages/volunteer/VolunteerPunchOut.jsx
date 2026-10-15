import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDemo } from '../../context/DemoContext';
import MobileLayout from '../../layouts/MobileLayout';
import {
  LogOut,
  PlusCircle,
  CheckCircle,
  AlertTriangle,
  Calendar,
  Clock,
  ArrowRight,
  Camera,
  RefreshCw,
  Scale
} from 'lucide-react';

export default function VolunteerPunchOut() {
  const navigate = useNavigate();
  const { punchState, todayActivities, handlePunchOut, currentCoordinator } = useDemo();

  const [mode, setMode] = useState('punch_out');
  const [remarks, setRemarks] = useState('Completed school collection drive and awareness session. All material transferred to MRF.');
  const [issues, setIssues] = useState('Weighbridge queue at MRF delayed receipt collection by 20 minutes.');
  const [nextDayPlan, setNextDayPlan] = useState('Conduct ISRS collection drive at MPPS Burgampahad & follow-up with Govt Degree College.');
  const [punchOutPhoto, setPunchOutPhoto] = useState(
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80'
  );
  const [submitting, setSubmitting] = useState(false);

  // Compute metrics from todayActivities
  const totalTasks = todayActivities.length || 2;
  const totalKg = todayActivities.reduce((acc, curr) => acc + (Number(curr.quantityCollected) || Number(curr.quantityAchieved) || 0), 0) || 290;
  const totalVerifiedKg = todayActivities.reduce((acc, curr) => acc + (Number(curr.verifiedQuantity) || Number(curr.quantityCollected) || 0), 0) || 280;

  const handleConfirmPunchOut = () => {
    setSubmitting(true);
    setTimeout(() => {
      handlePunchOut({
        totalTasks,
        totalKg,
        totalVerifiedKg,
        remarks,
        issues,
        nextDayPlan,
        photo: punchOutPhoto
      });
      setSubmitting(false);
    }, 600);
  };

  return (
    <MobileLayout title="Punch-Out & Daily Summary" showBack={true} role="coordinator">
      <div className="space-y-3.5 pb-6">
        {punchState.isPunchedOut ? (
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs text-center space-y-3 animate-fadeIn">
            <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-800 mx-auto flex items-center justify-center border border-slate-200">
              <CheckCircle className="w-7 h-7 text-teal-700" />
            </div>

            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-slate-100 px-2 py-0.5 rounded">
                Attendance Finalized
              </span>
              <h2 className="text-base font-bold text-slate-900 mt-2">Field Day Completed!</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Punched out at <span className="font-bold text-slate-800 font-mono">{punchState.punchOutTime || '05:45 PM'}</span>.
                Daily report synchronized to Manager Console.
              </p>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-500 block">Tasks Completed</span>
                <span className="text-sm font-bold text-slate-900 font-mono">{totalTasks}</span>
              </div>
              <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-500 block">Collected</span>
                <span className="text-sm font-bold text-slate-900 font-mono">{totalKg} Kg</span>
              </div>
              <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-500 block">Verified MRF</span>
                <span className="text-sm font-bold text-teal-800 font-mono">{totalVerifiedKg} Kg</span>
              </div>
            </div>

            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-left text-xs space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Tomorrow's Scheduled Plan
              </span>
              <p className="text-slate-700 font-medium">{nextDayPlan}</p>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => navigate('/volunteer/dashboard')}
                className="w-full py-2 bg-teal-700 hover:bg-teal-800 text-white rounded text-xs font-bold"
              >
                Go to Coordinator Dashboard
              </button>

              <button
                onClick={() => navigate('/manager/day-summary')}
                className="w-full py-2 bg-slate-800 hover:bg-slate-900 text-white rounded text-xs font-semibold"
              >
                Inspect in Manager Day Summary Report →
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Mode Selector Choice Cards */}
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setMode('punch_out')}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  mode === 'punch_out'
                    ? 'bg-rose-50 border-rose-400'
                    : 'bg-white border-slate-200'
                }`}
              >
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center mb-1.5 ${
                  mode === 'punch_out' ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  <LogOut className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-xs font-bold text-slate-900">Punch Out Now</h3>
                <p className="text-[10px] text-slate-500">Capture selfie & finalize day</p>
              </button>

              <button
                type="button"
                onClick={() => navigate('/volunteer/activity-select')}
                className="p-2.5 rounded-xl border bg-white border-slate-200 hover:border-teal-700 text-left transition-all"
              >
                <div className="w-7 h-7 rounded-lg bg-teal-50 text-teal-800 flex items-center justify-center mb-1.5 border border-teal-200">
                  <PlusCircle className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-xs font-bold text-slate-900">Add Another Task</h3>
                <p className="text-[10px] text-slate-500">Log additional field outreach</p>
              </button>
            </div>

            {/* Form */}
            <form onSubmit={(e) => { e.preventDefault(); handleConfirmPunchOut(); }} className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs space-y-3">
              <div className="border-b border-slate-100 pb-2">
                <h3 className="text-xs font-bold text-slate-900">Daily Reconciliation & Punch-Out</h3>
                <p className="text-[10px] text-slate-500">Review today's dry waste achievements before closing duty.</p>
              </div>

              {/* Day Metrics Summary */}
              <div className="grid grid-cols-3 gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-center text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 block">Tasks Logged</span>
                  <span className="font-bold text-slate-900 font-mono">{totalTasks}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Collected (Kg)</span>
                  <span className="font-bold text-slate-900 font-mono">{totalKg}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Weighbridge (Kg)</span>
                  <span className="font-bold text-teal-800 font-mono">{totalVerifiedKg}</span>
                </div>
              </div>

              {/* Mandatory Geotagged Selfie for Punch-Out (PRD Requirement) */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5 text-teal-700" />
                    <span>Mandatory Punch-Out Selfie (Geotagged) *</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setPunchOutPhoto(prev => prev.includes('507003211169')
                      ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80'
                      : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80')}
                    className="text-[10px] text-teal-800 font-bold hover:underline"
                  >
                    Switch Photo
                  </button>
                </div>
                <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-900 border border-slate-300">
                  <img src={punchOutPhoto} alt="Punch-Out Proof" className="w-full h-full object-cover" />
                  <div className="absolute bottom-1 right-2 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded font-mono">
                    17.6620° N, 80.8810° E · 05:45 PM
                  </div>
                </div>
              </div>

              {/* Remarks */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Field Outcomes & Remarks *</label>
                <textarea
                  rows={2}
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  className="w-full py-1.5 px-2 bg-slate-50 border border-slate-300 rounded text-xs outline-none focus:border-teal-700 resize-none"
                />
              </div>

              {/* Issues */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Field Issues / Bottlenecks</label>
                <input
                  type="text"
                  value={issues}
                  onChange={(e) => setIssues(e.target.value)}
                  className="w-full py-1.5 px-2 bg-slate-50 border border-slate-300 rounded text-xs outline-none focus:border-teal-700"
                />
              </div>

              {/* Next Day Plan */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tomorrow's Work Plan *</label>
                <input
                  type="text"
                  value={nextDayPlan}
                  onChange={(e) => setNextDayPlan(e.target.value)}
                  className="w-full py-1.5 px-2 bg-slate-50 border border-slate-300 rounded text-xs outline-none focus:border-teal-700"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-2.5 px-4 bg-rose-700 hover:bg-rose-800 text-white rounded text-xs font-bold shadow-xs flex items-center justify-center gap-2 transition-all active:scale-[0.98] mt-2"
              >
                {submitting ? (
                  <span>Submitting Final Attendance...</span>
                ) : (
                  <>
                    <LogOut className="w-4 h-4" />
                    <span>Confirm Punch-Out & Submit Daily Summary</span>
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </MobileLayout>
  );
}
