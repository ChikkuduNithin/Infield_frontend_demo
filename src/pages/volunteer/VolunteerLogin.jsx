import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDemo } from '../../context/DemoContext';
import MobileLayout from '../../layouts/MobileLayout';
import { Lock, Phone, Eye, EyeOff, ArrowRight, ShieldCheck, Recycle } from 'lucide-react';

export default function VolunteerLogin() {
  const navigate = useNavigate();
  const { currentCoordinator, setActiveRole } = useDemo();

  const [mobileNumber, setMobileNumber] = useState(currentCoordinator.phone || '9848012345');
  const [password, setPassword] = useState('demo1234');
  const [rememberWeek, setRememberWeek] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (!mobileNumber.trim() || mobileNumber.length < 10) {
      setError('Please enter a valid 10-digit registered mobile number');
      return;
    }
    if (!password.trim()) {
      setError('Please enter your password');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setActiveRole('coordinator');
      navigate('/volunteer/dashboard');
    }, 500);
  };

  const handleQuickFill = () => {
    setMobileNumber(currentCoordinator.phone);
    setPassword('wow@field2026');
  };

  return (
    <MobileLayout title="Coordinator Sign-In" hideBottomNav={true} showBack={false} role="coordinator">
      <div className="flex flex-col justify-between min-h-[640px] pt-3 pb-2 px-1">
        <div>
          {/* Header & Logo */}
          <div className="text-center mb-5">
            <div className="w-14 h-14 rounded-xl bg-teal-800 mx-auto flex items-center justify-center text-white mb-2.5 shadow-sm border border-teal-700">
              <Recycle className="w-8 h-8 text-teal-300" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">WOW TeamPulse</h2>
            <p className="text-xs text-slate-600 mt-0.5">
              ITC WoW (Well-being Out of Waste) Field Operations
            </p>
            <span className="inline-block mt-1 text-[10px] font-semibold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
              Field Coordinator Authentication
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-3.5 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            {error && (
              <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Registered Mobile Number *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="absolute inset-y-0 left-8 flex items-center pointer-events-none text-slate-500 font-medium text-xs">
                  +91
                </div>
                <input
                  type="tel"
                  maxLength={10}
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                  placeholder="98480 12345"
                  className="w-full pl-16 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 font-mono font-medium focus:bg-white focus:border-teal-600 focus:ring-1 focus:ring-teal-600 outline-none transition-all"
                />
              </div>
              <p className="text-[10px] text-slate-500 mt-1">
                PRD spec: Login authorized for 7-day field validity
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Password *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-10 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:bg-white focus:border-teal-600 focus:ring-1 focus:ring-teal-600 outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-0.5">
              <label className="flex items-center gap-1.5 text-slate-600 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberWeek}
                  onChange={(e) => setRememberWeek(e.target.checked)}
                  className="rounded text-teal-700 focus:ring-teal-600 w-3.5 h-3.5 border-slate-300"
                />
                <span className="text-[11px]">Keep active for 1 week</span>
              </label>
              <button
                type="button"
                onClick={() => alert('Simulated: OTP sent to coordinator registered mobile for verification.')}
                className="text-teal-800 font-semibold hover:underline text-[11px]"
              >
                OTP Login
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-xs font-bold shadow-xs flex items-center justify-center gap-2 transition-all active:scale-[0.98] mt-2"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In as Coordinator</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Credentials */}
          <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-200">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Demo Account
              </span>
              <button
                type="button"
                onClick={handleQuickFill}
                className="text-[10px] text-teal-800 font-bold hover:underline"
              >
                Auto-fill
              </button>
            </div>
            <div className="text-[11px] text-slate-700 space-y-0.5 font-mono">
              <p>Mobile: <strong>{currentCoordinator.phone}</strong></p>
              <p>Coordinator: {currentCoordinator.name} ({currentCoordinator.empId})</p>
              <p>Cluster: {currentCoordinator.district}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-[10px] text-slate-500 pt-3 border-t border-slate-200">
          <p>ITC WoW Project · Mission Sunehra Kal & MARI</p>
          <p className="mt-0.5 text-slate-400">Strictly for Authorized Field Personnel Only</p>
        </div>
      </div>
    </MobileLayout>
  );
}
