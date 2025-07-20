import { createSlice } from "@reduxjs/toolkit";
import { fetchUserThunk } from "../operations/userOperation";

const initialState = {
  user: {
    name: "",
    email: "",
    password: "",
    favorites: [],
  },
  isLoading: false,
  error: null,
};

const userReducer = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) =>
    builder
      .addCase(fetchUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = false;
        state.user = payload;
      })
      .addCase(fetchUserThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      }),
});

export default userReducer.reducer;
