import { useEffect, useState } from "react";
import { fetchAutocompleteIngredient } from "../../api/spoonacular";
import { IngredientData } from "../../types";

type SearchBarProps = {
  setResults: (data: IngredientData[]) => void;
  setAlertMessage: (message: string | null) => void;
  setAlertType: (type: "error" | "warning" | "success") => void;
};
export default function SearchBar({
  setResults,
  setAlertMessage,
  setAlertType,
}: SearchBarProps) {
  const [input, setInput] = useState("");
  const [debouncedInput, setDebouncedInput] = useState(input);

  useEffect(() => {
    // set debounced input if 1000 ms pass with no user input
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
          setAlertMessage(error.message);
          setAlertType("error");
        }
      }
    };

    fetchData();
  }, [debouncedInput, setResults, setAlertMessage, setAlertType]);

  return (
    <>
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
