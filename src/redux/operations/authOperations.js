import { createAsyncThunk } from "@reduxjs/toolkit";
import { API, clearAuthHeader, setAuthHeader } from "../../axiosConfig/Api";
import { fetchUserThunk } from "./userOperation";

export const registerUserThunk = createAsyncThunk(
  "registerUser",
  async (credentials, thunkApi) => {
    try {
      const { data } = await API.post("/auth/register", credentials);
      console.log("registerUserThunk response:", JSON.stringify(data, null, 2));
      return { ...data, name: credentials.name };
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
      console.log("loginUserThunk response:", JSON.stringify(data, null, 2));
      setAuthHeader(data.data.accessToken);
      const userResponse = await thunkApi.dispatch(fetchUserThunk()).unwrap();
      return { token: data.data.accessToken, user: userResponse };
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
      console.log("refreshUserThunk response:", JSON.stringify(data, null, 2));
      setAuthHeader(data.data?.accessToken || data.accessToken);
      const userResponse = await thunkApi.dispatch(fetchUserThunk()).unwrap();
      return {
        token: data.data?.accessToken || data.accessToken,
        user: userResponse,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
