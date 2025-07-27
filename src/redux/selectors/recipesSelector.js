export const selectRecipesIsLoading = (state) => state.recipes.isLoading;
export const selectRecipesError = (state) => state.recipes.error;
export const selectRecipes = (state) => state.recipes.recipes;
export const selectRecipeDetails = (state) => state.recipes.recipeDetails;
export const selectFilters = (state) => state.recipes.filters;
export const selectOwnRecipes = (state) => state.recipes.ownRecipes;
export const selectTotalItems = (state) => state.recipes.totlalItems;
export const selectPage = (state) => state.recipes.page;
