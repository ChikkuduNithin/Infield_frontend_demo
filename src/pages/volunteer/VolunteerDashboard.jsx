import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDemo } from '../../context/DemoContext';
import MobileLayout from '../../layouts/MobileLayout';
import Modal from '../../components/common/Modal';
import {
  School,
  Users,
  Package,
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
  Building2,
  Briefcase,
  FileText,
  Download,
  UploadCloud,
  CheckCircle2,
  Recycle,
  AlertTriangle,
  FolderDown
} from 'lucide-react';

export default function VolunteerDashboard() {
  const navigate = useNavigate();
  const {
    currentCoordinator,
    punchState,
    todayActivities,
    pendingActivities,
    resolvePendingActivity,
    holidays,
    downloads
  } = useDemo();

  const [showPendingModal, setShowPendingModal] = useState(false);
  const [showHolidaysModal, setShowHolidaysModal] = useState(false);
  const [showDownloadsModal, setShowDownloadsModal] = useState(false);
  const [resolvingId, setResolvingId] = useState(null);

  // Targets and achievements set by Manager
  const target = currentCoordinator.monthlyTarget || { schools: 24, colleges: 6, corporates: 4, materialKg: 3500, students: 1200 };
  const achieved = currentCoordinator.achieved || { schools: 19, colleges: 5, corporates: 3, materialKg: 2840, students: 960 };

  const kgPercent = Math.round((achieved.materialKg / target.materialKg) * 100);
  const schoolPercent = Math.round((achieved.schools / target.schools) * 100);

  const handleResolvePending = (pendingId) => {
    setResolvingId(pendingId);
    setTimeout(() => {
      resolvePendingActivity(pendingId, 'https://example.com/uploaded_acknowledgement.pdf');
      setResolvingId(null);
    }, 600);
  };

  return (
    <MobileLayout title="Coordinator Dashboard" role="coordinator">
      <div className="space-y-3.5 pb-4">
        {/* 1. Header Profile Summary */}
        <div className="flex items-center justify-between bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center gap-2.5">
            <img
              src={currentCoordinator.avatar}
              alt={currentCoordinator.name}
              className="w-10 h-10 rounded-lg object-cover border border-slate-300"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-900 text-xs">{currentCoordinator.name}</span>
                <span className="text-[10px] bg-teal-50 text-teal-800 font-mono font-semibold px-1.5 py-0.2 rounded border border-teal-200">
                  {currentCoordinator.empId}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                {currentCoordinator.district} · {currentCoordinator.org}
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Target Rate</span>
            <span className="text-xs font-bold text-teal-700 font-mono">{schoolPercent}%</span>
          </div>
        </div>

        {/* 2. Pending Activities Banner (PRD Requirement) */}
        {pendingActivities && pendingActivities.length > 0 && (
          <div className="bg-amber-50 border border-amber-300 rounded-xl p-3 shadow-2xs">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-bold text-amber-950">
                    {pendingActivities.length} Pending Activity Form{pendingActivities.length > 1 ? 's' : ''}
                  </h3>
                  <p className="text-[11px] text-amber-900 mt-0.5">
                    Collection drives executed but Acknowledgement Form / Weighbridge slip upload pending.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowPendingModal(true)}
                className="px-2.5 py-1 bg-amber-700 hover:bg-amber-800 text-white rounded text-[11px] font-bold shrink-0 transition-colors"
              >
                Resolve Now
              </button>
            </div>
          </div>
        )}

        {/* 3. Today's Attendance Card */}
        <div className={`p-3.5 rounded-xl border shadow-2xs ${
          punchState.isPunchedOut
            ? 'bg-slate-900 text-white border-slate-800'
            : punchState.isPunchedIn
              ? 'bg-teal-900 text-white border-teal-800'
              : 'bg-amber-50 text-amber-950 border-amber-200'
        }`}>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-200">
              Today's Field Attendance
            </span>
            <span className="text-[10px] font-mono opacity-80">15-OCT-2026</span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-base font-extrabold tracking-tight">
                {punchState.isPunchedOut
                  ? 'Day Completed (Punched Out)'
                  : punchState.isPunchedIn
                    ? 'Punched In · On Active Field'
                    : 'Punch-In Required'}
              </p>
              <p className="text-[11px] opacity-80 mt-0.5 flex items-center gap-1 font-mono">
                <Clock className="w-3 h-3 inline" />
                {punchState.isPunchedOut
                  ? `In: ${punchState.punchInTime} · Out: ${punchState.punchOutTime || '05:30 PM'}`
                  : punchState.isPunchedIn
                    ? `Time: ${punchState.punchInTime || '09:04 AM'} · Sarapaka Hub`
                    : 'Must capture geotagged selfie before field visits'}
              </p>
            </div>

            <button
              onClick={() => navigate(
                punchState.isPunchedIn && !punchState.isPunchedOut
                  ? '/volunteer/punch-out'
                  : '/volunteer/punch-in'
              )}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold shadow-xs transition-all ${
                punchState.isPunchedOut
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                  : punchState.isPunchedIn
                    ? 'bg-white hover:bg-teal-50 text-teal-900'
                    : 'bg-amber-700 hover:bg-amber-800 text-white'
              }`}
            >
              {punchState.isPunchedOut ? 'View Summary' : punchState.isPunchedIn ? 'Punch Out' : 'Punch In'}
            </button>
          </div>
        </div>

        {/* 4. Target vs Progress Metrics (PRD: Target set by Manager) */}
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs space-y-2.5">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Manager Monthly Target
              </span>
              <h3 className="text-xs font-bold text-slate-900">October 2026 Actual vs Plan</h3>
            </div>
            <span className="text-xs font-bold text-teal-800 font-mono bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
              {kgPercent}% of Kg Goal
            </span>
          </div>

          {/* Progress Bar for Dry Waste Kg */}
          <div>
            <div className="flex justify-between text-[11px] font-semibold text-slate-700 mb-1">
              <span>Dry Material Collected & Verified</span>
              <span className="font-mono text-teal-800">{achieved.materialKg} / {target.materialKg} Kg</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
              <div
                className="bg-teal-700 h-2 rounded-full transition-all"
                style={{ width: `${Math.min(kgPercent, 100)}%` }}
              />
            </div>
          </div>

          {/* Metric KPI Grid */}
          <div className="grid grid-cols-4 gap-2 pt-1 border-t border-slate-100 text-center">
            <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
              <span className="text-[9px] font-bold text-slate-500 uppercase block">Schools</span>
              <p className="text-xs font-extrabold text-slate-900 font-mono mt-0.5">
                {achieved.schools}<span className="text-slate-400 text-[10px]">/{target.schools}</span>
              </p>
            </div>
            <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
              <span className="text-[9px] font-bold text-slate-500 uppercase block">Colleges</span>
              <p className="text-xs font-extrabold text-slate-900 font-mono mt-0.5">
                {achieved.colleges}<span className="text-slate-400 text-[10px]">/{target.colleges}</span>
              </p>
            </div>
            <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
              <span className="text-[9px] font-bold text-slate-500 uppercase block">Corporates</span>
              <p className="text-xs font-extrabold text-slate-900 font-mono mt-0.5">
                {achieved.corporates}<span className="text-slate-400 text-[10px]">/{target.corporates}</span>
              </p>
            </div>
            <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
              <span className="text-[9px] font-bold text-slate-500 uppercase block">Students</span>
              <p className="text-xs font-extrabold text-slate-900 font-mono mt-0.5">
                {achieved.students}
              </p>
            </div>
          </div>
        </div>

        {/* 5. Quick Tools Navigation */}
        <div className="grid grid-cols-4 gap-2">
          <button
            onClick={() => navigate('/volunteer/activity-select')}
            className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-2xs hover:border-teal-600 transition-all text-center group"
          >
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 mx-auto flex items-center justify-center mb-1 group-hover:bg-teal-700 group-hover:text-white transition-colors">
              <Package className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold text-slate-800 block">Record Task</span>
          </button>

          <button
            onClick={() => navigate('/volunteer/calendar')}
            className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-2xs hover:border-blue-600 transition-all text-center group"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 mx-auto flex items-center justify-center mb-1 group-hover:bg-blue-700 group-hover:text-white transition-colors">
              <Calendar className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold text-slate-800 block">Calendar</span>
          </button>

          <button
            onClick={() => setShowHolidaysModal(true)}
            className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-2xs hover:border-amber-600 transition-all text-center group"
          >
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 mx-auto flex items-center justify-center mb-1 group-hover:bg-amber-700 group-hover:text-white transition-colors">
              <Calendar className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold text-slate-800 block">Holidays</span>
          </button>

          <button
            onClick={() => setShowDownloadsModal(true)}
            className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-2xs hover:border-purple-600 transition-all text-center group"
          >
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 mx-auto flex items-center justify-center mb-1 group-hover:bg-purple-700 group-hover:text-white transition-colors">
              <FolderDown className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold text-slate-800 block">Downloads</span>
          </button>
        </div>

        {/* 6. Today's Logged Outreach */}
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="text-xs font-bold text-slate-900">Today's Outreach Log</h3>
            <span className="text-[10px] text-slate-500 font-mono">{todayActivities.length} Task(s) Recorded</span>
          </div>

          <div className="space-y-2">
            {todayActivities.map((act) => (
              <div
                key={act.id}
                className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex items-start justify-between gap-2 text-xs"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] font-bold uppercase px-1.5 py-0.2 bg-teal-100 text-teal-800 rounded">
                      {act.taskName || act.typeName || 'Activity'}
                    </span>
                    <span className="text-slate-400 text-[10px] font-mono">{act.time}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 mt-1 truncate">
                    {act.entityName || act.schoolName}
                  </h4>
                  <p className="text-[11px] text-slate-600 mt-0.5 line-clamp-1">
                    {act.remarks}
                  </p>
                  {act.quantityCollected && (
                    <span className="inline-block mt-1 text-[10px] font-mono font-bold text-teal-800 bg-teal-50 px-1.5 py-0.2 rounded border border-teal-200">
                      Collected: {act.quantityCollected} Kg · Verified: {act.verifiedQuantity || act.quantityCollected} Kg
                    </span>
                  )}
                </div>

                <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-200 shrink-0 border border-slate-300">
                  <img src={act.photoUrl} alt="Proof" className="w-full h-full object-cover" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MODAL 1: Pending Activities List (PRD Requirement) */}
      <Modal
        isOpen={showPendingModal}
        onClose={() => setShowPendingModal(false)}
        title="Pending Activity Documentation"
      >
        <div className="space-y-3 text-xs">
          <p className="text-slate-600">
            PRD Specification: Unless the official <strong>Acknowledgement Form</strong> is uploaded, these collection drives remain open as pending activities on the coordinator & manager dashboards.
          </p>

          <div className="space-y-2.5">
            {pendingActivities.map((item) => (
              <div key={item.id} className="p-3 bg-amber-50/80 border border-amber-200 rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-950 text-xs">{item.entityName}</span>
                  <span className="text-[9px] font-bold bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded uppercase">
                    {item.entityType}
                  </span>
                </div>
                <div className="text-[11px] text-slate-700 space-y-0.5">
                  <p>Drive Date: <strong>{item.date}</strong> · Material: <strong>{item.collectedKg} Kg</strong></p>
                  <p>Certified Weighbridge: <strong>{item.verifiedKg} Kg</strong> ({item.franchiseName})</p>
                  <p className="text-rose-700 font-semibold flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Missing: {item.missingItem}</span>
                  </p>
                </div>

                <button
                  type="button"
                  disabled={resolvingId === item.id}
                  onClick={() => handleResolvePending(item.id)}
                  className="w-full py-1.5 px-3 bg-teal-700 hover:bg-teal-800 text-white rounded text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                >
                  {resolvingId === item.id ? (
                    <span>Uploading Form...</span>
                  ) : (
                    <>
                      <UploadCloud className="w-3.5 h-3.5" />
                      <span>Upload Signed Acknowledgement Slip</span>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </Modal>

      {/* MODAL 2: Official Holiday List (PRD Requirement) */}
      <Modal
        isOpen={showHolidaysModal}
        onClose={() => setShowHolidaysModal(false)}
        title="Official State Holiday Calendar 2026"
      >
        <div className="space-y-2.5 text-xs">
          <p className="text-slate-600 text-[11px]">
            Official state holiday schedule synchronized for Telangana and Andhra Pradesh project clusters.
          </p>
          <div className="divide-y divide-slate-100 border border-slate-200 rounded-lg overflow-hidden">
            {holidays.map((h, i) => (
              <div key={i} className="p-2.5 bg-white flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-800">{h.name}</h4>
                  <p className="text-[10px] text-slate-500">{h.dayOfWeek} · {h.type}</p>
                </div>
                <span className="font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                  {h.date}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Modal>

      {/* MODAL 3: Downloads Section (PRD Requirement) */}
      <Modal
        isOpen={showDownloadsModal}
        onClose={() => setShowDownloadsModal(false)}
        title="WOW TeamPulse Downloads & Formats"
      >
        <div className="space-y-2 text-xs">
          <p className="text-slate-600 text-[11px]">
            Standard operating formats, permission templates, and acknowledgement slips to be printed and signed in the field.
          </p>
          <div className="space-y-2">
            {downloads.map((doc) => (
              <div key={doc.id} className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-900 truncate">{doc.title}</h4>
                  <p className="text-[10px] text-slate-500">{doc.category} · {doc.size}</p>
                </div>
                <button
                  type="button"
                  onClick={() => alert(`Simulated download of: ${doc.title}`)}
                  className="p-1.5 bg-teal-700 text-white rounded hover:bg-teal-800 shrink-0"
                  title="Download File"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </MobileLayout>
  );
}
