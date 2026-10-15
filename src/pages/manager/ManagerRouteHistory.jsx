import React, { useState } from 'react';
import MobileLayout from '../../layouts/MobileLayout';
import LeafletRouteMap from '../../components/common/LeafletRouteMap';
import { useDemo } from '../../context/DemoContext';
import {
  MapPin,
  Calendar as CalendarIcon,
  User,
  Compass,
  Clock,
  Info,
  CheckCircle2,
  AlertCircle,
  GraduationCap,
  School,
  Scale,
  Truck,
  Building,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  FileText
} from 'lucide-react';

export default function ManagerRouteHistory() {
  const { users, colleges, schools, franchises } = useDemo();
  const coordinators = users.filter(u => u.role === 'volunteer' || u.role === 'coordinator');

  const [selectedVolId, setSelectedVolId] = useState(coordinators[0]?.id || 'USR-001');
  const [selectedDayNum, setSelectedDayNum] = useState(10); // Default to 10 Oct 2026

  const selectedVol = coordinators.find(v => v.id === selectedVolId) || coordinators[0] || {
    name: "Rajesh Kumar",
    empId: "WOW-CRD-101",
    district: "Bhadradri Kothagudem"
  };

  // October 2026 specs: 31 days, starts on Thursday (index 4 in Sun-Sat)
  const daysInMonth = 31;
  const startDayOfWeek = 4; // Oct 1, 2026 = Thursday
  const weekHeaders = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  // Realistic sample institution pool
  const collegeList = [
    { name: "Government Degree College — Bhadrachalam", aishe: "C-27415", category: "Govt Degree & Autonomous" },
    { name: "Singareni Collieries Women's Degree College — Kothagudem", aishe: "C-27488", category: "Collegiate Campus" },
    { name: "SR&BGNR Government Arts & Science College — Khammam", aishe: "C-27390", category: "Autonomous PG Centre" },
    { name: "Priyadarshini Institute of Science & Technology", aishe: "C-27502", category: "Engineering Campus" }
  ];

  const schoolList = [
    { name: "Zilla Parishad High School (ZPHS) Sarapaka", udise: "36210100101" },
    { name: "MPPS Primary School — Burgampahad", udise: "36210100204" },
    { name: "TTWRS Residential School Aswapuram", udise: "36210100312" },
    { name: "Government Model High School — Palwancha", udise: "36210100418" }
  ];

  // Helper to compute rich day summary for any date
  const getDayDetails = (dayNum) => {
    const dateStr = `2026-10-${String(dayNum).padStart(2, '0')}`;
    const dayOfWeek = (startDayOfWeek + (dayNum - 1)) % 7;
    const isSunday = dayOfWeek === 0;

    let status = 'full_day';
    let label = 'Full Day Work';

    if (isSunday) {
      status = 'sunday';
      label = 'Sunday Rest Day';
    } else if (dayNum === 2) {
      status = 'holiday';
      label = 'Gandhi Jayanti';
    } else if (dayNum === 19 || dayNum === 20) {
      status = 'holiday';
      label = 'Dussehra Holiday';
    } else if (dayNum === 15) {
      status = 'today';
      label = 'Active Today';
    } else if (dayNum > 15) {
      status = 'upcoming';
      label = 'Upcoming Working Day';
    } else if (dayNum === 6 && selectedVol.empId === 'WOW-CRD-102') {
      status = 'leave';
      label = 'Casual Leave';
    } else if (dayNum === 13 && selectedVol.empId === 'WOW-CRD-104') {
      status = 'absent';
      label = 'Absent';
    }

    const college = collegeList[(dayNum + (selectedVol.name?.length || 0)) % collegeList.length];
    const school = schoolList[(dayNum + 1) % schoolList.length];
    const franchise = franchises[(dayNum) % (franchises.length || 1)] || { name: "ITC WoW MRF Center — Bhadrachalam" };

    const collectedKg = 240 + (dayNum * 18);
    const verifiedKg = collectedKg - (10 + (dayNum % 5) * 3);
    const students = 80 + (dayNum * 6);
    const distanceKm = (13.5 + (dayNum % 6) * 1.5).toFixed(1);

    // Dynamic Waypoints around the coordinator's cluster
    const latBase = 17.6534 + (dayNum % 5) * 0.007;
    const lngBase = 80.8987 + (dayNum % 6) * 0.006;

    const waypoints = [
      {
        id: `WP-${dayNum}-1`,
        name: `Punch-in Base: MARI Cluster Field Office, Sarapaka`,
        time: `09:0${(dayNum % 5) + 2} AM`,
        lat: latBase,
        lng: lngBase,
        status: "Punch-in Geotag Verified",
        accuracy: "3.2m GPS Lock",
        activity: "Morning Geotagged Attendance Verification"
      },
      {
        id: `WP-${dayNum}-2`,
        name: `${college.name}`,
        time: "10:45 AM",
        lat: latBase + 0.008,
        lng: lngBase + 0.007,
        status: "Campus Visit Conducted",
        accuracy: "3.8m GPS Lock",
        activity: `Conducted Dry Waste Segregation Awareness (${students} students participated)`
      },
      {
        id: `WP-${dayNum}-3`,
        name: `${school.name}`,
        time: "01:15 PM",
        lat: latBase + 0.014,
        lng: lngBase - 0.004,
        status: "ISRC Collection Executed",
        accuracy: "4.1m GPS Lock",
        activity: `Dry recyclables material collection drive: ${collectedKg} Kg recovered`
      },
      {
        id: `WP-${dayNum}-4`,
        name: `${franchise.name} (Weighbridge Checkpoint)`,
        time: "03:30 PM",
        lat: latBase + 0.019,
        lng: lngBase + 0.003,
        status: "Certified Weighbridge Slip",
        accuracy: "3.5m GPS Lock",
        activity: `Material handover: ${verifiedKg} Kg net certified basis electronic weighbridge slip`
      },
      {
        id: `WP-${dayNum}-5`,
        name: `Evening Punch-out: Zonal Hub, Bhadrachalam Road`,
        time: `05:${35 + (dayNum % 20)} PM`,
        lat: latBase + 0.005,
        lng: lngBase - 0.008,
        status: "Evening Punch-out",
        accuracy: "4.0m GPS Lock",
        activity: `Daily field reconciliation, acknowledgement slips verified & shift closed`
      }
    ];

    return {
      dayNum,
      date: dateStr,
      status,
      label,
      isSunday,
      college,
      school,
      franchise,
      collectedKg,
      verifiedKg,
      students,
      distanceKm,
      punchIn: `09:0${(dayNum % 5) + 2} AM`,
      punchOut: `05:${35 + (dayNum % 20)} PM`,
      waypoints
    };
  };

  const activeDay = getDayDetails(selectedDayNum);
  const isOffDay = activeDay.isSunday || activeDay.status === 'holiday' || activeDay.status === 'leave' || activeDay.status === 'absent' || activeDay.status === 'upcoming';

  return (
    <MobileLayout title="Route History Audit" showBack={true} role="manager">
      <div className="space-y-3.5 pb-6">
        {/* Field Coordinator Selector */}
        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs space-y-1.5">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
            Select Field Coordinator
          </label>
          <select
            value={selectedVolId}
            onChange={(e) => setSelectedVolId(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 text-xs font-bold rounded-lg px-2.5 py-2 text-slate-900 outline-none font-mono focus:border-teal-700 shadow-2xs"
          >
            {coordinators.map(v => (
              <option key={v.id} value={v.id}>
                {v.name} ({v.empId}) — {v.district}
              </option>
            ))}
          </select>
        </div>

        {/* MONTHLY CALENDAR PICKER (JUST LIKE VOLUNTEER CALENDAR) */}
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs space-y-2.5">
          {/* Calendar Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div className="flex items-center gap-1.5">
              <CalendarIcon className="w-4 h-4 text-teal-700" />
              <div>
                <h3 className="text-xs font-bold text-slate-900">
                  Select Working Date from Calendar
                </h3>
                <p className="text-[10px] text-slate-500">
                  Tap any date to inspect colleges visited, dry waste collected & GPS trail
                </p>
              </div>
            </div>
            <span className="text-[10px] bg-teal-50 text-teal-800 px-2 py-0.5 rounded border border-teal-200 font-mono font-bold">
              October 2026
            </span>
          </div>

          {/* PRD Legend */}
          <div className="flex flex-wrap items-center gap-2 text-[9px] font-medium text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-200">
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-teal-700"></span>
              <span>Full Day (Trail Logged)</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-blue-600 ring-1 ring-blue-300"></span>
              <span>Today</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-purple-600"></span>
              <span>Leave</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-rose-600"></span>
              <span>Absent</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-slate-400"></span>
              <span>Holiday</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-0.5 bg-blue-600"></span>
              <span>Sunday (Rest Day)</span>
            </div>
          </div>

          {/* Weekday Header */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {weekHeaders.map((day, idx) => (
              <span
                key={idx}
                className={`text-[10px] font-bold py-0.5 ${
                  idx === 0 ? 'text-blue-700 border-b-2 border-blue-600 font-extrabold' : 'text-slate-500'
                }`}
              >
                {day}
              </span>
            ))}
          </div>

          {/* Days Grid 1-31 */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {/* Pad slots before Oct 1 (Thu = 4 empty) */}
            {Array.from({ length: startDayOfWeek }).map((_, i) => (
              <div key={`empty-${i}`} className="h-10 rounded-lg bg-slate-50/40 border border-dashed border-slate-200" />
            ))}

            {Array.from({ length: daysInMonth }).map((_, i) => {
              const dayNum = i + 1;
              const dayInfo = getDayDetails(dayNum);
              const isSelected = selectedDayNum === dayNum;

              let dotClass = 'bg-slate-300';
              if (dayInfo.status === 'full_day') dotClass = 'bg-teal-700';
              else if (dayInfo.status === 'today') dotClass = 'bg-blue-600';
              else if (dayInfo.status === 'leave') dotClass = 'bg-purple-600';
              else if (dayInfo.status === 'absent') dotClass = 'bg-rose-600';
              else if (dayInfo.status === 'holiday') dotClass = 'bg-slate-400';

              return (
                <button
                  key={dayNum}
                  type="button"
                  onClick={() => setSelectedDayNum(dayNum)}
                  className={`h-11 rounded-lg flex flex-col items-center justify-between py-1 px-0.5 relative transition-all text-xs font-semibold ${
                    isSelected
                      ? 'border-2 border-teal-700 bg-teal-50 shadow-xs ring-1 ring-teal-600'
                      : 'border border-slate-200 bg-white hover:bg-slate-50'
                  } ${dayInfo.isSunday ? 'border-b-2 border-b-blue-600' : ''}`}
                >
                  <div className="flex items-center justify-between w-full px-1">
                    <span className={`text-[11px] ${isSelected ? 'font-bold text-teal-950' : 'text-slate-800'}`}>
                      {dayNum}
                    </span>
                    {!dayInfo.isSunday && (
                      <span className={`w-1.5 h-1.5 rounded-full ${dotClass}`}></span>
                    )}
                  </div>

                  <span className="text-[8px] font-mono text-slate-500 leading-none truncate w-full px-0.5">
                    {dayInfo.isSunday ? (
                      <strong className="text-blue-700">Sun</strong>
                    ) : dayInfo.status === 'today' ? (
                      <strong className="text-blue-700">Today</strong>
                    ) : dayInfo.status === 'full_day' ? (
                      `${dayInfo.collectedKg}k`
                    ) : dayInfo.status === 'leave' ? (
                      'Leave'
                    ) : dayInfo.status === 'absent' ? (
                      'Abs'
                    ) : dayInfo.status === 'holiday' ? (
                      'Hol'
                    ) : (
                      '-'
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ============================================================ */}
        {/* SELECTED DAY FIELD EXECUTION SUMMARY CARD                    */}
        {/* "which college he went how much he collected route trail"    */}
        {/* ============================================================ */}
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-start justify-between border-b border-slate-100 pb-2.5">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-900">Field Operations Summary</span>
                <span className="text-[10px] font-mono font-bold bg-teal-100 text-teal-900 px-2 py-0.2 rounded border border-teal-300">
                  {activeDay.date}
                </span>
              </div>
              <p className="text-[11px] text-slate-600 mt-0.5">
                Officer: <strong className="text-slate-900">{selectedVol.name}</strong> ({selectedVol.empId}) · {selectedVol.district}
              </p>
            </div>

            <span className={`text-[10px] font-bold px-2 py-0.5 rounded border font-mono ${
              activeDay.status === 'full_day' || activeDay.status === 'today'
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                : activeDay.isSunday
                ? 'bg-blue-50 text-blue-800 border-blue-300'
                : 'bg-amber-50 text-amber-800 border-amber-300'
            }`}>
              {activeDay.label}
            </span>
          </div>

          {!isOffDay ? (
            <div className="space-y-3">
              {/* College Visited Box */}
              <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-200 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-blue-950 flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-blue-700" />
                    College Visited:
                  </span>
                  <span className="text-[10px] bg-blue-100 text-blue-800 px-1.5 py-0.2 rounded font-mono font-bold border border-blue-300">
                    AISHE: {activeDay.college.aishe}
                  </span>
                </div>
                <h4 className="text-xs font-extrabold text-blue-900">
                  {activeDay.college.name}
                </h4>
                <div className="flex items-center justify-between text-[11px] text-blue-800 pt-1 border-t border-blue-200/60 font-mono">
                  <span>Programme: Campus Dry Waste Segregation</span>
                  <span><strong>{activeDay.students}</strong> Students Participated</span>
                </div>
              </div>

              {/* Quantity Collected & Verified Box */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 bg-emerald-50/70 rounded-xl border border-emerald-200 space-y-1">
                  <span className="text-[10px] text-emerald-900 font-semibold block flex items-center gap-1">
                    <Scale className="w-3.5 h-3.5 text-emerald-700" />
                    Total Dry Waste Collected
                  </span>
                  <div className="text-base font-extrabold text-emerald-900 font-mono">
                    {activeDay.collectedKg} Kg
                  </div>
                  <span className="text-[10px] text-emerald-800 block">
                    Combined from School + College drives
                  </span>
                </div>

                <div className="p-2.5 bg-teal-50/70 rounded-xl border border-teal-200 space-y-1">
                  <span className="text-[10px] text-teal-900 font-semibold block flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-teal-700" />
                    Weighbridge Certified Net
                  </span>
                  <div className="text-base font-extrabold text-teal-900 font-mono">
                    {activeDay.verifiedKg} Kg
                  </div>
                  <span className="text-[10px] text-teal-800 block truncate">
                    Verified at: {activeDay.franchise.name.split('—')[0]}
                  </span>
                </div>
              </div>

              {/* Shift Hours & Distance Strip */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">Waypoints</span>
                  <span className="text-xs font-bold font-mono text-slate-900">
                    {activeDay.waypoints.length} Checkpoints
                  </span>
                </div>
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">Logged Distance</span>
                  <span className="text-xs font-bold font-mono text-teal-800">
                    {activeDay.distanceKm} km
                  </span>
                </div>
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">Duty Timings</span>
                  <span className="text-xs font-bold font-mono text-slate-900">
                    {activeDay.punchIn} - {activeDay.punchOut}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center space-y-1 text-xs">
              <AlertCircle className="w-6 h-6 text-slate-400 mx-auto" />
              <h4 className="font-bold text-slate-800">{activeDay.label}</h4>
              <p className="text-[11px] text-slate-500">
                {activeDay.isSunday
                  ? 'Official Weekly Rest Day. No field visits, collection drives, or route trails are logged on Sundays per ITC WoW guidelines.'
                  : activeDay.status === 'holiday'
                  ? 'Gazetted public holiday. Field operations suspended.'
                  : activeDay.status === 'leave'
                  ? 'Coordinator was on pre-approved leave. No field movement recorded.'
                  : activeDay.status === 'absent'
                  ? 'Coordinator marked absent for this date. No attendance punch recorded.'
                  : 'Future scheduled date. Field operations will be logged upon coordinator punch-in.'}
              </p>
            </div>
          )}
        </div>

        {/* ============================================================ */}
        {/* ROUTE TRAIL MAP & HISTORICAL CHECKPOINTS TIMELINE             */}
        {/* ============================================================ */}
        {!isOffDay && (
          <div className="space-y-3">
            {/* Route Map Preview */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs px-1">
                <span className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-teal-700" />
                  Route Trail & Geotagged Waypoints for {activeDay.date}
                </span>
                <span className="text-[10px] text-emerald-700 font-mono font-bold bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                  100% GPS Locked
                </span>
              </div>
              <div className="rounded-xl overflow-hidden border border-slate-200 shadow-xs">
                <LeafletRouteMap waypoints={activeDay.waypoints} height="280px" />
              </div>
            </div>

            {/* Checkpoints Timeline */}
            <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h4 className="text-xs font-bold text-slate-900">
                  Chronological Stop Timeline ({activeDay.date})
                </h4>
                <span className="text-[10px] text-slate-500 font-mono">
                  {activeDay.waypoints.length} Checkpoints
                </span>
              </div>

              <div className="relative pl-6 space-y-3.5 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                {activeDay.waypoints.map((wp, idx) => (
                  <div key={wp.id} className="relative">
                    <div className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-slate-900 border-2 border-white text-white text-[10px] font-bold flex items-center justify-center">
                      {idx + 1}
                    </div>

                    <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">{wp.name}</span>
                        <span className="font-mono text-teal-800 text-[11px] font-bold">{wp.time}</span>
                      </div>
                      <p className="text-[11px] text-slate-700 font-medium">{wp.activity}</p>
                      <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono pt-0.5">
                        <span>{wp.lat.toFixed(4)}° N, {wp.lng.toFixed(4)}° E</span>
                        <span className="text-emerald-700 font-semibold">{wp.accuracy}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </MobileLayout>
  );
}
