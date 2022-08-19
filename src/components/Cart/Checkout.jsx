import classes from './Checkout.module.css';

const Checkout = (props) => {
  return (
    <form>
      <div className={classes.control}>
        <label htmlFor='name'>Name:</label>
        <input type='text' id='name' placeholder='Your Name...' />
      </div>
      <div className={classes.control}>
        <label htmlFor='street'>Street:</label>
        <input type='text' id='street' placeholder='Your Street...' />
      </div>
      <div className={classes.control}>
        <label htmlFor='postal'>Postal Code:</label>
        <input type='text' id='postal' placeholder='Your Postal Code...' />
      </div>
      <div className={classes.control}>
        <label htmlFor='city'>City:</label>
        <input type='text' id='city' placeholder='Your City...' />
      </div>
      <button type='button' onClick={props.cancelOrder}>
        Cancel
      </button>{' '}
      <span></span>
      <button type='submit'>Confirm</button>
    </form>
  );
};

export default Checkout;
