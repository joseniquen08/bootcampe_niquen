import React from 'react';
import { useCartContext } from '../../context/cartContext';
import CartList from './CartList';

const CartListContainer = () => {

  const { cartList } = useCartContext();

  return (
    <div className="w-full">
      {
        cartList.length > 0 ? (
          <CartList cartList={cartList} />
        ) : (
          <p className="w-full pt-8 text-3xl font-light text-center">No hay elementos agregados</p>
        )
      }
    </div>
  )
}

export default CartListContainer;
