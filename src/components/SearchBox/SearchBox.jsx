import css from "../SearchBox/SearchBox.module.css";

const SearchBox = () => {
  return (
    <div className={css.search}>
      <input
        type="text"
        placeholder="Search recipes"
        className={css.inputSearchBox}
      />
      <button type="button" className={css.buttonSearchBox}>
        Search
      </button>
    </div>
  );
};

export default SearchBox;
