import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  addRecipeThunk,
  fetchFavoriteRecipesThunk,
  fetchOwnRecipesThunk,
  fetchRecipeByIdThunk,
  fetchRecipesThunk,
  updateFavoriteRecipesThunk,
  fetchRecipesByFiltersThunk,
} from "../operations/recipesOperation";

const initialState = {
  recipes: [],
  recipeDetails: null,
  favoriteRecipes: [],
  ownRecipes: [],
  isLoading: false,
  error: null,
  totalItems: 0,
  page: 1,
};

const recipesReducer = createSlice({
  name: "recipes",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder

      .addCase(addRecipeThunk.fulfilled, (state, { payload }) => {
        state.recipes.push(payload);
        state.isLoading = false;
        state.error = false;
      })
      .addCase(fetchRecipeByIdThunk.fulfilled, (state, { payload }) => {
        state.recipeDetails = payload;
        state.isLoading = false;
        state.error = false;
      })
      .addCase(fetchOwnRecipesThunk.fulfilled, (state, { payload }) => {
        state.ownRecipes = payload;
        state.isLoading = false;
        state.error = false;
      })

      .addMatcher(
        isAnyOf(
          fetchRecipesThunk.fulfilled,
          fetchRecipesByFiltersThunk.fulfilled
        ),
        (state, { payload }) => {
          state.recipes = payload.data.items;
          state.totalItems = payload.data.totalItems;
          state.page = payload.data.page;
          state.isLoading = false;
          state.error = false;
        }
      )

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
          fetchRecipesThunk.pending,
          addRecipeThunk.pending,
          fetchRecipeByIdThunk.pending,
          fetchFavoriteRecipesThunk.pending,
          updateFavoriteRecipesThunk.pending,
          fetchOwnRecipesThunk.pending,
          fetchRecipesByFiltersThunk.pending
        ),
        (state) => {
          state.isLoading = true;
          state.error = false;
        }
      )
     
      .addMatcher(
        isAnyOf(
          fetchRecipesThunk.rejected,
          addRecipeThunk.rejected,
          fetchRecipeByIdThunk.rejected,
          fetchFavoriteRecipesThunk.rejected,
          updateFavoriteRecipesThunk.rejected,
          fetchOwnRecipesThunk.rejected,
          fetchRecipesByFiltersThunk.rejected
        ),
        (state, { payload }) => {
          state.isLoading = false;
          state.error = payload;
        }
      ),
});

export default recipesReducer.reducer;
