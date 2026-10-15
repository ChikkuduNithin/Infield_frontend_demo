import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDemo } from '../../context/DemoContext';
import MobileLayout from '../../layouts/MobileLayout';
import Modal from '../../components/common/Modal';
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
  Calendar,
  AlertTriangle,
  ShieldCheck,
  FileCheck,
  Download,
  Target
} from 'lucide-react';

export default function ManagerDashboard() {
  const navigate = useNavigate();
  const {
    currentManager,
    managerPunchState,
    pendingActivities,
    correctionRequests,
    approveCorrectionRequest,
    holidays
  } = useDemo();

  const metrics = TEAM_PERFORMANCE_METRICS;
  const [showPendingModal, setShowPendingModal] = useState(false);
  const [showCorrectionModal, setShowCorrectionModal] = useState(false);
  const [showComplianceModal, setShowComplianceModal] = useState(false);
  const [showSetTargetModal, setShowSetTargetModal] = useState(false);

  // Target input state
  const [targetSchools, setTargetSchools] = useState(25);
  const [targetColleges, setTargetColleges] = useState(6);
  const [targetMaterialKg, setTargetMaterialKg] = useState(3600);

  return (
    <MobileLayout title="Manager Console" role="manager">
      <div className="space-y-3 pb-4">
        {/* Profile & Greeting Header */}
        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img
              src={currentManager.avatar}
              alt={currentManager.name}
              className="w-10 h-10 rounded-lg object-cover border border-slate-300"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-900 text-xs">{currentManager.name}</span>
                <span className="text-[10px] bg-blue-50 text-blue-800 font-mono font-semibold px-1.5 py-0.2 rounded border border-blue-200">
                  {currentManager.empId}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                {currentManager.designation} · {currentManager.district}
              </p>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800 uppercase">
            Supervisor
          </span>
        </div>

        {/* Manager Attendance & Cluster Status */}
        <div className="bg-slate-900 text-white p-3.5 rounded-xl border border-slate-800 shadow-2xs">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold text-teal-400 uppercase tracking-wider">
              Supervisor Active Duty
            </span>
            <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-300 font-mono">
              15-OCT-2026
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-white">Bhadrachalam Zonal Command Center</p>
              <p className="text-[11px] text-slate-400 mt-0.5 font-mono">
                Punched In: {managerPunchState.punchInTime} · GPS Locked
              </p>
            </div>
            <button
              onClick={() => navigate('/manager/punch-in')}
              className="px-2.5 py-1 bg-blue-700 hover:bg-blue-600 text-white rounded text-[11px] font-bold transition-all shadow-xs"
            >
              Verify Checkpoint
            </button>
          </div>
        </div>

        {/* Pending Activities & Corrections Notification Row (PRD Requirement) */}
        <div className="grid grid-cols-2 gap-2">
          {/* Pending Activities Button */}
          <button
            type="button"
            onClick={() => setShowPendingModal(true)}
            className="p-2.5 bg-amber-50 rounded-xl border border-amber-300 text-left hover:bg-amber-100/60 transition-colors"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[9px] font-bold text-amber-900 uppercase">Pending Activities</span>
              <span className="w-5 h-5 rounded-full bg-amber-600 text-white text-[10px] font-bold flex items-center justify-center">
                {pendingActivities.length}
              </span>
            </div>
            <p className="text-[11px] font-bold text-amber-950">Missing Ack Forms</p>
            <span className="text-[10px] text-amber-800 mt-0.5 block">Click to inspect list →</span>
          </button>

          {/* Pending Corrections Button */}
          <button
            type="button"
            onClick={() => setShowCorrectionModal(true)}
            className="p-2.5 bg-purple-50 rounded-xl border border-purple-300 text-left hover:bg-purple-100/60 transition-colors"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[9px] font-bold text-purple-900 uppercase">Attendance Approvals</span>
              <span className="w-5 h-5 rounded-full bg-purple-700 text-white text-[10px] font-bold flex items-center justify-center">
                {correctionRequests.filter(r => r.status.includes('Pending')).length}
              </span>
            </div>
            <p className="text-[11px] font-bold text-purple-950">Correction Requests</p>
            <span className="text-[10px] text-purple-800 mt-0.5 block">Review approvals →</span>
          </button>
        </div>

        {/* Team Attendance Snapshot Cards (Present, Absent, Leave) */}
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900">
              Team Roll Call Today (18 Coordinators)
            </span>
            <span className="text-[10px] text-teal-800 font-bold bg-teal-50 px-1.5 py-0.5 rounded border border-teal-200">
              83.3% On Duty
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="bg-teal-50/60 p-2 rounded-lg border border-teal-200">
              <span className="text-[10px] font-bold text-teal-800 uppercase block">Present</span>
              <span className="text-base font-extrabold text-teal-900 font-mono">
                {metrics.presentToday}
              </span>
            </div>

            <div className="bg-rose-50/60 p-2 rounded-lg border border-rose-200">
              <span className="text-[10px] font-bold text-rose-800 uppercase block">Absent</span>
              <span className="text-base font-extrabold text-rose-700 font-mono">
                {metrics.absentToday}
              </span>
            </div>

            <div className="bg-amber-50/60 p-2 rounded-lg border border-amber-200">
              <span className="text-[10px] font-bold text-amber-800 uppercase block">On Leave</span>
              <span className="text-base font-extrabold text-amber-700 font-mono">
                {metrics.onLeaveToday}
              </span>
            </div>
          </div>
        </div>

        {/* Team Target & Overall Progress */}
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Zonal Team Progress
              </span>
              <h3 className="text-xs font-bold text-slate-900">October Total Waste Recovery</h3>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-teal-800 font-mono bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                {metrics.teamCompletionRate}%
              </span>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[11px] font-semibold text-slate-700 mb-1">
              <span>Total Material Collected (Team)</span>
              <span className="font-mono text-teal-800">
                {metrics.teamAchievedMaterialKg.toLocaleString()} / {metrics.teamTargetMaterialKg.toLocaleString()} Kg
              </span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
              <div
                className="bg-teal-700 h-2 rounded-full transition-all"
                style={{ width: `${metrics.teamCompletionRate}%` }}
              />
            </div>
          </div>
        </div>

        {/* Quick Management Tools Grid */}
        <div className="grid grid-cols-4 gap-2">
          <button
            onClick={() => setShowSetTargetModal(true)}
            className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-2xs hover:border-teal-700 transition-all text-center group"
          >
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-800 mx-auto flex items-center justify-center mb-1 group-hover:bg-teal-700 group-hover:text-white transition-colors">
              <Target className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold text-slate-800 block">Set Targets</span>
          </button>

          <button
            onClick={() => navigate('/manager/volunteers')}
            className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-2xs hover:border-blue-700 transition-all text-center group"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-800 mx-auto flex items-center justify-center mb-1 group-hover:bg-blue-700 group-hover:text-white transition-colors">
              <Users className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold text-slate-800 block">Team Roster</span>
          </button>

          <button
            onClick={() => navigate('/manager/route-history')}
            className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-2xs hover:border-indigo-700 transition-all text-center group"
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-800 mx-auto flex items-center justify-center mb-1 group-hover:bg-indigo-700 group-hover:text-white transition-colors">
              <MapPin className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold text-slate-800 block">Route Maps</span>
          </button>

          <button
            onClick={() => setShowComplianceModal(true)}
            className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-2xs hover:border-emerald-700 transition-all text-center group"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 mx-auto flex items-center justify-center mb-1 group-hover:bg-emerald-700 group-hover:text-white transition-colors">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold text-slate-800 block">Compliance</span>
          </button>
        </div>

        {/* Navigation to Reports */}
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center justify-between">
          <div>
            <h4 className="text-xs font-bold text-slate-900">Reports & Excel Exports</h4>
            <p className="text-[10px] text-slate-500">Day summary and monthly district consolidation.</p>
          </div>
          <button
            onClick={() => navigate('/manager/monthly-report')}
            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-bold"
          >
            Open Reports →
          </button>
        </div>
      </div>

      {/* MODAL 1: Pending Activities Inspection (PRD Requirement) */}
      <Modal
        isOpen={showPendingModal}
        onClose={() => setShowPendingModal(false)}
        title="Coordinator Pending Activities Oversight"
      >
        <div className="space-y-3 text-xs">
          <p className="text-slate-600">
            PRD Specification: Coordinators have executed collection drives, but verified acknowledgement slips or weighbridge receipts are pending upload.
          </p>

          <div className="space-y-2">
            {pendingActivities.map((item) => (
              <div key={item.id} className="p-2.5 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-950">{item.coordinatorName}</span>
                  <span className="text-[10px] bg-amber-200 text-amber-900 px-1.5 py-0.2 rounded font-mono">
                    {item.date}
                  </span>
                </div>
                <p className="text-[11px] text-slate-800 mt-0.5">
                  Institution: <strong>{item.entityName}</strong> ({item.entityType})
                </p>
                <div className="flex justify-between text-[10px] text-slate-600 mt-1">
                  <span>Collected: {item.collectedKg} Kg · Verified: {item.verifiedKg} Kg</span>
                  <span className="text-rose-700 font-bold">{item.missingItem}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal>

      {/* MODAL 2: Approve Correction Requests (PRD Requirement) */}
      <Modal
        isOpen={showCorrectionModal}
        onClose={() => setShowCorrectionModal(false)}
        title="Coordinator Attendance Corrections"
      >
        <div className="space-y-2.5 text-xs">
          <p className="text-slate-600 text-[11px]">
            PRD Specification: Manager approves missed punch-ins/outs or converts unexcused Absents to sanctioned Leave after verifying attached leave approval documents.
          </p>

          <div className="space-y-2">
            {correctionRequests.map((req) => (
              <div key={req.id} className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg space-y-1.5">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-bold text-slate-900">{req.coordinatorName}</h5>
                    <span className="text-[10px] text-slate-500 font-mono">Date: {req.date} · {req.category}</span>
                  </div>
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${
                    req.status === 'Approved' ? 'bg-teal-100 text-teal-800' : 'bg-purple-100 text-purple-800'
                  }`}>
                    {req.status}
                  </span>
                </div>

                <p className="text-[11px] text-slate-700 italic bg-white p-1.5 rounded border border-slate-100">
                  "{req.reason}"
                </p>

                {req.category === 'Changing Absent to Leave' && (
                  <div className="flex items-center gap-1.5 text-[10px] text-purple-900 font-medium">
                    <FileCheck className="w-3.5 h-3.5 text-purple-700" />
                    <span>Leave Approval Letter Verified by Supervisor</span>
                  </div>
                )}

                {req.status.includes('Pending') && (
                  <button
                    type="button"
                    onClick={() => {
                      approveCorrectionRequest(req.id, currentManager.name);
                      alert(`Correction request approved for ${req.coordinatorName}`);
                    }}
                    className="w-full py-1 bg-teal-700 hover:bg-teal-800 text-white rounded text-xs font-bold"
                  >
                    Approve Attendance Correction
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </Modal>

      {/* MODAL 3: NGO Compliance Tracker (PRD Requirement) */}
      <Modal
        isOpen={showComplianceModal}
        onClose={() => setShowComplianceModal(false)}
        title="NGO Compliance & Regulatory Tracker"
      >
        <div className="space-y-2.5 text-xs">
          <p className="text-slate-600 text-[11px]">
            PRD Specification: Track regulatory compliance related to partner NGOs (Renewal of certificates, 12A/80G, FCRA, labor safety, and MRF weighbridge licenses).
          </p>

          <div className="space-y-2">
            <div className="p-2.5 bg-white border border-slate-200 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">MARI - Modern Architect Rural India</span>
                <span className="text-[10px] bg-teal-100 text-teal-800 font-bold px-1.5 py-0.5 rounded">Compliant</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">80G & 12A Renewal Valid until Dec 2028 · MRF Weighbridge Calibration Certified</p>
            </div>

            <div className="p-2.5 bg-white border border-amber-200 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">Bhadrachalam Tribal Welfare Society</span>
                <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded">Renewal Due</span>
              </div>
              <p className="text-[11px] text-amber-900 mt-0.5">Annual Audit Submission Due by 31-Oct-2026</p>
            </div>
          </div>
        </div>
      </Modal>

      {/* MODAL 4: Set Monthly Targets (PRD Requirement) */}
      <Modal
        isOpen={showSetTargetModal}
        onClose={() => setShowSetTargetModal(false)}
        title="Set Monthly Cluster Targets"
      >
        <form onSubmit={(e) => { e.preventDefault(); setShowSetTargetModal(false); alert('Monthly Targets Updated for all 18 Coordinators!'); }} className="space-y-3 text-xs">
          <p className="text-slate-600 text-[11px]">
            PRD Specification: Managers configure monthly operational targets per coordinator across Schools, Colleges, and Dry Waste Collection (Kg).
          </p>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Target Schools per Coordinator *</label>
            <input
              type="number"
              value={targetSchools}
              onChange={(e) => setTargetSchools(e.target.value)}
              className="w-full py-1.5 px-2 bg-slate-50 border border-slate-300 rounded font-mono font-bold"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Target Colleges per Coordinator *</label>
            <input
              type="number"
              value={targetColleges}
              onChange={(e) => setTargetColleges(e.target.value)}
              className="w-full py-1.5 px-2 bg-slate-50 border border-slate-300 rounded font-mono font-bold"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Target Dry Material Recovery (Kg) *</label>
            <input
              type="number"
              value={targetMaterialKg}
              onChange={(e) => setTargetMaterialKg(e.target.value)}
              className="w-full py-1.5 px-2 bg-slate-50 border border-slate-300 rounded font-mono font-bold text-teal-800"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-teal-700 hover:bg-teal-800 text-white rounded text-xs font-bold"
          >
            Save & Publish Targets to Coordinators
          </button>
        </form>
      </Modal>
    </MobileLayout>
  );
}
