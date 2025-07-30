import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Sidebar from "@/components/organisms/Sidebar";
import Header from "@/components/organisms/Header";
import Dashboard from "@/components/pages/Dashboard";
import Classes from "@/components/pages/Classes";
import Attendance from "@/components/pages/Attendance";
import Users from "@/components/pages/Users";
import Analytics from "@/components/pages/Analytics";
import Settings from "@/components/pages/Settings";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const userRole = "admin"; // This would come from authentication context

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          userRole={userRole}
        />
        
        <div className="lg:pl-64 flex flex-col flex-1">
          <Header
            onMenuClick={() => setSidebarOpen(true)}
            userRole={userRole}
          />
          
          <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/classes" element={<Classes />} />
              <Route path="/attendance" element={<Attendance />} />
              <Route path="/users" element={<Users />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          className="z-50"
        />
      </div>
    </BrowserRouter>
  );
}

export default App;