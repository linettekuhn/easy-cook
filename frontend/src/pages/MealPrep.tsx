import { useEffect, useRef, useState } from "react";
import DaySelection from "../components/mealPrep/DaySelection";
import Header from "../components/mealPrep/Header";
import WeekSelection from "../components/mealPrep/WeekSelection";
import { Day } from "../types";
import { fetchSavedWeek, saveWeek } from "../api/firestore";
import { getPreviousSunday } from "../util/plannerHelper";
import NavigationBar from "../components/NavigationBar";
import styles from "./MealPrep.module.css";

export default function MealPrep() {
  const [week, setWeek] = useState<Day[]>([]);
  const [loading, setLoading] = useState(true);
  const [localWeek, setLocalWeek] = useState<Day[]>([]);

  const handleWeekChange = async (sunday: Date) => {
    const savedWeek = await fetchSavedWeek(sunday);
    setWeek(savedWeek);
    setLocalWeek(savedWeek);
  };

  const handleLocalWeekUpdate = (updatedWeek: Day[]) => {
    setLocalWeek(updatedWeek);
  };

  const handleSaveWeek = async () => {
    await saveWeek(localWeek);
    setWeek(localWeek);
  };

  const loaded = useRef(false);
  useEffect(() => {
    const loadDefaultWeek = async () => {
      if (loaded.current) return;
      loaded.current = true;
      const defaultSunday = getPreviousSunday(new Date());
      const savedWeek = await fetchSavedWeek(defaultSunday);
      setWeek(savedWeek);
      setLocalWeek(savedWeek);
    };

    loadDefaultWeek();
  }, []);

  // set loading to false once week loaded
  useEffect(() => {
    if (week.length > 0) {
      setLoading(false);
    }
  }, [week]);

  return (
    <>
      <NavigationBar theme="green" />
      <main data-theme="green">
        <Header />
        {loading ? (
          <p>Loading your week...</p>
        ) : (
          <div className={styles.planner}>
            <WeekSelection week={week} setWeek={handleWeekChange} />
            <button className="button" onClick={handleSaveWeek}>
              Save Week
            </button>
            <DaySelection
              week={localWeek}
              onWeekUpdated={handleLocalWeekUpdate}
            />
          </div>
        )}
      </main>
    </>
  );
}
