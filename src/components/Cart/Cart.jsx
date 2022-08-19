import { useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import CartContext from '../../context/CartContext';
import ModalContext from '../../context/ModalContext';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = () => {
  const { showModal, toggleModal } = useContext(ModalContext);
  const cart = useContext(CartContext);
  const hasItems = cart.items.length > 0;
  const [isCheckout, setIsCheckout] = useState(false);

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

  const cancelOrderHandler = () => {
    setIsCheckout(false);
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

  return (
    <>
      {showModal && (
        <Modal>
          {cartItems}
          <div className={classes.total}>
            <span>Total amount: </span>
            <span>N{cart.totalAmount}</span>
          </div>
          {isCheckout && <Checkout cancelOrder={cancelOrderHandler} />}
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
        </Modal>
      )}
    </>
  );
};

export default Cart;
