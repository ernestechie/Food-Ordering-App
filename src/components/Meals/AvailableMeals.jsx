import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';

const DUMMY_MEALS = [
  {
    id: 'meal-1',
    name: 'Beef Shawarma',
    description: 'Beef & Sausage, Cabbage, Mayo, Spice',
    price: 1800,
  },
  {
    id: 'meal-2',
    name: 'Small Pepperoni Pizza',
    description: 'Pepperoni spice, Pizza beef, Sausage',
    price: 4900,
  },
  {
    id: 'meal-3',
    name: 'Barbecue Burger',
    description: 'American, raw, meaty',
    price: 2500,
  },
  {
    id: 'meal-4',
    name: 'Green Bowl Parfait',
    description: 'Yoghurt, Healthy..Leafy and green...',
    price: 4500,
  },
];

const AvailableMeals = () => {
  const mealsList = DUMMY_MEALS.map((meal) => (
    <MealItem
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
      ID={meal.id}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
