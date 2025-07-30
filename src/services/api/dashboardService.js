import attendanceService from "./attendanceService";
import userService from "./userService";
import classService from "./classService";
import notificationsData from "@/services/mockData/notifications.json";
import attendanceData from "@/services/mockData/attendance.json";

const dashboardService = {
  async getDashboardData() {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const [users, classes, attendanceStats] = await Promise.all([
      userService.getAll(),
      classService.getAll(),
      attendanceService.getAttendanceStats("week")
    ]);

    const students = users.filter(user => user.role === "student");
    const todayDate = new Date().toISOString().split("T")[0];
    const todayAttendance = attendanceData.filter(record => record.date === todayDate);

    const stats = {
      totalStudents: students.length,
      presentToday: todayAttendance.filter(r => r.status === "present").length,
      absentToday: todayAttendance.filter(r => r.status === "absent").length,
      activeClasses: classes.length,
      attendanceRate: attendanceStats.attendanceRate,
      completedClasses: Math.floor(classes.length * 0.6),
      totalClassesToday: classes.length,
      notificationsSent: notificationsData.length
    };

    const recentAlerts = notificationsData
      .filter(notification => notification.type === "absence_alert")
      .slice(0, 5);

    const recentAttendance = attendanceData
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 10);

    return {
      stats,
      recentAlerts,
      todayAttendance: recentAttendance,
      upcomingClasses: classes.slice(0, 3)
    };
  }
};

export default dashboardService;