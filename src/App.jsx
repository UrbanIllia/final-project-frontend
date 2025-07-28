import { lazy, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/Layout/Layout";
import NotFound from "./components/NotFound/NotFound";
import { refreshUserThunk } from "./redux/operations/authOperations";
import { fetchUserThunk } from "./redux/operations/userOperation";
import { useDispatch } from "react-redux";

const MainPage = lazy(() => import("./pages/MainPage/MainPage"));
const RecipeViewPage = lazy(() =>
  import("./pages/RecipeViewPage/RecipeViewPage")
);
const AddRecipePage = lazy(() => import("./pages/AddRecipePage/AddRecipePage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage/ProfilePage"));
const AuthPage = lazy(() => import("./pages/AuthPage/AuthPage"));

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      dispatch(refreshUserThunk())
        .unwrap()
        .then(() => {
          dispatch(fetchUserThunk());
        })
        .catch(() => {
          console.log("Something went wrong");
        });
    } else {
      dispatch(fetchUserThunk());
    }
  }, [dispatch]);
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ zIndex: 9999 }}
      />
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<MainPage />} />
            <Route path="/recipes/:id" element={<RecipeViewPage />} />
            <Route path="/add-recipe" element={<AddRecipePage />} />
            <Route path="/profile/:recipeType" element={<ProfilePage />} />
            <Route path="/auth/:authType" element={<AuthPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
