// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
// import OwnedTasks from "./pages/OwnedTasks";
// import AssignedTasks from "./pages/AssignedTasks";
import KanbanBoard from "./pages/KanbanBoard";

const App = () => {
  return (
    <Router>
      <NavBar />
      <div className="p-4">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/owned-tasks" element={<KanbanBoard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
