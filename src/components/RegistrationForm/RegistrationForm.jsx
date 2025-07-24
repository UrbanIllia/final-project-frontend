import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import css from "./RegistrationForm.module.css";
import { useState } from "react";
import eyeOpenSvg from "../../assets/icons/eye.svg";
import eyeClosedSvg from "../../assets/icons/eye-crossed.svg";
import { registerUserThunk } from "../../redux/operations/authOperations";
import { fetchUserThunk } from "../../redux/operations/userOperation";

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
        placeholder={
          field.name === "password"
            ? "Enter your password"
            : "Confirm your password"
        }
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

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
        "Password must contain one uppercase letter, one lowercase letter, and one number"
      )
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
    agreeToTerms: Yup.bool().oneOf(
      [true],
      "You must agree to the Terms of Service and Privacy Policy"
    ),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const registerResult = await dispatch(
        registerUserThunk({
          name: values.name,
          email: values.email,
          password: values.password,
        })
      ).unwrap();
      console.log("Registration successful, registerResult =", registerResult);
      try {
        const userResult = await dispatch(fetchUserThunk()).unwrap();
        console.log(
          "fetchUserThunk after registration: success, userResult =",
          userResult
        );
      } catch (error) {
        console.warn(
          "fetchUserThunk after registration failed, continuing anyway:",
          error
        );
      }
      toast.success("Registration successful!");
      navigate("/");
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error(error || "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={css.formContainer}>
      <h2 className={css.title}>Register</h2>
      <p className={css.subtitle}>
        Join our community of culinary enthusiasts, save your favorite recipes,
        and share your cooking creations
      </p>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          agreeToTerms: false,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, isValid, values }) => (
          <Form className={css.form}>
            <div className={css.fieldGroup}>
              <label htmlFor="name" className={css.label}>
                Enter your name
              </label>
              <Field
                id="name"
                name="name"
                placeholder="Enter your name"
                className={css.input}
                autoComplete="off"
              />
              <ErrorMessage name="name" component="div" className={css.error} />
            </div>
            <div className={css.fieldGroup}>
              <label htmlFor="email" className={css.label}>
                Enter your email address
              </label>
              <Field
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                className={css.input}
                autoComplete="off"
              />
              <ErrorMessage
                name="email"
                component="div"
                className={css.error}
              />
            </div>
            <div className={css.fieldGroup}>
              <label htmlFor="password" className={css.label}>
                Create a strong password
              </label>
              <Field name="password" component={PasswordField} />
              <ErrorMessage
                name="password"
                component="div"
                className={css.error}
              />
            </div>
            <div className={css.fieldGroup}>
              <label htmlFor="confirmPassword" className={css.label}>
                Repeat your password
              </label>
              <Field name="confirmPassword" component={PasswordField} />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className={css.error}
              />
            </div>
            <div className={css.checkboxWrapper}>
              <Field
                type="checkbox"
                name="agreeToTerms"
                id="agreeToTerms"
                className={css.checkbox}
              />
              <label htmlFor="agreeToTerms" className={css.checkboxLabel}>
                I agree to the Terms of Service and Privacy Policy
              </label>
              <ErrorMessage
                name="agreeToTerms"
                component="div"
                className={css.error}
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting || !isValid || !values.agreeToTerms}
              className={css.button}
            >
              Register
            </button>
          </Form>
        )}
      </Formik>
      <div className={css.registerwrapp}>
        <p className={css.registerwrapp_text}>Already have an account?</p>
        <Link to="/auth/login" className={css.registerwrapp_link}>
          Log in
        </Link>
      </div>
    </div>
  );
};

export default RegistrationForm;
