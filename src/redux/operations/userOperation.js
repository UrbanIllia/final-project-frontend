import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../axiosConfig/Api";

export const fetchUserThunk = createAsyncThunk(
  "fetchUser",
  async (_, thunkAPI) => {
    try {
      const response = await API.get("/users/current");
      thunkAPI.dispatch(fetchFavoriteRecipesThunk());
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
      const { data } = await API.get("/users/favorites");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateFavoriteRecipesThunk = createAsyncThunk(
  "updateFavoriteRecipes",
  async ({ id, action }, thunkAPI) => {
    try {
      if (action === "ADD") {
        await API.post(`/users/favorites/${id}`);
      } else if (action === "REMOVE") {
        await API.delete(`/users/favorites/${id}`);
      }

      const { data } = await API.get("/users/favorites");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
