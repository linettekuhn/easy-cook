import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { IngredientData } from "../../types";
import SearchResults from "./SearchResults";
import styles from "./AutocompleteIngredientSearch.module.css";

type AutocompleteIngredientSearchProps = {
  onSave: (ingredient: IngredientData) => void;
  setAlertMessage: (message: string | null) => void;
  setAlertType: (type: "error" | "warning" | "success") => void;
};
export default function AutocompleteIngredientSearch({
  onSave,
  setAlertMessage,
  setAlertType,
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
      <SearchBar
        setResults={setResults}
        setAlertMessage={setAlertMessage}
        setAlertType={setAlertType}
      />
      <SearchResults results={results} isLoading={loading} onSave={onSave} />
    </div>
  );
}
