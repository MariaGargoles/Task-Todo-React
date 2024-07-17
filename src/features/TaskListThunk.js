import { createAsyncThunk } from "@reduxjs/toolkit";
import data from "../data/tasks.json";

const TaskThunkPromise = (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 200);
  });
};

export const TaskThunk = createAsyncThunk("task/GetTask", async () => {
  const task = await TaskThunkPromise(data);
  return task;
});
