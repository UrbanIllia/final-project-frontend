import { NavLink } from "react-router-dom";
import css from "./LoginOrRegister.module.css";
import Icon from "../Icon/Icon";

const LoginOrRegister = ({ title, description, onClose }) => {
  return (
    <div className={css.modalOverlay} onClick={onClose}>
      <div className={css.modalContent} onClick={(e) => e.stopPropagation()}>
        <h3 className={css.title}>{title}</h3>
        <p className={css.description}>{description}</p>
        <div className={css.buttonGroup}>
          <NavLink to="/auth/login" className={css.button} onClick={onClose}>
            Log in
          </NavLink>
          <NavLink to="/auth/register" className={css.button} onClick={onClose}>
            Register
          </NavLink>
        </div>
        <button className={css.closeBtn} onClick={onClose}>
          <Icon name="close" classname={css.closeIcon} />
        </button>
      </div>
    </div>
  );
};

export default LoginOrRegister;
