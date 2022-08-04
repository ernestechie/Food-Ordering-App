import { v4 as uuidv4 } from 'uuid';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';

const DUMMY_MEALS = [
  {
    id: uuidv4(),
    name: 'Beef Shawarma',
    description: 'Beef & Sausage, Cabbage, Mayo, Spice',
    price: 1799.99,
  },
  {
    id: uuidv4(),
    name: 'Small Pepperoni Pizza',
    description: 'Pepperoni spice, Pizza beef, Sausage',
    price: 4999.99,
  },
  {
    id: uuidv4(),
    name: 'Barbecue Burger',
    description: 'American, raw, meaty',
    price: 2499.99,
  },
  {
    id: 'm4',
    name: 'Green Bowl Parfait',
    description: 'Yoghurt, Healthy..Leafy and green...',
    price: 4499.99,
  },
];

const AvailableMeals = () => {
  const mealsList = DUMMY_MEALS.map((meal) => (
    <MealItem
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
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
