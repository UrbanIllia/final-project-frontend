import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import RecipesList from "../../RecipesList/RecipesList.jsx";
import LoadMoreBtn from "../../LoadMoreBtn/LoadMoreBtn";
import Loader from "../../Loading/Loading.jsx";
import NotFoundRecipes from "../../NotFoundRecipes/NotFoundRecipes.jsx";
import Filters from "../../Filters/Filters.jsx";
import NoResults from "../../Filters/NoResults/NoResults.jsx";

import { fetchOwnRecipesThunk } from "../../../redux/operations/recipesOperation.js";
import {
  selectOwnRecipes,
  selectRecipesError,
  selectRecipesIsLoading,
} from "../../../redux/selectors/recipesSelector.js";
import { useFilteredRecipes } from "../../../hooks/useFilteredRecipes.js";

const OwnRecipes = () => {
  const {
    isLoading,
    error,
    filteredRecipes,
    visibleRecipes,
    hasMore,
    loadMore,
    handleResetFilters,
  } = useFilteredRecipes(
    fetchOwnRecipesThunk,
    selectOwnRecipes,
    selectRecipesIsLoading,
    selectRecipesError
  );

  const filters = useSelector((state) => state.filters);
  const hasActiveFilters =
    filters.search || filters.category || filters.ingredient;

  useEffect(() => {
    if (error) {
      toast.error(`Error: ${error}`);
    }
  }, [error]);

  if (isLoading && filteredRecipes.length === 0) return <Loader />;

  if (filteredRecipes.length === 0 && !hasActiveFilters) {
    return <NotFoundRecipes />;
  }

  return (
    <div>
      <Filters showTitle={false} totalItems={filteredRecipes.length} />
      {filteredRecipes.length > 0 ? (
        <>
          <RecipesList recipes={visibleRecipes} />
          {hasMore && <LoadMoreBtn loadMore={loadMore} isLoading={isLoading} />}
        </>
      ) : (
        <NoResults onReset={handleResetFilters} />
      )}
    </div>
  );
};

export default OwnRecipes;
