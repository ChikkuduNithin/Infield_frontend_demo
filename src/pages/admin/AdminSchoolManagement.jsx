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
  Layers,
  GraduationCap,
  Building,
  Scale
} from 'lucide-react';

export default function AdminSchoolManagement() {
  const { schools, colleges, corporates, addSchool, updateSchool } = useDemo();

  const [activeTab, setActiveTab] = useState('schools'); // 'schools' | 'colleges' | 'corporates'
  const [searchQuery, setSearchQuery] = useState('');
  const [districtFilter, setDistrictFilter] = useState('all');

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [viewingItem, setViewingItem] = useState(null);
  const [editingSchool, setEditingSchool] = useState(null);

  // Form data for school
  const [schoolForm, setSchoolForm] = useState({
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
    isrsStatus: 'Approved',
    lastVisited: '12 Oct 2026'
  });

  const resetSchoolForm = () => {
    setSchoolForm({
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
      isrsStatus: 'Approved',
      lastVisited: '12 Oct 2026'
    });
  };

  const handleOpenAdd = () => {
    resetSchoolForm();
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (school) => {
    setEditingSchool(school);
    setSchoolForm({ ...school });
  };

  const handleSaveAdd = (e) => {
    e.preventDefault();
    if (!schoolForm.name.trim()) return alert('Institution name is required');
    if (activeTab === 'schools' && !schoolForm.udise.trim()) return alert('UDISE code is required');

    addSchool(schoolForm);
    setIsAddModalOpen(false);
    resetSchoolForm();
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingSchool) return;

    updateSchool(editingSchool.id, schoolForm);
    setEditingSchool(null);
    resetSchoolForm();
  };

  const filteredSchools = schools.filter(s => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.udise?.includes(searchQuery) ||
      s.village?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDistrict = districtFilter === 'all' || s.district === districtFilter;
    return matchesSearch && matchesDistrict;
  });

  const filteredColleges = (colleges || []).filter(c => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.principal?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDistrict = districtFilter === 'all' || c.district === districtFilter;
    return matchesSearch && matchesDistrict;
  });

  const filteredCorporates = (corporates || []).filter(cp => {
    const matchesSearch =
      cp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cp.contact?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDistrict = districtFilter === 'all' || cp.district === districtFilter;
    return matchesSearch && matchesDistrict;
  });

  return (
    <AdminLayout
      title="State Database: Institutional Directory"
      subtitle="Comprehensive state registry of participating Schools (ISRS/ISRC), Colleges, and Corporate recovery partners"
    >
      <div className="space-y-5">
        {/* Navigation Tabs between Schools, Colleges, Corporates */}
        <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => { setActiveTab('schools'); setSearchQuery(''); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'schools'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <School className="w-4 h-4" />
              <span>School Database ({schools.length})</span>
            </button>

            <button
              onClick={() => { setActiveTab('colleges'); setSearchQuery(''); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'colleges'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>College Database ({(colleges || []).length})</span>
            </button>

            <button
              onClick={() => { setActiveTab('corporates'); setSearchQuery(''); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'corporates'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Building className="w-4 h-4" />
              <span>Corporate Database ({(corporates || []).length})</span>
            </button>
          </div>

          <button
            onClick={handleOpenAdd}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold shadow-xs flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-4 h-4 text-teal-400" />
            <span>
              {activeTab === 'schools' ? 'Register School' : activeTab === 'colleges' ? 'Add College' : 'Add Corporate'}
            </span>
          </button>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
          <div className="relative min-w-[280px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search in ${activeTab}...`}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:bg-white focus:border-slate-800"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={districtFilter}
              onChange={(e) => setDistrictFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-xs font-medium rounded-lg px-3 py-2 outline-none text-slate-700"
            >
              <option value="all">All District Clusters</option>
              <option value="Bhadradri Kothagudem">Bhadradri Kothagudem</option>
              <option value="Khammam">Khammam</option>
              <option value="Mahabubabad">Mahabubabad</option>
            </select>
          </div>
        </div>

        {/* Table 1: School Database */}
        {activeTab === 'schools' && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="py-3 px-4">School & Type</th>
                    <th className="py-3 px-4">UDISE Code</th>
                    <th className="py-3 px-4">District / Mandal</th>
                    <th className="py-3 px-4">Principal Contact</th>
                    <th className="py-3 px-4">ISRS Permission</th>
                    <th className="py-3 px-4">Last Drive</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredSchools.map((school) => (
                    <tr key={school.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center shrink-0 border border-slate-200">
                            <School className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 block">{school.name}</span>
                            <span className="text-[11px] text-slate-500">{school.category}</span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
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
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Granted
                        </span>
                      </td>

                      <td className="py-3 px-4 font-mono text-slate-600">
                        {school.lastVisited}
                      </td>

                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setViewingItem(school)}
                            className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                            title="View Record"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleOpenEdit(school)}
                            className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                            title="Edit Record"
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
        )}

        {/* Table 2: College Database */}
        {activeTab === 'colleges' && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="py-3 px-4">College Name</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">District</th>
                    <th className="py-3 px-4">Principal / NSS Lead</th>
                    <th className="py-3 px-4">Student Strength</th>
                    <th className="py-3 px-4">Cumulative Dry Waste</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredColleges.map((col) => (
                    <tr key={col.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3 px-4 font-bold text-slate-900">
                        <div className="flex items-center gap-2">
                          <GraduationCap className="w-4 h-4 text-slate-600" />
                          <span>{col.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-700">{col.category}</td>
                      <td className="py-3 px-4 text-slate-700">{col.district}</td>
                      <td className="py-3 px-4">
                        <span className="font-medium text-slate-900 block">{col.principal}</span>
                        <span className="text-[11px] text-slate-500 font-mono">{col.phone}</span>
                      </td>
                      <td className="py-3 px-4 font-mono">{col.students} Students</td>
                      <td className="py-3 px-4 font-mono font-bold text-teal-800">{col.lastRecoveryKg || 420} kg</td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => setViewingItem(col)}
                          className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Table 3: Corporate Database */}
        {activeTab === 'corporates' && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="py-3 px-4">Corporate Entity</th>
                    <th className="py-3 px-4">Industry Sector</th>
                    <th className="py-3 px-4">Territory</th>
                    <th className="py-3 px-4">Facility / CSR Contact</th>
                    <th className="py-3 px-4">Collection Schedule</th>
                    <th className="py-3 px-4">Dry Waste MTD</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredCorporates.map((corp) => (
                    <tr key={corp.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3 px-4 font-bold text-slate-900">
                        <div className="flex items-center gap-2">
                          <Building className="w-4 h-4 text-slate-600" />
                          <span>{corp.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-700">{corp.sector}</td>
                      <td className="py-3 px-4 text-slate-700">{corp.district}</td>
                      <td className="py-3 px-4">
                        <span className="font-medium text-slate-900 block">{corp.contact}</span>
                        <span className="text-[11px] text-slate-500 font-mono">{corp.phone}</span>
                      </td>
                      <td className="py-3 px-4 text-slate-600 font-medium">{corp.frequency}</td>
                      <td className="py-3 px-4 font-mono font-bold text-teal-800">{corp.lastRecoveryKg || 1200} kg</td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => setViewingItem(corp)}
                          className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* View Details Modal */}
        <Modal
          isOpen={!!viewingItem}
          onClose={() => setViewingItem(null)}
          title={viewingItem?.name || "Institution Details"}
        >
          {viewingItem && (
            <div className="space-y-4">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Identifier
                </span>
                <p className="text-sm font-bold text-slate-900 font-mono">{viewingItem.udise || viewingItem.id}</p>
                <p className="text-xs text-slate-600">{viewingItem.category || viewingItem.sector}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">District</span>
                  <span className="font-bold text-slate-800">{viewingItem.district}</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">Location / Mandal</span>
                  <span className="font-bold text-slate-800">{viewingItem.village || viewingItem.location || 'Central'}</span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">Key Stakeholder</span>
                  <span className="text-[10px] text-slate-600 font-mono">{viewingItem.phone}</span>
                </div>
                <p className="text-slate-800">{viewingItem.headmaster || viewingItem.principal || viewingItem.contact}</p>
              </div>

              <button
                onClick={() => setViewingItem(null)}
                className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold"
              >
                Close View
              </button>
            </div>
          )}
        </Modal>

        {/* Add Institution Modal */}
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Register Institution in State Database"
        >
          <form onSubmit={handleSaveAdd} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Institution Name *</label>
              <input
                type="text"
                required
                value={schoolForm.name}
                onChange={(e) => setSchoolForm({ ...schoolForm, name: e.target.value })}
                placeholder="e.g. ZPHS Kothagudem Central"
                className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:bg-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">UDISE / Registration *</label>
                <input
                  type="text"
                  required
                  value={schoolForm.udise}
                  onChange={(e) => setSchoolForm({ ...schoolForm, udise: e.target.value })}
                  placeholder="36210100777"
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                <select
                  value={schoolForm.category}
                  onChange={(e) => setSchoolForm({ ...schoolForm, category: e.target.value })}
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none"
                >
                  <option value="Primary School (Grades 1-5)">Primary School</option>
                  <option value="High School (Grades 6-10)">High School</option>
                  <option value="Model School (Grades 6-12)">Model School</option>
                  <option value="Degree College">Degree College</option>
                  <option value="Engineering College">Engineering College</option>
                  <option value="Corporate Entity">Corporate Entity</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">District</label>
                <select
                  value={schoolForm.district}
                  onChange={(e) => setSchoolForm({ ...schoolForm, district: e.target.value })}
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none"
                >
                  <option value="Bhadradri Kothagudem">Bhadradri Kothagudem</option>
                  <option value="Khammam">Khammam</option>
                  <option value="Mahabubabad">Mahabubabad</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Mandal / Town</label>
                <input
                  type="text"
                  value={schoolForm.village}
                  onChange={(e) => setSchoolForm({ ...schoolForm, village: e.target.value })}
                  placeholder="e.g. Manuguru"
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Contact Person</label>
                <input
                  type="text"
                  value={schoolForm.headmaster}
                  onChange={(e) => setSchoolForm({ ...schoolForm, headmaster: e.target.value })}
                  placeholder="Principal / Lead"
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile Phone</label>
                <input
                  type="tel"
                  maxLength={10}
                  value={schoolForm.phone}
                  onChange={(e) => setSchoolForm({ ...schoolForm, phone: e.target.value })}
                  placeholder="9440012345"
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono outline-none"
                />
              </div>
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
                Save Institution
              </button>
            </div>
          </form>
        </Modal>

        {/* Edit School Modal */}
        <Modal
          isOpen={!!editingSchool}
          onClose={() => setEditingSchool(null)}
          title={`Edit Institution: ${editingSchool?.name}`}
        >
          <form onSubmit={handleSaveEdit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Institution Name *</label>
              <input
                type="text"
                required
                value={schoolForm.name}
                onChange={(e) => setSchoolForm({ ...schoolForm, name: e.target.value })}
                className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">UDISE Code</label>
                <input
                  type="text"
                  value={schoolForm.udise}
                  onChange={(e) => setSchoolForm({ ...schoolForm, udise: e.target.value })}
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">District</label>
                <select
                  value={schoolForm.district}
                  onChange={(e) => setSchoolForm({ ...schoolForm, district: e.target.value })}
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none"
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
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold shadow-xs"
              >
                Update Record
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </AdminLayout>
  );
}
