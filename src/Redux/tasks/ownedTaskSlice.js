// src/features/tasks/ownedTaskSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import loadStorage from "../../helpers/checkToken";

// Async thunks for CRUD operations

// Fetch owned tasks
export const fetchOwnedTasks = createAsyncThunk(
  "ownedTasks/fetchOwnedTasks",
  async () => {
    const response = await axios.get(
      "https://task-manage-app.glitch.me/api/owned-tasks",
      {
        headers: { Authorization: `Bearer ${loadStorage()}` },
      }
    );
    return response.data;
  }
);

// Create a new owned task
export const createOwnedTask = createAsyncThunk(
  "ownedTasks/createOwnedTask",
  async (task) => {
    console.log(task);
    const response = await axios.post(
      "https://task-manage-app.glitch.me/api/owned-tasks",
      task,
      {
        headers: { Authorization: `Bearer ${loadStorage()}` },
      }
    );
    console.log(response.data);
    return response.data;
  }
);

// Update an owned task
export const updateOwnedTask = createAsyncThunk(
  "ownedTasks/updateOwnedTask",
  async (editedTask) => {
    console.log(editedTask);

    const response = await axios.put(
      `https://task-manage-app.glitch.me/api/owned-tasks/${editedTask.taskId}`,
      editedTask,
      {
        headers: { Authorization: `Bearer ${loadStorage()}` },
      }
    );
    console.log(response.data);

    return response.data;
  }
);
export const changeOwnedTasksState = createAsyncThunk(
  "ownedTasks/changeOwnedTask",
  async (editedTask) => {
    console.log(editedTask);

    const response = await axios.put(
      `https://task-manage-app.glitch.me/api/owned-tasks/${editedTask.taskId}`,
      { state: editedTask.state },
      {
        headers: { Authorization: `Bearer ${loadStorage()}` },
      }
    );
    console.log(response.data);

    return response.data;
  }
);

// Delete an owned task
export const deleteOwnedTask = createAsyncThunk(
  "ownedTasks/deleteOwnedTask",
  async (taskId) => {
    await axios.delete(
      `https://task-manage-app.glitch.me/api/owned-tasks/${taskId}`,
      {
        headers: { Authorization: `Bearer ${loadStorage()}` },
      }
    );
    return taskId; // Return the id of the deleted task
  }
);

// Initial state
const initialState = {
  items: [],
  status: "idle",
  error: null,
};

// Redux slice for owned tasks
const ownedTaskSlice = createSlice({
  name: "ownedTasks",
  initialState,
  reducers: {
    moveTask: (state, action) => {
      const { taskId, newState } = action.payload;
      const task = state.items.find((task) => task._id === taskId);
      if (task) {
        task.state = newState; // Update state locally
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Owned Tasks
      .addCase(fetchOwnedTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOwnedTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchOwnedTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Create Owned Task
      .addCase(createOwnedTask.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      // Update Owned Task
      .addCase(updateOwnedTask.fulfilled, (state, action) => {
        const updatedTask = action.payload;
        const index = state.items.findIndex(
          (task) => task.id === updatedTask.id
        );
        if (index !== -1) {
          state.items[index] = updatedTask;
        }
      })

      // Delete Owned Task
      .addCase(deleteOwnedTask.fulfilled, (state, action) => {
        const taskId = action.payload;
        state.items = state.items.filter((task) => task._id !== taskId);
      });
  },
});

export default ownedTaskSlice.reducer;
export const { moveTask } = ownedTaskSlice.actions;
