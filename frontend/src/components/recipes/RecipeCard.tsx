import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Recipe } from "../../types";
import styles from "./RecipeCard.module.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type RecipeCardProps = {
  recipe: Recipe;
  isSaved: boolean;
  onSave?: (recipe: Recipe) => void;
  onRemove?: (recipe: Recipe) => void;
};

export default function RecipeCard({
  recipe,
  isSaved,
  onSave,
  onRemove,
}: RecipeCardProps) {
  const [showPreview, setShowPreview] = useState(true);
  const [localIsSaved, setLocalIsSaved] = useState(isSaved);
  useEffect(() => {
    setLocalIsSaved(isSaved);
  }, [isSaved]);
  const caloriesNutrient = recipe.nutrients.find(
    (nutrient) => nutrient.name === "Calories"
  );

  const handleSaveClick = () => {
    setLocalIsSaved(true);
    if (onSave) {
      onSave(recipe);
    }
  };

  const handleRemoveClick = () => {
    setLocalIsSaved(false);
    if (onRemove) {
      onRemove(recipe);
    }
  };

  return (
    <div className={styles.recipeCard}>
      {localIsSaved ? (
        <button className={styles.saveButton} onClick={handleRemoveClick}>
          <FaHeart />
        </button>
      ) : (
        <button className={styles.saveButton} onClick={handleSaveClick}>
          <FaRegHeart />
        </button>
      )}
      <h4 className={styles.recipeTitle}>
        <Link
          to={`/recipe/${recipe.id === -1 ? recipe.sourceURL : recipe.id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {recipe.title}
        </Link>
      </h4>
      {showPreview ? (
        <div className={styles.recipeContent}>
          <div className={styles.recipeImage}>
            <img src={recipe.img_src} alt={recipe.img_alt} />
          </div>
          {caloriesNutrient ? (
            <p className={styles.calories}>
              Total calories: {Math.round(caloriesNutrient.amount)}{" "}
              {caloriesNutrient.unit}
            </p>
          ) : null}
          <button onClick={() => setShowPreview(!showPreview)}>see more</button>
        </div>
      ) : (
        <div className={styles.recipeContent}>
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
          <button onClick={() => setShowPreview(!showPreview)}>see less</button>
        </div>
      )}
    </div>
  );
}
