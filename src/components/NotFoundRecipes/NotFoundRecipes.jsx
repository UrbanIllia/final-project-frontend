import css from "./NotFoundRecipes.module.css";
import toastImage from "/images/toast2.jpg";

const NotFoundRecipes = () => {
  return (
    <div>
      <h2 className={css.title}>You don't have any own recipes yet.</h2>
      <img src={toastImage} alt="Sad toast" width="600" className={css.img} />
    </div>
  );
};

export default NotFoundRecipes;
