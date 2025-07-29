import { useParams, Navigate } from "react-router";
import ProfileNavigation from "../../components/ProfileNavigation/ProfileNavigation.jsx";
import OwnRecipes from "../../components/Profile/OwnRecipes/OwnRecipes.jsx";
import SavedRecipes from "../../components/Profile/SavedRecipes/SavedRecipes.jsx";
import styles from "./ProfilePage.module.css";

export default function ProfilePage() {
  const { recipeType } = useParams();

  const renderContent = () => {
    switch (recipeType) {
      case "own":
        return <OwnRecipes />;
      case "favorites":
        return <SavedRecipes />;
      default:
        return <Navigate to="/profile/own" replace />;
    }
  };

  return (
    <section className={` ${styles.profilePage}`}>
      <div className={styles.title_container}>
        <h2 className={styles.title}>My Profile</h2>
        <ProfileNavigation />
      </div>
      <div className={styles.content}>{renderContent()}</div>
    </section>
  );
}
