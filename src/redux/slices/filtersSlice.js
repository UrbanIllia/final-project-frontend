import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: "",
  ingredient: "",
  search: "",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setIngredient: (state, action) => {
      state.ingredient = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setFilters: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetFilters: () => initialState,
  },
});

export const {
  setCategory,
  setIngredient,
  setSearch,
  setFilters,
  resetFilters,
} = filtersSlice.actions;
export default filtersSlice.reducer;
