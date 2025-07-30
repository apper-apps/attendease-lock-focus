import React from "react";
import { cn } from "@/utils/cn";

const Input = React.forwardRef(({ 
  type = "text", 
  className, 
  error,
  ...props 
}, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      className={cn(
        "w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 focus:outline-none transition-all duration-200",
        error && "border-error-500 focus:border-error-500 focus:ring-error-200",
        className
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;