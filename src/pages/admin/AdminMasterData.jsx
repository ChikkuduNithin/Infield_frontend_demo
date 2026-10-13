import React, { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import Modal from '../../components/common/Modal';
import { useDemo } from '../../context/DemoContext';
import { ACTIVITY_CATEGORIES } from '../../data/mockData';
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
  Check
} from 'lucide-react';

export default function AdminMasterData() {
  const { masterData, setMasterData } = useDemo();
  const [activeTab, setActiveTab] = useState('districts'); // 'states' | 'districts' | 'activities' | 'schoolCats'

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newDistrict, setNewDistrict] = useState({ name: '', state: 'Telangana', activeSchools: 45, volunteers: 6 });
  const [newState, setNewState] = useState({ name: '', code: '' });
  const [newSchoolCat, setNewSchoolCat] = useState({ code: '', name: '', count: 10 });

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

  const handleAddState = (e) => {
    e.preventDefault();
    if (!newState.name) return;
    const item = {
      id: `ST-${Math.floor(10 + Math.random() * 90)}`,
      name: newState.name,
      code: newState.code.toUpperCase(),
      activeDistricts: 1
    };
    setMasterData({
      ...masterData,
      states: [...masterData.states, item]
    });
    setNewState({ name: '', code: '' });
    setIsAddModalOpen(false);
  };

  const handleAddSchoolCat = (e) => {
    e.preventDefault();
    if (!newSchoolCat.name) return;
    const item = {
      id: `CAT-${Math.floor(10 + Math.random() * 90)}`,
      code: newSchoolCat.code.toUpperCase() || 'CAT',
      name: newSchoolCat.name,
      count: Number(newSchoolCat.count) || 0
    };
    setMasterData({
      ...masterData,
      schoolCategories: [...masterData.schoolCategories, item]
    });
    setNewSchoolCat({ code: '', name: '', count: 10 });
    setIsAddModalOpen(false);
  };

  return (
    <AdminLayout
      title="Master Data & Taxonomy Configuration"
      subtitle="Configure administrative jurisdictions, school categories, and field activity types"
    >
      <div className="space-y-5">
        {/* Navigation Tabs */}
        <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveTab('districts')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'districts'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Districts ({masterData.districts.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('states')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'states'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Database className="w-4 h-4" />
              <span>States ({masterData.states.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('schoolCats')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'schoolCats'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <School className="w-4 h-4" />
              <span>School Categories ({masterData.schoolCategories.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('activities')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'activities'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <ClipboardList className="w-4 h-4" />
              <span>Activity Types ({ACTIVITY_CATEGORIES.length})</span>
            </button>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Master Entry</span>
          </button>
        </div>

        {/* Tab 1: Districts */}
        {activeTab === 'districts' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-slate-900">District Jurisdictions</h3>
                <p className="text-[11px] text-slate-500">Active project districts across Andhra Pradesh & Telangana</p>
              </div>
            </div>
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-4">District ID</th>
                  <th className="py-3 px-4">District Name</th>
                  <th className="py-3 px-4">State</th>
                  <th className="py-3 px-4">Monitored Schools</th>
                  <th className="py-3 px-4">Field Volunteers</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {masterData.districts.map(dst => (
                  <tr key={dst.id} className="hover:bg-slate-50/60">
                    <td className="py-3 px-4 font-mono font-bold text-slate-700">{dst.id}</td>
                    <td className="py-3 px-4 font-bold text-slate-900">{dst.name}</td>
                    <td className="py-3 px-4 text-slate-700">{dst.state}</td>
                    <td className="py-3 px-4 font-mono font-semibold text-emerald-700">{dst.activeSchools} Schools</td>
                    <td className="py-3 px-4 font-mono text-blue-700">{dst.volunteers} Deployed</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 2: States */}
        {activeTab === 'states' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100">
              <h3 className="text-xs font-bold text-slate-900">Operational States</h3>
              <p className="text-[11px] text-slate-500">States in southern India zone covered under ITC CSR</p>
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
                    <td className="py-3 px-4 font-mono font-bold text-blue-700">{st.code}</td>
                    <td className="py-3 px-4 font-bold text-slate-900">{st.name}</td>
                    <td className="py-3 px-4 font-mono text-slate-700">{st.activeDistricts} Districts Active</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 3: School Categories */}
        {activeTab === 'schoolCats' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100">
              <h3 className="text-xs font-bold text-slate-900">School Category Classifications</h3>
              <p className="text-[11px] text-slate-500">Department of School Education institutional taxonomy</p>
            </div>
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-4">Code</th>
                  <th className="py-3 px-4">Category Name</th>
                  <th className="py-3 px-4">Total Registered</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {masterData.schoolCategories.map(cat => (
                  <tr key={cat.id} className="hover:bg-slate-50/60">
                    <td className="py-3 px-4 font-mono font-bold text-purple-700">{cat.code}</td>
                    <td className="py-3 px-4 font-bold text-slate-900">{cat.name}</td>
                    <td className="py-3 px-4 font-mono font-bold text-emerald-700">{cat.count} Schools</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 4: Activity Types */}
        {activeTab === 'activities' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100">
              <h3 className="text-xs font-bold text-slate-900">Field Activity Modules</h3>
              <p className="text-[11px] text-slate-500">Standard field activity forms supported on Volunteer Mobile App</p>
            </div>
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-4">Activity Name</th>
                  <th className="py-3 px-4">Module Description</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {ACTIVITY_CATEGORIES.map(act => (
                  <tr key={act.id} className="hover:bg-slate-50/60">
                    <td className="py-3 px-4 font-bold text-slate-900 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: act.color }}></span>
                      {act.label}
                    </td>
                    <td className="py-3 px-4 text-slate-600">{act.description}</td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                        <Check className="w-3 h-3 text-emerald-600" /> Active
                      </span>
                    </td>
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
          title={`Add New ${activeTab === 'districts' ? 'District' : activeTab === 'states' ? 'State' : 'School Category'}`}
        >
          {activeTab === 'districts' && (
            <form onSubmit={handleAddDistrict} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">District Name *</label>
                <input
                  type="text"
                  required
                  value={newDistrict.name}
                  onChange={(e) => setNewDistrict({ ...newDistrict, name: e.target.value })}
                  placeholder="e.g. Warangal Rural"
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">State</label>
                  <select
                    value={newDistrict.state}
                    onChange={(e) => setNewDistrict({ ...newDistrict, state: e.target.value })}
                    className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none"
                  >
                    <option value="Telangana">Telangana</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Karnataka">Karnataka</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Target Schools</label>
                  <input
                    type="number"
                    value={newDistrict.activeSchools}
                    onChange={(e) => setNewDistrict({ ...newDistrict, activeSchools: e.target.value })}
                    className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow"
                >
                  Save District
                </button>
              </div>
            </form>
          )}

          {activeTab === 'states' && (
            <form onSubmit={handleAddState} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">State Name *</label>
                <input
                  type="text"
                  required
                  value={newState.name}
                  onChange={(e) => setNewState({ ...newState, name: e.target.value })}
                  placeholder="e.g. Tamil Nadu"
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">State Code (2 letters)</label>
                <input
                  type="text"
                  maxLength={3}
                  value={newState.code}
                  onChange={(e) => setNewState({ ...newState, code: e.target.value })}
                  placeholder="TN"
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono outline-none"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow"
                >
                  Save State
                </button>
              </div>
            </form>
          )}

          {activeTab === 'schoolCats' && (
            <form onSubmit={handleAddSchoolCat} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Category Name *</label>
                <input
                  type="text"
                  required
                  value={newSchoolCat.name}
                  onChange={(e) => setNewSchoolCat({ ...newSchoolCat, name: e.target.value })}
                  placeholder="e.g. Kasturba Model Balika Vidyalaya"
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Code</label>
                  <input
                    type="text"
                    value={newSchoolCat.code}
                    onChange={(e) => setNewSchoolCat({ ...newSchoolCat, code: e.target.value })}
                    placeholder="KMBV"
                    className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Count</label>
                  <input
                    type="number"
                    value={newSchoolCat.count}
                    onChange={(e) => setNewSchoolCat({ ...newSchoolCat, count: e.target.value })}
                    className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold shadow"
                >
                  Save Category
                </button>
              </div>
            </form>
          )}

          {activeTab === 'activities' && (
            <div className="p-3 text-xs text-slate-600">
              Activity types are defined by the core MARI Field Monitoring taxonomy and verified against the field report schema.
            </div>
          )}
        </Modal>
      </div>
    </AdminLayout>
  );
}
