import { useEffect, useRef, useState } from "react";
import DaySelection from "../components/mealPrep/DaySelection";
import Header from "../components/mealPrep/Header";
import WeekSelection from "../components/mealPrep/WeekSelection";
import { Day } from "../types";
import { fetchSavedWeek, saveWeek } from "../api/firestore";
import { buildEmptyWeek, getPreviousSunday } from "../util/plannerHelper";
import styles from "./MealPrep.module.css";
import AlertMessage from "../components/AlertMessage";
import DefaultButton from "../components/buttons/DefaultButton";
import FadeInStaggerParent from "../components/animations/FadeInStaggerParent";
import FadeInStaggerChild from "../components/animations/FadeInStaggerChild";

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
    <FadeInStaggerParent data-theme="green">
      <FadeInStaggerChild>
        <Header />
      </FadeInStaggerChild>
      {alertMessage && (
        <AlertMessage
          message={alertMessage}
          type={alertType}
          onClose={() => setAlertMessage(null)}
        />
      )}
      {loading ? (
        <FadeInStaggerChild>
          <p>Loading your week...</p>
        </FadeInStaggerChild>
      ) : (
        <div className={styles.planner}>
          <FadeInStaggerChild>
            <WeekSelection
              week={week}
              setWeek={handleWeekChange}
              unsavedChanges={unsavedChanges}
            />
          </FadeInStaggerChild>
          <FadeInStaggerChild>
            <DefaultButton onClick={handleSaveWeek}>Save Week</DefaultButton>
          </FadeInStaggerChild>
          <FadeInStaggerChild>
            <DaySelection
              week={localWeek}
              onWeekUpdated={handleLocalWeekUpdate}
              setAlertMessage={setAlertMessage}
              setAlertType={setAlertType}
            />
          </FadeInStaggerChild>
        </div>
      )}
    </FadeInStaggerParent>
  );
}
