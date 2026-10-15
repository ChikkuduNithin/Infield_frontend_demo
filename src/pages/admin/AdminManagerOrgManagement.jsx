import React, { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import Modal from '../../components/common/Modal';
import { useDemo } from '../../context/DemoContext';
import {
  Building2,
  Users,
  ShieldCheck,
  MapPin,
  Plus,
  ArrowRight,
  Edit2,
  CheckCircle,
  Briefcase,
  Truck,
  Phone,
  Scale,
  FileText,
  Trash2
} from 'lucide-react';

export default function AdminManagerOrgManagement() {
  const { ngos, users, updateUser, franchises, addFranchise, updateFranchise, activeRole } = useDemo();

  const isWowAdmin = activeRole === 'wow_admin';
  const managers = users.filter(u => u.role === 'manager');
  const coordinators = users.filter(u => u.role === 'volunteer');

  const [activeTab, setActiveTab] = useState(isWowAdmin ? 'ngos' : 'franchises'); // 'franchises' | 'ngos' | 'roster'

  // Modal states
  const [isAddFranchiseOpen, setIsAddFranchiseOpen] = useState(false);
  const [editingFranchise, setEditingFranchise] = useState(null);
  const [assignModalVol, setAssignModalVol] = useState(null);
  const [selectedManagerId, setSelectedManagerId] = useState(managers[0]?.id || '');

  // Franchise form state
  const [franchiseForm, setFranchiseForm] = useState({
    code: '',
    name: '',
    contact: '',
    phone: '',
    gst: '',
    vehicleNo: '',
    district: 'Bhadradri Kothagudem',
    status: 'Active'
  });

  const resetFranchiseForm = () => {
    setFranchiseForm({
      code: `FR-${Math.floor(100 + Math.random() * 900)}`,
      name: '',
      contact: '',
      phone: '',
      gst: '36AAAAA0000A1Z5',
      vehicleNo: 'TS-04-UB-0000',
      district: 'Bhadradri Kothagudem',
      status: 'Active'
    });
  };

  const handleOpenAddFranchise = () => {
    resetFranchiseForm();
    setIsAddFranchiseOpen(true);
  };

  const handleSaveAddFranchise = (e) => {
    e.preventDefault();
    if (!franchiseForm.name.trim()) return alert('Franchise name is required');
    if (!franchiseForm.phone.trim()) return alert('Contact phone is required');

    addFranchise({
      ...franchiseForm,
      id: `FR-${Date.now()}`
    });

    setIsAddFranchiseOpen(false);
    resetFranchiseForm();
  };

  const handleOpenAssign = (vol) => {
    setAssignModalVol(vol);
    setSelectedManagerId(vol.managerId || managers[0]?.id || '');
  };

  const handleConfirmAssign = (e) => {
    e.preventDefault();
    if (!assignModalVol) return;

    const mgr = managers.find(m => m.id === selectedManagerId);
    updateUser(assignModalVol.id, {
      managerId: selectedManagerId,
      managerName: mgr?.name || 'Zonal Lead'
    });

    setAssignModalVol(null);
  };

  return (
    <AdminLayout
      title="Franchise & Partner Governance"
      subtitle="Material collection franchises, NGO state mandates, and coordinator supervisory rosters"
    >
      <div className="space-y-6">
        {/* Navigation Tabs */}
        <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveTab('franchises')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'franchises'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Truck className="w-4 h-4" />
              <span>Franchise Database ({franchises.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('ngos')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'ngos'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Implementing NGOs & States ({ngos.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('roster')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'roster'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Coordinator Supervisory Roster ({coordinators.length})</span>
            </button>
          </div>

          {activeTab === 'franchises' && (
            <button
              onClick={handleOpenAddFranchise}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold shadow-xs flex items-center gap-1.5 transition-all"
            >
              <Plus className="w-4 h-4 text-teal-400" />
              <span>Add Collection Franchise</span>
            </button>
          )}
        </div>

        {/* Tab 1: Franchise Database (Per PRD) */}
        {activeTab === 'franchises' && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-slate-900">Approved Material Collection Franchises</h3>
                <p className="text-[11px] text-slate-500">Authorized dry recyclables collection agencies, trucks, and weighbridge calibration</p>
              </div>
              <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-1 rounded font-mono font-bold">
                100% Calibrated Weighbridges
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="py-3 px-4">Franchise & Code</th>
                    <th className="py-3 px-4">Key Vendor Contact</th>
                    <th className="py-3 px-4">Phone Number</th>
                    <th className="py-3 px-4">GST Number</th>
                    <th className="py-3 px-4">Dedicated Vehicle</th>
                    <th className="py-3 px-4">Operational District</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {franchises.map((fr) => (
                    <tr key={fr.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 border border-slate-200">
                            <Truck className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 block">{fr.name}</span>
                            <span className="font-mono text-[10px] text-slate-500">{fr.code}</span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4 font-medium text-slate-800">
                        {fr.contact}
                      </td>

                      <td className="py-3 px-4 font-mono text-slate-700">
                        {fr.phone}
                      </td>

                      <td className="py-3 px-4 font-mono text-[11px] text-slate-600">
                        {fr.gst}
                      </td>

                      <td className="py-3 px-4 font-mono font-bold text-slate-800">
                        {fr.vehicleNo}
                      </td>

                      <td className="py-3 px-4 text-slate-700">
                        {fr.district}
                      </td>

                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                          fr.status === 'Active'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : 'bg-rose-50 text-rose-800 border border-rose-200'
                        }`}>
                          <CheckCircle className="w-3 h-3 text-emerald-600" />
                          {fr.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Partner NGOs & States (Per PRD WoW Admin role) */}
        {activeTab === 'ngos' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {ngos.map((ngo) => (
                <div key={ngo.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-900 flex items-center justify-center font-bold text-sm border border-slate-200">
                        {ngo.acronym}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 leading-tight">{ngo.name}</h4>
                        <span className="text-[10px] text-slate-400 font-mono">Reg: {ngo.regNo}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-xs space-y-1.5 pt-1 text-slate-600">
                    <div className="flex justify-between">
                      <span className="text-slate-500">State Mandates:</span>
                      <span className="font-bold text-teal-800 font-mono">{ngo.states ? ngo.states.join(', ') : 'Telangana'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Focal Lead:</span>
                      <span className="font-semibold text-slate-800">{ngo.contactPerson}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Coordinators Deployed:</span>
                      <span className="font-bold text-slate-900 font-mono">{ngo.volunteersCount} active</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Operational Districts:</span>
                      <span className="font-medium text-slate-700">{ngo.districts.join(', ')}</span>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 pt-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Active WoW Workstreams
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {ngo.activeProjects.map((proj, idx) => (
                        <span key={idx} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                          {proj}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Coordinator Supervisory Roster */}
        {activeTab === 'roster' && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden space-y-3 p-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Coordinator Supervisory Hierarchy</h3>
                <p className="text-xs text-slate-500">Assign reporting manager to each field coordinator</p>
              </div>
              <span className="text-xs text-slate-500 font-mono">
                {coordinators.length} Coordinators Mapped
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="py-2.5 px-3">Field Coordinator</th>
                    <th className="py-2.5 px-3">Implementing Agency</th>
                    <th className="py-2.5 px-3">Assigned Territory</th>
                    <th className="py-2.5 px-3">Reporting Supervisor</th>
                    <th className="py-2.5 px-3 text-right">Reassign</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {coordinators.map((vol) => (
                    <tr key={vol.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-2.5 px-3">
                        <div className="flex items-center gap-2">
                          <img src={vol.avatar} alt={vol.name} className="w-7 h-7 rounded-full object-cover" />
                          <div>
                            <span className="font-bold text-slate-900 block">{vol.name}</span>
                            <span className="text-[10px] text-slate-400 font-mono">{vol.empId}</span>
                          </div>
                        </div>
                      </td>

                      <td className="py-2.5 px-3">
                        <span className="text-slate-700 truncate block max-w-xs">{vol.org}</span>
                      </td>

                      <td className="py-2.5 px-3">
                        <span className="text-slate-800 font-medium">{vol.district}</span>
                      </td>

                      <td className="py-2.5 px-3">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-300">
                          <ShieldCheck className="w-3.5 h-3.5 text-slate-600" />
                          {vol.managerName || 'Vikramaditya Rao'}
                        </span>
                      </td>

                      <td className="py-2.5 px-3 text-right">
                        <button
                          onClick={() => handleOpenAssign(vol)}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-700 rounded-lg text-[11px] font-semibold transition-all"
                        >
                          Change Supervisor
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Add Franchise Modal */}
        <Modal
          isOpen={isAddFranchiseOpen}
          onClose={() => setIsAddFranchiseOpen(false)}
          title="Add Material Collection Franchise"
        >
          <form onSubmit={handleSaveAddFranchise} className="space-y-3.5">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Franchise Code *</label>
                <input
                  type="text"
                  required
                  value={franchiseForm.code}
                  onChange={(e) => setFranchiseForm({ ...franchiseForm, code: e.target.value })}
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Franchise / Agency Name *</label>
                <input
                  type="text"
                  required
                  value={franchiseForm.name}
                  onChange={(e) => setFranchiseForm({ ...franchiseForm, name: e.target.value })}
                  placeholder="e.g. Bhadradri Recyclers"
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Vendor Contact Person</label>
                <input
                  type="text"
                  value={franchiseForm.contact}
                  onChange={(e) => setFranchiseForm({ ...franchiseForm, contact: e.target.value })}
                  placeholder="e.g. Srinivas Rao"
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number (10 digits) *</label>
                <input
                  type="tel"
                  maxLength={10}
                  required
                  value={franchiseForm.phone}
                  onChange={(e) => setFranchiseForm({ ...franchiseForm, phone: e.target.value })}
                  placeholder="9848011223"
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">GST Registration</label>
                <input
                  type="text"
                  value={franchiseForm.gst}
                  onChange={(e) => setFranchiseForm({ ...franchiseForm, gst: e.target.value })}
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Assigned Truck / Vehicle</label>
                <input
                  type="text"
                  value={franchiseForm.vehicleNo}
                  onChange={(e) => setFranchiseForm({ ...franchiseForm, vehicleNo: e.target.value })}
                  placeholder="TS-04-UB-1044"
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Operational Cluster</label>
              <select
                value={franchiseForm.district}
                onChange={(e) => setFranchiseForm({ ...franchiseForm, district: e.target.value })}
                className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none"
              >
                <option value="Bhadradri Kothagudem">Bhadradri Kothagudem</option>
                <option value="Khammam">Khammam</option>
                <option value="Mahabubabad">Mahabubabad</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsAddFranchiseOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold shadow-xs"
              >
                Save Franchise
              </button>
            </div>
          </form>
        </Modal>

        {/* Change Manager Modal */}
        <Modal
          isOpen={!!assignModalVol}
          onClose={() => setAssignModalVol(null)}
          title={`Reassign Supervisor: ${assignModalVol?.name}`}
        >
          <form onSubmit={handleConfirmAssign} className="space-y-4">
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Coordinator</span>
              <p className="font-bold text-slate-900 text-sm mt-0.5">{assignModalVol?.name} ({assignModalVol?.empId})</p>
              <p className="text-slate-500">{assignModalVol?.district} · {assignModalVol?.org}</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Select New Supervising Manager *
              </label>
              <select
                value={selectedManagerId}
                onChange={(e) => setSelectedManagerId(e.target.value)}
                className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 outline-none focus:bg-white"
              >
                {managers.map(m => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.empId}) — {m.district}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setAssignModalVol(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold shadow-xs"
              >
                Save Assignment
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </AdminLayout>
  );
}
