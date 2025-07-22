// import css from "./Banner.module.css";
// import SearchBox from "../SearchBox/SearchBox";

// const Banner = () => {
//   return (
//     <section className={css.bannerSection}>
//       <div className={css.container}>
//         <img
//           src="/images/Banner.png"
//           alt="girl cooking"
//           className={css.imageSearch}
//         />
//       </div>
//       <div className={css.boxTitle}>
//         <h1 className={css.titleBanner}>
//           <span>Plan, Cook, and</span>
//           <br />
//           <span>Share Your</span>
//           <br />
//           <span>Flavors</span>
//         </h1>
//         <SearchBox />
//       </div>
//     </section>
//   );
// };

// export default Banner;
import css from "./Banner.module.css";
import SearchBox from "../SearchBox/SearchBox";

const Banner = () => {
  return (
    <section className={css.bannerSection}>
      <div className={css.contentContainer}>
        <div className={css.boxTitle}>
          <h1 className={css.titleBanner}>
            <span>Plan, Cook, and</span>
            <br />
            <span>Share Your</span>
            <br />
            <span>Flavors</span>
          </h1>
          <SearchBox />
        </div>
      </div>
    </section>
  );
};

export default Banner;
