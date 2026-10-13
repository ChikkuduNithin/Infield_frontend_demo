import React from 'react';
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
  Layers
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
  const { users, schools, ngos } = useDemo();

  const volunteersCount = users.filter(u => u.role === 'volunteer').length;
  const managersCount = users.filter(u => u.role === 'manager').length;

  const activityTrends = [
    { week: "Wk 38", schools: 142, students: 5800, kits: 2100 },
    { week: "Wk 39", schools: 156, students: 6400, kits: 2350 },
    { week: "Wk 40", schools: 168, students: 6900, kits: 2540 },
    { week: "Wk 41", schools: 182, students: 7600, kits: 2890 },
    { week: "Wk 42 (Current)", schools: 198, students: 8250, kits: 3120 },
  ];

  const districtCoverage = [
    { district: "Bhadradri Kothagudem", schools: 184, visited: 148, pct: 80.4 },
    { district: "Khammam", schools: 142, visited: 118, pct: 83.1 },
    { district: "Mahabubabad", schools: 88, visited: 66, pct: 75.0 },
    { district: "East Godavari", schools: 95, visited: 72, pct: 75.8 },
  ];

  return (
    <AdminLayout
      title="ITC CSR & NGO Administrative Overview"
      subtitle="Governance control centre for Mission Sunehra Kal field monitoring initiatives"
    >
      <div className="space-y-6">
        {/* Top 6 KPI Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500">Total System Users</span>
              <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-extrabold text-slate-900 font-mono">124</div>
            <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" /> +12 this quarter
            </span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500">Field Volunteers</span>
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-extrabold text-slate-900 font-mono">96</div>
            <span className="text-[11px] text-slate-500 mt-1 block">Active across 4 NGOs</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500">Zonal Managers</span>
              <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-extrabold text-slate-900 font-mono">14</div>
            <span className="text-[11px] text-slate-500 mt-1 block">ITC & Partner leads</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500">Registered Schools</span>
              <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                <School className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-extrabold text-slate-900 font-mono">380</div>
            <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">94% Geo-tagged</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500">Partner NGOs</span>
              <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                <Building2 className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-extrabold text-slate-900 font-mono">4</div>
            <span className="text-[11px] text-purple-700 font-semibold mt-1 block">MARI, Pratham, BTWS</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500">Attendance Today</span>
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <CalendarCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-extrabold text-emerald-700 font-mono">89.2%</div>
            <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">85 Present / 96 Active</span>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Area Chart: Weekly Reach */}
          <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Program Reach Velocity (Weekly Trend)</h3>
                <p className="text-xs text-slate-500">Cumulative students reached and schools monitored per week</p>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                Quarterly Target: 82% Met
              </span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={activityTrends} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stop-color="#10b981" stop-opacity={0.3}/>
                      <stop offset="95%" stop-color="#10b981" stop-opacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorKits" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stop-color="#2563eb" stop-opacity={0.3}/>
                      <stop offset="95%" stop-color="#2563eb" stop-opacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '11px' }}
                  />
                  <Area type="monotone" dataKey="students" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#colorStudents)" name="Students" />
                  <Area type="monotone" dataKey="kits" stroke="#2563eb" strokeWidth={2} fillOpacity={1} fill="url(#colorKits)" name="Kits" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-600">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                  <span>Students Reached</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-blue-600"></span>
                  <span>Educational Hygiene Kits Distributed</span>
                </div>
              </div>
              <button
                onClick={() => navigate('/admin/reports')}
                className="text-emerald-700 font-semibold hover:underline flex items-center gap-1"
              >
                View Detailed Reports →
              </button>
            </div>
          </div>

          {/* District Coverage Bars */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">District Coverage Matrix</h3>
              <p className="text-xs text-slate-500">School visits vs total registered</p>
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
                      className={`h-2 rounded-full ${
                        d.pct >= 80 ? 'bg-emerald-600' : 'bg-blue-600'
                      }`}
                      style={{ width: `${d.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-600">
              <span className="font-bold text-slate-900 block mb-0.5">Coverage Note</span>
              Bhadradri Kothagudem and Khammam have achieved over 80% school coverage this term.
            </div>
          </div>
        </div>

        {/* Quick Management Navigation Cards */}
        <div>
          <h3 className="text-sm font-bold text-slate-900 mb-3">Administrative Control Shortcuts</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={() => navigate('/admin/users')}
              className="p-4 bg-white hover:bg-emerald-50/30 border border-slate-200 rounded-2xl text-left shadow-xs transition-all flex items-start gap-3.5 group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">User Management</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Add/Edit volunteers, managers, roles & districts</p>
              </div>
            </button>

            <button
              onClick={() => navigate('/admin/schools')}
              className="p-4 bg-white hover:bg-blue-50/30 border border-slate-200 rounded-2xl text-left shadow-xs transition-all flex items-start gap-3.5 group"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <School className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">School Registry</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Manage 380 schools, UDISE codes & categories</p>
              </div>
            </button>

            <button
              onClick={() => navigate('/admin/managers-orgs')}
              className="p-4 bg-white hover:bg-purple-50/30 border border-slate-200 rounded-2xl text-left shadow-xs transition-all flex items-start gap-3.5 group"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Manager & NGO Matrix</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Allocate volunteers to managers & NGOs</p>
              </div>
            </button>

            <button
              onClick={() => navigate('/admin/master-data')}
              className="p-4 bg-white hover:bg-amber-50/30 border border-slate-200 rounded-2xl text-left shadow-xs transition-all flex items-start gap-3.5 group"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Master Data Configuration</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Configure states, districts & categories</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
