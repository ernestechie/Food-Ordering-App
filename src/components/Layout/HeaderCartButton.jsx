import { useContext } from 'react';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';
import ModalContext from '../../context/ModalContext';
import CartContext from '../../context/CartContext';

const HeaderCartButton = () => {
  const cart = useContext(CartContext);
  const { showModal, toggleModal } = useContext(ModalContext);

  const numberOfCartItems = cart.items.reduce((current, item) => {
    return current + item.amount;
  }, 0);

  return (
    <button className={classes.button} onClick={() => toggleModal(showModal)}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
