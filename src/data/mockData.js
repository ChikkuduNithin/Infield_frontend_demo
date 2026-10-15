// Realistic enterprise sample data for WOW TeamPulse
// ITC WoW (Well-being Out of Waste) & Partner NGO Field Operations Platform

export const INITIAL_USERS = [
  {
    id: "USR-001",
    empId: "WOW-CRD-101",
    name: "Rajesh Kumar",
    role: "coordinator",
    designation: "Senior Field Coordinator",
    email: "rajesh.k@mari-ngo.org",
    phone: "9848012345",
    org: "MARI - Modern Architect Rural India",
    state: "Telangana",
    district: "Bhadradri Kothagudem",
    managerId: "USR-004",
    managerName: "Vikramaditya Rao",
    status: "active",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    monthlyTarget: { schools: 24, colleges: 6, corporates: 4, materialKg: 3500, students: 1200 },
    achieved: { schools: 19, colleges: 5, corporates: 3, materialKg: 2840, students: 960 },
    attendanceRate: 94
  },
  {
    id: "USR-002",
    empId: "WOW-CRD-102",
    name: "Priya Sharma",
    role: "coordinator",
    designation: "Field Project Coordinator",
    email: "priya.s@mari-ngo.org",
    phone: "9848023456",
    org: "MARI - Modern Architect Rural India",
    state: "Telangana",
    district: "Khammam",
    managerId: "USR-004",
    managerName: "Vikramaditya Rao",
    status: "active",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    monthlyTarget: { schools: 22, colleges: 5, corporates: 3, materialKg: 3000, students: 1100 },
    achieved: { schools: 18, colleges: 4, corporates: 2, materialKg: 2450, students: 920 },
    attendanceRate: 91
  },
  {
    id: "USR-003",
    empId: "WOW-CRD-103",
    name: "Suresh Babu",
    role: "coordinator",
    designation: "Cluster Field Coordinator",
    email: "suresh.b@mari-ngo.org",
    phone: "9848034567",
    org: "MARI - Modern Architect Rural India",
    state: "Telangana",
    district: "Bhadradri Kothagudem",
    managerId: "USR-004",
    managerName: "Vikramaditya Rao",
    status: "active",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    monthlyTarget: { schools: 25, colleges: 6, corporates: 4, materialKg: 3600, students: 1250 },
    achieved: { schools: 21, colleges: 6, corporates: 4, materialKg: 3120, students: 1040 },
    attendanceRate: 96
  },
  {
    id: "USR-004",
    empId: "WOW-MGR-02",
    name: "Vikramaditya Rao",
    role: "manager",
    designation: "Zonal Field Project Manager",
    email: "v.rao@mari-ngo.org",
    phone: "9849987654",
    org: "MARI - Modern Architect Rural India",
    state: "Telangana",
    district: "Bhadradri Kothagudem",
    managerId: null,
    managerName: "ITC WoW Regional Head",
    status: "active",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    assignedCoordinatorsCount: 14,
    monthlyTarget: { schools: 280, colleges: 60, corporates: 45, materialKg: 42000, students: 14000 },
    achieved: { schools: 236, colleges: 51, corporates: 38, materialKg: 35800, students: 11840 },
    attendanceRate: 98
  },
  {
    id: "USR-005",
    empId: "WOW-ADM-01",
    name: "Dr. Ananya Sen",
    role: "wow_admin",
    designation: "General Manager — ITC WoW & Sustainability",
    email: "ananya.sen@itc.in",
    phone: "9820011223",
    org: "ITC Limited (PSPD)",
    state: "Telangana & Andhra Pradesh",
    district: "All States & Districts",
    status: "active",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "USR-006",
    empId: "NGO-ADM-01",
    name: "Rameshwar Reddy",
    role: "ngo_admin",
    designation: "Executive Director, MARI",
    email: "rameshwar@mari-ngo.org",
    phone: "9440155667",
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
    status: "Active",
    isrcEnrolled: true
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
    status: "Active",
    isrcEnrolled: true
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
    status: "Active",
    isrcEnrolled: true
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
    status: "Active",
    isrcEnrolled: true
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
    status: "Active",
    isrcEnrolled: false
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
    status: "Active",
    isrcEnrolled: true
  }
];

