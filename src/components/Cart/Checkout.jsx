import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const isEmpty = (value) => value.trim() === '';
const isSixChars = (value) => value.trim().length === 6;

const Checkout = (props) => {
  const [formIsValid, setFormIsValid] = useState({
    name: false,
    street: false,
    city: false,
    postal: false,
  });
  const nameInputRef = useRef('');
  const streetInputRef = useRef('');
  const postalInputRef = useRef('');
  const cityInputRef = useRef('');

  const confirmHandler = (e) => {
    e.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = isEmpty(enteredName);
    const enteredStreetIsValid = isEmpty(enteredStreet);
    const enteredPostalIsValid = !isSixChars(enteredPostal);
    const enteredCityIsValid = isEmpty(enteredCity);

    setFormIsValid({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      postal: enteredPostalIsValid,
      city: enteredCityIsValid,
    });

    const formValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredPostalIsValid &&
      enteredCityIsValid;

    if (!formValid) {
      props.submitOrderHandler({
        name: enteredName,
        street: enteredStreet,
        postal: enteredPostal,
        city: enteredCity,
      });
    } else {
      return;
    }
  };

  return (
    <form onSubmit={confirmHandler} className={classes.form}>
      <div
        className={`${classes.control} ${formIsValid.name && classes.invalid}`}
      >
        <label htmlFor='name'>Name:</label>
        <input
          type='text'
          id='name'
          placeholder='Your Name...'
          ref={nameInputRef}
        />
        {formIsValid.name && <p style={{ color: 'red' }}>Enter a valid name</p>}
      </div>
      <div
        className={`${classes.control} ${
          formIsValid.street && classes.invalid
        }`}
      >
        <label htmlFor='street'>Street:</label>
        <input
          type='text'
          id='street'
          placeholder='Your Street...'
          ref={streetInputRef}
        />
        {formIsValid.street && (
          <p style={{ color: 'red' }}>Enter a valid street</p>
        )}
      </div>
      <div
        className={`${classes.control} ${
          formIsValid.postal && classes.invalid
        }`}
      >
        <label htmlFor='postal'>Postal Code:</label>
        <input
          type='text'
          id='postal'
          placeholder='Your Postal Code...'
          ref={postalInputRef}
        />
        {formIsValid.postal && (
          <p style={{ color: 'red' }}>Invalid. Must be 6 digits</p>
        )}
      </div>
      <div
        className={`${classes.control} ${formIsValid.city && classes.invalid}`}
      >
        <label htmlFor='city'>City:</label>
        <input
          type='text'
          id='city'
          placeholder='Your City...'
          ref={cityInputRef}
        />
        {formIsValid.city && (
          <p style={{ color: 'red' }}>Entered a valid city</p>
        )}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.cancelOrder}>
          Cancel
        </button>
        <button
          type='submit'
          className={classes.submit}
          onClick={confirmHandler}
        >
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
