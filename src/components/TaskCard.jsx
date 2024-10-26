// src/features/todos/TaskCard.js
import React from "react";

const TaskCard = ({ task }) => {
  const { title, description, priority, image, assignedTo } = task;

  // Priority color based on the task's priority
  const priorityColors = {
    low: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-red-100 text-red-800",
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      {/* Task Image */}
      {image && (
        <img
          src={image}
          alt={title}
          className="w-full h-32 object-cover rounded mb-4"
        />
      )}

      {/* Task Title */}
      <h3 className="text-lg font-semibold mb-2">{title}</h3>

      {/* Task Description */}
      <p className="text-sm text-gray-600 mb-4">{description}</p>

      <p className="text-sm mb-2">
        <strong>Assigned To:</strong> {assignedTo}
      </p>
      {/* Priority */}
      <span
        className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${priorityColors[priority]}`}
      >
        Priority: {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </span>
    </div>
  );
};

export default TaskCard;
