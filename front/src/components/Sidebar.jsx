
import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  CheckSquare,
  FolderKanban,
  ChartNoAxesCombined,
  UserRound,
  LogOut,
  X
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

function Sidebar({ open, close }) {
  const { user, logout } = useAuth();

  const links = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "My Tasks", path: "/tasks", icon: CheckSquare },
    { name: "Projects", path: "/projects", icon: FolderKanban },
    { name: "Analytics", path: "/analytics", icon: ChartNoAxesCombined },
    { name: "Profile", path: "/profile", icon: UserRound }
  ];

  return (
    <>
      {open && (
        <div className="sidebar-overlay" onClick={close}></div>
      )}

      <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
        <div className="sidebar-logo">
          <span className="brand-icon">T</span>
          <span>TaskFlow</span>

          <button className="close-sidebar" onClick={close}>
            <X />
          </button>
        </div>

        <p className="menu-label">WORKSPACE</p>

        <nav className="side-nav">
          {links.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                onClick={close}
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
              >
                <Icon size={19} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <div className="upgrade-card">
            <div className="upgrade-icon">✦</div>
            <strong>Stay Productive!</strong>
            <p>Keep your tasks organized and achieve your goals.</p>
          </div>

          <div className="sidebar-user">
            <div className="avatar">
              {user?.name?.charAt(0).toUpperCase()}
            </div>

            <div className="user-info">
              <strong>{user?.name}</strong>
              <span>Personal Workspace</span>
            </div>

            <button onClick={logout} title="Logout">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
