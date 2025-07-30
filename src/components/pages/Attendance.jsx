import React, { useState } from "react";
import AttendanceGrid from "@/components/organisms/AttendanceGrid";
import Select from "@/components/atoms/Select";
import Input from "@/components/atoms/Input";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import { format } from "date-fns";
import classService from "@/services/api/classService";
import { useEffect } from "react";

const Attendance = () => {
  const [selectedClassId, setSelectedClassId] = useState("");
  const [selectedDate, setSelectedDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    loadClasses();
  }, []);

  const loadClasses = async () => {
    try {
      const data = await classService.getAll();
      setClasses(data);
    } catch (err) {
      console.error("Failed to load classes:", err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-700 to-secondary-600 bg-clip-text text-transparent">
            Attendance
          </h1>
          <p className="text-gray-600 mt-1">
            Mark and manage student attendance
          </p>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <ApperIcon name="Calendar" className="h-4 w-4 mr-2" />
          {format(new Date(selectedDate), "EEEE, MMMM d, yyyy")}
        </div>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Class
            </label>
            <Select
              value={selectedClassId}
              onChange={(e) => setSelectedClassId(e.target.value)}
            >
              <option value="">Choose a class...</option>
              {classes.map((classItem) => (
                <option key={classItem.Id} value={classItem.Id}>
                  {classItem.name} - Grade {classItem.grade}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Date
            </label>
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
        </div>
      </Card>

      {/* Attendance Grid */}
      <AttendanceGrid
        selectedClassId={selectedClassId}
        selectedDate={selectedDate}
      />
    </div>
  );
};

export default Attendance;