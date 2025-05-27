import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { IngredientData } from "../../types";
import SearchResults from "./SearchResults";
import styles from "./AutocompleteIngredientSearch.module.css";

type AutocompleteIngredientSearchProps = {
  onSave: (ingredient: IngredientData) => void;
};
export default function AutocompleteIngredientSearch({
  onSave,
}: AutocompleteIngredientSearchProps) {
  const [results, setResults] = useState<IngredientData[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (results.length > 0) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [results]);
  return (
    <div className={styles.ingredientSearchBar}>
      <h3>
        <span className="bold">add</span> ingredients
      </h3>
      <SearchBar setResults={setResults} />
      <SearchResults results={results} isLoading={loading} onSave={onSave} />
    </div>
  );
}
