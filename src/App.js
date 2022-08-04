// import { useContext } from 'react';
import Header from './components/Layout/Header';
import Cart from './components/Cart/Cart';
import Meals from './components/Meals/Meals';
import { CartProvider } from './context/CartContext';

const App = () => {
  return (
    <>
      <CartProvider>
        <Cart />
        <Header />
        <main>
          <Meals />
        </main>
      </CartProvider>
    </>
  );
};

export default App;
