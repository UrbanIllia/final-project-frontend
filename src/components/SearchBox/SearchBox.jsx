import { useState } from "react";
import { toast } from "react-toastify";
import css from "../SearchBox/SearchBox.module.css";

const SearchBox = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      toast.info("Please enter a search query");
      return;
    }

    onSearch?.(query.trim());
    setQuery("");
  };

  return (
    <form className={css.search} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search recipes"
        value={query}
        onChange={handleInputChange}
        className={css.inputSearchBox}
      />
      <button type="submit" className={css.buttonSearchBox}>
        Search
      </button>
    </form>
  );
};

export default SearchBox;
