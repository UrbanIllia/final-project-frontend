import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { loginUser } from '../redux/slices/authSlice';

import css from "./LoginForm.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";

// Импорт SVG-файлов
import eyeOpenSvg from "../../assets/icons/eye.svg";
import eyeClosedSvg from "../../assets/icons/eye-crossed.svg";

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
  //   const dispatch = useDispatch();
  //   const navigate = useNavigate();

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

  //   const handleSubmit = async (values, { setSubmitting }) => {
  //     try {
  //       await dispatch(loginUser(values)).unwrap();
  //       toast.success('Login successful!');
  //       navigate('/');
  //     } catch (error) {
  //       toast.error(error.message || 'Login failed');
  //     } finally {
  //       setSubmitting(false);
  //     }
  //   };

  return (
    <div className={css.formContainer}>
      <h2 className={css.title}>Login</h2>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        // onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={css.form}>
            <div className={css.fieldGroup1}>
              <label htmlFor="email" className={css.label}>
                Email
              </label>
              <Field
                id="email"
                name="email"
                type="email"
                placeholder="email@gmail.com"
                className={css.input}
                autoComplete="off"
              />
              <ErrorMessage
                name="email"
                component="div"
                className={css.error}
              />
            </div>
            <div className={css.fieldGroup2}>
              <label htmlFor="password" className={css.label}>
                Password
              </label>
              <Field name="password" component={PasswordField} />
              <ErrorMessage
                name="password"
                component="div"
                className={css.error}
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={css.button}
            >
              Login
            </button>
          </Form>
        )}
      </Formik>
      <div className={css.registerwrapp}>
        <p className={css.registerwrapp_text}>Don’t have an account?</p>
        <Link to="" className={css.registerwrapp_link}>
          Register
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
