import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchRecipeInfo, fetchWebsiteRecipe } from "../api/spoonacular";
import { Nutrient, Recipe } from "../types";
import styles from "./FullRecipe.module.css";

export default function FullRecipe() {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [nutrients, setNutrients] = useState<Nutrient[] | null>(null);

  useEffect(() => {
    const loadRecipe = async () => {
      setLoading(true);

      // try fetching website
      if (id) {
        try {
          const recipeData = await fetchWebsiteRecipe(id);

          if (recipeData) {
            setRecipe(recipeData);
            setLoading(false);
            return;
          }
        } catch (error) {
          console.log("not valid website URL:", id, error);
        }
        // try fetching by id
        try {
          if (!isNaN(Number(id))) {
            const recipeData = await fetchRecipeInfo(Number(id));
            if (recipeData) {
              setNutrients(recipeData.nutrients);
              setRecipe(recipeData);
              setLoading(false);
              return;
            }
          }
          setLoading(false);
        } catch (error) {
          console.error("error fetching recipe info:", error);
          setLoading(false);
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
    <div data-recipe-id={recipe.id} data-recipe-url={recipe.sourceURL}>
      <h3 className={styles.recipeTitle}>{recipe.title}</h3>
      <img
        src={recipe.img_src}
        alt={recipe.img_alt}
        className={styles.recipeImage}
      />
      <h4 className={styles.recipeIngredientsTitle}>Ingredients:</h4>
      <ul className={styles.recipeIngredientList}>
        {recipe.ingredients.map((ingredient) => (
          <li
            data-ingredient-id={ingredient.id}
            key={`${ingredient.id}-${ingredient.name}`}
          >
            {ingredient.measures.us.amount} {ingredient.measures.us.unitShort}{" "}
            {ingredient.name}
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
            <h5>{set.name}</h5>
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
    </div>
  );
}
