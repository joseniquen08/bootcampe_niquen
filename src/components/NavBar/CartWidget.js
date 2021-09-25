import React from 'react';
import Icon from '../Stateless/Icon/Icon';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const CartWidget = () => {
  return (
    <div>
      <Icon icon={faShoppingCart} />
      <span className="ml-2">0</span>
    </div>
  )
}

export default CartWidget;
