import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setSearch, resetFilters } from "../../redux/slices/filtersSlice";
import {
  fetchRecipesThunk,
  fetchRecipesByFiltersThunk,
  loadMoreRecipesThunk,
} from "../../redux/operations/recipesOperation";
import { resetRecipes } from "../../redux/slices/recipesSlice";

import Filters from "../../components/Filters/Filters";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";
import RecipesList from "../../components/RecipesList/RecipesList";
import Banner from "../../components/Banner/Banner";
import NoResults from "../../components/Filters/NoResults/NoResults";
import css from "./MainPage.module.css";

export default function MainPage() {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes.recipes);
  const isLoading = useSelector((state) => state.recipes.isLoading);
  const error = useSelector((state) => state.recipes.error);
  const searchQuery = useSelector((state) => state.filters.search || "");
  const totalItems = useSelector((state) => state.recipes.totalItems || 0);
  const hasMore = useSelector((state) => state.recipes.hasMore);

  const [currentFilters, setCurrentFilters] = useState({
    search: "",
    category: "",
    ingredient: "",
  });

  useEffect(() => {
    dispatch(resetRecipes());
    dispatch(fetchRecipesThunk({ page: 1, perPage: 12 }));
  }, [dispatch]);

  const handleSearch = (query) => {
    const newFilters = {
      search: query,
      category: currentFilters.category,
      ingredient: currentFilters.ingredient,
    };
    setCurrentFilters(newFilters);

    dispatch(setSearch(query));
    dispatch(resetRecipes());

    if (query || newFilters.category || newFilters.ingredient) {
      dispatch(
        fetchRecipesByFiltersThunk({
          search: query,
          category: newFilters.category,
          ingredient: newFilters.ingredient,
          page: 1,
          perPage: 12,
        })
      );
    } else {
      dispatch(fetchRecipesThunk({ page: 1, perPage: 12 }));
    }
  };

  const handleFiltersChange = (filters) => {
    const newFilters = {
      ...filters,
      search: searchQuery,
    };
    setCurrentFilters(newFilters);
  };

  const handleLoadMore = () => {
    if (!isLoading && hasMore) {
      if (
        currentFilters.search ||
        currentFilters.category ||
        currentFilters.ingredient
      ) {
        dispatch(
          loadMoreRecipesThunk({
            search: currentFilters.search,
            category: currentFilters.category,
            ingredient: currentFilters.ingredient,
          })
        );
      } else {
        dispatch(loadMoreRecipesThunk({}));
      }
    }
  };

  const handleResetFiltersAndScroll = () => {
    dispatch(resetRecipes());
    dispatch(resetFilters());
    dispatch(setSearch(""));

    dispatch(fetchRecipesThunk({ page: 1, perPage: 12 }));

    setCurrentFilters({
      search: "",
      category: "",
      ingredient: "",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (!isLoading && error) {
      toast.error(`Error loading recipes: ${error}`);
    }
  }, [isLoading, error]);

  useEffect(() => {
    if (!isLoading && searchQuery && recipes.length === 0 && !error) {
      toast.info(`No recipes found for "${searchQuery}"`);
    }
  }, [recipes, isLoading, error, searchQuery]);

  return (
    <div className={css.main}>
      <Banner onSearch={handleSearch} />
      <Filters onFiltersChange={handleFiltersChange} />

      {totalItems > 0 ? (
        <RecipesList />
      ) : (
        <NoResults onReset={handleResetFiltersAndScroll} />
      )}

      <LoadMoreBtn loadMore={handleLoadMore} />
    </div>
  );
}
