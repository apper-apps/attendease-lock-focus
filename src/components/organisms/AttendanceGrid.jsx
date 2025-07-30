import React, { useState, useEffect } from "react";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Select from "@/components/atoms/Select";
import AttendanceStatusPill from "@/components/molecules/AttendanceStatusPill";
import ApperIcon from "@/components/ApperIcon";
import { format, isToday } from "date-fns";
import { toast } from "react-toastify";
import { cn } from "@/utils/cn";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import classService from "@/services/api/classService";
import attendanceService from "@/services/api/attendanceService";

const AttendanceGrid = ({ selectedClassId, selectedDate }) => {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (selectedClassId) {
      loadStudentsAndAttendance();
    }
  }, [selectedClassId, selectedDate]);

  const loadStudentsAndAttendance = async () => {
    try {
      setLoading(true);
      setError("");
      
      const classData = await classService.getById(selectedClassId);
      if (!classData) {
        throw new Error("Class not found");
      }

      // Load students and existing attendance
      const [studentsData, attendanceData] = await Promise.all([
        classService.getStudents(selectedClassId),
        attendanceService.getByClassAndDate(selectedClassId, selectedDate)
      ]);

      setStudents(studentsData);
      
      // Convert attendance array to object for easier lookup
      const attendanceMap = {};
      attendanceData.forEach(record => {
        attendanceMap[record.studentId] = record.status;
      });
      setAttendance(attendanceMap);
    } catch (err) {
      setError(err.message || "Failed to load attendance data");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (studentId, status) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const handleBulkAction = (status) => {
    const newAttendance = {};
    students.forEach(student => {
      newAttendance[student.Id] = status;
    });
    setAttendance(newAttendance);
    toast.success(`All students marked as ${status}`);
  };

  const handleSaveAttendance = async () => {
    try {
      setSaving(true);
      
      const attendanceRecords = students.map(student => ({
        studentId: student.Id,
        classId: selectedClassId,
        date: selectedDate,
        status: attendance[student.Id] || "absent",
        markedBy: "current-user-id",
        timestamp: new Date().toISOString()
      }));

      await attendanceService.saveAttendance(attendanceRecords);
      toast.success("Attendance saved successfully!");
    } catch (err) {
      toast.error("Failed to save attendance");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadStudentsAndAttendance} />;
  if (!selectedClassId) {
    return (
      <Empty
        icon="Calendar"
        title="Select a Class"
        description="Choose a class from the dropdown above to view and mark attendance."
      />
    );
  }
  if (students.length === 0) {
    return (
      <Empty
        icon="Users"
        title="No Students Found"
        description="This class doesn't have any students enrolled yet."
      />
    );
  }

  return (
    <Card className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Mark Attendance
          </h3>
          <p className="text-sm text-gray-600">
            {format(new Date(selectedDate), "EEEE, MMMM d, yyyy")}
            {isToday(new Date(selectedDate)) && (
              <span className="ml-2 text-primary-600 font-medium">Today</span>
            )}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button
            variant="success"
            size="sm"
            onClick={() => handleBulkAction("present")}
          >
            <ApperIcon name="Check" className="h-4 w-4 mr-1" />
            All Present
          </Button>
          <Button
            variant="error"
            size="sm"
            onClick={() => handleBulkAction("absent")}
          >
            <ApperIcon name="X" className="h-4 w-4 mr-1" />
            All Absent
          </Button>
          <Button
            variant="primary"
            onClick={handleSaveAttendance}
            disabled={saving}
            className="ml-2"
          >
            {saving ? (
              <ApperIcon name="Loader2" className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <ApperIcon name="Save" className="h-4 w-4 mr-2" />
            )}
            Save Attendance
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Student</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Roll Number</th>
              <th className="text-center py-3 px-4 font-semibold text-gray-900">Status</th>
              <th className="text-center py-3 px-4 font-semibold text-gray-900">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {students.map((student) => (
              <tr key={student.Id} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="py-4 px-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-white">
                        {student.name.charAt(0)}
                      </span>
                    </div>
                    <div className="ml-3">
                      <p className="font-medium text-gray-900">{student.name}</p>
                      <p className="text-sm text-gray-500">{student.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 text-gray-900">
                  {student.rollNumber}
                </td>
                <td className="py-4 px-4 text-center">
                  <AttendanceStatusPill status={attendance[student.Id] || "not-marked"} />
                </td>
                <td className="py-4 px-4 text-center">
                  <Select
                    value={attendance[student.Id] || ""}
                    onChange={(e) => handleStatusChange(student.Id, e.target.value)}
                    className="w-32"
                  >
                    <option value="">Select</option>
                    <option value="present">Present</option>
                    <option value="absent">Absent</option>
                    <option value="late">Late</option>
                  </Select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default AttendanceGrid;