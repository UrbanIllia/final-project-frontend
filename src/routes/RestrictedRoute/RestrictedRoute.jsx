import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectAuthIsLoggedIn } from "../../redux/selectors/authSelector";

const RestrictedRoute = ({
  children,
  redirectTo = "/transactions/incomes",
}) => {
  const isLoggedIn = useSelector(selectAuthIsLoggedIn);

  return isLoggedIn ? <Navigate to={redirectTo} /> : children;
};

export default RestrictedRoute;
