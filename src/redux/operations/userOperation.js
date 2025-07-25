import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../axiosConfig/Api";

export const fetchUserThunk = createAsyncThunk(
  "fetchUser",
  async (_, thunkAPI) => {
    try {
      const response = await API.get("/users/current");
      console.log("fetchUser response:", response.data);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
