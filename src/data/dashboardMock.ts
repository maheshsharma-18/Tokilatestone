// Mock dashboard data generators
import { students, users, attendanceRecords, grades, tickets, events, busTrips, timetables, homeworks } from './mockData';

export const getPrincipalDashboardData = () => {
  const totalStudents = students.length;
  const totalTeachers = users.filter(u => ['class_teacher', 'subject_teacher'].includes(u.role)).length;
  const totalClasses = [...new Set(students.map(s => `${s.class}${s.section}`))].length;
  const totalFleetVehicles = [...new Set(busTrips.map(t => t.busNumber))].length;
  
  // Calculate attendance for today
  const todayRecords = attendanceRecords;
  const presentToday = todayRecords.filter(a => a.status === 'present').length;
  const absentToday = todayRecords.filter(a => a.status === 'absent').length;
  const totalToday = todayRecords.length;
  const attendancePercentage = totalToday > 0 ? Math.round((presentToday / totalToday) * 100) : 0;

  // Classes attendance tracking
  const classesMarkedAttendance = 2;
  const classesNotMarkedAttendance = totalClasses - classesMarkedAttendance;

  // Pending approvals
  const pendingApprovals = grades.filter(g => !g.approvedByPrincipal).length;

  // Active tickets
  const activeTickets = tickets.filter(t => t.status !== 'resolved').length;

  // Events
  const upcomingEvents = events.slice(0, 3).map(e => ({
    ...e,
    date: e.date,
    category: e.category
  }));

  // Recent activities
  const recentActivities = [
    {
      id: 1,
      type: 'grade',
      message: 'New grade submission for Class 10A Mathematics',
      timestamp: '2 hours ago',
      user: 'Mr. Suresh Reddy'
    },
    {
      id: 2,
      type: 'attendance',
      message: 'Attendance marked for Class 10B',
      timestamp: '3 hours ago',
      user: 'Mrs. Kavita Nair'
    },
    {
      id: 3,
      type: 'ticket',
      message: 'New ticket: Bus Delay Issue',
      timestamp: '5 hours ago',
      user: 'Mr. Venkat Murthy'
    }
  ];

  // Overall attendance trend (last 7 days)
  const overallAttendance = [
    { date: 'Oct 13', percentage: 94, present: 235, absent: 15 },
    { date: 'Oct 14', percentage: 92, present: 230, absent: 20 },
    { date: 'Oct 15', percentage: 96, present: 240, absent: 10 },
    { date: 'Oct 16', percentage: 93, present: 233, absent: 17 },
    { date: 'Oct 17', percentage: 95, present: 238, absent: 12 },
    { date: 'Oct 18', percentage: 91, present: 228, absent: 22 },
    { date: 'Oct 19', percentage: attendancePercentage, present: presentToday, absent: absentToday }
  ];

  // Grade distribution
  const overallGrades = [
    { subject: 'Math', average: 82, grade: 'A' },
    { subject: 'Science', average: 88, grade: 'A+' },
    { subject: 'English', average: 79, grade: 'B+' },
    { subject: 'Social', average: 85, grade: 'A' },
    { subject: 'Hindi', average: 76, grade: 'B' }
  ];

  // Top 3 classes with highest attendance
  const top3HighestAttendance = [
    { class: '10A', percentage: 97, present: 48, total: 50 },
    { class: '10B', percentage: 95, present: 47, total: 50 },
    { class: '9A', percentage: 93, present: 46, total: 50 }
  ];

  // Top 3 classes with lowest attendance
  const top3LowestAttendance = [
    { class: '8C', percentage: 85, present: 42, total: 50 },
    { class: '9C', percentage: 87, present: 43, total: 50 },
    { class: '7B', percentage: 88, present: 44, total: 50 }
  ];

  // Classes that missed attendance cutoff
  const missedCutoffClasses = [
    { class: '8C', percentage: 85, teacher: 'Mrs. Priya Sharma' }
  ];

  // Students with consecutive absences
  const consecutiveAbsent = [
    { name: 'Rahul Kumar', class: '10A', days: 3 },
    { name: 'Sneha Patel', class: '9B', days: 2 }
  ];

  // Fleet status
  const fleetActive = busTrips.filter(t => t.status === 'active').length;
  const fleetCompleted = busTrips.filter(t => t.status === 'completed').length;

  return {
    totalStudents,
    totalTeachers,
    totalClasses,
    totalFleetVehicles,
    totalWorkDays: 200,
    totalHolidays: 15,
    pendingApprovals,
    activeTickets,
    todayAttendance: {
      present: presentToday,
      absent: absentToday,
      total: totalToday,
      percentage: attendancePercentage
    },
    classesMarkedAttendance,
    classesNotMarkedAttendance,
    fleetActive,
    fleetCompleted,
    upcomingEvents,
    recentActivities,
    overallAttendance,
    overallGrades,
    top3HighestAttendance,
    top3LowestAttendance,
    missedCutoffClasses,
    consecutiveAbsent
  };
};

