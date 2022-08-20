import { useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import CartContext from '../../context/CartContext';
import ModalContext from '../../context/ModalContext';
import BusyIndicator from '../BusyIndicator';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = () => {
  const { showModal, toggleModal } = useContext(ModalContext);
  const cart = useContext(CartContext);
  const hasItems = cart.items.length > 0;

  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const addItemToCart = (item) => {
    cart.addItem({
      ...item,
      amount: 1,
    });
  };

  const removeItemFromCart = (ID) => {
    cart.removeItem(ID);
  };

  const checkoutHandler = () => {
    setIsCheckout(true);
  };

  const clearCart = (value) => {
    value.forEach((item) => {
      cart.removeItem(item.ID);
    });
  };

  const cancelOrderHandler = () => {
    setIsCheckout(false);
  };

  const submitOrderHandler = (user) => {
    setIsSubmitting(true);
    const data = {
      userInfo: { ...user },
      cartItems: { items: cart.items, totalAmount: cart.totalAmount },
    };
    fetch(
      'https://food-order-app-c8c8d-default-rtdb.firebaseio.com/orders.json',
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then(() => {
        setError(null);
        setSubmitted(true);
        setIsCheckout(false);
        setIsSubmitting(false);

        setTimeout(() => {
          setSubmitted(null);

          setTimeout(() => {
            clearCart(cart.items);
          }, 1000);
        }, 2000);
      })

      .catch(() => {
        setTimeout(() => {
          setError('Something went wrong');

          setTimeout(() => {
            setError(null);
          }, 2000);
        }, 500);
        setSubmitted(false);
        setIsSubmitting(false);
      });
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cart.items.map((item) => (
        <CartItem
          key={uuidv4()}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onAdd={addItemToCart.bind(null, item)}
          onRemove={removeItemFromCart.bind(null, item.ID)}
        />
      ))}
    </ul>
  );

  const cartModalContent = (
    <>
      {cartItems}
      <>
        <div className={classes.total}>
          <span>Total amount: </span>
          <span>N{cart.totalAmount}</span>
        </div>
        <>{error && <h2 style={{ color: 'red' }}>{error}</h2>}</>
        {isCheckout && (
          <Checkout
            cancelOrder={cancelOrderHandler}
            submitOrderHandler={submitOrderHandler}
          />
        )}
      </>
      <>
        {!isCheckout && (
          <div className={classes.actions}>
            <button
              className={classes['button--alt']}
              onClick={() => toggleModal(showModal)}
            >
              Close
            </button>
            {hasItems && !isCheckout && (
              <button className={classes.button} onClick={checkoutHandler}>
                Order
              </button>
            )}
          </div>
        )}
      </>
    </>
  );

  const isSubmittingModalContent = <BusyIndicator />;
  const submittedContent = <h2 style={{ color: 'green' }}>Order placed</h2>;

  return (
    <>
      {showModal && (
        <Modal>
          <>{!isSubmitting && cartModalContent}</>
          <>{submitted && submittedContent}</>
          <>{isSubmitting && isSubmittingModalContent}</>
        </Modal>
      )}
    </>
  );
};

export default Cart;
