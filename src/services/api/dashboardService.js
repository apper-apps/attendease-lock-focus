import attendanceService from "@/services/api/attendanceService";
import userService from "@/services/api/userService";
import classService from "@/services/api/classService";
import notificationService from "@/services/api/notificationService";
const dashboardService = {
  async getDashboardData() {
    try {
      const [users, classes, attendanceStats, notifications] = await Promise.all([
        userService.getAll(),
        classService.getAll(),
        attendanceService.getAttendanceStats("week"),
        notificationService.getAll()
      ]);

      const students = users.filter(user => user.role === "student");
      const todayDate = new Date().toISOString().split("T")[0];
      
      // Get today's attendance
      const todayAttendance = await attendanceService.getByClassAndDate(
        classes.length > 0 ? classes[0].Id : 1, 
        todayDate
      );

      const stats = {
        totalStudents: students.length,
        presentToday: todayAttendance.filter(r => r.status === "present").length,
        absentToday: todayAttendance.filter(r => r.status === "absent").length,
        activeClasses: classes.length,
        attendanceRate: attendanceStats.attendanceRate,
        completedClasses: Math.floor(classes.length * 0.6),
        totalClassesToday: classes.length,
        notificationsSent: notifications.length
      };

      // Get recent alerts
      const recentAlerts = await notificationService.getByType("absence_alert");
      const limitedAlerts = recentAlerts.slice(0, 5);

      // Get recent attendance (last 10 records)
      const allAttendance = await attendanceService.getAll();
      const recentAttendance = allAttendance
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(0, 10);

      return {
        stats,
        recentAlerts: limitedAlerts,
        todayAttendance: recentAttendance,
        upcomingClasses: classes.slice(0, 3)
      };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching dashboard data:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      
      // Return default data on error
      return {
        stats: {
          totalStudents: 0,
          presentToday: 0,
          absentToday: 0,
          activeClasses: 0,
          attendanceRate: 0,
          completedClasses: 0,
          totalClassesToday: 0,
          notificationsSent: 0
        },
        recentAlerts: [],
        todayAttendance: [],
        upcomingClasses: []
      };
    }
}
};

export default dashboardService;