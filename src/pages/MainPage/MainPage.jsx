import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
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
import { setSearch, resetFilters } from "../../redux/slices/filtersSlice";

export default function MainPage() {
  const dispatch = useDispatch();

  const filters = useSelector((state) => state.filters);
  const recipes = useSelector((state) => state.recipes.recipes);
  const isLoading = useSelector((state) => state.recipes.isLoading);
  const error = useSelector((state) => state.recipes.error);
  const totalItems = useSelector((state) => state.recipes.totalItems || 0);
  const hasMore = useSelector((state) => state.recipes.hasMore);

  useEffect(() => {
    dispatch(resetRecipes());

    const { search, category, ingredient } = filters;

    if (search || category || ingredient) {
      dispatch(
        fetchRecipesByFiltersThunk({ ...filters, page: 1, perPage: 12 })
      );
    } else {
      dispatch(fetchRecipesThunk({ page: 1, perPage: 12 }));
    }
  }, [filters, dispatch]);

  const handleSearch = (query) => {
    dispatch(setSearch(query));
  };

  const handleResetFiltersAndScroll = () => {
    dispatch(resetRecipes());
    dispatch(resetFilters());
    dispatch(setSearch(""));

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLoadMore = () => {
    if (!isLoading && hasMore) {
      dispatch(loadMoreRecipesThunk({ ...filters }));
    }
  };

  useEffect(() => {
    if (!isLoading && error) {
      toast.error(`Error loading recipes: ${error}`);
    }
  }, [isLoading, error]);

  useEffect(() => {
    if (!isLoading && filters.search && recipes.length === 0 && !error) {
      toast.info(`No recipes found for "${filters.search}"`);
    }
  }, [recipes, isLoading, error, filters.search]);

  return (
    <div className={css.main}>
      <Banner onSearch={handleSearch} />
      <Filters />

      {totalItems > 0 ? (
        <RecipesList />
      ) : (
        <NoResults onReset={handleResetFiltersAndScroll} />
      )}

      <LoadMoreBtn loadMore={handleLoadMore} />
    </div>
  );
}