export const INITIAL_COLLEGES = [
  {
    id: "COL-001",
    aishe: "C-27411",
    name: "Government Degree College — Bhadrachalam",
    category: "Undergraduate & PG Arts/Science",
    district: "Bhadradri Kothagudem",
    state: "Telangana",
    principalName: "Dr. K. Bhaskara Rao",
    contactPhone: "+91 94404 11201",
    studentsCount: 850,
    lat: 17.6690,
    lng: 80.8912,
    status: "Active"
  },
  {
    id: "COL-002",
    aishe: "C-27424",
    name: "Singareni Collieries Women's Degree College — Kothagudem",
    category: "Autonomous Women's College",
    district: "Bhadradri Kothagudem",
    state: "Telangana",
    principalName: "Dr. P. Hemalatha Devi",
    contactPhone: "+91 94404 33402",
    studentsCount: 1120,
    lat: 17.5482,
    lng: 80.6201,
    status: "Active"
  },
  {
    id: "COL-003",
    aishe: "C-27390",
    name: "SR&BGNR Government Arts & Science College — Khammam",
    category: "Autonomous PG Centre",
    district: "Khammam",
    state: "Telangana",
    principalName: "Dr. M. Venkateshwar Rao",
    contactPhone: "+91 94404 55603",
    studentsCount: 1450,
    lat: 17.2472,
    lng: 80.1514,
    status: "Active"
  },
  {
    id: "COL-004",
    aishe: "C-27502",
    name: "Priyadarshini Institute of Science & Technology",
    category: "Engineering & Polytechnic",
    district: "Khammam",
    state: "Telangana",
    principalName: "Prof. S. R. Chary",
    contactPhone: "+91 94404 77804",
    studentsCount: 980,
    lat: 17.2610,
    lng: 80.1790,
    status: "Active"
  }
];

export const INITIAL_CORPORATES = [
  {
    id: "CORP-001",
    corpCode: "ITC-PSPD-01",
    name: "ITC PSPD Paperboards & Specialty Papers Unit — Sarapaka",
    category: "Industrial Manufacturing",
    district: "Bhadradri Kothagudem",
    state: "Telangana",
    contactPerson: "G. V. Subrahmanyam (EHS Head)",
    phone: "+91 98490 55001",
    employeesCount: 1850,
    lat: 17.6590,
    lng: 80.8870,
    status: "Active"
  },
  {
    id: "CORP-002",
    corpCode: "SCCL-KGM-02",
    name: "Singareni Collieries Company Limited (SCCL) — Area Office",
    category: "Mining & Public Sector",
    district: "Bhadradri Kothagudem",
    state: "Telangana",
    contactPerson: "K. Mohan Das (GM HR & CSR)",
    phone: "+91 98490 66002",
    employeesCount: 920,
    lat: 17.5510,
    lng: 80.6180,
    status: "Active"
  },
  {
    id: "CORP-003",
    corpCode: "NBV-PLW-03",
    name: "Nava Bharat Ventures Limited (Ferro Alloys Plant) — Palwancha",
    category: "Heavy Industry",
    district: "Bhadradri Kothagudem",
    state: "Telangana",
    contactPerson: "D. Srinivas Rao (VP Operations)",
    phone: "+91 98490 77003",
    employeesCount: 640,
    lat: 17.5880,
    lng: 80.6790,
    status: "Active"
  },
  {
    id: "CORP-004",
    corpCode: "HWP-MNG-04",
    name: "Heavy Water Plant (DAE) — Manuguru Complex",
    category: "Central PSU Facility",
    district: "Bhadradri Kothagudem",
    state: "Telangana",
    contactPerson: "R. K. Sharma (Safety Officer)",
    phone: "+91 98490 88004",
    employeesCount: 780,
    lat: 17.9710,
    lng: 80.7600,
    status: "Active"
  }
];

