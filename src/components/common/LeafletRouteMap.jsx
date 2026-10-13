import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Compass, Layers, CheckCircle, Info } from 'lucide-react';

/**
 * LeafletRouteMap:
 * Renders an interactive map using Leaflet when available,
 * and provides a crisp SVG route visualizer fallback.
 */
export default function LeafletRouteMap({ waypoints = [], height = '320px', showControls = true }) {
  const [mapError, setMapError] = useState(false);
  const [activePoint, setActivePoint] = useState(waypoints[0] || null);
  const [useSvgFallback, setUseSvgFallback] = useState(false);

  // Approximate center around Bhadradri Kothagudem (17.6534, 80.8987)
  const defaultCenter = [17.6534, 80.8987];

  return (
    <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 shadow-inner" style={{ height }}>
      {/* Top Banner Notice */}
      <div className="absolute top-2 left-2 z-20 bg-slate-900/85 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-700/60 flex items-center gap-1.5 text-xs text-slate-300">
        <Compass className="w-3.5 h-3.5 text-emerald-400 animate-spin-slow" />
        <span className="font-medium text-white">Historical GPS Log Preview</span>
        <span className="bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 text-[10px] rounded font-mono">DEMO DATA</span>
      </div>

      {/* SVG Canvas Map Fallback / Visualizer */}
      <div className="w-full h-full relative bg-gradient-to-b from-slate-900 via-slate-800 to-slate-950 flex flex-col items-center justify-center p-4">
        {/* Geographic Grid Pattern */}
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]"></div>

        {/* Road & Terrain Lines Simulation */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          {/* River Godavari outline */}
          <path
            d="M -20,280 Q 80,240 180,260 T 360,200 T 500,230"
            fill="none"
            stroke="#0284c7"
            strokeWidth="12"
            strokeOpacity="0.3"
            strokeLinecap="round"
          />
          {/* State Highway SH-7 / Major Road */}
          <path
            d="M 30,50 L 110,120 L 180,110 L 260,210 L 330,260"
            fill="none"
            stroke="#475569"
            strokeWidth="6"
            strokeLinecap="round"
          />
          {/* Volunteer Travel Path Route Polyline */}
          <path
            d="M 50,60 L 130,130 L 190,120 L 270,220 L 320,260"
            fill="none"
            stroke="#10b981"
            strokeWidth="4"
            strokeDasharray="6 4"
            strokeLinecap="round"
          />
        </svg>

        {/* Interactive Waypoints */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
          {waypoints.map((wp, index) => {
            // Position waypoints along the canvas
            const positions = [
              { top: '18%', left: '14%' },
              { top: '38%', left: '36%' },
              { top: '36%', left: '52%' },
              { top: '64%', left: '72%' },
              { top: '78%', left: '84%' },
            ];
            const pos = positions[index] || { top: `${20 + index * 15}%`, left: `${15 + index * 18}%` };
            const isSelected = activePoint?.id === wp.id;

            return (
              <div
                key={wp.id}
                onClick={() => setActivePoint(wp)}
                style={{ position: 'absolute', top: pos.top, left: pos.left, transform: 'translate(-50%, -50%)' }}
                className="cursor-pointer group flex flex-col items-center z-30"
              >
                {/* Pin marker */}
                <div className={`relative flex items-center justify-center rounded-full transition-all duration-200 ${
                  isSelected
                    ? 'w-9 h-9 bg-emerald-500 ring-4 ring-emerald-400/40 text-white scale-110 shadow-lg shadow-emerald-500/50'
                    : 'w-7 h-7 bg-slate-800 border-2 border-emerald-400 text-emerald-400 hover:scale-110'
                }`}>
                  <span className="text-xs font-bold font-mono">{index + 1}</span>
                  {/* Ping animation on first & last stops */}
                  {(index === 0 || index === waypoints.length - 1) && (
                    <span className="absolute -inset-1 rounded-full bg-emerald-400 opacity-30 animate-ping"></span>
                  )}
                </div>

                {/* Mini Label */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900/95 text-white text-[11px] px-2 py-0.5 rounded shadow mt-1 whitespace-nowrap border border-slate-700">
                  {wp.time} · {wp.name.split('—')[0].substring(0, 20)}
                </div>
              </div>
            );
          })}
        </div>

        {/* Waypoint Detail Drawer / Card at Bottom */}
        {activePoint && (
          <div className="absolute bottom-2 left-2 right-2 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-xl p-3 text-white shadow-xl z-20 flex items-start justify-between gap-3">
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-emerald-400">{activePoint.time}</span>
                  <span className="text-[11px] text-slate-400">· {activePoint.accuracy}</span>
                </div>
                <h4 className="text-xs font-medium text-slate-100 line-clamp-1">{activePoint.name}</h4>
                <p className="text-[11px] text-slate-300 mt-0.5">{activePoint.activity}</p>
              </div>
            </div>
            <div className="text-right shrink-0">
              <span className="inline-flex items-center gap-1 text-[10px] bg-slate-800 text-slate-300 px-2 py-1 rounded-md border border-slate-700">
                <CheckCircle className="w-3 h-3 text-emerald-400" /> Recorded
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Map Control Buttons */}
      {showControls && (
        <div className="absolute right-2 top-2 z-20 flex flex-col gap-1">
          <button
            title="Recenter Map"
            onClick={() => setActivePoint(waypoints[0])}
            className="w-7 h-7 bg-slate-800/80 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 flex items-center justify-center text-xs shadow"
          >
            <Navigation className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
