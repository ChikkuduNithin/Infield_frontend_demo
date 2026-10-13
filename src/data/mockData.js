// Realistic sample data for MARI Field Monitoring App (ITC Mission Sunehra Kal initiative)

export const INITIAL_USERS = [
  {
    id: "USR-001",
    empId: "MARI-VOL-101",
    name: "Rajesh Kumar",
    role: "volunteer",
    designation: "Senior Field Volunteer",
    email: "rajesh.k@mari-ngo.org",
    phone: "+91 98480 12345",
    org: "MARI - Modern Architect Rural India",
    state: "Telangana",
    district: "Bhadradri Kothagudem",
    managerId: "USR-004",
    managerName: "Vikramaditya Rao",
    status: "active",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    monthlyTarget: { schools: 24, students: 1200, kits: 450 },
    achieved: { schools: 19, students: 960, kits: 380 },
    attendanceRate: 94
  },
  {
    id: "USR-002",
    empId: "MARI-VOL-102",
    name: "Priya Sharma",
    role: "volunteer",
    designation: "Field Community Facilitator",
    email: "priya.s@mari-ngo.org",
    phone: "+91 98480 23456",
    org: "MARI - Modern Architect Rural India",
    state: "Telangana",
    district: "Khammam",
    managerId: "USR-004",
    managerName: "Vikramaditya Rao",
    status: "active",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    monthlyTarget: { schools: 22, students: 1100, kits: 400 },
    achieved: { schools: 18, students: 920, kits: 350 },
    attendanceRate: 91
  },
  {
    id: "USR-003",
    empId: "MARI-VOL-103",
    name: "Suresh Babu",
    role: "volunteer",
    designation: "Field Volunteer",
    email: "suresh.b@mari-ngo.org",
    phone: "+91 98480 34567",
    org: "MARI - Modern Architect Rural India",
    state: "Telangana",
    district: "Bhadradri Kothagudem",
    managerId: "USR-004",
    managerName: "Vikramaditya Rao",
    status: "active",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    monthlyTarget: { schools: 25, students: 1250, kits: 450 },
    achieved: { schools: 21, students: 1040, kits: 410 },
    attendanceRate: 96
  },
  {
    id: "USR-004",
    empId: "MARI-MGR-02",
    name: "Vikramaditya Rao",
    role: "manager",
    designation: "Zonal Field Project Manager",
    email: "v.rao@mari-ngo.org",
    phone: "+91 98499 87654",
    org: "MARI - Modern Architect Rural India",
    state: "Telangana",
    district: "Bhadradri Kothagudem",
    managerId: null,
    managerName: "ITC CSR Head",
    status: "active",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    assignedVolunteersCount: 14,
    monthlyTarget: { schools: 280, students: 14000, kits: 5500 },
    achieved: { schools: 236, students: 11840, kits: 4620 },
    attendanceRate: 98
  },
  {
    id: "USR-005",
    empId: "ITC-ADM-01",
    name: "Dr. Ananya Sen",
    role: "itc_admin",
    designation: "General Manager — ITC CSR & Social Forestry",
    email: "ananya.sen@itc.in",
    phone: "+91 98200 11223",
    org: "ITC Limited (PSPD)",
    state: "Telangana",
    district: "All Districts",
    status: "active",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "USR-006",
    empId: "MARI-ADM-01",
    name: "Rameshwar Reddy",
    role: "ngo_admin",
    designation: "Executive Director, MARI",
    email: "rameshwar@mari-ngo.org",
    phone: "+91 94401 55667",
    org: "MARI - Modern Architect Rural India",
    state: "Telangana",
    district: "All Districts",
    status: "active",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80"
  }
];

