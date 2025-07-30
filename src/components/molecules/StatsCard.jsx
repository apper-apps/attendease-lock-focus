import React from "react";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const StatsCard = ({ 
  title, 
  value, 
  icon, 
  iconColor = "text-primary-600",
  iconBg = "bg-primary-100",
  trend,
  trendDirection,
  className 
}) => {
  const getTrendColor = () => {
    if (trendDirection === "up") return "text-success-600";
    if (trendDirection === "down") return "text-error-600";
    return "text-gray-500";
  };

  const getTrendIcon = () => {
    if (trendDirection === "up") return "TrendingUp";
    if (trendDirection === "down") return "TrendingDown";
    return "Minus";
  };

  return (
    <Card className={cn("p-6", className)}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            {value}
          </p>
          {trend && (
            <div className={cn("flex items-center mt-2 text-sm", getTrendColor())}>
              <ApperIcon name={getTrendIcon()} className="h-4 w-4 mr-1" />
              <span>{trend}</span>
            </div>
          )}
        </div>
        <div className={cn("p-3 rounded-full", iconBg)}>
          <ApperIcon name={icon} className={cn("h-6 w-6", iconColor)} />
        </div>
      </div>
    </Card>
  );
};

export default StatsCard;