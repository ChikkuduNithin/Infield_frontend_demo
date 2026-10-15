import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDemo } from '../../context/DemoContext';
import MobileLayout from '../../layouts/MobileLayout';
import { WOW_TASK_CATEGORIES } from '../../data/mockData';
import {
  School,
  GraduationCap,
  Building2,
  Home,
  Briefcase,
  Users,
  ChevronRight,
  ClipboardCheck,
  PackageCheck,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

export default function VolunteerActivitySelect() {
  const navigate = useNavigate();

  const iconMap = {
    school_visit: School,
    college_visit: GraduationCap,
    corporate_visit: Building2,
    household_propagation: Home,
    office_visit: Briefcase,
    other_activities: Users
  };

  const handleSelectTask = (taskType, defaultSubTask = '') => {
    navigate(`/volunteer/school-form?type=${taskType}${defaultSubTask ? `&sub=${defaultSubTask}` : ''}`);
  };

  return (
    <MobileLayout title="Select Field Task" showBack={true} role="coordinator">
      <div className="space-y-3 pb-4">
        {/* Intro Banner */}
        <div className="p-3 rounded-xl bg-teal-50 border border-teal-200">
          <div className="flex items-center gap-2">
            <ClipboardCheck className="w-4 h-4 text-teal-800 shrink-0" />
            <div>
              <h2 className="text-xs font-bold text-teal-950">Record Operational Task</h2>
              <p className="text-[11px] text-teal-800 mt-0.5">
                Select from the 6 official ITC WoW task workflows per PRD v3 specification.
              </p>
            </div>
          </div>
        </div>

        {/* Task Cards Grid */}
        <div className="space-y-2.5">
          {WOW_TASK_CATEGORIES.map((cat) => {
            const Icon = iconMap[cat.id] || ClipboardCheck;

            return (
              <div
                key={cat.id}
                onClick={() => handleSelectTask(cat.id, cat.subTasks[0]?.id)}
                className="p-3 bg-white rounded-xl border border-slate-200 hover:border-teal-700 transition-all cursor-pointer shadow-2xs hover:shadow-xs group"
              >
                <div className="flex items-start justify-between gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 group-hover:bg-teal-700 group-hover:text-white flex items-center justify-center shrink-0 transition-colors border border-slate-200">
                    <Icon className="w-4 h-4" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 bg-slate-100 text-slate-700 rounded border border-slate-200">
                        {cat.code}
                      </span>
                      <h3 className="text-xs font-bold text-slate-900 group-hover:text-teal-800 transition-colors">
                        {cat.label}
                      </h3>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                      {cat.description}
                    </p>

                    {/* Sub-tasks tags */}
                    <div className="flex flex-wrap gap-1 mt-2">
                      {cat.subTasks.map((st) => (
                        <span
                          key={st.id}
                          className="text-[9px] bg-slate-50 text-slate-600 px-1.5 py-0.5 rounded border border-slate-200 font-medium"
                        >
                          {st.label}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="w-6 h-6 rounded flex items-center justify-center text-slate-400 group-hover:text-teal-700 shrink-0">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-center text-[10px] text-slate-400 pt-2 font-mono">
          ITC WoW TeamPulse · Field Operations Protocol
        </p>
      </div>
    </MobileLayout>
  );
}
