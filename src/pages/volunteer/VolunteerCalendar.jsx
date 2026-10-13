import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDemo } from '../../context/DemoContext';
import MobileLayout from '../../layouts/MobileLayout';
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  School,
  Users,
  CheckCircle2,
  XCircle,
  Calendar as CalendarIcon,
  Info
} from 'lucide-react';

export default function VolunteerCalendar() {
  const navigate = useNavigate();
  const { calendarAttendance, currentVolunteer } = useDemo();

  const [currentMonthIndex, setCurrentMonthIndex] = useState(9); // October (0-indexed: 9)
  const [selectedDay, setSelectedDay] = useState(calendarAttendance.find(d => d.isToday) || calendarAttendance[0]);

  // October 2026 configuration:
  // Starts on Thursday (day index 4: Sun=0, Mon=1, Tue=2, Wed=3, Thu=4, Fri=5, Sat=6)
  // Total days in Oct: 31
  const daysInMonth = 31;
  const startDayOfWeek = 4; // Thursday

  const weekHeaders = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  // Map day numbers to attendance data
  const getDayData = (dayNumber) => {
    return calendarAttendance.find(d => d.day === dayNumber);
  };

  return (
    <MobileLayout title="Attendance Calendar" showBack={true} role="volunteer">
      <div className="space-y-4 pb-4">
        {/* Month Selector Bar */}
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <button
            onClick={() => alert('Simulated calendar: viewing October 2026')}
            className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="text-center">
            <h2 className="text-sm font-bold text-slate-900">October 2026</h2>
            <p className="text-[10px] text-slate-500">22 Working Days · 4 Sundays · 1 Holiday</p>
          </div>
          <button
            onClick={() => alert('Simulated calendar: viewing October 2026')}
            className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Calendar Grid Container */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          {/* Weekday Header */}
          <div className="grid grid-cols-7 gap-1 text-center mb-2">
            {weekHeaders.map((day, idx) => (
              <span
                key={idx}
                className={`text-[11px] font-bold py-1 ${
                  idx === 0 ? 'text-blue-600' : 'text-slate-500'
                }`}
              >
                {day}
              </span>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1.5 text-center">
            {/* Empty slots before day 1 */}
            {Array.from({ length: startDayOfWeek }).map((_, i) => (
              <div key={`empty-${i}`} className="h-10 rounded-xl bg-slate-50/50" />
            ))}

            {/* October Days 1 to 31 */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const dayNum = i + 1;
              const data = getDayData(dayNum);
              const dayOfWeek = (startDayOfWeek + i) % 7;
              const isSunday = dayOfWeek === 0;
              const isSelected = selectedDay && selectedDay.day === dayNum;

              // Indicators
              const isPresent = data && (data.status === 'present' || data.status === 'present_today');
              const isAbsent = data && data.status === 'absent';
              const isHoliday = data && data.status === 'holiday';

              return (
                <button
                  key={dayNum}
                  onClick={() => {
                    if (data) setSelectedDay(data);
                    else {
                      setSelectedDay({
                        day: dayNum,
                        date: `2026-10-${String(dayNum).padStart(2, '0')}`,
                        status: isSunday ? 'sunday' : 'upcoming',
                        note: isSunday ? 'Weekly Rest Day' : 'Upcoming working day',
                        punchIn: '-',
                        punchOut: '-'
                      });
                    }
                  }}
                  className={`h-11 rounded-xl flex flex-col items-center justify-between py-1 px-0.5 relative transition-all text-xs font-semibold ${
                    isSelected
                      ? 'ring-2 ring-emerald-500 shadow-md bg-emerald-50/40'
                      : 'hover:bg-slate-50'
                  } ${
                    isSunday ? 'text-blue-600' : 'text-slate-700'
                  }`}
                >
                  {/* Day number */}
                  <span className={`text-xs ${isSelected ? 'font-extrabold text-slate-900' : ''}`}>
                    {dayNum}
                  </span>

                  {/* Indicator Dot / Chip */}
                  <div className="flex items-center justify-center h-2">
                    {isPresent && (
                      <span className="w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-emerald-200"></span>
                    )}
                    {isAbsent && (
                      <span className="w-2 h-2 rounded-full bg-rose-500 ring-2 ring-rose-200"></span>
                    )}
                    {isHoliday && (
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                    )}
                    {!data && !isSunday && (
                      <span className="w-1 h-1 rounded-full bg-slate-200"></span>
                    )}
                  </div>

                  {/* Sunday Blue Underline indicator as required */}
                  {isSunday && (
                    <div className="w-5 h-0.5 bg-blue-500 rounded-full mt-0.5"></div>
                  )}
                  {!isSunday && <div className="h-0.5"></div>}
                </button>
              );
            })}
          </div>

          {/* Color Legend */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-600">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span>Present</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
              <span>Absent</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-1 bg-blue-500 rounded-full"></span>
              <span className="text-blue-600 font-medium">Sunday</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              <span>Holiday</span>
            </div>
          </div>
        </div>

        {/* Selected Day Detail Panel */}
        {selectedDay && (
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Day Details
                </span>
                <h3 className="text-xs font-bold text-slate-900">
                  {selectedDay.date ? `${selectedDay.date} (${selectedDay.dayOfWeek || 'Working Day'})` : `Day ${selectedDay.day}`}
                </h3>
              </div>
              <div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                  selectedDay.status === 'present' || selectedDay.status === 'present_today'
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    : selectedDay.status === 'absent'
                      ? 'bg-rose-100 text-rose-800 border border-rose-200'
                      : selectedDay.status === 'sunday'
                        ? 'bg-blue-100 text-blue-800 border border-blue-200'
                        : 'bg-slate-100 text-slate-700'
                }`}>
                  {selectedDay.status === 'present_today' ? 'Present Today' : selectedDay.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-500 block">Punch In</span>
                <span className="font-bold text-slate-800 font-mono">{selectedDay.punchIn || '-'}</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-500 block">Punch Out</span>
                <span className="font-bold text-slate-800 font-mono">{selectedDay.punchOut || '-'}</span>
              </div>
            </div>

            {selectedDay.schools !== undefined && (
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <School className="w-4 h-4 text-emerald-600" />
                  <span className="text-slate-600">Schools Visited:</span>
                  <span className="font-bold text-slate-900">{selectedDay.schools}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-600" />
                  <span className="text-slate-600">Students Reached:</span>
                  <span className="font-bold text-slate-900">{selectedDay.students}</span>
                </div>
              </div>
            )}

            {selectedDay.note && (
              <div className="p-2 rounded-lg bg-amber-50 text-amber-900 border border-amber-200/80 text-[11px] flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                <span>{selectedDay.note}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </MobileLayout>
  );
}
