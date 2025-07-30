import React from "react";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  icon = "Inbox", 
  title = "No data found", 
  description = "There's nothing to show here yet.",
  action 
}) => {
  return (
    <Card className="p-12 text-center">
      <div className="mx-auto w-16 h-16 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-6">
        <ApperIcon name={icon} className="h-8 w-8 text-gray-500" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        {description}
      </p>
      {action && action}
    </Card>
  );
};

export default Empty;