import React, { useState } from "react";

const TaskFilter = ({ setSearchTerm, setPriority }) => {
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

  return (
    <div className="flex items-center space-x-4 p-4 bg-gray-100 rounded-lg mb-4">
      <input
        type="text"
        onChange={handleSearchChange}
        placeholder="Search tasks..."
        className="p-2 border border-gray-300 rounded-md flex-1"
      />
      <select
        onChange={handlePriorityChange}
        className="p-2 border border-gray-300 rounded-md"
      >
        <option value="">All Priorities</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
    </div>
  );
};

export default TaskFilter;
