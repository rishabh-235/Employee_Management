import React from "react";
import "./style/sidebar.css";
import { Link, NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar-container">
      <p>
        Canova <span>CEM</span>
      </p>

      <div className="sidebar-list-1">
        <NavLink
          to="dashboard"
          className={({ isActive }) =>
            isActive ? "side-bar-link active-link" : "side-bar-link"
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="leads"
          className={({ isActive }) =>
            isActive ? "side-bar-link active-link" : "side-bar-link"
          }
        >
          Leads
        </NavLink>
        <NavLink
          to="employees"
          className={({ isActive }) =>
            isActive ? "side-bar-link active-link" : "side-bar-link"
          }
        >
          Employees
        </NavLink>
        <NavLink
          to="settings"
          className={({ isActive }) =>
            isActive ? "side-bar-link active-link" : "side-bar-link"
          }
        >
          Setings
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
