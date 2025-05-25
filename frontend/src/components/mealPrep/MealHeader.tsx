type MealHeaderProps = {
  mealType: string;
  calories: number;
};

export default function MealHeader({ mealType, calories }: MealHeaderProps) {
  return (
    <div className={`${mealType.toLowerCase()}Header`}>
      <h3 className="bold italic">{mealType}</h3>
      <h4>{calories} calories</h4>
    </div>
  );
}
