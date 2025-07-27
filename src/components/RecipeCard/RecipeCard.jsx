import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import { selectFavoriteRecipes } from "../../redux/selectors/recipesSelector";
import { selectAuthIsLoggedIn } from "../../redux/selectors/authSelector";
import { updateFavoriteRecipesThunk } from "../../redux/operations/recipesOperation";
import AuthModal from "../AuthModal/AuthModal";

import SaveIcon from "../Icons/SaveIcon";
import TimeIcon from "../Icons/TimeIcon";
import css from "./RecipeCard.module.css";

export default function RecipeCard({ recipe }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector(selectAuthIsLoggedIn);
  const favoriteRecipes = useSelector(selectFavoriteRecipes);
  const [isModalOpen, setModalOpen] = useState(false);

  const { _id, title, thumb, description, time, calories } = recipe;

  const isFavorite = favoriteRecipes.some((fav) => fav._id === _id);

  const handleToggleFavorite = () => {
    if (!isAuthenticated) {
      setModalOpen(true);
      return;
    }

    const action = isFavorite ? "REMOVE" : "ADD";
    dispatch(updateFavoriteRecipesThunk({ id: _id, action }));
  };

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
            <TimeIcon className={css.timeIcon} /> {time}
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
        onSecondaryClick={() => {
          setModalOpen(false);
          navigate("/auth/login");
        }}
        onPrimaryClick={() => {
          setModalOpen(false);
          navigate("auth/register");
        }}
      />
    </div>
  );
}
