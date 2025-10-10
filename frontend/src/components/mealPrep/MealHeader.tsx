type MealHeaderProps = {
  mealType: string;
  calories: number;
};

export default function MealHeader({ mealType, calories }: MealHeaderProps) {
  return (
    <div className={`${mealType.toLowerCase()}Header`}>
      <h3 className="mealHeader bold italic">{mealType}</h3>
      {calories > 0 && <h5>{calories} calories</h5>}
    </div>
  );
}
