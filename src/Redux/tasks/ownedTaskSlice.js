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
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${loadStorage()}`,
        },
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
    for (let [key, value] of editedTask.entries()) {
      console.log(key);

      if (key == "taskId") {
        const response = await axios.put(
          `https://task-manage-app.glitch.me/api/owned-tasks/${value}`,
          editedTask,
          {
            headers: {
              "Content-Type": "multipart/form-data",

              Authorization: `Bearer ${loadStorage()}`,
            },
          }
        );
        console.log(response.data);

        return response.data;
      }
    }
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
  filteredTasks: [],
  searchTerm: '',
  priority:"All Priorities",
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
    filteredTasksSelector : (state) => {
      const { items, searchTerm } = state;
      
      if (searchTerm == "") {
        return 
      }
      state.filteredTasks = [...items].filter((task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    console.log(state.filteredTasks);
    console.log(searchTerm);
    },
    prioritySelector : (state) => {
      const { items, priority,searchTerm } = state;
      
      state.filteredTasks = priority === "All Priorities" ? items : [...items].filter((task) => task.priority === priority);
console.log(state.filteredTasks);

  // Filter by search term
  if (searchTerm) {
    state.filteredTasks = [...state.filteredTasks].filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

    },
    setReduxSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setReduxPriority: (state, action) => {
      console.log(action.payload);
      
      state.priority = action.payload;
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
          (task) => task._id === updatedTask._id
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
// Selector to get filtered tasks based on search term


export default ownedTaskSlice.reducer;
export const { moveTask ,filteredTasksSelector,setReduxSearchTerm,setReduxPriority,prioritySelector} = ownedTaskSlice.actions;
