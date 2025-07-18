import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";
import ProfileNavigation from "../../components/ProfileNavigation/ProfileNavigation";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import RecipesList from "../../components/RecipesList/RecipesList";
import css from "./ProfilePage.module.css";

const ProfilePage = () => (
  <div className={css.profile}>
    <p>Profile Page</p>
    <ProfileNavigation />
    <RecipesList>
      <RecipeCard />
    </RecipesList>
    <LoadMoreBtn />
  </div>
);
export default ProfilePage;
