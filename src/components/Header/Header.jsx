import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  logoutUserThunk,
  refreshUserThunk,
} from "../../redux/operations/authOperations";
import {
  selectAuthIsLoggedIn,
  selectAuthUser,
  selectAuthIsLoading,
} from "../../redux/selectors";
import Logo from "../Logo/Logo";
import BurgerMenu from "./BurgerMenu/BurgerMenu";
import Navigation from "./Navigation/Navigation";
import Loading from "../Loading/Loading";
import css from "./Header.module.css";
import { toast } from "react-toastify";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const isLoggedIn = useSelector(selectAuthIsLoggedIn) ?? false;
  const user = useSelector(selectAuthUser) ?? { name: "Guest" };
  const isLoading = useSelector(selectAuthIsLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(
    "Header: isLoggedIn =",
    isLoggedIn,
    "user =",
    JSON.stringify(user, null, 2)
  );

  useEffect(() => {
    if (!isLoggedIn) {
      console.log("Header: Attempting to refresh user");
      dispatch(refreshUserThunk())
        .unwrap()
        .then((data) =>
          console.log(
            "Header: refreshUserThunk successful",
            JSON.stringify(data, null, 2)
          )
        )
        .catch((error) =>
          console.log("Header: refreshUserThunk failed", error)
        );
    }
  }, [dispatch, isLoggedIn]);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUserThunk()).unwrap();
      setMenuOpen(false);
      toast.success("Logged out successfully!");
      navigate("/");
    } catch (error) {
      toast.error(error || "Logout failed");
    }
  };

  return (
    <header className={css.header}>
      {isLoading && <Loading />}
      <div className={css.container}>
        <Logo />
        <BurgerMenu open={menuOpen} setOpen={setMenuOpen} />
        <div className={css.desktopNav}>
          <Navigation
            isLoggedIn={isLoggedIn}
            closeMenu={() => {}}
            userName={user?.name || "Guest"}
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
            userName={user?.name || "Guest"}
            onLogout={handleLogout}
            isMobile={true}
          />
        </div>
      )}
    </header>
  );
}
