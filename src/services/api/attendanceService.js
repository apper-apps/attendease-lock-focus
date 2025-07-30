import attendanceData from "@/services/mockData/attendance.json";

let attendance = [...attendanceData];

const attendanceService = {
  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...attendance];
  },

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    return attendance.find(record => record.Id === parseInt(id));
  },

  async getByClassAndDate(classId, date) {
    await new Promise(resolve => setTimeout(resolve, 350));
    return attendance.filter(record => 
      record.classId === parseInt(classId) && 
      record.date === date
    );
  },

  async getByStudentId(studentId) {
    await new Promise(resolve => setTimeout(resolve, 250));
    return attendance.filter(record => 
      record.studentId === parseInt(studentId)
    );
  },

  async saveAttendance(attendanceRecords) {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    for (const record of attendanceRecords) {
      const existingIndex = attendance.findIndex(
        existing => 
          existing.studentId === record.studentId &&
          existing.classId === record.classId &&
          existing.date === record.date
      );

      if (existingIndex !== -1) {
        // Update existing record
        attendance[existingIndex] = {
          ...attendance[existingIndex],
          ...record
        };
      } else {
        // Create new record
        const newRecord = {
          Id: Math.max(...attendance.map(a => a.Id)) + 1,
          ...record
        };
        attendance.push(newRecord);
      }
    }

    return attendanceRecords;
  },

  async getAttendanceStats(timeRange = "week") {
    await new Promise(resolve => setTimeout(resolve, 400));
    
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

    const filteredAttendance = attendance.filter(record => 
      new Date(record.date) >= startDate
    );

    const totalRecords = filteredAttendance.length;
    const presentCount = filteredAttendance.filter(r => r.status === "present").length;
    const absentCount = filteredAttendance.filter(r => r.status === "absent").length;
    const lateCount = filteredAttendance.filter(r => r.status === "late").length;

    return {
      totalRecords,
      presentCount,
      absentCount,
      lateCount,
      attendanceRate: totalRecords > 0 ? Math.round((presentCount / totalRecords) * 100) : 0
    };
  }
};

export default attendanceService;