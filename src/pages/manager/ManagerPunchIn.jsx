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
  ShieldCheck,
  RefreshCw,
  ArrowRight
} from 'lucide-react';

export default function ManagerPunchIn() {
  const navigate = useNavigate();
  const { managerPunchState, handleManagerPunchIn } = useDemo();

  const [step, setStep] = useState(managerPunchState.isPunchedIn ? 'success' : 'ready');
  const [photoPreview, setPhotoPreview] = useState(
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80'
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sampleLocation = {
    name: "ITC Zonal CSR Coordination Office",
    mandal: "Bhadrachalam Road, Bhadradri Kothagudem",
    coords: "17.6620° N, 80.8810° E",
    accuracy: "3.5 meters (High Precision)",
    geofenceStatus: "Headquarters Boundary Verified"
  };

  const handleConfirm = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      handleManagerPunchIn({
        time: '08:45 AM',
        date: '2026-10-12',
        location: `${sampleLocation.name} (${sampleLocation.coords})`
      });
      setIsSubmitting(false);
      setStep('success');
    }, 600);
  };

  return (
    <MobileLayout title="Manager Attendance" showBack={true} role="manager">
      <div className="space-y-4 pb-4">
        {step === 'ready' ? (
          <>
            {/* Geo-fence banner */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-3 flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white shrink-0 mt-0.5">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="flex-1 text-xs">
                <span className="font-bold text-blue-950">Manager Geo-fence Verified</span>
                <p className="text-blue-800 text-[11px] mt-0.5">
                  Device location matches ITC Zonal Project Office, Bhadrachalam Road.
                </p>
              </div>
            </div>

            {/* Selfie photo preview */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Camera className="w-4 h-4 text-blue-600" />
                  <span>Manager Selfie Attendance</span>
                </label>
                <span className="text-[10px] text-slate-500 font-medium">Simulated Capture</span>
              </div>

              <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 border-2 border-dashed border-blue-400">
                <img
                  src={photoPreview}
                  alt="Manager Attendance"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-3 text-white">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-mono text-blue-300">17.6620° N, 80.8810° E</span>
                    <span className="text-[10px] bg-black/60 px-2 py-0.5 rounded font-mono">12-OCT-2026 08:45</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Location & Time */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="flex-1 text-xs">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Recorded Base Location
                  </span>
                  <p className="font-bold text-slate-800 text-xs">{sampleLocation.name}</p>
                  <p className="text-slate-500 text-[11px]">{sampleLocation.mandal}</p>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span className="font-semibold text-slate-700">Monday, 12 Oct 2026</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span className="font-bold text-slate-900 font-mono">08:45 AM</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleConfirm}
              disabled={isSubmitting}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white rounded-2xl text-xs font-bold shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 transition-all"
            >
              {isSubmitting ? (
                <span>Confirming Attendance...</span>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  <span>Confirm Manager Punch-in</span>
                </>
              )}
            </button>
          </>
        ) : (
          <div className="bg-white rounded-2xl border border-blue-200 p-5 shadow-sm text-center space-y-4 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 mx-auto flex items-center justify-center ring-8 ring-blue-50">
              <CheckCircle className="w-9 h-9" />
            </div>

            <div>
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                Manager Punch Verified
              </span>
              <h2 className="text-lg font-bold text-slate-900 mt-2">Punch-in Active</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Recorded at <span className="font-mono font-bold text-slate-800">{managerPunchState.punchInTime}</span> for Zonal Operations.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => navigate('/manager/dashboard')}
                className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow"
              >
                Go to Manager Dashboard
              </button>
              <button
                onClick={() => setStep('ready')}
                className="w-full py-2 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-all"
              >
                Re-test Punch-in Workflow
              </button>
            </div>
          </div>
        )}
      </div>
    </MobileLayout>
  );
}
