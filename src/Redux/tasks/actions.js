// src/features/todos/actions.js
import {
  ADD_TASK,
  FETCH_TASKS,
  UPDATE_TASK,
  DELETE_TASK,
  CHANGE_TASK_STATE,
  SET_TASK_PRIORITY,
} from "../actionTypes";

export const addTask = (task) => ({
  type: ADD_TASK,
  payload: task,
});

export const fetchTasks = (tasks) => ({
  type: FETCH_TASKS,
  payload: tasks,
});

export const updateTask = (id, updates) => ({
  type: UPDATE_TASK,
  payload: { id, updates },
});

export const deleteTask = (id) => ({
  type: DELETE_TASK,
  payload: id,
});

export const changeTaskState = (id, state) => ({
  type: CHANGE_TASK_STATE,
  payload: { id, state },
});

export const setTaskPriority = (id, priority) => ({
  type: SET_TASK_PRIORITY,
  payload: { id, priority },
});
