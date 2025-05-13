import { ChangeEvent, useEffect, useState } from "react";
import { Day } from "../../types";
import { getPreviousSunday } from "../../util/plannerHelper";

type WeekSelectionProps = {
  week: Day[];
  setWeek: (sunday: Date) => void;
};

export default function WeekSelection({ week, setWeek }: WeekSelectionProps) {
  const [localWeek, setLocalWeek] = useState(week);
  useEffect(() => setLocalWeek(week), [week]);

  const handleDaySelect = (e: ChangeEvent<HTMLInputElement>) => {
    const inputDate: string[] = e.target.value.split("-");
    const selectedDate = new Date(
      Number(inputDate[0]),
      Number(inputDate[1]) - 1,
      Number(inputDate[2])
    );
    const sunday = getPreviousSunday(selectedDate);
    setWeek(sunday);
  };

  return (
    <>
      <form>
        <label>
          select a date:
          <input type="date" name="selectedDate" onChange={handleDaySelect} />
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
