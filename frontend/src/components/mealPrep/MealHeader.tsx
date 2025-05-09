type MealHeaderProps = {
  mealType: string;
  calories: number;
};

export default function MealHeader({ mealType, calories }: MealHeaderProps) {
  return (
    <div className={`${mealType.toLowerCase()}Header`}>
      <h2 className="bold italic">{mealType}</h2>
      <p>{calories} calories</p>
      <button className="button" data-id={`add-${mealType.toLowerCase()}-btn`}>
        +
      </button>
    </div>
  );
}
