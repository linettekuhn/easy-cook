import { useState } from "react";
import FiltersModal from "./FiltersModal";
import { Filter, Recipe } from "../../types";
import {
  fetchQueryRecipes,
  fetchRecipeInfo,
  fetchWebsiteRecipe,
} from "../../api/spoonacular";
import parseRecipeData from "../../util/parseRecipeData";
import styles from "./RecipeLookupForm.module.css";
import NumberInput from "../NumberInput";

const defaultFilters: Filter[] = [
  { label: "quick", value: "maxReadyTime=30", isChecked: false },
  { label: "high_protein", value: "minProtein=20", isChecked: false },
  { label: "vegetarian", value: "diet=vegetarian", isChecked: false },
  { label: "vegan", value: "diet=vegan", isChecked: false },
  { label: "no_dairy", value: "intolerances=dairy", isChecked: false },
  { label: "no_gluten", value: "intolerances=gluten", isChecked: false },
];

type RecipeLookupProps = {
  onFoundRecipes: (recipes: Recipe[]) => void;
};

export default function RecipeLookupForm({
  onFoundRecipes,
}: RecipeLookupProps) {
  const [filters, setFilters] = useState(defaultFilters);
  const [queryInput, setQueryInput] = useState("");
  const [websiteInput, setWebsiteInput] = useState("");
  const [quantity, setQuantity] = useState(10);

  const handleFiltersUpdate = (newFilters: Filter[]) => {
    setFilters(newFilters);
  };

  const handleWebsiteSubmit = async () => {
    if (!websiteInput) {
      alert("Please enter a recipe query");
      return;
    }

    const recipeData = await fetchWebsiteRecipe(websiteInput);

    const recipes = [];
    if (recipeData) {
      const recipe: Recipe = parseRecipeData(recipeData, -1, websiteInput);
      recipes.push(recipe);
    }

    onFoundRecipes(recipes);
  };

  const handleQuerySubmit = async () => {
    if (!queryInput) {
      alert("Please enter a recipe query");
      return;
    }

    const response = await fetchQueryRecipes(queryInput, quantity, filters);

    const results = response.results;
    console.log(results);

    const recipes = [];
    for (let i = 0; i < results.length; i++) {
      const id = results[i].id;
      const recipeData = await fetchRecipeInfo(id);
      const recipe: Recipe = recipeData.directions
        ? recipeData
        : parseRecipeData(recipeData, id);
      recipes.push(recipe);
    }
    onFoundRecipes(recipes);
  };

  return (
    <div className={styles.recipeLookup}>
      <form action="" className={styles.recipe} id="website">
        <h4>extract recipes from website:</h4>
        <input
          type="url"
          id="recipe-website"
          value={websiteInput}
          required
          onChange={(e) => {
            setWebsiteInput(e.target.value);
          }}
          placeholder="enter a recipe's website..."
        />
        <button className="button" type="button" onClick={handleWebsiteSubmit}>
          submit
        </button>
      </form>
      <form action="" className={styles.recipe} id="query">
        <h4>or search for one:</h4>
        <div className={styles.recipeSearch}>
          <input
            type="text"
            id="recipe-query"
            required
            onChange={(e) => {
              setQueryInput(e.target.value);
            }}
            placeholder="enter your query..."
          />
          <FiltersModal filters={filters} setFilters={handleFiltersUpdate} />
        </div>
        <div className={styles.recipeQuantity}>
          <h4>how many recipes?</h4>
          <NumberInput setQuantity={setQuantity} quantity={quantity} />
        </div>
        <button className="button" type="button" onClick={handleQuerySubmit}>
          search
        </button>
      </form>
    </div>
  );
}
