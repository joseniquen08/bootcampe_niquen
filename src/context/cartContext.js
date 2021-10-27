import { createContext, useContext, useState } from 'react';

const CartContext = createContext([]);

export const useCartContext = () => useContext(CartContext);

const CartContextProvider = ({children}) => {

  const [cartList, setCartList] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [subtotal, setSubtotal] = useState(0);

  const addItemToCart = (item) => {
    if(cartList.some(itemCart => itemCart.id === item.id)) {
      cartList.map(itemCart => {
        if(itemCart.id === item.id) {
          itemCart.cantidad += item.cantidad;
          setTotalItems(totalItems + item.cantidad);
          setSubtotal(subtotal + (item.cantidad * item.precio));
        }
      });
    } else {
      setCartList([...cartList, item]);
      setTotalItems(totalItems + item.cantidad);
      setSubtotal(subtotal + (item.cantidad * item.precio));
    }
  }

  const removeItem = (id) => {
    const index = cartList.map(itemCart => itemCart.id).indexOf(id);
    const item = cartList.find(itemCart => itemCart.id === id);
    if(index !== -1) {
      setTotalItems(totalItems - item.cantidad);
      setSubtotal(subtotal - (item.cantidad * item.precio))
      setCartList(cartList => cartList.filter((itemCart, i) => i !== index));
    }
  }
  
  const removeAllItems = () => {
    setTotalItems(0);
    setSubtotal(0);
    setCartList([]);
  }

  return (
    <CartContext.Provider value={{
      cartList, addItemToCart, removeItem, removeAllItems, totalItems, subtotal
    }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartContextProvider;