import { Filter, Filters } from "../../types.ts";
import { useState, useEffect } from "react";
import styles from "./SearchFilters.module.css";
import DefaultButton from "../buttons/DefaultButton.tsx";

export default function SearchFilters({
  filters,
  setFilters,
  onCancel,
  onApply,
}: Filters) {
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => setLocalFilters(filters), [filters]);

  const handleCheckBoxChange = (label: string, value: string) => {
    const newFilters: Filter[] = localFilters.map((filter) => {
      if (filter.label === label && filter.value === value) {
        return { ...filter, isChecked: !filter.isChecked };
      } else {
        return filter;
      }
    });
    setLocalFilters(newFilters);
  };

  const handleClear = () => {
    const clearedFilters = localFilters.map((filter) => ({
      ...filter,
      isChecked: false,
    }));
    setLocalFilters(clearedFilters);
  };
  const handleApply = () => {
    setFilters(localFilters);
    onApply();
  };

  const handleCancel = () => {
    setLocalFilters(filters);
    onCancel();
  };
  return (
    <div className={styles.filtersModal} onClick={onCancel}>
      <div
        className={styles.filtersContent}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>
          <span className="bold">filter</span> your search
        </h2>
        <div id={styles.filtersForm}>
          {localFilters.map((filter) => (
            <label key={filter.label}>
              <input
                type="checkbox"
                name={filter.label}
                value={filter.value}
                checked={filter.isChecked}
                onChange={() =>
                  handleCheckBoxChange(filter.label, filter.value)
                }
              />
              {filter.label.replace(/_/g, " ")}
            </label>
          ))}
        </div>
        <DefaultButton type="button" onClick={handleClear}>
          clear
        </DefaultButton>
        <div className={styles.buttons}>
          <DefaultButton type="button" onClick={handleApply}>
            apply
          </DefaultButton>
          <DefaultButton type="button" onClick={handleCancel}>
            cancel
          </DefaultButton>
        </div>
      </div>
    </div>
  );
}
