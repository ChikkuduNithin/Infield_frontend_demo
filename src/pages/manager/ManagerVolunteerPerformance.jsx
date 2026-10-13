import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import MobileLayout from '../../layouts/MobileLayout';
import Modal from '../../components/common/Modal';
import {
  Search,
  Users,
  Award,
  School,
  CheckCircle2,
  XCircle,
  Clock,
  ChevronRight,
  Filter,
  Phone,
  Mail,
  MapPin,
  Calendar
} from 'lucide-react';

export default function ManagerVolunteerPerformance() {
  const { users } = useDemo();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);

  // Filter volunteer users
  const volunteers = users.filter(u => u.role === 'volunteer');

  const filtered = volunteers.filter(vol => {
    const matchesSearch =
      vol.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vol.empId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vol.district.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <MobileLayout title="Volunteer Scorecards" showBack={true} role="manager">
      <div className="space-y-3.5 pb-4">
        {/* Search & Filter Bar */}
        <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, ID or district..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-blue-500"
            />
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <span className="text-[11px] text-slate-500 font-medium">
              Showing {filtered.length} Volunteers
            </span>
            <div className="flex gap-1">
              <button
                onClick={() => setFilterStatus('all')}
                className="px-2 py-0.5 rounded-lg text-[10px] font-semibold bg-slate-100 text-slate-700"
              >
                All
              </button>
              <button
                onClick={() => setFilterStatus('present')}
                className="px-2 py-0.5 rounded-lg text-[10px] font-semibold bg-emerald-100 text-emerald-800"
              >
                Present
              </button>
            </div>
          </div>
        </div>

        {/* Volunteer List Cards */}
        <div className="space-y-2.5">
          {filtered.map((vol, index) => {
            const target = vol.monthlyTarget || { schools: 24, students: 1200 };
            const achieved = vol.achieved || { schools: 18, students: 900 };
            const pct = Math.round((achieved.schools / target.schools) * 100);

            // Attendance badge
            const isPresent = index !== 4 && index !== 5;
            const isLeave = index === 4;

            return (
              <div
                key={vol.id}
                onClick={() => setSelectedVolunteer(vol)}
                className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs hover:border-blue-300 transition-all cursor-pointer group space-y-2.5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={vol.avatar}
                      alt={vol.name}
                      className="w-10 h-10 rounded-full object-cover border border-slate-200"
                    />
                    <div>
                      <h3 className="text-xs font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                        {vol.name}
                      </h3>
                      <p className="text-[10px] text-slate-500 font-mono">
                        {vol.empId} · {vol.district}
                      </p>
                    </div>
                  </div>

                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    isPresent
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      : isLeave
                        ? 'bg-amber-100 text-amber-800 border border-amber-200'
                        : 'bg-rose-100 text-rose-800 border border-rose-200'
                  }`}>
                    {isPresent ? 'Present' : isLeave ? 'On Leave' : 'Absent'}
                  </span>
                </div>

                {/* Progress bar */}
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-slate-500">
                      Schools: <strong>{achieved.schools} / {target.schools}</strong>
                    </span>
                    <span className="font-bold text-blue-700 font-mono">{pct}% Target</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${Math.min(pct, 100)}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] pt-1 text-slate-500 border-t border-slate-100">
                  <span>Attendance: <strong className="text-slate-800">{vol.attendanceRate || 92}%</strong></span>
                  <span className="text-blue-600 font-semibold group-hover:underline flex items-center gap-0.5">
                    View Scorecard <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Volunteer Detail Modal */}
        <Modal
          isOpen={!!selectedVolunteer}
          onClose={() => setSelectedVolunteer(null)}
          title="Volunteer Performance Profile"
        >
          {selectedVolunteer && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                <img
                  src={selectedVolunteer.avatar}
                  alt={selectedVolunteer.name}
                  className="w-12 h-12 rounded-full object-cover border border-slate-300"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{selectedVolunteer.name}</h4>
                  <p className="text-xs text-slate-600 font-mono">{selectedVolunteer.empId}</p>
                  <p className="text-[11px] text-blue-700 font-semibold">{selectedVolunteer.designation}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[10px] text-slate-500 block">Assigned District</span>
                  <span className="font-bold text-slate-800">{selectedVolunteer.district}</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[10px] text-slate-500 block">Attendance Rate</span>
                  <span className="font-bold text-emerald-700 font-mono">
                    {selectedVolunteer.attendanceRate || 94}% (October)
                  </span>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-2 text-xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Monthly Targets Breakdown
                </span>
                <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                  <span className="text-slate-600">Schools Target / Visited:</span>
                  <span className="font-bold text-slate-900">
                    {selectedVolunteer.achieved?.schools || 19} / {selectedVolunteer.monthlyTarget?.schools || 24}
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                  <span className="text-slate-600">Students Reached:</span>
                  <span className="font-bold text-slate-900">
                    {selectedVolunteer.achieved?.students || 960} / {selectedVolunteer.monthlyTarget?.students || 1200}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Kits Distributed:</span>
                  <span className="font-bold text-slate-900">
                    {selectedVolunteer.achieved?.kits || 380} / {selectedVolunteer.monthlyTarget?.kits || 450}
                  </span>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-slate-600">
                <p className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{selectedVolunteer.phone}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>{selectedVolunteer.email}</span>
                </p>
              </div>

              <button
                onClick={() => setSelectedVolunteer(null)}
                className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold"
              >
                Close Profile
              </button>
            </div>
          )}
        </Modal>
      </div>
    </MobileLayout>
  );
}
