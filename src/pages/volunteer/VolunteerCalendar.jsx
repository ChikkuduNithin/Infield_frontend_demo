import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDemo } from '../../context/DemoContext';
import MobileLayout from '../../layouts/MobileLayout';
import Modal from '../../components/common/Modal';
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Calendar as CalendarIcon,
  CheckCircle2,
  AlertCircle,
  FileText,
  UploadCloud,
  Send,
  HelpCircle,
  Info
} from 'lucide-react';

export default function VolunteerCalendar() {
  const navigate = useNavigate();
  const { calendarAttendance, currentCoordinator, addCorrectionRequest, correctionRequests } = useDemo();

  const [selectedDay, setSelectedDay] = useState(calendarAttendance.find(d => d.isToday) || calendarAttendance[calendarAttendance.length - 1]);
  const [showCorrectionModal, setShowCorrectionModal] = useState(false);

  // Form states for Correction Request
  const [correctionCategory, setCorrectionCategory] = useState('Missed punch in/ out');
  const [correctionDate, setCorrectionDate] = useState('2026-10-13');
  const [correctionReason, setCorrectionReason] = useState('');
  const [requestedPunchIn, setRequestedPunchIn] = useState('09:00 AM');
  const [requestedPunchOut, setRequestedPunchOut] = useState('05:30 PM');
  const [leaveApprovalFile, setLeaveApprovalFile] = useState('Leave_Approval_Manager_Signed.pdf');
  const [submitting, setSubmitting] = useState(false);
  const [requestSuccess, setRequestSuccess] = useState(false);

  // October 2026
  const daysInMonth = 31;
  const startDayOfWeek = 4; // Starts Thursday
  const weekHeaders = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const getDayData = (dayNumber) => {
    return calendarAttendance.find(d => d.day === dayNumber);
  };

  const handleCorrectionSubmit = (e) => {
    e.preventDefault();
    if (!correctionReason.trim()) {
      alert('Please state the justification or reason for attendance correction.');
      return;
    }
    if (correctionCategory === 'Changing Absent to Leave' && !leaveApprovalFile) {
      alert('PRD Requirement: Uploading Leave Approval document in PDF/Image format is mandatory for changing Absent to Leave.');
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      addCorrectionRequest({
        coordinatorId: currentCoordinator.id,
        coordinatorName: currentCoordinator.name,
        date: correctionDate,
        category: correctionCategory,
        reason: correctionReason,
        proofUrl: 'https://example.com/leave_approval.pdf',
        requestedPunchIn: requestedPunchIn,
        requestedPunchOut: requestedPunchOut
      });
      setSubmitting(false);
      setRequestSuccess(true);
    }, 600);
  };

  return (
    <MobileLayout title="Attendance & Tasks Calendar" showBack={true} role="coordinator">
      <div className="space-y-3.5 pb-4">
        {/* Month Selector Bar */}
        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs flex items-center justify-between">
          <button
            onClick={() => alert('Viewing October 2026')}
            className="w-7 h-7 rounded border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="text-center">
            <h2 className="text-xs font-bold text-slate-900">October 2026</h2>
            <p className="text-[10px] text-slate-500">22 Working Days · 4 Sundays · 1 Gazetted Holiday</p>
          </div>
          <button
            onClick={() => alert('Viewing October 2026')}
            className="w-7 h-7 rounded border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* PRD Color Code Legend */}
        <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs text-[10px]">
          <span className="font-bold text-slate-700 block mb-1 uppercase tracking-wider text-[9px]">
            PRD Attendance Legend
          </span>
          <div className="grid grid-cols-4 gap-1.5 font-medium text-slate-600">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-teal-600"></span>
              <span>Full Day</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              <span>Half Day</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-600"></span>
              <span>Absent</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-600"></span>
              <span>Leave</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500 ring-2 ring-blue-300"></span>
              <span>Today</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-slate-400"></span>
              <span>Holiday</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Corrected</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-0.5 bg-blue-600"></span>
              <span>Sunday</span>
            </div>
          </div>
        </div>

        {/* Calendar Grid Container */}
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          {/* Weekday Header */}
          <div className="grid grid-cols-7 gap-1 text-center mb-1.5">
            {weekHeaders.map((day, idx) => (
              <span
                key={idx}
                className={`text-[10px] font-bold py-0.5 ${
                  idx === 0 ? 'text-blue-700' : 'text-slate-500'
                }`}
              >
                {day}
              </span>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {/* Empty slots before Oct 1 */}
            {Array.from({ length: startDayOfWeek }).map((_, i) => (
              <div key={`empty-${i}`} className="h-9 rounded-lg bg-slate-50/50" />
            ))}

            {/* Days 1 to 31 */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const dayNum = i + 1;
              const data = getDayData(dayNum);
              const dayOfWeek = (startDayOfWeek + i) % 7;
              const isSunday = dayOfWeek === 0;
              const isSelected = selectedDay && selectedDay.day === dayNum;

              // PRD Status color matching
              let badgeColor = '';
              if (data) {
                if (data.status === 'today') badgeColor = 'bg-blue-600 text-white';
                else if (data.status === 'full_day') badgeColor = 'bg-teal-700 text-white';
                else if (data.status === 'half_day') badgeColor = 'bg-amber-500 text-white';
                else if (data.status === 'absent') badgeColor = 'bg-rose-600 text-white';
                else if (data.status === 'leave') badgeColor = 'bg-purple-600 text-white';
                else if (data.status === 'holiday') badgeColor = 'bg-slate-400 text-white';
                else if (data.status === 'corrected') badgeColor = 'bg-emerald-600 text-white';
              }

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
                        note: isSunday ? 'Weekly Rest Day' : 'Upcoming scheduled working day',
                        punchIn: '-',
                        punchOut: '-'
                      });
                    }
                  }}
                  className={`h-9 rounded-lg flex flex-col items-center justify-between py-1 relative transition-all text-xs font-semibold ${
                    isSelected
                      ? 'border-2 border-teal-700 bg-teal-50/50 shadow-xs'
                      : 'border border-slate-100 hover:bg-slate-50'
                  } ${
                    isSunday ? 'border-b-2 border-b-blue-600' : ''
                  }`}
                >
                  <span className={`text-[11px] ${isSelected ? 'font-bold text-slate-900' : 'text-slate-700'}`}>
                    {dayNum}
                  </span>

                  {data ? (
                    <span className={`w-1.5 h-1.5 rounded-full ${badgeColor}`}></span>
                  ) : (
                    <span className="w-1 h-1 rounded-full bg-slate-200"></span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Day Detail Panel */}
        {selectedDay && (
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs space-y-2 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Date Inspection
                </span>
                <h3 className="font-bold text-slate-900 text-xs">
                  {selectedDay.date} ({selectedDay.dayOfWeek || 'Day ' + selectedDay.day})
                </h3>
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                selectedDay.status === 'today'
                  ? 'bg-blue-100 text-blue-800'
                  : selectedDay.status === 'full_day'
                    ? 'bg-teal-100 text-teal-800'
                    : selectedDay.status === 'half_day'
                      ? 'bg-amber-100 text-amber-800'
                      : selectedDay.status === 'absent'
                        ? 'bg-rose-100 text-rose-800'
                        : selectedDay.status === 'leave'
                          ? 'bg-purple-100 text-purple-800'
                          : selectedDay.status === 'corrected'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-100 text-slate-700'
              }`}>
                {selectedDay.status.replace('_', ' ')}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-700">
              <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-500 block">Punch-In</span>
                <span className="font-mono font-bold text-slate-900">{selectedDay.punchIn || '-'}</span>
              </div>
              <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-500 block">Punch-Out</span>
                <span className="font-mono font-bold text-slate-900">{selectedDay.punchOut || '-'}</span>
              </div>
            </div>

            {selectedDay.kgCollected && (
              <div className="p-2 bg-teal-50 border border-teal-200 rounded-lg text-teal-900 text-[11px]">
                Material Collected: <strong>{selectedDay.kgCollected} Kg</strong> · Outreaches: <strong>{selectedDay.schools} institutions</strong>
              </div>
            )}

            {selectedDay.note && (
              <div className="text-[11px] text-slate-500 italic">
                Note: {selectedDay.note}
              </div>
            )}
          </div>
        )}

        {/* Raise Correction Request CTA (PRD Requirement) */}
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-slate-900">Attendance Correction</h4>
              <p className="text-[11px] text-slate-500">
                Missed punch-in/out or convert Absent to Approved Leave.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setShowCorrectionModal(true);
                setRequestSuccess(false);
              }}
              className="px-2.5 py-1.5 bg-teal-700 hover:bg-teal-800 text-white rounded text-xs font-bold transition-all shadow-2xs"
            >
              Raise Request
            </button>
          </div>
        </div>
      </div>

      {/* MODAL: Raise Attendance Correction Request (PRD Requirement) */}
      <Modal
        isOpen={showCorrectionModal}
        onClose={() => setShowCorrectionModal(false)}
        title="Raise Attendance Correction Request"
      >
        {requestSuccess ? (
          <div className="p-4 text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-teal-600 mx-auto" />
            <h4 className="text-xs font-bold text-slate-900">Correction Request Submitted</h4>
            <p className="text-[11px] text-slate-600">
              Request forwarded to <strong>Vikramaditya Rao (Manager)</strong> for verification. Status is tracking under 'Pending Approval'.
            </p>
            <button
              type="button"
              onClick={() => setShowCorrectionModal(false)}
              className="w-full py-2 bg-teal-700 text-white rounded text-xs font-bold"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleCorrectionSubmit} className="space-y-3 text-xs">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Correction Category *
              </label>
              <select
                value={correctionCategory}
                onChange={(e) => setCorrectionCategory(e.target.value)}
                className="w-full py-2 px-2.5 bg-white border border-slate-300 rounded text-xs text-slate-800 font-semibold outline-none focus:border-teal-600"
              >
                <option value="Missed punch in/ out">Missed punch in/ out</option>
                <option value="Changing Absent to Leave">Changing Absent to Leave (Requires pre-approval)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Correction Date *
              </label>
              <input
                type="date"
                value={correctionDate}
                onChange={(e) => setCorrectionDate(e.target.value)}
                className="w-full py-2 px-2.5 bg-slate-50 border border-slate-300 rounded text-xs text-slate-800 font-mono outline-none"
              />
            </div>

            {correctionCategory === 'Missed punch in/ out' && (
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Actual Punch-In</label>
                  <input
                    type="text"
                    value={requestedPunchIn}
                    onChange={(e) => setRequestedPunchIn(e.target.value)}
                    className="w-full py-1.5 px-2 bg-slate-50 border border-slate-300 rounded text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Actual Punch-Out</label>
                  <input
                    type="text"
                    value={requestedPunchOut}
                    onChange={(e) => setRequestedPunchOut(e.target.value)}
                    className="w-full py-1.5 px-2 bg-slate-50 border border-slate-300 rounded text-xs font-mono"
                  />
                </div>
              </div>
            )}

            {/* PRD Spec: "Option to upload Leave approval (in PDF/ IMAGE format) shall be made mandatory in this case." */}
            {correctionCategory === 'Changing Absent to Leave' && (
              <div className="bg-purple-50 p-2.5 rounded border border-purple-200 space-y-1.5">
                <label className="block text-xs font-bold text-purple-900">
                  Mandatory Manager Leave Approval Form * (PDF/Image)
                </label>
                <div className="flex items-center justify-between bg-white p-2 rounded border border-purple-300">
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-700">
                    <FileText className="w-4 h-4 text-purple-700" />
                    <span>{leaveApprovalFile}</span>
                  </div>
                  <span className="text-[10px] bg-purple-100 text-purple-800 px-1.5 py-0.5 rounded font-bold">
                    Attached
                  </span>
                </div>
                <p className="text-[10px] text-purple-800">
                  PRD compliance rule: Leave approvals must be pre-approved by Manager before conversion.
                </p>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Field Justification / Reason *
              </label>
              <textarea
                rows={2}
                value={correctionReason}
                onChange={(e) => setCorrectionReason(e.target.value)}
                placeholder="Explain why punch was missed or details of manager pre-approval..."
                className="w-full py-1.5 px-2.5 bg-slate-50 border border-slate-300 rounded text-xs text-slate-800 resize-none outline-none focus:border-teal-600"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-2 bg-teal-700 hover:bg-teal-800 text-white rounded text-xs font-bold flex items-center justify-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{submitting ? 'Submitting to Manager...' : 'Submit Correction Request'}</span>
            </button>
          </form>
        )}
      </Modal>
    </MobileLayout>
  );
}
