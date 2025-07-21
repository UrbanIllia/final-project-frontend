import BackHomeBtn from "../BackHomeBtn/BackHomeBtn";
import s from "./NotFound.module.css";

const NotFound = () => {
  return (
    <div className={s.notFoundImageContainer}>
      <picture>
        <source
          type="image/png"
          media="(min-width:1440px)"
          srcSet="/images/RecipeNotFound/recipeNotFoundFull1x.jpg 1x,
          /images/RecipeNotFound/recipeNotFoundFull2x.jpg 2x"
          loading="lazy"
        />
        <source
          type="image/png"
          media="(min-width:768px)"
          srcSet="/images/RecipeNotFound/recipeNotFoundTablette1x.jpg 1x,
          /images/RecipeNotFound/recipeNotFoundTablette2x.jpg 2x"
          loading="lazy"
        />
        <source
          type="image/png"
          srcSet="/images/RecipeNotFound/recipeNotFoundMobile1x.jpg 1x,
          /images/RecipeNotFound/recipeNotFoundMobile2x.jpg 2x"
          loading="lazy"
        />
        <img
          src="/images/RecipeNotFound/recipeNotFoundMobile2x.jpg"
          className={s.notFoundImage}
        />
      </picture>
      <div className={s.errorText}>
        <h3 className={s.error404}>404</h3>
        <p className={s.errorDescription}>Not found</p>
      </div>
      <BackHomeBtn />
    </div>
  );
};

export default NotFound;
