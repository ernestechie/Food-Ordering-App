import classes from './MealItem.module.css';
import MealItemForm from './MealItemForm';

const MealItem = (props) => {
  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <span
          style={{ fontSize: '20px', color: '#AD5502', fontWeight: 'bold' }}
        >
          N
        </span>
        <div className={classes.price} style={{ display: 'inline-block' }}>
          {props.price.toFixed(2)}
        </div>
      </div>
      <MealItemForm />
    </li>
  );
};

export default MealItem;
