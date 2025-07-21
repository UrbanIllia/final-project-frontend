import css from "./Banner.module.css";
import SearchBox from "../SearchBox/SearchBox";

const Banner = () => {
  return (
    <section className={css.bannerSection}>
      <div className={css.imageSearch}></div>
      <div className={css.bannerInner}>
        <div className={css.boxTitle}>
          <h1 className={css.titleBanner}>
            <span className={css.lineOne}>Plan, Cook, and </span>
            <span className={css.lineTwo}> Share Your Flavors</span>
          </h1>
          <SearchBox />
        </div>
      </div>
    </section>
  );
};

export default Banner;
