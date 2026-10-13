import React, { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import Modal from '../../components/common/Modal';
import { useDemo } from '../../context/DemoContext';
import {
  School,
  Search,
  Plus,
  Filter,
  Edit2,
  Eye,
  MapPin,
  Phone,
  Users,
  CheckCircle2,
  Calendar,
  Layers
} from 'lucide-react';

export default function AdminSchoolManagement() {
  const { schools, addSchool, updateSchool } = useDemo();

  const [searchQuery, setSearchQuery] = useState('');
  const [districtFilter, setDistrictFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [viewingSchool, setViewingSchool] = useState(null);
  const [editingSchool, setEditingSchool] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    udise: '',
    category: 'High School (Grades 6-10)',
    district: 'Bhadradri Kothagudem',
    state: 'Telangana',
    village: '',
    headmaster: '',
    phone: '',
    studentsCount: 250,
    teachersCount: 10,
    lat: 17.6500,
    lng: 80.8900
  });

  const resetForm = () => {
    setFormData({
      name: '',
      udise: '',
      category: 'High School (Grades 6-10)',
      district: 'Bhadradri Kothagudem',
      state: 'Telangana',
      village: '',
      headmaster: '',
      phone: '',
      studentsCount: 250,
      teachersCount: 10,
      lat: 17.6500,
      lng: 80.8900
    });
  };

  const handleOpenAdd = () => {
    resetForm();
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (school) => {
    setEditingSchool(school);
    setFormData({ ...school });
  };

  const handleSaveAdd = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return alert('School name is required');
    if (!formData.udise.trim()) return alert('UDISE code is required');

    addSchool(formData);
    setIsAddModalOpen(false);
    resetForm();
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingSchool) return;

    updateSchool(editingSchool.id, formData);
    setEditingSchool(null);
    resetForm();
  };

  const filteredSchools = schools.filter(s => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.udise.includes(searchQuery) ||
      s.village.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDistrict = districtFilter === 'all' || s.district === districtFilter;
    const matchesCat = categoryFilter === 'all' || s.category.includes(categoryFilter);
    return matchesSearch && matchesDistrict && matchesCat;
  });

  return (
    <AdminLayout
      title="School Registry & Monitoring Index"
      subtitle="Comprehensive geo-tagged directory of project schools under ITC Mission Sunehra Kal"
    >
      <div className="space-y-5">
        {/* Header Controls Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3 flex-1">
            <div className="relative min-w-[240px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search school name, UDISE or village..."
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-emerald-500"
              />
            </div>

            <select
              value={districtFilter}
              onChange={(e) => setDistrictFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-xs font-medium rounded-xl px-3 py-2 outline-none text-slate-700"
            >
              <option value="all">All Districts</option>
              <option value="Bhadradri Kothagudem">Bhadradri Kothagudem</option>
              <option value="Khammam">Khammam</option>
              <option value="Mahabubabad">Mahabubabad</option>
            </select>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-xs font-medium rounded-xl px-3 py-2 outline-none text-slate-700"
            >
              <option value="all">All School Types</option>
              <option value="High School">High Schools</option>
              <option value="Primary School">Primary Schools</option>
              <option value="Residential">Residential Schools</option>
              <option value="Model School">Model Schools</option>
            </select>
          </div>

          <button
            onClick={handleOpenAdd}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Register New School</span>
          </button>
        </div>

        {/* Schools Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-4">School Name & Category</th>
                  <th className="py-3 px-4">UDISE Code</th>
                  <th className="py-3 px-4">District / Location</th>
                  <th className="py-3 px-4">Headmaster Contact</th>
                  <th className="py-3 px-4">Enrolment</th>
                  <th className="py-3 px-4">Last Visited</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredSchools.map((school) => (
                  <tr key={school.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200">
                          <School className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="font-bold text-slate-900 block">{school.name}</span>
                          <span className="text-[11px] text-slate-500">{school.category}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                        {school.udise}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <span className="font-medium text-slate-800 block">{school.district}</span>
                      <span className="text-[11px] text-slate-500">{school.village}</span>
                    </td>

                    <td className="py-3 px-4">
                      <span className="text-slate-800 font-medium block">{school.headmaster}</span>
                      <span className="text-[11px] text-slate-500 font-mono">{school.phone}</span>
                    </td>

                    <td className="py-3 px-4">
                      <span className="font-bold font-mono text-slate-900">{school.studentsCount} Students</span>
                      <span className="text-[10px] text-slate-400 block">{school.teachersCount} Teachers</span>
                    </td>

                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                        <Calendar className="w-3 h-3" />
                        {school.lastVisited}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setViewingSchool(school)}
                          className="p-1.5 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
                          title="View Details & GPS"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenEdit(school)}
                          className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit School"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* View School Details Drawer Modal */}
        <Modal
          isOpen={!!viewingSchool}
          onClose={() => setViewingSchool(null)}
          title={viewingSchool?.name || "School Details"}
        >
          {viewingSchool && (
            <div className="space-y-4">
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  UDISE Identification
                </span>
                <p className="text-base font-bold text-slate-900 font-mono">{viewingSchool.udise}</p>
                <p className="text-xs text-slate-600">{viewingSchool.category}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[10px] text-slate-500 block">District</span>
                  <span className="font-bold text-slate-800">{viewingSchool.district}</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[10px] text-slate-500 block">Village / Mandal</span>
                  <span className="font-bold text-slate-800">{viewingSchool.village}</span>
                </div>
              </div>

              <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-950">Headmaster / Principal</span>
                  <span className="text-[10px] text-emerald-700 font-mono">{viewingSchool.phone}</span>
                </div>
                <p className="text-emerald-900">{viewingSchool.headmaster}</p>
              </div>

              <div className="p-3 bg-slate-900 text-white rounded-xl text-xs flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block">GPS Coordinates</span>
                  <span className="font-mono font-bold text-emerald-400">
                    {viewingSchool.lat}° N, {viewingSchool.lng}° E
                  </span>
                </div>
                <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-1 rounded">
                  Geo-Fence Active
                </span>
              </div>

              <button
                onClick={() => setViewingSchool(null)}
                className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold"
              >
                Close View
              </button>
            </div>
          )}
        </Modal>

        {/* Add School Modal */}
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Register New School Record"
        >
          <form onSubmit={handleSaveAdd} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">School Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. ZPHS Kothagudem Central"
                className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">UDISE Code (11 digits) *</label>
                <input
                  type="text"
                  required
                  value={formData.udise}
                  onChange={(e) => setFormData({ ...formData, udise: e.target.value })}
                  placeholder="36210100777"
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none"
                >
                  <option value="Primary School (Grades 1-5)">Primary School</option>
                  <option value="High School (Grades 6-10)">High School</option>
                  <option value="Model School (Grades 6-12)">Government Model School</option>
                  <option value="Residential High School">Tribal Residential School</option>
                </select>
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
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Village / Mandal</label>
                <input
                  type="text"
                  value={formData.village}
                  onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                  placeholder="e.g. Manuguru Mandal"
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Headmaster Name</label>
                <input
                  type="text"
                  value={formData.headmaster}
                  onChange={(e) => setFormData({ ...formData, headmaster: e.target.value })}
                  placeholder="Principal Name"
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Contact Phone</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 94400 00000"
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none"
                />
              </div>
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
                Save School
              </button>
            </div>
          </form>
        </Modal>

        {/* Edit School Modal */}
        <Modal
          isOpen={!!editingSchool}
          onClose={() => setEditingSchool(null)}
          title={`Edit School: ${editingSchool?.name}`}
        >
          <form onSubmit={handleSaveEdit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">School Name *</label>
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
                <label className="block text-xs font-semibold text-slate-700 mb-1">UDISE Code</label>
                <input
                  type="text"
                  value={formData.udise}
                  onChange={(e) => setFormData({ ...formData, udise: e.target.value })}
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono outline-none"
                />
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
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setEditingSchool(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow"
              >
                Update School
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </AdminLayout>
  );
}
