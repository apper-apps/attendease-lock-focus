import React from "react";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";

const AttendanceStatusPill = ({ status }) => {
  const getStatusConfig = () => {
    switch (status) {
      case "present":
        return {
          variant: "success",
          icon: "Check",
          label: "Present"
        };
      case "absent":
        return {
          variant: "error",
          icon: "X",
          label: "Absent"
        };
      case "late":
        return {
          variant: "warning",
          icon: "Clock",
          label: "Late"
        };
      default:
        return {
          variant: "default",
          icon: "Minus",
          label: "Not Marked"
        };
    }
  };

  const config = getStatusConfig();

  return (
    <Badge variant={config.variant} className="flex items-center gap-1">
      <ApperIcon name={config.icon} className="h-3 w-3" />
      {config.label}
    </Badge>
  );
};

export default AttendanceStatusPill;