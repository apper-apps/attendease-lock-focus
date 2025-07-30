import React, { useContext } from "react";
import { useSelector } from 'react-redux';
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import RoleBadge from "@/components/molecules/RoleBadge";
import { AuthContext } from "@/App";

const Header = ({ onMenuClick, userRole = "admin" }) => {
  const { logout } = useContext(AuthContext);
  const { user } = useSelector((state) => state.user);
  
  const currentUser = {
    name: user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : user?.Name || "User",
    email: user?.emailAddress || user?.email || "user@school.edu",
    role: user?.role || userRole
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuClick}
            className="lg:hidden -ml-2 mr-2"
          >
            <ApperIcon name="Menu" className="h-5 w-5" />
          </Button>
          <h2 className="text-xl font-semibold text-gray-900">
            Good morning, {currentUser.name}
          </h2>
        </div>

<div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="relative">
            <ApperIcon name="Bell" className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-error-500 rounded-full"></span>
          </Button>
          
          <div className="flex items-center space-x-3">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-gray-900">{currentUser.name}</p>
              <p className="text-xs text-gray-500">{currentUser.email}</p>
            </div>
            <RoleBadge role={currentUser.role} />
            <div className="h-8 w-8 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-white">
                {currentUser.name.charAt(0)}
              </span>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={logout}
              className="text-gray-500 hover:text-gray-700"
            >
              <ApperIcon name="LogOut" className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;