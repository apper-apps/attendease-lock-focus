import attendanceData from "@/services/mockData/attendance.json";
import classesData from "@/services/mockData/classes.json";

const analyticsService = {
  async getAnalytics(timeRange = "week") {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const now = new Date();
    const startDate = new Date();
    
    switch (timeRange) {
      case "week":
        startDate.setDate(now.getDate() - 7);
        break;
      case "month":
        startDate.setDate(now.getDate() - 30);
        break;
      case "quarter":
        startDate.setDate(now.getDate() - 90);
        break;
      default:
        startDate.setDate(now.getDate() - 7);
    }

    // Generate attendance trend data
    const attendanceTrend = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];
      
      const dayAttendance = attendanceData.filter(record => record.date === dateStr);
      const present = dayAttendance.filter(r => r.status === "present").length;
      const absent = dayAttendance.filter(r => r.status === "absent").length;
      
      attendanceTrend.push({
        date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        present: present || Math.floor(Math.random() * 15) + 10,
        absent: absent || Math.floor(Math.random() * 5) + 1
      });
    }

    // Generate class comparison data
    const classComparison = classesData.map(classItem => {
      const classAttendance = attendanceData.filter(record => record.classId === classItem.Id);
      const totalRecords = classAttendance.length;
      const presentRecords = classAttendance.filter(r => r.status === "present").length;
      const attendanceRate = totalRecords > 0 ? Math.round((presentRecords / totalRecords) * 100) : Math.floor(Math.random() * 20) + 75;
      
      return {
        className: classItem.name,
        attendanceRate
      };
    });

    // Generate today's distribution
    const todayDate = new Date().toISOString().split("T")[0];
    const todayAttendance = attendanceData.filter(record => record.date === todayDate);
    
    const dailyStats = [{
      present: todayAttendance.filter(r => r.status === "present").length || 25,
      absent: todayAttendance.filter(r => r.status === "absent").length || 3,
      late: todayAttendance.filter(r => r.status === "late").length || 2
    }];

    return {
      attendanceTrend,
      classComparison,
      dailyStats
    };
  }
};

export default analyticsService;