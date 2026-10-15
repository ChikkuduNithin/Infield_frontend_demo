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
  CheckCircle2,
  Recycle,
  Scale
} from 'lucide-react';

export default function ManagerMonthlyReport() {
  const { users, schools, colleges, corporates, pendingActivities } = useDemo();

  const [selectedMonth, setSelectedMonth] = useState('October 2026');
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [reportType, setReportType] = useState('consolidated');

  // Realistic PRD report rows
  const reportRows = [
    {
      empId: "WOW-CRD-101",
      coordinatorName: "Rajesh Kumar",
      district: "Bhadradri Kothagudem",
      plannedSchools: 24,
      visitedSchools: 19,
      collegesVisited: 5,
      materialCollectedKg: 2840,
      verifiedKg: 2790,
      studentsEducated: 960,
      attendanceRate: "94%",
      pendingForms: 2
    },
    {
      empId: "WOW-CRD-102",
      coordinatorName: "Priya Sharma",
      district: "Khammam",
      plannedSchools: 22,
      visitedSchools: 18,
      collegesVisited: 4,
      materialCollectedKg: 2450,
      verifiedKg: 2410,
      studentsEducated: 920,
      attendanceRate: "91%",
      pendingForms: 1
    },
    {
      empId: "WOW-CRD-103",
      coordinatorName: "Suresh Babu",
      district: "Bhadradri Kothagudem",
      plannedSchools: 25,
      visitedSchools: 21,
      collegesVisited: 6,
      materialCollectedKg: 3120,
      verifiedKg: 3080,
      studentsEducated: 1040,
      attendanceRate: "96%",
      pendingForms: 0
    },
    {
      empId: "WOW-CRD-104",
      coordinatorName: "K. Venkatesh",
      district: "Mahabubabad",
      plannedSchools: 22,
      visitedSchools: 17,
      collegesVisited: 3,
      materialCollectedKg: 2280,
      verifiedKg: 2240,
      studentsEducated: 840,
      attendanceRate: "88%",
      pendingForms: 1
    },
    {
      empId: "WOW-CRD-105",
      coordinatorName: "Sandhya Rani",
      district: "Khammam",
      plannedSchools: 24,
      visitedSchools: 16,
      collegesVisited: 4,
      materialCollectedKg: 2100,
      verifiedKg: 2060,
      studentsEducated: 780,
      attendanceRate: "82%",
      pendingForms: 2
    }
  ];

  const filteredRows = reportRows.filter(r => {
    if (selectedDistrict !== 'All' && r.district !== selectedDistrict) return false;
    return true;
  });

  const totalKg = filteredRows.reduce((acc, curr) => acc + curr.materialCollectedKg, 0);
  const totalVerified = filteredRows.reduce((acc, curr) => acc + curr.verifiedKg, 0);

  return (
    <MobileLayout title="Manager Reports Hub" showBack={true} role="manager">
      <div className="space-y-3 pb-4">
        {/* Month & Filter Box */}
        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-teal-700" />
              <span className="text-xs font-bold text-slate-800">Reporting Month:</span>
            </div>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="text-xs font-bold text-slate-900 bg-slate-50 border border-slate-300 rounded-lg px-2 py-1 outline-none"
            >
              <option value="October 2026">October 2026 (Active MTD)</option>
              <option value="September 2026">September 2026</option>
              <option value="August 2026">August 2026</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">State District</label>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2 py-1 text-xs font-semibold outline-none"
              >
                <option value="All">All Districts (Telangana)</option>
                <option value="Bhadradri Kothagudem">Bhadradri Kothagudem</option>
                <option value="Khammam">Khammam</option>
                <option value="Mahabubabad">Mahabubabad</option>
              </select>
            </div>

            <div className="flex items-end">
              <ExportCsvButton
                data={filteredRows}
                filename={`WOW_TeamPulse_Manager_${selectedMonth.replace(' ', '_')}.csv`}
                label="Export CSV"
              />
            </div>
          </div>
        </div>

        {/* Aggregates Banner */}
        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-[10px] text-slate-500 block">Dry Waste Collected</span>
            <span className="text-sm font-extrabold text-teal-800 font-mono">
              {totalKg.toLocaleString()} Kg
            </span>
          </div>
          <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-[10px] text-slate-500 block">Certified Net Weight</span>
            <span className="text-sm font-extrabold text-blue-800 font-mono">
              {totalVerified.toLocaleString()} Kg
            </span>
          </div>
          <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-[10px] text-slate-500 block">Pending Slips</span>
            <span className="text-sm font-extrabold text-amber-700 font-mono">
              {filteredRows.reduce((acc, c) => acc + c.pendingForms, 0)} Open
            </span>
          </div>
        </div>

        {/* Tabular Records */}
        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex justify-between items-center border-b border-slate-100 pb-1.5">
            <h3 className="text-xs font-bold text-slate-900">Coordinator Performance Sheet</h3>
            <span className="text-[10px] text-slate-500 font-mono">{filteredRows.length} Records</span>
          </div>

          <div className="space-y-2">
            {filteredRows.map((row) => (
              <div key={row.empId} className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-slate-900">{row.coordinatorName}</h4>
                    <span className="text-[10px] text-slate-500 font-mono">{row.empId} · {row.district}</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-teal-800">
                    {row.materialCollectedKg} Kg
                  </span>
                </div>

                <div className="flex justify-between text-[11px] text-slate-600 pt-1 border-t border-slate-200/60 font-mono">
                  <span>Schools: {row.visitedSchools}/{row.plannedSchools}</span>
                  <span>Colleges: {row.collegesVisited}</span>
                  <span className={row.pendingForms > 0 ? "text-amber-800 font-bold" : "text-teal-800"}>
                    Pending: {row.pendingForms}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PRD Direct Downloads Links */}
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-1.5">
          <span className="font-bold text-slate-800 uppercase tracking-wider text-[10px] block">
            PRD Compliance Downloads Available for Manager
          </span>
          <p className="text-[11px] text-slate-600">
            • Day-wise list of activities completed & pending during date range<br />
            • Location-wise database list (Schools, Colleges, Corporates) for Telangana<br />
            • Color-coded monthly attendance calendar in PDF format
          </p>
        </div>
      </div>
    </MobileLayout>
  );
}
