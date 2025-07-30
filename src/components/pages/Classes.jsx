import React, { useState } from "react";
import ClassList from "@/components/organisms/ClassList";
import SearchBar from "@/components/molecules/SearchBar";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Classes = () => {
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-700 to-secondary-600 bg-clip-text text-transparent">
            Classes
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your classes and their assignments
          </p>
        </div>
        <Button variant="primary">
          <ApperIcon name="Plus" className="h-4 w-4 mr-2" />
          Add Class
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <SearchBar
            placeholder="Search classes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Classes Grid */}
      <ClassList
        onClassSelect={setSelectedClassId}
        selectedClassId={selectedClassId}
      />
    </div>
  );
};

export default Classes;