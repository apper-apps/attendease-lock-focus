import React from "react";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";

const RoleBadge = ({ role }) => {
  const getRoleConfig = () => {
    switch (role) {
      case "admin":
        return {
          variant: "admin",
          icon: "Shield",
          label: "Admin"
        };
      case "teacher":
        return {
          variant: "teacher",
          icon: "GraduationCap",
          label: "Teacher"
        };
      case "parent":
        return {
          variant: "parent",
          icon: "Users",
          label: "Parent"
        };
      case "student":
        return {
          variant: "student",
          icon: "BookOpen",
          label: "Student"
        };
      default:
        return {
          variant: "default",
          icon: "User",
          label: "User"
        };
    }
  };

  const config = getRoleConfig();

  return (
    <Badge variant={config.variant} className="flex items-center gap-1">
      <ApperIcon name={config.icon} className="h-3 w-3" />
      {config.label}
    </Badge>
  );
};

export default RoleBadge;