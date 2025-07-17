import { createSlice } from "@reduxjs/toolkit";

const exampleReducer = createSlice({
  name: "recipe",
  initialState: { recipes: [] },
  reducers: {},
});

export default exampleReducer.reducer;
