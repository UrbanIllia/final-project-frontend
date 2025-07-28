import { useNavigate } from "react-router-dom";
import AuthModal from "../AuthModal/AuthModal";
import SaveIcon from "../Icons/SaveIcon";
import ClockIcon from "../Icons/ClockIcon";
import css from "./RecipeCard.module.css";
import { useFavoriteRecipe } from "../../hooks/useFavoriteRecipe";

export default function RecipeCard({ recipe }) {
  const { _id, title, thumb, description, time, calories } = recipe;
  const navigate = useNavigate();
  const {
    isFavorite,
    isModalOpen,
    setModalOpen,
    handleToggleFavorite,
    handleModalLogin,
    handleModalRegister,
  } = useFavoriteRecipe(_id);

  const handleLearnMore = () => {
    navigate(`/recipes/${_id}`);
  };

  return (
    <div className={css.card}>
      <img src={thumb} alt={title} className={css.image} />

      <div className={css.content}>
        <div className={css.topRow}>
          <h2 className={css.title}>{title}</h2>

          <span className={css.time}>
            <ClockIcon className={css.timeIcon} /> {time}
          </span>
        </div>

        <p className={css.description}>{description}</p>
        <p className={css.calories}>{calories ? `~${calories} cals` : "-"}</p>

        <div className={css.footer}>
          <button onClick={handleLearnMore} className={css.learnMoreBtn}>
            Learn more
          </button>

          <button
            onClick={handleToggleFavorite}
            className={`${css.favoriteBtn} ${isFavorite ? css.active : ""}`}
            aria-label="Toggle Favorite"
          >
            <SaveIcon className={css.saveIcon} />
          </button>
        </div>
      </div>

      <AuthModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title="Error while saving"
        message="To save this recipe, you need to authorize first"
        secondaryBtnText="Log in"
        primaryBtnText="Register"
        onSecondaryClick={handleModalLogin}
        onPrimaryClick={handleModalRegister}
      />
    </div>
  );
}
