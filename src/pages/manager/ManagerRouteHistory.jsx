import React, { useState } from 'react';
import MobileLayout from '../../layouts/MobileLayout';
import LeafletRouteMap from '../../components/common/LeafletRouteMap';
import { SAMPLE_ROUTE_HISTORY } from '../../data/mockData';
import { useDemo } from '../../context/DemoContext';
import {
  MapPin,
  Calendar,
  User,
  Compass,
  Clock,
  ShieldAlert,
  Info,
  CheckCircle2
} from 'lucide-react';

export default function ManagerRouteHistory() {
  const { users } = useDemo();
  const coordinators = users.filter(u => u.role === 'volunteer');

  const [selectedVolId, setSelectedVolId] = useState(coordinators[0]?.id || 'USR-001');
  const [selectedDate, setSelectedDate] = useState('2026-10-10');

  const selectedVol = coordinators.find(v => v.id === selectedVolId) || coordinators[0];
  const routeData = SAMPLE_ROUTE_HISTORY;

  return (
    <MobileLayout title="Route History Audit" showBack={true} role="manager">
      <div className="space-y-4 pb-4">
        {/* Selection Bar */}
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs space-y-2.5">
          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Select Field Coordinator
            </label>
            <select
              value={selectedVolId}
              onChange={(e) => setSelectedVolId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-xs font-semibold rounded-lg px-2.5 py-2 text-slate-800 outline-none font-mono"
            >
              {coordinators.map(v => (
                <option key={v.id} value={v.id}>
                  {v.name} ({v.empId}) — {v.district}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-semibold text-slate-700">Audit Date:</span>
            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-xs font-bold rounded-lg px-2.5 py-1.5 outline-none text-slate-800 font-mono"
            >
              <option value="2026-10-10">10 Oct 2026 (Saturday)</option>
              <option value="2026-10-09">09 Oct 2026 (Friday)</option>
              <option value="2026-10-08">08 Oct 2026 (Thursday)</option>
            </select>
          </div>
        </div>

        {/* Manager Disclaimer Alert */}
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-700 flex items-start gap-2">
          <Info className="w-4 h-4 text-slate-600 mt-0.5 shrink-0" />
          <p>
            <strong>GPS Integrity:</strong> Historical geotagged breadcrumb waypoints captured during coordinator punch-in, school ISRS permissions, and ISRC collection submissions.
          </p>
        </div>

        {/* Distance & Stops Metrics */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs text-center">
            <span className="text-[10px] text-slate-500 block">Waypoints</span>
            <span className="text-sm font-bold text-slate-900 font-mono">{routeData.totalLocations} Checkpoints</span>
          </div>
          <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs text-center">
            <span className="text-[10px] text-slate-500 block">Logged Distance</span>
            <span className="text-sm font-bold text-teal-800 font-mono">{routeData.totalDistanceKm} km</span>
          </div>
          <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs text-center">
            <span className="text-[10px] text-slate-500 block">GPS Integrity</span>
            <span className="text-sm font-bold text-emerald-700 font-mono">100% Locked</span>
          </div>
        </div>

        {/* Route Map Preview */}
        <div className="space-y-1">
          <LeafletRouteMap waypoints={routeData.waypoints} height="280px" />
        </div>

        {/* Recorded Stops Timeline */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <h3 className="text-xs font-bold text-slate-900">Historical Checkpoints Timeline</h3>

          <div className="relative pl-6 space-y-3.5 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
            {routeData.waypoints.map((wp, idx) => (
              <div key={wp.id} className="relative">
                <div className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-slate-900 border-2 border-white text-white text-[10px] font-bold flex items-center justify-center">
                  {idx + 1}
                </div>

                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800 text-xs">{wp.name}</span>
                    <span className="font-mono text-slate-700 text-[11px] font-semibold">{wp.time}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-0.5">{wp.activity}</p>
                  <p className="text-[10px] text-slate-400 font-mono mt-1">
                    {wp.lat.toFixed(4)}° N, {wp.lng.toFixed(4)}° E · {wp.accuracy}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}
