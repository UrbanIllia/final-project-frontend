import { useParams } from "react-router-dom";

import css from "./AuthPage.module.css";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import LoginForm from "../../components/LoginForm/LoginForm";

const AuthPage = () => {
  //   const { authType } = useParams();
  const { authType } = useParams();
  console.log(authType);

  return (
    <div className={css.container}>
      {authType === "register" ? <RegistrationForm /> : <LoginForm />}
      {/* <RegistrationForm /> */}
    </div>
  );
};

export default AuthPage;
