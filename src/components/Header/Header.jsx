import { NavLink } from "react-router-dom";
import css from "./Header.module.css";

const Header = () => {
  const isAuthenticated = false;
  return (
    <header>
      <div>
        <div>Recipe App</div>
        <nav>
          {isAuthenticated ? (
            <>
              <NavLink to="/">Recipes</NavLink>
              <NavLink to="/profile/own">My Profile</NavLink>
              <NavLink to="/add-recipe">Add Recipe</NavLink>
              <span>I</span>
              <button>Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/">Recipes</NavLink>
              <NavLink to="/auth/login">Login</NavLink>
              <NavLink to="/auth/register">Register</NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
