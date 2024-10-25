// src/features/todos/todoReducer.js
import {
  ADD_TASK,
  FETCH_TASKS,
  UPDATE_TASK,
  DELETE_TASK,
  CHANGE_TASK_STATE,
  SET_TASK_PRIORITY,
} from "../actionTypes";

const initialState = {
  todos: [],
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case FETCH_TASKS:
      return {
        ...state,
        todos: action.payload,
      };

    case UPDATE_TASK:
      return {
        ...state,
        todos: state.todos.map((task) =>
          task.id === action.payload.id
            ? { ...task, ...action.payload.updates }
            : task
        ),
      };

    case DELETE_TASK:
      return {
        ...state,
        todos: state.todos.filter((task) => task.id !== action.payload),
      };

    case CHANGE_TASK_STATE:
      return {
        ...state,
        todos: state.todos.map((task) =>
          task.id === action.payload.id
            ? { ...task, state: action.payload.state }
            : task
        ),
      };

    case SET_TASK_PRIORITY:
      return {
        ...state,
        todos: state.todos.map((task) =>
          task.id === action.payload.id
            ? { ...task, priority: action.payload.priority }
            : task
        ),
      };

    default:
      return state;
  }
};

export default todoReducer;
