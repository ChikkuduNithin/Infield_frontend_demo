import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DemoProvider } from './context/DemoContext';
import DemoNavbar from './layouts/DemoNavbar';

// Landing & Showcase
import LandingPage from './pages/LandingPage';
import ShowcaseGallery from './pages/showcase/ShowcaseGallery';

// Volunteer Screens
import VolunteerLogin from './pages/volunteer/VolunteerLogin';
import VolunteerPunchIn from './pages/volunteer/VolunteerPunchIn';
import VolunteerDashboard from './pages/volunteer/VolunteerDashboard';
import VolunteerCalendar from './pages/volunteer/VolunteerCalendar';
import VolunteerActivitySelect from './pages/volunteer/VolunteerActivitySelect';
import VolunteerSchoolForm from './pages/volunteer/VolunteerSchoolForm';
import VolunteerRouteHistory from './pages/volunteer/VolunteerRouteHistory';
import VolunteerPunchOut from './pages/volunteer/VolunteerPunchOut';

// Manager Screens
import ManagerLogin from './pages/manager/ManagerLogin';
import ManagerDashboard from './pages/manager/ManagerDashboard';
import ManagerPunchIn from './pages/manager/ManagerPunchIn';
import ManagerVolunteerPerformance from './pages/manager/ManagerVolunteerPerformance';
import ManagerTeamPerformance from './pages/manager/ManagerTeamPerformance';
import ManagerMonthlyReport from './pages/manager/ManagerMonthlyReport';
import ManagerDaySummary from './pages/manager/ManagerDaySummary';
import ManagerRouteHistory from './pages/manager/ManagerRouteHistory';

// Admin Screens
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUserManagement from './pages/admin/AdminUserManagement';
import AdminSchoolManagement from './pages/admin/AdminSchoolManagement';
import AdminManagerOrgManagement from './pages/admin/AdminManagerOrgManagement';
import AdminReportsHub from './pages/admin/AdminReportsHub';
import AdminMasterData from './pages/admin/AdminMasterData';

export default function App() {
  return (
    <DemoProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-slate-100 font-sans text-slate-800">
          {/* Persistent Presentation Navigation Switcher */}
          <DemoNavbar />

          {/* Main Routing Container */}
          <div className="flex-1 flex flex-col">
            <Routes>
              {/* Home & Showcase */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/showcase" element={<ShowcaseGallery />} />

              {/* Volunteer Mobile Experience */}
              <Route path="/volunteer/login" element={<VolunteerLogin />} />
              <Route path="/volunteer/punch-in" element={<VolunteerPunchIn />} />
              <Route path="/volunteer/dashboard" element={<VolunteerDashboard />} />
              <Route path="/volunteer/calendar" element={<VolunteerCalendar />} />
              <Route path="/volunteer/activity-select" element={<VolunteerActivitySelect />} />
              <Route path="/volunteer/school-form" element={<VolunteerSchoolForm />} />
              <Route path="/volunteer/route-history" element={<VolunteerRouteHistory />} />
              <Route path="/volunteer/punch-out" element={<VolunteerPunchOut />} />

              {/* Manager Mobile Experience */}
              <Route path="/manager/login" element={<ManagerLogin />} />
              <Route path="/manager/dashboard" element={<ManagerDashboard />} />
              <Route path="/manager/punch-in" element={<ManagerPunchIn />} />
              <Route path="/manager/volunteers" element={<ManagerVolunteerPerformance />} />
              <Route path="/manager/team-performance" element={<ManagerTeamPerformance />} />
              <Route path="/manager/monthly-report" element={<ManagerMonthlyReport />} />
              <Route path="/manager/day-summary" element={<ManagerDaySummary />} />
              <Route path="/manager/route-history" element={<ManagerRouteHistory />} />

              {/* Admin Web Experience */}
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<AdminUserManagement />} />
              <Route path="/admin/schools" element={<AdminSchoolManagement />} />
              <Route path="/admin/managers-orgs" element={<AdminManagerOrgManagement />} />
              <Route path="/admin/reports" element={<AdminReportsHub />} />
              <Route path="/admin/master-data" element={<AdminMasterData />} />

              {/* Catch-all redirect to Landing */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </div>
      </Router>
    </DemoProvider>
  );
}
