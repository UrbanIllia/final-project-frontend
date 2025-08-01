import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import css from "./LoginForm.module.css";
import { useState } from "react";
import eyeOpenSvg from "../../assets/icons/eye.svg";
import eyeClosedSvg from "../../assets/icons/eye-crossed.svg";
import { loginUserThunk } from "../../redux/operations/authOperations";
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
        placeholder="Enter your password"
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

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    const { email, password } = values;

    if (!email.trim() || !password.trim()) {
      toast.error("All fields must be filled");
      setSubmitting(false);
      return;
    }

    try {
      const loginResult = await dispatch(
        loginUserThunk({ email, password })
      ).unwrap();
      console.log("Login successful, loginResult:", loginResult);

      const userResult = await dispatch(fetchUserThunk()).unwrap();
      console.log("fetchUserThunk success, userResult:", userResult);

      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Incorrect email or password");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={css.formContainer}>
      <h2 className={css.title}>Log In</h2>
      <p className={css.subtitle}>
        Welcome back! Please enter your credentials to access your account.
      </p>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values, submitForm }) => {
          const { email, password } = values;

          const handleManualSubmit = () => {
            if (!email.trim() || !password.trim()) {
              toast.error("All fields must be filled");
              return;
            }

            submitForm();
          };

          return (
            <Form className={css.form}>
              {isSubmitting && <div className={css.loader}></div>}

              <div className={`${css.fieldGroup} ${css.mb}`}>
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
                  Enter your password
                </label>
                <Field name="password" component={PasswordField} />
                <ErrorMessage
                  name="password"
                  component="div"
                  className={css.error}
                />
              </div>

              <button
                type="button"
                className={css.button}
                onClick={handleManualSubmit}
              >
                Log In
              </button>
            </Form>
          );
        }}
      </Formik>

      <div className={css.registerwrapp}>
        <p className={css.registerwrapp_text}>Don't have an account?</p>
        <Link to="/auth/register" className={css.registerwrapp_link}>
          Register
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
