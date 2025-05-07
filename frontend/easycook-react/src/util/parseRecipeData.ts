import {
  Ingredient,
  Instruction,
  InstructionSet,
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

  return {
    id: id,
    title: recipeData.title,
    img_src: recipeData.image,
    img_alt: recipeData.title,
    ingredients: parseIngredients,
    directions: parseDirections,
    sourceURL: sourceURL,
  };
}
