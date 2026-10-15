import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDemo } from '../../context/DemoContext';
import MobileLayout from '../../layouts/MobileLayout';
import { WOW_TASK_CATEGORIES } from '../../data/mockData';
import {
  School,
  GraduationCap,
  Building2,
  Home,
  Briefcase,
  Users,
  Camera,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  FileText,
  Calendar,
  Clock,
  ArrowRight,
  ShieldCheck,
  Recycle,
  Scale
} from 'lucide-react';

export default function VolunteerSchoolForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialTaskType = searchParams.get('type') || 'school_visit';
  const initialSubTask = searchParams.get('sub') || (initialTaskType === 'school_visit' ? 'isrs_permission' : '');

  const {
    schools,
    colleges,
    corporates,
    franchises,
    municipalities,
    addActivity,
    currentCoordinator
  } = useDemo();

  // Selected main task & subtask
  const [taskType, setTaskType] = useState(initialTaskType);
  const [subTask, setSubTask] = useState(
    initialSubTask || (WOW_TASK_CATEGORIES.find(c => c.id === initialTaskType)?.subTasks[0]?.id || '')
  );

  // General field state
  const [selectedEntityId, setSelectedEntityId] = useState('');
  const [remarks, setRemarks] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // 1. Permission Subtask State
  const [confirmationDateReceived, setConfirmationDateReceived] = useState('Yes'); // 'Yes' | 'No' | 'Permission Denied'
  const [scheduledDate, setScheduledDate] = useState('2026-10-28');
  const [followUpDate, setFollowUpDate] = useState('2026-10-24');
  const [consentFormUploaded, setConsentFormUploaded] = useState(true);

  // 2. Awareness Session Subtask State
  const [participantsCount, setParticipantsCount] = useState('65');
  const [sessionPhotoUploaded, setSessionPhotoUploaded] = useState(true);
  const [awarenessAckUploaded, setAwarenessAckUploaded] = useState(true);

  // 3. Collection Drive Subtask State
  const [conductedBy, setConductedBy] = useState('Self'); // 'Self' | 'Volunteer'
  const [selectedFranchiseId, setSelectedFranchiseId] = useState(franchises[0]?.id || '');
  const [day1QuantityKg, setDay1QuantityKg] = useState('320');
  const [collectionPhotosUploaded, setCollectionPhotosUploaded] = useState(true);
  const [collectionDriveCompleted, setCollectionDriveCompleted] = useState('Yes'); // 'Yes' | 'No'
  // If No -> Day 2 fields
  const [day2QuantityKg, setDay2QuantityKg] = useState('110');
  const [day2PhotosUploaded, setDay2PhotosUploaded] = useState(true);
  // Verified Material Quantity (weighbridge receipt from franchise <= collected)
  const [verifiedQuantityKg, setVerifiedQuantityKg] = useState('310');
  const [collectionAckUploaded, setCollectionAckUploaded] = useState(true);
  // Multi-entity collection option
  const [additionalEntities, setAdditionalEntities] = useState([]);

  // 4. Household Propagation State
  const [selectedMunicipality, setSelectedMunicipality] = useState(municipalities[0]);
  const [householdsCovered, setHouseholdsCovered] = useState('42');
  const [registerBookPhotoUploaded, setRegisterBookPhotoUploaded] = useState(true);

  // 5. Office Visits State
  const [officeOption, setOfficeOption] = useState('Visiting NGO office for Office Work');

  // 6. Other Activities State
  const [otherActivityOption, setOtherActivityOption] = useState('Community Engagement Activities');

  // Update subtask when taskType changes
  useEffect(() => {
    const currentCat = WOW_TASK_CATEGORIES.find(c => c.id === taskType);
    if (currentCat && currentCat.subTasks.length > 0) {
      if (!currentCat.subTasks.some(st => st.id === subTask)) {
        setSubTask(currentCat.subTasks[0].id);
      }
    }
  }, [taskType]);

  // Set default entity
  useEffect(() => {
    if (taskType === 'school_visit') setSelectedEntityId(schools[0]?.id || '');
    else if (taskType === 'college_visit') setSelectedEntityId(colleges[0]?.id || '');
    else if (taskType === 'corporate_visit') setSelectedEntityId(corporates[0]?.id || '');
  }, [taskType, schools, colleges, corporates]);

  // Calculate totals
  const totalCollectedKg = collectionDriveCompleted === 'Yes'
    ? Number(day1QuantityKg) || 0
    : (Number(day1QuantityKg) || 0) + (Number(day2QuantityKg) || 0);

  const totalVerifiedKg = Number(verifiedQuantityKg) || 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const currentCat = WOW_TASK_CATEGORIES.find(c => c.id === taskType);
    const currentSub = currentCat?.subTasks.find(s => s.id === subTask);

    let entityName = '';
    if (taskType === 'school_visit') entityName = schools.find(s => s.id === selectedEntityId)?.name || 'ZPHS Sarapaka';
    else if (taskType === 'college_visit') entityName = colleges.find(c => c.id === selectedEntityId)?.name || 'Govt Degree College';
    else if (taskType === 'corporate_visit') entityName = corporates.find(c => c.id === selectedEntityId)?.name || 'ITC PSPD Sarapaka';
    else if (taskType === 'household_propagation') entityName = selectedMunicipality;
    else if (taskType === 'office_visit') entityName = officeOption;
    else entityName = otherActivityOption;

    const franchise = franchises.find(f => f.id === selectedFranchiseId);

    setTimeout(() => {
      addActivity({
        taskType,
        subTask,
        taskName: currentSub?.label || currentCat?.label,
        entityName,
        district: currentCoordinator.district,
        conductedBy,
        franchiseName: franchise?.name || 'ITC WoW MRF Center',
        quantityCollected: totalCollectedKg,
        verifiedQuantity: totalVerifiedKg,
        acknowledgementUploaded: collectionAckUploaded,
        remarks: remarks || 'Operation executed per ITC WoW PRD v3 guidelines.',
        photoUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=400&auto=format&fit=crop&q=80'
      });

      setIsSubmitting(false);
      setIsSuccess(true);
      setSuccessMessage(`${currentSub?.label || currentCat?.label} for ${entityName} logged successfully.`);
    }, 600);
  };

  const currentCategory = WOW_TASK_CATEGORIES.find(c => c.id === taskType);

  return (
    <MobileLayout title="Field Task Submission" showBack={true} role="coordinator">
      <div className="space-y-3 pb-6">
        {/* Top Task Type Selector Dropdown */}
        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs space-y-2">
          <label className="block text-xs font-bold text-slate-800">
            Select Task Category *
          </label>
          <select
            value={taskType}
            onChange={(e) => {
              setTaskType(e.target.value);
              setIsSuccess(false);
            }}
            className="w-full py-2 px-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-slate-900 outline-none focus:border-teal-700"
          >
            {WOW_TASK_CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                [{c.code}] {c.label}
              </option>
            ))}
          </select>

          {/* Subtask Pills for Categories with multiple subtasks */}
          {currentCategory?.subTasks.length > 1 && (
            <div className="pt-1 border-t border-slate-100">
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Sub-Activity *
              </label>
              <div className="flex flex-col gap-1.5">
                {currentCategory.subTasks.map((st) => (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => {
                      setSubTask(st.id);
                      setIsSuccess(false);
                    }}
                    className={`py-1.5 px-2.5 rounded-lg text-left text-xs font-semibold transition-all flex items-center justify-between border ${
                      subTask === st.id
                        ? 'bg-teal-700 text-white border-teal-800 shadow-2xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <span>{st.label}</span>
                    {subTask === st.id && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {isSuccess ? (
          <div className="bg-white rounded-xl border border-teal-200 p-5 shadow-2xs text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-teal-700 mx-auto" />
            <div>
              <span className="text-[10px] font-bold text-teal-800 uppercase tracking-widest bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                Task Synchronized
              </span>
              <h3 className="text-sm font-bold text-slate-900 mt-2">Field Record Registered</h3>
              <p className="text-xs text-slate-500 mt-0.5">{successMessage}</p>
            </div>

            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsSuccess(false);
                  setRemarks('');
                }}
                className="w-full py-2 bg-teal-700 hover:bg-teal-800 text-white rounded text-xs font-bold"
              >
                Log Another Task
              </button>
              <button
                type="button"
                onClick={() => navigate('/volunteer/dashboard')}
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-semibold"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs space-y-3">
            {/* Header info */}
            <div className="border-b border-slate-100 pb-2 flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-slate-900">
                  {currentCategory?.subTasks.find(s => s.id === subTask)?.label || currentCategory?.label}
                </h3>
                <p className="text-[10px] text-slate-500">PRD Field Protocol · ITC WoW</p>
              </div>
              <span className="text-[10px] bg-slate-100 text-slate-700 font-mono font-semibold px-2 py-0.5 rounded border border-slate-200">
                Mandatory Fields *
              </span>
            </div>

            {/* TASK 1: SCHOOL VISIT */}
            {taskType === 'school_visit' && (
              <>
                {/* 1A. Permission to Conduct ISRS Programme */}
                {subTask === 'isrs_permission' && (
                  <>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Select School Name (Searchable) *</label>
                      <select
                        value={selectedEntityId}
                        onChange={(e) => setSelectedEntityId(e.target.value)}
                        className="w-full py-2 px-2.5 bg-slate-50 border border-slate-300 rounded text-xs text-slate-900 outline-none focus:border-teal-700"
                      >
                        {schools.map(s => (
                          <option key={s.id} value={s.id}>
                            {s.name} (UDISE: {s.udise})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Confirmation Date Received *</label>
                      <select
                        value={confirmationDateReceived}
                        onChange={(e) => setConfirmationDateReceived(e.target.value)}
                        className="w-full py-2 px-2.5 bg-white border border-slate-300 rounded text-xs text-slate-900 font-semibold outline-none focus:border-teal-700"
                      >
                        <option value="Yes">Yes — Date Confirmed (Upload Consent Form)</option>
                        <option value="No">No — Follow-Up Required</option>
                        <option value="Permission Denied">Permission Denied (Mandatory Remarks)</option>
                      </select>
                    </div>

                    {confirmationDateReceived === 'Yes' && (
                      <div className="space-y-2 bg-teal-50/60 p-2.5 rounded-lg border border-teal-200">
                        <div>
                          <label className="block text-xs font-bold text-teal-950 mb-1">Scheduled ISRS Programme Date *</label>
                          <input
                            type="date"
                            value={scheduledDate}
                            onChange={(e) => setScheduledDate(e.target.value)}
                            className="w-full py-1.5 px-2.5 bg-white border border-teal-300 rounded text-xs text-slate-900 font-mono"
                          />
                          <p className="text-[10px] text-teal-800 mt-1">
                            Details will automatically sync to coordinator calendar as a reminder.
                          </p>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-teal-950 mb-1">
                            Upload Signed Consent Form * (PDF / Image)
                          </label>
                          <div className="flex items-center justify-between bg-white p-2 rounded border border-teal-300 text-xs">
                            <span className="font-mono text-[11px] text-slate-700">ISRS_Consent_Headmaster_Signed.pdf</span>
                            <span className="text-[10px] bg-teal-100 text-teal-800 px-1.5 py-0.5 rounded font-bold">Attached</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {confirmationDateReceived === 'No' && (
                      <div className="space-y-2 bg-amber-50 p-2.5 rounded-lg border border-amber-200">
                        <label className="block text-xs font-bold text-amber-950 mb-1">Choose Follow-Up Date *</label>
                        <input
                          type="date"
                          value={followUpDate}
                          onChange={(e) => setFollowUpDate(e.target.value)}
                          className="w-full py-1.5 px-2.5 bg-white border border-amber-300 rounded text-xs text-slate-900 font-mono"
                        />
                        <p className="text-[10px] text-amber-900">
                          Follow-up reminder will automatically appear on coordinator calendar/dashboard.
                        </p>
                      </div>
                    )}

                    {confirmationDateReceived === 'Permission Denied' && (
                      <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-lg text-rose-900 text-xs">
                        PRD Rule: Mandatory remarks required explaining reasons provided by school management.
                      </div>
                    )}
                  </>
                )}

                {/* 1B. ISRS Awareness Session */}
                {subTask === 'isrs_awareness' && (
                  <>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Select School Name *</label>
                      <select
                        value={selectedEntityId}
                        onChange={(e) => setSelectedEntityId(e.target.value)}
                        className="w-full py-2 px-2.5 bg-slate-50 border border-slate-300 rounded text-xs text-slate-900 outline-none"
                      >
                        {schools.map(s => (
                          <option key={s.id} value={s.id}>{s.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">No. of Students Participated *</label>
                      <input
                        type="number"
                        value={participantsCount}
                        onChange={(e) => setParticipantsCount(e.target.value)}
                        placeholder="e.g. 65"
                        className="w-full py-2 px-2.5 bg-slate-50 border border-slate-300 rounded text-xs font-mono font-bold text-slate-900"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-2 bg-slate-50 rounded border border-slate-200">
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Session Photo (Geotagged) *</label>
                        <div className="text-[10px] text-teal-800 bg-teal-50 px-2 py-1 rounded border border-teal-200 flex items-center justify-between">
                          <span>Photo_Session.jpg</span>
                          <CheckCircle2 className="w-3 h-3 text-teal-700" />
                        </div>
                      </div>
                      <div className="p-2 bg-slate-50 rounded border border-slate-200">
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Acknowledgement Form *</label>
                        <div className="text-[10px] text-teal-800 bg-teal-50 px-2 py-1 rounded border border-teal-200 flex items-center justify-between">
                          <span>ISRC_Ack_Slip.pdf</span>
                          <CheckCircle2 className="w-3 h-3 text-teal-700" />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* 1C. ISRC Collection Drive */}
                {subTask === 'isrc_collection' && (
                  <>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Select School Name *</label>
                      <select
                        value={selectedEntityId}
                        onChange={(e) => setSelectedEntityId(e.target.value)}
                        className="w-full py-2 px-2.5 bg-slate-50 border border-slate-300 rounded text-xs text-slate-900 outline-none"
                      >
                        {schools.map(s => (
                          <option key={s.id} value={s.id}>{s.name} ({s.village})</option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Collection Conducted By *</label>
                        <div className="flex bg-slate-100 p-0.5 rounded border border-slate-300 text-xs">
                          <button
                            type="button"
                            onClick={() => setConductedBy('Self')}
                            className={`flex-1 py-1 rounded font-bold transition-all ${
                              conductedBy === 'Self' ? 'bg-teal-700 text-white shadow-2xs' : 'text-slate-600'
                            }`}
                          >
                            Self
                          </button>
                          <button
                            type="button"
                            onClick={() => setConductedBy('Volunteer')}
                            className={`flex-1 py-1 rounded font-bold transition-all ${
                              conductedBy === 'Volunteer' ? 'bg-teal-700 text-white shadow-2xs' : 'text-slate-600'
                            }`}
                          >
                            Volunteer
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Quantity Collected (Kg) *</label>
                        <input
                          type="number"
                          value={day1QuantityKg}
                          onChange={(e) => setDay1QuantityKg(e.target.value)}
                          placeholder="Kg collected"
                          className="w-full py-1.5 px-2.5 bg-slate-50 border border-slate-300 rounded text-xs font-mono font-bold text-slate-900"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Franchise for Material Collection (Searchable) *</label>
                      <select
                        value={selectedFranchiseId}
                        onChange={(e) => setSelectedFranchiseId(e.target.value)}
                        className="w-full py-2 px-2.5 bg-white border border-slate-300 rounded text-xs text-slate-900 outline-none focus:border-teal-700"
                      >
                        {franchises.map(f => (
                          <option key={f.id} value={f.id}>
                            {f.name} ({f.weighbridgeCapacity})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* PRD Spec: Collection Drive Completed? Yes or No */}
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-slate-800">Is Collection Drive Completed Today? *</label>
                        <div className="flex bg-slate-200 p-0.5 rounded text-xs">
                          <button
                            type="button"
                            onClick={() => setCollectionDriveCompleted('Yes')}
                            className={`px-3 py-1 rounded font-bold ${collectionDriveCompleted === 'Yes' ? 'bg-teal-700 text-white' : 'text-slate-700'}`}
                          >
                            Yes
                          </button>
                          <button
                            type="button"
                            onClick={() => setCollectionDriveCompleted('No')}
                            className={`px-3 py-1 rounded font-bold ${collectionDriveCompleted === 'No' ? 'bg-amber-600 text-white' : 'text-slate-700'}`}
                          >
                            No (Day 2 Req)
                          </button>
                        </div>
                      </div>

                      {collectionDriveCompleted === 'No' && (
                        <div className="p-2.5 bg-amber-50 rounded border border-amber-200 space-y-2">
                          <span className="text-[10px] font-bold text-amber-900 uppercase">Collection Drive — Day 2 Fields</span>
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-700 mb-1">Day 2 Quantity Collected (In Kg) *</label>
                            <input
                              type="number"
                              value={day2QuantityKg}
                              onChange={(e) => setDay2QuantityKg(e.target.value)}
                              className="w-full py-1.5 px-2 bg-white border border-amber-300 rounded text-xs font-mono font-bold"
                            />
                          </div>
                          <div className="text-[11px] text-amber-900 font-mono font-bold">
                            Total Stored Quantity = Day 1 ({day1QuantityKg} Kg) + Day 2 ({day2QuantityKg} Kg) = {totalCollectedKg} Kg
                          </div>
                        </div>
                      )}

                      {/* Verified Quantity and Acknowledgement */}
                      <div className="space-y-2 pt-1 border-t border-slate-200">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Verified Material Quantity (In Kg, basis weighbridge receipt from franchise) *
                          </label>
                          <input
                            type="number"
                            value={verifiedQuantityKg}
                            onChange={(e) => setVerifiedQuantityKg(e.target.value)}
                            placeholder="Must be <= collected"
                            className="w-full py-1.5 px-2.5 bg-white border border-slate-300 rounded text-xs font-mono font-bold text-slate-900"
                          />
                          <p className="text-[10px] text-slate-500 mt-0.5">
                            PRD Rule: Verified quantity on weighbridge is net certified material.
                          </p>
                        </div>

                        {/* Critical Acknowledgement Upload */}
                        <div className="p-2 bg-teal-50 border border-teal-200 rounded text-xs space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-teal-950">Upload ISRC Collection Drive Acknowledgement Form *</span>
                            <input
                              type="checkbox"
                              checked={collectionAckUploaded}
                              onChange={(e) => setCollectionAckUploaded(e.target.checked)}
                              className="rounded text-teal-700 w-4 h-4"
                            />
                          </div>
                          <p className="text-[10px] text-teal-900">
                            PRD Rule: If left un-uploaded, instance counts as a <strong>Pending Activity</strong> on volunteer & manager dashboard.
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}

            {/* TASK 2: COLLEGE VISIT */}
            {taskType === 'college_visit' && (
              <>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Select College Name (Searchable) *</label>
                  <select
                    value={selectedEntityId}
                    onChange={(e) => setSelectedEntityId(e.target.value)}
                    className="w-full py-2 px-2.5 bg-slate-50 border border-slate-300 rounded text-xs text-slate-900 outline-none"
                  >
                    {colleges.map(c => (
                      <option key={c.id} value={c.id}>{c.name} ({c.aishe})</option>
                    ))}
                  </select>
                </div>

                {subTask === 'col_permission' && (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Confirmation Date Received *</label>
                    <select
                      value={confirmationDateReceived}
                      onChange={(e) => setConfirmationDateReceived(e.target.value)}
                      className="w-full py-2 px-2.5 bg-white border border-slate-300 rounded text-xs text-slate-900 font-semibold"
                    >
                      <option value="Yes">Yes — Date Confirmed (Upload Signed Consent Form)</option>
                      <option value="No">No — Choose Follow-Up Date</option>
                      <option value="Permission Denied">Permission Denied (Mandatory Remarks)</option>
                    </select>
                  </div>
                )}

                {subTask === 'col_awareness' && (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">No. of College Students Participated *</label>
                    <input
                      type="number"
                      value={participantsCount}
                      onChange={(e) => setParticipantsCount(e.target.value)}
                      className="w-full py-2 px-2.5 bg-slate-50 border border-slate-300 rounded text-xs font-mono font-bold"
                    />
                  </div>
                )}

                {subTask === 'col_collection' && (
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Quantity Collected (Kg) *</label>
                      <input
                        type="number"
                        value={day1QuantityKg}
                        onChange={(e) => setDay1QuantityKg(e.target.value)}
                        className="w-full py-1.5 px-2 bg-slate-50 border border-slate-300 rounded text-xs font-mono font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Verified Weighbridge (Kg) *</label>
                      <input
                        type="number"
                        value={verifiedQuantityKg}
                        onChange={(e) => setVerifiedQuantityKg(e.target.value)}
                        className="w-full py-1.5 px-2 bg-slate-50 border border-slate-300 rounded text-xs font-mono font-bold"
                      />
                    </div>
                  </div>
                )}
              </>
            )}

            {/* TASK 3: CORPORATE VISIT */}
            {taskType === 'corporate_visit' && (
              <>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Select Corporate Name (Searchable) *</label>
                  <select
                    value={selectedEntityId}
                    onChange={(e) => setSelectedEntityId(e.target.value)}
                    className="w-full py-2 px-2.5 bg-slate-50 border border-slate-300 rounded text-xs text-slate-900 outline-none"
                  >
                    {corporates.map(c => (
                      <option key={c.id} value={c.id}>{c.name} ({c.corpCode})</option>
                    ))}
                  </select>
                </div>

                {subTask === 'corp_awareness' && (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">No. of Employees Participated *</label>
                    <input
                      type="number"
                      value={participantsCount}
                      onChange={(e) => setParticipantsCount(e.target.value)}
                      className="w-full py-2 px-2.5 bg-slate-50 border border-slate-300 rounded text-xs font-mono font-bold"
                    />
                  </div>
                )}

                {subTask === 'corp_collection' && (
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Corporate Recyclables (Kg) *</label>
                      <input
                        type="number"
                        value={day1QuantityKg}
                        onChange={(e) => setDay1QuantityKg(e.target.value)}
                        className="w-full py-1.5 px-2 bg-slate-50 border border-slate-300 rounded text-xs font-mono font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Verified Net Weight (Kg) *</label>
                      <input
                        type="number"
                        value={verifiedQuantityKg}
                        onChange={(e) => setVerifiedQuantityKg(e.target.value)}
                        className="w-full py-1.5 px-2 bg-slate-50 border border-slate-300 rounded text-xs font-mono font-bold"
                      />
                    </div>
                  </div>
                )}
              </>
            )}

            {/* TASK 4: HOUSEHOLD PROPAGATION */}
            {taskType === 'household_propagation' && (
              <>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Select Municipality *</label>
                  <select
                    value={selectedMunicipality}
                    onChange={(e) => setSelectedMunicipality(e.target.value)}
                    className="w-full py-2 px-2.5 bg-slate-50 border border-slate-300 rounded text-xs text-slate-900 outline-none"
                  >
                    {municipalities.map((m, i) => (
                      <option key={i} value={m}>{m}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">No. of Households Covered *</label>
                  <input
                    type="number"
                    value={householdsCovered}
                    onChange={(e) => setHouseholdsCovered(e.target.value)}
                    placeholder="e.g. 42"
                    className="w-full py-2 px-2.5 bg-slate-50 border border-slate-300 rounded text-xs font-mono font-bold"
                  />
                </div>

                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Upload Photos of the Register Book * (Geotagged PDF/Image)
                  </label>
                  <div className="flex items-center justify-between text-xs text-slate-700 bg-white p-2 rounded border border-slate-300">
                    <span>Register_Book_Sarapaka_Ward_04.jpg</span>
                    <span className="text-[10px] bg-teal-100 text-teal-800 px-1.5 py-0.5 rounded font-bold">Attached</span>
                  </div>
                </div>
              </>
            )}

            {/* TASK 5: OFFICE VISITS */}
            {taskType === 'office_visit' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Select Office Visit Purpose *</label>
                <select
                  value={officeOption}
                  onChange={(e) => setOfficeOption(e.target.value)}
                  className="w-full py-2 px-2.5 bg-white border border-slate-300 rounded text-xs text-slate-900 font-semibold"
                >
                  <option value="Visiting NGO Office for Meetings">Visiting NGO Office for Meetings</option>
                  <option value="Visiting NGO office for Office Work">Visiting NGO office for Office Work</option>
                  <option value="Visiting ITC Office for meeting">Visiting ITC Office for meeting</option>
                  <option value="Visit to CRP/ MRF for Office Work">Visit to CRP/ MRF for Office Work</option>
                  <option value="Others">Others</option>
                </select>
              </div>
            )}

            {/* TASK 6: OTHER ACTIVITIES */}
            {taskType === 'other_activities' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Select Activity Nature *</label>
                <select
                  value={otherActivityOption}
                  onChange={(e) => setOtherActivityOption(e.target.value)}
                  className="w-full py-2 px-2.5 bg-white border border-slate-300 rounded text-xs text-slate-900 font-semibold"
                >
                  <option value="Community Engagement Activities">Community Engagement Activities</option>
                  <option value="Student Engagement activities">Student Engagement activities</option>
                  <option value="Others">Others</option>
                </select>
              </div>
            )}

            {/* Common Remarks Box before submit (Required/Optional per PRD) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Remarks & Observations {confirmationDateReceived === 'Permission Denied' ? '*' : '(Optional)'}
              </label>
              <textarea
                rows={2}
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Field observations, Headmaster/Principal remarks, or logistics notes..."
                className="w-full py-1.5 px-2.5 bg-slate-50 border border-slate-300 rounded text-xs outline-none focus:border-teal-700 resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 px-4 bg-teal-700 hover:bg-teal-800 text-white rounded text-xs font-bold shadow-xs flex items-center justify-center gap-2 transition-all active:scale-[0.98] mt-2"
            >
              {isSubmitting ? (
                <span>Registering Task...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Submit Task Record</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </MobileLayout>
  );
}
