import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipesThunk } from "../../redux/operations/recipesOperation";
import {
  selectRecipes,
  selectHasMore,
} from "../../redux/selectors/recipesSelector";
import RecipesList from "../../components/RecipesList/RecipesList";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";
import css from "./MainPage.module.css";

export default function MainPage() {
  const dispatch = useDispatch();
  const recipes = useSelector(selectRecipes);
  const hasMore = useSelector(selectHasMore);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchRecipesThunk({ page: 1, perPage: 12 }));
  }, [dispatch]);

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    dispatch(fetchRecipesThunk({ page: nextPage, perPage: 12 }));
    setCurrentPage(nextPage);
    setTimeout(() => {
      const cardHeight = 500;
      window.scrollBy({ top: cardHeight * 1.5, behavior: "smooth" });
    }, 200);
  };

  return (
    <div className={css.main}>
      <RecipesList recipes={recipes} />
      {hasMore && <LoadMoreBtn loadMore={handleLoadMore} />}
    </div>
  );
}
