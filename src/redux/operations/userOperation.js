import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../axiosConfig/Api";

export const fetchUserThunk = createAsyncThunk(
  "fetchUser",
  async (_, thunkApi) => {
    try {
      const { data } = await API.get("/users/current");
      console.log("fetchUserThunk response:", JSON.stringify(data, null, 2));
      const userData = data.data || data.user || data;
      return {
        _id: userData._id,
        name: userData.name || userData.username || "User",
        email: userData.email,
        favorites: userData.favorites || [],
      };
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
