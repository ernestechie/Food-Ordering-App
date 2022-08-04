import { Fragment } from 'react';

import classes from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';
import mealsImage from '../../assets/meals.jpg';

const Header = () => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h2>Foorder</h2>
        <HeaderCartButton />
      </header>
      <div className={classes['main-image']}>
        <img src={mealsImage} alt='A table full of delicious food' />
      </div>
    </Fragment>
  );
};

export default Header;
