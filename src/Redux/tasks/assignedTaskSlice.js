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
  filteredTasks: [],
  searchTerm: '',
  priority:"All Priorities",
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
    },// Selector for filtering tasks based on search term only
    searchFilteredTasksSelector: (state) => {
      const { items, searchTerm } = state;
    
      // Return all items if search query is empty
      if (!searchTerm) return ;
    
      // Filter items by search query
      state.filteredTasks =   [...items].filter((task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    },
    
    // Selector for filtering tasks based on priority and optionally by search query
    priorityFilteredTasksSelector: (state) => {
      const { items, priority, searchTerm } = state;
    
      console.log(priority);
      // Filter by selected priority
      state.filteredTasks = priority === "All Priorities" ? items : [...items].filter((task) => task.priority === priority);
    console.log(state.filteredTasks );
    
      // Further filter by search query if provided
      if (searchTerm) {
        state.filteredTasks = [...state.filteredTasks].filter((task) =>
          task.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
    
    },
    
    // Action to set search query
    setSearchQuery: (state, action) => {
      state.searchTerm = action.payload;
      console.log(state.searchTerm);
      
    },
    
    // Action to set selected priority
    setSelectedPriority: (state, action) => {
      state.priority = action.payload;
      console.log( state.priority);
      
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
export const { moveAssignedTask,searchFilteredTasksSelector, priorityFilteredTasksSelector,setSearchQuery,setSelectedPriority} = assignedTaskSlice.actions;
