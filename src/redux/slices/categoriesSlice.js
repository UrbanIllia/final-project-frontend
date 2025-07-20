import { createSlice } from "@reduxjs/toolkit";
import { fetchCategoriesThunk } from "../operations/categoriesOperations";

const initialState = {
  categories: [],
  isLoading: false,
  error: null,
};

const categoriesReducer = createSlice({
  name: "categories",
  initialState,
  extraReducers: (builder) =>
    builder
      .addCase(fetchCategoriesThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCategoriesThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = false;
        state.categories = payload;
      })
      .addCase(fetchCategoriesThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      }),
});

export default categoriesReducer.reducer;
