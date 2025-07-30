import React, { useState, useEffect } from "react";
import StatsCard from "@/components/molecules/StatsCard";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import AttendanceStatusPill from "@/components/molecules/AttendanceStatusPill";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { format, isToday } from "date-fns";
import dashboardService from "@/services/api/dashboardService";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    stats: {},
    recentAlerts: [],
    todayAttendance: [],
    upcomingClasses: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await dashboardService.getDashboardData();
      setDashboardData(data);
    } catch (err) {
      setError(err.message || "Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadDashboardData} />;

  const { stats, recentAlerts, todayAttendance, upcomingClasses } = dashboardData;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-700 to-secondary-600 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-gray-600 mt-1">
            Welcome back! Here's what's happening at your school.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <p className="text-sm text-gray-600">
            {format(new Date(), "EEEE, MMMM d, yyyy")}
          </p>
          <Button variant="primary">
            <ApperIcon name="Calendar" className="h-4 w-4 mr-2" />
            Mark Attendance
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Students"
          value={stats.totalStudents || 0}
          icon="Users"
          iconColor="text-primary-600"
          iconBg="bg-primary-100"
          trend="+12 this month"
          trendDirection="up"
        />
        <StatsCard
          title="Present Today"
          value={stats.presentToday || 0}
          icon="Check"
          iconColor="text-success-600"
          iconBg="bg-success-100"
          trend={`${stats.attendanceRate || 0}% rate`}
          trendDirection="up"
        />
        <StatsCard
          title="Absent Today"
          value={stats.absentToday || 0}
          icon="X"
          iconColor="text-error-600"
          iconBg="bg-error-100"
          trend="-3 from yesterday"
          trendDirection="down"
        />
        <StatsCard
          title="Active Classes"
          value={stats.activeClasses || 0}
          icon="School"
          iconColor="text-accent-600"
          iconBg="bg-accent-100"
          trend="2 new this week"
          trendDirection="up"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Alerts */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Recent Alerts
              </h3>
              <Button variant="ghost" size="sm">
                <ApperIcon name="Bell" className="h-4 w-4 mr-2" />
                View All
              </Button>
            </div>
            <div className="space-y-4">
              {recentAlerts.length > 0 ? (
                recentAlerts.map((alert) => (
                  <div
                    key={alert.Id}
                    className="flex items-start space-x-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200"
                  >
                    <div className="p-2 bg-gradient-to-r from-error-100 to-error-200 rounded-full">
                      <ApperIcon name="AlertTriangle" className="h-4 w-4 text-error-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{alert.message}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        {format(new Date(alert.timestamp), "MMM d, h:mm a")}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ApperIcon name="ExternalLink" className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <div className="mx-auto w-12 h-12 bg-gradient-to-r from-success-100 to-success-200 rounded-full flex items-center justify-center mb-4">
                    <ApperIcon name="CheckCircle" className="h-6 w-6 text-success-600" />
                  </div>
                  <p className="text-gray-600">No alerts today! Everything looks good.</p>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          {/* Today's Summary */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Today's Summary
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Attendance Rate</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-success-500 to-success-600 h-2 rounded-full"
                      style={{ width: `${stats.attendanceRate || 0}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-success-600">
                    {stats.attendanceRate || 0}%
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Classes Completed</span>
                <span className="font-medium text-gray-900">
                  {stats.completedClasses || 0}/{stats.totalClassesToday || 0}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Notifications Sent</span>
                <span className="font-medium text-gray-900">
                  {stats.notificationsSent || 0}
                </span>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <ApperIcon name="Calendar" className="h-4 w-4 mr-3" />
                Mark Attendance
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <ApperIcon name="Users" className="h-4 w-4 mr-3" />
                Add Student
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <ApperIcon name="School" className="h-4 w-4 mr-3" />
                Create Class
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <ApperIcon name="FileText" className="h-4 w-4 mr-3" />
                Generate Report
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Recent Attendance */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Recent Attendance Records
          </h3>
          <Button variant="ghost" size="sm">
            View All Records
            <ApperIcon name="ArrowRight" className="h-4 w-4 ml-2" />
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Student</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Class</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Date</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Marked By</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {todayAttendance.length > 0 ? (
                todayAttendance.slice(0, 5).map((record) => (
                  <tr key={record.Id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <div className="h-8 w-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                          <span className="text-xs font-medium text-white">
                            {record.studentName?.charAt(0) || "S"}
                          </span>
                        </div>
                        <span className="ml-3 font-medium text-gray-900">
                          {record.studentName || "Unknown Student"}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-900">
                      {record.className || "Unknown Class"}
                    </td>
                    <td className="py-4 px-4 text-gray-600">
                      {format(new Date(record.date), "MMM d")}
                      {isToday(new Date(record.date)) && (
                        <span className="ml-2 text-primary-600 font-medium">Today</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <AttendanceStatusPill status={record.status} />
                    </td>
                    <td className="py-4 px-4 text-gray-600">
                      {record.markedBy || "System"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-gray-500">
                    No attendance records found for today
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;