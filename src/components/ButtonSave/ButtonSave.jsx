import { useFavoriteRecipe } from "../../hooks/useFavoriteRecipe";
import AuthModal from "../AuthModal/AuthModal";
import s from "./ButtonSave.module.css";
import { MdSaveAlt } from "react-icons/md";

const ButtonSave = ({ recipeId }) => {
  const {
    isFavorite,
    isModalOpen,
    setModalOpen,
    handleToggleFavorite,
    handleModalLogin,
    handleModalRegister,
  } = useFavoriteRecipe(recipeId);
  return (
    <>
      <button
        className={`${s.saveRecipeBtn} ${isFavorite ? s.active : ""}`}
        onClick={handleToggleFavorite}
        aria-label="Toggle Favorite"
      >
        {isFavorite ? "Remove" : "Save"}
        <MdSaveAlt className={`${s.saveIcon} ${isFavorite ? s.flipped : ""}`} />
      </button>

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
    </>
  );
};

export default ButtonSave;
