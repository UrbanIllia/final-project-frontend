import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Loading from "./components/Loading/Loading";
import NotFound from "./pages/NotFound/NotFound";

const MainPage = lazy(() => import("./pages/MainPage/MainPage"));
const RecipeViewPage = lazy(() =>
  import("./pages/RecipeViewPage/RecipeViewPage")
);
const AddRecipePage = lazy(() => import("./pages/AddRecipePage/AddRecipePage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage/ProfilePage"));
const AuthPage = lazy(() => import("./pages/AuthPage/AuthPage"));

const App = () => {
  return (
    <>
      <Router>
        <Suspense fallback={<Loading />}>
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
        </Suspense>
      </Router>
      <ToastContainer />
    </>
  );
};

export default App;
