import Filters from "../../components/Filters/Filters";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import RecipesList from "../../components/RecipesList/RecipesList";
import Banner from "../../components/Banner/Banner";
import css from "./MainPage.module.css";

const MainPage = () => (
  <div className={css.main}>
    <p>Main Page with Recipes</p>
    <Banner />
    <Filters />
    <RecipesList>
      <RecipeCard />
    </RecipesList>
    <LoadMoreBtn />
  </div>
);
export default MainPage;
