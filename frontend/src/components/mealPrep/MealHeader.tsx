type MealHeaderProps = {
  mealType: string;
  calories: number;
};

export default function MealHeader({ mealType, calories }: MealHeaderProps) {
  return (
    <div className={`${mealType.toLowerCase()}Header`}>
      <h2 className="bold italic">{mealType}</h2>
      <p>{calories} calories</p>
    </div>
  );
}
