import { useEffect, useState } from "react";
import SearchFilters from "./SearchFilters";
import { Filter } from "../../types";

type FilterModalProps = {
  filters: Filter[];
  setFilters: (filters: Filter[]) => void;
};

export default function FiltersModal({
  filters,
  setFilters,
}: FilterModalProps) {
  const [localFilters, setLocalFilters] = useState(filters);
  const [hidden, setHidden] = useState(true);

  useEffect(() => setLocalFilters(filters), [filters]);

  return (
    <>
      <button className="button" type="button" onClick={() => setHidden(false)}>
        filters
      </button>
      {!hidden ? (
        <SearchFilters
          filters={localFilters}
          setFilters={setFilters}
          onCancel={() => setHidden(true)}
          onApply={() => setHidden(true)}
        />
      ) : null}
    </>
  );
}
