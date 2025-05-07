import Header from "../components/recipes/Header";
import RecipeLookupForm from "../components/recipes/RecipeLookupForm";
import SavedRecipes from "../components/recipes/SavedRecipes";

function Recipes() {
  return (
    <>
      <main>
        <Header />
        <RecipeLookupForm />
        <SavedRecipes />

        <script src="../dist/recipes/recipe.js" type="module"></script>
      </main>
    </>
  );
}

export default Recipes;
