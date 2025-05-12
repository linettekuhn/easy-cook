import { useEffect, useState } from "react";
import { Week } from "../../types";
import styles from "./DaySelection.module.css";
import DaySummary from "./DaySummary";

export default function DaySelection({ days }: Week) {
  const [selectedDay, setSelectedDay] = useState<number>(0);
  const [localWeek, setLocalWeek] = useState(days);

  const dayLabels = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  useEffect(() => setLocalWeek(days), [days]);

  return (
    <div className="plan-day">
      <div className={styles.days}>
        {dayLabels.map((label, i) => (
          <button
            className={styles.button}
            key={label}
            onClick={() => setSelectedDay(i)}
          >
            {label}{" "}
            <span className={styles.day}>{localWeek[i].date.getDate()}</span>
          </button>
        ))}
      </div>
      <div className="day-output">
        <DaySummary {...localWeek[selectedDay]} />
      </div>
    </div>
  );
}
