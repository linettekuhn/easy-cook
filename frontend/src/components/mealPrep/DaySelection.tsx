import { useEffect, useState } from "react";
import { Day } from "../../types";
import styles from "./DaySelection.module.css";
import DaySummary from "./DaySummary";

type DaySelectionProps = {
  week: Day[];
  onWeekUpdated: (week: Day[]) => void;
};

export default function DaySelection({
  week,
  onWeekUpdated,
}: DaySelectionProps) {
  const [selectedDay, setSelectedDay] = useState<number>(0);
  const [localWeek, setLocalWeek] = useState(week);

  useEffect(() => {
    setLocalWeek(week);
  }, [week]);

  const dayLabels = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const [localDay, setLocalDay] = useState<Day>(week[selectedDay]);

  // update localDay if localWeek or selectedDay changes
  useEffect(() => {
    if (localWeek && localWeek[selectedDay]) {
      setLocalDay(localWeek[selectedDay]);
    }
  }, [localWeek, selectedDay]);

  const handleDayUpdate = (newDay: Day) => {
    const dayIndex = localWeek.findIndex(
      (day) => day.date.getTime() === newDay.date.getTime()
    );
    if (dayIndex !== -1) {
      const updatedWeek = [
        ...localWeek.slice(0, dayIndex),
        newDay,
        ...localWeek.slice(dayIndex + 1),
      ];
      setLocalWeek(updatedWeek);
      onWeekUpdated(updatedWeek);
    }
  };

  return (
    <div className={styles.daySelection}>
      <div className={styles.days}>
        {dayLabels.map((label, i) => (
          <button
            className={`${styles.button} ${
              i === selectedDay ? styles.active : ""
            }`}
            key={label}
            onClick={() => setSelectedDay(i)}
            title={`Click to see day's meal plan`}
          >
            <p>
              {label}{" "}
              <span className={styles.day}>
                {localWeek[i]?.date?.getDate()}
              </span>
            </p>
          </button>
        ))}
      </div>
      {localDay && <DaySummary day={localDay} setDay={handleDayUpdate} />}
    </div>
  );
}
