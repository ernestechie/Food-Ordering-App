import { useCallback, useEffect, useState } from 'react';
import BusyIndicator from '../BusyIndicator';
import Card from '../UI/Card';
import classes from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMeals = useCallback(async () => {
    setIsLoading(true);
    try {
      const request = await fetch(
        'https://food-order-app-c8c8d-default-rtdb.firebaseio.com/meals.json'
      );

      const response = await request.json();
      let meals = [];

      for (const key in response) {
        meals.push({
          id: key,
          name: response[key].name,
          description: response[key].description,
          price: +response[key].price,
        });
      }

      setMeals(meals);
      setIsLoading(false);
    } catch (error) {
      setError('Something went wrong');
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMeals();
  }, [fetchMeals]);

  const mealsList = meals.map((meal) => (
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
        {meals.length > 0 && !isLoading && <ul>{mealsList}</ul>}
        {!meals.length > 0 && !isLoading && !error && (
          <h2>No meals available</h2>
        )}
        {isLoading && !error && <BusyIndicator />}
        {error && !isLoading ? (
          <h3 style={{ color: 'red' }}>Something went wrong</h3>
        ) : null}
      </Card>
    </section>
  );
};

export default AvailableMeals;
