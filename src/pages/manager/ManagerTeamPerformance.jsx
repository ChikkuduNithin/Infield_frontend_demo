import React, { useState } from 'react';
import MobileLayout from '../../layouts/MobileLayout';
import { TEAM_PERFORMANCE_METRICS } from '../../data/mockData';
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
import {
  Trophy,
  Filter,
  TrendingUp,
  BarChart3,
  Calendar,
  Users,
  Award,
  Layers
} from 'lucide-react';

export default function ManagerTeamPerformance() {
  const [districtFilter, setDistrictFilter] = useState('All');
  const [monthFilter, setMonthFilter] = useState('October 2026');

  const metrics = TEAM_PERFORMANCE_METRICS;

  const coordinatorRankings = [
    { rank: 1, name: "Rajesh Kumar", empId: "WOW-CRD-101", district: "Bhadradri Kothagudem", targetKg: 4500, achievedKg: 4120, percentage: 91.5, isrcDrives: 14, isrsPerms: 21 },
    { rank: 2, name: "Suresh Babu", empId: "WOW-CRD-103", district: "Bhadradri Kothagudem", targetKg: 5000, achievedKg: 4400, percentage: 88.0, isrcDrives: 16, isrsPerms: 18 },
    { rank: 3, name: "Priya Sharma", empId: "WOW-CRD-102", district: "Khammam", targetKg: 4000, achievedKg: 3450, percentage: 86.2, isrcDrives: 12, isrsPerms: 16 },
    { rank: 4, name: "K. Venkatesh", empId: "WOW-CRD-104", district: "Mahabubabad", targetKg: 3800, achievedKg: 3050, percentage: 80.3, isrcDrives: 10, isrsPerms: 14 },
    { rank: 5, name: "Sandhya Rani", empId: "WOW-CRD-105", district: "Khammam", targetKg: 4200, achievedKg: 3100, percentage: 73.8, isrcDrives: 9, isrsPerms: 12 },
    { rank: 6, name: "M. Ashok Kumar", empId: "WOW-CRD-106", district: "Bhadradri Kothagudem", targetKg: 4500, achievedKg: 2850, percentage: 63.3, isrcDrives: 8, isrsPerms: 11 },
  ];

  const filteredRankings = districtFilter === 'All'
    ? coordinatorRankings
    : coordinatorRankings.filter(r => r.district === districtFilter);

  // Recovery trends across dry waste stream
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

  return (
    <MobileLayout title="Team Performance" showBack={true} role="manager">
      <div className="space-y-4 pb-4">
        {/* Filters Bar */}
        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 flex-1">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={districtFilter}
              onChange={(e) => setDistrictFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-xs font-semibold rounded-lg px-2 py-1 outline-none w-full"
            >
              <option value="All">All Districts (Telangana Zone)</option>
              <option value="Bhadradri Kothagudem">Bhadradri Kothagudem</option>
              <option value="Khammam">Khammam</option>
              <option value="Mahabubabad">Mahabubabad</option>
            </select>
          </div>

          <span className="text-[10px] bg-slate-100 text-slate-700 font-bold px-2 py-1 rounded-lg shrink-0">
            {monthFilter}
          </span>
        </div>

        {/* Monthly Trend Recharts Bar Chart: Dry Waste Recovery */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Dry Waste Recovery Velocity
              </span>
              <h3 className="text-xs font-bold text-slate-900">Dry Waste Collected in Kg (May – Oct)</h3>
            </div>
            <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              96.8% Target Met
            </span>
          </div>

          <div className="h-44 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={recoveryTrend} margin={{ top: 5, right: 5, left: -15, bottom: 0 }}>
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', border: 'none', color: '#fff', fontSize: '11px' }}
                />
                <Bar dataKey="plannedKg" fill="#cbd5e1" radius={[3, 3, 0, 0]} name="Target Kg" />
                <Bar dataKey="achievedKg" fill="#0f766e" radius={[3, 3, 0, 0]} name="Collected Kg" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex justify-center gap-4 text-[10px] text-slate-500 pt-1">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-slate-300"></span>
              <span>Target Weight</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-teal-700"></span>
              <span>Collected Weight (Kg)</span>
            </div>
          </div>
        </div>

        {/* Activity Distribution Breakdown */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <h3 className="text-xs font-bold text-slate-900">Task Stream Distribution (MTD)</h3>

          <div className="grid grid-cols-2 gap-3 items-center">
            <div className="h-32 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryBreakdown}
                    innerRadius={26}
                    outerRadius={48}
                    paddingAngle={3}
                    dataKey="count"
                  >
                    {categoryBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', border: 'none', color: '#fff', fontSize: '10px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-1 text-xs">
              {categoryBreakdown.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-slate-700 truncate">{item.name}</span>
                  </div>
                  <span className="font-bold font-mono text-slate-900">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Coordinator Leaderboard */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div className="flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-amber-500" />
              <h3 className="text-xs font-bold text-slate-900">Coordinator Scorecards</h3>
            </div>
            <span className="text-[10px] text-slate-400">Ranked by Dry Waste Kg %</span>
          </div>

          <div className="space-y-2">
            {filteredRankings.map((rank) => (
              <div
                key={rank.empId}
                className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between gap-2 text-xs"
              >
                <div className="flex items-center gap-2">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    rank.rank === 1
                      ? 'bg-amber-400 text-slate-950 shadow-xs'
                      : rank.rank === 2
                        ? 'bg-slate-300 text-slate-800'
                        : rank.rank === 3
                          ? 'bg-amber-700 text-white'
                          : 'bg-slate-200 text-slate-600'
                  }`}>
                    {rank.rank}
                  </span>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">{rank.name}</h4>
                    <p className="text-[10px] text-slate-500 font-mono">
                      {rank.empId} · {rank.isrcDrives} Drives · {rank.isrsPerms} ISRS
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-bold font-mono text-teal-800 text-xs block">
                    {rank.percentage}%
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {rank.achievedKg.toLocaleString()} / {rank.targetKg.toLocaleString()} kg
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}
