// src/features/todos/TaskForm.js
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { addTask } from "../Redux/todos/actions";

const taskSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  priority: yup
    .string()
    .oneOf(["low", "medium", "high"])
    .required("Priority is required"),
  state: yup
    .string()
    .oneOf(["todo", "doing", "done"])
    .required("State is required"),
  image: yup
    .mixed()
    .test(
      "fileSize",
      "File Size is too large",
      (value) => value && value[0] && value[0].size <= 1024 * 1024
    ) // 1MB
    .test(
      "fileType",
      "Unsupported File Format",
      (value) =>
        value &&
        value[0] &&
        ["image/jpeg", "image/png", "image/gif"].includes(value[0].type)
    ),
});

const TaskForm = ({ closeForm }) => {
  const dispatch = useDispatch();
  const [imagePreview, setImagePreview] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(taskSchema),
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = (data) => {
    const taskData = {
      id: Date.now().toString(),
      title: data.title,
      description: data.description,
      priority: data.priority,
      state: data.state,
      image: imagePreview,
    };

    dispatch(addTask(taskData));
    reset();
    setImagePreview(null);
    closeForm();
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-lg font-bold mb-4">Create New Task</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="block font-medium">Title</label>
          <input
            type="text"
            className="border p-2 w-full rounded"
            {...register("title")}
          />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div className="mb-3">
          <label className="block font-medium">Description</label>
          <textarea
            className="border p-2 w-full rounded"
            rows="3"
            {...register("description")}
          ></textarea>
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
        </div>

        <div className="mb-3">
          <label className="block font-medium">Priority</label>
          <select
            className="border p-2 w-full rounded"
            {...register("priority")}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          {errors.priority && (
            <p className="text-red-500">{errors.priority.message}</p>
          )}
        </div>

        <div className="mb-3">
          <label className="block font-medium">State</label>
          <select className="border p-2 w-full rounded" {...register("state")}>
            <option value="todo">Todo</option>
            <option value="doing">Doing</option>
            <option value="done">Done</option>
          </select>
          {errors.state && (
            <p className="text-red-500">{errors.state.message}</p>
          )}
        </div>

        {/* Image Upload */}
        <div className="mb-3">
          <label className="block font-medium">Image</label>
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

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Task
        </button>
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
