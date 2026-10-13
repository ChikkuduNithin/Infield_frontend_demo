import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDemo } from '../../context/DemoContext';
import MobileLayout from '../../layouts/MobileLayout';
import { ACTIVITY_CATEGORIES } from '../../data/mockData';
import {
  GraduationCap,
  Stethoscope,
  Megaphone,
  Users,
  Briefcase,
  MoreHorizontal,
  ChevronRight,
  ClipboardList,
  Sparkles
} from 'lucide-react';

export default function VolunteerActivitySelect() {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState('school_visit');

  const iconMap = {
    GraduationCap,
    Stethoscope,
    Megaphone,
    Users,
    Briefcase,
    MoreHorizontal
  };

  const handleSelectActivity = (typeId) => {
    navigate(`/volunteer/school-form?type=${typeId}`);
  };

  return (
    <MobileLayout title="Select Field Activity" showBack={true} role="volunteer">
      <div className="space-y-4 pb-4">
        {/* Intro Banner */}
        <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <ClipboardList className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xs font-bold text-emerald-950">Record New Activity</h2>
              <p className="text-[11px] text-emerald-800">
                Choose the program activity to log field visit details.
              </p>
            </div>
          </div>
        </div>

        {/* Category List Cards */}
        <div className="space-y-2.5">
          {ACTIVITY_CATEGORIES.map((cat) => {
            const Icon = iconMap[cat.icon] || ClipboardList;
            const isSelected = selectedType === cat.id;

            return (
              <div
                key={cat.id}
                onClick={() => handleSelectActivity(cat.id)}
                className={`p-3.5 bg-white rounded-2xl border transition-all cursor-pointer shadow-xs hover:shadow-md flex items-center justify-between gap-3 group ${
                  isSelected
                    ? 'border-emerald-500 ring-2 ring-emerald-500/20'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105"
                    style={{ backgroundColor: `${cat.color}18`, color: cat.color }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                        {cat.label}
                      </h3>
                      {cat.id === 'school_visit' && (
                        <span className="text-[9px] font-bold px-1.5 py-0.2 bg-emerald-100 text-emerald-800 rounded">
                          Primary
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                      {cat.description}
                    </p>
                  </div>
                </div>

                <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-400 group-hover:bg-emerald-600 group-hover:text-white flex items-center justify-center shrink-0 transition-all">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-center text-[10px] text-slate-400 pt-2">
          Select any activity above to open its validated field submission form.
        </p>
      </div>
    </MobileLayout>
  );
}