export const INITIAL_SCHOOLS = [
  {
    id: "SCH-001",
    udise: "36210100101",
    name: "Zilla Parishad High School (ZPHS) Sarapaka",
    category: "High School (Grades 6-10)",
    district: "Bhadradri Kothagudem",
    state: "Telangana",
    village: "Sarapaka, Burgampahad Mandal",
    headmaster: "M. Narsimha Murthy",
    phone: "+91 94402 11223",
    studentsCount: 385,
    teachersCount: 14,
    lat: 17.6534,
    lng: 80.8987,
    lastVisited: "2026-10-10",
    status: "Active"
  },
  {
    id: "SCH-002",
    udise: "36210100204",
    name: "MPPS Primary School — Burgampahad",
    category: "Primary School (Grades 1-5)",
    district: "Bhadradri Kothagudem",
    state: "Telangana",
    village: "Burgampahad Central",
    headmaster: "K. Sunitha Devi",
    phone: "+91 94402 33445",
    studentsCount: 192,
    teachersCount: 8,
    lat: 17.6421,
    lng: 80.8842,
    lastVisited: "2026-10-11",
    status: "Active"
  },
  {
    id: "SCH-003",
    udise: "36210100312",
    name: "Telangana Tribal Welfare Residential School (TTWRS) Aswapuram",
    category: "Residential High School",
    district: "Bhadradri Kothagudem",
    state: "Telangana",
    village: "Aswapuram Mandal",
    headmaster: "B. Ramulu Naik",
    phone: "+91 94402 55667",
    studentsCount: 420,
    teachersCount: 18,
    lat: 17.7125,
    lng: 80.9541,
    lastVisited: "2026-10-08",
    status: "Active"
  },
  {
    id: "SCH-004",
    udise: "36210100418",
    name: "Government Model High School — Palwancha",
    category: "Model School (Grades 6-12)",
    district: "Bhadradri Kothagudem",
    state: "Telangana",
    village: "Palwancha Town",
    headmaster: "P. V. Subba Rao",
    phone: "+91 94402 77889",
    studentsCount: 510,
    teachersCount: 22,
    lat: 17.5923,
    lng: 80.6834,
    lastVisited: "2026-10-09",
    status: "Active"
  },
  {
    id: "SCH-005",
    udise: "36210100520",
    name: "KGBV Kasturba Gandhi Balika Vidyalaya — Manuguru",
    category: "Girl Residential School",
    district: "Bhadradri Kothagudem",
    state: "Telangana",
    village: "Manuguru Colony",
    headmaster: "G. Vani Kumari",
    phone: "+91 94402 99001",
    studentsCount: 260,
    teachersCount: 12,
    lat: 17.9621,
    lng: 80.7512,
    lastVisited: "2026-10-05",
    status: "Active"
  },
  {
    id: "SCH-006",
    udise: "36210100615",
    name: "ZPHS Nelakondapalli",
    category: "High School (Grades 6-10)",
    district: "Khammam",
    state: "Telangana",
    village: "Nelakondapalli",
    headmaster: "T. Srinivasa Reddy",
    phone: "+91 94403 11224",
    studentsCount: 340,
    teachersCount: 13,
    lat: 17.1852,
    lng: 80.0521,
    lastVisited: "2026-10-07",
    status: "Active"
  }
];

export const INITIAL_NGOS = [
  {
    id: "NGO-01",
    name: "MARI - Modern Architect Rural India",
    acronym: "MARI",
    regNo: "AP-1991-00214",
    established: 1991,
    contactPerson: "Rameshwar Reddy",
    email: "info@mari-ngo.org",
    districts: ["Bhadradri Kothagudem", "Khammam", "Mahabubabad"],
    volunteersCount: 48,
    activeProjects: ["ITC Mission Sunehra Kal School Health", "Eco-Champs Biodiversity Club", "WASH Sanitation in Rural Schools"]
  },
  {
    id: "NGO-02",
    name: "Pratham Education Foundation (TS Chapter)",
    acronym: "PRATHAM",
    regNo: "TS-2004-00892",
    established: 2004,
    contactPerson: "Sudha Ramanathan",
    email: "contact@pratham-ts.org",
    districts: ["Warangal", "Karimnagar", "Khammam"],
    volunteersCount: 32,
    activeProjects: ["Read India Quality Education", "Foundational Numeracy Drive"]
  },
  {
    id: "NGO-03",
    name: "Bhadrachalam Tribal Welfare Society",
    acronym: "BTWS",
    regNo: "TS-2012-00431",
    established: 2012,
    contactPerson: "B. Venkateswarlu",
    email: "support@btws-agency.org",
    districts: ["Bhadradri Kothagudem", "East Godavari Border"],
    volunteersCount: 16,
    activeProjects: ["Adivasi Child Nutrition", "Solar Lit Learning Centers"]
  }
];