export const INITIAL_FRANCHISES = [
  {
    id: "FR-001",
    code: "TS-FR-101",
    name: "ITC WoW Material Recovery Facility (MRF) — Bhadrachalam",
    operator: "K. Ramana & Co.",
    address: "Plot 14, Industrial Estate, Sarapaka Bypass",
    district: "Bhadradri Kothagudem",
    weighbridgeCapacity: "50 Ton Digital (Certified)",
    phone: "+91 94405 11001",
    status: "Active"
  },
  {
    id: "FR-002",
    code: "TS-FR-104",
    name: "Sri Balaji Resource Recovery Hub — Palwancha",
    operator: "T. Satyanarayana",
    address: "Kothagudem Road, Near Railway Crossing, Palwancha",
    district: "Bhadradri Kothagudem",
    weighbridgeCapacity: "40 Ton Digital (Certified)",
    phone: "+91 94405 22002",
    status: "Active"
  },
  {
    id: "FR-003",
    code: "TS-FR-108",
    name: "Godavari Circular Waste Franchise — Khammam Urban",
    operator: "M. Srinivas Rao",
    address: "Phase II Auto Nagar, Khammam Bypass",
    district: "Khammam",
    weighbridgeCapacity: "60 Ton Pitless (Certified)",
    phone: "+91 94405 33003",
    status: "Active"
  },
  {
    id: "FR-004",
    code: "TS-FR-112",
    name: "Sarapaka Eco-Recyclers Cooperative — Burgampahad",
    operator: "B. Venkanna",
    address: "Near Old Checkpost, Sarapaka",
    district: "Bhadradri Kothagudem",
    weighbridgeCapacity: "30 Ton Pitless (Certified)",
    phone: "+91 94405 44004",
    status: "Active"
  }
];

export const INITIAL_MUNICIPALITIES = [
  "Sarapaka Major Gram Panchayat & Township",
  "Bhadrachalam Temple Town Municipality",
  "Kothagudem Municipal Corporation",
  "Palwancha Municipality",
  "Khammam Municipal Corporation",
  "Manuguru Municipality"
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
    phone: "+91 94401 55667",
    districts: ["Bhadradri Kothagudem", "Khammam", "Mahabubabad"],
    coordinatorsCount: 48,
    activeProjects: ["ITC WoW School ISRS Programme", "Corporate Dry Waste Linkage", "Household Segregation Propagation"],
    complianceStatus: "Compliant",
    nextAuditDate: "2026-12-15"
  },
  {
    id: "NGO-02",
    name: "Pratham Education Foundation (TS Chapter)",
    acronym: "PRATHAM",
    regNo: "TS-2004-00892",
    established: 2004,
    contactPerson: "Sudha Ramanathan",
    email: "contact@pratham-ts.org",
    phone: "+91 98492 88123",
    districts: ["Warangal", "Karimnagar", "Khammam"],
    coordinatorsCount: 32,
    activeProjects: ["School Recycling Education", "Paper Waste Collection Drives"],
    complianceStatus: "Compliant",
    nextAuditDate: "2026-11-30"
  },
  {
    id: "NGO-03",
    name: "Bhadrachalam Tribal Welfare Society",
    acronym: "BTWS",
    regNo: "TS-2012-00431",
    established: 2012,
    contactPerson: "B. Venkateswarlu",
    email: "support@btws-agency.org",
    phone: "+91 94408 99456",
    districts: ["Bhadradri Kothagudem", "East Godavari Border"],
    coordinatorsCount: 16,
    activeProjects: ["Adivasi Ashram School Recycling Drives", "Village Plastic Recovery"],
    complianceStatus: "Renewal Due (80G Certificate)",
    nextAuditDate: "2026-10-31"
  }
];

