import css from "./Loading.module.css";
import { PacmanLoader } from "react-spinners";

const Loading = () => (
  <div className={css.loader}>
    <PacmanLoader
      color="#3d2218"
      //   loading={loading}
      //   cssOverride={override}
      size={100}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  </div>
);
export default Loading;
