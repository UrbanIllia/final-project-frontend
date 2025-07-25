import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import css from "./Layout.module.css";
import Loading from "../Loading/Loading";
import { Suspense } from "react";

const Layout = () => {
  return (
    <div className={css.container}>
      <Header />
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>

      <Footer />
    </div>
  );
};

export default Layout;
