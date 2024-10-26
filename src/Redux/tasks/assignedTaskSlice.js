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
    return response.data;
  }
);

// Update the status of an assigned task
export const updateAssignedTaskStatus = createAsyncThunk(
  "assignedTasks/updateAssignedTaskStatus",
  async ({ taskId, updatedStatus }) => {
    const response = await axios.put(
      `https://task-manage-app.glitch.me/api/assigned-tasks/${taskId}`,
      { status: updatedStatus },
      {
        headers: { Authorization: `Bearer ${loadStorage()}` },
      }
    );
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
  reducers: {},
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
      })

      // Update Assigned Task Status
      .addCase(updateAssignedTaskStatus.fulfilled, (state, action) => {
        const updatedTask = action.payload;
        const index = state.items.findIndex(
          (task) => task.id === updatedTask.id
        );
        if (index !== -1) {
          state.items[index] = updatedTask;
        }
      });
  },
});

export default assignedTaskSlice.reducer;
