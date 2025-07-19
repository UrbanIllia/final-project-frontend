import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  authAPI,
  clearAuthHeader,
  setAuthHeader,
} from "../../axiosConfig/authApi";

export const registerUserThunk = createAsyncThunk(
  "registerUser",
  async (credentials, thunkApi) => {
    try {
      const { data } = await authAPI.post("/api/auth/register", credentials);
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
      const { data } = await authAPI.post("api/auth/login", credentials);
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
      await authAPI.post("/api/auth/logout");
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
      const { data } = await authAPI.post("/api/auth/refresh");
      setAuthHeader(data.data.accessToken);
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
