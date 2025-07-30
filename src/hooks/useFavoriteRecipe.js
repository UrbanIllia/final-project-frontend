import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { selectFavoriteRecipes } from "../redux/selectors/userSelector";
import { selectAuthIsLoggedIn } from "../redux/selectors/authSelector";
import { updateFavoriteRecipesThunk } from "../redux/operations/userOperation";

export const useFavoriteRecipe = (recipeId) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector(selectAuthIsLoggedIn);
  const favoriteRecipes = useSelector(selectFavoriteRecipes) || [];

  const [isModalOpen, setModalOpen] = useState(false);

  const isFavorite = favoriteRecipes.some((fav) => fav._id === recipeId);

  const handleToggleFavorite = () => {
    if (!isAuthenticated) {
      setModalOpen(true);
      return;
    }

    const action = isFavorite ? "REMOVE" : "ADD";
    dispatch(updateFavoriteRecipesThunk({ id: recipeId, action }));
  };

  const handleModalLogin = () => {
    setModalOpen(false);
    navigate("/auth/login");
  };

  const handleModalRegister = () => {
    setModalOpen(false);
    navigate("/auth/register");
  };

  return {
    isFavorite,
    isModalOpen,
    setModalOpen,
    handleToggleFavorite,
    handleModalLogin,
    handleModalRegister,
  };
};
