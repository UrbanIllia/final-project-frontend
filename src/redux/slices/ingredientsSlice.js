// import { createSlice } from "@reduxjs/toolkit";
// import { fetchIngredientsThunk } from "../operations/ingredientsOperations";

// const initialState = {
//   items: [],
//   isLoading: false,
//   error: null,
// };

// const ingredientsReducer = createSlice({
//   name: "ingredients",
//   initialState,
//   extraReducers: (builder) =>
//     builder
//       .addCase(fetchIngredientsThunk.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchIngredientsThunk.fulfilled, (state, { payload }) => {
//         state.isLoading = false;
//         state.error = false;
//         state.items = payload;
//       })
//       .addCase(fetchIngredientsThunk.rejected, (state, { payload }) => {
//         state.isLoading = false;
//         state.error = payload;
//       }),
// });

// export default ingredientsReducer.reducer;
import { createSlice } from "@reduxjs/toolkit";
import { fetchIngredientsThunk } from "../operations/ingredientsOperations";

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const ingredientsReducer = createSlice({
  name: "ingredients",
  initialState,
  extraReducers: (builder) =>
    builder
      .addCase(fetchIngredientsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchIngredientsThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.items = payload;
      })
      .addCase(fetchIngredientsThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      }),
});

export default ingredientsReducer.reducer;
