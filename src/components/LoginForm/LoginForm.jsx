import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { loginUserThunk } from "../../redux/operations/authOperations.js";
import { selectAuthIsLoading } from "../../redux/selectors";
import { toast } from "react-toastify";
import css from "./LoginForm.module.css";
import { useState } from "react";
import eyeOpenSvg from "../../assets/icons/eye.svg";
import eyeClosedSvg from "../../assets/icons/eye-crossed.svg";
import Loading from "../Loading/Loading";

const PasswordField = ({ field, form }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={css.passwordWrapper}>
      <input
        {...field}
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        className={css.input}
        value={field.value}
        onChange={(e) => form.setFieldValue(field.name, e.target.value)}
        autoComplete="off"
      />
      <span
        className={css.toggleIcon}
        onClick={togglePasswordVisibility}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => e.key === "Enter" && togglePasswordVisibility()}
      >
        <img
          src={showPassword ? eyeOpenSvg : eyeClosedSvg}
          alt={showPassword ? "Hide password" : "Show password"}
          width="24"
          height="24"
        />
      </span>
    </div>
  );
};

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectAuthIsLoading);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Must be a valid email")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      )
      .required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await dispatch(loginUserThunk(values)).unwrap();
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      toast.error(error || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={css.formContainer}>
      {isLoading && <Loading />}
      <h2 className={css.title}>Login</h2>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={css.form}>
            <label htmlFor="email" className={css.label}>
              Email
            </label>
            <Field
              id="email"
              name="email"
              type="email"
              placeholder="email@gmail.com"
              className={[css.input, css.input_mb].join(" ")}
              autoComplete="off"
            />
            <ErrorMessage name="email" component="div" className={css.error} />
            <label htmlFor="password" className={css.label}>
              Password
            </label>
            <Field name="password" component={PasswordField} />
            <ErrorMessage
              name="password"
              component="div"
              className={css.error}
            />
            <button
              type="submit"
              disabled={isSubmitting || isLoading}
              className={css.button}
            >
              Login
            </button>
          </Form>
        )}
      </Formik>
      <div className={css.registerwrapp}>
        <p className={css.registerwrapp_text}>Don’t have an account?</p>
        <Link to="/auth/register" className={css.registerwrapp_link}>
          Register
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
