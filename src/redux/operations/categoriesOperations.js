import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../axiosConfig/Api";

export const fetchCategoriesThunk = createAsyncThunk(
  "fetchCategories",
  async (_, thunkAPI) => {
    try {
      const { data } = await API.get("/categories");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
