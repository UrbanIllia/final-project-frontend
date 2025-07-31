import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetFilters } from "../redux/slices/filtersSlice";

export const useFilteredRecipes = (
  fetchThunk,
  dataSelector,
  loadingSelector,
  errorSelector
) => {
  const dispatch = useDispatch();

  const allRecipes = useSelector(dataSelector);
  const isLoading = useSelector(loadingSelector);
  const error = useSelector(errorSelector);
  const filters = useSelector((state) => state.filters);

  const [visibleCount, setVisibleCount] = useState(12);

  useEffect(() => {
    dispatch(fetchThunk());
    return () => {
      dispatch(resetFilters());
    };
  }, [dispatch, fetchThunk]);

  const filteredRecipes = useMemo(() => {
    if (!allRecipes) return [];
    return allRecipes.filter((recipe) => {
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
  }, [allRecipes, filters]);

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

  return {
    isLoading,
    error,
    filteredRecipes,
    visibleRecipes,
    hasMore,
    loadMore,
    handleResetFilters,
  };
};
