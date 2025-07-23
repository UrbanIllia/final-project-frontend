import css from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ loadMore }) => {
  return (
    <div className={css.button_wrapper}>
      <button
        className={css.button}
        onClick={(e) => {
          e.preventDefault();
          loadMore();
        }}
      >
        Load More
      </button>
    </div>
  );
};

export default LoadMoreBtn;