// Official PRD Task Categories
export const WOW_TASK_CATEGORIES = [
  {
    id: "school_visit",
    label: "School Visit",
    code: "SCH",
    description: "ISRS Programme Permission, Student Awareness Session, and ISRC Collection Drive",
    subTasks: [
      { id: "isrs_permission", label: "Permission to Conduct ISRS Programme" },
      { id: "isrs_awareness", label: "ISRS Awareness Session" },
      { id: "isrc_collection", label: "ISRC Collection Drive" }
    ]
  },
  {
    id: "college_visit",
    label: "College Visit",
    code: "COL",
    description: "College Awareness Permission, Student Sessions, and Campus Collection Drives",
    subTasks: [
      { id: "col_permission", label: "Permission to Conduct Awareness" },
      { id: "col_awareness", label: "Awareness Session in College" },
      { id: "col_collection", label: "Collection Drive in College" }
    ]
  },
  {
    id: "corporate_visit",
    label: "Corporate Visit",
    code: "CORP",
    description: "Corporate Liaison, Employee Waste Awareness, and Office Dry Waste Drives",
    subTasks: [
      { id: "corp_permission", label: "Permission to Conduct Awareness" },
      { id: "corp_awareness", label: "Awareness Session in Corporate" },
      { id: "corp_collection", label: "Collection Drive in Corporate" }
    ]
  },
  {
    id: "household_propagation",
    label: "Household Propagation",
    code: "HH",
    description: "Door-to-door waste segregation awareness in Municipalities with register records",
    subTasks: [
      { id: "hh_drive", label: "Municipal Door-to-Door Propagation" }
    ]
  },
  {
    id: "office_visit",
    label: "Office Visits",
    code: "OFF",
    description: "Meetings & Desk work at NGO Office, ITC Zonal Office, or CRP/MRF facility",
    subTasks: [
      { id: "off_ngo_meeting", label: "Visiting NGO Office for Meetings" },
      { id: "off_ngo_work", label: "Visiting NGO office for Office Work" },
      { id: "off_itc_meeting", label: "Visiting ITC Office for meeting" },
      { id: "off_mrf_work", label: "Visit to CRP/ MRF for Office Work" },
      { id: "off_others", label: "Others" }
    ]
  },
  {
    id: "other_activities",
    label: "Other Activities",
    code: "OTH",
    description: "Community Engagement, Student Rallies, and Special Outreach Campaigns",
    subTasks: [
      { id: "oth_community", label: "Community Engagement Activities" },
      { id: "oth_student", label: "Student Engagement activities" },
      { id: "oth_general", label: "Others" }
    ]
  }
];

// Pending Activities (PRD: Instances where collection drive was submitted but Acknowledgement Form is missing)
export const INITIAL_PENDING_ACTIVITIES = [
  {
    id: "PEND-001",
    entityType: "School",
    entityName: "ZPHS Sarapaka",
    activityType: "ISRC Collection Drive",
    coordinatorId: "USR-001",
    coordinatorName: "Rajesh Kumar",
    date: "2026-10-10",
    collectedKg: 420,
    verifiedKg: 405,
    franchiseName: "ITC WoW MRF Center — Bhadrachalam",
    missingItem: "ISRC Collection Drive Acknowledgement Form",
    status: "Pending Form Upload"
  },
  {
    id: "PEND-002",
    entityType: "College",
    entityName: "Government Degree College — Bhadrachalam",
    activityType: "Collection Drive in College",
    coordinatorId: "USR-001",
    coordinatorName: "Rajesh Kumar",
    date: "2026-10-11",
    collectedKg: 580,
    verifiedKg: 565,
    franchiseName: "Sarapaka Eco-Recyclers Cooperative",
    missingItem: "College Collection Drive Acknowledgement Form",
    status: "Pending Form Upload"
  },
  {
    id: "PEND-003",
    entityType: "Corporate",
    entityName: "Nava Bharat Ventures Limited — Palwancha",
    activityType: "Collection Drive in Corporate",
    coordinatorId: "USR-002",
    coordinatorName: "Priya Sharma",
    date: "2026-10-09",
    collectedKg: 750,
    verifiedKg: 730,
    franchiseName: "Sri Balaji Resource Recovery Hub",
    missingItem: "Corporate Collection Drive Acknowledgement Form",
    status: "Pending Form Upload"
  }
];

