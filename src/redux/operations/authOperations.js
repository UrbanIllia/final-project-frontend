import { createAsyncThunk } from "@reduxjs/toolkit";
import { API, clearAuthHeader, setAuthHeader } from "../../axiosConfig/Api";

export const registerUserThunk = createAsyncThunk(
  "registerUser",
  async (credentials, thunkApi) => {
    try {
      const { data } = await API.post("/auth/register", credentials);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const loginUserThunk = createAsyncThunk(
  "loginUser",
  async (credentials, thunkApi) => {
    try {
      const { data } = await API.post("/auth/login", credentials);
      setAuthHeader(data.token);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const logoutUserThunk = createAsyncThunk(
  "logoutUser",
  async (_, thunkAPI) => {
    try {
      await API.post("/auth/logout");
      clearAuthHeader();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const refreshUserThunk = createAsyncThunk(
  "refreshUser",
  async (_, thunkAPI) => {
    try {
      const { data } = await API.post("/auth/refresh");
      setAuthHeader(data.data.accessToken);
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
