import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";
import ProfileNavigation from "../../components/ProfileNavigation/ProfileNavigation";
import RecipesList from "../../components/RecipesList/RecipesList";
import css from "./ProfilePage.module.css";

const ProfilePage = () => (
  <div className={css.profile}>
    <div className={css.title_container}>
      <h2 className={css.title}>My profile</h2>
      <ProfileNavigation />
      <p>96 recipes</p>
    </div>
    <div className={css.list_wrapper}>
      <RecipesList />
    </div>
    <LoadMoreBtn />
  </div>
);
export default ProfilePage;
// import { Outlet } from "react-router-dom";
// import ProfileNavigation from "../../components/ProfileNavigation/ProfileNavigation";
// import css from "./ProfilePage.module.css";

// const ProfilePage = () => (
//   <div className={css.profile}>
//     <div className={css.title_container}>
//       <h2 className={css.title}>My profile</h2>
//       <ProfileNavigation />
//       <p>96 recipes</p>{" "}
//     </div>
//     <div className={css.list_wrapper}>
//       <Outlet />
//     </div>
//   </div>
// );
// export default ProfilePage;
