import { configureStore } from "@reduxjs/toolkit";
import TaskReducer from "../features/TaskListSlice";

export const store = configureStore({
  reducer: {
    task: TaskReducer,
  },
});
