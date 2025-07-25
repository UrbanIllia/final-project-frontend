import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import css from "./Footer.module.css";
import Logo from "../Logo/Logo.jsx";
import { useState } from "react";
import LoginOrRegister from "../LoginOrRegister/LoginOrRegister.jsx";

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

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
          <NavLink to="/" className={css.link}>
            Recipes
          </NavLink>

          <NavLink
            to="/profile"
            className={css.link}
            onClick={handleProfileClick}
          >
            Account
          </NavLink>
        </div>

        {isModalOpen && (
          <LoginOrRegister
            title="Access Your Account"
            description="Please log in or register to access your profile."
            onClose={closeModal}
          />
        )}
      </div>
    </footer>
  );
};

export default Footer;
