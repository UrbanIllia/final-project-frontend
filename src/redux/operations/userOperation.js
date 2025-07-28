import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../axiosConfig/Api";

export const fetchUserThunk = createAsyncThunk(
  "fetchUser",
  async (_, thunkAPI) => {
    try {
      localStorage.clear();
      const response = await API.get("/users/current");
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchFavoriteRecipesThunk = createAsyncThunk(
  "fetchFavoriteRecipes",
  async (_, thunkAPI) => {
    try {
      const { data } = await API.get("recipes/favorites");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// {action} means ADD or REMOVE = like a toggle
// backend can find it in req.body

export const updateFavoriteRecipesThunk = createAsyncThunk(
  "updateFavoriteRecipes",
  async ({ id, action }, thunkAPI) => {
    try {
      await API.patch("recipes/favorites", { recipeId: id, action });
      const { data } = await API.get("recipes/favorites");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
