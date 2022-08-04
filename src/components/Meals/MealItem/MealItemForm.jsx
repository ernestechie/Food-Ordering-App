import { useContext, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import CartContext from '../../../context/CartContext';
import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';

const MealItemForm = (props) => {
  const amountRef = useRef('');
  const cart = useContext(CartContext);

  const submitHandler = (e) => {
    const mealName =
      amountRef.current.parentElement.parentElement.previousSibling.children[0]
        .innerText;
    const mealAmount = amountRef.current.value;
    const mealPrice = parseFloat(
      amountRef.current.parentElement.parentElement.previousSibling.children[3]
        .innerText
    );

    if (mealAmount !== '' && +mealAmount > 0) {
      cart.addItem({
        ID: uuidv4(),
        name: mealName,
        amount: +mealAmount,
        price: parseInt(mealPrice),
      });
    } else {
      console.log('Amount cannot be blank or less than 1');
    }

    e.preventDefault();
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        label='Amount'
        input={{
          id: 'amount_' + props.id,
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1',
          ref: amountRef,
        }}
      />
      <button>+ Add</button>
    </form>
  );
};

export default MealItemForm;
