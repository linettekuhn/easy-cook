import { ChangeEvent, useEffect, useState } from "react";
import { Day } from "../../types";

type WeekSelectionProps = {
  week: Day[];
  setWeek: (week: Day[]) => void;
};

export default function WeekSelection({ week, setWeek }: WeekSelectionProps) {
  const [localWeek, setLocalWeek] = useState(week);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => setLocalWeek(week), [week]);

  const handleDaySelect = (e: ChangeEvent<HTMLInputElement>) => {
    //yyyy-mm-dd
    const inputDate: string[] = e.target.value.split("-");
    const selectedDate = new Date(
      Number(inputDate[0]),
      Number(inputDate[1]) - 1,
      Number(inputDate[2])
    );
    const dayOfWeek = selectedDate.getDay();
    setSelectedIndex(dayOfWeek);
    const offset = dayOfWeek === 0 ? -6 : -dayOfWeek;
    const newWeek: Day[] = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(selectedDate);
      date.setDate(selectedDate.getDate() + offset + i);
      newWeek.push({ ...localWeek[i], date: date });
    }

    setWeek(newWeek);
  };
  return (
    <>
      <form>
        <label>
          select a date:
          <input
            type="date"
            name="selectedDate"
            onChange={handleDaySelect}
            value={localWeek[selectedIndex].date.toISOString().slice(0, 10)}
          />
        </label>
      </form>
      <div className="current-week">
        <h4>
          {localWeek[0].date.toDateString()} -----{" "}
          {localWeek[6].date.toDateString()}
        </h4>
      </div>
    </>
  );
}
