import css from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ loadMore, isLoading }) => {
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
