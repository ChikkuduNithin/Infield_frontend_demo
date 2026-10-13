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
  ChevronRight
} from 'lucide-react';

export default function ManagerDaySummary() {
  const { users, todayActivities } = useDemo();
  const [selectedDate, setSelectedDate] = useState('2026-10-12');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample volunteer day roll-call
  const rollCall = [
    { empId: "MARI-VOL-101", name: "Rajesh Kumar", status: "Present", punchIn: "09:08 AM", punchOut: "In Progress", schools: 2, students: 82, location: "Sarapaka" },
    { empId: "MARI-VOL-102", name: "Priya Sharma", status: "Present", punchIn: "09:15 AM", punchOut: "In Progress", schools: 1, students: 44, location: "Nelakondapalli" },
    { empId: "MARI-VOL-103", name: "Suresh Babu", status: "Present", punchIn: "08:55 AM", punchOut: "In Progress", schools: 2, students: 95, location: "Burgampahad" },
    { empId: "MARI-VOL-104", name: "K. Venkatesh", status: "Present", punchIn: "09:20 AM", punchOut: "In Progress", schools: 1, students: 38, location: "Mahabubabad" },
    { empId: "MARI-VOL-105", name: "Sandhya Rani", status: "Leave", punchIn: "-", punchOut: "-", schools: 0, students: 0, location: "Khammam" },
    { empId: "MARI-VOL-106", name: "M. Ashok Kumar", status: "Absent", punchIn: "-", punchOut: "-", schools: 0, students: 0, location: "Palwancha" },
  ];

  const presentCount = rollCall.filter(r => r.status === 'Present').length;
  const absentCount = rollCall.filter(r => r.status === 'Absent').length;
  const leaveCount = rollCall.filter(r => r.status === 'Leave').length;

  const totalSchools = rollCall.reduce((acc, c) => acc + c.schools, 0);
  const totalStudents = rollCall.reduce((acc, c) => acc + c.students, 0);

  const filteredRollCall = rollCall.filter(r =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.empId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MobileLayout title="Daily Field Summary" showBack={true} role="manager">
      <div className="space-y-4 pb-4">
        {/* Date Selector Header */}
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-semibold text-slate-700">Audit Date:</span>
          </div>
          <select
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="text-xs font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 outline-none"
          >
            <option value="2026-10-12">Today: 12 Oct 2026</option>
            <option value="2026-10-11">11 Oct 2026 (Sunday)</option>
            <option value="2026-10-10">10 Oct 2026 (Saturday)</option>
          </select>
        </div>

        {/* Day Attendance Pills */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-emerald-50 border border-emerald-200 p-2.5 rounded-2xl text-center">
            <span className="text-[10px] text-emerald-800 font-semibold block">Present</span>
            <span className="text-base font-extrabold text-emerald-900 font-mono">{presentCount}</span>
          </div>
          <div className="bg-rose-50 border border-rose-200 p-2.5 rounded-2xl text-center">
            <span className="text-[10px] text-rose-800 font-semibold block">Absent</span>
            <span className="text-base font-extrabold text-rose-900 font-mono">{absentCount}</span>
          </div>
          <div className="bg-amber-50 border border-amber-200 p-2.5 rounded-2xl text-center">
            <span className="text-[10px] text-amber-800 font-semibold block">On Leave</span>
            <span className="text-base font-extrabold text-amber-900 font-mono">{leaveCount}</span>
          </div>
        </div>

        {/* Key Metrics Card */}
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <h3 className="text-xs font-bold text-slate-900">Today's Cluster Deliverables</h3>
          <div className="grid grid-cols-3 gap-2 text-center pt-1">
            <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
              <span className="text-[10px] text-slate-500 block">Schools Visited</span>
              <span className="text-sm font-bold text-slate-900">{totalSchools}</span>
            </div>
            <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
              <span className="text-[10px] text-slate-500 block">Students Reached</span>
              <span className="text-sm font-bold text-blue-700">{totalStudents}</span>
            </div>
            <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
              <span className="text-[10px] text-slate-500 block">Activities Logged</span>
              <span className="text-sm font-bold text-emerald-700">38</span>
            </div>
          </div>
        </div>

        {/* Volunteer List with Status */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-2">
          <div className="p-3 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900">Volunteer Attendance & Logs</h3>
            <span className="text-[10px] text-slate-400 font-mono">{filteredRollCall.length} Tracked</span>
          </div>

          <div className="px-3 pb-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search volunteer name or ID..."
                className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white"
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
                    <p className="text-[10px] text-slate-500">
                      {vol.empId} · {vol.location}
                    </p>
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
                      In: {vol.punchIn}
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
