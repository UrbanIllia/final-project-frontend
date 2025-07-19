import { configureStore } from "@reduxjs/toolkit";
import exampleReducer from "./slices/exampleSlice";
import authReducer from "./slices/authSlice";
import recipesReducer from "./slices/recipesSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    recipes: recipesReducer,
    example: exampleReducer,
  },
});

export default store;
