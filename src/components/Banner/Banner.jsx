import css from "./Banner.module.css";
import SearchBox from "../SearchBox/SearchBox";

const Banner = () => {
  return (
    <section className={css.bannerSection}>
      <div className={css.container}>
        <div className={css.imageSearch}></div>
        <div className={css.boxTitle}>
          <h1 className={css.titleBanner}>
            <span>Plan, Cook, and</span>
            <br />
            Share Your
            <br />
            Flavors
          </h1>
          <SearchBox />
        </div>
      </div>
    </section>
  );
};

export default Banner;
