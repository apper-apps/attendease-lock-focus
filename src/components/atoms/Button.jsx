import React from "react";
import { cn } from "@/utils/cn";

const Button = React.forwardRef(({ 
  children, 
  variant = "primary", 
  size = "md", 
  className, 
  disabled,
  ...props 
}, ref) => {
  const baseClasses = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white focus:ring-primary-500 shadow-lg hover:shadow-xl transform hover:scale-[1.02]",
    secondary: "bg-gradient-to-r from-secondary-600 to-secondary-700 hover:from-secondary-700 hover:to-secondary-800 text-white focus:ring-secondary-500 shadow-lg hover:shadow-xl transform hover:scale-[1.02]",
    accent: "bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white focus:ring-accent-500 shadow-lg hover:shadow-xl transform hover:scale-[1.02]",
    outline: "border-2 border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500 hover:border-primary-700",
    ghost: "text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:ring-gray-500",
    success: "bg-gradient-to-r from-success-600 to-success-700 hover:from-success-700 hover:to-success-800 text-white focus:ring-success-500 shadow-lg hover:shadow-xl transform hover:scale-[1.02]",
    error: "bg-gradient-to-r from-error-600 to-error-700 hover:from-error-700 hover:to-error-800 text-white focus:ring-error-500 shadow-lg hover:shadow-xl transform hover:scale-[1.02]",
    warning: "bg-gradient-to-r from-warning-500 to-warning-600 hover:from-warning-600 hover:to-warning-700 text-white focus:ring-warning-500 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
  };
  
  const sizes = {
    sm: "px-3 py-2 text-sm rounded-md",
    md: "px-4 py-2.5 text-sm rounded-lg",
    lg: "px-6 py-3 text-base rounded-lg",
    xl: "px-8 py-4 text-lg rounded-xl"
  };
  
  return (
    <button
      ref={ref}
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;