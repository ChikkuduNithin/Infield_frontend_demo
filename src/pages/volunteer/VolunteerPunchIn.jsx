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
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Building
} from 'lucide-react';

export default function VolunteerPunchIn() {
  const navigate = useNavigate();
  const { punchState, handlePunchIn, currentCoordinator } = useDemo();

  const [step, setStep] = useState(punchState.isPunchedIn && !punchState.isPunchedOut ? 'success' : 'ready');
  const [photoPreview, setPhotoPreview] = useState(
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80'
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sampleLocation = {
    name: "ITC WoW Sarapaka Field Hub & Cluster Office",
    mandal: "Burgampahad Mandal, Bhadradri Kothagudem",
    coords: "17.6534° N, 80.8987° E",
    accuracy: "3.8 meters (High Precision GPS)",
    geofenceStatus: "Inside Assigned Operational Cluster"
  };

  const handleConfirmPunch = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      handlePunchIn({
        time: '09:04 AM',
        date: '2026-10-15',
        location: `${sampleLocation.name}, ${sampleLocation.mandal} (${sampleLocation.coords})`,
        photo: photoPreview
      });
      setIsSubmitting(false);
      setStep('success');
    }, 600);
  };

  return (
    <MobileLayout title="Geotagged Punch-In" showBack={true} role="coordinator">
      <div className="space-y-3.5 pb-4">
        {step === 'ready' && (
          <>
            {/* Geo-fence & GPS status banner */}
            <div className="bg-teal-50 border border-teal-200 rounded-xl p-3 flex items-start gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-teal-700 flex items-center justify-center text-white shrink-0 mt-0.5">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="flex-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-teal-950">Territory Geofence Verified</span>
                  <span className="text-[10px] bg-teal-200 text-teal-900 font-bold px-1.5 py-0.2 rounded font-mono">
                    Locked
                  </span>
                </div>
                <p className="text-teal-800 text-[11px] mt-0.5">
                  Device GPS verified inside ITC WoW assigned cluster boundaries.
                </p>
              </div>
            </div>

            {/* Selfie Photo Capture Box */}
            <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-2xs">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Camera className="w-4 h-4 text-teal-700" />
                  <span>Mandatory Geotagged Selfie *</span>
                </label>
                <span className="text-[10px] text-slate-500 font-mono">Camera-Only Sensor</span>
              </div>

              <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-900 border border-slate-300">
                <img
                  src={photoPreview}
                  alt="Coordinator Attendance"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-2.5 text-white">
                  <div className="flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-teal-400"></span>
                      <span className="font-mono text-teal-200 text-[10px]">17.6534° N, 80.8987° E</span>
                    </div>
                    <span className="text-[10px] bg-black/60 px-1.5 py-0.5 rounded font-mono">15-OCT-2026 09:04 AM</span>
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
                  className="absolute top-2 right-2 bg-slate-900/80 hover:bg-slate-900 text-white text-[10px] px-2 py-1 rounded flex items-center gap-1 transition-colors border border-slate-700"
                >
                  <RefreshCw className="w-3 h-3 text-teal-400" />
                  <span>Switch Selfie</span>
                </button>
              </div>
            </div>

            {/* Location & Time Specs */}
            <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-2xs space-y-2.5">
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 mt-0.5 border border-slate-200">
                  <MapPin className="w-4 h-4 text-teal-700" />
                </div>
                <div className="flex-1 text-xs">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Cluster Checkpoint
                  </span>
                  <p className="font-bold text-slate-900 text-xs">{sampleLocation.name}</p>
                  <p className="text-slate-500 text-[11px]">{sampleLocation.mandal}</p>
                  <div className="flex items-center gap-2 mt-1 text-[11px] font-mono text-slate-600">
                    <span>{sampleLocation.coords}</span>
                    <span className="text-teal-700 font-semibold">({sampleLocation.accuracy})</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-2.5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-slate-600">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-medium">Thursday, 15 Oct 2026</span>
                </div>
                <div className="flex items-center gap-1.5 font-mono text-slate-700">
                  <Clock className="w-3.5 h-3.5 text-teal-700" />
                  <span className="font-bold">09:04 AM IST</span>
                </div>
              </div>
            </div>

            {/* Confirmation CTA */}
            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleConfirmPunch}
              className="w-full py-2.5 px-4 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-xs font-bold shadow-xs flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              {isSubmitting ? (
                <span>Validating Coordinates...</span>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  <span>Confirm Geotagged Punch-In</span>
                </>
              )}
            </button>
          </>
        )}

        {step === 'success' && (
          <div className="bg-white rounded-xl border border-teal-200 p-5 shadow-2xs text-center space-y-4">
            <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-800 mx-auto flex items-center justify-center border border-teal-200">
              <CheckCircle className="w-7 h-7" />
            </div>

            <div>
              <span className="text-[10px] font-bold text-teal-800 uppercase tracking-widest bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                Attendance Recorded
              </span>
              <h2 className="text-base font-bold text-slate-900 mt-2">Punch-In Successful!</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Timestamp: <strong>09:04 AM IST</strong> · Status: <strong>Present</strong>
              </p>
            </div>

            <div className="bg-slate-50 rounded-lg p-3 border border-slate-200 text-left text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">Coordinator:</span>
                <span className="font-semibold text-slate-800">{currentCoordinator.name} ({currentCoordinator.empId})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Cluster Location:</span>
                <span className="font-semibold text-slate-800">Sarapaka Operations Hub</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Geofence Compliance:</span>
                <span className="font-bold text-teal-700">100% Inside Boundary</span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={() => navigate('/volunteer/activity-select')}
                className="w-full py-2.5 px-4 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-xs font-bold shadow-xs flex items-center justify-center gap-2 transition-all"
              >
                <span>Record Today's Task</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => navigate('/volunteer/dashboard')}
                className="w-full py-2 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-all"
              >
                View Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </MobileLayout>
  );
}
