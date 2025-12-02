import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-2f5f0fc8/health", (c) => {
  return c.json({ status: "ok" });
});

// Principal Dashboard endpoint
app.get("/make-server-2f5f0fc8/dashboard/principal", async (c) => {
  try {
    // Fetch all necessary data
    const students = await kv.getByPrefix("student:");
    const teachers = await kv.getByPrefix("teacher:");
    const classes = await kv.getByPrefix("class:");
    const attendance = await kv.getByPrefix("attendance:");
    const grades = await kv.getByPrefix("grade:");
    const tickets = await kv.getByPrefix("ticket:");
    const fleet = await kv.getByPrefix("fleet:");
    const events = await kv.getByPrefix("event:");

    // Calculate today's date
    const today = new Date().toISOString().split('T')[0];

    // Calculate attendance statistics
    const todayAttendance = attendance.filter((a: any) => a.date === today);
    const presentToday = todayAttendance.filter((a: any) => a.status === 'present').length;
    const absentToday = todayAttendance.filter((a: any) => a.status === 'absent').length;
    const totalToday = todayAttendance.length;
    const attendancePercentage = totalToday > 0 ? Math.round((presentToday / totalToday) * 100) : 0;

    // Calculate classes marked/not marked
    const uniqueClasses = [...new Set(todayAttendance.map((a: any) => `${a.classId}-${a.section}`))];
    const totalClasses = classes.length;
    const classesMarked = uniqueClasses.length;
    const classesNotMarked = totalClasses - classesMarked;

    // Find classes that missed cutoff (10:30 AM)
    const cutoffTime = new Date();
    cutoffTime.setHours(10, 30, 0, 0);
    const missedCutoff = classes.filter((cls: any) => {
      const classAttendance = attendance.find((a: any) => 
        a.classId === cls.id && a.date === today
      );
      if (!classAttendance || !classAttendance.markedAt) return true;
      const markedTime = new Date(classAttendance.markedAt);
      return markedTime > cutoffTime;
    });

    // Find students absent for 3+ consecutive days
    const consecutiveAbsent: any[] = [];
    students.forEach((student: any) => {
      const studentAttendance = attendance
        .filter((a: any) => a.studentId === student.id)
        .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
      
      let consecutive = 0;
      for (const record of studentAttendance) {
        if (record.status === 'absent') {
          consecutive++;
        } else {
          break;
        }
      }
      
      if (consecutive >= 3) {
        consecutiveAbsent.push({
          ...student,
          consecutiveDays: consecutive
        });
      }
    });

    // Calculate pending approvals
    const pendingGrades = grades.filter((g: any) => !g.approvedByPrincipal).length;
    
    // Calculate active tickets
    const activeTickets = tickets.filter((t: any) => t.status !== 'resolved').length;

    // Fleet statistics
    const fleetCompleted = fleet.filter((f: any) => f.status === 'completed').length;
    const fleetActive = fleet.filter((f: any) => f.status === 'active').length;

    // Upcoming events
    const upcomingEvents = events
      .filter((e: any) => new Date(e.date) >= new Date())
      .sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 5);

    // Overall attendance by day (last 7 days)
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      return d.toISOString().split('T')[0];
    });

    const overallAttendance = last7Days.map(date => {
      const dayAttendance = attendance.filter((a: any) => a.date === date);
      const present = dayAttendance.filter((a: any) => a.status === 'present').length;
      const total = dayAttendance.length;
      return {
        date: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
        percentage: total > 0 ? Math.round((present / total) * 100) : 0
      };
    });

    // Top and bottom classes by attendance
    const classAttendanceStats = classes.map((cls: any) => {
      const classAtt = attendance.filter((a: any) => a.classId === cls.id);
      const present = classAtt.filter((a: any) => a.status === 'present').length;
      const total = classAtt.length;
      return {
        id: cls.id,
        name: `${cls.name} ${cls.section || ''}`,
        percentage: total > 0 ? Math.round((present / total) * 100) : 0
      };
    }).sort((a, b) => b.percentage - a.percentage);

    const top3HighestAttendance = classAttendanceStats.slice(0, 3);
    const top3LowestAttendance = classAttendanceStats.slice(-3).reverse();

    // Overall grades by subject
    const subjectGrades: any = {};
    grades.forEach((grade: any) => {
      if (!subjectGrades[grade.subject]) {
        subjectGrades[grade.subject] = [];
      }
      subjectGrades[grade.subject].push(grade.marks);
    });

    const overallGrades = Object.entries(subjectGrades).map(([subject, marks]: [string, any]) => ({
      subject,
      average: Math.round(marks.reduce((a: number, b: number) => a + b, 0) / marks.length)
    }));

    // Recent activities
    const recentActivities = [
      ...tickets.slice(-3).map((t: any) => ({
        type: 'ticket',
        title: 'New ticket assigned',
        description: t.subject || 'Parent query',
        time: formatTimeAgo(t.createdAt)
      })),
      ...grades.filter((g: any) => !g.approvedByPrincipal).slice(-2).map((g: any) => ({
        type: 'grade',
        title: 'Grades submitted for approval',
        description: `${g.className} - ${g.subject}`,
        time: formatTimeAgo(g.createdAt)
      }))
    ].sort((a, b) => b.time.localeCompare(a.time)).slice(0, 5);

    return c.json({
      totalStudents: students.length,
      totalTeachers: teachers.length,
      totalClasses: classes.length,
      totalFleetVehicles: fleet.length,
      totalWorkDays: 200, // This should be configurable
      totalHolidays: 50,
      pendingApprovals: pendingGrades,
      activeTickets,
      todayAttendance: {
        present: presentToday,
        absent: absentToday,
        total: totalToday,
        percentage: attendancePercentage
      },
      classesMarkedAttendance: classesMarked,
      classesNotMarkedAttendance: classesNotMarked,
      fleetActive,
      fleetCompleted,
      upcomingEvents,
      recentActivities,
      overallAttendance,
      overallGrades,
      top3HighestAttendance,
      top3LowestAttendance,
      missedCutoffClasses: missedCutoff,
      consecutiveAbsent
    });
  } catch (error) {
    console.error('Error in principal dashboard:', error);
    return c.json({ error: 'Failed to fetch dashboard data' }, 500);
  }
});