// Activity categories defined in prompt
export const ACTIVITY_CATEGORIES = [
  { id: "school_visit", label: "School Visit", icon: "GraduationCap", color: "#16A34A", description: "Regular school monitoring, health/hygiene check, attendance audit" },
  { id: "hospital_visit", label: "Hospital Visit", icon: "Stethoscope", color: "#2563EB", description: "CHC/PHC tie-ups, student referral checks, medical officer coordination" },
  { id: "awareness_prog", label: "Awareness Programme", icon: "Megaphone", color: "#D97706", description: "Community & student campaigns on sanitation, waste segregation, tree plantation" },
  { id: "community_visit", label: "Community Visit", icon: "Users", color: "#7C3AED", description: "Parent-teacher interaction, Gram Panchayat stakeholder engagement" },
  { id: "meeting", label: "Meeting", icon: "Briefcase", color: "#0D9488", description: "District administration, ITC CSR reviews, Mandal Education Officer reviews" },
  { id: "other", label: "Other Activity", icon: "MoreHorizontal", color: "#64748B", description: "Logistics dispatch, resource kit inventory check, emergency relief" }
];

// Sample calendar attendance data for Volunteer Rajesh Kumar in October 2026
// October 2026 starts on Thursday (Oct 1).
// Sundays in Oct 2026: 4, 11, 18, 25.
export const INITIAL_ATTENDANCE_OCT2026 = [
  { day: 1, date: "2026-10-01", dayOfWeek: "Thu", status: "present", punchIn: "09:12 AM", punchOut: "05:40 PM", schools: 2, students: 85, hours: 8.5 },
  { day: 2, date: "2026-10-02", dayOfWeek: "Fri", status: "holiday", punchIn: "-", punchOut: "-", note: "Gandhi Jayanti (National Holiday)" },
  { day: 3, date: "2026-10-03", dayOfWeek: "Sat", status: "present", punchIn: "09:10 AM", punchOut: "05:30 PM", schools: 1, students: 60, hours: 8.3 },
  { day: 4, date: "2026-10-04", dayOfWeek: "Sun", status: "sunday", isSunday: true, punchIn: "-", punchOut: "-", note: "Weekly Rest Day" },
  { day: 5, date: "2026-10-05", dayOfWeek: "Mon", status: "present", punchIn: "08:58 AM", punchOut: "05:45 PM", schools: 2, students: 110, hours: 8.8 },
  { day: 6, date: "2026-10-06", dayOfWeek: "Tue", status: "present", punchIn: "09:05 AM", punchOut: "05:50 PM", schools: 2, students: 95, hours: 8.75 },
  { day: 7, date: "2026-10-07", dayOfWeek: "Wed", status: "absent", punchIn: "-", punchOut: "-", note: "Medical Leave (Casual Leave #1)", isAbsent: true },
  { day: 8, date: "2026-10-08", dayOfWeek: "Thu", status: "present", punchIn: "09:15 AM", punchOut: "06:05 PM", schools: 3, students: 140, hours: 8.8 },
  { day: 9, date: "2026-10-09", dayOfWeek: "Fri", status: "present", punchIn: "09:02 AM", punchOut: "05:35 PM", schools: 2, students: 98, hours: 8.55 },
  { day: 10, date: "2026-10-10", dayOfWeek: "Sat", status: "present", punchIn: "09:20 AM", punchOut: "04:50 PM", schools: 1, students: 75, hours: 7.5 },
  { day: 11, date: "2026-10-11", dayOfWeek: "Sun", status: "sunday", isSunday: true, punchIn: "-", punchOut: "-", note: "Weekly Rest Day" },
  { day: 12, date: "2026-10-12", dayOfWeek: "Mon", status: "present_today", punchIn: "09:08 AM", punchOut: "In Progress", schools: 2, students: 82, hours: 4.5, isToday: true }
];

