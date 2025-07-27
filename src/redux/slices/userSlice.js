import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  fetchFavoriteRecipesThunk,
  fetchUserThunk,
  updateFavoriteRecipesThunk,
} from "../operations/userOperation";

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
      })
      .addMatcher(
        isAnyOf(
          fetchFavoriteRecipesThunk.fulfilled,
          updateFavoriteRecipesThunk.fulfilled
        ),
        (state, { payload }) => {
          state.user.favorites = payload;
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
