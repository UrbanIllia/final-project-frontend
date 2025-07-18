import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { registerUser } from "../redux/slices/authSlice";
// import { toast } from "react-toastify";
import css from "./RegistrationForm.module.css";

const RegistrationForm = () => {
  //   const dispatch = useDispatch();
  //   const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  //   const handleSubmit = async (values, { setSubmitting }) => {
  //     try {
  //       await dispatch(registerUser(values)).unwrap();
  //       toast.success("Registration successful!");
  //       navigate("/");
  //     } catch (error) {
  //       toast.error(error.message || "Registration failed");
  //     } finally {
  //       setSubmitting(false);
  //     }
  //   };

  return (
    <div className={css.formContainer}>
      <h2 className={css.title}>Register</h2>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema}
        // onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={css.form}>
            <div className={css.fieldGroup}>
              <Field name="name" placeholder="Name" className={css.input} />
              <ErrorMessage name="name" component="div" className={css.error} />
            </div>
            <div className={css.fieldGroup}>
              <Field
                name="email"
                type="email"
                placeholder="Email"
                className={css.input}
              />
              <ErrorMessage
                name="email"
                component="div"
                className={css.error}
              />
            </div>
            <div className={css.fieldGroup}>
              <Field
                name="password"
                type="password"
                placeholder="Password"
                className={css.input}
              />
              <ErrorMessage
                name="password"
                component="div"
                className={css.error}
              />
            </div>
            <div className={css.fieldGroup}>
              <Field
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                className={css.input}
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className={css.error}
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={css.button}
            >
              Register
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegistrationForm;
