import Filters from "../../components/Filters/Filters";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import RecipesList from "../../components/RecipesList/RecipesList";
import SearchBox from "../../components/SearchBox/SearchBox";
import css from "./MainPage.module.css";

const MainPage = () => (
  <div className={css.main}>
    <p>Main Page with Recipes</p>
    <SearchBox />
    <Filters />
    <RecipesList>
      <RecipeCard />
    </RecipesList>
    <LoadMoreBtn />
  </div>
);
export default MainPage;
