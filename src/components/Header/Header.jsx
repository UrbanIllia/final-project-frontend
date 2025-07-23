import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../Logo/Logo";
import BurgerMenu from "./BurgerMenu/BurgerMenu";
import Navigation from "./Navigation/Navigation";
import css from "./Header.module.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Локальний стан замість Redux
  const [userName, setUserName] = useState("Guest"); // Локальний стан
  const navigate = useNavigate();

  const handleLoginToggle = () => {
    setIsLoggedIn(!isLoggedIn);
    setUserName(isLoggedIn ? "Guest" : "John Doe");
  };

  const handleLogout = () => {
    setMenuOpen(false);
    // Локальна логіка без бекенду
    setIsLoggedIn(false);
    setUserName("Guest");
    navigate("/");
  };

  return (
    <header className={css.header}>
      <div className={css.container}>
        <Logo />
        <BurgerMenu open={menuOpen} setOpen={setMenuOpen} />

        <div className={css.desktopNav}>
          <Navigation
            isLoggedIn={isLoggedIn}
            closeMenu={() => {}}
            userName={userName}
            onLogout={handleLogout}
            isMobile={false}
          />
        </div>
      </div>

      {menuOpen && (
        <div className={`${css.mobileMenu} ${css.open}`}>
          <Navigation
            isLoggedIn={isLoggedIn}
            closeMenu={() => setMenuOpen(false)}
            userName={userName}
            onLogout={handleLogout}
            isMobile={true}
          />
        </div>
      )}
      <button className={css.handleLoginToggle} onClick={handleLoginToggle}>
        {isLoggedIn ? "Logout (Test)" : "Login (Test)"}
      </button>
    </header>
  );
}
