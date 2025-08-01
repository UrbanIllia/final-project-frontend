import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../axiosConfig/Api";

export const fetchRecipesThunk = createAsyncThunk(
  "fetchRecipes",
  async (
    { page = 1, perPage = 12, categories = "", ingredients = "", search = "" },
    thunkAPI
  ) => {
    try {
      const { data } = await API.get("/recipes", {
        params: {
          page,
          perPage,
          categories,
          ingredients,
          search,
        },
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const loadMoreRecipesThunk = createAsyncThunk(
  "loadMoreRecipes",
  async (filters, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const currentPage = state.recipes.page;
      const nextPage = currentPage + 1;
      const { category = "", ingredient = "", search = "" } = filters;
      const { data } = await API.get("/recipes", {
        params: {
          categories: category,
          ingredients: ingredient,
          search,
          page: nextPage,
          perPage: 12,
        },
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addRecipeThunk = createAsyncThunk(
  "createRecipe",
  async (recipe, thunkAPI) => {
    try {
      const { data } = await API.post("/recipes", recipe);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchRecipeByIdThunk = createAsyncThunk(
  "fetchRecipeById",
  async (id, thunkAPI) => {
    try {
      const { data } = await API.get(`/recipes/${id}`);
      return data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return thunkAPI.rejectWithValue({
          status: 404,
          message: "Recipe not found",
        });
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchOwnRecipesThunk = createAsyncThunk(
  "fetchOwnRecipes",
  async (_, thunkAPI) => {
    try {
      const { data } = await API.get("users/own");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchRecipesByFiltersThunk = createAsyncThunk(
  "recipes/fetchByFilters",
  async (
    { category = "", ingredient = "", search = "", page = 1, perPage = 10 },
    thunkAPI
  ) => {
    try {
      const { data } = await API.get("/recipes", {
        params: {
          categories: category,
          ingredients: ingredient,
          search,
          page,
          perPage,
        },
      });

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
