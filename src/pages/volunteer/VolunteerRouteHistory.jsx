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
  Milestone,
  Info
} from 'lucide-react';

export default function VolunteerRouteHistory() {
  const { currentVolunteer } = useDemo();
  const [selectedDate, setSelectedDate] = useState('2026-10-10');

  const routeData = SAMPLE_ROUTE_HISTORY;

  return (
    <MobileLayout title="Route History" showBack={true} role="volunteer">
      <div className="space-y-4 pb-4">
        {/* Date Selector Header */}
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-semibold text-slate-700">Select Date:</span>
          </div>
          <select
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="text-xs font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 outline-none"
          >
            <option value="2026-10-10">Saturday, 10 Oct 2026</option>
            <option value="2026-10-09">Friday, 09 Oct 2026</option>
            <option value="2026-10-08">Thursday, 08 Oct 2026</option>
          </select>
        </div>

        {/* Route Stats Overview Bar */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs text-center">
            <span className="text-[10px] text-slate-500 block">Waypoints</span>
            <span className="text-sm font-extrabold text-emerald-700 font-mono">
              {routeData.totalLocations} Stops
            </span>
          </div>
          <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs text-center">
            <span className="text-[10px] text-slate-500 block">Distance Log</span>
            <span className="text-sm font-extrabold text-blue-700 font-mono">
              {routeData.totalDistanceKm} km
            </span>
          </div>
          <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs text-center">
            <span className="text-[10px] text-slate-500 block">Field Duration</span>
            <span className="text-sm font-extrabold text-slate-800 font-mono">
              7h 30m
            </span>
          </div>
        </div>

        {/* Interactive Map Visualizer */}
        <div className="space-y-1">
          <LeafletRouteMap waypoints={routeData.waypoints} height="280px" />
          <p className="text-[10px] text-slate-400 text-center italic">
            * Historical GPS breadcrumb log recorded during field attendance.
          </p>
        </div>

        {/* Timeline of Recorded Visits */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="text-xs font-bold text-slate-900">Recorded Timeline</h3>
            <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold">
              Verified GPS Coordinates
            </span>
          </div>

          <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
            {routeData.waypoints.map((wp, idx) => (
              <div key={wp.id} className="relative group">
                {/* Marker Dot on Timeline */}
                <div className={`absolute -left-6 top-1 w-5 h-5 rounded-full border-2 flex items-center justify-center text-[10px] font-bold ${
                  idx === 0
                    ? 'bg-emerald-600 border-white text-white shadow'
                    : idx === routeData.waypoints.length - 1
                      ? 'bg-rose-600 border-white text-white shadow'
                      : 'bg-white border-emerald-500 text-emerald-700 shadow-xs'
                }`}>
                  {idx + 1}
                </div>

                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800 text-xs">{wp.name}</span>
                    <span className="font-mono text-emerald-700 text-[11px] font-semibold">{wp.time}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">{wp.activity}</p>
                  <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-400 font-mono">
                    <span>{wp.lat.toFixed(4)}° N, {wp.lng.toFixed(4)}° E</span>
                    <span>•</span>
                    <span className="text-slate-500">{wp.accuracy}</span>
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
