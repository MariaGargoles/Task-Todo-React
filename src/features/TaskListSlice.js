import { createSlice } from "@reduxjs/toolkit";

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
      state.data.filter((data) => (data.id = action.payload));
    },
  },
});
