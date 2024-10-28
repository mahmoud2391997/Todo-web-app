// src/features/todos/TaskCard.js
import React from "react";
import { useDispatch } from "react-redux";
import { deleteOwnedTask } from "../Redux/tasks/ownedTaskSlice";

const TaskCard = ({ task, edit, setFormType, setTaskToEdit, type }) => {
  const { title, description, priority, image, assignedToEmail, _id } = task;
  console.log(image);
  function getImage(image) {
    if (image) {
      const binaryString = Array.from(image.data.data)
        .map((byte) => String.fromCharCode(byte))
        .join("");
      return window.btoa(binaryString);
    }
  }
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteOwnedTask(id));
  };
  const handleEdit = (id) => {
    edit(true);
    setFormType("edit");
    setTaskToEdit(task);
  };
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
          src={`data:${image.contentType};base64,${getImage(image)}`}
          alt={title}
          className="w-full h-32 object-cover rounded mb-4"
        />
      )}

      {/* Task Title */}
      <h3 className="text-lg font-semibold mb-2">{title}</h3>

      {/* Task Description */}
      <p className="text-sm text-gray-600 mb-4">{description}</p>

      <p className="text-sm mb-2">
        <strong>Assigned To:</strong> {assignedToEmail}
      </p>
      {/* Priority */}
      <span
        className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${priorityColors[priority]}`}
      >
        Priority: {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </span>

      {/* Edit and Delete Buttons */}
      {type == "owned" ? (
        <div className="mt-4 flex justify-between">
          <button
            onClick={() => handleEdit(_id)} // Replace 'id' with your task identifier
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(_id)} // Replace 'id' with your task identifier
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default TaskCard;
