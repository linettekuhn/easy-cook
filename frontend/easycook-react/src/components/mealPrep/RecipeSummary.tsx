import { Recipe } from "../../types";
import styles from "./RecipeSummary.module.css";

type RecipeSummaryProps = {
  recipe: Recipe;
};

export default function RecipeSummary({ recipe }: RecipeSummaryProps) {
  return (
    <div
      className={styles.recipeSummary}
      data-recipe-id={recipe.id}
      data-recipe-url={recipe.sourceURL}
    >
      <h3 className={styles.recipeTitle}>{recipe.title}</h3>
      <img
        src={recipe.img_src}
        alt={recipe.img_alt}
        className={styles.recipeImage}
      />
      <h4 className="recipeCalorieCount"></h4>
      <button className="button">See Full Recipe</button>
    </div>
  );
}
