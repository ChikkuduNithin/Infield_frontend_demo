import React, { useState } from 'react';
import MobileLayout from '../../layouts/MobileLayout';
import ExportCsvButton from '../../components/common/ExportCsvButton';
import { useDemo } from '../../context/DemoContext';
import {
  FileSpreadsheet,
  Filter,
  Download,
  Calendar,
  Search,
  Building,
  School,
  Users,
  CheckCircle2
} from 'lucide-react';

export default function ManagerMonthlyReport() {
  const { users } = useDemo();

  const [selectedMonth, setSelectedMonth] = useState('October 2026');
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [selectedActivity, setSelectedActivity] = useState('All');

  // Sample report records
  const reportRows = [
    {
      empId: "MARI-VOL-101",
      volunteerName: "Rajesh Kumar",
      district: "Bhadradri Kothagudem",
      plannedSchools: 24,
      visitedSchools: 19,
      studentsReached: 960,
      kitsDistributed: 380,
      attendanceRate: "94%",
      achievementPct: "79.2%"
    },
    {
      empId: "MARI-VOL-102",
      volunteerName: "Priya Sharma",
      district: "Khammam",
      plannedSchools: 22,
      visitedSchools: 18,
      studentsReached: 920,
      kitsDistributed: 350,
      attendanceRate: "91%",
      achievementPct: "81.8%"
    },
    {
      empId: "MARI-VOL-103",
      volunteerName: "Suresh Babu",
      district: "Bhadradri Kothagudem",
      plannedSchools: 25,
      visitedSchools: 21,
      studentsReached: 1040,
      kitsDistributed: 410,
      attendanceRate: "96%",
      achievementPct: "84.0%"
    },
    {
      empId: "MARI-VOL-104",
      volunteerName: "K. Venkatesh",
      district: "Mahabubabad",
      plannedSchools: 22,
      visitedSchools: 17,
      studentsReached: 840,
      kitsDistributed: 310,
      attendanceRate: "88%",
      achievementPct: "77.3%"
    },
    {
      empId: "MARI-VOL-105",
      volunteerName: "Sandhya Rani",
      district: "Khammam",
      plannedSchools: 24,
      visitedSchools: 16,
      studentsReached: 780,
      kitsDistributed: 290,
      attendanceRate: "82%",
      achievementPct: "66.7%"
    }
  ];

  const filteredRows = reportRows.filter(r => {
    if (selectedDistrict !== 'All' && r.district !== selectedDistrict) return false;
    return true;
  });

  return (
    <MobileLayout title="Monthly Report" showBack={true} role="manager">
      <div className="space-y-4 pb-4">
        {/* Month & Filter Box */}
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-semibold text-slate-700">Reporting Period:</span>
            </div>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="text-xs font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 outline-none"
            >
              <option value="October 2026">October 2026 (Active)</option>
              <option value="September 2026">September 2026</option>
              <option value="August 2026">August 2026</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <label className="text-[10px] font-semibold text-slate-500 block mb-1">District</label>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-1.5 text-xs text-slate-800 outline-none"
              >
                <option value="All">All Districts</option>
                <option value="Bhadradri Kothagudem">Bhadradri Kothagudem</option>
                <option value="Khammam">Khammam</option>
                <option value="Mahabubabad">Mahabubabad</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-semibold text-slate-500 block mb-1">Activity Scope</label>
              <select
                value={selectedActivity}
                onChange={(e) => setSelectedActivity(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-1.5 text-xs text-slate-800 outline-none"
              >
                <option value="All">All Activities</option>
                <option value="school_visit">School Visits</option>
                <option value="awareness_prog">Awareness Programs</option>
              </select>
            </div>
          </div>
        </div>

        {/* Aggregate KPI Summary Bar */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs text-center">
            <span className="text-[10px] text-slate-500 block">Planned</span>
            <span className="text-sm font-bold text-slate-800 font-mono">117 Schools</span>
          </div>
          <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs text-center">
            <span className="text-[10px] text-slate-500 block">Achieved</span>
            <span className="text-sm font-bold text-emerald-700 font-mono">91 Visited</span>
          </div>
          <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs text-center">
            <span className="text-[10px] text-slate-500 block">Completion</span>
            <span className="text-sm font-bold text-blue-700 font-mono">77.8%</span>
          </div>
        </div>

        {/* Download CSV Action Card */}
        <div className="bg-emerald-50/80 border border-emerald-200/80 p-3.5 rounded-2xl flex items-center justify-between gap-3">
          <div>
            <h4 className="text-xs font-bold text-emerald-950">Export Monthly Report</h4>
            <p className="text-[11px] text-emerald-800 mt-0.5">
              Generates formatted spreadsheet file for ITC CSR audit.
            </p>
          </div>
          <ExportCsvButton
            data={filteredRows}
            filename={`MARI_Monthly_Report_${selectedMonth.replace(' ', '_')}.csv`}
            label="Export CSV"
          />
        </div>

        {/* Table of Monthly Volunteer Work */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-3 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900">Volunteer Work Breakdown</h3>
            <span className="text-[10px] text-slate-500 font-mono">{filteredRows.length} Rows</span>
          </div>

          <div className="divide-y divide-slate-100">
            {filteredRows.map((row) => (
              <div key={row.empId} className="p-3 text-xs space-y-1.5 hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900 text-xs">{row.volunteerName}</span>
                    <span className="text-[10px] text-slate-400 font-mono ml-1.5">{row.empId}</span>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 font-mono">
                    {row.achievementPct}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span>District: <strong className="text-slate-700">{row.district}</strong></span>
                  <span>Visited: <strong>{row.visitedSchools} / {row.plannedSchools}</strong></span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
                  <span>Students Reached: <strong>{row.studentsReached}</strong></span>
                  <span>Attendance: <strong className="text-blue-700">{row.attendanceRate}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}
