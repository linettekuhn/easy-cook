import { Recipe } from "../../types";
import styles from "./RecipeCard.module.css";

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
  const caloriesNutrient = recipe.nutrients.find(
    (nutrient) => nutrient.name === "Calories"
  );

  const handleSaveClick = () => {
    if (onSave) {
      onSave(recipe);
    }
  };

  const handleRemoveClick = () => {
    if (onRemove) {
      onRemove(recipe);
    }
  };

  return (
    <div
      className={styles.recipeCard}
      data-recipe-id={recipe.id}
      data-recipe-url={recipe.sourceURL}
    >
      <h3 className={styles.recipeTitle}>{recipe.title}</h3>
      <img
        src={recipe.img_src}
        alt={recipe.img_alt}
        className={styles.recipeImage}
      />
      <h5 className={styles.calories}>
        Total calories:{" "}
        {caloriesNutrient
          ? `${caloriesNutrient.amount} ${caloriesNutrient.unit}`
          : "Calories were not found"}
      </h5>
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
      {isSaved ? (
        <button className="button" onClick={handleRemoveClick}>
          Remove from Favorites
        </button>
      ) : (
        <button className="button" onClick={handleSaveClick}>
          Save to Favorites
        </button>
      )}
    </div>
  );
}
