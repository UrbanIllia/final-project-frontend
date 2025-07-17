import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import css from "./Layout.module.css";

const Layout = () => {
  return (
    <div className={css.container}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
