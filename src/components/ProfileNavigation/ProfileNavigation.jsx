import css from "./ProfileNavigation.module.css";
import { NavLink } from "react-router-dom";

const ProfileNavigation = () => {
  return (
    <nav className={css.nav}>
      <NavLink
        to="/profile/own"
        className={({ isActive }) =>
          isActive ? "text-blue-600" : "text-gray-600"
        }
      >
        Own Recipes
      </NavLink>
      <NavLink
        to="/profile/favorites"
        className={({ isActive }) =>
          isActive ? "text-blue-600" : "text-gray-600"
        }
      >
        Favorites
      </NavLink>
    </nav>
  );
};

export default ProfileNavigation;
