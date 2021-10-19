import React from 'react';
import Icon from '../Stateless/Icon/Icon';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useCartContext } from '../../context/cartContext';

const CartWidget = () => {

  const { totalItems } = useCartContext();

  return (
    <div>
      <Icon icon={faShoppingCart} />
      <span className="ml-2">{totalItems}</span>
    </div>
  )
}

export default CartWidget;
