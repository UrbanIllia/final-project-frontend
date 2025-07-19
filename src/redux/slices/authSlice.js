import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  loginUserThunk,
  logoutUserThunk,
  refreshUserThunk,
  registerUserThunk,
} from "../operations/authOperations";

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
  name: "user",
  initialState,
  selectors: {
    selectIsLoggedIn: (state) => state.isLoggedIn,
    selectIsRefreshing: (state) => state.isRefreshing,
    selectIsLoading: (state) => state.isLoading,
    selectToken: (state) => state.token,
  },
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
        state.isLoading = false;
        state.isLoggedIn = true;
        state.error = payload;
        toast.error(payload);
      })
      .addCase(refreshUserThunk.pending, (state) => {
        state.isRefreshing = true;
        state.isLoading = true;
      })
      .addCase(refreshUserThunk.fulfilled, (state, { payload }) => {
        state.user.name = payload.name;
        state.user.email = payload.email;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.isLoading = false;
      })
      .addCase(refreshUserThunk.rejected, (state) => {
        state.isRefreshing = false;
        state.isLoading = false;
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
          state.user.name = payload.user.name;
          state.user.email = payload.user.email;
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
          toast.error(payload);
        }
      ),
});

export default authReducer.reducer;
export const {
  selectIsLoggedIn,
  selectIsRefreshing,
  selectIsLoading,
  selectToken,
} = authReducer.selectors;
