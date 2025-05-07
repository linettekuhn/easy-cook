export type RecipeData = {
  id: number;
  title: string;
  image: string;
  sourceUrl?: string;
  extendedIngredients: Ingredient[];
  analyzedInstructions: InstructionSet[];
};

export type Recipe = {
  id: number;
  title: string;
  img_src: string;
  img_alt?: string;
  ingredients: Ingredient[];
  directions: InstructionSet[];
  sourceURL?: string;
};

export type Ingredient = {
  id: number;
  name: string;
  image: string;
  measures: {
    us: {
      amount: number;
      unitShort: string;
    };
  };
};

export type Instruction = {
  number: number;
  step: string;
};

export type InstructionSet = {
  name: string;
  steps: Instruction[];
};

export type Filter = {
  label: string;
  value: string;
  isChecked: boolean;
  onChange?: (label: string, value: string) => void;
};

export type Filters = {
  filters: Filter[];
  setFilters: (filters: Filter[]) => void;
  onCancel: () => void;
  onApply: () => void;
};

export type SavedRecipes = {
  recipes: Recipe[];
};

export type SavedFilters = {
  filters: Filter[];
};

export type Day = {
  date: Date;
  calories: number;
  html: HTMLElement;
  breakfastRecipes: Recipe[];
  lunchRecipes: Recipe[];
  dinnerRecipes: Recipe[];
};

export type Week = {
  selectedDay: Day;
  days: Day[];
};
