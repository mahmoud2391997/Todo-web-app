// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import ownedTaskReducer from "./tasks/ownedTaskSlice";
import assignedTaskReducer from "./tasks/assignedTaskSlice";

export const store = configureStore({
  reducer: {
    ownedTasks: ownedTaskReducer,
    assignedTasks: assignedTaskReducer,
  },
});
