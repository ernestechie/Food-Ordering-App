import { createContext, useReducer } from 'react';

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    const updatedItems = state.items.concat(action.item);
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  return defaultCartState;
};

const CartContext = createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (ID) => {},
});

const CartProvider = ({ children }) => {
  const [cartState, dispatchCartState] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addToCart = (item) => {
    dispatchCartState({ type: 'ADD', item: item });
  };

  const removeFromCart = (ID) => {
    dispatchCartState({ type: 'ADD', ID: ID });
    console.log(cartState.items);
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: 0,
    addItem: addToCart,
    removeItem: removeFromCart,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
};

export default CartContext;
export { CartProvider };
