import { useState } from "react";
import { Week } from "../../types";
import styles from "./DaySelection.module.css";
import DaySummary from "./DaySummary";

export default function DaySelection({ days }: Week) {
  const [selectedDay, setSelectedDay] = useState<number>(0);
  const dayLabels = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  return (
    <div className="plan-day">
      <div className={styles.days}>
        {dayLabels.map((label, i) => (
          <button
            className={styles.button}
            key={label}
            onClick={() => setSelectedDay(i)}
          >
            {label} <span className={styles.day}>{days[i].date.getDate()}</span>
          </button>
        ))}
      </div>
      <div className="day-output hidden">
        <DaySummary {...days[selectedDay]} />
      </div>
    </div>
  );
}
