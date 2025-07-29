import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import css from "./Footer.module.css";
import Logo from "../Logo/Logo.jsx";
import { useState } from "react";
import AuthModal from "../AuthModal/AuthModal";
import { selectAuthIsLoggedIn } from "../../redux/selectors/authSelector.js";

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isLoggedIn = useSelector(selectAuthIsLoggedIn);
  const navigate = useNavigate();

  const handleProfileClick = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <footer className={css.footer}>
      <div className={css.container}>
        <Logo />

        <p className={css.copyright}>
          © 2025 CookingCompanion. All rights reserved.
        </p>

        <div className={css.nav}>
          <NavLink
            to="/"
            className={css.link}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Recipes
          </NavLink>

          <NavLink
            to="/profile/own"
            className={css.link}
            onClick={(e) => {
              handleProfileClick(e);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Account
          </NavLink>
        </div>

        {isModalOpen && (
          <AuthModal
            isOpen={isModalOpen}
            onClose={closeModal}
            title="Error while viewing profile"
            message="You must log in or register."
            secondaryBtnText="Log in"
            primaryBtnText="Register"
            onSecondaryClick={() => {
              setIsModalOpen(false);
              navigate("/auth/login");
            }}
            onPrimaryClick={() => {
              setIsModalOpen(false);
              navigate("/auth/register");
            }}
          />
        )}
      </div>
    </footer>
  );
};

export default Footer;
