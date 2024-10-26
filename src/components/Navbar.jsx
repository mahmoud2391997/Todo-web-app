// src/components/NavBar.js
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    location.reload();

    navigate("/login", { replace: true });
  };

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md flex justify-between items-center">
      {/* Logo */}
      <div className="text-lg font-semibold">Task Management App</div>

      {/* Nav Links */}
      <div className="flex gap-4">
        <NavLink to="/owned-tasks" className="hover:text-gray-300">
          Owned Tasks
        </NavLink>
        <NavLink to="/assigned-tasks" className="hover:text-gray-300">
          Assigned Tasks
        </NavLink>
        <NavLink
          to="/login"
          className="hover:text-gray-300"
          onClick={() => {
            handleLogout();
          }}
        >
          Log Out
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
