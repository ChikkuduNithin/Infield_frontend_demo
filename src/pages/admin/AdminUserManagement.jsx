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
  const { users, addUser, updateUser, toggleUserStatus, ngos } = useDemo();

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
    designation: 'Field Volunteer',
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
      designation: 'Field Volunteer',
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

    addUser({
      ...formData,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      monthlyTarget: { schools: 24, students: 1200, kits: 450 },
      achieved: { schools: 0, students: 0, kits: 0 },
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

  // Filtered list
  const filteredUsers = users.filter(user => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.empId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesDistrict = districtFilter === 'all' || user.district === districtFilter;
    return matchesSearch && matchesRole && matchesDistrict;
  });

  return (
    <AdminLayout
      title="User Management & Role Access"
      subtitle="Configure enterprise user roles, district assignments, and active credentials"
    >
      <div className="space-y-5">
        {/* Header Controls Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3 flex-1">
            {/* Search */}
            <div className="relative min-w-[240px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, ID, or email..."
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-emerald-500"
              />
            </div>

            {/* Role Filter */}
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-xs font-medium rounded-xl px-3 py-2 outline-none text-slate-700"
            >
              <option value="all">All Roles</option>
              <option value="volunteer">Volunteers</option>
              <option value="manager">Managers</option>
              <option value="ngo_admin">NGO Admins</option>
              <option value="itc_admin">ITC Admins</option>
            </select>

            {/* District Filter */}
            <select
              value={districtFilter}
              onChange={(e) => setDistrictFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-xs font-medium rounded-xl px-3 py-2 outline-none text-slate-700"
            >
              <option value="all">All Districts</option>
              <option value="Bhadradri Kothagudem">Bhadradri Kothagudem</option>
              <option value="Khammam">Khammam</option>
              <option value="Mahabubabad">Mahabubabad</option>
              <option value="All Districts">State HQ / All</option>
            </select>
          </div>

          {/* Add User Button */}
          <button
            onClick={handleOpenAdd}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add New User</span>
          </button>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-4">User & ID</th>
                  <th className="py-3 px-4">System Role</th>
                  <th className="py-3 px-4">Organisation & District</th>
                  <th className="py-3 px-4">Reporting Manager</th>
                  <th className="py-3 px-4">Account Status</th>
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
                            className="w-9 h-9 rounded-full object-cover border border-slate-200"
                          />
                          <div>
                            <span className="font-bold text-slate-900 block">{user.name}</span>
                            <span className="text-[11px] text-slate-500 font-mono">{user.empId}</span>
                          </div>
                        </div>
                      </td>

                      {/* Role Badge */}
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold capitalize ${
                          user.role === 'volunteer'
                            ? 'bg-emerald-100 text-emerald-800'
                            : user.role === 'manager'
                              ? 'bg-blue-100 text-blue-800'
                              : user.role === 'ngo_admin'
                                ? 'bg-purple-100 text-purple-800'
                                : 'bg-indigo-100 text-indigo-800'
                        }`}>
                          {user.role.replace('_', ' ')}
                        </span>
                        <span className="text-[10px] text-slate-400 block mt-0.5">{user.designation}</span>
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
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold transition-all ${
                            isAct
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                              : 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100'
                          }`}
                          title="Click to toggle active / inactive demo status"
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${isAct ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                          <span>{isAct ? 'Active' : 'Inactive'}</span>
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenEdit(user)}
                            className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
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
          title="Create New User Account"
        >
          <form onSubmit={handleSaveAdd} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Ramesh Chandra"
                className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Role *</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-emerald-500"
                >
                  <option value="volunteer">Volunteer (Field App)</option>
                  <option value="manager">Manager (Zonal Portal)</option>
                  <option value="ngo_admin">NGO Admin</option>
                  <option value="itc_admin">ITC Admin (Full Access)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Designation</label>
                <input
                  type="text"
                  value={formData.designation}
                  onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                  placeholder="Field Coordinator"
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="user@mari-ngo.org"
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Phone</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98480 00000"
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Assigned NGO</label>
                <select
                  value={formData.org}
                  onChange={(e) => setFormData({ ...formData, org: e.target.value })}
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none"
                >
                  {ngos.map(n => <option key={n.id} value={n.name}>{n.name}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">District</label>
                <select
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none"
                >
                  <option value="Bhadradri Kothagudem">Bhadradri Kothagudem</option>
                  <option value="Khammam">Khammam</option>
                  <option value="Mahabubabad">Mahabubabad</option>
                  <option value="All Districts">All Districts</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Reporting Manager</label>
              <select
                value={formData.managerName}
                onChange={(e) => setFormData({ ...formData, managerName: e.target.value })}
                className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none"
              >
                <option value="Vikramaditya Rao">Vikramaditya Rao (MARI Zonal Lead)</option>
                <option value="Dr. Ananya Sen">Dr. Ananya Sen (ITC CSR General Manager)</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
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
                Create User
              </button>
            </div>
          </form>
        </Modal>

        {/* Edit User Modal */}
        <Modal
          isOpen={!!editingUser}
          onClose={() => setEditingUser(null)}
          title={`Edit User: ${editingUser?.name}`}
        >
          <form onSubmit={handleSaveEdit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Role *</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none"
                >
                  <option value="volunteer">Volunteer (Field App)</option>
                  <option value="manager">Manager (Zonal Portal)</option>
                  <option value="ngo_admin">NGO Admin</option>
                  <option value="itc_admin">ITC Admin</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Designation</label>
                <input
                  type="text"
                  value={formData.designation}
                  onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">District</label>
                <select
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none"
                >
                  <option value="Bhadradri Kothagudem">Bhadradri Kothagudem</option>
                  <option value="Khammam">Khammam</option>
                  <option value="Mahabubabad">Mahabubabad</option>
                  <option value="All Districts">All Districts</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Reporting Manager</label>
                <input
                  type="text"
                  value={formData.managerName}
                  onChange={(e) => setFormData({ ...formData, managerName: e.target.value })}
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setEditingUser(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow"
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
