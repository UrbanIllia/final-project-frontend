import { configureStore } from "@reduxjs/toolkit";
import exampleReducer from "./slices/exampleSlice";
import authReducer from "./slices/authSlice";
import recipesReducer from "./slices/recipesSlice";
import categoriesReducer from "./slices/categoriesSlice"; 
import ingredientsReducer from "./slices/ingredientsSlice";
import userReducer from "./slices/userSlice";
import filtersReducer from "./slices/filtersSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    recipes: recipesReducer,
    categories: categoriesReducer,
    ingredients: ingredientsReducer,
    filters: filtersReducer,
    user: userReducer,
    example: exampleReducer,
  },
});

export default store;
