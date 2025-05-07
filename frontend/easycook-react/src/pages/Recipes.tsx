import Header from "../components/recipes/Header";
import RecipeLookupForm from "../components/recipes/RecipeLookupForm";
import SavedRecipes from "../components/recipes/SavedRecipes";

export default function Recipes() {
  return (
    <>
      <main>
        <Header />
        <RecipeLookupForm />
        <SavedRecipes />
      </main>
    </>
  );
}
