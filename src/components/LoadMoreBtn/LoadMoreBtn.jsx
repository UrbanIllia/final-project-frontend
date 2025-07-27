import { useSelector } from "react-redux";
import {
  selectRecipesIsLoading,
  selectHasMore,
} from "../../redux/selectors/recipesSelector";
import css from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ loadMore }) => {
  const isLoading = useSelector(selectRecipesIsLoading);
  const hasMore = useSelector(selectHasMore);

  if (!hasMore) {
    return null;
  }

  return (
    <div className={css.button_wrapper}>
      <button
        className={css.button}
        onClick={(e) => {
          e.preventDefault();
          loadMore();
        }}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Load More"}
      </button>
    </div>
  );
};

export default LoadMoreBtn;
