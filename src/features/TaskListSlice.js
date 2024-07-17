import { createSlice } from "@reduxjs/toolkit";
import { TaskThunk } from "./TaskListThunk";

export const TaskSlice = createSlice({
  name: "task",
  initialState: {
    status: "idle",
    data: [],
    error: null,
  },
  reducers: {
    addTask: (state, action) => {
      state.data.push(action.payload);
      console.log("Añadido con éxito");
    },
    deleteTask: (state, action) => {
      state.data = state.data.filter((data) => data.id !== action.payload); // Corregido para eliminar la tarea correcta
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(TaskThunk.pending, (state) => {
        state.status = "pending";
      })
      .addCase(TaskThunk.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.data = action.payload;
      })
      .addCase(TaskThunk.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      });
  },
});

export const { addTask, deleteTask } = TaskSlice.actions;
export default TaskSlice.reducer;
