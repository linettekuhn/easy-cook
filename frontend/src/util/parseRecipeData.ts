import {
  Ingredient,
  Instruction,
  InstructionSet,
  Nutrient,
  Recipe,
  RecipeData,
} from "../types";

export default function buildRecipeObject(
  recipeData: RecipeData,
  id: number,
  sourceURL?: string
): Recipe {
  const parseIngredients: Ingredient[] = [];

  recipeData.extendedIngredients.forEach((ingredient: Ingredient) => {
    // TODO measure trigger
    const quantity = ingredient.measures.us;
    if (ingredient.id !== -1) {
      if (!parseIngredients.some((item) => item.id === ingredient.id)) {
        parseIngredients.push({
          id: ingredient.id,
          name: ingredient.name,
          image: ingredient.image,
          measures: {
            us: {
              amount: quantity.amount,
              unitShort: quantity.unitShort,
            },
          },
        });
      }
    }
  });
  const parseDirections: InstructionSet[] = [];

  recipeData.analyzedInstructions.forEach((set: InstructionSet) => {
    const instructionSet = {
      name: set.name,
      steps: set.steps.map((instrution: Instruction) => ({
        number: instrution.number,
        step: instrution.step,
      })),
    };
    parseDirections.push(instructionSet);
  });

  const parseNutrients: Nutrient[] = [];
  if (recipeData.nutrition) {
    recipeData.nutrition.nutrients.forEach((nutrient: Nutrient) => {
      const myNutrient: Nutrient = {
        amount: nutrient.amount,
        name: nutrient.name,
        unit: nutrient.unit,
      };
      parseNutrients.push(myNutrient);
    });
  }

  return {
    id: id,
    title: recipeData.title,
    img_src: recipeData.image,
    img_alt: recipeData.title,
    ingredients: parseIngredients,
    directions: parseDirections,
    nutrients: parseNutrients || undefined,
    servingSize: recipeData.nutrition.weightPerServing || undefined,
    sourceURL: sourceURL,
  };
}