// Teachers endpoint
app.get("/make-server-2f5f0fc8/teachers", async (c) => {
  try {
    const teachers = await kv.getByPrefix("teacher:");
    return c.json({ teachers });
  } catch (error) {
    console.error('Error fetching teachers:', error);
    return c.json({ error: 'Failed to fetch teachers' }, 500);
  }
});

// Classes endpoint
app.get("/make-server-2f5f0fc8/classes", async (c) => {
  try {
    const classes = await kv.getByPrefix("class:");
    return c.json({ classes });
  } catch (error) {
    console.error('Error fetching classes:', error);
    return c.json({ error: 'Failed to fetch classes' }, 500);
  }
});

// Teacher Dashboard endpoint
app.get("/make-server-2f5f0fc8/dashboard/teacher", async (c) => {
  try {
    const teachers = await kv.getByPrefix("teacher:");
    const teacher = teachers[0] || {}; // Get first teacher for demo

    return c.json({
      teacherInfo: {
        name: teacher.name || 'Teacher',
        subjects: teacher.subjects || [],
        classes: teacher.classes || [],
        averageScore: teacher.averageScore || 85,
        trend: teacher.trend || 'up',
        trendValue: teacher.trendValue || 5
      },
      subjectPerformance: teacher.subjectPerformance || [],
      recentActivities: teacher.recentActivities || [],
      recentHomework: teacher.recentHomework || [],
      upcomingClasses: teacher.upcomingClasses || [],
      attendanceMarked: teacher.attendanceMarked || 3,
      gradesEntered: teacher.gradesEntered || 12
    });
  } catch (error) {
    console.error('Error in teacher dashboard:', error);
    return c.json({ error: 'Failed to fetch dashboard data' }, 500);
  }
});

