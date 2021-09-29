import React, { useEffect, useState } from 'react'
import Icon from '../Stateless/Icon/Icon';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const ItemCount = ({cupos}) => {

  const [items, setItems] = useState(0);
  const [disabledButton, setDisabledButton] = useState(true);

  useEffect(() => {
    if (items > 0) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [items]);

  const decreaseAmount = () => {
    if (items > 0) {
      setItems(items - 1);
    }
  }

  const increaseAmount = () => {
    if (items < cupos){
      setItems(items + 1);
    }
  }

  return (
    <div className="px-2 mt-6">
      <div className="flex items-center justify-between py-1 my-2 border border-gray-200 rounded">
        <button type="button" onClick={() => decreaseAmount()} className="px-4"><Icon icon={faMinus} /></button>
        <div className="">{items}</div>
        <button type="button" onClick={() => increaseAmount()} className="px-4"><Icon icon={faPlus} /></button>
      </div>
      <button type="button" disabled={disabledButton} className={`w-full py-1 my-2 border border-gray-200 rounded disabled:opacity-50 ${disabledButton === true ? 'cursor-not-allowed' : 'hover:bg-gray-100'}`}>Agregar al carrito</button>
    </div>
  )
}

export default ItemCount;
