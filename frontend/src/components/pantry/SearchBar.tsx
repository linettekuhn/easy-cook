import { useEffect, useState } from "react";
import { fetchAutocompleteIngredient } from "../../api/spoonacular";
import { IngredientData } from "../../types";
import ErrorMessage from "../ErrorMessage";

type SearchBarProps = {
  setResults: (data: IngredientData[]) => void;
};
export default function SearchBar({ setResults }: SearchBarProps) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [debouncedInput, setDebouncedInput] = useState(input);

  useEffect(() => {
    // set debounced input if 500 ms pass with no user input
    const timer = setTimeout(() => {
      setDebouncedInput(input);
    }, 1000);

    // reset timer if input changes
    return () => clearTimeout(timer);
  }, [input]);

  // fetch autocomplete results from spoonacular
  useEffect(() => {
    if (debouncedInput.trim() === "") {
      setResults([]);
      return;
    }

    const fetchData = async () => {
      try {
        const data: IngredientData[] = await fetchAutocompleteIngredient(
          debouncedInput
        );
        setResults(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        }
      }
    };

    fetchData();
  }, [debouncedInput, setResults]);

  return (
    <>
      {errorMessage && (
        <ErrorMessage
          message={errorMessage}
          onClose={() => setErrorMessage(null)}
        />
      )}
      <input
        type="text"
        placeholder="type to search ingredients..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="textBox"
      />
    </>
  );
}