export const getTeacherDashboardData = (userId: string) => {
  const teacher = users.find(u => u.id === userId);
  
  // For subject teacher, get all their classes
  const teacherClasses = teacher?.assignedClasses || [];
  const teacherSubjects = teacher?.assignedSubjects || [];

  // Teacher info
  const teacherInfo = {
    name: teacher?.name || 'Teacher',
    subjects: teacherSubjects,
    classes: teacherClasses,
    averageScore: 85,
    trend: 'up',
    trendValue: 3.5
  };

  // Today's schedule from timetable
  const todaySchedule = timetables
    .filter(tt => teacherClasses.includes(`${tt.class}${tt.section}`))
    .slice(0, 5)
    .map(tt => ({
      period: tt.period,
      subject: tt.subject,
      class: `${tt.class}${tt.section}`,
      time: `${8 + tt.period}:00 AM`
    }));

  // Assignments to grade
  const assignmentsToGrade = grades.filter(g => 
    g.enteredBy === userId && !g.approvedByClassTeacher
  ).length;

  // Upcoming homework
  const upcomingHomework = homeworks
    .filter(hw => teacherSubjects.includes(hw.subject))
    .slice(0, 3);

  // Class performance
  const classPerformance = teacherClasses.map(cls => {
    const classGrades = grades.filter(g => {
      const student = students.find(s => s.id === g.studentId);
      return student && `${student.class}${student.section}` === cls;
    });
    
    const avgMarks = classGrades.length > 0
      ? classGrades.reduce((sum, g) => sum + (g.marks / g.maxMarks) * 100, 0) / classGrades.length
      : 0;

    return {
      class: cls,
      average: Math.round(avgMarks),
      students: students.filter(s => `${s.class}${s.section}` === cls).length
    };
  });

  // Attendance overview
  const attendanceOverview = {
    marked: 2,
    pending: teacherClasses.length - 2,
    percentage: 92
  };

  // Recent activities
  const recentActivities = [
    {
      id: 1,
      type: 'grade',
      title: 'Grades Submitted',
      description: 'Grade submitted for Class 10A',
      time: '1 hour ago'
    },
    {
      id: 2,
      type: 'homework',
      title: 'Homework Assigned',
      description: 'New homework assigned to Class 10B',
      time: '3 hours ago'
    },
    {
      id: 3,
      type: 'attendance',
      title: 'Attendance Marked',
      description: 'Attendance marked for all classes',
      time: '5 hours ago'
    }
  ];

  // Recent homework
  const recentHomework = homeworks
    .filter(hw => teacherSubjects.includes(hw.subject))
    .slice(0, 3)
    .map(hw => ({
      subject: hw.subject,
      class: `${hw.class}${hw.section}`,
      title: hw.title,
      dueDate: hw.dueDate,
      submissions: Math.floor(Math.random() * 20) + 10
    }));

  // Upcoming classes
  const upcomingClasses = todaySchedule.map((tt, idx) => ({
    time: tt.time,
    period: `Period ${tt.period}`,
    subject: tt.subject,
    class: tt.class,
    room: `Room ${101 + idx}`
  }));

  // Subject-wise performance for charts
  const subjectPerformance = teacherSubjects.map(subject => {
    const subjectGrades = grades.filter(g => g.subject === subject);
    const avgMarks = subjectGrades.length > 0
      ? subjectGrades.reduce((sum, g) => sum + (g.marks / g.maxMarks) * 100, 0) / subjectGrades.length
      : 0;

    return {
      name: subject,
      classes: teacherClasses,
      average: Math.round(avgMarks),
      schoolAverage: Math.round(avgMarks - 2),
      submissions: subjectGrades.length
    };
  });

  return {
    teacherInfo,
    todaySchedule,
    assignmentsToGrade,
    upcomingHomework,
    classPerformance,
    attendanceOverview,
    recentActivities,
    recentHomework,
    upcomingClasses,
    subjectPerformance,
    totalClasses: teacherClasses.length,
    totalSubjects: teacherSubjects.length,
    attendanceMarked: attendanceOverview.marked,
    gradesEntered: 12
  };
};

