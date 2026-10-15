import React, { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import Modal from '../../components/common/Modal';
import { useDemo } from '../../context/DemoContext';
import {
  Users,
  Search,
  Plus,
  Filter,
  Edit2,
  Trash2,
  CheckCircle,
  XCircle,
  Shield,
  Building,
  MapPin,
  Mail,
  Phone,
  Power
} from 'lucide-react';

export default function AdminUserManagement() {
  const { users, addUser, updateUser, toggleUserStatus, ngos, activeRole } = useDemo();

  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [districtFilter, setDistrictFilter] = useState('all');

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    role: 'volunteer',
    designation: 'Field Coordinator',
    email: '',
    phone: '',
    org: 'MARI - Modern Architect Rural India',
    state: 'Telangana',
    district: 'Bhadradri Kothagudem',
    managerId: 'USR-004',
    managerName: 'Vikramaditya Rao'
  });

  const resetForm = () => {
    setFormData({
      name: '',
      role: 'volunteer',
      designation: 'Field Coordinator',
      email: '',
      phone: '',
      org: 'MARI - Modern Architect Rural India',
      state: 'Telangana',
      district: 'Bhadradri Kothagudem',
      managerId: 'USR-004',
      managerName: 'Vikramaditya Rao'
    });
  };

  const handleOpenAdd = () => {
    resetForm();
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      role: user.role,
      designation: user.designation,
      email: user.email,
      phone: user.phone,
      org: user.org,
      state: user.state,
      district: user.district,
      managerId: user.managerId || '',
      managerName: user.managerName || ''
    });
  };

  const handleSaveAdd = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return alert('Name is required');
    if (!formData.phone.trim()) return alert('Registered mobile number is required for app login');

    addUser({
      ...formData,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      monthlyTarget: { kg: 4500, schools: 24, colleges: 4, corporates: 2 },
      achieved: { kg: 0, schools: 0, colleges: 0, corporates: 0 },
      attendanceRate: 100
    });

    setIsAddModalOpen(false);
    resetForm();
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingUser) return;

    updateUser(editingUser.id, formData);
    setEditingUser(null);
    resetForm();
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.empId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone?.includes(searchQuery) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesDistrict = districtFilter === 'all' || user.district === districtFilter;
    return matchesSearch && matchesRole && matchesDistrict;
  });

  return (
    <AdminLayout
      title="Employee Database & Role Assignment"
      subtitle="Configure credentials, mobile numbers, district territories, and supervisory hierarchies"
    >
      <div className="space-y-5">
        {/* Header Controls Bar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3 flex-1">
            {/* Search */}
            <div className="relative min-w-[240px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, ID, or mobile number..."
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:bg-white focus:border-slate-800"
              />
            </div>

            {/* Role Filter */}
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-xs font-medium rounded-lg px-3 py-2 outline-none text-slate-700"
            >
              <option value="all">All Roles</option>
              <option value="volunteer">Coordinators</option>
              <option value="manager">Supervisors / Managers</option>
              <option value="ngo_admin">NGO Admins</option>
              <option value="wow_admin">WoW Admins</option>
            </select>

            {/* District Filter */}
            <select
              value={districtFilter}
              onChange={(e) => setDistrictFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-xs font-medium rounded-lg px-3 py-2 outline-none text-slate-700"
            >
              <option value="all">All Territories</option>
              <option value="Bhadradri Kothagudem">Bhadradri Kothagudem</option>
              <option value="Khammam">Khammam</option>
              <option value="Mahabubabad">Mahabubabad</option>
              <option value="All Districts">State HQ / All</option>
            </select>
          </div>

          {/* Add User Button */}
          <button
            onClick={handleOpenAdd}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold shadow-xs flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-4 h-4 text-teal-400" />
            <span>Add New Employee</span>
          </button>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-4">Employee & ID</th>
                  <th className="py-3 px-4">System Role</th>
                  <th className="py-3 px-4">Registered Mobile</th>
                  <th className="py-3 px-4">Agency & Territory</th>
                  <th className="py-3 px-4">Reporting Lead</th>
                  <th className="py-3 px-4">Access Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.map((user) => {
                  const isAct = user.status === 'active';

                  return (
                    <tr key={user.id} className="hover:bg-slate-50/60 transition-colors">
                      {/* Name & ID */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-8 h-8 rounded-full object-cover border border-slate-200"
                          />
                          <div>
                            <span className="font-bold text-slate-900 block">{user.name}</span>
                            <span className="text-[11px] text-slate-500 font-mono">{user.empId}</span>
                          </div>
                        </div>
                      </td>

                      {/* Role Badge */}
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          user.role === 'volunteer'
                            ? 'bg-slate-100 text-slate-800 border border-slate-300'
                            : user.role === 'manager'
                              ? 'bg-blue-50 text-blue-800 border border-blue-200'
                              : user.role === 'ngo_admin'
                                ? 'bg-purple-50 text-purple-800 border border-purple-200'
                                : 'bg-teal-50 text-teal-800 border border-teal-200'
                        }`}>
                          {user.role === 'volunteer' ? 'Coordinator' : user.role.replace('_', ' ')}
                        </span>
                        <span className="text-[10px] text-slate-400 block mt-0.5">{user.designation}</span>
                      </td>

                      {/* Mobile */}
                      <td className="py-3 px-4">
                        <span className="font-mono text-xs text-slate-800 flex items-center gap-1">
                          <Phone className="w-3 h-3 text-slate-400" />
                          {user.phone || '98480 00000'}
                        </span>
                        <span className="text-[10px] text-slate-400">Login Key</span>
                      </td>

                      {/* Org & District */}
                      <td className="py-3 px-4">
                        <span className="font-medium text-slate-800 block truncate max-w-xs">{user.org}</span>
                        <span className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          {user.district} ({user.state})
                        </span>
                      </td>

                      {/* Manager */}
                      <td className="py-3 px-4">
                        <span className="text-slate-700 font-medium">
                          {user.managerName || 'Direct to HQ'}
                        </span>
                      </td>

                      {/* Status Toggle */}
                      <td className="py-3 px-4">
                        <button
                          onClick={() => toggleUserStatus(user.id)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold transition-all ${
                            isAct
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                              : 'bg-rose-50 text-rose-800 border border-rose-200 hover:bg-rose-100'
                          }`}
                          title="Click to toggle active / inactive demo status"
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${isAct ? 'bg-emerald-600' : 'bg-rose-600'}`} />
                          <span>{isAct ? 'Active' : 'Disabled'}</span>
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenEdit(user)}
                            className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                            title="Edit User"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add User Modal */}
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Register New Employee Record"
        >
          <form onSubmit={handleSaveAdd} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Full Legal Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Ramesh Chandra"
                className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:bg-white focus:border-slate-800"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">System Role *</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:bg-white focus:border-slate-800"
                >
                  <option value="volunteer">Coordinator (Field Mobile App)</option>
                  <option value="manager">Supervisor / Manager (Portal)</option>
                  <option value="ngo_admin">NGO Admin (Web Console)</option>
                  <option value="wow_admin">WoW Admin (National HQ)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Designation</label>
                <input
                  type="text"
                  value={formData.designation}
                  onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                  placeholder="Field Coordinator"
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:bg-white focus:border-slate-800"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile Number (10 digits) *</label>
                <input
                  type="tel"
                  maxLength={10}
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="9848012345"
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="user@mari-ngo.org"
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Implementing Agency</label>
                <select
                  value={formData.org}
                  onChange={(e) => setFormData({ ...formData, org: e.target.value })}
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none"
                >
                  {ngos.map(n => <option key={n.id} value={n.name}>{n.name}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Cluster / District</label>
                <select
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none"
                >
                  <option value="Bhadradri Kothagudem">Bhadradri Kothagudem</option>
                  <option value="Khammam">Khammam</option>
                  <option value="Mahabubabad">Mahabubabad</option>
                  <option value="All Districts">All Districts (HQ)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Reporting Supervisor</label>
              <select
                value={formData.managerName}
                onChange={(e) => setFormData({ ...formData, managerName: e.target.value })}
                className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none"
              >
                <option value="Vikramaditya Rao">Vikramaditya Rao (MARI Zonal Lead)</option>
                <option value="Dr. Ananya Sen">Dr. Ananya Sen (ITC WoW General Manager)</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
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
                Create Record
              </button>
            </div>
          </form>
        </Modal>

        {/* Edit User Modal */}
        <Modal
          isOpen={!!editingUser}
          onClose={() => setEditingUser(null)}
          title={`Edit Employee Record: ${editingUser?.name}`}
        >
          <form onSubmit={handleSaveEdit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Full Legal Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none"
                >
                  <option value="volunteer">Coordinator</option>
                  <option value="manager">Supervisor</option>
                  <option value="ngo_admin">NGO Admin</option>
                  <option value="wow_admin">WoW Admin</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile Number</label>
                <input
                  type="tel"
                  maxLength={10}
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Cluster / District</label>
                <select
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none"
                >
                  <option value="Bhadradri Kothagudem">Bhadradri Kothagudem</option>
                  <option value="Khammam">Khammam</option>
                  <option value="Mahabubabad">Mahabubabad</option>
                  <option value="All Districts">All Districts</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Reporting Supervisor</label>
                <input
                  type="text"
                  value={formData.managerName}
                  onChange={(e) => setFormData({ ...formData, managerName: e.target.value })}
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setEditingUser(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold shadow-xs"
              >
                Save Changes
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </AdminLayout>
  );
}
