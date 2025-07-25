import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setFilters } from "../../redux/slices/filtersSlice";
import {
  fetchRecipesThunk,
  fetchRecipesByFiltersThunk,
} from "../../redux/operations/recipesOperation";

import Filters from "../../components/Filters/Filters";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";
import RecipesList from "../../components/RecipesList/RecipesList";
import Banner from "../../components/Banner/Banner";
import NoResults from "../../components/Filters/NoResults/NoResults";
import css from "./MainPage.module.css";

const MainPage = () => {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes.recipes);
  const isLoading = useSelector((state) => state.recipes.isLoading);
  const error = useSelector((state) => state.recipes.error);
  const searchQuery = useSelector((state) => state.filters.search || "");
  const totalItems = useSelector((state) => state.recipes.totalItems || 0);

  useEffect(() => {
    dispatch(fetchRecipesThunk({ page: 1, perPage: 10 }));
  }, [dispatch]);

const handleSearch = (query) => {
  dispatch(setFilters({ search: query, page: 1 }));
  dispatch(fetchRecipesByFiltersThunk({ search: query }));
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
      <Filters />

      {totalItems > 0 ? <RecipesList /> : <NoResults />}

      <LoadMoreBtn />
    </div>
  );
};

export default MainPage;
