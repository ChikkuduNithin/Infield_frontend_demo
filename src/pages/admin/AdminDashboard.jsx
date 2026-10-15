import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../layouts/AdminLayout';
import { useDemo } from '../../context/DemoContext';
import {
  Users,
  School,
  Building2,
  CalendarCheck,
  TrendingUp,
  FileSpreadsheet,
  PlusCircle,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Truck,
  GraduationCap,
  Building,
  Scale,
  Calendar,
  Clock,
  FileText,
  X,
  Edit3,
  UserCheck,
  AlertCircle,
  ExternalLink,
  Check,
  ShieldAlert
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const {
    users,
    schools,
    ngos,
    franchises,
    activeRole,
    managerAttendance,
    managerLeaveRequests,
    approveManagerLeave,
    correctManagerAttendance
  } = useDemo();

  const isWowAdmin = activeRole === 'wow_admin';
  const isNgoAdmin = activeRole === 'ngo_admin';

  // Leave & Attendance Governance Modals State
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [showCorrectionModal, setShowCorrectionModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [actionNotice, setActionNotice] = useState('');

  // Attendance Direct Correction Form State
  const [correctDate, setCorrectDate] = useState('2026-10-09');
  const [correctStatus, setCorrectStatus] = useState('full_day');
  const [correctPunchIn, setCorrectPunchIn] = useState('08:45 AM');
  const [correctPunchOut, setCorrectPunchOut] = useState('06:00 PM');
  const [correctReason, setCorrectReason] = useState('');

  const pendingLeaves = managerLeaveRequests.filter(r => r.status === 'Pending Review');

  const recoveryTrends = [
    { week: "Wk 38", dryWasteKg: 6400, schoolsCovered: 42, institutions: 58 },
    { week: "Wk 39", dryWasteKg: 7100, schoolsCovered: 48, institutions: 64 },
    { week: "Wk 40", dryWasteKg: 7850, schoolsCovered: 52, institutions: 70 },
    { week: "Wk 41", dryWasteKg: 8400, schoolsCovered: 56, institutions: 76 },
    { week: "Wk 42 (Current)", dryWasteKg: 9250, schoolsCovered: 62, institutions: 84 },
  ];

  const districtCoverage = [
    { district: "Bhadradri Kothagudem", schools: 184, visited: 148, recoveryKg: 12400, pct: 80.4 },
    { district: "Khammam", schools: 142, visited: 118, recoveryKg: 9800, pct: 83.1 },
    { district: "Mahabubabad", schools: 88, visited: 66, recoveryKg: 5200, pct: 75.0 },
  ];

  const handleApprove = (requestId, decision) => {
    approveManagerLeave(requestId, decision, adminNotes);
    setActionNotice(`Manager leave request ${decision === 'Approved' ? 'APPROVED' : 'REJECTED'} successfully.`);
    setAdminNotes('');
    setShowLeaveModal(false);
    setSelectedRequest(null);
    setTimeout(() => setActionNotice(''), 4000);
  };

  const handleSaveCorrection = (e) => {
    e.preventDefault();
    if (!correctReason.trim()) {
      alert('PRD Governance: Justification is required for direct manager attendance corrections.');
      return;
    }

    correctManagerAttendance(
      correctDate,
      correctStatus,
      correctReason,
      correctPunchIn,
      correctPunchOut
    );

    setActionNotice(`Manager attendance record for ${correctDate} updated to ${correctStatus.toUpperCase()}.`);
    setShowCorrectionModal(false);
    setCorrectReason('');
    setTimeout(() => setActionNotice(''), 4000);
  };

  const openCorrectionForDate = (dayRecord) => {
    setCorrectDate(dayRecord.date);
    setCorrectStatus(dayRecord.status === 'sunday' ? 'full_day' : dayRecord.status);
    setCorrectPunchIn(dayRecord.punchIn !== '-' ? dayRecord.punchIn : '08:45 AM');
    setCorrectPunchOut(dayRecord.punchOut !== '-' ? dayRecord.punchOut : '06:00 PM');
    setCorrectReason(dayRecord.note ? `Revision of: ${dayRecord.note}` : 'Supervisory regularization per NGO Admin audit.');
    setShowCorrectionModal(true);
  };

  return (
    <AdminLayout
      title={isWowAdmin ? "ITC WoW National Administration Console" : "NGO Administrative Overview"}
      subtitle={isWowAdmin ? "Cross-NGO Governance & Dry Waste Circular Economy Hub" : "MARI Implementing Agency Operations & Franchise Control"}
    >
      <div className="space-y-6">
        {/* Action Notice Alert */}
        {actionNotice && (
          <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-900 text-xs font-semibold flex items-center justify-between shadow-2xs animate-in fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>{actionNotice}</span>
            </div>
            <button onClick={() => setActionNotice('')} className="text-emerald-700 hover:text-emerald-900">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Top 6 KPI Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500">Field Personnel</span>
              <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-extrabold text-slate-900 font-mono">110</div>
            <span className="text-[11px] text-teal-700 font-semibold flex items-center gap-1 mt-1">
              96 Coordinators · 14 Supervisors
            </span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500">Dry Waste Recovered</span>
              <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-800 flex items-center justify-center border border-teal-200">
                <Scale className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-extrabold text-teal-900 font-mono">38.9 MT</div>
            <span className="text-[11px] text-slate-500 mt-1 block">October Month to Date</span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500">Schools ISRS/ISRC</span>
              <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
                <School className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-extrabold text-slate-900 font-mono">380</div>
            <span className="text-[11px] text-emerald-700 font-semibold mt-1 block">332 Permissions Verified</span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500">Colleges & Corporates</span>
              <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
                <Building className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-extrabold text-slate-900 font-mono">148</div>
            <span className="text-[11px] text-slate-500 mt-1 block">Higher Ed & Workplaces</span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500">Franchise Network</span>
              <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
                <Truck className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-extrabold text-slate-900 font-mono">{franchises.length}</div>
            <span className="text-[11px] text-emerald-700 font-semibold mt-1 block">100% Calibrated</span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500">Compliance Health</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center border border-emerald-200">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-extrabold text-emerald-800 font-mono">100%</div>
            <span className="text-[11px] text-slate-500 mt-1 block">MoA, PF/ESI, Weighbridge</span>
          </div>
        </div>

        {/* ============================================================ */}
        {/* NGO ADMIN GOVERNANCE: MANAGER ATTENDANCE & LEAVES MODULE     */}
        {/* Requirement: NGO Admin can approve or correct manager        */}
        {/* attendance and leaves                                        */}
        {/* ============================================================ */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-teal-800 text-white flex items-center justify-center font-bold">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Manager Attendance & Leaves Governance
                  </h3>
                  <p className="text-xs text-slate-500">
                    Implementing Agency Executive Review: Audit attendance, approve leaves & correct logs for Zonal Field Leads
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedRequest(pendingLeaves[0] || managerLeaveRequests[0]);
                  setShowLeaveModal(true);
                }}
                className="px-3 py-1.5 bg-teal-800 hover:bg-teal-900 text-white rounded-lg text-xs font-semibold shadow-2xs flex items-center gap-1.5 transition-all"
              >
                <CalendarCheck className="w-3.5 h-3.5" />
                <span>Review Leaves ({pendingLeaves.length} Pending)</span>
              </button>

              <button
                type="button"
                onClick={() => setShowCorrectionModal(true)}
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold shadow-2xs flex items-center gap-1.5 transition-all"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Correct Attendance</span>
              </button>
            </div>
          </div>

          {/* Manager Identity & Status Banner */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm shrink-0">
                VR
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-slate-900">Vikramaditya Rao</h4>
                  <span className="font-mono text-[11px] text-slate-500">WOW-MGR-02</span>
                  <span className="bg-teal-50 text-teal-800 border border-teal-200 px-2 py-0.2 rounded font-semibold text-[10px]">
                    Zonal Field Lead · Bhadradri Kothagudem
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Supervising 18 Coordinators · Reporting directly to MARI Executive Director
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-right">
              <div>
                <span className="text-[10px] text-slate-500 block">October Days Logged</span>
                <span className="text-xs font-mono font-bold text-slate-900">
                  {managerAttendance.filter(m => m.status === 'full_day' || m.status === 'corrected').length} Present · {managerAttendance.filter(m => m.status === 'leave').length} Leave
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block">Pending Applications</span>
                <span className="text-xs font-mono font-bold text-amber-700">
                  {pendingLeaves.length} Awaiting Approval
                </span>
              </div>
            </div>
          </div>

          {/* Pending Leave Requests Quick Review Cards */}
          {pendingLeaves.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  Pending Manager Leave & Regularization Applications
                </span>
                <span className="text-[10px] text-slate-500 font-mono">Requires NGO Admin Signoff</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {pendingLeaves.map(req => (
                  <div
                    key={req.id}
                    className="p-3 bg-amber-50/60 rounded-xl border border-amber-200 text-xs space-y-2 flex flex-col justify-between"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-start justify-between">
                        <span className="font-bold text-amber-950 block">{req.type}</span>
                        <span className="text-[10px] font-mono font-bold bg-amber-100 text-amber-900 px-1.5 py-0.2 rounded border border-amber-300">
                          {req.date}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-700 leading-snug">{req.reason}</p>
                      {req.leaveSlipUrl && (
                        <div className="text-[10px] text-teal-800 font-mono flex items-center gap-1 bg-white p-1 rounded border border-amber-200 truncate">
                          <FileText className="w-3 h-3 text-teal-700 shrink-0" />
                          <span className="truncate">{req.leaveSlipUrl}</span>
                        </div>
                      )}
                    </div>

                    <div className="pt-2 border-t border-amber-200/80 flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedRequest(req);
                          setShowLeaveModal(true);
                        }}
                        className="flex-1 py-1.5 bg-teal-800 hover:bg-teal-900 text-white rounded text-[11px] font-semibold text-center"
                      >
                        Review & Approve
                      </button>
                      <button
                        type="button"
                        onClick={() => handleApprove(req.id, 'Rejected')}
                        className="px-2 py-1.5 bg-slate-200 hover:bg-rose-100 text-slate-700 hover:text-rose-800 rounded text-[11px] font-semibold"
                        title="Quick Reject"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Manager Monthly Attendance Logs Grid (October 2026) */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-700" />
                Manager Daily Attendance Sheet — October 2026 (Live Audit)
              </span>
              <span className="text-[10px] text-slate-500">
                Click "Correct" to adjust punch times, convert absences, or regularize leaves
              </span>
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 border-b border-slate-200 text-[11px]">
                    <th className="py-2 px-3 font-bold">Date & Day</th>
                    <th className="py-2 px-3 font-bold">Attendance Status</th>
                    <th className="py-2 px-3 font-bold">Punch In</th>
                    <th className="py-2 px-3 font-bold">Punch Out</th>
                    <th className="py-2 px-3 font-bold">Location & Inspection Notes</th>
                    <th className="py-2 px-3 font-bold text-right">Audit Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                  {managerAttendance.slice(0, 15).map((log) => {
                    let badgeClass = "bg-emerald-50 text-emerald-800 border-emerald-200";
                    let label = "Present";

                    if (log.isSunday) {
                      badgeClass = "bg-blue-50 text-blue-700 border-blue-200 border-b-2 border-b-blue-600";
                      label = "Sunday Rest Day";
                    } else if (log.status === 'holiday') {
                      badgeClass = "bg-slate-100 text-slate-700 border-slate-200";
                      label = "Public Holiday";
                    } else if (log.status === 'leave' || log.isLeave) {
                      badgeClass = "bg-amber-50 text-amber-800 border-amber-300 font-bold";
                      label = "Approved Leave";
                    } else if (log.status === 'corrected' || log.isCorrected) {
                      badgeClass = "bg-purple-50 text-purple-800 border-purple-300 font-bold";
                      label = "Regularized (Admin)";
                    } else if (log.status === 'od') {
                      badgeClass = "bg-indigo-50 text-indigo-800 border-indigo-200 font-bold";
                      label = "Official Duty (OD)";
                    } else if (log.status === 'absent' || log.isAbsent) {
                      badgeClass = "bg-rose-50 text-rose-800 border-rose-300 font-bold";
                      label = "Absent";
                    } else if (log.isToday) {
                      badgeClass = "bg-teal-700 text-white border-teal-800 font-bold";
                      label = "Today Active";
                    }

                    return (
                      <tr key={log.day} className="hover:bg-slate-50 transition-colors">
                        <td className="py-2 px-3 font-bold text-slate-900">
                          {log.date} ({log.dayOfWeek})
                        </td>
                        <td className="py-2 px-3">
                          <span className={`px-2 py-0.5 rounded border text-[10px] inline-block ${badgeClass}`}>
                            {label}
                          </span>
                        </td>
                        <td className="py-2 px-3 text-slate-700">{log.punchIn || '-'}</td>
                        <td className="py-2 px-3 text-slate-700">{log.punchOut || '-'}</td>
                        <td className="py-2 px-3 text-slate-600 truncate max-w-xs font-sans">
                          {log.note || log.location || 'ITC WoW Zonal Operations Hub, Bhadrachalam Road'}
                        </td>
                        <td className="py-2 px-3 text-right">
                          <button
                            type="button"
                            onClick={() => openCorrectionForDate(log)}
                            className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 rounded font-semibold text-[10px] shadow-2xs hover:border-slate-400 transition-all font-sans"
                          >
                            Correct
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Area Chart: Dry Waste Recovery Trend */}
          <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Dry Waste Collection Velocity (Kg per Week)</h3>
                <p className="text-xs text-slate-500">Aggregated dry waste collected across school ISRC, college drives, and corporate collections</p>
              </div>
              <span className="text-xs font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200">
                Quarterly Target: 92% Achieved
              </span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={recoveryTrends} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorWaste" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0f766e" stopOpacity={0.25}/>
                      <stop offset="95%" stopColor="#0f766e" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', border: 'none', color: '#fff', fontSize: '11px' }}
                  />
                  <Area type="monotone" dataKey="dryWasteKg" stroke="#0f766e" strokeWidth={2} fillOpacity={1} fill="url(#colorWaste)" name="Dry Waste (Kg)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-600">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-teal-700"></span>
                  <span>Dry Recyclables Collected (Kg)</span>
                </div>
              </div>
              <button
                onClick={() => navigate('/admin/reports')}
                className="text-slate-800 font-semibold hover:underline flex items-center gap-1"
              >
                View Detailed Reports & Slips →
              </button>
            </div>
          </div>

          {/* District Coverage Bars */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">District Coverage Matrix</h3>
              <p className="text-xs text-slate-500">School visits vs total registered in cluster</p>
            </div>

            <div className="space-y-3.5">
              {districtCoverage.map((d) => (
                <div key={d.district} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-800">{d.district}</span>
                    <span className="font-mono font-bold text-slate-900">{d.pct}% ({d.visited}/{d.schools})</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-2 rounded-full bg-slate-800"
                      style={{ width: `${d.pct}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>Recovery:</span>
                    <span className="font-semibold text-teal-800">{d.recoveryKg.toLocaleString()} kg</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs text-slate-600">
              <span className="font-bold text-slate-900 block mb-0.5">Zonal Milestone</span>
              Bhadradri Kothagudem and Khammam have surpassed 80% coverage in ISRS permissions for Phase 1.
            </div>
          </div>
        </div>

        {/* Quick Management Navigation Cards */}
        <div>
          <h3 className="text-sm font-bold text-slate-900 mb-3">Governance Modules</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={() => navigate('/admin/users')}
              className="p-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-left shadow-xs transition-all flex items-start gap-3.5 group"
            >
              <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center shrink-0">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Employee Database</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Manage coordinators, supervisors & active credentials</p>
              </div>
            </button>

            <button
              onClick={() => navigate('/admin/schools')}
              className="p-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-left shadow-xs transition-all flex items-start gap-3.5 group"
            >
              <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center shrink-0">
                <School className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">State Database</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Directory of Schools, Colleges, and Corporates</p>
              </div>
            </button>

            <button
              onClick={() => navigate('/admin/managers-orgs')}
              className="p-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-left shadow-xs transition-all flex items-start gap-3.5 group"
            >
              <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center shrink-0">
                <Truck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">
                  {isWowAdmin ? "NGOs & State Allocation" : "Franchise Registry"}
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {isWowAdmin ? "Assign state mandates to NGOs" : "Manage material collection franchises"}
                </p>
              </div>
            </button>

            <button
              onClick={() => navigate('/admin/master-data')}
              className="p-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-left shadow-xs transition-all flex items-start gap-3.5 group"
            >
              <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center shrink-0">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Holiday & Master Data</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Manage official 2026 holiday calendar & task categories</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* MODAL 1: REVIEW & APPROVE MANAGER LEAVE APPLICATIONS         */}
      {/* ============================================================ */}
      {showLeaveModal && selectedRequest && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl space-y-4 p-5">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold text-teal-800 uppercase tracking-wider block">
                  NGO Admin Executive Review
                </span>
                <h3 className="text-sm font-bold text-slate-900">
                  Manager Leave & Regularization Application
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowLeaveModal(false);
                  setSelectedRequest(null);
                }}
                className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Application Overview Details */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Applicant:</span>
                <span className="font-bold text-slate-900">{selectedRequest.managerName} ({selectedRequest.empId})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Application Category:</span>
                <span className="font-bold text-teal-800">{selectedRequest.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Target Date:</span>
                <span className="font-mono font-bold text-slate-900">{selectedRequest.date}</span>
              </div>
              {selectedRequest.requestedPunchIn && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Requested Shift Hours:</span>
                  <span className="font-mono text-slate-800">
                    {selectedRequest.requestedPunchIn} to {selectedRequest.requestedPunchOut}
                  </span>
                </div>
              )}
            </div>

            {/* Justification Provided */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 block">
                Manager's Stated Justification & Circumstances:
              </label>
              <div className="p-3 bg-white rounded-lg border border-slate-300 text-xs text-slate-800 leading-relaxed font-sans">
                {selectedRequest.reason}
              </div>
            </div>

            {/* Attached Document Slip */}
            {selectedRequest.leaveSlipUrl && (
              <div className="p-2.5 bg-teal-50/70 rounded-lg border border-teal-200 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 truncate">
                  <FileText className="w-4 h-4 text-teal-700 shrink-0" />
                  <div className="truncate">
                    <span className="font-mono font-bold text-slate-900 block truncate">
                      {selectedRequest.leaveSlipUrl}
                    </span>
                    <span className="text-[10px] text-teal-800 font-sans">
                      Verified Document Attached by Manager
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-800 bg-white px-2 py-0.5 rounded border border-teal-300">
                  Ready for Inspection
                </span>
              </div>
            )}

            {/* NGO Admin Notes Input */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 block">
                NGO Executive Director Review Notes / Conditions:
              </label>
              <textarea
                rows={2}
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder="e.g. Regularized basis MRF inspection audit. Approved as Casual Leave with full pay."
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs outline-none focus:border-teal-700 resize-none font-sans"
              />
            </div>

            {/* Action Buttons */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => handleApprove(selectedRequest.id, 'Rejected')}
                className="px-4 py-2 bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-700 rounded-lg text-xs font-semibold transition-all"
              >
                Reject Application
              </button>
              <button
                type="button"
                onClick={() => handleApprove(selectedRequest.id, 'Approved')}
                className="px-4 py-2 bg-teal-800 hover:bg-teal-900 text-white rounded-lg text-xs font-semibold shadow-2xs flex items-center gap-1.5 transition-all"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Approve & Regularize</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL 2: DIRECT MANAGER ATTENDANCE CORRECTION                */}
      {/* ============================================================ */}
      {showCorrectionModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <form
            onSubmit={handleSaveCorrection}
            className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl space-y-4 p-5"
          >
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold text-teal-800 uppercase tracking-wider block">
                  Attendance Correction Console
                </span>
                <h3 className="text-sm font-bold text-slate-900">
                  Override Manager Attendance Record
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowCorrectionModal(false)}
                className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Select Working Date *</label>
                <input
                  type="date"
                  required
                  value={correctDate}
                  onChange={(e) => setCorrectDate(e.target.value)}
                  className="w-full py-1.5 px-3 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono font-bold text-slate-900 outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">New Attendance Classification *</label>
                <select
                  value={correctStatus}
                  onChange={(e) => setCorrectStatus(e.target.value)}
                  className="w-full py-2 px-3 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-900 outline-none focus:border-teal-700 shadow-2xs"
                >
                  <option value="full_day">Present (Full Day Work)</option>
                  <option value="leave">Approved Leave (Authorized Absence)</option>
                  <option value="od">Official Duty (OD - Head Office / Stakeholder Meeting)</option>
                  <option value="corrected">Regularized (Missed Punch Correction)</option>
                  <option value="absent">Mark as Absent (Unauthorized)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Punch In Timestamp</label>
                  <input
                    type="text"
                    value={correctPunchIn}
                    onChange={(e) => setCorrectPunchIn(e.target.value)}
                    placeholder="08:45 AM"
                    className="w-full py-1.5 px-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono font-semibold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Punch Out Timestamp</label>
                  <input
                    type="text"
                    value={correctPunchOut}
                    onChange={(e) => setCorrectPunchOut(e.target.value)}
                    placeholder="06:00 PM"
                    className="w-full py-1.5 px-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Mandatory Audit Justification / Remarks *
                </label>
                <textarea
                  rows={3}
                  required
                  value={correctReason}
                  onChange={(e) => setCorrectReason(e.target.value)}
                  placeholder="State the official rationale basis supporting communication, field schedule, or board resolution..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs outline-none focus:border-teal-700 resize-none font-sans"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowCorrectionModal(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold shadow-2xs flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Save Attendance Correction</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </AdminLayout>
  );
}
