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
  Briefcase
} from 'lucide-react';

export default function AdminManagerOrgManagement() {
  const { ngos, users, updateUser } = useDemo();

  const managers = users.filter(u => u.role === 'manager');
  const volunteers = users.filter(u => u.role === 'volunteer');

  const [assignModalVol, setAssignModalVol] = useState(null);
  const [selectedManagerId, setSelectedManagerId] = useState(managers[0]?.id || '');

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
      title="Manager & Organisation Allocation Matrix"
      subtitle="Coordinate field teams across partner NGOs, zonal managers, and territorial clusters"
    >
      <div className="space-y-6">
        {/* Partner NGOs Grid */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Partner Non-Governmental Organisations</h3>
              <p className="text-xs text-slate-500">Implementing agencies contracted for ITC Mission Sunehra Kal</p>
            </div>
            <span className="text-xs font-mono font-bold bg-purple-50 text-purple-700 px-2.5 py-1 rounded-lg border border-purple-200">
              {ngos.length} Active Partners
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {ngos.map((ngo) => (
              <div key={ngo.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:border-purple-300 transition-all space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm">
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
                    <span className="text-slate-500">Focal Lead:</span>
                    <span className="font-semibold text-slate-800">{ngo.contactPerson}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Field Volunteers:</span>
                    <span className="font-bold text-purple-700 font-mono">{ngo.volunteersCount} deployed</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Operational Dist:</span>
                    <span className="font-medium text-slate-700">{ngo.districts.join(', ')}</span>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Active Projects
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

        {/* Manager & Volunteer Assignment Matrix */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-3 p-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Volunteer Assignment & Supervisory Roster</h3>
              <p className="text-xs text-slate-500">Reassign reporting manager hierarchy for field volunteers</p>
            </div>
            <span className="text-xs text-slate-500">
              Showing {volunteers.length} Field Volunteers
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-2.5 px-3">Field Volunteer</th>
                  <th className="py-2.5 px-3">Organisation</th>
                  <th className="py-2.5 px-3">Territory</th>
                  <th className="py-2.5 px-3">Assigned Supervisor / Manager</th>
                  <th className="py-2.5 px-3 text-right">Reassign</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {volunteers.map((vol) => (
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
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200">
                        <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                        {vol.managerName || 'Vikramaditya Rao'}
                      </span>
                    </td>

                    <td className="py-2.5 px-3 text-right">
                      <button
                        onClick={() => handleOpenAssign(vol)}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 rounded-lg text-[11px] font-semibold transition-all"
                      >
                        Change Manager
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Change Manager Modal */}
        <Modal
          isOpen={!!assignModalVol}
          onClose={() => setAssignModalVol(null)}
          title={`Reassign Manager: ${assignModalVol?.name}`}
        >
          <form onSubmit={handleConfirmAssign} className="space-y-4">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Volunteer</span>
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
                className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 outline-none focus:bg-white focus:border-blue-500"
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
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow"
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