// Today's live activities logged by Rajesh Kumar
export const INITIAL_TODAY_ACTIVITIES = [
  {
    id: "ACT-10291",
    type: "school_visit",
    typeName: "School Visit",
    schoolId: "SCH-001",
    schoolName: "Zilla Parishad High School (ZPHS) Sarapaka",
    district: "Bhadradri Kothagudem",
    time: "10:15 AM",
    principalContacted: true,
    studentsReached: 48,
    quantityAchieved: 48,
    quantityUnit: "Health & Hygiene Kits",
    remarks: "Conducted handwashing awareness session for Grade 8. Principal Mr. Narsimha Murthy provided enthusiastic support.",
    followUpDate: "2026-10-26",
    photoUrl: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=400&auto=format&fit=crop&q=80",
    verified: true
  },
  {
    id: "ACT-10292",
    type: "awareness_prog",
    typeName: "Awareness Programme",
    schoolId: "SCH-002",
    schoolName: "MPPS Primary School — Burgampahad",
    district: "Bhadradri Kothagudem",
    time: "01:30 PM",
    principalContacted: true,
    studentsReached: 34,
    quantityAchieved: 34,
    quantityUnit: "ITC Notebooks Distributed",
    remarks: "Interactive storytelling on environmental conservation and tree plantation near school garden.",
    followUpDate: "2026-11-02",
    photoUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&auto=format&fit=crop&q=80",
    verified: true
  }
];

// Historical Route Data for Route History screen (Screen 7)
export const SAMPLE_ROUTE_HISTORY = {
  date: "2026-10-10",
  volunteerId: "USR-001",
  volunteerName: "Rajesh Kumar",
  totalLocations: 5,
  totalDistanceKm: 14.8,
  startTime: "09:20 AM",
  endTime: "04:50 PM",
  waypoints: [
    {
      id: "WP-1",
      name: "Punch-in Point: MARI Cluster Office, Sarapaka",
      time: "09:20 AM",
      lat: 17.6580,
      lng: 80.8920,
      status: "Punch-in Recorded",
      accuracy: "4.2m GPS accuracy",
      activity: "Morning Attendance Geo-fence Check"
    },
    {
      id: "WP-2",
      name: "ZPHS Sarapaka — Primary School Visit",
      time: "10:15 AM",
      lat: 17.6534,
      lng: 80.8987,
      status: "Activity Completed",
      accuracy: "5.1m GPS accuracy",
      activity: "School Visit & Health Kit distribution (48 students)"
    },
    {
      id: "WP-3",
      name: "Community Center, Burgampahad Junction",
      time: "12:30 PM",
      lat: 17.6480,
      lng: 80.8890,
      status: "Mid-day Transit Checkpoint",
      accuracy: "6.0m GPS accuracy",
      activity: "Meeting with Sarpanch on Drinking Water Facility"
    },
    {
      id: "WP-4",
      name: "MPPS Burgampahad — Awareness Session",
      time: "02:15 PM",
      lat: 17.6421,
      lng: 80.8842,
      status: "Activity Completed",
      accuracy: "3.8m GPS accuracy",
      activity: "Awareness session & Tree plantation drive"
    },
    {
      id: "WP-5",
      name: "Punch-out Point: ITC Outreach Hub, Bhadrachalam Road",
      time: "04:50 PM",
      lat: 17.6620,
      lng: 80.8810,
      status: "Punch-out Recorded",
      accuracy: "4.5m GPS accuracy",
      activity: "Daily Summary submitted & Day Punch-out"
    }
  ]
};

