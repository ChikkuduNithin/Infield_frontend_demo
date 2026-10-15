import React, { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import Modal from '../../components/common/Modal';
import { useDemo } from '../../context/DemoContext';
import { OFFICIAL_HOLIDAYS_2026, WOW_TASK_CATEGORIES } from '../../data/mockData';
import {
  Database,
  MapPin,
  Layers,
  School,
  ClipboardList,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  Check,
  Calendar,
  Building
} from 'lucide-react';

export default function AdminMasterData() {
  const { masterData, setMasterData, holidays, addHoliday } = useDemo();
  const [activeTab, setActiveTab] = useState('holidays'); // 'holidays' | 'tasks' | 'districts' | 'states'

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newHoliday, setNewHoliday] = useState({ date: '2026-11-01', occasion: '', type: 'Gazetted Holiday' });
  const [newDistrict, setNewDistrict] = useState({ name: '', state: 'Telangana', activeSchools: 45, volunteers: 6 });

  const handleAddHoliday = (e) => {
    e.preventDefault();
    if (!newHoliday.occasion) return;
    addHoliday(newHoliday);
    setNewHoliday({ date: '2026-11-01', occasion: '', type: 'Gazetted Holiday' });
    setIsAddModalOpen(false);
  };

  const handleAddDistrict = (e) => {
    e.preventDefault();
    if (!newDistrict.name) return;
    const item = {
      id: `DST-${Math.floor(10 + Math.random() * 90)}`,
      name: newDistrict.name,
      state: newDistrict.state,
      stateId: 'ST-01',
      activeSchools: Number(newDistrict.activeSchools) || 0,
      volunteers: Number(newDistrict.volunteers) || 0
    };
    setMasterData({
      ...masterData,
      districts: [...masterData.districts, item]
    });
    setNewDistrict({ name: '', state: 'Telangana', activeSchools: 45, volunteers: 6 });
    setIsAddModalOpen(false);
  };

  return (
    <AdminLayout
      title="Master Data & Taxonomy Configuration"
      subtitle="Configure official 2026 holidays, PRD task workflows, operational clusters, and institutional classifications"
    >
      <div className="space-y-5">
        {/* Navigation Tabs */}
        <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveTab('holidays')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'holidays'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Official Holidays 2026 ({(holidays || OFFICIAL_HOLIDAYS_2026).length})</span>
            </button>

            <button
              onClick={() => setActiveTab('tasks')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'tasks'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <ClipboardList className="w-4 h-4" />
              <span>WoW Task Workflows ({(WOW_TASK_CATEGORIES || []).length})</span>
            </button>

            <button
              onClick={() => setActiveTab('districts')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'districts'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Districts ({masterData.districts.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('states')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'states'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Database className="w-4 h-4" />
              <span>States ({masterData.states.length})</span>
            </button>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs"
          >
            <Plus className="w-4 h-4 text-teal-400" />
            <span>Add Master Entry</span>
          </button>
        </div>

        {/* Tab 1: Holidays (Per PRD Cross-NGO requirement) */}
        {activeTab === 'holidays' && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-slate-900">Official Calendar Holidays 2026</h3>
                <p className="text-[11px] text-slate-500">Cross-NGO recognized holidays; coordinators cannot be marked absent on these dates</p>
              </div>
              <span className="text-[10px] bg-slate-100 text-slate-700 px-2.5 py-1 rounded font-mono font-bold">
                Mandatory Policy
              </span>
            </div>

            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Occasion / Festival</th>
                  <th className="py-3 px-4">Classification</th>
                  <th className="py-3 px-4">Calendar Rule</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {(holidays || OFFICIAL_HOLIDAYS_2026).map(h => (
                  <tr key={h.id || h.date} className="hover:bg-slate-50/60">
                    <td className="py-3 px-4 font-mono font-bold text-slate-800">{h.date}</td>
                    <td className="py-3 px-4 font-bold text-slate-900">{h.occasion}</td>
                    <td className="py-3 px-4 text-slate-600">{h.type}</td>
                    <td className="py-3 px-4">
                      <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Attendance Exempted
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 2: Task Workflows (Per PRD v3: 6 workflows) */}
        {activeTab === 'tasks' && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-100">
              <h3 className="text-xs font-bold text-slate-900">Official WOW TeamPulse Task Categories</h3>
              <p className="text-[11px] text-slate-500">Standard field activity modules configured per PRD specifications</p>
            </div>

            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-4">Task Category</th>
                  <th className="py-3 px-4">Sub-Tasks / Workflows</th>
                  <th className="py-3 px-4">Verification Artifacts Required</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {(WOW_TASK_CATEGORIES || []).map(act => (
                  <tr key={act.id} className="hover:bg-slate-50/60">
                    <td className="py-3 px-4 font-bold text-slate-900">
                      {act.title}
                    </td>
                    <td className="py-3 px-4 text-slate-700">
                      <div className="flex flex-wrap gap-1">
                        {act.subtasks?.map((st, i) => (
                          <span key={i} className="text-[10px] bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded border border-slate-200">
                            {st}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-600 text-[11px]">
                      {act.requiredArtifacts}
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200">
                        <Check className="w-3 h-3 text-emerald-600" /> Active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 3: Districts */}
        {activeTab === 'districts' && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-100">
              <h3 className="text-xs font-bold text-slate-900">District Jurisdictions</h3>
              <p className="text-[11px] text-slate-500">Active project districts across Telangana cluster</p>
            </div>
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-4">District ID</th>
                  <th className="py-3 px-4">District Name</th>
                  <th className="py-3 px-4">State</th>
                  <th className="py-3 px-4">Monitored Schools</th>
                  <th className="py-3 px-4">Field Coordinators</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {masterData.districts.map(dst => (
                  <tr key={dst.id} className="hover:bg-slate-50/60">
                    <td className="py-3 px-4 font-mono font-bold text-slate-700">{dst.id}</td>
                    <td className="py-3 px-4 font-bold text-slate-900">{dst.name}</td>
                    <td className="py-3 px-4 text-slate-700">{dst.state}</td>
                    <td className="py-3 px-4 font-mono font-semibold text-teal-800">{dst.activeSchools} Schools</td>
                    <td className="py-3 px-4 font-mono text-slate-700">{dst.volunteers} Deployed</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 4: States */}
        {activeTab === 'states' && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-100">
              <h3 className="text-xs font-bold text-slate-900">Operational States</h3>
              <p className="text-[11px] text-slate-500">States covered under ITC WoW Program</p>
            </div>
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-4">State Code</th>
                  <th className="py-3 px-4">State Name</th>
                  <th className="py-3 px-4">Active District Clusters</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {masterData.states.map(st => (
                  <tr key={st.id} className="hover:bg-slate-50/60">
                    <td className="py-3 px-4 font-mono font-bold text-teal-800">{st.code}</td>
                    <td className="py-3 px-4 font-bold text-slate-900">{st.name}</td>
                    <td className="py-3 px-4 font-mono text-slate-700">{st.activeDistricts} Districts Active</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Add Entry Modal */}
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title={`Add Master Entry (${activeTab})`}
        >
          {activeTab === 'holidays' ? (
            <form onSubmit={handleAddHoliday} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Occasion / Festival Name *</label>
                <input
                  type="text"
                  required
                  value={newHoliday.occasion}
                  onChange={(e) => setNewHoliday({ ...newHoliday, occasion: e.target.value })}
                  placeholder="e.g. Telangana Formation Day"
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Date *</label>
                  <input
                    type="date"
                    required
                    value={newHoliday.date}
                    onChange={(e) => setNewHoliday({ ...newHoliday, date: e.target.value })}
                    className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Type</label>
                  <select
                    value={newHoliday.type}
                    onChange={(e) => setNewHoliday({ ...newHoliday, type: e.target.value })}
                    className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none"
                  >
                    <option value="Gazetted Holiday">Gazetted Holiday</option>
                    <option value="State Holiday">State Holiday</option>
                    <option value="National Holiday">National Holiday</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold shadow-xs"
                >
                  Save Holiday
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleAddDistrict} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">District Name *</label>
                <input
                  type="text"
                  required
                  value={newDistrict.name}
                  onChange={(e) => setNewDistrict({ ...newDistrict, name: e.target.value })}
                  placeholder="e.g. Warangal Rural"
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">State</label>
                  <select
                    value={newDistrict.state}
                    onChange={(e) => setNewDistrict({ ...newDistrict, state: e.target.value })}
                    className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none"
                  >
                    <option value="Telangana">Telangana</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Target Schools</label>
                  <input
                    type="number"
                    value={newDistrict.activeSchools}
                    onChange={(e) => setNewDistrict({ ...newDistrict, activeSchools: e.target.value })}
                    className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold shadow-xs"
                >
                  Save District
                </button>
              </div>
            </form>
          )}
        </Modal>
      </div>
    </AdminLayout>
  );
}
