import { ChangeEvent, useEffect, useState } from "react";
import { Day } from "../../types";
import { getPreviousSunday } from "../../util/plannerHelper";
import styles from "./WeekSelection.module.css";

type WeekSelectionProps = {
  week: Day[];
  setWeek: (sunday: Date) => void;
  unsavedChanges: boolean;
};

export default function WeekSelection({
  week,
  setWeek,
  unsavedChanges,
}: WeekSelectionProps) {
  const [localWeek, setLocalWeek] = useState(week);
  const [dateValue, setDateValue] = useState("");
  useEffect(() => setLocalWeek(week), [week]);

  const setFormattedDateValue = (sunday: Date) => {
    const year = sunday.getFullYear();
    const month = sunday.getMonth() + 1;
    const day = sunday.getDate();
    // format for input value yyyy-mm-dd
    setDateValue(
      `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(
        2,
        "0"
      )}`
    );
  };

  const handleDaySelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (unsavedChanges) {
      const confirm = window.confirm(
        "You have unsaved changes on your week. Do you want to proceed?"
      );
      if (!confirm) {
        setFormattedDateValue(localWeek[0].date);
        return;
      }
    }
    const inputDate: string[] = e.target.value.split("-");
    const selectedDate = new Date(
      Number(inputDate[0]),
      Number(inputDate[1]) - 1,
      Number(inputDate[2])
    );
    const sunday = getPreviousSunday(selectedDate);
    setFormattedDateValue(sunday);
    setWeek(sunday);
  };

  return (
    <>
      <form className={styles.dateSelectForm}>
        <p>select a date:</p>
        <input
          type="date"
          name="selectedDate"
          value={dateValue}
          onChange={handleDaySelect}
        />
      </form>
      <p className={styles.selectedWeek}>
        {localWeek[0].date.toDateString()} — {localWeek[6].date.toDateString()}
      </p>
    </>
  );
}
