import { useState } from "react";
import FiltersModal from "./FiltersModal";
import FoundRecipes from "./FoundRecipes";
import { Filter, Recipe } from "../../types";
import {
  fetchQueryRecipes,
  fetchRecipeInfo,
  fetchWebsiteRecipe,
} from "../../api/spoonacular";
import parseRecipeData from "../../util/parseRecipeData";

const defaultFilters: Filter[] = [
  { label: "quick", value: "maxReadyTime=30", isChecked: false },
  { label: "high_protein", value: "minProtein=20", isChecked: false },
  { label: "vegetarian", value: "diet=vegetarian", isChecked: false },
  { label: "vegan", value: "diet=vegan", isChecked: false },
  { label: "no_dairy", value: "intolerances=dairy", isChecked: false },
  { label: "no_gluten", value: "intolerances=gluten", isChecked: false },
];

type RecipeLookupProps = {
  onRecipeSave: (recipe: Recipe) => void;
};

export default function RecipeLookupForm({ onRecipeSave }: RecipeLookupProps) {
  const [foundRecipes, setFoundRecipes] = useState<Recipe[]>([]);
  const [filters, setFilters] = useState(defaultFilters);
  const [queryInput, setQueryInput] = useState("");
  const [websiteInput, setWebsiteInput] = useState("");
  const [quantity, setQuantity] = useState(10);
  const [hidden, setHidden] = useState(true);

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

    setFoundRecipes(recipes);
    setHidden(false);
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
      const recipe: Recipe = parseRecipeData(recipeData, id);
      recipes.push(recipe);
    }
    setFoundRecipes(recipes);
    setHidden(false);
  };

  return (
    <div className="recipe-lookup">
      <form action="" className="recipe" id="website">
        <label htmlFor="recipe-website">extract recipes from website:</label>
        <input
          type="url"
          id="recipe-website"
          value={websiteInput}
          required
          onChange={(e) => {
            setWebsiteInput(e.target.value);
          }}
        />
        <button
          className="button"
          type="button"
          data-id="website-submit-btn"
          onClick={handleWebsiteSubmit}
        >
          submit website
        </button>
      </form>
      <form action="" className="recipe" id="query">
        <label htmlFor="recipe-query">or search for one:</label>
        <input
          type="text"
          id="recipe-query"
          data-id="recipe-query"
          required
          //value={queryInput}
          onChange={(e) => {
            setQueryInput(e.target.value);
          }}
        />
        <label htmlFor="recipe-query-quantity">how many recipes?</label>
        <input
          type="number"
          id="recipe-query-quantity"
          value={quantity}
          onChange={(e) => {
            setQuantity(Number(e.target.value));
          }}
          min="1"
          max="100"
          placeholder="10"
          required
        />
        <FiltersModal filters={filters} setFilters={handleFiltersUpdate} />
        <button
          className="button"
          type="button"
          data-id="query-submit-btn"
          onClick={handleQuerySubmit}
        >
          submit query
        </button>
      </form>
      {!hidden && <FoundRecipes recipes={foundRecipes} onSave={onRecipeSave} />}
    </div>
  );
}
