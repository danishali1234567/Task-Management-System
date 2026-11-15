
import React from "react";
import { Menu, Bell, CalendarDays } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar({ toggleSidebar }) {
  const location = useLocation();
  const { user } = useAuth();

  const pageNames = {
    "/": "Dashboard",
    "/tasks": "My Tasks",
    "/projects": "Projects",
    "/analytics": "Analytics",
    "/profile": "Profile"
  };

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="mobile-menu" onClick={toggleSidebar}>
          <Menu />
        </button>

        <div className="breadcrumb">
          Workspace <span>/</span>
          {pageNames[location.pathname] || "Dashboard"}
        </div>
      </div>

      <div className="topbar-right">
        <span className="today-date">
          <CalendarDays size={16} />
          {new Date().toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric"
          })}
        </span>

        <button className="icon-btn" title="Notifications">
          <Bell size={19} />
        </button>

        <div className="top-avatar">
          {user?.name?.charAt(0).toUpperCase()}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
