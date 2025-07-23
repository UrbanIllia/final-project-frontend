import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../axiosConfig/Api";

export const fetchIngredientsThunk = createAsyncThunk(
  "fetchIngredients",
  async (_, thunkAPI) => {
    try {
      const { data } = await API.get("/ingredients");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