export const getClassTeacherDashboardData = (userId: string) => {
  const teacher = users.find(u => u.id === userId);
  const assignedClass = teacher?.classTeacherFor || '10A';

  // Get students in the class
  const classStudents = students.filter(s => `${s.class}${s.section}` === assignedClass);

  // Today's attendance
  const todayAttendance = {
    present: 48,
    absent: 2,
    total: classStudents.length,
    percentage: 96
  };

  // Pending tasks
  const pendingGradeApprovals = grades.filter(g => {
    const student = students.find(s => s.id === g.studentId);
    return student && `${student.class}${student.section}` === assignedClass && !g.approvedByClassTeacher;
  }).length;

  const activeTickets = tickets.filter(t => 
    t.assignedTo === userId && t.status !== 'resolved'
  ).length;

  // Recent activities
  const recentActivities = [
    {
      id: 1,
      type: 'attendance',
      message: 'Attendance marked for today',
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      type: 'grade',
      message: '5 grades approved',
      timestamp: '4 hours ago'
    },
    {
      id: 3,
      type: 'ticket',
      message: 'Ticket resolved: Attendance correction',
      timestamp: '1 day ago'
    }
  ];

  // Class timetable for today
  const todaySchedule = timetables
    .filter(tt => `${tt.class}${tt.section}` === assignedClass && tt.day === 'Monday')
    .slice(0, 6);

  // Performance overview
  const performanceOverview = {
    excellent: 15,
    good: 25,
    average: 8,
    needsAttention: 2
  };

  // Attendance trend (last 7 days)
  const attendanceTrend = [
    { date: 'Oct 13', percentage: 96 },
    { date: 'Oct 14', percentage: 94 },
    { date: 'Oct 15', percentage: 98 },
    { date: 'Oct 16', percentage: 95 },
    { date: 'Oct 17', percentage: 97 },
    { date: 'Oct 18', percentage: 93 },
    { date: 'Oct 19', percentage: 96 }
  ];

  return {
    assignedClass,
    classStudents: classStudents.length,
    todayAttendance,
    pendingGradeApprovals,
    activeTickets,
    recentActivities,
    todaySchedule,
    performanceOverview,
    attendanceTrend
  };
};

export const getFleetManagerDashboardData = () => {
  const totalBuses = [...new Set(busTrips.map(t => t.busNumber))].length;
  const activeTrips = busTrips.filter(t => t.status === 'active').length;
  const completedTrips = busTrips.filter(t => t.status === 'completed').length;

  // Today's trips
  const todayTrips = busTrips.slice(0, 6).map(trip => ({
    ...trip,
    studentsOnboard: Math.floor(Math.random() * 30) + 20
  }));

  // Maintenance alerts
  const maintenanceAlerts = [
    {
      id: 1,
      busNumber: 'TS09 AB 1234',
      issue: 'Oil change due',
      severity: 'medium',
      dueDate: '2025-10-25'
    },
    {
      id: 2,
      busNumber: 'TS09 CD 5678',
      issue: 'Tire replacement needed',
      severity: 'high',
      dueDate: '2025-10-22'
    }
  ];

  // Fleet statistics
  const fleetStats = {
    totalKmToday: 425,
    avgFuelEfficiency: 8.5,
    onTimePercentage: 94
  };

  return {
    totalBuses,
    activeTrips,
    completedTrips,
    todayTrips,
    maintenanceAlerts,
    fleetStats
  };
};

export const getSuperAdminDashboardData = () => {
  const totalSchools = 3;
  const totalStudents = students.length * 3; // Multiply by number of schools
  const totalTeachers = users.filter(u => ['class_teacher', 'subject_teacher'].includes(u.role)).length * 3;
  const activeUsers = 1250 + 850 + 650;

  // School performance
  const schoolPerformance = [
    { name: 'Delhi Public School', students: 1250, attendance: 95, compliance: 'good' },
    { name: 'Vidya Mandir', students: 850, attendance: 93, compliance: 'good' },
    { name: 'St. Johns Academy', students: 650, attendance: 91, compliance: 'warning' }
  ];

  // System-wide stats
  const systemStats = {
    totalAttendanceMarked: 2580,
    totalGradesEntered: 15420,
    totalTicketsResolved: 142,
    activeEvents: 8
  };

  // Revenue overview (mock data)
  const revenueOverview = {
    thisMonth: 2840000,
    lastMonth: 2650000,
    growth: 7.2
  };

  return {
    totalSchools,
    totalStudents,
    totalTeachers,
    activeUsers,
    schoolPerformance,
    systemStats,
    revenueOverview
  };
};