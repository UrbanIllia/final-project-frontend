// src/components/AddRecipeForm/AddRecipeForm.jsx
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./AddRecipeForm.module.css";
import { useNavigate } from "react-router-dom";
import { API } from "../../axiosConfig/Api";
import { addRecipeThunk } from "../../redux/operations/recipesOperation";
import { selectRecipesIsLoading } from "../../redux/selectors/recipesSelector";
import { MdDelete, MdOutlineAddAPhoto } from "react-icons/md";

const validationSchema = Yup.object({
  title: Yup.string().max(64).required("Required"),
  description: Yup.string().max(200).required("Required"),
  time: Yup.number().min(1).max(360).required("Required"),
  calories: Yup.number().min(1).max(1000).required("Required"),
  category: Yup.string().required("Required"),
  instructions: Yup.string().required("Required"),
  image: Yup.mixed().required("Required"),
});

export default function AddRecipeForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectRecipesIsLoading);

  const [categories, setCategories] = useState([]);
  const [ingredientsList, setIngredientsList] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    API.get("/categories/").then((res) => setCategories(res.data));
    API.get("/ingredients/").then((res) => setIngredientsList(res.data));
  }, []);

  const handleAddIngredient = (values, setFieldValue) => {
    const { ingredient, amount } = values;
    if (!ingredient || !amount) return;
    setSelectedIngredients((p) => [...p, { name: ingredient, amount }]);
    setFieldValue("ingredient", "");
    setFieldValue("amount", "");
  };

  const handleRemoveIngredient = (i) => {
    setSelectedIngredients((p) => p.filter((_, idx) => idx !== i));
  };

  const handleImageChange = (e, setFieldValue) => {
    const file = e.target.files[0];
    if (file) {
      setFieldValue("image", file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("time", values.time.toString());
    formData.append("calories", values.calories.toString());
    formData.append("category", values.category);
    formData.append("instructions", values.instructions);
    formData.append("thumb", values.image);
    formData.append("ingredients", JSON.stringify(selectedIngredients));

    try {
      const res = await dispatch(addRecipeThunk(formData)).unwrap();
      const id = res.data._id || res.data.id;
      navigate(`/recipes/${id}`);
    } catch (err) {
      alert(err.message || "Failed to create recipe");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
        time: "",
        calories: "",
        category: "",
        instructions: "",
        ingredient: "",
        amount: "",
        image: null,
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, setFieldValue, values }) => (
        <Form className={styles.form}>
          <div className={styles.generalBlock}>
            <label className={styles.sectionTitle}>General Information</label>
            <div className={styles.generalItems}>
              <div className={styles.descriptionItem}>
                <div className={styles.smallTitle}>
                  <label>Recipe Title</label>
                </div>
                <Field
                  name="title"
                  type="text"
                  placeholder="Enter the name of your recipe"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className={styles.error}
                />
              </div>
              <div className={styles.descriptionItem}>
                <div className={styles.smallTitle}>
                  <label>Recipe Description</label>
                </div>
                <Field
                  as="textarea"
                  name="description"
                  placeholder="Enter a brief description of your recipe"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className={styles.error}
                />
              </div>
              <div className={styles.generalGrid}>
                <div className={styles.fullWidth}>
                  <div className={styles.descriptionItem}>
                    <div className={styles.smallTitle}>
                      <label>Cooking Time (minutes)</label>
                    </div>
                    <Field name="time" type="number" placeholder="10" />
                    <ErrorMessage
                      name="time"
                      component="div"
                      className={styles.error}
                    />
                  </div>
                  <div>
                    <div className={styles.smallTitle}>
                      <label>Calories</label>
                    </div>
                    <Field
                      name="calories"
                      type="number"
                      placeholder="150 cals"
                    />
                    <ErrorMessage
                      name="calories"
                      component="div"
                      className={styles.error}
                    />
                  </div>

                  <div>
                    <div className={styles.smallTitle}>
                      <label>Category</label>
                    </div>
                    <Field name="category" as="select">
                      <option value="">Select category</option>
                      {categories.map((c) => (
                        <option key={c._id || c.id} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="category"
                      component="div"
                      className={styles.error}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.uploadBlock}>
            <label htmlFor="thumb" className={styles.sectionTitle}>
              Upload Photo
            </label>
            <div className={styles.uploadItem}>
              <div className={styles.imageUpload}>
                <input
                  id="thumb"
                  name="thumb"
                  type="file"
                  accept="image/*"
                  className={styles.hiddenInput}
                  onChange={(e) => handleImageChange(e, setFieldValue)}
                />

                {preview ? (
                  <img src={preview} alt="Preview" className={styles.preview} />
                ) : (
                  <div className={styles.placeholderPhoto}>
                    <MdOutlineAddAPhoto className={styles.cameraIcon} />
                  </div>
                )}
                <ErrorMessage
                  name="image"
                  component="div"
                  className={styles.error}
                />
              </div>
            </div>
          </div>

          <div className={styles.ingredientsBlock}>
            <label className={styles.sectionTitle}>Ingredients</label>
            {/* ............................................... */}
            <div className={styles.ingredientInputs}>
              <div className={styles.fieldGroup}>
                <div className={styles.smallTitle}>
                  <label>Name</label>
                </div>
                <Field
                  as="select"
                  name="ingredient"
                  className={styles.inputName}
                >
                  <option value="">Select ingredient</option>
                  {ingredientsList.map((ing) => (
                    <option key={ing._id || ing.id} value={ing.name}>
                      {ing.name}
                    </option>
                  ))}
                </Field>
              </div>
              <div className={styles.fieldGroup}>
                <div className={styles.smallTitle}>
                  <label>Amount</label>
                </div>
                <Field
                  name="amount"
                  type="text"
                  placeholder="100g"
                  className={styles.inputAmount}
                />
              </div>
              <button
                type="button"
                className={styles.addBtn}
                onClick={() => handleAddIngredient(values, setFieldValue)}
              >
                Add new Ingredient
              </button>
            </div>
            {/* ................................................... */}
            <ul className={styles.selectedIngredients}>
              {selectedIngredients.length > 0 && (
                <li className={styles.selectedIngredientsHeader}>
                  <span className={styles.colName}>Name:</span>
                  <span className={styles.colAmount}>Amount:</span>
                  <span className={styles.colAction}></span>
                </li>
              )}
              {selectedIngredients.map((item, i) => (
                <li key={i} className={styles.selectedIngredientRow}>
                  <span className={styles.colName}>{item.name}</span>
                  <span className={styles.colAmount}>{item.amount}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveIngredient(i)}
                    className={`${styles.colAction} `}
                  >
                    <MdDelete />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.instructionsBlock}>
            <label className={styles.sectionTitle}>Instructions</label>
            <div className={styles.instructionsItems}>
              <Field
                as="textarea"
                name="instructions"
                placeholder="Enter a text"
              />
              <ErrorMessage
                name="instructions"
                component="div"
                className={styles.error}
              />
            </div>
          </div>

          <div className={styles.submitBlock}>
            <button
              type="submit"
              disabled={isSubmitting || isLoading}
              className={styles.buttonPrimary}
            >
              {isLoading ? "Publishing..." : "Publish Recipe"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
