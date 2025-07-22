import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  addRecipeThunk,
  fetchFavoriteRecipesThunk,
  fetchOwnRecipesThunk,
  fetchRecipeByIdThunk,
  fetchRecipesThunk,
  updateFavoriteRecipesThunk,
  searchRecipesThunk,
} from "../operations/recipesOperation";

const initialState = {
  recipes: [],
  recipeDetails: null,
  favoriteRecipes: [],
  ownRecipes: [],

  filters: {
    category: "",
    ingredient: "",
    search: "",
  },

  isLoading: false,
  error: null,
};

const recipesReducer = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    filterRecipes: (state, { payload }) => {
      state.filters = payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchRecipesThunk.fulfilled, (state, { payload }) => {
        state.recipes = payload.data.items;
        state.totalItems = payload.data.totalItems;
        state.page = payload.data.page;
        state.isLoading = false;
        state.error = false;
      })

      .addCase(searchRecipesThunk.fulfilled, (state, { payload }) => {
        state.recipes = payload.data.items;
        state.totalItems = payload.data.totalItems;
        state.page = payload.data.page;
        state.isLoading = false;
        state.error = false;
      })
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
          searchRecipesThunk.pending,
          addRecipeThunk.pending,
          fetchRecipeByIdThunk.pending,
          fetchFavoriteRecipesThunk.pending,
          updateFavoriteRecipesThunk.pending,
          fetchOwnRecipesThunk.pending
        ),
        (state) => {
          state.isLoading = true;
          state.error = false;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchRecipesThunk.rejected,
          searchRecipesThunk.rejected,
          addRecipeThunk.rejected,
          fetchRecipeByIdThunk.rejected,
          fetchFavoriteRecipesThunk.rejected,
          updateFavoriteRecipesThunk.rejected,
          fetchOwnRecipesThunk.rejected
        ),
        (state, { payload }) => {
          state.isLoading = false;
          state.error = payload;
        }
      ),
});

export default recipesReducer.reducer;
