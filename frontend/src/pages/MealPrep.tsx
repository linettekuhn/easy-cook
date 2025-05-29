import { useEffect, useRef, useState } from "react";
import DaySelection from "../components/mealPrep/DaySelection";
import Header from "../components/mealPrep/Header";
import WeekSelection from "../components/mealPrep/WeekSelection";
import { Day } from "../types";
import { fetchSavedWeek, saveWeek } from "../api/firestore";
import { buildEmptyWeek, getPreviousSunday } from "../util/plannerHelper";
import NavigationBar from "../components/NavigationBar";
import styles from "./MealPrep.module.css";
import AlertMessage from "../components/AlertMessage";

export default function MealPrep() {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"error" | "warning" | "success">(
    "error"
  );
  const [week, setWeek] = useState<Day[]>([]);
  const [loading, setLoading] = useState(true);
  const [localWeek, setLocalWeek] = useState<Day[]>([]);
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const handleWeekChange = async (sunday: Date) => {
    try {
      const savedWeek = await fetchSavedWeek(sunday);
      setUnsavedChanges(false);
      setWeek(savedWeek);
      setLocalWeek(savedWeek);
      setAlertMessage("Loaded week!");
      setAlertType("success");
    } catch (error) {
      const defaultWeek = buildEmptyWeek(sunday);
      setWeek(defaultWeek);
      setLocalWeek(defaultWeek);
      if (error instanceof Error) {
        setAlertMessage("Loaded empty week");
        setAlertType("warning");
      }
    }
  };

  const handleLocalWeekUpdate = (updatedWeek: Day[]) => {
    setLocalWeek(updatedWeek);
    setUnsavedChanges(true);
  };

  const handleSaveWeek = async () => {
    try {
      await saveWeek(localWeek);
      setWeek(localWeek);
      setUnsavedChanges(false);
      setAlertMessage("Your week's meal plan was saved!");
      setAlertType("success");
    } catch (error) {
      if (error instanceof Error) {
        setAlertMessage("Could not save week");
        setAlertType("error");
      }
    }
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
        setAlertMessage("Loaded week!");
        setAlertType("success");
      } catch (error) {
        const defaultWeek = buildEmptyWeek(defaultSunday);
        setWeek(defaultWeek);
        setLocalWeek(defaultWeek);
        if (error instanceof Error) {
          setAlertMessage("Loaded empty week");
          setAlertType("warning");
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
        {alertMessage && (
          <AlertMessage
            message={alertMessage}
            type={alertType}
            onClose={() => setAlertMessage(null)}
          />
        )}
        {loading ? (
          <p>Loading your week...</p>
        ) : (
          <div className={styles.planner}>
            <WeekSelection
              week={week}
              setWeek={handleWeekChange}
              unsavedChanges={unsavedChanges}
            />
            <button className="button" onClick={handleSaveWeek}>
              Save Week
            </button>
            <DaySelection
              week={localWeek}
              onWeekUpdated={handleLocalWeekUpdate}
              setAlertMessage={setAlertMessage}
              setAlertType={setAlertType}
            />
          </div>
        )}
      </main>
    </>
  );
}
