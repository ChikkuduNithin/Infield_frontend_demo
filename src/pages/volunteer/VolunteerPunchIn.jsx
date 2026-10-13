import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDemo } from '../../context/DemoContext';
import MobileLayout from '../../layouts/MobileLayout';
import {
  Camera,
  MapPin,
  Clock,
  Calendar,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Sparkles
} from 'lucide-react';

export default function VolunteerPunchIn() {
  const navigate = useNavigate();
  const { punchState, handlePunchIn } = useDemo();

  const [step, setStep] = useState(punchState.isPunchedIn && !punchState.isPunchedOut ? 'success' : 'ready');
  const [photoPreview, setPhotoPreview] = useState(
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80'
  );
  const [gpsLocked, setGpsLocked] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sampleLocation = {
    name: "ZPHS Sarapaka Cluster Office",
    mandal: "Burgampahad Mandal, Bhadradri Kothagudem",
    coords: "17.6534° N, 80.8987° E",
    accuracy: "4.2 meters (High Precision)",
    geofenceStatus: "Inside Assigned Field Territory"
  };

  const handleConfirmPunch = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      handlePunchIn({
        time: '09:08 AM',
        date: '2026-10-12',
        location: `${sampleLocation.name}, ${sampleLocation.mandal} (${sampleLocation.coords})`,
        photo: photoPreview
      });
      setIsSubmitting(false);
      setStep('success');
    }, 700);
  };

  return (
    <MobileLayout title="Daily Field Punch-in" showBack={true} role="volunteer">
      <div className="space-y-4 pb-4">
        {step === 'ready' && (
          <>
            {/* Geo-fence & GPS status banner */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center text-white shrink-0 mt-0.5">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="flex-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-950">GPS Geo-Fence Verified</span>
                  <span className="text-[10px] bg-emerald-200 text-emerald-800 font-semibold px-2 py-0.5 rounded-full">
                    Match 99%
                  </span>
                </div>
                <p className="text-emerald-800 text-[11px] mt-0.5">
                  Device location matches assigned cluster territory for ITC Mission Sunehra Kal.
                </p>
              </div>
            </div>

            {/* Selfie Photo Capture Box (Simulated Camera) */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Camera className="w-4 h-4 text-emerald-600" />
                  <span>Field Attendance Selfie</span>
                </label>
                <span className="text-[10px] text-slate-500 font-medium">Simulated Capture</span>
              </div>

              <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 border-2 border-dashed border-emerald-400/80 group">
                <img
                  src={photoPreview}
                  alt="Field Attendance"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-3 text-white">
                  <div className="flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span className="font-mono text-emerald-300">17.6534° N, 80.8987° E</span>
                    </div>
                    <span className="text-[10px] bg-black/60 px-2 py-0.5 rounded font-mono">12-OCT-2026 09:08</span>
                  </div>
                </div>

                {/* Retake / Change Demo Photo button */}
                <button
                  type="button"
                  onClick={() => {
                    setPhotoPreview(prev =>
                      prev.includes('534528741775')
                        ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80'
                        : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80'
                    );
                  }}
                  className="absolute top-2 right-2 bg-slate-900/80 hover:bg-slate-900 text-white text-[11px] px-2.5 py-1 rounded-lg flex items-center gap-1 backdrop-blur-sm transition-colors border border-slate-700"
                >
                  <RefreshCw className="w-3 h-3 text-emerald-400" />
                  <span>Switch Photo</span>
                </button>
              </div>
            </div>

            {/* Location & Time Cards */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="flex-1 text-xs">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Recorded Location
                  </span>
                  <p className="font-bold text-slate-800 text-xs">{sampleLocation.name}</p>
                  <p className="text-slate-500 text-[11px]">{sampleLocation.mandal}</p>
                  <div className="flex items-center gap-2 mt-1 text-[11px] font-mono text-slate-600">
                    <span>{sampleLocation.coords}</span>
                    <span className="text-emerald-600 font-medium">({sampleLocation.accuracy})</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span className="font-semibold text-slate-700">Monday, 12 Oct 2026</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-600" />
                  <span className="font-bold text-slate-900 font-mono">09:08 AM</span>
                </div>
              </div>
            </div>

            {/* Confirm Punch-in Button */}
            <button
              onClick={handleConfirmPunch}
              disabled={isSubmitting}
              className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white rounded-2xl text-xs font-bold shadow-md shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Verifying Location & Recording...</span>
                </div>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  <span>Confirm Field Punch-in</span>
                </>
              )}
            </button>
          </>
        )}

        {/* Successful Punch-in State */}
        {step === 'success' && (
          <div className="bg-white rounded-2xl border border-emerald-200 p-5 shadow-sm text-center space-y-4 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center ring-8 ring-emerald-50">
              <CheckCircle className="w-9 h-9" />
            </div>

            <div>
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Attendance Logged
              </span>
              <h2 className="text-lg font-bold text-slate-900 mt-2">Punch-in Successful!</h2>
              <p className="text-xs text-slate-500 mt-1">
                Your presence has been recorded and synchronized with the Zonal Manager dashboard.
              </p>
            </div>

            {/* Summary card */}
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Punch-in Time:</span>
                <span className="font-bold text-slate-900 font-mono">{punchState.punchInTime || '09:08 AM'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Date:</span>
                <span className="font-semibold text-slate-800">12 Oct 2026</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Assigned Cluster:</span>
                <span className="font-semibold text-slate-800">Sarapaka / Burgampahad</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Status:</span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Active on Duty
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={() => navigate('/volunteer/activity-select')}
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all"
              >
                <span>Start School or Field Activity</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigate('/volunteer/dashboard')}
                className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-all"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </MobileLayout>
  );
}
