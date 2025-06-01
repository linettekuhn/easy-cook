import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  fetchRecipeInfo,
  fetchRecipeNutritionLabel,
  fetchWebsiteRecipe,
} from "../api/spoonacular";
import { Recipe } from "../types";
import styles from "./FullRecipe.module.css";
import NavigationBar from "../components/NavigationBar";
import AlertMessage from "../components/AlertMessage";
import buildRecipeObject from "../util/parseRecipeData";
import BackButton from "../components/buttons/BackButton";

export default function FullRecipe() {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"error" | "warning" | "success">(
    "error"
  );
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [nutritionLabel, setNutritionLabel] = useState<string | null>(null);
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/");
  };
  const location = useLocation();

  useEffect(() => {
    const loadRecipe = async () => {
      setLoading(true);
      setAlertMessage("Loading recipe");
      setAlertType("warning");
      const queryParams = new URLSearchParams(location.search);
      const sourceURL = queryParams.get("sourceURL");

      if (sourceURL) {
        // try fetching website
        try {
          const recipeData = await fetchWebsiteRecipe(sourceURL);
          if (recipeData) {
            const recipe = buildRecipeObject(recipeData, -1, id);
            setRecipe(recipe);
            setLoading(false);
            setAlertMessage("Recipe found!");
            setAlertType("success");
            return;
          }
          setAlertMessage(null);
          setLoading(false);
        } catch (error: unknown) {
          if (error instanceof Error) {
            setAlertMessage(error.message);
            setAlertType("error");
          }
        }
      } else if (id) {
        // try fetching by id
        try {
          const recipeData = await fetchRecipeInfo(Number(id));
          if (!isNaN(Number(id))) {
            if (recipeData) {
              const recipe = buildRecipeObject(recipeData, Number(id));
              setRecipe(recipe);
              const label = await fetchRecipeNutritionLabel(recipeData.id);
              setNutritionLabel(label);
              setLoading(false);
              setAlertMessage("Recipe found!");
              setAlertType("success");
              return;
            }
          }
        } catch (error: unknown) {
          if (error instanceof Error) {
            setAlertMessage(error.message);
            setAlertType("error");
          }
        }
      } else {
        setAlertMessage("No URL or recipe ID provided");
        setAlertType("error");
        setLoading(false);
      }
    };

    loadRecipe();
  }, [id, location.search]);

  if (loading || !recipe) {
    return (
      <>
        <NavigationBar theme="blue" />
        <main data-theme="blue">
          <BackButton onClick={handleBack} text="BACK TO HOME" />
          {alertMessage && (
            <AlertMessage
              message={alertMessage}
              type={alertType}
              onClose={() => setAlertMessage(null)}
            />
          )}
        </main>
      </>
    );
  }

  return (
    <>
      <NavigationBar theme="blue" />
      <main data-theme="blue">
        <BackButton onClick={handleBack} text="BACK TO HOME" />
        {alertMessage && (
          <AlertMessage
            message={alertMessage}
            type={alertType}
            onClose={() => setAlertMessage(null)}
          />
        )}
        <h1 className={styles.recipeTitle}>{recipe.title}</h1>
        <div className={styles.recipeInfo}>
          {nutritionLabel && (
            <div
              className={styles.nutritionWidgetContainer}
              dangerouslySetInnerHTML={{ __html: nutritionLabel }}
            />
          )}
          <div className={styles.recipeContent}>
            <img
              src={recipe.img_src}
              alt={recipe.img_alt}
              className={styles.recipeImage}
            />
            <h3 className={styles.recipeIngredientsTitle}>Ingredients:</h3>
            <ul className={styles.recipeIngredientList}>
              {recipe.ingredients.map((ingredient) => (
                <li
                  data-ingredient-id={ingredient.id}
                  key={`${ingredient.id}-${ingredient.name}`}
                >
                  {ingredient.measures.us.amount}{" "}
                  {ingredient.measures.us.unitShort} {ingredient.name}
                </li>
              ))}
            </ul>
            <h3 className={styles.recipeDirectionsTitle}>Directions:</h3>
            {recipe.directions.map((set, setIndex) => {
              const multipleSets = recipe.directions.length > 1;
              return multipleSets ? (
                <div
                  className={styles.recipeDirectionsList}
                  key={set.name || setIndex}
                >
                  <p>{set.name}</p>
                  <ol>
                    {set.steps.map((step) => (
                      <li key={`${set.name || setIndex}-${step.number}`}>
                        {step.step}
                      </li>
                    ))}
                  </ol>
                </div>
              ) : (
                <ol className={styles.recipeDirectionsList} key={-1}>
                  {set.steps.map((step) => (
                    <li key={`${set.name || setIndex}-${step.number}`}>
                      {step.step}
                    </li>
                  ))}
                </ol>
              );
            })}
            {recipe.sourceURL && (
              <p>
                Source:{" "}
                <a
                  href={recipe.sourceURL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {recipe.sourceURL}
                </a>
              </p>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
