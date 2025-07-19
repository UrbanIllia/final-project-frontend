import css from "./ProfileNavigation.module.css";
import { NavLink } from "react-router-dom";

const ProfileNavigation = () => {
  return (
    <nav className={css.nav}>
      <NavLink
        to="/profile/own"
        className={({ isActive }) =>
          `${css.link} ${isActive ? css.active : ""}`
        }
      >
        My Recipes
      </NavLink>
      <NavLink
        to="/profile/favorites"
        className={({ isActive }) =>
          `${css.link} ${isActive ? css.active : ""}`
        }
      >
        Saved Recipes
      </NavLink>
    </nav>
  );
};

export default ProfileNavigation;
