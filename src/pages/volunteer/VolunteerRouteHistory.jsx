import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import MobileLayout from '../../layouts/MobileLayout';
import LeafletRouteMap from '../../components/common/LeafletRouteMap';
import { SAMPLE_ROUTE_HISTORY } from '../../data/mockData';
import {
  Calendar,
  MapPin,
  Clock,
  Compass,
  Navigation,
  CheckCircle2,
  Milestone
} from 'lucide-react';

export default function VolunteerRouteHistory() {
  const { currentCoordinator } = useDemo();
  const [selectedDate, setSelectedDate] = useState('2026-10-10');

  const routeData = SAMPLE_ROUTE_HISTORY;

  return (
    <MobileLayout title="GPS Route Trail" showBack={true} role="coordinator">
      <div className="space-y-3 pb-4">
        {/* Date Selector Header */}
        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-teal-700" />
            <span className="text-xs font-bold text-slate-700">Audit Date:</span>
          </div>
          <select
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="text-xs font-bold text-slate-900 bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1 outline-none"
          >
            <option value="2026-10-10">Saturday, 10 Oct 2026</option>
            <option value="2026-10-09">Friday, 09 Oct 2026</option>
            <option value="2026-10-08">Thursday, 08 Oct 2026</option>
          </select>
        </div>

        {/* Route Stats Overview Bar */}
        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-[10px] text-slate-500 block">Waypoints</span>
            <span className="text-sm font-bold text-teal-800 font-mono">
              {routeData.totalLocations} Checkpoints
            </span>
          </div>
          <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-[10px] text-slate-500 block">Total Distance</span>
            <span className="text-sm font-bold text-blue-800 font-mono">
              {routeData.totalDistanceKm} km
            </span>
          </div>
          <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-[10px] text-slate-500 block">Field Duty</span>
            <span className="text-sm font-bold text-slate-900 font-mono">
              7h 30m
            </span>
          </div>
        </div>

        {/* Interactive Map Visualizer */}
        <div className="space-y-1">
          <LeafletRouteMap waypoints={routeData.waypoints} height="280px" />
          <p className="text-[10px] text-slate-500 text-center font-mono">
            * Historical GPS breadcrumbs recorded during field attendance.
          </p>
        </div>

        {/* Timeline of Recorded Visits */}
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs space-y-2.5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="text-xs font-bold text-slate-900">Recorded Stops & Actions</h3>
            <span className="text-[10px] font-mono text-teal-800 bg-teal-50 px-2 py-0.5 rounded font-bold border border-teal-200">
              Verified Breadcrumbs
            </span>
          </div>

          <div className="relative pl-6 space-y-3 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
            {routeData.waypoints.map((wp, idx) => (
              <div key={wp.id} className="relative group">
                {/* Marker Dot on Timeline */}
                <div className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center text-[10px] font-bold ${
                  idx === 0
                    ? 'bg-teal-700 border-white text-white shadow-xs'
                    : idx === routeData.waypoints.length - 1
                      ? 'bg-rose-700 border-white text-white shadow-xs'
                      : 'bg-white border-teal-700 text-teal-800 shadow-2xs'
                }`}>
                  {idx + 1}
                </div>

                <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900 text-xs">{wp.name}</span>
                    <span className="font-mono text-teal-800 text-[11px] font-bold">{wp.time}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-0.5">{wp.activity}</p>
                  <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-500 font-mono">
                    <span>{wp.lat.toFixed(4)}° N, {wp.lng.toFixed(4)}° E</span>
                    <span>•</span>
                    <span>{wp.accuracy}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}
