import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { IngredientData } from "../../types";
import SearchResults from "./SearchResults";

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
    <>
      <SearchBar setResults={setResults} />
      <SearchResults results={results} isLoading={loading} onSave={onSave} />
    </>
  );
}
