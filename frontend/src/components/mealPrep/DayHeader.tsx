type DayHeaderProps = {
  date: Date;
  totalCalories: number;
};

export function DayHeader({ date, totalCalories }: DayHeaderProps) {
  return (
    <div className="dayHeader">
      <h3 className="selectedDate">{date.toDateString()}</h3>
      {totalCalories > 0 && (
        <h4>
          total calories: <span className="totalCalories">{totalCalories}</span>
        </h4>
      )}
    </div>
  );
}
