type DayHeaderProps = {
  date: Date;
  totalCalories: number;
};

export function DayHeader({ date, totalCalories }: DayHeaderProps) {
  return (
    <div className="dayHeader">
      <h2 className="selectedDate">{date.toDateString()}</h2>
      <h3>
        total calories: <span className="totalCalories">{totalCalories}</span>
      </h3>
    </div>
  );
}
