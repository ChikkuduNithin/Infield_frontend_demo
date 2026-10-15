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
  Layers,
  Truck,
  GraduationCap,
  Building,
  Scale
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
  const { users, schools, ngos, franchises, activeRole } = useDemo();

  const isWowAdmin = activeRole === 'wow_admin';
  const coordinatorsCount = users.filter(u => u.role === 'volunteer').length;
  const supervisorsCount = users.filter(u => u.role === 'manager').length;

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

  return (
    <AdminLayout
      title={isWowAdmin ? "ITC WoW National Administration Console" : "NGO Administrative Overview"}
      subtitle={isWowAdmin ? "Cross-NGO Governance & Dry Waste Circular Economy Hub" : "MARI Implementing Agency Operations & Franchise Control"}
    >
      <div className="space-y-6">
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
    </AdminLayout>
  );
}
