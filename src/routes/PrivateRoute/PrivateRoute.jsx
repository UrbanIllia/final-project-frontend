import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {
  selectAuthIsLoggedIn,
  selectAuthIsRefreshing,
} from "../../redux/selectors/authSelector";
const PrivateRoute = ({ children }) => {
  const isLoggedIn = useSelector(selectAuthIsLoggedIn);
  const isRefreshing = useSelector(selectAuthIsRefreshing);

  if (isRefreshing) return null;
  console.log(
    "PrivateRoute: isLoggedIn =",
    isLoggedIn,
    ", isRefreshing =",
    isRefreshing
  );

  return isLoggedIn ? children : <Navigate to="/auth/login" replace />;
};

export default PrivateRoute;
