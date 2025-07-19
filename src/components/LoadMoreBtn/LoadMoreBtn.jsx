import css from "./LoadMoreBtn.module.css";

const LoadMoreBtn = () => {
  return (
    <div className={css.button_wrapper}>
      <button className={css.button}>Load More</button>{" "}
    </div>
  );
};

export default LoadMoreBtn;
