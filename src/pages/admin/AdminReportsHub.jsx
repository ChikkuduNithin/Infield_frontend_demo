import React, { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import ExportCsvButton from '../../components/common/ExportCsvButton';
import LeafletRouteMap from '../../components/common/LeafletRouteMap';
import { SAMPLE_ROUTE_HISTORY, TEAM_PERFORMANCE_METRICS, DOWNLOAD_DOCUMENTS } from '../../data/mockData';
import { useDemo } from '../../context/DemoContext';
import {
  FileSpreadsheet,
  Calendar,
  BarChart3,
  MapPin,
  Users,
  Search,
  Filter,
  Download,
  School,
  CheckCircle2,
  Clock,
  Award,
  FileText,
  AlertCircle
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export default function AdminReportsHub() {
  const { users, pendingActivities } = useDemo();
  const [activeTab, setActiveTab] = useState('monthly'); // 'monthly' | 'daily' | 'team' | 'route' | 'downloads'

  // Monthly report mock data
  const monthlyData = [
    { id: 1, empId: "WOW-CRD-101", name: "Rajesh Kumar", district: "Bhadradri Kothagudem", plannedKg: 4500, achievedKg: 4120, schoolsISRC: 14, colleges: 4, attendance: "94%", completion: "91.5%", pendingDocs: 1 },
    { id: 2, empId: "WOW-CRD-102", name: "Priya Sharma", district: "Khammam", plannedKg: 4000, achievedKg: 3450, schoolsISRC: 12, colleges: 3, attendance: "91%", completion: "86.2%", pendingDocs: 0 },
    { id: 3, empId: "WOW-CRD-103", name: "Suresh Babu", district: "Bhadradri Kothagudem", plannedKg: 5000, achievedKg: 4400, schoolsISRC: 16, colleges: 5, attendance: "96%", completion: "88.0%", pendingDocs: 1 },
    { id: 4, empId: "WOW-CRD-104", name: "K. Venkatesh", district: "Mahabubabad", plannedKg: 3800, achievedKg: 3050, schoolsISRC: 10, colleges: 2, attendance: "88%", completion: "80.3%", pendingDocs: 0 },
    { id: 5, empId: "WOW-CRD-105", name: "Sandhya Rani", district: "Khammam", plannedKg: 4200, achievedKg: 3100, schoolsISRC: 9, colleges: 3, attendance: "82%", completion: "73.8%", pendingDocs: 0 },
    { id: 6, empId: "WOW-CRD-106", name: "M. Ashok Kumar", district: "Bhadradri Kothagudem", plannedKg: 4500, achievedKg: 2850, schoolsISRC: 8, colleges: 2, attendance: "76%", completion: "63.3%", pendingDocs: 0 },
  ];

  // Daily Summary data
  const dailyData = [
    { empId: "WOW-CRD-101", name: "Rajesh Kumar", status: "Present", punchIn: "09:08 AM", punchOut: "05:40 PM", schools: 2, dryWasteKg: 340, location: "Sarapaka", pendingSlip: "Yes" },
    { empId: "WOW-CRD-102", name: "Priya Sharma", status: "Present", punchIn: "09:15 AM", punchOut: "05:30 PM", schools: 1, dryWasteKg: 180, location: "Nelakondapalli", pendingSlip: "No" },
    { empId: "WOW-CRD-103", name: "Suresh Babu", status: "Present", punchIn: "08:55 AM", punchOut: "05:55 PM", schools: 2, dryWasteKg: 420, location: "Burgampahad", pendingSlip: "Yes" },
    { empId: "WOW-CRD-104", name: "K. Venkatesh", status: "Present", punchIn: "09:20 AM", punchOut: "05:15 PM", schools: 1, dryWasteKg: 210, location: "Mahabubabad", pendingSlip: "No" },
    { empId: "WOW-CRD-105", name: "Sandhya Rani", status: "Leave", punchIn: "-", punchOut: "-", schools: 0, dryWasteKg: 0, location: "Khammam", pendingSlip: "No" },
    { empId: "WOW-CRD-106", name: "M. Ashok Kumar", status: "Absent", punchIn: "-", punchOut: "-", schools: 0, dryWasteKg: 0, location: "Palwancha", pendingSlip: "No" },
  ];

  const recoveryTrend = [
    { month: 'May', plannedKg: 18000, achievedKg: 17200 },
    { month: 'Jun', plannedKg: 20000, achievedKg: 19400 },
    { month: 'Jul', plannedKg: 22000, achievedKg: 21800 },
    { month: 'Aug', plannedKg: 24000, achievedKg: 23600 },
    { month: 'Sep', plannedKg: 26000, achievedKg: 25900 },
    { month: 'Oct', plannedKg: 28000, achievedKg: 27100 },
  ];

  const categoryBreakdown = [
    { name: "School ISRC Drives", count: 42, color: "#0F766E" },
    { name: "College Collections", count: 18, color: "#1E293B" },
    { name: "Corporate Recovery", count: 12, color: "#3B82F6" },
    { name: "Household Sorting", count: 24, color: "#F59E0B" },
    { name: "Office / Stakeholders", count: 8, color: "#64748B" },
  ];

  const routeData = SAMPLE_ROUTE_HISTORY;

  return (
    <AdminLayout
      title="Field Intelligence & Recovery Reports"
      subtitle="Unified reporting hub for dry waste tonnage, institutional deliverables, route breadcrumbs, and compliance documents"
    >
      <div className="space-y-5">
        {/* Navigation Tabs */}
        <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab('monthly')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'monthly'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Monthly Reports</span>
          </button>

          <button
            onClick={() => setActiveTab('daily')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'daily'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Daily Roll-Call & Recovery</span>
          </button>

          <button
            onClick={() => setActiveTab('team')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'team'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Recovery Velocity Analytics</span>
          </button>

          <button
            onClick={() => setActiveTab('route')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'route'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Route History Audit</span>
          </button>

          <button
            onClick={() => setActiveTab('downloads')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'downloads'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>Downloads & Slips</span>
          </button>
        </div>

        {/* Tab 1: Monthly Reports */}
        {activeTab === 'monthly' && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">October 2026 Dry Waste Recovery Report</h3>
                <p className="text-xs text-slate-500">Planned vs achieved recovery by field personnel across Telangana clusters</p>
              </div>
              <ExportCsvButton
                data={monthlyData}
                filename="ITC_WoW_Monthly_Report_Oct2026.csv"
                label="Export Excel / CSV"
              />
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="py-3 px-4">Coordinator</th>
                    <th className="py-3 px-4">District</th>
                    <th className="py-3 px-4">Target (Kg)</th>
                    <th className="py-3 px-4">Collected (Kg)</th>
                    <th className="py-3 px-4">Schools ISRC</th>
                    <th className="py-3 px-4">Colleges</th>
                    <th className="py-3 px-4">Attendance</th>
                    <th className="py-3 px-4">Achievement %</th>
                    <th className="py-3 px-4">Pending Docs</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {monthlyData.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3 px-4 font-bold text-slate-900">
                        {row.name} <span className="font-mono text-[10px] text-slate-400 block font-normal">{row.empId}</span>
                      </td>
                      <td className="py-3 px-4 text-slate-700">{row.district}</td>
                      <td className="py-3 px-4 font-mono">{row.plannedKg.toLocaleString()}</td>
                      <td className="py-3 px-4 font-mono font-bold text-teal-800">{row.achievedKg.toLocaleString()}</td>
                      <td className="py-3 px-4 font-mono">{row.schoolsISRC}</td>
                      <td className="py-3 px-4 font-mono">{row.colleges}</td>
                      <td className="py-3 px-4 font-mono font-semibold text-slate-700">{row.attendance}</td>
                      <td className="py-3 px-4 font-mono font-bold text-teal-800">{row.completion}</td>
                      <td className="py-3 px-4">
                        {row.pendingDocs > 0 ? (
                          <span className="text-[10px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 font-semibold inline-flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> 1 Slip Missing
                          </span>
                        ) : (
                          <span className="text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-semibold">
                            Complete
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Daily Summaries */}
        {activeTab === 'daily' && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Daily Roll-Call & Weighbridge Reconciliation (12 Oct 2026)</h3>
                <p className="text-xs text-slate-500">Live coordinator punch status and recorded net weights</p>
              </div>
              <ExportCsvButton
                data={dailyData}
                filename="ITC_WoW_Daily_Reconciliation_12Oct2026.csv"
                label="Export Daily CSV"
              />
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="py-3 px-4">Coordinator</th>
                    <th className="py-3 px-4">Attendance</th>
                    <th className="py-3 px-4">Punch In</th>
                    <th className="py-3 px-4">Punch Out</th>
                    <th className="py-3 px-4">Schools Visited</th>
                    <th className="py-3 px-4">Dry Waste (Kg)</th>
                    <th className="py-3 px-4">Cluster Location</th>
                    <th className="py-3 px-4">Slip Uploaded</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {dailyData.map((row) => (
                    <tr key={row.empId} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3 px-4 font-bold text-slate-900">
                        {row.name} <span className="text-[10px] text-slate-400 font-mono block font-normal">{row.empId}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          row.status === 'Present'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : row.status === 'Leave'
                              ? 'bg-amber-50 text-amber-800 border border-amber-200'
                              : 'bg-rose-50 text-rose-800 border border-rose-200'
                        }`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono">{row.punchIn}</td>
                      <td className="py-3 px-4 font-mono">{row.punchOut}</td>
                      <td className="py-3 px-4 font-mono font-bold text-slate-800">{row.schools}</td>
                      <td className="py-3 px-4 font-mono font-bold text-teal-800">{row.dryWasteKg} kg</td>
                      <td className="py-3 px-4 text-slate-600">{row.location}</td>
                      <td className="py-3 px-4">
                        {row.pendingSlip === 'Yes' ? (
                          <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                            Slip Pending
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            Verified
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Team Recovery Velocity */}
        {activeTab === 'team' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-slate-900">Monthly Dry Waste Target vs Collected (Kg)</h3>
              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={recoveryTrend}>
                    <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Bar dataKey="plannedKg" fill="#cbd5e1" name="Target Kg" radius={[3, 3, 0, 0]} />
                    <Bar dataKey="achievedKg" fill="#0f766e" name="Collected Kg" radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-slate-900">Task Stream Breakdown</h3>
              <div className="h-56 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={categoryBreakdown} innerRadius={48} outerRadius={78} dataKey="count">
                      {categoryBreakdown.map((entry, idx) => (
                        <Cell key={`c-${idx}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Route History Audit */}
        {activeTab === 'route' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-3">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Coordinator GPS Trail: Rajesh Kumar (WOW-CRD-101)</h3>
                  <p className="text-xs text-slate-500">Date: 10 Oct 2026 · Sarapaka to Bhadrachalam Hub (14.8 km)</p>
                </div>
                <span className="text-xs font-mono font-bold bg-slate-100 text-slate-800 px-2.5 py-1 rounded-lg border border-slate-200">
                  5 Checkpoints Recorded
                </span>
              </div>
              <LeafletRouteMap waypoints={routeData.waypoints} height="400px" />
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900">GPS Audit Checkpoints</h3>
              <div className="space-y-3 text-xs">
                {routeData.waypoints.map((wp, idx) => (
                  <div key={wp.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                    <div className="flex justify-between">
                      <span className="font-bold text-slate-900">Stop #{idx + 1}: {wp.name.split('—')[0]}</span>
                      <span className="font-mono text-teal-800 font-bold">{wp.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-600">{wp.activity}</p>
                    <span className="text-[10px] font-mono text-slate-400 block">{wp.accuracy}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Downloads Section (Per PRD) */}
        {activeTab === 'downloads' && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden p-5 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Official Downloads & Governance Repository</h3>
              <p className="text-xs text-slate-500">Regulatory guidelines, slip formats, training modules, and MoA templates</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(DOWNLOAD_DOCUMENTS || []).map((doc) => (
                <div key={doc.id} className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between gap-3 hover:bg-slate-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 text-slate-700 flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4 text-teal-700" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{doc.title}</h4>
                      <p className="text-[10px] text-slate-500 font-mono">
                        {doc.category} · {doc.format} · {doc.size}
                      </p>
                    </div>
                  </div>

                  <a
                    href={doc.fileUrl}
                    download
                    className="p-2 text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-lg transition-colors shrink-0"
                    title="Download document"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
