// src/components/NavBar.js
import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md flex justify-between items-center">
      {/* Logo */}
      <div className="text-lg font-semibold">Task Management App</div>

      {/* Nav Links */}
      <div className="flex gap-4">
        <NavLink to="/login" className="hover:text-gray-300">
          Login
        </NavLink>
        <NavLink to="/register" className="hover:text-gray-300">
          Register
        </NavLink>
        <NavLink to="/owned-tasks" className="hover:text-gray-300">
          Owned Tasks
        </NavLink>
        <NavLink to="/assigned-tasks" className="hover:text-gray-300">
          Assigned Tasks
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
