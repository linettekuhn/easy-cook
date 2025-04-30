export type Recipe = {
  id: number;
  card: HTMLElement;
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
  img_src: string;
  img_alt?: string;
  amount?: number;
  unit?: string;
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
  label?: string;
  value: string;
  isChecked: boolean;
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
