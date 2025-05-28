import { useEffect, useRef, useState } from "react";
import DaySelection from "../components/mealPrep/DaySelection";
import Header from "../components/mealPrep/Header";
import WeekSelection from "../components/mealPrep/WeekSelection";
import { Day } from "../types";
import { fetchSavedWeek, saveWeek } from "../api/firestore";
import { buildEmptyWeek, getPreviousSunday } from "../util/plannerHelper";
import NavigationBar from "../components/NavigationBar";
import styles from "./MealPrep.module.css";
import ErrorMessage from "../components/ErrorMessage";

export default function MealPrep() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [week, setWeek] = useState<Day[]>([]);
  const [loading, setLoading] = useState(true);
  const [localWeek, setLocalWeek] = useState<Day[]>([]);

  const handleWeekChange = async (sunday: Date) => {
    try {
      const savedWeek = await fetchSavedWeek(sunday);
      setWeek(savedWeek);
      setLocalWeek(savedWeek);
    } catch (error) {
      buildEmptyWeek(sunday);
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    }
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
      try {
        const savedWeek = await fetchSavedWeek(defaultSunday);
        setWeek(savedWeek);
        setLocalWeek(savedWeek);
      } catch (error) {
        buildEmptyWeek(defaultSunday);
        if (error instanceof Error) {
          setErrorMessage(error.message);
        }
      }
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
        {errorMessage && (
          <ErrorMessage
            message={errorMessage}
            onClose={() => setErrorMessage(null)}
          />
        )}
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
