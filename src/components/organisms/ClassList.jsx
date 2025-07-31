import React, { useState, useEffect } from "react";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import classService from "@/services/api/classService";
import { toast } from "react-toastify";

const ClassList = ({ onClassSelect, selectedClassId }) => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadClasses();
  }, []);

  const loadClasses = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await classService.getAll();
      setClasses(data);
    } catch (err) {
      setError(err.message || "Failed to load classes");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadClasses} />;
  if (classes.length === 0) {
    return (
      <Empty
        icon="School"
        title="No Classes Found"
        description="Create your first class to start managing attendance."
        action={
          <Button variant="primary">
            <ApperIcon name="Plus" className="h-4 w-4 mr-2" />
            Add Class
          </Button>
        }
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {classes.map((classItem) => (
        <Card
          key={classItem.Id}
          hover
          className={`p-6 cursor-pointer transition-all duration-200 ${
            selectedClassId === classItem.Id
              ? "ring-2 ring-primary-500 bg-primary-50"
              : ""
          }`}
          onClick={() => onClassSelect(classItem.Id)}
        >
          <div className="flex items-start justify-between mb-4">
<div className="flex-1">
<h3 className="font-semibold text-gray-900 mb-1">
{classItem.Name || classItem.name || 'Unnamed Class'}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
Grade {classItem.grade || 'N/A'}
              </p>
              <Badge variant="info" size="sm">
                {classItem.studentIds?.length || 0} Students
              </Badge>
            </div>
            <div className="p-2 bg-gradient-to-r from-primary-100 to-primary-200 rounded-lg">
              <ApperIcon name="School" className="h-5 w-5 text-primary-600" />
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-1">Teachers</p>
              <div className="flex flex-wrap gap-1">
                {classItem.teachers?.slice(0, 3).map((teacher, index) => (
                  <Badge key={index} variant="teacher" size="sm">
                    {teacher.name}
                  </Badge>
                ))}
                {classItem.teachers?.length > 3 && (
                  <Badge variant="default" size="sm">
                    +{classItem.teachers.length - 3} more
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-200">
              <div className="flex items-center text-sm text-gray-600">
                <ApperIcon name="Clock" className="h-4 w-4 mr-1" />
                {classItem.schedule?.startTime} - {classItem.schedule?.endTime}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onClassSelect(classItem.Id);
                  toast.success(`Selected ${classItem.name}`);
                }}
              >
                Select
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ClassList;