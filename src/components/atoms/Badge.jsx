import React from "react";
import { cn } from "@/utils/cn";

const Badge = React.forwardRef(({ 
  children, 
  variant = "default", 
  size = "md", 
  className, 
  ...props 
}, ref) => {
  const baseClasses = "inline-flex items-center font-medium rounded-full";
  
  const variants = {
    default: "bg-gray-100 text-gray-800",
    primary: "bg-gradient-to-r from-primary-100 to-primary-200 text-primary-800",
    secondary: "bg-gradient-to-r from-secondary-100 to-secondary-200 text-secondary-800",
    success: "bg-gradient-to-r from-success-100 to-success-200 text-success-800",
    error: "bg-gradient-to-r from-error-100 to-error-200 text-error-800",
    warning: "bg-gradient-to-r from-warning-100 to-warning-200 text-warning-800",
    info: "bg-gradient-to-r from-info-100 to-info-200 text-info-800",
    admin: "bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800",
    teacher: "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800",
    parent: "bg-gradient-to-r from-green-100 to-green-200 text-green-800",
    student: "bg-gradient-to-r from-orange-100 to-orange-200 text-orange-800"
  };
  
  const sizes = {
    sm: "px-2 py-1 text-xs",
    md: "px-2.5 py-1.5 text-sm",
    lg: "px-3 py-2 text-base"
  };
  
  return (
    <span
      ref={ref}
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = "Badge";

export default Badge;