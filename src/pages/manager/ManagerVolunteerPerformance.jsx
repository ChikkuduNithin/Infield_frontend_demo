import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDemo } from '../../context/DemoContext';
import MobileLayout from '../../layouts/MobileLayout';
import Modal from '../../components/common/Modal';
import ExportCsvButton from '../../components/common/ExportCsvButton';
import {
  Search,
  Users,
  Award,
  School,
  GraduationCap,
  Building2,
  CheckCircle2,
  XCircle,
  Clock,
  ChevronRight,
  Filter,
  Phone,
  Mail,
  MapPin,
  Calendar,
  AlertTriangle,
  FileSpreadsheet
} from 'lucide-react';

export default function ManagerVolunteerPerformance() {
  const navigate = useNavigate();
  const { users, schools, colleges, corporates, pendingActivities } = useDemo();
  const [activeTab, setActiveTab] = useState('coordinators'); // 'coordinators' | 'database'
  const [dbCategory, setDbCategory] = useState('schools'); // 'schools' | 'colleges' | 'corporates'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCoordinator, setSelectedCoordinator] = useState(null);

  // Filter coordinator users
  const coordinators = users.filter(u => u.role === 'coordinator' || u.role === 'volunteer');

  const filteredCoordinators = coordinators.filter(c => {
    return (
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.empId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.district.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <MobileLayout title="Coordinators & State DB" showBack={true} role="manager">
      <div className="space-y-3 pb-4">
        {/* Tab Switcher: Coordinators vs Database */}
        <div className="bg-slate-200 p-0.5 rounded-lg flex items-center gap-0.5 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('coordinators')}
            className={`flex-1 py-1.5 rounded-md font-bold transition-all ${
              activeTab === 'coordinators'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Coordinator Scorecards
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('database')}
            className={`flex-1 py-1.5 rounded-md font-bold transition-all ${
              activeTab === 'database'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            State Database (TS)
          </button>
        </div>

        {activeTab === 'coordinators' ? (
          <>
            {/* Search Bar */}
            <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs space-y-1.5">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search coordinator name, ID or cluster..."
                  className="w-full pl-8 pr-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs outline-none focus:border-teal-700 font-medium"
                />
              </div>
              <div className="flex justify-between items-center text-[10px] text-slate-500">
                <span>Roster: {filteredCoordinators.length} Assigned Coordinators</span>
                <span className="text-teal-800 font-bold">State: Telangana</span>
              </div>
            </div>

            {/* Coordinator Cards */}
            <div className="space-y-2">
              {filteredCoordinators.map((crd, index) => {
                const target = crd.monthlyTarget || { schools: 24, colleges: 6, materialKg: 3500 };
                const achieved = crd.achieved || { schools: 19, colleges: 5, materialKg: 2840 };
                const pct = Math.round((achieved.materialKg / target.materialKg) * 100);

                // Check pending activities for this coordinator
                const crdPending = pendingActivities.filter(p => p.coordinatorId === crd.id || p.coordinatorName === crd.name);

                return (
                  <div
                    key={crd.id}
                    onClick={() => setSelectedCoordinator(crd)}
                    className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs hover:border-teal-700 transition-all cursor-pointer space-y-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <img
                          src={crd.avatar}
                          alt={crd.name}
                          className="w-9 h-9 rounded-lg object-cover border border-slate-200"
                        />
                        <div>
                          <h4 className="text-xs font-bold text-slate-900">{crd.name}</h4>
                          <p className="text-[10px] text-slate-500 font-mono">
                            {crd.empId} · {crd.district}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-bold font-mono text-teal-800">{pct}%</span>
                        <span className="text-[9px] text-slate-400 block uppercase">Target</span>
                      </div>
                    </div>

                    {/* Progress Bar & Metric Numbers */}
                    <div>
                      <div className="flex justify-between text-[10px] text-slate-600 mb-0.5 font-mono">
                        <span>Recovery: {achieved.materialKg} / {target.materialKg} Kg</span>
                        <span>Schools: {achieved.schools}/{target.schools}</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden border border-slate-200">
                        <div
                          className="bg-teal-700 h-1.5 rounded-full"
                          style={{ width: `${Math.min(pct, 100)}%` }}
                        />
                      </div>
                    </div>

                    {/* Pending Activity Tag (PRD Requirement) */}
                    <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[10px]">
                      <span className="text-slate-500">Attendance: {crd.attendanceRate || 94}%</span>
                      {crdPending.length > 0 ? (
                        <span className="text-amber-800 font-bold bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3 text-amber-700" />
                          <span>{crdPending.length} Pending Form(s)</span>
                        </span>
                      ) : (
                        <span className="text-teal-800 font-semibold bg-teal-50 px-1.5 py-0.2 rounded">
                          0 Pending
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          /* STATE DATABASE MANAGEMENT (PRD Requirement: Manage DB for Schools, Colleges, Corporates in state) */
          <div className="space-y-3">
            <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold text-slate-900">Telangana Institutions Database</h3>
                  <p className="text-[10px] text-slate-500">Restricted to operational territory (State: TS)</p>
                </div>
                <ExportCsvButton
                  data={dbCategory === 'schools' ? schools : dbCategory === 'colleges' ? colleges : corporates}
                  filename={`ITC_WoW_TS_${dbCategory}_Master.csv`}
                  label="Export DB"
                />
              </div>

              {/* Sub-category selector */}
              <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-lg text-xs">
                <button
                  type="button"
                  onClick={() => setDbCategory('schools')}
                  className={`py-1 rounded font-bold transition-all ${
                    dbCategory === 'schools' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
                  }`}
                >
                  Schools ({schools.length})
                </button>
                <button
                  type="button"
                  onClick={() => setDbCategory('colleges')}
                  className={`py-1 rounded font-bold transition-all ${
                    dbCategory === 'colleges' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
                  }`}
                >
                  Colleges ({colleges.length})
                </button>
                <button
                  type="button"
                  onClick={() => setDbCategory('corporates')}
                  className={`py-1 rounded font-bold transition-all ${
                    dbCategory === 'corporates' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
                  }`}
                >
                  Corporates ({corporates.length})
                </button>
              </div>
            </div>

            {/* Entity List */}
            <div className="space-y-2">
              {dbCategory === 'schools' && schools.map((s) => (
                <div key={s.id} className="p-2.5 bg-white rounded-lg border border-slate-200 text-xs space-y-1">
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-slate-900">{s.name}</span>
                    <span className="text-[9px] bg-slate-100 text-slate-700 px-1.5 py-0.2 rounded font-mono">
                      UDISE: {s.udise}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">{s.category} · {s.village}</p>
                  <div className="flex justify-between text-[10px] text-slate-600 pt-0.5 border-t border-slate-100">
                    <span>Headmaster: {s.headmaster} ({s.phone})</span>
                    <span>Students: {s.studentsCount}</span>
                  </div>
                </div>
              ))}

              {dbCategory === 'colleges' && colleges.map((c) => (
                <div key={c.id} className="p-2.5 bg-white rounded-lg border border-slate-200 text-xs space-y-1">
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-slate-900">{c.name}</span>
                    <span className="text-[9px] bg-slate-100 text-slate-700 px-1.5 py-0.2 rounded font-mono">
                      AISHE: {c.aishe}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">{c.category} · {c.district}</p>
                  <div className="flex justify-between text-[10px] text-slate-600 pt-0.5 border-t border-slate-100">
                    <span>Principal: {c.principalName}</span>
                    <span>Students: {c.studentsCount}</span>
                  </div>
                </div>
              ))}

              {dbCategory === 'corporates' && corporates.map((cr) => (
                <div key={cr.id} className="p-2.5 bg-white rounded-lg border border-slate-200 text-xs space-y-1">
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-slate-900">{cr.name}</span>
                    <span className="text-[9px] bg-slate-100 text-slate-700 px-1.5 py-0.2 rounded font-mono">
                      Code: {cr.corpCode}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">{cr.category} · {cr.district}</p>
                  <div className="flex justify-between text-[10px] text-slate-600 pt-0.5 border-t border-slate-100">
                    <span>EHS Contact: {cr.contactPerson}</span>
                    <span>Employees: {cr.employeesCount}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* MODAL: Coordinator Scorecard Detail */}
      {selectedCoordinator && (
        <Modal
          isOpen={!!selectedCoordinator}
          onClose={() => setSelectedCoordinator(null)}
          title={`Coordinator: ${selectedCoordinator.name}`}
        >
          <div className="space-y-3 text-xs">
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
              <div>
                <span className="font-mono text-slate-500 text-[10px]">{selectedCoordinator.empId}</span>
                <p className="font-bold text-slate-900">{selectedCoordinator.designation}</p>
                <p className="text-[11px] text-slate-600">{selectedCoordinator.district} · {selectedCoordinator.org}</p>
              </div>
              <span className="text-base font-extrabold text-teal-800 font-mono">
                {selectedCoordinator.attendanceRate || 94}% Att.
              </span>
            </div>

            <div className="space-y-1.5">
              <span className="font-bold text-slate-700 block text-[11px] uppercase tracking-wider">
                Monthly Quota Breakdown
              </span>
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="p-2 bg-white rounded border border-slate-200">
                  <span className="text-[10px] text-slate-400 block">Schools</span>
                  <span className="font-bold text-slate-900">{selectedCoordinator.achieved?.schools || 19} / {selectedCoordinator.monthlyTarget?.schools || 24}</span>
                </div>
                <div className="p-2 bg-white rounded border border-slate-200">
                  <span className="text-[10px] text-slate-400 block">Dry Waste Kg</span>
                  <span className="font-bold text-teal-800">{selectedCoordinator.achieved?.materialKg || 2840} / {selectedCoordinator.monthlyTarget?.materialKg || 3500}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedCoordinator(null);
                  navigate('/manager/route-history');
                }}
                className="flex-1 py-1.5 bg-indigo-700 text-white rounded text-xs font-bold"
              >
                Inspect Route Trail →
              </button>
            </div>
          </div>
        </Modal>
      )}
    </MobileLayout>
  );
}
