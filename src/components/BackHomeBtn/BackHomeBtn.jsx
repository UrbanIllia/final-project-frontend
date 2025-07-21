import { IoIosArrowRoundBack } from "react-icons/io";
import s from "./BackHomeBtn.module.css";
import { useLocation, useNavigate } from "react-router-dom";

const BackHomeBtn = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const onClickButtonHome = () => {
    const backLink = location.state?.from || "/";
    navigate(backLink);
  };

  return (
    <button className={s.backHomeBtn} onClick={onClickButtonHome}>
      <IoIosArrowRoundBack />
      <p>Back to Home</p>
    </button>
  );
};

export default BackHomeBtn;
