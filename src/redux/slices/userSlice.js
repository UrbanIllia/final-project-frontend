import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  fetchFavoriteRecipesThunk,
  fetchUserThunk,
  updateFavoriteRecipesThunk,
} from "../operations/userOperation";
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
  favoriteRecipes: [],
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
        state.favoriteRecipes = [];
      })
      .addMatcher(
        isAnyOf(
          fetchFavoriteRecipesThunk.fulfilled,
          updateFavoriteRecipesThunk.fulfilled
        ),
        (state, { payload }) => {
          state.favoriteRecipes = payload;
          state.isLoading = false;
          state.error = false;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchFavoriteRecipesThunk.pending,
          updateFavoriteRecipesThunk.pending
        ),
        (state) => {
          state.isLoading = true;
          state.error = false;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchFavoriteRecipesThunk.rejected,
          updateFavoriteRecipesThunk.rejected
        ),
        (state, { payload }) => {
          state.isLoading = false;
          state.error = payload;
        }
      ),
});

export default userReducer.reducer;
