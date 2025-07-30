import { useDispatch, useSelector } from "react-redux";

import s from "./ButtonSave.module.css";
import { MdSaveAlt, MdOutlineRemoveCircle } from "react-icons/md";
import { selectAuthIsLoggedIn } from "../../redux/selectors/authSelector";
import { selectOwnRecipes } from "../../redux/selectors/recipesSelector";
import { useState } from "react";

import AuthModal from "../AuthModal/AuthModal";
import { useNavigate } from "react-router-dom";
import { updateFavoriteRecipesThunk } from "../../redux/operations/userOperation";

const ButtonSave = ({ id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector(selectAuthIsLoggedIn);
  const favoriteRecipes = useSelector(selectOwnRecipes);

  const [isModalOpen, setModalOpen] = useState(false);
  const isFavorite = favoriteRecipes.some((fav) => fav.id === id);

  const handleToggleFavorite = () => {
    if (!isAuthenticated) {
      setModalOpen(true);
      return;
    }

    const action = isFavorite ? "REMOVE" : "ADD";
    dispatch(updateFavoriteRecipesThunk({ id: id, action }));
  };

  return (
    <>
      <button
        className={s.saveRecipeBtn}
        onClick={handleToggleFavorite}
        aria-label="Toggle Favorite"
      >
        {isFavorite ? "Unsave" : "Save"}
        {isFavorite ? (
          <MdOutlineRemoveCircle className={s.saveIcon} />
        ) : (
          <MdSaveAlt className={s.saveIcon} />
        )}
      </button>
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
    </>
  );
};

export default ButtonSave;
