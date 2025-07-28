import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Logo from "../Logo/Logo";
import BurgerMenu from "./BurgerMenu/BurgerMenu";
import Navigation from "./Navigation/Navigation";
import css from "./Header.module.css";
import { logoutUserThunk } from "../../redux/operations/authOperations";
import { fetchUserThunk } from "../../redux/operations/userOperation";
import { toast } from "react-toastify";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userName = useSelector((state) => state.user.user.name || "Guest");
  // const isLoading = useSelector((state) => state.user.isLoading);
  // const error = useSelector((state) => state.user.error);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(
      "Header useEffect: isLoggedIn =",
      isLoggedIn,
      "userName =",
      userName
    );
    if (isLoggedIn) {
      dispatch(fetchUserThunk())
        .unwrap()
        .catch((err) => {
          console.error("Failed to fetch user:", err);
          toast.error("Failed to load user data");
        });
    }
  }, [isLoggedIn, userName, dispatch]);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUserThunk()).unwrap();
      toast.success("Logout successful!");
    } catch (error) {
      toast.error("Logout error: " + error);
    } finally {
      setMenuOpen(false);
      navigate("/");
    }
  };

  return (
    <header className={css.header}>
      {/* {isLoading && <div className={css.loader}>Loading...</div>}
      {error && <div className={css.error}>Error: {error}</div>} */}
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
    </header>
  );
}