// Official Holidays List for Telangana (PRD Requirement)
export const OFFICIAL_HOLIDAYS_2026 = [
  { date: "2026-10-02", name: "Gandhi Jayanti", type: "National Holiday", dayOfWeek: "Friday" },
  { date: "2026-10-19", name: "Dussehra / Vijaya Dashami", type: "State Festival", dayOfWeek: "Monday" },
  { date: "2026-10-20", name: "Dussehra Second Day", type: "State Holiday", dayOfWeek: "Tuesday" },
  { date: "2026-11-08", name: "Deepavali", type: "Festival of Lights", dayOfWeek: "Sunday" },
  { date: "2026-11-26", name: "Guru Nanak Jayanti", type: "Gazetted Holiday", dayOfWeek: "Thursday" },
  { date: "2026-12-25", name: "Christmas Day", type: "National Holiday", dayOfWeek: "Friday" }
];

// Downloads Section Standard Documents (PRD Requirement)
export const DOWNLOAD_DOCUMENTS = [
  {
    id: "DOC-01",
    title: "ISRS School Permission Consent Form Template",
    category: "Consent & Permissions",
    format: "PDF",
    size: "185 KB",
    date: "2026-09-01",
    roleAccess: ["coordinator", "manager", "ngo_admin", "wow_admin"],
    description: "Standard bilingual consent letter to be signed and stamped by School Headmaster prior to launching ISRS."
  },
  {
    id: "DOC-02",
    title: "ISRC School Collection Drive Acknowledgement Slip",
    category: "Acknowledgement Receipts",
    format: "PDF",
    size: "210 KB",
    date: "2026-09-01",
    roleAccess: ["coordinator", "manager", "ngo_admin", "wow_admin"],
    description: "Official 3-party acknowledgement receipt between School, Coordinator, and Material Franchise."
  },
  {
    id: "DOC-03",
    title: "College Awareness & Dry Waste Drive MoU Template",
    category: "MoU & Protocols",
    format: "PDF",
    size: "245 KB",
    date: "2026-09-15",
    roleAccess: ["coordinator", "manager", "ngo_admin", "wow_admin"],
    description: "College campus waste segregation protocol and annual awareness partnership template."
  },
  {
    id: "DOC-04",
    title: "Corporate Collection Drive Acknowledgement Form",
    category: "Corporate Formats",
    format: "PDF",
    size: "195 KB",
    date: "2026-09-20",
    roleAccess: ["coordinator", "manager", "ngo_admin", "wow_admin"],
    description: "Standard industrial/corporate dry recyclables handover document with weighbridge slip attachment."
  },
  {
    id: "DOC-05",
    title: "Weighbridge Certified Receipt Standard Format",
    category: "Franchise Logistics",
    format: "PDF",
    size: "140 KB",
    date: "2026-10-01",
    roleAccess: ["coordinator", "manager", "ngo_admin", "wow_admin"],
    description: "Format for digital weighbridge receipt verified by certified operator."
  },
  {
    id: "DOC-06",
    title: "WoW Dry Waste Segregation & Audit SOP 2026",
    category: "Operating Procedures",
    format: "PDF",
    size: "1.4 MB",
    date: "2026-10-01",
    roleAccess: ["manager", "ngo_admin", "wow_admin"],
    description: "Comprehensive standard operating procedure for waste categorization, contamination checks, and MRF transfers."
  }
];

