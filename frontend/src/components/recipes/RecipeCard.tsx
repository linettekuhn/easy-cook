import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Recipe } from "../../types";
import styles from "./RecipeCard.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import MoreButton from "../buttons/ForwardButton";
import BackButton from "../buttons/BackButton";

type RecipeCardProps = {
  recipe: Recipe;
  isSaved?: boolean;
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
  const [localIsSaved, setLocalIsSaved] = useState<boolean>(!!isSaved);
  useEffect(() => {
    if (isSaved !== localIsSaved) {
      setLocalIsSaved(!!isSaved);
    }
  }, [isSaved, localIsSaved]);
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

  const navigate = useNavigate();

  return (
    <div className={styles.recipeCard}>
      <motion.div
        className={styles.cardInner}
        animate={{ rotateY: showPreview ? 0 : 180 }}
        transition={{ duration: 0.2 }}
      >
        <div className={`${styles.cardFace} ${styles.front}`}>
          {onSave || onRemove ? (
            localIsSaved ? (
              <motion.button
                initial={{ x: "-15%", y: "-15%" }}
                whileHover={{ scale: 1.1, rotate: -15 }}
                whileTap={{ scale: 0.9 }}
                className={styles.saveButton}
                onClick={handleRemoveClick}
                title="Click to remove from saved recipes"
              >
                <FaHeart />
              </motion.button>
            ) : (
              <motion.button
                initial={{ x: "-15%", y: "-15%" }}
                whileHover={{ scale: 1.1, rotate: -15 }}
                whileTap={{ scale: 0.9 }}
                className={styles.saveButton}
                onClick={handleSaveClick}
                title="Click to add to saved recipes"
              >
                <FaRegHeart />
              </motion.button>
            )
          ) : null}

          <h4 className={styles.recipeTitle}>
            <motion.a
              whileHover={{ scale: 1.1 }}
              onClick={() =>
                navigate(
                  recipe.id === -1
                    ? `/recipe?sourceURL=${encodeURIComponent(
                        recipe.sourceURL ? recipe.sourceURL : ""
                      )}`
                    : `/recipe/${recipe.id}`
                )
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              {recipe.title}
            </motion.a>
          </h4>

          <p className={`italic ${styles.readyTime}`}>
            Ready in {recipe.readyInMinutes} minutes
          </p>

          {caloriesNutrient ? (
            <p className={styles.calories}>
              Total calories: {Math.round(caloriesNutrient.amount)}{" "}
              {caloriesNutrient.unit}
            </p>
          ) : null}

          <div className={styles.imageWrapper}>
            <img
              className={styles.topTape}
              src="/images/scotch-tape.png"
              alt="strip of tape"
            />
            <div className={styles.recipeImage}>
              <img
                className={styles.image}
                src={recipe.img_src}
                alt={recipe.img_alt}
              />
            </div>
            <img
              className={styles.bottomTape}
              src="/images/scotch-tape.png"
              alt="strip of tape"
            />
          </div>

          <MoreButton
            className={styles.previewBtn}
            text="SEE INSTRUCTIONS"
            onClick={() => setShowPreview(!showPreview)}
          />
        </div>
        <div className={`${styles.cardFace} ${styles.back}`}>
          {onSave || onRemove ? (
            localIsSaved ? (
              <motion.button
                initial={{ x: "15%", y: "-15%" }}
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
                className={styles.saveButton}
                onClick={handleRemoveClick}
                title="Click to remove from saved recipes"
              >
                <FaHeart />
              </motion.button>
            ) : (
              <motion.button
                initial={{ x: "15%", y: "-15%" }}
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
                className={styles.saveButton}
                onClick={handleSaveClick}
                title="Click to add to saved recipes"
              >
                <FaRegHeart />
              </motion.button>
            )
          ) : null}

          <h4 className={styles.recipeIngredientsTitle}>Ingredients:</h4>
          <ul className={styles.recipeIngredientsList}>
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

          {recipe.directions.length > 0 && (
            <h4 className={styles.recipeDirectionsTitle}>Directions:</h4>
          )}
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
          <BackButton
            className={styles.previewBtn}
            text="SEE LESS"
            onClick={() => setShowPreview(!showPreview)}
          />
        </div>
      </motion.div>
    </div>
  );
}
