import css from "./NotFoundRecipes.module.css";

const NotFoundRecipes = () => {
  return (
    <div>
      <h2 className={css.title}>You don't have any own recipes yet.</h2>
      <img
        src="/public/images/toast2.jpg"
        alt=""
        width="600"
        className={css.img}
      />
    </div>
  );
};

export default NotFoundRecipes;
