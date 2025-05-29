import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

export default function FullRecipe() {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"error" | "warning" | "success">(
    "error"
  );
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [nutritionLabel, setNutritionLabel] = useState<string | null>(null);

  useEffect(() => {
    const loadRecipe = async () => {
      setLoading(true);

      if (id) {
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
              return;
            }
          }
        } catch (error: unknown) {
          if (error instanceof Error) {
            setAlertMessage(error.message);
            setAlertType("error");
          }
          // try fetching website
          try {
            const recipeData = await fetchWebsiteRecipe(id);
            if (recipeData) {
              const recipe = buildRecipeObject(recipeData, -1, id);
              setRecipe(recipe);
              setLoading(false);
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
        }
      } else {
        setLoading(false);
      }
    };

    loadRecipe();
  }, [id]);

  if (loading) {
    return <div>Loading recipe...</div>;
  }

  if (!recipe) {
    return <div>Recipe not found.</div>;
  }

  return (
    <>
      <NavigationBar theme="blue" />
      <main data-theme="blue">
        {alertMessage && (
          <AlertMessage
            message={alertMessage}
            type={alertType}
            onClose={() => setAlertMessage(null)}
          />
        )}
        <div data-recipe-id={recipe.id} data-recipe-url={recipe.sourceURL}>
          <h3 className={styles.recipeTitle}>{recipe.title}</h3>
          <img
            src={recipe.img_src}
            alt={recipe.img_alt}
            className={styles.recipeImage}
          />
          {nutritionLabel && (
            <div
              className={styles.nutritionWidgetContainer}
              dangerouslySetInnerHTML={{ __html: nutritionLabel }}
            />
          )}
          <h4 className={styles.recipeIngredientsTitle}>Ingredients:</h4>
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
          <h4 className={styles.recipeDirectionsTitle}>Directions:</h4>
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
      </main>
    </>
  );
}
