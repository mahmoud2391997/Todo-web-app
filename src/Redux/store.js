import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../Redux/todos/todoSlice";

const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});
export default store;
