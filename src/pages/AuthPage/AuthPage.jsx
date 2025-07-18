import { useParams } from "react-router-dom";

import css from "./AuthPage.module.css";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import LoginForm from "../../components/LoginForm/LoginForm";

const AuthPage = () => {
  //   const { authType } = useParams();
  const { authType } = "register";

  return (
    <div className={css.container}>
      {authType === "register" ? <RegistrationForm /> : <LoginForm />}
    </div>
  );
};

export default AuthPage;
