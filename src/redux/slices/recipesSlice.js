import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  addRecipeThunk,
  fetchOwnRecipesThunk,
  fetchRecipeByIdThunk,
  fetchRecipesThunk,
  fetchRecipesByFiltersThunk,
  loadMoreRecipesThunk,
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
  perPage: 12,
  hasMore: true,
};

const recipesReducer = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    resetRecipes: (state) => {
      state.recipes = [];
      state.page = 1;
      state.hasMore = true;
    },
  },
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
      .addCase(loadMoreRecipesThunk.fulfilled, (state, { payload }) => {
        state.recipes = [...state.recipes, ...payload.data.items];
        state.totalItems = payload.data.totalItems;
        state.page = payload.data.page;
        state.hasMore = state.recipes.length < payload.data.totalItems;
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
          state.hasMore = payload.data.items.length < payload.data.totalItems;
          state.isLoading = false;
          state.error = false;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchRecipesThunk.pending,
          addRecipeThunk.pending,
          fetchRecipeByIdThunk.pending,
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
          fetchOwnRecipesThunk.rejected,
          fetchRecipesByFiltersThunk.rejected
        ),
        (state, { payload }) => {
          state.isLoading = false;
          state.error = payload;
        }
      ),
});

export const { resetRecipes } = recipesReducer.actions;
export default recipesReducer.reducer;
