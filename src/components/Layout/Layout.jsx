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
      <main className={css.main}>
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
