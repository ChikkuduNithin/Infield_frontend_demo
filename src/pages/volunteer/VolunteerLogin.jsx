import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDemo } from '../../context/DemoContext';
import MobileLayout from '../../layouts/MobileLayout';
import { Lock, User, Eye, EyeOff, CheckCircle2, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export default function VolunteerLogin() {
  const navigate = useNavigate();
  const { currentVolunteer, setActiveRole } = useDemo();

  const [empId, setEmpId] = useState(currentVolunteer.empId);
  const [password, setPassword] = useState('demo1234');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (!empId.trim()) {
      setError('Please enter your Employee ID');
      return;
    }
    if (!password.trim()) {
      setError('Please enter your password');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setActiveRole('volunteer');
      navigate('/volunteer/dashboard');
    }, 600);
  };

  const handleQuickFill = () => {
    setEmpId(currentVolunteer.empId);
    setPassword('mari@field2026');
  };

  return (
    <MobileLayout title="Field Login" hideBottomNav={true} showBack={false} role="volunteer">
      <div className="flex flex-col justify-between min-h-[640px] pt-4 pb-2 px-1">
        <div>
          {/* Header & Logo */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-700 to-emerald-500 mx-auto flex items-center justify-center text-white font-extrabold text-2xl shadow-lg shadow-emerald-600/30 mb-3">
              M
            </div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">MARI Field Monitor</h2>
            <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
              Modern Architect Rural India in partnership with <span className="font-semibold text-slate-700">ITC Mission Sunehra Kal</span>
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            {error && (
              <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Employee ID</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={empId}
                  onChange={(e) => setEmpId(e.target.value)}
                  placeholder="e.g. MARI-VOL-101"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-mono focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
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

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 text-slate-600 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5 border-slate-300"
                />
                <span>Remember ID</span>
              </label>
              <button
                type="button"
                onClick={() => alert('Demo prototype: password recovery simulated.')}
                className="text-emerald-700 font-medium hover:underline text-[11px]"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98] mt-2"
            >
              {loading ? (
                <span>Signing In...</span>
              ) : (
                <>
                  <span>Sign In as Volunteer</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Demo Account Credentials Callout */}
          <div className="mt-4 p-3 bg-emerald-50/80 border border-emerald-200/80 rounded-2xl">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-700 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-emerald-950">Volunteer Demo Account</h4>
                  <p className="text-[11px] text-emerald-800 mt-0.5 font-mono">
                    ID: <strong>MARI-VOL-101</strong> (Rajesh Kumar)
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleQuickFill}
                className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-700 text-white rounded-lg text-[10px] font-semibold hover:bg-emerald-800 transition-colors shadow-xs"
              >
                <Sparkles className="w-3 h-3" />
                Auto-fill
              </button>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center pt-4">
          <p className="text-[10px] text-slate-400">
            Internal Field Monitoring App v1.4.0 · Static Prototype
          </p>
          <div className="flex justify-center gap-3 mt-1.5">
            <button
              onClick={() => navigate('/manager/login')}
              className="text-[11px] text-blue-600 hover:underline font-medium"
            >
              Switch to Manager Login →
            </button>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}
