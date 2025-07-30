import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import Card from "@/components/atoms/Card";
import Select from "@/components/atoms/Select";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import analyticsService from "@/services/api/analyticsService";

const AnalyticsCharts = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [timeRange, setTimeRange] = useState("week");
  const [analyticsData, setAnalyticsData] = useState({
    attendanceTrend: [],
    classComparison: [],
    dailyStats: []
  });

  useEffect(() => {
    loadAnalytics();
  }, [timeRange]);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await analyticsService.getAnalytics(timeRange);
      setAnalyticsData(data);
    } catch (err) {
      setError(err.message || "Failed to load analytics");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadAnalytics} />;

  const attendanceTrendOptions = {
    chart: {
      type: "line",
      height: 350,
      toolbar: { show: false },
      fontFamily: "Inter, sans-serif"
    },
    colors: ["#4F46E5", "#7C3AED"],
    stroke: {
      curve: "smooth",
      width: 3
    },
    xaxis: {
      categories: analyticsData.attendanceTrend.map(item => item.date),
      labels: {
        style: { colors: "#6B7280" }
      }
    },
    yaxis: {
      labels: {
        style: { colors: "#6B7280" }
      }
    },
    grid: {
      borderColor: "#E5E7EB"
    },
    legend: {
      position: "top"
    }
  };

  const attendanceTrendSeries = [
    {
      name: "Present",
      data: analyticsData.attendanceTrend.map(item => item.present)
    },
    {
      name: "Absent",
      data: analyticsData.attendanceTrend.map(item => item.absent)
    }
  ];

  const classComparisonOptions = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: { show: false },
      fontFamily: "Inter, sans-serif"
    },
    colors: ["#10B981"],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded"
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: analyticsData.classComparison.map(item => item.className),
      labels: {
        style: { colors: "#6B7280" }
      }
    },
    yaxis: {
      labels: {
        style: { colors: "#6B7280" }
      }
    },
    grid: {
      borderColor: "#E5E7EB"
    }
  };

  const classComparisonSeries = [
    {
      name: "Attendance Rate",
      data: analyticsData.classComparison.map(item => item.attendanceRate)
    }
  ];

  const dailyStatsOptions = {
    chart: {
      type: "donut",
      height: 350,
      fontFamily: "Inter, sans-serif"
    },
    colors: ["#10B981", "#EF4444", "#F59E0B"],
    labels: ["Present", "Absent", "Late"],
    legend: {
      position: "bottom"
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: "bottom"
          }
        }
      }
    ]
  };

  const dailyStatsSeries = analyticsData.dailyStats.length > 0 
    ? [
        analyticsData.dailyStats[0].present,
        analyticsData.dailyStats[0].absent,
        analyticsData.dailyStats[0].late
      ]
    : [0, 0, 0];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Analytics</h2>
          <p className="text-gray-600">Attendance insights and trends</p>
        </div>
        <Select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="w-full sm:w-48"
        >
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
          <option value="quarter">Last Quarter</option>
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Attendance Trend
          </h3>
          <Chart
            options={attendanceTrendOptions}
            series={attendanceTrendSeries}
            type="line"
            height={350}
          />
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Today's Distribution
          </h3>
          <Chart
            options={dailyStatsOptions}
            series={dailyStatsSeries}
            type="donut"
            height={350}
          />
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Class Attendance Comparison
        </h3>
        <Chart
          options={classComparisonOptions}
          series={classComparisonSeries}
          type="bar"
          height={350}
        />
      </Card>
    </div>
  );
};

export default AnalyticsCharts;