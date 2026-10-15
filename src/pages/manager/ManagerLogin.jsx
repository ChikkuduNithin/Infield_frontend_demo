import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDemo } from '../../context/DemoContext';
import MobileLayout from '../../layouts/MobileLayout';
import { Lock, Phone, Eye, EyeOff, ArrowRight, ShieldCheck } from 'lucide-react';

export default function ManagerLogin() {
  const navigate = useNavigate();
  const { currentManager, setActiveRole } = useDemo();

  const [phone, setPhone] = useState('9848011223');
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
    <MobileLayout title="Supervisor Portal" hideBottomNav={true} showBack={false} role="manager">
      <div className="flex flex-col justify-between min-h-[640px] pt-4 pb-2 px-1">
        <div>
          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-xl bg-slate-900 border border-slate-800 mx-auto flex items-center justify-center text-teal-400 font-black text-xl shadow-sm mb-3">
              W
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-semibold uppercase tracking-wider mb-1">
              ITC WoW Initiative
            </div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">WOW TeamPulse</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Zonal Supervisory Access · <span className="font-semibold text-slate-700">MARI / Telangana</span>
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Registered Mobile Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  type="tel"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 font-mono outline-none focus:bg-white focus:border-slate-800"
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
                  className="w-full pl-9 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 outline-none focus:bg-white focus:border-slate-800"
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
              className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold shadow-xs flex items-center justify-center gap-2 transition-all active:scale-[0.99] mt-2"
            >
              {loading ? (
                <span>Authenticating Supervisor...</span>
              ) : (
                <>
                  <span>Sign In as Supervisor</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-4 p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-slate-700 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-slate-900">Demo Supervisor Account</h4>
                <p className="text-[11px] text-slate-600 font-mono mt-0.5">
                  Vikramaditya Rao · ID: <strong>WOW-MGR-02</strong>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center pt-4">
          <button
            onClick={() => navigate('/volunteer/login')}
            className="text-[11px] text-slate-600 hover:text-slate-900 font-medium"
          >
            ← Switch to Coordinator Login
          </button>
        </div>
      </div>
    </MobileLayout>
  );
}
