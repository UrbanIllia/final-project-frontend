import { configureStore } from "@reduxjs/toolkit";
import exampleReducer from "./slices/exampleSlice";
import { categoriesReducer } from "./slices/categoriesSlice";

const store = configureStore({
  reducer: {
    example: exampleReducer,
    categories: categoriesReducer,
  },
});

export default store;