// Initialize mock data endpoint
app.post("/make-server-2f5f0fc8/init-mock-data", async (c) => {
  try {
    // Check if data already exists
    const existingTeachers = await kv.getByPrefix("teacher:");
    if (existingTeachers.length > 0) {
      return c.json({ message: 'Mock data already exists', skipped: true });
    }

    // Create mock teachers
    const teachers = [
      {
        id: 'teacher-001',
        name: 'Priya Sharma',
        email: 'priya.sharma@school.com',
        phone: '+91 98765 43210',
        subjects: ['Mathematics', 'Physics'],
        classes: ['Class 10A', 'Class 10B', 'Class 9A'],
        isClassTeacher: false,
        averageScore: 87,
        trend: 'up',
        trendValue: 5,
        subjectPerformance: [
          { name: 'Mathematics', classes: ['10A', '10B'], average: 88, schoolAverage: 82 },
          { name: 'Physics', classes: ['9A'], average: 86, schoolAverage: 80 }
        ],
        recentActivities: [
          { type: 'grade', title: 'Grades entered', description: 'Class 10A - Mathematics Unit Test', time: '2h ago' },
          { type: 'attendance', title: 'Attendance marked', description: 'Class 10B - Period 3', time: '3h ago' },
          { type: 'homework', title: 'Homework assigned', description: 'Class 9A - Physics Chapter 5', time: '1d ago' }
        ],
        recentHomework: [
          { subject: 'Mathematics', class: '10A', title: 'Trigonometry Practice', dueDate: '2025-11-05', submissions: 28 },
          { subject: 'Physics', class: '9A', title: 'Laws of Motion Problems', dueDate: '2025-11-06', submissions: 15 }
        ],
        upcomingClasses: [
          { time: '11:00 AM', period: 'Period 4', subject: 'Mathematics', class: 'Class 10A', room: 'Room 201' },
          { time: '12:00 PM', period: 'Period 5', subject: 'Physics', class: 'Class 9A', room: 'Room 305' }
        ],
        attendanceMarked: 3,
        gradesEntered: 12,
        employeeId: 'EMP-T-001',
        examMarks: [
          { examType: 'Mid-term', subject: 'Mathematics', class: '10A', average: 88, passRate: 92 },
          { examType: 'Unit Test', subject: 'Physics', class: '9A', average: 86, passRate: 88 }
        ]
      }
    ];

    // Create mock classes
    const classes = [
      {
        id: 'class-001',
        name: 'Class 10',
        section: 'A',
        sections: ['A', 'B'],
        classTeacher: 'Rajesh Kumar',
        studentCount: 35,
        attendanceRate: 94,
        averageGrade: 85,
        subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Hindi'],
        subjectDetails: [
          { name: 'Mathematics', teacher: 'Priya Sharma', averageScore: 88 },
          { name: 'Physics', teacher: 'Amit Verma', averageScore: 82 },
          { name: 'Chemistry', teacher: 'Sunita Reddy', averageScore: 85 },
          { name: 'Biology', teacher: 'Dr. Meena Singh', averageScore: 87 },
          { name: 'English', teacher: 'Sarah Johnson', averageScore: 83 },
          { name: 'Hindi', teacher: 'Rakesh Sharma', averageScore: 80 }
        ],
        students: [
          { id: 's1', rollNo: '001', name: 'Aarav Kumar', email: 'aarav@student.com', attendance: 96, averageGrade: 88 },
          { id: 's2', rollNo: '002', name: 'Diya Sharma', email: 'diya@student.com', attendance: 94, averageGrade: 92 },
          { id: 's3', rollNo: '003', name: 'Arjun Reddy', email: 'arjun@student.com', attendance: 92, averageGrade: 85 }
        ]
      },
      {
        id: 'class-002',
        name: 'Class 9',
        section: 'A',
        sections: ['A', 'B', 'C'],
        classTeacher: 'Sunita Patel',
        studentCount: 40,
        attendanceRate: 92,
        averageGrade: 82,
        subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Hindi', 'Social Studies'],
        subjectDetails: [
          { name: 'Mathematics', teacher: 'Priya Sharma', averageScore: 84 },
          { name: 'Physics', teacher: 'Priya Sharma', averageScore: 86 }
        ],
        students: []
      }
    ];

    // Save teachers
    for (const teacher of teachers) {
      await kv.set(`teacher:${teacher.id}`, teacher);
    }

    // Save classes
    for (const cls of classes) {
      await kv.set(`class:${cls.id}`, cls);
    }

    return c.json({ 
      message: 'Mock data initialized successfully',
      teachersCreated: teachers.length,
      classesCreated: classes.length
    });
  } catch (error) {
    console.error('Error initializing mock data:', error);
    return c.json({ error: 'Failed to initialize mock data' }, 500);
  }
});

// Helper function to format time ago
function formatTimeAgo(dateString: string): string {
  if (!dateString) return 'Just now';
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
}

Deno.serve(app.fetch);