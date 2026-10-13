import React, { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import ExportCsvButton from '../../components/common/ExportCsvButton';
import LeafletRouteMap from '../../components/common/LeafletRouteMap';
import { SAMPLE_ROUTE_HISTORY, TEAM_PERFORMANCE_METRICS } from '../../data/mockData';
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
  Award
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
  const { users } = useDemo();
  const [activeTab, setActiveTab] = useState('monthly'); // 'monthly' | 'daily' | 'volunteers' | 'team' | 'route'

  // Monthly report mock data
  const monthlyData = [
    { id: 1, empId: "MARI-VOL-101", name: "Rajesh Kumar", district: "Bhadradri Kothagudem", planned: 24, visited: 19, students: 960, kits: 380, attendance: "94%", completion: "79.2%" },
    { id: 2, empId: "MARI-VOL-102", name: "Priya Sharma", district: "Khammam", planned: 22, visited: 18, students: 920, kits: 350, attendance: "91%", completion: "81.8%" },
    { id: 3, empId: "MARI-VOL-103", name: "Suresh Babu", district: "Bhadradri Kothagudem", planned: 25, visited: 21, students: 1040, kits: 410, attendance: "96%", completion: "84.0%" },
    { id: 4, empId: "MARI-VOL-104", name: "K. Venkatesh", district: "Mahabubabad", planned: 22, visited: 17, students: 840, kits: 310, attendance: "88%", completion: "77.3%" },
    { id: 5, empId: "MARI-VOL-105", name: "Sandhya Rani", district: "Khammam", planned: 24, visited: 16, students: 780, kits: 290, attendance: "82%", completion: "66.7%" },
    { id: 6, empId: "MARI-VOL-106", name: "M. Ashok Kumar", district: "Bhadradri Kothagudem", planned: 25, visited: 15, students: 720, kits: 260, attendance: "76%", completion: "60.0%" },
  ];

  // Daily Summary data
  const dailyData = [
    { empId: "MARI-VOL-101", name: "Rajesh Kumar", status: "Present", punchIn: "09:08 AM", punchOut: "05:40 PM", schools: 2, students: 82, location: "Sarapaka" },
    { empId: "MARI-VOL-102", name: "Priya Sharma", status: "Present", punchIn: "09:15 AM", punchOut: "05:30 PM", schools: 1, students: 44, location: "Nelakondapalli" },
    { empId: "MARI-VOL-103", name: "Suresh Babu", status: "Present", punchIn: "08:55 AM", punchOut: "05:55 PM", schools: 2, students: 95, location: "Burgampahad" },
    { empId: "MARI-VOL-104", name: "K. Venkatesh", status: "Present", punchIn: "09:20 AM", punchOut: "05:15 PM", schools: 1, students: 38, location: "Mahabubabad" },
    { empId: "MARI-VOL-105", name: "Sandhya Rani", status: "Leave", punchIn: "-", punchOut: "-", schools: 0, students: 0, location: "Khammam" },
    { empId: "MARI-VOL-106", name: "M. Ashok Kumar", status: "Absent", punchIn: "-", punchOut: "-", schools: 0, students: 0, location: "Palwancha" },
  ];

  const metrics = TEAM_PERFORMANCE_METRICS;
  const routeData = SAMPLE_ROUTE_HISTORY;

  return (
    <AdminLayout
      title="Field Intelligence & Audit Reports"
      subtitle="Unified reporting hub for zonal attendance, performance scorecards, and route logs"
    >
      <div className="space-y-5">
        {/* Navigation Tabs */}
        <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab('monthly')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'monthly'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Monthly Reports</span>
          </button>

          <button
            onClick={() => setActiveTab('daily')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'daily'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Daily Summaries</span>
          </button>

          <button
            onClick={() => setActiveTab('team')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'team'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Team Analytics</span>
          </button>

          <button
            onClick={() => setActiveTab('route')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'route'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Route History Audit</span>
          </button>
        </div>

        {/* Tab 1: Monthly Reports */}
        {activeTab === 'monthly' && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">October 2026 Monthly Progress Report</h3>
                <p className="text-xs text-slate-500">Planned vs achieved visits by field personnel</p>
              </div>
              <ExportCsvButton
                data={monthlyData}
                filename="ITC_CSR_Monthly_Report_Oct2026.csv"
                label="Export Excel / CSV"
              />
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="py-3 px-4">Employee</th>
                    <th className="py-3 px-4">District</th>
                    <th className="py-3 px-4">Planned Schools</th>
                    <th className="py-3 px-4">Visited Schools</th>
                    <th className="py-3 px-4">Students Reached</th>
                    <th className="py-3 px-4">Kits Distributed</th>
                    <th className="py-3 px-4">Attendance Rate</th>
                    <th className="py-3 px-4">Achievement %</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {monthlyData.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3 px-4 font-bold text-slate-900">
                        {row.name} <span className="font-mono text-[10px] text-slate-400 block font-normal">{row.empId}</span>
                      </td>
                      <td className="py-3 px-4 text-slate-700">{row.district}</td>
                      <td className="py-3 px-4 font-mono">{row.planned}</td>
                      <td className="py-3 px-4 font-mono font-bold text-emerald-700">{row.visited}</td>
                      <td className="py-3 px-4 font-mono">{row.students}</td>
                      <td className="py-3 px-4 font-mono">{row.kits}</td>
                      <td className="py-3 px-4 font-mono font-semibold text-blue-700">{row.attendance}</td>
                      <td className="py-3 px-4 font-mono font-bold text-emerald-700">{row.completion}</td>
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
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Daily Field Roll-Call & Output (12 Oct 2026)</h3>
                <p className="text-xs text-slate-500">Live attendance status and activities reported</p>
              </div>
              <ExportCsvButton
                data={dailyData}
                filename="ITC_Daily_Summary_12Oct2026.csv"
                label="Export Daily CSV"
              />
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="py-3 px-4">Volunteer</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Punch In</th>
                    <th className="py-3 px-4">Punch Out</th>
                    <th className="py-3 px-4">Schools Visited</th>
                    <th className="py-3 px-4">Students Reached</th>
                    <th className="py-3 px-4">Cluster Location</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {dailyData.map((row) => (
                    <tr key={row.empId} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3 px-4 font-bold text-slate-900">
                        {row.name} <span className="text-[10px] text-slate-400 font-mono block font-normal">{row.empId}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          row.status === 'Present'
                            ? 'bg-emerald-100 text-emerald-800'
                            : row.status === 'Leave'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-rose-100 text-rose-800'
                        }`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono">{row.punchIn}</td>
                      <td className="py-3 px-4 font-mono">{row.punchOut}</td>
                      <td className="py-3 px-4 font-mono font-bold text-slate-800">{row.schools}</td>
                      <td className="py-3 px-4 font-mono font-bold text-blue-700">{row.students}</td>
                      <td className="py-3 px-4 text-slate-600">{row.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Team Analytics */}
        {activeTab === 'team' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <h3 className="text-sm font-bold text-slate-900">Monthly Target vs Achieved (May – Oct)</h3>
              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={metrics.monthlyTrend}>
                    <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Bar dataKey="planned" fill="#cbd5e1" name="Planned" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="achieved" fill="#2563eb" name="Achieved" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <h3 className="text-sm font-bold text-slate-900">Activity Breakdown by Program Type</h3>
              <div className="h-56 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={metrics.activityTypeBreakdown} innerRadius={50} outerRadius={80} dataKey="count">
                      {metrics.activityTypeBreakdown.map((entry, idx) => (
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
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Volunteer GPS Trail: Rajesh Kumar (MARI-VOL-101)</h3>
                  <p className="text-xs text-slate-500">Date: 10 Oct 2026 · Sarapaka to Bhadrachalam Hub (14.8 km)</p>
                </div>
                <span className="text-xs font-mono font-bold bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-lg border border-emerald-200">
                  5 Stops Recorded
                </span>
              </div>
              <LeafletRouteMap waypoints={routeData.waypoints} height="400px" />
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900">GPS Audit Checkpoints</h3>
              <div className="space-y-3 text-xs">
                {routeData.waypoints.map((wp, idx) => (
                  <div key={wp.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                    <div className="flex justify-between">
                      <span className="font-bold text-slate-900">Stop #{idx + 1}: {wp.name.split('—')[0]}</span>
                      <span className="font-mono text-emerald-700 font-bold">{wp.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-500">{wp.activity}</p>
                    <span className="text-[10px] font-mono text-slate-400 block">{wp.accuracy}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
