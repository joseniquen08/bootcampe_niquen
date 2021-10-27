import React from 'react';
import { Link } from 'react-router-dom';
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
          <div>
            <p className="w-full pt-8 text-3xl font-light text-center">No hay elementos agregados</p>
            <p className="w-full pt-8 text-xl text-center text-blue-600 hover:underline"><Link to='/'>Regresar al inicio</Link></p>
          </div>
        )
      }
    </div>
  )
}

export default CartListContainer;
