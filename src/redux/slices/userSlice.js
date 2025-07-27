import { createSlice } from "@reduxjs/toolkit";
import { fetchUserThunk } from "../operations/userOperation";
import {
  registerUserThunk,
  logoutUserThunk,
} from "../operations/authOperations";

const initialState = {
  user: {
    name: "",
    email: "",
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
        state.error = null;
        state.user = {
          ...state.user,
          name: payload.name || "",
          email: payload.email || "",
          favorites: payload.favorites || [],
        };
      })
      .addCase(fetchUserThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(registerUserThunk.fulfilled, (state) => {
        state.user = initialState.user;
      })
      .addCase(logoutUserThunk.fulfilled, (state) => {
        state.user = initialState.user;
      }),
});

export default userReducer.reducer;
