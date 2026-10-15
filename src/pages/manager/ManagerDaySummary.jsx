import React, { useState } from 'react';
import MobileLayout from '../../layouts/MobileLayout';
import { useDemo } from '../../context/DemoContext';
import {
  Calendar,
  CheckCircle,
  XCircle,
  School,
  Users,
  Package,
  Search,
  Filter,
  Clock,
  MapPin,
  ChevronRight,
  AlertCircle,
  Building,
  GraduationCap
} from 'lucide-react';

export default function ManagerDaySummary() {
  const { pendingActivities } = useDemo();
  const [selectedDate, setSelectedDate] = useState('2026-10-12');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample coordinator day roll-call
  const rollCall = [
    { empId: "WOW-CRD-101", name: "Rajesh Kumar", status: "Present", punchIn: "09:08 AM", punchOut: "In Progress", schools: 2, colleges: 1, dryWasteKg: 340, pendingDocs: 1, location: "Sarapaka" },
    { empId: "WOW-CRD-102", name: "Priya Sharma", status: "Present", punchIn: "09:15 AM", punchOut: "In Progress", schools: 1, colleges: 0, dryWasteKg: 180, pendingDocs: 0, location: "Nelakondapalli" },
    { empId: "WOW-CRD-103", name: "Suresh Babu", status: "Present", punchIn: "08:55 AM", punchOut: "In Progress", schools: 2, colleges: 1, dryWasteKg: 420, pendingDocs: 1, location: "Burgampahad" },
    { empId: "WOW-CRD-104", name: "K. Venkatesh", status: "Present", punchIn: "09:20 AM", punchOut: "In Progress", schools: 1, colleges: 0, dryWasteKg: 210, pendingDocs: 0, location: "Mahabubabad" },
    { empId: "WOW-CRD-105", name: "Sandhya Rani", status: "Leave", punchIn: "-", punchOut: "-", schools: 0, colleges: 0, dryWasteKg: 0, pendingDocs: 0, location: "Khammam" },
    { empId: "WOW-CRD-106", name: "M. Ashok Kumar", status: "Absent", punchIn: "-", punchOut: "-", schools: 0, colleges: 0, dryWasteKg: 0, pendingDocs: 0, location: "Palwancha" },
  ];

  const presentCount = rollCall.filter(r => r.status === 'Present').length;
  const absentCount = rollCall.filter(r => r.status === 'Absent').length;
  const leaveCount = rollCall.filter(r => r.status === 'Leave').length;

  const totalSchools = rollCall.reduce((acc, c) => acc + c.schools, 0);
  const totalColleges = rollCall.reduce((acc, c) => acc + c.colleges, 0);
  const totalKg = rollCall.reduce((acc, c) => acc + c.dryWasteKg, 0);

  const filteredRollCall = rollCall.filter(r =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.empId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MobileLayout title="Daily Field Summary" showBack={true} role="manager">
      <div className="space-y-4 pb-4">
        {/* Date Selector Header */}
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-700" />
            <span className="text-xs font-semibold text-slate-700">Audit Date:</span>
          </div>
          <select
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="text-xs font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 outline-none font-mono"
          >
            <option value="2026-10-12">Today: 12 Oct 2026</option>
            <option value="2026-10-11">11 Oct 2026 (Sunday)</option>
            <option value="2026-10-10">10 Oct 2026 (Saturday)</option>
          </select>
        </div>

        {/* Day Attendance Pills */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl text-center">
            <span className="text-[10px] text-emerald-800 font-semibold block">Present</span>
            <span className="text-base font-extrabold text-emerald-900 font-mono">{presentCount}</span>
          </div>
          <div className="bg-rose-50 border border-rose-200 p-2.5 rounded-xl text-center">
            <span className="text-[10px] text-rose-800 font-semibold block">Absent</span>
            <span className="text-base font-extrabold text-rose-900 font-mono">{absentCount}</span>
          </div>
          <div className="bg-amber-50 border border-amber-200 p-2.5 rounded-xl text-center">
            <span className="text-[10px] text-amber-800 font-semibold block">On Leave</span>
            <span className="text-base font-extrabold text-amber-900 font-mono">{leaveCount}</span>
          </div>
        </div>

        {/* Key Metrics Card */}
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900">Today's Cluster Deliverables</h3>
            <span className="text-[10px] font-mono text-slate-500">Zonal Output</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center pt-1">
            <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
              <span className="text-[10px] text-slate-500 block">Schools ISRS/C</span>
              <span className="text-sm font-bold text-slate-900 font-mono">{totalSchools}</span>
            </div>
            <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
              <span className="text-[10px] text-slate-500 block">Colleges Covered</span>
              <span className="text-sm font-bold text-slate-900 font-mono">{totalColleges}</span>
            </div>
            <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
              <span className="text-[10px] text-slate-500 block">Dry Waste Kg</span>
              <span className="text-sm font-bold text-teal-800 font-mono">{totalKg} kg</span>
            </div>
          </div>
        </div>

        {/* Coordinator List with Status */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden space-y-2">
          <div className="p-3 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900">Field Coordinator Roll-Call</h3>
            <span className="text-[10px] text-slate-500 font-mono">{filteredRollCall.length} Active</span>
          </div>

          <div className="px-3 pb-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search coordinator name or ID..."
                className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:bg-white"
              />
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {filteredRollCall.map((vol) => (
              <div key={vol.empId} className="p-3 text-xs flex items-center justify-between gap-2 hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                    vol.status === 'Present'
                      ? 'bg-emerald-100 text-emerald-800'
                      : vol.status === 'Leave'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                  }`}>
                    {vol.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">{vol.name}</h4>
                    <p className="text-[10px] text-slate-500 font-mono">
                      {vol.empId} · {vol.location}
                    </p>
                    {vol.pendingDocs > 0 && (
                      <span className="text-[10px] text-amber-700 font-medium flex items-center gap-1 mt-0.5">
                        <AlertCircle className="w-3 h-3" /> Slip Pending
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    vol.status === 'Present'
                      ? 'bg-emerald-100 text-emerald-800'
                      : vol.status === 'Leave'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                  }`}>
                    {vol.status}
                  </span>
                  {vol.status === 'Present' && (
                    <span className="text-[10px] text-slate-500 font-mono block mt-0.5">
                      {vol.dryWasteKg} kg · In: {vol.punchIn}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}
