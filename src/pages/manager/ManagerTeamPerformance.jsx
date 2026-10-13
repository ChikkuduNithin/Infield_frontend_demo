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
  Award
} from 'lucide-react';

export default function ManagerTeamPerformance() {
  const [districtFilter, setDistrictFilter] = useState('All');
  const [monthFilter, setMonthFilter] = useState('October 2026');

  const metrics = TEAM_PERFORMANCE_METRICS;

  const filteredRankings = districtFilter === 'All'
    ? metrics.volunteerRankings
    : metrics.volunteerRankings.filter(r => r.district === districtFilter);

  return (
    <MobileLayout title="Team Performance" showBack={true} role="manager">
      <div className="space-y-4 pb-4">
        {/* Filters Bar */}
        <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 flex-1">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={districtFilter}
              onChange={(e) => setDistrictFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-xs font-semibold rounded-xl px-2 py-1 outline-none w-full"
            >
              <option value="All">All Districts (Zonal)</option>
              <option value="Bhadradri Kothagudem">Bhadradri Kothagudem</option>
              <option value="Khammam">Khammam</option>
              <option value="Mahabubabad">Mahabubabad</option>
            </select>
          </div>

          <span className="text-[10px] bg-blue-50 text-blue-700 font-bold px-2 py-1 rounded-lg shrink-0">
            {monthFilter}
          </span>
        </div>

        {/* Monthly Trend Recharts Bar Chart */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Monthly Target vs Achieved
              </span>
              <h3 className="text-xs font-bold text-slate-900">Schools Covered (May – Oct)</h3>
            </div>
            <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              +14% vs Q1
            </span>
          </div>

          <div className="h-44 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={metrics.monthlyTrend} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', border: 'none', color: '#fff', fontSize: '11px' }}
                />
                <Bar dataKey="planned" fill="#cbd5e1" radius={[4, 4, 0, 0]} name="Planned" />
                <Bar dataKey="achieved" fill="#2563eb" radius={[4, 4, 0, 0]} name="Achieved" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex justify-center gap-4 text-[10px] text-slate-500 pt-1">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-slate-300"></span>
              <span>Planned Target</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-blue-600"></span>
              <span>Achieved Schools</span>
            </div>
          </div>
        </div>

        {/* Activity Distribution Breakdown */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <h3 className="text-xs font-bold text-slate-900">Activity Distribution Today</h3>

          <div className="grid grid-cols-2 gap-3 items-center">
            {/* Simple Pie Chart */}
            <div className="h-32 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={metrics.activityTypeBreakdown}
                    innerRadius={28}
                    outerRadius={50}
                    paddingAngle={3}
                    dataKey="count"
                  >
                    {metrics.activityTypeBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', border: 'none', color: '#fff', fontSize: '10px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Legend list */}
            <div className="space-y-1.5 text-xs">
              {metrics.activityTypeBreakdown.map((item) => (
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

        {/* Leaderboard / Ranking Table */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div className="flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-amber-500" />
              <h3 className="text-xs font-bold text-slate-900">Volunteer Leaderboard</h3>
            </div>
            <span className="text-[10px] text-slate-400">Ranked by Target %</span>
          </div>

          <div className="space-y-2">
            {filteredRankings.map((rank) => (
              <div
                key={rank.empId}
                className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between gap-2 text-xs"
              >
                <div className="flex items-center gap-2">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    rank.rank === 1
                      ? 'bg-amber-400 text-slate-950 shadow-xs'
                      : rank.rank === 2
                        ? 'bg-slate-300 text-slate-800'
                        : rank.rank === 3
                          ? 'bg-amber-700 text-white'
                          : 'bg-slate-100 text-slate-500'
                  }`}>
                    {rank.rank}
                  </span>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">{rank.name}</h4>
                    <p className="text-[10px] text-slate-500">{rank.district}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-bold font-mono text-blue-700 text-xs block">
                    {rank.percentage}%
                  </span>
                  <span className="text-[10px] text-slate-500">
                    {rank.visited} / {rank.target}
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
