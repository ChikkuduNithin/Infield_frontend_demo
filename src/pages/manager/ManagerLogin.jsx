import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDemo } from '../../context/DemoContext';
import MobileLayout from '../../layouts/MobileLayout';
import { Lock, User, Eye, EyeOff, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export default function ManagerLogin() {
  const navigate = useNavigate();
  const { currentManager, setActiveRole } = useDemo();

  const [empId, setEmpId] = useState(currentManager.empId);
  const [password, setPassword] = useState('manager2026');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setActiveRole('manager');
      navigate('/manager/dashboard');
    }, 600);
  };

  return (
    <MobileLayout title="Manager Portal Login" hideBottomNav={true} showBack={false} role="manager">
      <div className="flex flex-col justify-between min-h-[640px] pt-4 pb-2 px-1">
        <div>
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-700 to-blue-500 mx-auto flex items-center justify-center text-white font-extrabold text-2xl shadow-lg shadow-blue-600/30 mb-3">
              M
            </div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Manager Portal</h2>
            <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
              Zonal Supervisory Access · <span className="font-semibold text-slate-700">ITC CSR & MARI</span>
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Manager ID</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={empId}
                  onChange={(e) => setEmpId(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-mono outline-none focus:bg-white focus:border-blue-500"
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
                  className="w-full pl-9 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 outline-none focus:bg-white focus:border-blue-500"
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

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98] mt-2"
            >
              {loading ? (
                <span>Signing In...</span>
              ) : (
                <>
                  <span>Sign In as Manager</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-blue-950">Manager Demo Account</h4>
                <p className="text-[11px] text-blue-800 font-mono mt-0.5">
                  ID: <strong>MARI-MGR-02</strong> (Vikramaditya Rao)
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center pt-4">
          <button
            onClick={() => navigate('/volunteer/login')}
            className="text-[11px] text-emerald-700 hover:underline font-medium"
          >
            ← Switch to Volunteer Login
          </button>
        </div>
      </div>
    </MobileLayout>
  );
}
