import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_USERS,
  INITIAL_SCHOOLS,
  INITIAL_NGOS,
  INITIAL_ATTENDANCE_OCT2026,
  INITIAL_TODAY_ACTIVITIES,
  MASTER_DATA
} from '../data/mockData';

const DemoContext = createContext(null);

const STORAGE_KEY = 'mari_field_demo_state_v1';

export const DemoProvider = ({ children }) => {
  // Load initial state or local storage
  const [activeRole, setActiveRole] = useState(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_role`);
    return saved || 'volunteer';
  });

  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_users`);
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [schools, setSchools] = useState(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_schools`);
    return saved ? JSON.parse(saved) : INITIAL_SCHOOLS;
  });

  const [ngos, setNgos] = useState(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_ngos`);
    return saved ? JSON.parse(saved) : INITIAL_NGOS;
  });

  const [masterData, setMasterData] = useState(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_master`);
    return saved ? JSON.parse(saved) : MASTER_DATA;
  });

  // Volunteer attendance punch-in state
  const [punchState, setPunchState] = useState(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_punch`);
    return saved ? JSON.parse(saved) : {
      isPunchedIn: true,
      isPunchedOut: false,
      punchInTime: '09:08 AM',
      punchInDate: '2026-10-12',
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
      punchInDate: '2026-10-12',
      location: 'ITC Zonal Office, Bhadrachalam Road (17.6620° N, 80.8810° E)'
    };
  });

  // Activities logged today
  const [todayActivities, setTodayActivities] = useState(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_activities`);
    return saved ? JSON.parse(saved) : INITIAL_TODAY_ACTIVITIES;
  });

  // Monthly calendar
  const [calendarAttendance, setCalendarAttendance] = useState(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_calendar`);
    return saved ? JSON.parse(saved) : INITIAL_ATTENDANCE_OCT2026;
  });

  // Mobile Device Preview Mode: 'frame' or 'full'
  const [deviceFrameMode, setDeviceFrameMode] = useState('frame');

  // Active Volunteer user
  const currentVolunteer = users.find(u => u.role === 'volunteer') || users[0];
  const currentManager = users.find(u => u.role === 'manager') || users[3];
  const currentAdmin = users.find(u => u.role.includes('admin')) || users[4];

  // Save to localStorage when states change
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
    localStorage.setItem(`${STORAGE_KEY}_ngos`, JSON.stringify(ngos));
  }, [ngos]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_master`, JSON.stringify(masterData));
  }, [masterData]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_punch`, JSON.stringify(punchState));
  }, [punchState]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_mgr_punch`, JSON.stringify(managerPunchState));
  }, [managerPunchState]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_activities`, JSON.stringify(todayActivities));
  }, [todayActivities]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_calendar`, JSON.stringify(calendarAttendance));
  }, [calendarAttendance]);

  // Actions
  const handlePunchIn = (details) => {
    const newState = {
      isPunchedIn: true,
      isPunchedOut: false,
      punchInTime: details.time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      punchInDate: details.date || '2026-10-12',
      punchInLocation: details.location || 'MPPS Sarapaka Mandal (17.6534° N, 80.8987° E)',
      punchInPhoto: details.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
      punchOutTime: null,
      punchOutSummary: null
    };
    setPunchState(newState);

    // Update today calendar attendance to Present
    setCalendarAttendance(prev => prev.map(item => item.isToday ? { ...item, status: 'present_today', punchIn: newState.punchInTime } : item));
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

    // Update today calendar attendance with punchOut
    setCalendarAttendance(prev => prev.map(item => item.isToday ? {
      ...item,
      status: 'present',
      punchOut: punchOutTime,
      schools: (todayActivities.filter(a => a.type === 'school_visit').length) || 2,
      students: todayActivities.reduce((acc, curr) => acc + (Number(curr.studentsReached) || 0), 0)
    } : item));
  };

  const handleManagerPunchIn = (details) => {
    setManagerPunchState({
      isPunchedIn: true,
      punchInTime: details.time || '08:45 AM',
      punchInDate: details.date || '2026-10-12',
      location: details.location || 'ITC Bhadrachalam Zonal Office (17.6620° N, 80.8810° E)'
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
    return newActivity;
  };

  const addUser = (userData) => {
    const newUser = {
      id: `USR-${String(users.length + 1).padStart(3, '0')}`,
      empId: `MARI-${userData.role.substring(0, 3).toUpperCase()}-${100 + users.length}`,
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
      ...schoolData
    };
    setSchools([...schools, newSchool]);
    return newSchool;
  };

  const updateSchool = (id, updatedFields) => {
    setSchools(schools.map(s => s.id === id ? { ...s, ...updatedFields } : s));
  };

  const resetAllDemoData = () => {
    localStorage.removeItem(`${STORAGE_KEY}_role`);
    localStorage.removeItem(`${STORAGE_KEY}_users`);
    localStorage.removeItem(`${STORAGE_KEY}_schools`);
    localStorage.removeItem(`${STORAGE_KEY}_ngos`);
    localStorage.removeItem(`${STORAGE_KEY}_master`);
    localStorage.removeItem(`${STORAGE_KEY}_punch`);
    localStorage.removeItem(`${STORAGE_KEY}_mgr_punch`);
    localStorage.removeItem(`${STORAGE_KEY}_activities`);
    localStorage.removeItem(`${STORAGE_KEY}_calendar`);

    setActiveRole('volunteer');
    setUsers(INITIAL_USERS);
    setSchools(INITIAL_SCHOOLS);
    setNgos(INITIAL_NGOS);
    setMasterData(MASTER_DATA);
    setPunchState({
      isPunchedIn: true,
      isPunchedOut: false,
      punchInTime: '09:08 AM',
      punchInDate: '2026-10-12',
      punchInLocation: 'ZPHS Sarapaka Cluster, Bhadradri Kothagudem (17.6534° N, 80.8987° E)',
      punchInPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
      punchOutTime: null,
      punchOutSummary: null
    });
    setManagerPunchState({
      isPunchedIn: true,
      punchInTime: '08:45 AM',
      punchInDate: '2026-10-12',
      location: 'ITC Zonal Office, Bhadrachalam Road (17.6620° N, 80.8810° E)'
    });
    setTodayActivities(INITIAL_TODAY_ACTIVITIES);
    setCalendarAttendance(INITIAL_ATTENDANCE_OCT2026);
  };

  return (
    <DemoContext.Provider value={{
      activeRole,
      setActiveRole,
      users,
      schools,
      ngos,
      masterData,
      setMasterData,
      currentVolunteer,
      currentManager,
      currentAdmin,
      punchState,
      managerPunchState,
      todayActivities,
      calendarAttendance,
      deviceFrameMode,
      setDeviceFrameMode,
      handlePunchIn,
      handlePunchOut,
      handleManagerPunchIn,
      addActivity,
      addUser,
      updateUser,
      toggleUserStatus,
      addSchool,
      updateSchool,
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
