import { toast } from "react-toastify";
import React from "react";

const attendanceService = {
  async getAll() {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "studentId" } },
          { field: { Name: "classId" } },
          { field: { Name: "date" } },
          { field: { Name: "status" } },
          { field: { Name: "markedBy" } },
          { field: { Name: "timestamp" } },
          { field: { Name: "studentName" } },
          { field: { Name: "className" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "CreatedOn" } },
          { field: { Name: "CreatedBy" } },
          { field: { Name: "ModifiedOn" } },
          { field: { Name: "ModifiedBy" } }
        ]
      };

      const response = await apperClient.fetchRecords('attendance', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching attendance:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  },

  async getById(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "studentId" } },
          { field: { Name: "classId" } },
          { field: { Name: "date" } },
          { field: { Name: "status" } },
          { field: { Name: "markedBy" } },
          { field: { Name: "timestamp" } },
          { field: { Name: "studentName" } },
          { field: { Name: "className" } }
        ]
      };

      const response = await apperClient.getRecordById('attendance', id, params);
      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching attendance record with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  async getByClassAndDate(classId, date) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "studentId" } },
          { field: { Name: "classId" } },
          { field: { Name: "date" } },
          { field: { Name: "status" } },
          { field: { Name: "markedBy" } },
          { field: { Name: "timestamp" } },
          { field: { Name: "studentName" } },
          { field: { Name: "className" } }
        ],
        whereGroups: [
          {
            operator: "AND",
            subGroups: [
              {
                conditions: [
                  {
                    fieldName: "classId",
                    operator: "EqualTo",
                    values: [parseInt(classId)]
                  }
                ],
                operator: "AND"
              },
              {
                conditions: [
                  {
                    fieldName: "date",
                    operator: "EqualTo",
                    values: [date]
                  }
                ],
                operator: "AND"
              }
            ]
          }
        ]
      };

      const response = await apperClient.fetchRecords('attendance', params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching attendance by class and date:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  },

  async getByStudentId(studentId) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "studentId" } },
          { field: { Name: "classId" } },
          { field: { Name: "date" } },
          { field: { Name: "status" } },
          { field: { Name: "markedBy" } },
          { field: { Name: "timestamp" } },
          { field: { Name: "studentName" } },
          { field: { Name: "className" } }
        ],
        where: [
          {
            FieldName: "studentId",
            Operator: "EqualTo",
            Values: [parseInt(studentId)]
          }
        ]
      };

      const response = await apperClient.fetchRecords('attendance', params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching attendance by student ID:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  },

  async saveAttendance(attendanceRecords) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const records = attendanceRecords.map(record => ({
        Name: record.Name || `${record.studentName} - ${record.className}`,
        studentId: parseInt(record.studentId),
        classId: parseInt(record.classId),
        date: record.date,
        status: record.status,
        markedBy: parseInt(record.markedBy),
        timestamp: record.timestamp || new Date().toISOString(),
        studentName: record.studentName,
        className: record.className,
        Tags: record.Tags,
        Owner: record.Owner
      }));

      const params = { records };

      const response = await apperClient.createRecord('attendance', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to save attendance ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        return successfulRecords.map(result => result.data);
      }
      
      return [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error saving attendance:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  },

  async getAttendanceStats(timeRange = "week") {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

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

      const params = {
        fields: [
          { field: { Name: "status" } },
          { field: { Name: "date" } }
        ],
        where: [
          {
            FieldName: "date",
            Operator: "GreaterThanOrEqualTo",
            Values: [startDate.toISOString().split("T")[0]]
          }
        ]
      };

      const response = await apperClient.fetchRecords('attendance', params);
      
      if (!response.success) {
        console.error(response.message);
        return {
          totalRecords: 0,
          presentCount: 0,
          absentCount: 0,
          lateCount: 0,
          attendanceRate: 0
        };
      }

      const filteredAttendance = response.data || [];
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
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching attendance stats:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return {
        totalRecords: 0,
        presentCount: 0,
        absentCount: 0,
        lateCount: 0,
        attendanceRate: 0
      };
}
  }
};

export default attendanceService;