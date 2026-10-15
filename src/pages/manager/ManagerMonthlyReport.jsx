import React, { useState } from 'react';
import MobileLayout from '../../layouts/MobileLayout';
import ExportCsvButton from '../../components/common/ExportCsvButton';
import LeafletRouteMap from '../../components/common/LeafletRouteMap';
import { useDemo } from '../../context/DemoContext';
import { getDayRouteHistory } from '../../data/mockData';
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
  AlertCircle,
  Clock,
  MapPin,
  Compass,
  ArrowUpRight,
  X,
  Eye,
  Scale,
  GraduationCap,
  Briefcase,
  ChevronRight,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';

export default function ManagerMonthlyReport() {
  const { users, schools, colleges, corporates, pendingActivities } = useDemo();

  // 3-Option Top Selector: 'consolidated' | 'volunteer_level' | 'route_history'
  const [activeTab, setActiveTab] = useState('consolidated');

  // Month & District filters
  const [selectedMonth, setSelectedMonth] = useState('October 2026');
  const [selectedDistrict, setSelectedDistrict] = useState('All');

  // Consolidated View: Active coordinator calendar tab
  const [selectedConsolidatedUser, setSelectedConsolidatedUser] = useState('ALL');

  // Detail Modal State (Clicking a user shows monthly calendar & clear performance report)
  const [selectedUserDetail, setSelectedUserDetail] = useState(null);

  // Date Route History Modal State (Clicking any date on calendar shows route history)
  const [selectedDayRoute, setSelectedDayRoute] = useState(null);

  // Direct Route History Audit Tab state
  const [auditUserId, setAuditUserId] = useState('WOW-CRD-101');
  const [auditDate, setAuditDate] = useState('2026-10-10');

  // 5 Realistic Field Coordinators Data with complete metrics
  const coordinatorsList = [
    {
      id: "USR-001",
      empId: "WOW-CRD-101",
      name: "Rajesh Kumar",
      designation: "Senior Field Coordinator",
      district: "Bhadradri Kothagudem",
      phone: "+91 98480 12345",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      plannedSchools: 24,
      visitedSchools: 19,
      targetColleges: 6,
      visitedColleges: 5,
      targetCorporates: 4,
      visitedCorporates: 3,
      targetMaterialKg: 3500,
      materialCollectedKg: 2840,
      verifiedKg: 2790,
      studentsEducated: 960,
      attendanceRate: 94,
      presentDays: 14,
      absentDays: 0,
      leaveDays: 1,
      pendingForms: 2,
      complianceGrade: "Grade A",
      completionRate: 81.1
    },
    {
      id: "USR-002",
      empId: "WOW-CRD-102",
      name: "Priya Sharma",
      designation: "Field Project Coordinator",
      district: "Khammam",
      phone: "+91 98480 23456",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
      plannedSchools: 22,
      visitedSchools: 18,
      targetColleges: 5,
      visitedColleges: 4,
      targetCorporates: 3,
      visitedCorporates: 2,
      targetMaterialKg: 3000,
      materialCollectedKg: 2450,
      verifiedKg: 2410,
      studentsEducated: 920,
      attendanceRate: 91,
      presentDays: 13,
      absentDays: 1,
      leaveDays: 1,
      pendingForms: 1,
      complianceGrade: "Grade A",
      completionRate: 81.8
    },
    {
      id: "USR-003",
      empId: "WOW-CRD-103",
      name: "Suresh Babu",
      designation: "Cluster Field Coordinator",
      district: "Bhadradri Kothagudem",
      phone: "+91 98480 34567",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      plannedSchools: 25,
      visitedSchools: 21,
      targetColleges: 6,
      visitedColleges: 6,
      targetCorporates: 4,
      visitedCorporates: 4,
      targetMaterialKg: 3600,
      materialCollectedKg: 3120,
      verifiedKg: 3080,
      studentsEducated: 1040,
      attendanceRate: 96,
      presentDays: 15,
      absentDays: 0,
      leaveDays: 0,
      pendingForms: 0,
      complianceGrade: "Grade A+",
      completionRate: 86.6
    },
    {
      id: "USR-004",
      empId: "WOW-CRD-104",
      name: "K. Venkatesh",
      designation: "Field Outreach Executive",
      district: "Mahabubabad",
      phone: "+91 98480 45678",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      plannedSchools: 22,
      visitedSchools: 17,
      targetColleges: 5,
      visitedColleges: 3,
      targetCorporates: 3,
      visitedCorporates: 2,
      targetMaterialKg: 3000,
      materialCollectedKg: 2280,
      verifiedKg: 2240,
      studentsEducated: 840,
      attendanceRate: 88,
      presentDays: 12,
      absentDays: 1,
      leaveDays: 2,
      pendingForms: 1,
      complianceGrade: "Grade B+",
      completionRate: 76.0
    },
    {
      id: "USR-005",
      empId: "WOW-CRD-105",
      name: "Sandhya Rani",
      designation: "Community Mobilizer",
      district: "Khammam",
      phone: "+91 98480 56789",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
      plannedSchools: 24,
      visitedSchools: 16,
      targetColleges: 4,
      visitedColleges: 4,
      targetCorporates: 3,
      visitedCorporates: 1,
      targetMaterialKg: 3200,
      materialCollectedKg: 2100,
      verifiedKg: 2060,
      studentsEducated: 780,
      attendanceRate: 82,
      presentDays: 11,
      absentDays: 2,
      leaveDays: 2,
      pendingForms: 2,
      complianceGrade: "Grade B",
      completionRate: 65.6
    }
  ];

  const filteredCoordinators = coordinatorsList.filter(c => {
    if (selectedDistrict !== 'All' && c.district !== selectedDistrict) return false;
    return true;
  });

  const totalCollectedKg = filteredCoordinators.reduce((acc, c) => acc + c.materialCollectedKg, 0);
  const totalVerifiedKg = filteredCoordinators.reduce((acc, c) => acc + c.verifiedKg, 0);
  const totalSchoolsVisited = filteredCoordinators.reduce((acc, c) => acc + c.visitedSchools, 0);
  const totalPlannedSchools = filteredCoordinators.reduce((acc, c) => acc + c.plannedSchools, 0);
  const totalPendingForms = filteredCoordinators.reduce((acc, c) => acc + c.pendingForms, 0);

  // Helper to construct realistic October 2026 calendar days for any user
  const generateMonthDays = (user) => {
    const days = [];
    // Oct 1, 2026 is Thursday (0=Sun, 1=Mon, ..., 4=Thu)
    for (let dayNum = 1; dayNum <= 31; dayNum++) {
      const dateStr = `2026-10-${dayNum.toString().padStart(2, '0')}`;
      const dayOfWeekNum = (dayNum + 3) % 7; // Oct 1 = Thu (4)
      const isSunday = dayOfWeekNum === 0; // Days 4, 11, 18, 25

      let status = 'future';
      let punchIn = '-';
      let punchOut = '-';
      let schoolsCount = 0;
      let materialKg = 0;

      if (isSunday) {
        status = 'sunday';
      } else if (dayNum === 2) {
        status = 'holiday'; // Gandhi Jayanti
      } else if (dayNum === 19 || dayNum === 20) {
        status = 'holiday'; // Dussehra
      } else if (dayNum === 15) {
        status = 'today';
        punchIn = '09:04 AM';
        punchOut = 'In Progress';
        schoolsCount = 1;
        materialKg = 180;
      } else if (dayNum < 15) {
        // Deterministic realistic variation per user
        const seed = (dayNum + (user?.name?.length || 5)) % 10;
        if (seed === 7) {
          status = 'leave';
        } else if (seed === 9 && user.absentDays > 0) {
          status = 'absent';
        } else {
          status = 'present';
          punchIn = `09:0${(dayNum % 6) + 2} AM`;
          punchOut = `05:${35 + (dayNum % 20)} PM`;
          schoolsCount = (dayNum % 2) + 1;
          materialKg = 190 + (dayNum * 14);
        }
      }

      days.push({
        day: dayNum,
        date: dateStr,
        isSunday,
        status,
        punchIn,
        punchOut,
        schoolsCount,
        materialKg
      });
    }
    return days;
  };

  // Open Route History Modal for a specific date and coordinator
  const handleOpenDayRoute = (dayData, coordinator) => {
    if (!dayData || dayData.status === 'sunday' || dayData.status === 'future') return;
    const history = getDayRouteHistory(dayData.date, coordinator.name, coordinator.empId);
    setSelectedDayRoute({
      ...history,
      coordinator,
      dayData
    });
  };

  return (
    <MobileLayout title="Manager Reports Hub" showBack={true} role="manager">
      <div className="space-y-3 pb-8">
        {/* Month & District Header Filter */}
        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-teal-700" />
              <span className="text-xs font-bold text-slate-800">Reporting Period</span>
            </div>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="text-xs font-bold text-slate-900 bg-slate-50 border border-slate-300 rounded-lg px-2 py-1 outline-none font-mono"
            >
              <option value="October 2026">October 2026 (Active MTD)</option>
              <option value="September 2026">September 2026</option>
              <option value="August 2026">August 2026</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">District Scope</label>
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
                data={filteredCoordinators}
                filename={`WOW_TeamPulse_Manager_${selectedMonth.replace(' ', '_')}.csv`}
                label="Export Audit CSV"
              />
            </div>
          </div>
        </div>

        {/* 3-OPTION TOP SELECTOR TABS (USER SPECIFIED) */}
        <div className="bg-slate-100 p-1 rounded-xl border border-slate-200 grid grid-cols-3 gap-1 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('consolidated')}
            className={`py-2 px-1 text-center font-bold rounded-lg transition-all ${
              activeTab === 'consolidated'
                ? 'bg-white text-slate-900 shadow-2xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            1. Consolidated
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('volunteer_level')}
            className={`py-2 px-1 text-center font-bold rounded-lg transition-all ${
              activeTab === 'volunteer_level'
                ? 'bg-white text-slate-900 shadow-2xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            2. Volunteer Level
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('route_history')}
            className={`py-2 px-1 text-center font-bold rounded-lg transition-all ${
              activeTab === 'route_history'
                ? 'bg-white text-slate-900 shadow-2xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            3. Route History
          </button>
        </div>

        {/* ============================================================ */}
        {/* OPTION 1: CONSOLIDATED VIEW                                  */}
        {/* ============================================================ */}
        {activeTab === 'consolidated' && (
          <div className="space-y-3">
            {/* Team Performance Aggregates */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs">
                <span className="text-[10px] text-slate-500 block">Dry Waste Collected</span>
                <span className="text-sm font-extrabold text-teal-800 font-mono">
                  {totalCollectedKg.toLocaleString()} Kg
                </span>
                <span className="text-[9px] text-slate-400 block mt-0.5">
                  Verified: {totalVerifiedKg.toLocaleString()} Kg
                </span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs">
                <span className="text-[10px] text-slate-500 block">ISRS School Visits</span>
                <span className="text-sm font-extrabold text-slate-900 font-mono">
                  {totalSchoolsVisited} / {totalPlannedSchools}
                </span>
                <span className="text-[9px] text-emerald-700 font-bold block mt-0.5">
                  {Math.round((totalSchoolsVisited / totalPlannedSchools) * 100)}% Milestone
                </span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs">
                <span className="text-[10px] text-slate-500 block">Pending Forms</span>
                <span className="text-sm font-extrabold text-amber-700 font-mono">
                  {totalPendingForms} Slips
                </span>
                <span className="text-[9px] text-amber-800 font-medium block mt-0.5">
                  Requires Upload
                </span>
              </div>
            </div>

            {/* Consolidated Calendar Box */}
            <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs space-y-2.5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <div>
                  <h3 className="text-xs font-bold text-slate-900">
                    Consolidated Team Monthly Calendars
                  </h3>
                  <p className="text-[10px] text-slate-500">
                    Tap any date cell to inspect that day's GPS Route History & timeline
                  </p>
                </div>
                <span className="text-[10px] bg-teal-50 text-teal-800 px-2 py-0.5 rounded border border-teal-200 font-mono font-bold">
                  October 2026
                </span>
              </div>

              {/* User Switcher Pills for Calendar Inspection */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] no-scrollbar">
                <button
                  type="button"
                  onClick={() => setSelectedConsolidatedUser('ALL')}
                  className={`px-2.5 py-1 rounded-lg font-bold shrink-0 transition-all ${
                    selectedConsolidatedUser === 'ALL'
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  All Team Matrix
                </button>
                {filteredCoordinators.map(c => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSelectedConsolidatedUser(c.id)}
                    className={`px-2.5 py-1 rounded-lg font-semibold shrink-0 transition-all ${
                      selectedConsolidatedUser === c.id
                        ? 'bg-teal-700 text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {c.name.split(' ')[0]} ({c.empId.replace('WOW-CRD-', '#')})
                  </button>
                ))}
              </div>

              {/* View A: Individual User's Full Calendar when a specific coordinator pill is clicked */}
              {selectedConsolidatedUser !== 'ALL' && (() => {
                const activeCoordinator = filteredCoordinators.find(c => c.id === selectedConsolidatedUser) || filteredCoordinators[0];
                const days = generateMonthDays(activeCoordinator);

                return (
                  <div className="space-y-2 pt-1">
                    <div className="flex items-center justify-between text-xs bg-slate-50 p-2 rounded-lg border border-slate-200">
                      <div className="flex items-center gap-2">
                        <img
                          src={activeCoordinator.avatar}
                          alt={activeCoordinator.name}
                          className="w-7 h-7 rounded-full object-cover border border-slate-300"
                        />
                        <div>
                          <span className="font-bold text-slate-900 block">{activeCoordinator.name}</span>
                          <span className="text-[10px] text-slate-500 font-mono">{activeCoordinator.empId} · {activeCoordinator.district}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-slate-500 block">Attendance Rate</span>
                        <span className="font-mono font-bold text-teal-800 text-xs">{activeCoordinator.attendanceRate}%</span>
                      </div>
                    </div>

                    {/* Standard Calendar Grid */}
                    <div className="grid grid-cols-7 gap-1 text-center">
                      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d, i) => (
                        <div
                          key={d}
                          className={`text-[10px] font-bold py-1 ${
                            i === 0 ? 'text-blue-700 border-b-2 border-blue-600 font-extrabold' : 'text-slate-500'
                          }`}
                        >
                          {d}
                        </div>
                      ))}

                      {/* Empty cells for Thursday start (Oct 1 = Thu, so 4 empty: Sun, Mon, Tue, Wed) */}
                      {[0, 1, 2, 3].map(pad => (
                        <div key={`pad-${pad}`} className="h-10 bg-slate-50/50 rounded border border-dashed border-slate-200" />
                      ))}

                      {days.map((day) => {
                        let bgClass = "bg-slate-50 text-slate-600 border-slate-200";
                        if (day.status === 'present') bgClass = "bg-emerald-50 text-emerald-900 border-emerald-300 hover:bg-emerald-100";
                        else if (day.status === 'absent') bgClass = "bg-rose-50 text-rose-900 border-rose-300 hover:bg-rose-100";
                        else if (day.status === 'leave') bgClass = "bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100";
                        else if (day.status === 'holiday') bgClass = "bg-slate-100 text-slate-700 border-slate-300";
                        else if (day.status === 'today') bgClass = "bg-teal-700 text-white border-teal-800 font-bold ring-2 ring-teal-400";

                        return (
                          <button
                            key={day.day}
                            type="button"
                            onClick={() => handleOpenDayRoute(day, activeCoordinator)}
                            disabled={day.status === 'future' || day.status === 'sunday'}
                            className={`h-11 p-0.5 rounded border text-left flex flex-col justify-between transition-all relative ${bgClass} ${
                              day.isSunday ? 'border-b-2 border-b-blue-600' : ''
                            } ${day.status !== 'future' && day.status !== 'sunday' ? 'cursor-pointer active:scale-95' : 'cursor-default opacity-85'}`}
                          >
                            <div className="flex items-center justify-between w-full px-0.5">
                              <span className="text-[10px] font-bold">{day.day}</span>
                              {day.status === 'present' && (
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                              )}
                              {day.status === 'absent' && (
                                <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
                              )}
                              {day.status === 'leave' && (
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                              )}
                            </div>

                            <div className="truncate px-0.5 text-[8px] font-mono leading-none">
                              {day.status === 'present' && `${day.schoolsCount} Sch`}
                              {day.status === 'absent' && 'Abs'}
                              {day.status === 'leave' && 'Leave'}
                              {day.status === 'holiday' && 'Hol'}
                              {day.status === 'today' && 'Active'}
                              {day.isSunday && <span className="text-blue-700 font-bold">Sun</span>}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}

              {/* View B: Team Matrix showing EVERY user's daily status */}
              {selectedConsolidatedUser === 'ALL' && (
                <div className="space-y-2 pt-1">
                  <div className="text-[10px] text-slate-500 flex items-center justify-between">
                    <span>Active Field Coordinators Daily Roll-Call (1-15 Oct MTD)</span>
                    <span className="text-teal-700 font-bold">Click date to view Day Route</span>
                  </div>

                  <div className="overflow-x-auto border border-slate-200 rounded-lg">
                    <table className="w-full text-[10px] text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                          <th className="py-1.5 px-2 font-bold sticky left-0 bg-slate-100 z-10 w-28">Coordinator</th>
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(d => (
                            <th
                              key={d}
                              className={`py-1.5 px-1 text-center font-mono ${
                                d === 4 || d === 11 ? 'text-blue-700 font-bold border-b-2 border-b-blue-600' : ''
                              } ${d === 15 ? 'bg-teal-100 text-teal-900 font-extrabold' : ''}`}
                            >
                              {d}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {filteredCoordinators.map(c => {
                          const days = generateMonthDays(c);
                          return (
                            <tr key={c.id} className="border-b border-slate-100 hover:bg-slate-50">
                              <td className="py-2 px-2 font-bold text-slate-900 sticky left-0 bg-white z-10 truncate max-w-[120px] shadow-xs">
                                <div>{c.name.split(' ')[0]}</div>
                                <div className="text-[9px] text-slate-400 font-mono">{c.empId}</div>
                              </td>
                              {days.slice(0, 15).map(day => {
                                let badge = "P";
                                let badgeColor = "bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-emerald-300";

                                if (day.isSunday) {
                                  badge = "S";
                                  badgeColor = "bg-blue-50 text-blue-700 border-blue-200 border-b-2 border-b-blue-600";
                                } else if (day.status === 'holiday') {
                                  badge = "H";
                                  badgeColor = "bg-slate-100 text-slate-600 border-slate-200";
                                } else if (day.status === 'absent') {
                                  badge = "A";
                                  badgeColor = "bg-rose-100 text-rose-800 hover:bg-rose-200 border-rose-300 font-bold";
                                } else if (day.status === 'leave') {
                                  badge = "L";
                                  badgeColor = "bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-300 font-bold";
                                } else if (day.status === 'today') {
                                  badge = "●";
                                  badgeColor = "bg-teal-700 text-white border-teal-800 font-extrabold";
                                }

                                return (
                                  <td key={day.day} className="py-1.5 px-0.5 text-center">
                                    <button
                                      type="button"
                                      disabled={day.isSunday}
                                      onClick={() => handleOpenDayRoute(day, c)}
                                      className={`w-5 h-5 rounded text-[9px] font-mono border inline-flex items-center justify-center transition-all ${badgeColor} ${
                                        !day.isSunday ? 'cursor-pointer active:scale-90' : 'cursor-default'
                                      }`}
                                      title={`${c.name} - ${day.date} (${day.status})`}
                                    >
                                      {badge}
                                    </button>
                                  </td>
                                );
                              })}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Calendar Legend */}
                  <div className="flex flex-wrap items-center gap-2 pt-1 text-[10px] text-slate-600">
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded bg-emerald-500" /> Present (P)
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded bg-rose-500" /> Absent (A)
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded bg-amber-500" /> Leave (L)
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded bg-blue-600" /> Sunday (Blue Underline)
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded bg-teal-700" /> Today
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* OPTION 2: VOLUNTEER LEVEL (COORDINATOR LEVEL) VIEW           */}
        {/* ============================================================ */}
        {activeTab === 'volunteer_level' && (
          <div className="space-y-3">
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs text-slate-700 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 block">Volunteer Drilldown & Performance Sheet</span>
                <span className="text-[10px] text-slate-500">
                  Tap any coordinator card to view their Monthly Calendar & Detailed Audit Report
                </span>
              </div>
              <span className="text-[10px] font-mono font-bold bg-white px-2 py-0.5 rounded border border-slate-300">
                {filteredCoordinators.length} Officers
              </span>
            </div>

            {/* Coordinator Cards List */}
            <div className="space-y-2.5">
              {filteredCoordinators.map((c) => (
                <div
                  key={c.id}
                  onClick={() => setSelectedUserDetail(c)}
                  className="bg-white p-3 rounded-xl border border-slate-200 hover:border-teal-600 shadow-2xs hover:shadow-xs transition-all cursor-pointer space-y-2.5 group"
                >
                  {/* Top Profile Strip */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={c.avatar}
                        alt={c.name}
                        className="w-10 h-10 rounded-xl object-cover border border-slate-200 group-hover:border-teal-600"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 group-hover:text-teal-700 flex items-center gap-1.5">
                          <span>{c.name}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-teal-600" />
                        </h4>
                        <span className="text-[10px] text-slate-500 font-mono">
                          {c.empId} · {c.district}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                        {c.complianceGrade}
                      </span>
                      <span className="text-[10px] text-slate-500 block font-mono mt-0.5">
                        {c.completionRate}% Target
                      </span>
                    </div>
                  </div>

                  {/* Progress Bars for Schools & Dry Waste */}
                  <div className="grid grid-cols-2 gap-2 text-[10px] pt-1 border-t border-slate-100 font-mono">
                    <div className="space-y-1">
                      <div className="flex justify-between text-slate-600">
                        <span>ISRS Schools:</span>
                        <span className="font-bold text-slate-900">{c.visitedSchools}/{c.plannedSchools}</span>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-teal-600 h-full rounded-full"
                          style={{ width: `${Math.min(100, Math.round((c.visitedSchools / c.plannedSchools) * 100))}%` }}
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-slate-600">
                        <span>Dry Waste:</span>
                        <span className="font-bold text-teal-800">{c.materialCollectedKg} Kg</span>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-emerald-600 h-full rounded-full"
                          style={{ width: `${Math.min(100, Math.round((c.materialCollectedKg / c.targetMaterialKg) * 100))}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Quick Bottom Badges */}
                  <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-100">
                    <span>Attendance: <strong className="text-slate-800 font-mono">{c.attendanceRate}%</strong></span>
                    <span>Colleges: <strong className="text-slate-800 font-mono">{c.visitedColleges}</strong></span>
                    <span className={c.pendingForms > 0 ? "text-amber-800 font-bold" : "text-emerald-700 font-medium"}>
                      {c.pendingForms > 0 ? `${c.pendingForms} Pending Slips` : 'All Slips Cleared'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* OPTION 3: ROUTE HISTORY AUDIT VIEW                           */}
        {/* ============================================================ */}
        {activeTab === 'route_history' && (() => {
          const activeAuditUser = coordinatorsList.find(c => c.empId === auditUserId) || coordinatorsList[0];
          const routeData = getDayRouteHistory(auditDate, activeAuditUser.name, activeAuditUser.empId);

          return (
            <div className="space-y-3">
              {/* Audit Selection Controls */}
              <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs space-y-2.5">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                    Select Field Coordinator
                  </label>
                  <select
                    value={auditUserId}
                    onChange={(e) => setAuditUserId(e.target.value)}
                    className="w-full py-1.5 px-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-slate-900 outline-none font-mono"
                  >
                    {coordinatorsList.map(c => (
                      <option key={c.empId} value={c.empId}>
                        {c.name} ({c.empId}) — {c.district}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-slate-800">Inspection Date:</span>
                  <input
                    type="date"
                    value={auditDate}
                    max="2026-10-15"
                    onChange={(e) => setAuditDate(e.target.value)}
                    className="py-1 px-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono font-bold text-slate-900 outline-none"
                  />
                </div>
              </div>

              {/* Integrity Metric Strip */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs">
                  <span className="text-[10px] text-slate-500 block">Logged Waypoints</span>
                  <span className="text-sm font-extrabold text-slate-900 font-mono">
                    {routeData.totalLocations} Stops
                  </span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs">
                  <span className="text-[10px] text-slate-500 block">Route Distance</span>
                  <span className="text-sm font-extrabold text-teal-800 font-mono">
                    {routeData.totalDistanceKm} km
                  </span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs">
                  <span className="text-[10px] text-slate-500 block">GPS Integrity</span>
                  <span className="text-sm font-extrabold text-emerald-700 font-mono">
                    100% Locked
                  </span>
                </div>
              </div>

              {/* Route Map Preview */}
              <div className="rounded-xl overflow-hidden border border-slate-200 shadow-xs">
                <LeafletRouteMap waypoints={routeData.waypoints} height="280px" />
              </div>

              {/* Waypoints Timeline */}
              <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs space-y-2.5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                  <h4 className="text-xs font-bold text-slate-900">Historical Checkpoints Timeline</h4>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {routeData.startTime} - {routeData.endTime}
                  </span>
                </div>

                <div className="relative pl-5 space-y-3 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                  {routeData.waypoints.map((wp, idx) => (
                    <div key={wp.id} className="relative text-xs space-y-0.5">
                      <div className="absolute -left-5 top-1 w-4 h-4 rounded-full bg-slate-900 text-white text-[9px] font-bold flex items-center justify-center">
                        {idx + 1}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">{wp.name}</span>
                        <span className="text-[10px] text-teal-800 font-mono font-bold">{wp.time}</span>
                      </div>
                      <p className="text-[11px] text-slate-600">{wp.activity}</p>
                      <span className="text-[9px] text-slate-400 font-mono block">
                        GPS Accuracy: {wp.accuracy} · Status: {wp.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })()}

        {/* ============================================================ */}
        {/* MODAL 1: COORDINATOR MONTHLY CALENDAR & PERFORMANCE REPORT   */}
        {/* Triggered when clicking a user in Volunteer Level tab        */}
        {/* ============================================================ */}
        {selectedUserDetail && (() => {
          const user = selectedUserDetail;
          const userMonthDays = generateMonthDays(user);

          return (
            <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 animate-in fade-in">
              <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl space-y-3 p-4">
                {/* Modal Header */}
                <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-12 h-12 rounded-xl object-cover border-2 border-teal-600 shadow-xs"
                    />
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">{user.name}</h3>
                      <p className="text-xs text-slate-500 font-mono">
                        {user.empId} · {user.district}
                      </p>
                      <span className="text-[10px] text-teal-800 font-semibold bg-teal-50 px-2 py-0.5 rounded border border-teal-200 mt-1 inline-block">
                        {user.designation} · MARI NGO
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedUserDetail(null)}
                    className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* SECTION 1: CLEAR PERFORMANCE REPORT */}
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-teal-700" />
                      Monthly Performance Report (October 2026)
                    </span>
                    <span className="text-xs font-bold text-teal-800 font-mono bg-white px-2 py-0.5 rounded border border-slate-200">
                      Grade: {user.complianceGrade}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {/* Schools */}
                    <div className="bg-white p-2 rounded-lg border border-slate-200 space-y-1">
                      <div className="flex justify-between text-[11px] text-slate-600">
                        <span>ISRS Schools:</span>
                        <span className="font-bold font-mono text-slate-900">{user.visitedSchools} / {user.plannedSchools}</span>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-teal-600 h-full rounded-full"
                          style={{ width: `${Math.min(100, (user.visitedSchools / user.plannedSchools) * 100)}%` }}
                        />
                      </div>
                    </div>

                    {/* Colleges */}
                    <div className="bg-white p-2 rounded-lg border border-slate-200 space-y-1">
                      <div className="flex justify-between text-[11px] text-slate-600">
                        <span>Colleges:</span>
                        <span className="font-bold font-mono text-slate-900">{user.visitedColleges} / {user.targetColleges}</span>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-blue-600 h-full rounded-full"
                          style={{ width: `${Math.min(100, (user.visitedColleges / user.targetColleges) * 100)}%` }}
                        />
                      </div>
                    </div>

                    {/* Corporates */}
                    <div className="bg-white p-2 rounded-lg border border-slate-200 space-y-1">
                      <div className="flex justify-between text-[11px] text-slate-600">
                        <span>Corporates:</span>
                        <span className="font-bold font-mono text-slate-900">{user.visitedCorporates} / {user.targetCorporates}</span>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-amber-600 h-full rounded-full"
                          style={{ width: `${Math.min(100, (user.visitedCorporates / user.targetCorporates) * 100)}%` }}
                        />
                      </div>
                    </div>

                    {/* Recyclables Collected */}
                    <div className="bg-white p-2 rounded-lg border border-slate-200 space-y-1">
                      <div className="flex justify-between text-[11px] text-slate-600">
                        <span>Dry Waste:</span>
                        <span className="font-bold font-mono text-teal-800">{user.materialCollectedKg} / {user.targetMaterialKg} Kg</span>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-emerald-600 h-full rounded-full"
                          style={{ width: `${Math.min(100, (user.materialCollectedKg / user.targetMaterialKg) * 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Summary Metric Strip */}
                  <div className="grid grid-cols-3 gap-2 text-center text-[10px] pt-1">
                    <div className="bg-white p-1.5 rounded border border-slate-200">
                      <span className="text-slate-500 block">Attendance Rate</span>
                      <strong className="text-slate-900 font-mono text-xs">{user.attendanceRate}%</strong>
                    </div>
                    <div className="bg-white p-1.5 rounded border border-slate-200">
                      <span className="text-slate-500 block">Students Reached</span>
                      <strong className="text-slate-900 font-mono text-xs">{user.studentsEducated}</strong>
                    </div>
                    <div className="bg-white p-1.5 rounded border border-slate-200">
                      <span className="text-slate-500 block">Certified Net</span>
                      <strong className="text-teal-800 font-mono text-xs">{user.verifiedKg} Kg</strong>
                    </div>
                  </div>
                </div>

                {/* SECTION 2: MONTHLY ATTENDANCE CALENDAR (OCTOBER 2026) */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-teal-700" />
                        Monthly Attendance Calendar (October 2026)
                      </h4>
                      <p className="text-[10px] text-teal-700 font-semibold">
                        Click on any working date to inspect Route History & GPS stops
                      </p>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {user.presentDays}P · {user.leaveDays}L · {user.absentDays}A
                    </span>
                  </div>

                  {/* Calendar 7-col Grid */}
                  <div className="grid grid-cols-7 gap-1 text-center">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d, i) => (
                      <div
                        key={d}
                        className={`text-[10px] font-bold py-1 ${
                          i === 0 ? 'text-blue-700 border-b-2 border-blue-600 font-extrabold' : 'text-slate-500'
                        }`}
                      >
                        {d}
                      </div>
                    ))}

                    {/* Pad first 4 cells for Thursday start */}
                    {[0, 1, 2, 3].map(pad => (
                      <div key={`modal-pad-${pad}`} className="h-10 bg-slate-50/50 rounded border border-dashed border-slate-200" />
                    ))}

                    {userMonthDays.map((day) => {
                      let bgClass = "bg-slate-50 text-slate-600 border-slate-200";
                      if (day.status === 'present') bgClass = "bg-emerald-50 text-emerald-900 border-emerald-300 hover:bg-emerald-100";
                      else if (day.status === 'absent') bgClass = "bg-rose-50 text-rose-900 border-rose-300";
                      else if (day.status === 'leave') bgClass = "bg-amber-50 text-amber-900 border-amber-300";
                      else if (day.status === 'holiday') bgClass = "bg-slate-100 text-slate-700 border-slate-300";
                      else if (day.status === 'today') bgClass = "bg-teal-700 text-white border-teal-800 ring-2 ring-teal-400";

                      return (
                        <button
                          key={day.day}
                          type="button"
                          onClick={() => handleOpenDayRoute(day, user)}
                          disabled={day.status === 'future' || day.status === 'sunday'}
                          className={`h-11 p-0.5 rounded border text-left flex flex-col justify-between transition-all ${bgClass} ${
                            day.isSunday ? 'border-b-2 border-b-blue-600' : ''
                          } ${day.status !== 'future' && day.status !== 'sunday' ? 'cursor-pointer active:scale-95' : 'cursor-default opacity-85'}`}
                        >
                          <div className="flex items-center justify-between w-full px-0.5">
                            <span className="text-[10px] font-bold">{day.day}</span>
                            {day.status === 'present' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />}
                            {day.status === 'absent' && <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />}
                            {day.status === 'leave' && <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />}
                          </div>

                          <div className="truncate px-0.5 text-[8px] font-mono leading-none">
                            {day.status === 'present' && `${day.schoolsCount} Sch`}
                            {day.status === 'absent' && 'Abs'}
                            {day.status === 'leave' && 'Leave'}
                            {day.status === 'holiday' && 'Hol'}
                            {day.status === 'today' && 'Active'}
                            {day.isSunday && <span className="text-blue-700 font-bold">Sun</span>}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Modal Footer Close */}
                <div className="pt-2 border-t border-slate-100 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setSelectedUserDetail(null)}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold"
                  >
                    Close Coordinator Report
                  </button>
                </div>
              </div>
            </div>
          );
        })()}

        {/* ============================================================ */}
        {/* MODAL 2: DAY ROUTE HISTORY MODAL                             */}
        {/* Triggered when clicking ANY date on any calendar             */}
        {/* ============================================================ */}
        {selectedDayRoute && (
          <div className="fixed inset-0 z-50 bg-slate-900/75 backdrop-blur-xs flex items-center justify-center p-3 animate-in fade-in">
            <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl space-y-3 p-4">
              {/* Header */}
              <div className="flex items-start justify-between border-b border-slate-100 pb-2.5">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">Day Route History Audit</span>
                    <span className="text-[10px] bg-teal-100 text-teal-800 font-mono font-bold px-1.5 py-0.2 rounded border border-teal-300">
                      {selectedDayRoute.date}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">
                    <strong>{selectedDayRoute.coordinatorName}</strong> ({selectedDayRoute.coordinatorId})
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedDayRoute(null)}
                  className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Day Route Stats */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">Waypoints</span>
                  <span className="text-xs font-bold font-mono text-slate-900">{selectedDayRoute.totalLocations} Stops</span>
                </div>
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">Distance Covered</span>
                  <span className="text-xs font-bold font-mono text-teal-800">{selectedDayRoute.totalDistanceKm} km</span>
                </div>
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">Total Shift Hours</span>
                  <span className="text-xs font-bold font-mono text-slate-900">
                    {selectedDayRoute.startTime} - {selectedDayRoute.endTime}
                  </span>
                </div>
              </div>

              {/* Route Map Preview */}
              <div className="rounded-xl overflow-hidden border border-slate-200 shadow-2xs">
                <LeafletRouteMap waypoints={selectedDayRoute.waypoints} height="240px" />
              </div>

              {/* Waypoints Timeline */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-900">Recorded Checkpoints & Tasks on this Day</h4>
                <div className="relative pl-5 space-y-2.5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 max-h-48 overflow-y-auto pr-1">
                  {selectedDayRoute.waypoints.map((wp, idx) => (
                    <div key={wp.id} className="relative text-xs space-y-0.5">
                      <div className="absolute -left-5 top-1 w-4 h-4 rounded-full bg-slate-900 text-white text-[9px] font-bold flex items-center justify-center">
                        {idx + 1}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 text-[11px]">{wp.name}</span>
                        <span className="text-[10px] font-mono font-bold text-teal-800">{wp.time}</span>
                      </div>
                      <p className="text-[11px] text-slate-600">{wp.activity}</p>
                      <span className="text-[9px] text-slate-400 font-mono block">
                        GPS Accuracy: {wp.accuracy} · Status: {wp.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Close Button */}
              <div className="pt-2 border-t border-slate-100 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedDayRoute(null)}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold"
                >
                  Close Route Audit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MobileLayout>
  );
}