// Attendance Calendar for Coordinator Rajesh Kumar (October 2026)
// Follows PRD color codes: Today, Holiday, Full day, Half Day, Absent, Leave, Corrected attendance
export const INITIAL_ATTENDANCE_OCT2026 = [
  { day: 1, date: "2026-10-01", dayOfWeek: "Thu", status: "full_day", punchIn: "09:05 AM", punchOut: "05:40 PM", schools: 2, kgCollected: 380, hours: 8.5 },
  { day: 2, date: "2026-10-02", dayOfWeek: "Fri", status: "holiday", punchIn: "-", punchOut: "-", note: "Gandhi Jayanti (Gazetted Holiday)" },
  { day: 3, date: "2026-10-03", dayOfWeek: "Sat", status: "full_day", punchIn: "09:10 AM", punchOut: "05:30 PM", schools: 1, kgCollected: 210, hours: 8.3 },
  { day: 4, date: "2026-10-04", dayOfWeek: "Sun", status: "sunday", isSunday: true, punchIn: "-", punchOut: "-", note: "Weekly Rest Day" },
  { day: 5, date: "2026-10-05", dayOfWeek: "Mon", status: "full_day", punchIn: "08:58 AM", punchOut: "05:45 PM", schools: 2, kgCollected: 450, hours: 8.8 },
  { day: 6, date: "2026-10-06", dayOfWeek: "Tue", status: "half_day", punchIn: "09:05 AM", punchOut: "01:30 PM", schools: 1, kgCollected: 180, hours: 4.4, note: "Half day approved by Manager" },
  { day: 7, date: "2026-10-07", dayOfWeek: "Wed", status: "leave", punchIn: "-", punchOut: "-", note: "Casual Leave (Medical Certificate approved)", isLeave: true },
  { day: 8, date: "2026-10-08", dayOfWeek: "Thu", status: "full_day", punchIn: "09:15 AM", punchOut: "06:05 PM", schools: 3, kgCollected: 520, hours: 8.8 },
  { day: 9, date: "2026-10-09", dayOfWeek: "Fri", status: "corrected", punchIn: "09:00 AM", punchOut: "05:30 PM", schools: 2, kgCollected: 390, hours: 8.5, note: "Corrected Attendance: Missed punch rectified" },
  { day: 10, date: "2026-10-10", dayOfWeek: "Sat", status: "full_day", punchIn: "09:20 AM", punchOut: "04:50 PM", schools: 1, kgCollected: 420, hours: 7.5 },
  { day: 11, date: "2026-10-11", dayOfWeek: "Sun", status: "sunday", isSunday: true, punchIn: "-", punchOut: "-", note: "Weekly Rest Day" },
  { day: 12, date: "2026-10-12", dayOfWeek: "Mon", status: "full_day", punchIn: "09:08 AM", punchOut: "05:50 PM", schools: 2, kgCollected: 380, hours: 8.7 },
  { day: 13, date: "2026-10-13", dayOfWeek: "Tue", status: "absent", punchIn: "-", punchOut: "-", note: "Unplanned Absence", isAbsent: true },
  { day: 14, date: "2026-10-14", dayOfWeek: "Wed", status: "full_day", punchIn: "09:02 AM", punchOut: "05:40 PM", schools: 2, kgCollected: 410, hours: 8.6 },
  { day: 15, date: "2026-10-15", dayOfWeek: "Thu", status: "today", punchIn: "09:04 AM", punchOut: "In Progress", schools: 1, kgCollected: 290, hours: 5.5, isToday: true }
];

// Today's Live Activities for Rajesh Kumar
export const INITIAL_TODAY_ACTIVITIES = [
  {
    id: "ACT-88401",
    taskType: "school_visit",
    subTask: "isrc_collection",
    taskName: "ISRC Collection Drive",
    entityName: "ZPHS Sarapaka",
    entityCategory: "High School (Grades 6-10)",
    district: "Bhadradri Kothagudem",
    time: "10:30 AM",
    conductedBy: "Self",
    franchiseName: "ITC WoW MRF Center — Bhadrachalam",
    quantityCollected: 290,
    verifiedQuantity: 280,
    acknowledgementUploaded: true,
    remarks: "Students deposited paper bundles and dry plastic wrappers collected over two weeks. Weighbridge verified at 280 Kg.",
    photoUrl: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=400&auto=format&fit=crop&q=80",
    status: "Verified & Complete"
  },
  {
    id: "ACT-88402",
    taskType: "school_visit",
    subTask: "isrs_permission",
    taskName: "Permission to Conduct ISRS Programme",
    entityName: "MPPS Primary School — Burgampahad",
    entityCategory: "Primary School",
    district: "Bhadradri Kothagudem",
    time: "01:15 PM",
    confirmationDateReceived: "Yes",
    scheduledDate: "2026-10-28",
    consentUploaded: true,
    remarks: "Headmaster Smt. K. Sunitha Devi accepted the proposal. Consent form stamped and signed. Added to calendar reminder.",
    photoUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&auto=format&fit=crop&q=80",
    status: "Permission Confirmed"
  }
];

