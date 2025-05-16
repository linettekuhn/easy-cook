import { IngredientData } from "../../types";

type SearchResultsProps = {
  results: IngredientData[];
  isLoading: boolean;
  onSave: (ingredient: IngredientData) => void;
};

export default function SearchResults({
  results,
  isLoading,
  onSave,
}: SearchResultsProps) {
  return (
    <div className="searchResultsOutput">
      {isLoading
        ? null
        : results.map((result) => {
            return (
              <div
                className="searchResult"
                key={result.id}
                onClick={() => onSave(result)}
              >
                {result.name}
              </div>
            );
          })}
    </div>
  );
}
