// src/features/tasks/assignedTaskSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import loadStorage from "../../helpers/checkToken";

// Async thunks for fetching assigned tasks and updating status

// Fetch assigned tasks
export const fetchAssignedTasks = createAsyncThunk(
  "assignedTasks/fetchAssignedTasks",
  async () => {
    const response = await axios.get(
      "https://task-manage-app.glitch.me/api/assigned-tasks",
      {
        headers: { Authorization: `Bearer ${loadStorage()}` },
      }
    );
    console.log(response.data);
    return response.data;
  }
);

// Update the status of an assigned task
export const changeAssignedTasksState = createAsyncThunk(
  "assignedTasks/changeAssignedTask",
  async (editedTask) => {
    console.log(editedTask);

    const response = await axios.put(
      `https://task-manage-app.glitch.me/api/assigned-tasks/${editedTask.taskId}`,
      { state: editedTask.state },
      {
        headers: { Authorization: `Bearer ${loadStorage()}` },
      }
    );
    console.log(response.data);

    return response.data;
  }
);

// Initial state
const initialState = {
  items: [],
  status: "idle",
  error: null,
};

// Redux slice for assigned tasks
const assignedTaskSlice = createSlice({
  name: "assignedTasks",
  initialState,
  reducers: {
    moveAssignedTask: (state, action) => {
      const { taskId, newState } = action.payload;
      const task = state.items.find((task) => task._id === taskId);
      if (task) {
        task.state = newState; // Update state locally
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Assigned Tasks
      .addCase(fetchAssignedTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAssignedTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchAssignedTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default assignedTaskSlice.reducer;
export const { moveAssignedTask } = assignedTaskSlice.actions;
