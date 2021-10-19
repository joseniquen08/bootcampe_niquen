import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import React from 'react';
import { useCartContext } from '../../context/cartContext';
import Icon from '../Stateless/Icon/Icon';

const Cart = ({index, id, nombre, precio, cantidad}) => {

  const { removeItem } = useCartContext();

  return (
    <div>
      <div key={index} className="bg-white border border-gray-200 rounded-3xl">
        <div className="flex items-center justify-between py-6">
          <div className="flex flex-col w-full px-8 border-r border-gray-300 gap-y-2">
            <p className="text-2xl font-bold text-left text-gray-800">{nombre}</p>
            <div className="flex items-end justify-between">
              <p className="text-lg text-left">{cantidad} cupos</p>
              <p className="text-xl font-semibold text-right text-gray-600">S/. {precio}</p>
            </div>
          </div>
          <div className="px-8">
            <button onClick={() => removeItem(id)} className="w-10 h-10 text-xl border border-gray-300 rounded-xl hover:bg-red-500 hover:text-white hover:border-transparent"><Icon icon={faTrashAlt} /></button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart;
