import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import RecipesList from "../../RecipesList/RecipesList.jsx";
import Loading from "../../Loading/Loading.jsx";
import LoadMoreBtn from "../../LoadMoreBtn/LoadMoreBtn.jsx";
import Filters from "../../Filters/Filters.jsx";
import NoResults from "../../Filters/NoResults/NoResults.jsx";

import { fetchFavoriteRecipesThunk } from "../../../redux/operations/userOperation.js";
import {
  selectFavoriteRecipes,
  selectUser,
  selectUserError,
  selectUserIsLoading,
} from "../../../redux/selectors/userSelector.js";
import { resetFilters } from "../../../redux/slices/filtersSlice.js";

const SavedRecipes = () => {
  const dispatch = useDispatch();
  const favoriteRecipes = useSelector(selectFavoriteRecipes);
  const loading = useSelector(selectUserIsLoading);
  const error = useSelector(selectUserError);
  const user = useSelector(selectUser);
  const filters = useSelector((state) => state.filters);
  const [visibleCount, setVisibleCount] = useState(12);

  useEffect(() => {
    if (user?.token) {
      dispatch(fetchFavoriteRecipesThunk());
    }
    return () => {
      dispatch(resetFilters());
    };
  }, [dispatch, user?.token]);

  const filteredRecipes = useMemo(() => {
    return favoriteRecipes.filter((recipe) => {
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
  }, [favoriteRecipes, filters]);

  useEffect(() => {
    setVisibleCount(12);
  }, [filteredRecipes]);

  const visibleRecipes = filteredRecipes.slice(0, visibleCount);
  const hasMore = visibleCount < filteredRecipes.length;

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 12);
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

  if (loading && favoriteRecipes.length === 0) return <Loading />;
  if (error) return <p>Error: {toast.error(error)}</p>;

  return (
    <div>
      <Filters showTitle={false} totalItems={filteredRecipes.length} />

      {filteredRecipes.length > 0 ? (
        <RecipesList recipes={visibleRecipes} type="favorites" />
      ) : (
        <NoResults onReset={handleResetFilters} />
      )}

      {hasMore && <LoadMoreBtn loadMore={loadMore} isLoading={loading} />}
    </div>
  );
};

export default SavedRecipes;
