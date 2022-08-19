import { useContext, useEffect, useState } from 'react';
import CartContext from '../../context/CartContext';
import ModalContext from '../../context/ModalContext';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = () => {
  const cart = useContext(CartContext);
  const { showModal, toggleModal } = useContext(ModalContext);
  const [buttonHighlight, setButtonHighlight] = useState(false);
  const { items } = cart;

  const numberOfCartItems = items.reduce((current, item) => {
    return current + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${buttonHighlight ? classes.bump : ''}`;

  useEffect(() => {
    if (items === 0) {
      return;
    }
    setButtonHighlight(true);
    const timer = setTimeout(() => {
      setButtonHighlight(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [items]);

  return (
    <button className={btnClasses} onClick={() => toggleModal(showModal)}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
