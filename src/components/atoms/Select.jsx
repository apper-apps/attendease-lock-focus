import React from "react";
import { cn } from "@/utils/cn";

const Select = React.forwardRef(({ 
  children, 
  className, 
  error,
  ...props 
}, ref) => {
  return (
    <select
      ref={ref}
      className={cn(
        "w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 focus:outline-none transition-all duration-200",
        error && "border-error-500 focus:border-error-500 focus:ring-error-200",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
});

Select.displayName = "Select";

export default Select;