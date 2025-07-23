import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRecipesThunk,
  searchRecipesThunk,
} from "../../redux/operations/recipesOperation";

import Filters from "../../components/Filters/Filters";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";
import RecipesList from "../../components/RecipesList/RecipesList";
import Banner from "../../components/Banner/Banner";

import css from "./MainPage.module.css";

const MainPage = () => {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes.recipes);

  useEffect(() => {
    dispatch(fetchRecipesThunk({ page: 1, perPage: 10 }));
  }, [dispatch]);

  const handleSearch = (query) => {
    dispatch(searchRecipesThunk({ search: query }));
  };

  return (
    <div className={css.main}>
      <Banner onSearch={handleSearch} />
      <Filters />
      <RecipesList recipes={recipes} />
      <LoadMoreBtn />
    </div>
  );
};

export default MainPage;
