import { NavLink } from "react-router-dom";
import css from "./Footer.module.css";
import Logo from "../Logo/Logo.jsx";

const Footer = () => {
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

          <NavLink to="/profile" className={css.link}>
            Account
          </NavLink>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