// Attendance Correction Requests (PRD Requirement)
export const INITIAL_CORRECTION_REQUESTS = [
  {
    id: "CR-01",
    coordinatorId: "USR-001",
    coordinatorName: "Rajesh Kumar",
    date: "2026-10-09",
    category: "Missed punch in/ out",
    reason: "Device battery drained while travelling in deep forest agency mandal between Aswapuram and Sarapaka.",
    proofUrl: "https://images.unsplash.com/photo-1584824486509-112e4181ff6b?w=300&auto=format&fit=crop&q=80",
    requestedPunchIn: "09:00 AM",
    requestedPunchOut: "05:30 PM",
    status: "Approved",
    approvedBy: "Vikramaditya Rao (Manager)"
  },
  {
    id: "CR-02",
    coordinatorId: "USR-001",
    coordinatorName: "Rajesh Kumar",
    date: "2026-10-07",
    category: "Changing Absent to Leave",
    reason: "Sudden viral fever with acute throat infection. Pre-approval obtained verbally over phone from Manager.",
    proofUrl: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=300&auto=format&fit=crop&q=80",
    status: "Approved",
    approvedBy: "Vikramaditya Rao (Manager)"
  },
  {
    id: "CR-03",
    coordinatorId: "USR-003",
    coordinatorName: "Suresh Babu",
    date: "2026-10-13",
    category: "Missed punch in/ out",
    reason: "Mobile network tower outage at Burgampahad Mandal during morning attendance punch.",
    proofUrl: "https://images.unsplash.com/photo-1584824486509-112e4181ff6b?w=300&auto=format&fit=crop&q=80",
    requestedPunchIn: "09:10 AM",
    requestedPunchOut: "05:45 PM",
    status: "Pending Approval",
    approvedBy: "Awaiting Manager Review"
  }
];

// Historical Route Trail for Route History screen
export const SAMPLE_ROUTE_HISTORY = {
  date: "2026-10-10",
  coordinatorId: "USR-001",
  coordinatorName: "Rajesh Kumar",
  totalLocations: 5,
  totalDistanceKm: 16.4,
  startTime: "09:20 AM",
  endTime: "04:50 PM",
  waypoints: [
    {
      id: "WP-1",
      name: "Punch-in Point: MARI Cluster Field Office, Sarapaka",
      time: "09:20 AM",
      lat: 17.6580,
      lng: 80.8920,
      status: "Punch-in Recorded",
      accuracy: "3.8m GPS accuracy",
      activity: "Morning Geotagged Attendance Verification"
    },
    {
      id: "WP-2",
      name: "ZPHS Sarapaka — ISRC Collection Drive",
      time: "10:30 AM",
      lat: 17.6534,
      lng: 80.8987,
      status: "Drive Executed",
      accuracy: "4.2m GPS accuracy",
      activity: "ISRC Collection Drive (420 Kg dry paper & plastic)"
    },
    {
      id: "WP-3",
      name: "ITC WoW Material Recovery Facility (MRF) — Sarapaka",
      time: "12:15 PM",
      lat: 17.6590,
      lng: 80.8870,
      status: "Weighbridge Checkpoint",
      accuracy: "4.0m GPS accuracy",
      activity: "Weighbridge verified: 405 Kg net certified material"
    },
    {
      id: "WP-4",
      name: "Government Degree College Bhadrachalam",
      time: "02:20 PM",
      lat: 17.6690,
      lng: 80.8912,
      status: "Session Conducted",
      accuracy: "3.5m GPS accuracy",
      activity: "Campus Waste Segregation Awareness Session (120 students)"
    },
    {
      id: "WP-5",
      name: "Punch-out Point: ITC Zonal Operations Hub, Bhadrachalam Road",
      time: "04:50 PM",
      lat: 17.6620,
      lng: 80.8810,
      status: "Punch-out Recorded",
      accuracy: "4.1m GPS accuracy",
      activity: "Daily Reconciliation & Evening Geotagged Punch-out"
    }
  ]
};

