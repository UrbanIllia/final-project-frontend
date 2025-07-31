import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { resetFilters } from "../../../redux/slices/filtersSlice.js";

const OwnRecipes = () => {
  const dispatch = useDispatch();

  const [visibleCount, setVisibleCount] = useState(12);

  const ownRecipes = useSelector(selectOwnRecipes);
  const isLoading = useSelector(selectRecipesIsLoading);
  const error = useSelector(selectRecipesError);
  const filters = useSelector((state) => state.filters);

  useEffect(() => {
    dispatch(fetchOwnRecipesThunk({ perPage: 100 }));
    return () => {
      dispatch(resetFilters());
    };
  }, [dispatch]);

  const filteredRecipes = useMemo(() => {
    return ownRecipes.filter((recipe) => {
      const searchMatch = filters.search
        ? recipe.title.toLowerCase().includes(filters.search.toLowerCase())
        : true;
      const categoryMatch = filters.category
        ? recipe.category === filters.category
        : true;
      const ingredientMatch = filters.ingredient
        ? recipe.ingredients.some((ing) => ing.name === filters.ingredient)
        : true;
      return searchMatch && categoryMatch && ingredientMatch;
    });
  }, [ownRecipes, filters]);

  useEffect(() => {
    setVisibleCount(12);
  }, [filteredRecipes]);

  const visibleRecipes = filteredRecipes.slice(0, visibleCount);
  const hasMore = visibleCount < filteredRecipes.length;

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 12);
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

  if (isLoading && ownRecipes.length === 0) return <Loader />;
  if (error) return <p>Error: {toast.error(error)}</p>;
  if (!isLoading && ownRecipes.length === 0) return <NotFoundRecipes />;

  return (
    <div>
      <Filters showTitle={false} totalItems={filteredRecipes.length} />
      {filteredRecipes.length > 0 ? (
        <>
          <RecipesList recipes={visibleRecipes} />
          {hasMore && (
            <LoadMoreBtn loadMore={handleLoadMore} isLoading={isLoading} />
          )}
        </>
      ) : (
        <NoResults onReset={handleResetFilters} />
      )}
    </div>
  );
};

export default OwnRecipes;
