import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_USERS,
  INITIAL_SCHOOLS,
  INITIAL_COLLEGES,
  INITIAL_CORPORATES,
  INITIAL_FRANCHISES,
  INITIAL_MUNICIPALITIES,
  INITIAL_NGOS,
  INITIAL_ATTENDANCE_OCT2026,
  INITIAL_TODAY_ACTIVITIES,
  INITIAL_PENDING_ACTIVITIES,
  INITIAL_CORRECTION_REQUESTS,
  INITIAL_MANAGER_ATTENDANCE_OCT2026,
  INITIAL_MANAGER_LEAVE_REQUESTS,
  OFFICIAL_HOLIDAYS_2026,
  DOWNLOAD_DOCUMENTS,
  MASTER_DATA
} from '../data/mockData';

const DemoContext = createContext(null);

const STORAGE_KEY = 'wow_teampulse_demo_state_v2';

export const DemoProvider = ({ children }) => {
  // Active role: 'coordinator' | 'manager' | 'ngo_admin' | 'wow_admin'
  const [activeRole, setActiveRole] = useState(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_role`);
    if (saved === 'volunteer') return 'coordinator';
    if (saved === 'itc_admin') return 'wow_admin';
    return saved || 'coordinator';
  });

  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_users`);
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [schools, setSchools] = useState(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_schools`);
    return saved ? JSON.parse(saved) : INITIAL_SCHOOLS;
  });

  const [colleges, setColleges] = useState(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_colleges`);
    return saved ? JSON.parse(saved) : INITIAL_COLLEGES;
  });

  const [corporates, setCorporates] = useState(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_corporates`);
    return saved ? JSON.parse(saved) : INITIAL_CORPORATES;
  });

  const [franchises, setFranchises] = useState(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_franchises`);
    return saved ? JSON.parse(saved) : INITIAL_FRANCHISES;
  });

  const [municipalities] = useState(INITIAL_MUNICIPALITIES);

  const [ngos, setNgos] = useState(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_ngos`);
    return saved ? JSON.parse(saved) : INITIAL_NGOS;
  });

  const [masterData, setMasterData] = useState(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_master`);
    return saved ? JSON.parse(saved) : MASTER_DATA;
  });

  // Coordinator attendance punch-in state
  const [punchState, setPunchState] = useState(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_punch`);
    return saved ? JSON.parse(saved) : {
      isPunchedIn: true,
      isPunchedOut: false,
      punchInTime: '09:04 AM',
      punchInDate: '2026-10-15',
      punchInLocation: 'ZPHS Sarapaka Cluster, Bhadradri Kothagudem (17.6534° N, 80.8987° E)',
      punchInPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
      punchOutTime: null,
      punchOutSummary: null
    };
  });

  // Manager punch-in state
  const [managerPunchState, setManagerPunchState] = useState(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_mgr_punch`);
    return saved ? JSON.parse(saved) : {
      isPunchedIn: true,
      punchInTime: '08:45 AM',
      punchInDate: '2026-10-15',
      location: 'ITC WoW Zonal Operations Hub, Bhadrachalam Road (17.6620° N, 80.8810° E)'
    };
  });

  // Activities logged today
  const [todayActivities, setTodayActivities] = useState(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_activities`);
    return saved ? JSON.parse(saved) : INITIAL_TODAY_ACTIVITIES;
  });

  // Pending activities (awaiting acknowledgement form / weighbridge slips)
  const [pendingActivities, setPendingActivities] = useState(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_pending_activities`);
    return saved ? JSON.parse(saved) : INITIAL_PENDING_ACTIVITIES;
  });

  // Attendance correction requests
  const [correctionRequests, setCorrectionRequests] = useState(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_corrections`);
    return saved ? JSON.parse(saved) : INITIAL_CORRECTION_REQUESTS;
  });

  // Holidays list
  const [holidays, setHolidays] = useState(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_holidays`);
    return saved ? JSON.parse(saved) : OFFICIAL_HOLIDAYS_2026;
  });

  // Monthly coordinator calendar
  const [calendarAttendance, setCalendarAttendance] = useState(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_calendar`);
    return saved ? JSON.parse(saved) : INITIAL_ATTENDANCE_OCT2026;
  });

  // Manager attendance records (Audited & corrected by NGO Admin)
  const [managerAttendance, setManagerAttendance] = useState(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_manager_attendance`);
    return saved ? JSON.parse(saved) : INITIAL_MANAGER_ATTENDANCE_OCT2026;
  });

  // Manager leave & correction requests (Approved by NGO Admin)
  const [managerLeaveRequests, setManagerLeaveRequests] = useState(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_manager_leave_requests`);
    return saved ? JSON.parse(saved) : INITIAL_MANAGER_LEAVE_REQUESTS;
  });

  // Mobile Device Preview Mode: 'frame' or 'full'
  const [deviceFrameMode, setDeviceFrameMode] = useState('frame');

  // Active user profiles
  const currentCoordinator = users.find(u => u.role === 'coordinator' || u.role === 'volunteer') || users[0];
  const currentVolunteer = currentCoordinator; // backward compatibility alias
  const currentManager = users.find(u => u.role === 'manager') || users[3];
  const currentNgoAdmin = users.find(u => u.role === 'ngo_admin') || users[5];
  const currentWowAdmin = users.find(u => u.role === 'wow_admin' || u.role === 'itc_admin') || users[4];
  const currentAdmin = activeRole === 'ngo_admin' ? currentNgoAdmin : currentWowAdmin;

  // Persist state to local storage
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_role`, activeRole);
  }, [activeRole]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_users`, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_schools`, JSON.stringify(schools));
  }, [schools]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_colleges`, JSON.stringify(colleges));
  }, [colleges]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_corporates`, JSON.stringify(corporates));
  }, [corporates]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_franchises`, JSON.stringify(franchises));
  }, [franchises]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_ngos`, JSON.stringify(ngos));
  }, [ngos]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_pending_activities`, JSON.stringify(pendingActivities));
  }, [pendingActivities]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_corrections`, JSON.stringify(correctionRequests));
  }, [correctionRequests]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_holidays`, JSON.stringify(holidays));
  }, [holidays]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_activities`, JSON.stringify(todayActivities));
  }, [todayActivities]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_calendar`, JSON.stringify(calendarAttendance));
  }, [calendarAttendance]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_manager_attendance`, JSON.stringify(managerAttendance));
  }, [managerAttendance]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_manager_leave_requests`, JSON.stringify(managerLeaveRequests));
  }, [managerLeaveRequests]);

  // Actions
  const handlePunchIn = (details) => {
    const newState = {
      isPunchedIn: true,
      isPunchedOut: false,
      punchInTime: details.time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      punchInDate: details.date || '2026-10-15',
      punchInLocation: details.location || 'MPPS Sarapaka Mandal (17.6534° N, 80.8987° E)',
      punchInPhoto: details.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
      punchOutTime: null,
      punchOutSummary: null
    };
    setPunchState(newState);

    setCalendarAttendance(prev => prev.map(item => item.isToday ? { ...item, status: 'today', punchIn: newState.punchInTime } : item));
  };

  const handlePunchOut = (summary) => {
    const punchOutTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newState = {
      ...punchState,
      isPunchedOut: true,
      punchOutTime,
      punchOutSummary: summary
    };
    setPunchState(newState);

    setCalendarAttendance(prev => prev.map(item => item.isToday ? {
      ...item,
      status: 'full_day',
      punchOut: punchOutTime,
      schools: todayActivities.length || 2,
      kgCollected: todayActivities.reduce((acc, curr) => acc + (Number(curr.quantityCollected) || Number(curr.quantityAchieved) || 0), 0)
    } : item));
  };

  const handleManagerPunchIn = (details) => {
    setManagerPunchState({
      isPunchedIn: true,
      punchInTime: details.time || '08:45 AM',
      punchInDate: details.date || '2026-10-15',
      location: details.location || 'ITC WoW Zonal Hub, Bhadrachalam Road (17.6620° N, 80.8810° E)'
    });
  };

  const addActivity = (activity) => {
    const newActivity = {
      id: `ACT-${Math.floor(10000 + Math.random() * 90000)}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      verified: true,
      ...activity
    };
    setTodayActivities([newActivity, ...todayActivities]);

    // Check if acknowledgement form is missing for a collection drive
    if (activity.subTask && activity.subTask.includes('collection') && !activity.acknowledgementUploaded) {
      const newPending = {
        id: `PEND-${Math.floor(100 + Math.random() * 900)}`,
        entityType: activity.taskType === 'school_visit' ? 'School' : activity.taskType === 'college_visit' ? 'College' : 'Corporate',
        entityName: activity.entityName || activity.schoolName,
        activityType: activity.taskName || 'Collection Drive',
        coordinatorId: currentCoordinator.id,
        coordinatorName: currentCoordinator.name,
        date: '2026-10-15',
        collectedKg: activity.quantityCollected || 0,
        verifiedKg: activity.verifiedQuantity || 0,
        franchiseName: activity.franchiseName || 'ITC WoW MRF Center',
        missingItem: 'Collection Drive Acknowledgement Form',
        status: 'Pending Form Upload'
      };
      setPendingActivities(prev => [newPending, ...prev]);
    }

    return newActivity;
  };

  const resolvePendingActivity = (pendingId, uploadedFileUrl) => {
    setPendingActivities(prev => prev.filter(p => p.id !== pendingId));
  };

  const addCorrectionRequest = (requestData) => {
    const newReq = {
      id: `CR-${String(correctionRequests.length + 1).padStart(2, '0')}`,
      coordinatorId: currentCoordinator.id,
      coordinatorName: currentCoordinator.name,
      status: 'Pending Approval',
      approvedBy: 'Awaiting Manager Review',
      ...requestData
    };
    setCorrectionRequests([newReq, ...correctionRequests]);
    return newReq;
  };

  const approveCorrectionRequest = (reqId, approvedByName = 'Vikramaditya Rao (Manager)') => {
    setCorrectionRequests(prev => prev.map(r => r.id === reqId ? { ...r, status: 'Approved', approvedBy: approvedByName } : r));
  };

  const addUser = (userData) => {
    const newUser = {
      id: `USR-${String(users.length + 1).padStart(3, '0')}`,
      empId: `WOW-${userData.role.substring(0, 3).toUpperCase()}-${100 + users.length}`,
      status: 'active',
      ...userData
    };
    setUsers([...users, newUser]);
    return newUser;
  };

  const updateUser = (id, updatedFields) => {
    setUsers(users.map(u => u.id === id ? { ...u, ...updatedFields } : u));
  };

  const toggleUserStatus = (id) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } : u));
  };

  const addSchool = (schoolData) => {
    const newSchool = {
      id: `SCH-${String(schools.length + 1).padStart(3, '0')}`,
      status: 'Active',
      lastVisited: 'Not Visited',
      isrcEnrolled: true,
      ...schoolData
    };
    setSchools([...schools, newSchool]);
    return newSchool;
  };

  const updateSchool = (id, updatedFields) => {
    setSchools(schools.map(s => s.id === id ? { ...s, ...updatedFields } : s));
  };

  const addCollege = (collegeData) => {
    const newCollege = {
      id: `COL-${String(colleges.length + 1).padStart(3, '0')}`,
      status: 'Active',
      ...collegeData
    };
    setColleges([...colleges, newCollege]);
    return newCollege;
  };

  const addCorporate = (corpData) => {
    const newCorp = {
      id: `CORP-${String(corporates.length + 1).padStart(3, '0')}`,
      status: 'Active',
      ...corpData
    };
    setCorporates([...corporates, newCorp]);
    return newCorp;
  };

  const addFranchise = (franchiseData) => {
    const newFr = {
      id: `FR-${String(franchises.length + 1).padStart(3, '0')}`,
      status: 'Active',
      ...franchiseData
    };
    setFranchises([...franchises, newFr]);
    return newFr;
  };

  const updateFranchise = (id, updatedFields) => {
    setFranchises(franchises.map(f => f.id === id ? { ...f, ...updatedFields } : f));
  };

  const deleteFranchise = (id) => {
    setFranchises(franchises.filter(f => f.id !== id));
  };

  const approveManagerLeave = (requestId, decision = 'Approved', notes = '') => {
    const req = managerLeaveRequests.find(r => r.id === requestId);
    if (!req) return;

    setManagerLeaveRequests(prev => prev.map(r => r.id === requestId ? {
      ...r,
      status: decision === 'Approved' ? 'Approved by NGO Admin' : 'Rejected by NGO Admin',
      approvalNotes: notes || (decision === 'Approved' ? 'Leave regularized after reviewing documentary evidence' : 'Rejected due to inadequate explanation'),
      approvedAt: new Date().toLocaleDateString()
    } : r));

    if (decision === 'Approved') {
      const targetStatus = req.type.includes('Missed Punch') ? 'corrected' : 'leave';
      setManagerAttendance(prev => prev.map(item => {
        if (item.date === req.date || item.requestId === requestId) {
          return {
            ...item,
            status: targetStatus,
            note: `${req.type} Approved by NGO Admin (${notes || 'Regularized'})`,
            punchIn: req.requestedPunchIn || item.punchIn || '08:45 AM',
            punchOut: req.requestedPunchOut || item.punchOut || '06:00 PM',
            isLeave: targetStatus === 'leave',
            isCorrected: true
          };
        }
        return item;
      }));
    }
  };

  const correctManagerAttendance = (date, newStatus, reason = '', punchIn = '08:45 AM', punchOut = '06:00 PM') => {
    setManagerAttendance(prev => {
      const exists = prev.some(item => item.date === date);
      if (exists) {
        return prev.map(item => item.date === date ? {
          ...item,
          status: newStatus,
          note: `Corrected by NGO Admin: ${reason}`,
          punchIn: newStatus === 'absent' || newStatus === 'leave' ? '-' : punchIn,
          punchOut: newStatus === 'absent' || newStatus === 'leave' ? '-' : punchOut,
          isLeave: newStatus === 'leave',
          isAbsent: newStatus === 'absent',
          isCorrected: true
        } : item);
      } else {
        const d = new Date(date);
        return [...prev, {
          day: d.getDate(),
          date,
          dayOfWeek: d.toLocaleDateString('en-US', { weekday: 'short' }),
          status: newStatus,
          punchIn: newStatus === 'absent' || newStatus === 'leave' ? '-' : punchIn,
          punchOut: newStatus === 'absent' || newStatus === 'leave' ? '-' : punchOut,
          note: `Corrected by NGO Admin: ${reason}`,
          isCorrected: true
        }];
      }
    });
  };

  const resetAllDemoData = () => {
    localStorage.clear();
    setActiveRole('coordinator');
    setUsers(INITIAL_USERS);
    setSchools(INITIAL_SCHOOLS);
    setColleges(INITIAL_COLLEGES);
    setCorporates(INITIAL_CORPORATES);
    setFranchises(INITIAL_FRANCHISES);
    setNgos(INITIAL_NGOS);
    setPendingActivities(INITIAL_PENDING_ACTIVITIES);
    setCorrectionRequests(INITIAL_CORRECTION_REQUESTS);
    setHolidays(OFFICIAL_HOLIDAYS_2026);
    setTodayActivities(INITIAL_TODAY_ACTIVITIES);
    setCalendarAttendance(INITIAL_ATTENDANCE_OCT2026);
    setManagerAttendance(INITIAL_MANAGER_ATTENDANCE_OCT2026);
    setManagerLeaveRequests(INITIAL_MANAGER_LEAVE_REQUESTS);
  };

  return (
    <DemoContext.Provider value={{
      activeRole,
      setActiveRole,
      users,
      schools,
      colleges,
      corporates,
      franchises,
      municipalities,
      ngos,
      masterData,
      setMasterData,
      currentCoordinator,
      currentVolunteer,
      currentManager,
      currentNgoAdmin,
      currentWowAdmin,
      currentAdmin,
      punchState,
      managerPunchState,
      todayActivities,
      pendingActivities,
      correctionRequests,
      holidays,
      downloads: DOWNLOAD_DOCUMENTS,
      calendarAttendance,
      managerAttendance,
      managerLeaveRequests,
      approveManagerLeave,
      correctManagerAttendance,
      deviceFrameMode,
      setDeviceFrameMode,
      handlePunchIn,
      handlePunchOut,
      handleManagerPunchIn,
      addActivity,
      resolvePendingActivity,
      addCorrectionRequest,
      approveCorrectionRequest,
      addUser,
      updateUser,
      toggleUserStatus,
      addSchool,
      updateSchool,
      addCollege,
      addCorporate,
      addFranchise,
      updateFranchise,
      deleteFranchise,
      resetAllDemoData
    }}>
      {children}
    </DemoContext.Provider>
  );
};

export const useDemo = () => {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error('useDemo must be used within a DemoProvider');
  }
  return context;
};
