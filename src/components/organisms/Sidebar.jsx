import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const Sidebar = ({ isOpen, onClose, userRole = "admin" }) => {
  const location = useLocation();

  const getMenuItems = () => {
    const commonItems = [
      { name: "Dashboard", path: "/", icon: "LayoutDashboard" },
      { name: "Classes", path: "/classes", icon: "School" },
      { name: "Attendance", path: "/attendance", icon: "Calendar" },
    ];

    const roleSpecificItems = {
      admin: [
        { name: "Users", path: "/users", icon: "Users" },
        { name: "Analytics", path: "/analytics", icon: "BarChart3" },
        { name: "Settings", path: "/settings", icon: "Settings" },
      ],
      teacher: [
        { name: "My Classes", path: "/my-classes", icon: "BookOpen" },
        { name: "Reports", path: "/reports", icon: "FileText" },
      ],
      parent: [
        { name: "My Children", path: "/children", icon: "Heart" },
        { name: "Notifications", path: "/notifications", icon: "Bell" },
      ],
      student: [
        { name: "My Attendance", path: "/my-attendance", icon: "Calendar" },
        { name: "Schedule", path: "/schedule", icon: "Clock" },
      ]
    };

    return [...commonItems, ...(roleSpecificItems[userRole] || [])];
  };

  const menuItems = getMenuItems();

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col flex-grow bg-white border-r border-gray-200 pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-6 mb-8">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg">
                  <ApperIcon name="GraduationCap" className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-primary-700 to-secondary-600 bg-clip-text text-transparent">
                    AttendEase
                  </h1>
                  <p className="text-xs text-gray-500">Smart Attendance</p>
                </div>
              </div>
            </div>
            <nav className="flex-1 px-4 space-y-2">
              {menuItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      "group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200",
                      isActive
                        ? "bg-gradient-to-r from-primary-50 to-primary-100 text-primary-700 border border-primary-200"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    )
                  }
                >
                  <ApperIcon
                    name={item.icon}
                    className={cn(
                      "mr-3 h-5 w-5 transition-colors duration-200",
                      location.pathname === item.path ? "text-primary-600" : "text-gray-400 group-hover:text-gray-600"
                    )}
                  />
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white transform transition-transform duration-300 ease-in-out lg:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg">
                <ApperIcon name="GraduationCap" className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary-700 to-secondary-600 bg-clip-text text-transparent">
                  AttendEase
                </h1>
                <p className="text-xs text-gray-500">Smart Attendance</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <ApperIcon name="X" className="h-5 w-5 text-gray-500" />
            </button>
          </div>
          <nav className="flex-1 px-4 py-6 space-y-2">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  cn(
                    "group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200",
                    isActive
                      ? "bg-gradient-to-r from-primary-50 to-primary-100 text-primary-700 border border-primary-200"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )
                }
              >
                <ApperIcon
                  name={item.icon}
                  className={cn(
                    "mr-3 h-5 w-5 transition-colors duration-200",
                    location.pathname === item.path ? "text-primary-600" : "text-gray-400 group-hover:text-gray-600"
                  )}
                />
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;