// Manager Team Performance data
export const TEAM_PERFORMANCE_METRICS = {
  totalCoordinators: 18,
  presentToday: 15,
  absentToday: 2,
  onLeaveToday: 1,
  pendingActivitiesTotal: 7,
  totalMaterialCollectedKgToday: 4850,
  teamTargetSchools: 360,
  teamAchievedSchools: 298,
  teamTargetMaterialKg: 45000,
  teamAchievedMaterialKg: 38450,
  teamCompletionRate: 85.4,
  activityTypeBreakdown: [
    { name: "School ISRS & Collection", count: 22, color: "#0F766E" },
    { name: "College Awareness & Drives", count: 8, color: "#1E40AF" },
    { name: "Corporate Segregation Drives", count: 5, color: "#D97706" },
    { name: "Household Propagation", count: 4, color: "#6D28D9" },
    { name: "Office / MRF Work", count: 3, color: "#334155" }
  ],
  monthlyTrend: [
    { month: "May", plannedKg: 32000, achievedKg: 30500 },
    { month: "Jun", plannedKg: 35000, achievedKg: 34100 },
    { month: "Jul", plannedKg: 38000, achievedKg: 37200 },
    { month: "Aug", plannedKg: 40000, achievedKg: 39500 },
    { month: "Sep", plannedKg: 42000, achievedKg: 41200 },
    { month: "Oct (MTD)", plannedKg: 45000, achievedKg: 38450 }
  ],
  coordinatorRankings: [
    { rank: 1, name: "Suresh Babu", empId: "WOW-CRD-103", district: "Bhadradri Kothagudem", visited: 21, target: 25, materialKg: 3120, percentage: 86.6, pendingCount: 0, status: "Present" },
    { rank: 2, name: "Rajesh Kumar", empId: "WOW-CRD-101", district: "Bhadradri Kothagudem", visited: 19, target: 24, materialKg: 2840, percentage: 81.1, pendingCount: 2, status: "Present" },
    { rank: 3, name: "Priya Sharma", empId: "WOW-CRD-102", district: "Khammam", visited: 18, target: 22, materialKg: 2450, percentage: 81.6, pendingCount: 1, status: "Present" },
    { rank: 4, name: "K. Venkatesh", empId: "WOW-CRD-104", district: "Mahabubabad", visited: 17, target: 22, materialKg: 2280, percentage: 76.0, pendingCount: 1, status: "Present" },
    { rank: 5, name: "Sandhya Rani", empId: "WOW-CRD-105", district: "Khammam", visited: 16, target: 24, materialKg: 2100, percentage: 65.6, pendingCount: 2, status: "Leave" },
    { rank: 6, name: "M. Ashok Kumar", empId: "WOW-CRD-106", district: "Bhadradri Kothagudem", visited: 15, target: 25, materialKg: 1950, percentage: 60.0, pendingCount: 1, status: "Absent" }
  ]
};

// Master Data definitions
export const MASTER_DATA = {
  states: [
    { id: "ST-01", name: "Telangana", code: "TS", activeDistricts: 3, assignedNgo: "MARI" },
    { id: "ST-02", name: "Andhra Pradesh", code: "AP", activeDistricts: 2, assignedNgo: "BTWS" },
    { id: "ST-03", name: "Karnataka", code: "KA", activeDistricts: 1, assignedNgo: "Pratham" }
  ],
  districts: [
    { id: "DST-01", name: "Bhadradri Kothagudem", state: "Telangana", stateId: "ST-01", activeSchools: 184, activeColleges: 18, activeCorporates: 12, coordinators: 24 },
    { id: "DST-02", name: "Khammam", state: "Telangana", stateId: "ST-01", activeSchools: 142, activeColleges: 14, activeCorporates: 8, coordinators: 16 },
    { id: "DST-03", name: "Mahabubabad", state: "Telangana", stateId: "ST-01", activeSchools: 88, activeColleges: 8, activeCorporates: 4, coordinators: 8 }
  ]
};
