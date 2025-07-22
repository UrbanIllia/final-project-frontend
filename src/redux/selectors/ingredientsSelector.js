export const selectIngredientsIsLoading = (state) =>
  state.ingredients.isLoading;
export const selectIngredientsError = (state) => state.ingredients.error;
export const selectIngredients = (state) => state.ingredients.ingredients;
