// src/features/todos/TaskForm.js
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import {
  createOwnedTask,
  updateOwnedTask,
} from "../Redux/tasks/ownedTaskSlice";

const taskSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  assignedTo: yup
    .string()
    .email("Assigned email must be valid") // Optional email validation
    .nullable(),
  priority: yup
    .string()
    .oneOf(["Low", "Medium", "High"])
    .required("Priority is required"),
  state: yup
    .string()
    .oneOf(["todo", "doing", "done"])
    .required("State is required"),
  image: yup.mixed().nullable(),
});

const TaskForm = ({ closeForm, formType, taskToEdit }) => {
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);

  const [imagePreview, setImagePreview] = useState(null);
  const [titleEdit, setTitleEdit] = useState(
    taskToEdit ? taskToEdit.title : null
  );
  const [descriptionEdit, setDescriptionEdit] = useState(
    taskToEdit ? taskToEdit.description : null
  );
  const [stateEdit, setStateEdit] = useState(
    taskToEdit ? taskToEdit.state : null
  );
  const [priorityEdit, setPriorityEdit] = useState(
    taskToEdit ? taskToEdit.priority : null
  );
  const [assignedToEmailEdit, setAssignedToEmailEdit] = useState(
    taskToEdit ? taskToEdit.assignedToEmail : null
  );
  const [imageEdit, setImageEdit] = useState(
    taskToEdit ? taskToEdit.image : null
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(taskSchema),
  });

  const handleImageChange = (e, formType) => {
    const file = e.target.files[0];
    if (formType == "edit") {
      if (file) {
        setSelectedFile(file);

        setImageEdit(URL.createObjectURL(file));
      }
    } else {
      if (file) {
        setSelectedFile(file);

        setImagePreview(URL.createObjectURL(file));
      }
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();

    // Add the image file to FormData
    formData.append("image", selectedFile);

    // Add task details to FormData
    formData.append("id", Date.now().toString());
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("assignedToEmail", data.assignedTo || null); // Null if empty
    formData.append("priority", data.priority);
    formData.append("state", data.state);

    await dispatch(createOwnedTask(formData));
    reset();
    setImagePreview(null);
    closeForm();
  };
  const handleEdit = (editedTask) => {
    console.log(editedTask);

    const formData = new FormData();

    // Add the image file to FormData
    formData.append("image", selectedFile);

    // Add task details to FormData
    formData.append("taskId", taskToEdit._id);
    formData.append("title", editedTask.title);
    formData.append("description", editedTask.description);
    formData.append("assignedToEmail", editedTask.assignedTo || null); // Null if empty
    formData.append("priority", editedTask.priority);
    formData.append("state", editedTask.state);

    dispatch(updateOwnedTask(formData));
    setImagePreview(null);
    closeForm();
  };
  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      {formType != "edit" ? (
        <h2 className="text-lg font-bold mb-4">Create New Task</h2>
      ) : (
        <h2 className="text-lg font-bold mb-4">Edit Task</h2>
      )}
      <form
        onSubmit={
          formType != "edit"
            ? handleSubmit(onSubmit)
            : (e) => {
                e.preventDefault();
                handleEdit({
                  title: titleEdit,
                  description: descriptionEdit,
                  assignedToEmail: assignedToEmailEdit,
                  priority: priorityEdit,
                  state: stateEdit,
                  image: imageEdit,
                });
              }
        }
      >
        <div className="mb-3">
          <label className="block font-medium">Title</label>
          {formType != "edit" ? (
            <input
              type="text"
              className="border p-2 w-full rounded"
              {...register("title")}
            />
          ) : (
            <input
              type="text"
              className="border p-2 w-full rounded"
              value={titleEdit}
              onChange={(e) => {
                setTitleEdit(e.target.value);
              }}
            />
          )}
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div className="mb-3">
          <label className="block font-medium">Description</label>
          {formType != "edit" ? (
            <textarea
              className="border p-2 w-full rounded"
              rows="3"
              {...register("description")}
            ></textarea>
          ) : (
            <textarea
              className="border p-2 w-full rounded"
              rows="3"
              value={descriptionEdit}
              onChange={(e) => {
                setDescriptionEdit(e.target.value);
              }}
            ></textarea>
          )}
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label className="block font-medium">Assigned To (Email)</label>
          {formType != "edit" ? (
            <input
              type="email"
              className="border p-2 w-full rounded"
              {...register("assignedTo")}
              placeholder="Optional"
            />
          ) : (
            <input
              type="email"
              className="border p-2 w-full rounded"
              value={assignedToEmailEdit}
              onChange={(e) => {
                setAssignedToEmailEdit(e.target.value);
              }}
            />
          )}
          {errors.assignedTo && (
            <p className="text-red-500">{errors.assignedTo.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label className="block font-medium">Priority</label>
          {formType != "edit" ? (
            <select
              className="border p-2 w-full rounded"
              {...register("priority")}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          ) : (
            <select
              className="border p-2 w-full rounded"
              value={priorityEdit}
              onChange={(e) => {
                setPriorityEdit(e.target.value);
              }}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          )}
          {errors.priority && (
            <p className="text-red-500">{errors.priority.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label className="block font-medium">State</label>
          {formType != "edit" ? (
            <select
              className="border p-2 w-full rounded"
              {...register("state")}
            >
              <option value="todo">Todo</option>
              <option value="doing">Doing</option>
              <option value="done">Done</option>
            </select>
          ) : (
            <select
              className="border p-2 w-full rounded"
              value={stateEdit}
              onChange={(e) => {
                setStateEdit(e.target.value);
              }}
            >
              <option value="todo">Todo</option>
              <option value="doing">Doing</option>
              <option value="done">Done</option>
            </select>
          )}
          {errors.state && (
            <p className="text-red-500">{errors.state.message}</p>
          )}
        </div>

        {/* Image Upload */}
        <div className="mb-3">
          <label className="block font-medium">Image (Optional)</label>
          {formType != "edit" ? (
            <input
              type="file"
              accept="image/*"
              className="border p-2 w-full rounded"
              {...register("image")}
              onChange={(e) => {
                handleImageChange(e);
                register("image").onChange(e);
              }}
            />
          ) : (
            <input
              type="file"
              accept="image/*"
              className="border p-2 w-full rounded"
              onChange={(e) => {
                handleImageChange(e, formType);
              }}
            />
          )}
          {errors.image && (
            <p className="text-red-500">{errors.image.message}</p>
          )}
        </div>

        {/* Image Preview */}
        {imagePreview && (
          <div className="mb-3">
            <img
              src={imagePreview}
              alt="Preview"
              className="h-24 w-24 object-cover rounded-md"
            />
          </div>
        )}
        {formType != "edit" ? (
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Task
          </button>
        ) : (
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Edit Task
          </button>
        )}
        <button
          type="button"
          onClick={closeForm}
          className="bg-red-500 text-white py-2 px-4 rounded ml-2"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