// Manager Team Performance data (Screen 4)
export const TEAM_PERFORMANCE_METRICS = {
  totalVolunteers: 18,
  presentToday: 15,
  absentToday: 2,
  onLeaveToday: 1,
  totalActivitiesToday: 38,
  teamTargetSchools: 360,
  teamAchievedSchools: 298,
  teamCompletionRate: 82.8,
  activityTypeBreakdown: [
    { name: "School Visit", count: 21, color: "#16A34A" },
    { name: "Awareness Prog", count: 8, color: "#D97706" },
    { name: "Hospital Visit", count: 4, color: "#2563EB" },
    { name: "Community Visit", count: 3, color: "#7C3AED" },
    { name: "Review Meeting", count: 2, color: "#0D9488" }
  ],
  monthlyTrend: [
    { month: "May", planned: 300, achieved: 285 },
    { month: "Jun", planned: 320, achieved: 310 },
    { month: "Jul", planned: 340, achieved: 322 },
    { month: "Aug", planned: 350, achieved: 340 },
    { month: "Sep", planned: 360, achieved: 348 },
    { month: "Oct (MTD)", planned: 360, achieved: 298 }
  ],
  volunteerRankings: [
    { rank: 1, name: "Suresh Babu", empId: "MARI-VOL-103", district: "Bhadradri Kothagudem", visited: 21, target: 25, percentage: 84.0, status: "Present" },
    { rank: 2, name: "Rajesh Kumar", empId: "MARI-VOL-101", district: "Bhadradri Kothagudem", visited: 19, target: 24, percentage: 79.2, status: "Present" },
    { rank: 3, name: "Priya Sharma", empId: "MARI-VOL-102", district: "Khammam", visited: 18, target: 22, percentage: 81.8, status: "Present" },
    { rank: 4, name: "K. Venkatesh", empId: "MARI-VOL-104", district: "Mahabubabad", visited: 17, target: 22, percentage: 77.3, status: "Present" },
    { rank: 5, name: "Sandhya Rani", empId: "MARI-VOL-105", district: "Khammam", visited: 16, target: 24, percentage: 66.7, status: "Leave" },
    { rank: 6, name: "M. Ashok Kumar", empId: "MARI-VOL-106", district: "Bhadradri Kothagudem", visited: 15, target: 25, percentage: 60.0, status: "Absent" }
  ]
};

// Master Data definitions for Admin Screen
export const MASTER_DATA = {
  states: [
    { id: "ST-01", name: "Telangana", code: "TS", activeDistricts: 3 },
    { id: "ST-02", name: "Andhra Pradesh", code: "AP", activeDistricts: 2 },
    { id: "ST-03", name: "Karnataka", code: "KA", activeDistricts: 1 }
  ],
  districts: [
    { id: "DST-01", name: "Bhadradri Kothagudem", state: "Telangana", stateId: "ST-01", activeSchools: 184, volunteers: 24 },
    { id: "DST-02", name: "Khammam", state: "Telangana", stateId: "ST-01", activeSchools: 142, volunteers: 16 },
    { id: "DST-03", name: "Mahabubabad", state: "Telangana", stateId: "ST-01", activeSchools: 88, volunteers: 8 },
    { id: "DST-04", name: "East Godavari", state: "Andhra Pradesh", stateId: "ST-02", activeSchools: 95, volunteers: 10 }
  ],
  schoolCategories: [
    { id: "CAT-01", code: "PS", name: "Primary School (Grades 1-5)", count: 210 },
    { id: "CAT-02", code: "UPS", name: "Upper Primary School (Grades 1-8)", count: 95 },
    { id: "CAT-03", code: "HS", name: "High School (Grades 6-10)", count: 145 },
    { id: "CAT-04", code: "MS", name: "Government Model School", count: 32 },
    { id: "CAT-05", code: "KGBV", name: "Kasturba Gandhi Balika Vidyalaya", count: 28 }
  ]
};
