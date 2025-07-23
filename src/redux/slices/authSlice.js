import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  loginUserThunk,
  logoutUserThunk,
  refreshUserThunk,
  registerUserThunk,
} from "../operations/authOperations";
import { fetchUserThunk } from "../operations/userOperation";

const initialState = {
  user: {
    _id: null,
    name: null,
    email: null,
    favorites: [],
  },
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
      .addCase(refreshUserThunk.fulfilled, (state, { payload }) => {
        console.log(
          "refreshUserThunk payload:",
          JSON.stringify(payload, null, 2)
        );
        state.user = payload.user || initialState.user;
        state.token = payload.token;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.isLoading = false;
      })
      .addCase(refreshUserThunk.rejected, (state, { payload }) => {
        state.isRefreshing = false;
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(fetchUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserThunk.fulfilled, (state, { payload }) => {
        console.log(
          "fetchUserThunk payload:",
          JSON.stringify(payload, null, 2)
        );
        state.user = payload || initialState.user;
        state.isLoading = false;
        // Устанавливаем isLoggedIn = true, если есть token
        if (state.token) {
          state.isLoggedIn = true;
        }
      })
      .addCase(fetchUserThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addMatcher(
        isAnyOf(registerUserThunk.pending, loginUserThunk.pending),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(registerUserThunk.fulfilled, loginUserThunk.fulfilled),
        (state, { payload }) => {
          console.log(
            "login/register payload:",
            JSON.stringify(payload, null, 2)
          );
          state.user = payload.user || initialState.user;
          state.token = payload.token;
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
