import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  loginUserThunk,
  logoutUserThunk,
  refreshUserThunk,
  registerUserThunk,
} from "../operations/authOperations";

const initialState = {
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  isLoading: false,
  error: null,
};

const authReducer = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) =>
    builder
      .addCase(logoutUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutUserThunk.fulfilled, () => {
        return initialState;
      })
      .addCase(logoutUserThunk.rejected, (state, { payload }) => {
        state.error = payload;
        return initialState;
      })
      .addCase(refreshUserThunk.pending, (state) => {
        state.isRefreshing = true;
        state.isLoading = true;
      })
      .addCase(refreshUserThunk.fulfilled, (state) => {
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.isLoading = false;
      })
      .addCase(refreshUserThunk.rejected, (state, { payload }) => {
        state.isRefreshing = false;
        state.isLoading = false;
        state.error = payload;
      })
      .addMatcher(
        isAnyOf(registerUserThunk.pending, loginUserThunk.pending),
        (state) => {
          state.isLoading = true;
          state.isLoggedIn = false;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(registerUserThunk.fulfilled, loginUserThunk.fulfilled),
        (state, { payload }) => {
          state.token = payload.accessToken;
          state.isLoading = false;
          state.isLoggedIn = true;
        }
      )
      .addMatcher(
        isAnyOf(registerUserThunk.rejected, loginUserThunk.rejected),
        (state, { payload }) => {
          state.isLoading = false;
          state.isLoggedIn = false;
          state.error = payload;
        }
      ),
});

export default authReducer.reducer;
