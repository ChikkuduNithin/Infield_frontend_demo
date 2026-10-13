import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDemo } from '../../context/DemoContext';
import MobileLayout from '../../layouts/MobileLayout';
import { ACTIVITY_CATEGORIES } from '../../data/mockData';
import {
  School,
  Camera,
  Calendar,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Upload,
  RefreshCw,
  Building,
  UserCheck,
  Package
} from 'lucide-react';

export default function VolunteerSchoolForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialType = searchParams.get('type') || 'school_visit';

  const { schools, addActivity } = useDemo();

  const [activityType, setActivityType] = useState(initialType);
  const [selectedSchoolId, setSelectedSchoolId] = useState(schools[0]?.id || '');
  const [district, setDistrict] = useState(schools[0]?.district || 'Bhadradri Kothagudem');
  const [principalContacted, setPrincipalContacted] = useState(true);
  const [studentsReached, setStudentsReached] = useState('45');
  const [quantityAchieved, setQuantityAchieved] = useState('45');
  const [remarks, setRemarks] = useState('Conducted interactive hygiene and health awareness session. Demonstrated proper handwashing steps.');
  const [followUpDate, setFollowUpDate] = useState('2026-10-24');
  const [photoPreview, setPhotoPreview] = useState(
    'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=500&auto=format&fit=crop&q=80'
  );

  // Other activity generic fields
  const [institutionName, setInstitutionName] = useState('Burgampahad Primary Health Centre (PHC)');
  const [officerName, setOfficerName] = useState('Dr. K. Madhusudhan Rao (Medical Officer)');
  const [meetingAgenda, setMeetingAgenda] = useState('Quarterly review with Mandal Education Officer');

  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Synchronize school and district
  const handleSchoolChange = (e) => {
    const sId = e.target.value;
    setSelectedSchoolId(sId);
    const found = schools.find(s => s.id === sId);
    if (found) {
      setDistrict(found.district);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (activityType === 'school_visit') {
      if (!selectedSchoolId) newErrors.school = 'Please select a school';
      if (!studentsReached || Number(studentsReached) <= 0) newErrors.students = 'Enter valid student count';
    } else {
      if (!institutionName.trim()) newErrors.institution = 'Please enter name or venue';
    }
    if (!remarks.trim()) newErrors.remarks = 'Please provide field remarks';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    const selectedSchool = schools.find(s => s.id === selectedSchoolId);

    setTimeout(() => {
      addActivity({
        type: activityType,
        typeName: ACTIVITY_CATEGORIES.find(c => c.id === activityType)?.label || 'Field Activity',
        schoolId: activityType === 'school_visit' ? selectedSchoolId : null,
        schoolName: activityType === 'school_visit' ? selectedSchool?.name : institutionName,
        district: district,
        principalContacted,
        studentsReached: Number(studentsReached) || 0,
        quantityAchieved: Number(quantityAchieved) || 0,
        quantityUnit: 'Kits / Packs',
        remarks,
        followUpDate,
        photoUrl: photoPreview
      });

      setSubmitting(false);
      setIsSuccess(true);
    }, 600);
  };

  const currentCategory = ACTIVITY_CATEGORIES.find(c => c.id === activityType);

  return (
    <MobileLayout
      title={currentCategory?.label || "Activity Form"}
      showBack={true}
      role="volunteer"
    >
      <div className="space-y-4 pb-6">
        {/* Activity Type Switcher Pills */}
        <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-1.5 overflow-x-auto text-xs no-scrollbar">
          {ACTIVITY_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                setActivityType(cat.id);
                setIsSuccess(false);
              }}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap font-medium transition-all ${
                activityType === cat.id
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {isSuccess ? (
          <div className="bg-white rounded-2xl border border-emerald-200 p-5 shadow-sm text-center space-y-4 animate-fadeIn">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div>
              <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Logged & Synchronized
              </span>
              <h2 className="text-base font-bold text-slate-900 mt-2">Activity Recorded Successfully!</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Visit report has been added to today's summary and team dashboard.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsSuccess(false);
                  setRemarks('');
                }}
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all"
              >
                Log Another Activity
              </button>
              <button
                type="button"
                onClick={() => navigate('/volunteer/dashboard')}
                className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-all"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3.5">
            {/* Header info */}
            <div className="border-b border-slate-100 pb-2.5 flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-slate-900">{currentCategory?.label} Details</h3>
                <p className="text-[10px] text-slate-500">ITC Mission Sunehra Kal Field Monitoring</p>
              </div>
              <span className="text-[10px] bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 rounded">
                Required *
              </span>
            </div>

            {/* School Visit specific fields */}
            {activityType === 'school_visit' ? (
              <>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Select School *
                  </label>
                  <select
                    value={selectedSchoolId}
                    onChange={handleSchoolChange}
                    className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 outline-none focus:bg-white focus:border-emerald-500"
                  >
                    {schools.map((school) => (
                      <option key={school.id} value={school.id}>
                        {school.name} ({school.category})
                      </option>
                    ))}
                  </select>
                  {errors.school && <p className="text-rose-500 text-[10px] mt-1">{errors.school}</p>}
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">District</label>
                    <input
                      type="text"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="w-full py-2 px-3 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-700 font-medium outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Principal Contacted?</label>
                    <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
                      <button
                        type="button"
                        onClick={() => setPrincipalContacted(true)}
                        className={`flex-1 py-1 rounded-lg font-semibold transition-all ${
                          principalContacted ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600'
                        }`}
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        onClick={() => setPrincipalContacted(false)}
                        className={`flex-1 py-1 rounded-lg font-semibold transition-all ${
                          !principalContacted ? 'bg-rose-600 text-white shadow-xs' : 'text-slate-600'
                        }`}
                      >
                        No
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Students Reached *
                    </label>
                    <input
                      type="number"
                      value={studentsReached}
                      onChange={(e) => setStudentsReached(e.target.value)}
                      placeholder="e.g. 45"
                      className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 font-mono outline-none focus:bg-white focus:border-emerald-500"
                    />
                    {errors.students && <p className="text-rose-500 text-[10px] mt-1">{errors.students}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Kits / Quantity Achieved
                    </label>
                    <input
                      type="number"
                      value={quantityAchieved}
                      onChange={(e) => setQuantityAchieved(e.target.value)}
                      placeholder="e.g. 45"
                      className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 font-mono outline-none focus:bg-white focus:border-emerald-500"
                    />
                  </div>
                </div>
              </>
            ) : (
              /* Other 5 Activities customized fields */
              <>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {activityType === 'hospital_visit'
                      ? 'Hospital / CHC / PHC Facility Name *'
                      : activityType === 'awareness_prog'
                        ? 'Campaign Location / Venue *'
                        : activityType === 'community_visit'
                          ? 'Grama Panchayat / Ward Name *'
                          : activityType === 'meeting'
                            ? 'Meeting Department / Office *'
                            : 'Activity Description & Place *'}
                  </label>
                  <input
                    type="text"
                    value={institutionName}
                    onChange={(e) => setInstitutionName(e.target.value)}
                    className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 outline-none focus:bg-white focus:border-emerald-500"
                  />
                  {errors.institution && <p className="text-rose-500 text-[10px] mt-1">{errors.institution}</p>}
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">District</label>
                    <input
                      type="text"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="w-full py-2 px-3 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-700 font-medium outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Participants / Beneficiaries</label>
                    <input
                      type="number"
                      value={studentsReached}
                      onChange={(e) => setStudentsReached(e.target.value)}
                      placeholder="e.g. 35"
                      className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 font-mono outline-none focus:bg-white focus:border-emerald-500"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Remarks */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Field Observations & Remarks *
              </label>
              <textarea
                rows={2}
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Key outcomes, student feedback, or headmaster requests..."
                className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 outline-none focus:bg-white focus:border-emerald-500 resize-none"
              />
              {errors.remarks && <p className="text-rose-500 text-[10px] mt-1">{errors.remarks}</p>}
            </div>

            {/* Follow-up date */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Next Follow-up Date</label>
              <input
                type="date"
                value={followUpDate}
                onChange={(e) => setFollowUpDate(e.target.value)}
                className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 font-medium outline-none focus:bg-white focus:border-emerald-500"
              />
            </div>

            {/* Photo Attachment Preview */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Activity Photo Attachment</span>
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setPhotoPreview(prev =>
                      prev.includes('577896851231')
                        ? 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=500&auto=format&fit=crop&q=80'
                        : 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=500&auto=format&fit=crop&q=80'
                    );
                  }}
                  className="text-[10px] text-emerald-700 font-semibold hover:underline flex items-center gap-1"
                >
                  <RefreshCw className="w-2.5 h-2.5" /> Switch Sample
                </button>
              </div>

              <div className="relative h-28 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                <img
                  src={photoPreview}
                  alt="School Visit Preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-1 right-2 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded font-mono">
                  GPS Watermarked
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98] mt-2"
            >
              {submitting ? (
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Submitting Activity...</span>
                </div>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  <span>Submit Field Activity</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </MobileLayout>
  );
}
