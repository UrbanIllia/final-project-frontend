import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recipes: [],
  selectedRecipe: null,

  page: 1,
  perPage: 10,
  totalPages: null,

  filters: {
    category: "",
    ingredient: "",
    search: "",
  },

  isLoading: false,
  error: null,
};

const recipesReducer = createSlice({
  name: "recipes",
  initialState,
  reducers: {},
});

export default recipesReducer.reducer;
