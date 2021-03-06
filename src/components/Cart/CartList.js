import { faLock, faTimes, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';
import { useCartContext } from '../../context/cartContext';
import Icon from '../Stateless/Icon/Icon';
import Cart from './Cart';
import 'firebase/firestore';
import { Link } from 'react-router-dom';

const CartList = ({cartList}) => {

  const { removeAllItems, totalItems, subtotal, total, applyDiscount, removeDiscount } = useCartContext();
  const [codigoDescuento, setCodigoDescuento] = useState("");
  const [showCodigoDescuento, setShowCodigoDescuento] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('coupon')) {
      setShowCodigoDescuento(localStorage.getItem('coupon'));
      setCodigoDescuento("");
      applyDiscount(0.2);
    } else {
      removeDiscount();
    }
  }, [applyDiscount]);

  const validarCodigo = () => {
    if(codigoDescuento !== "") {
      localStorage.setItem('coupon', codigoDescuento);
      setShowCodigoDescuento(codigoDescuento);
      setCodigoDescuento("");
      applyDiscount(0.2);
    }
  }

  const eliminarCodigo = () => {
    localStorage.removeItem('coupon');
    setShowCodigoDescuento(null);
    removeDiscount();
  }

  return (
    <div className="grid max-w-screen-lg grid-cols-5 py-10 mx-auto gap-x-4">
      <div className="flex flex-col col-span-3 col-start-1 px-4 py-6 gap-y-4">
        <div className="flex items-center justify-between">
          <p className="text-3xl font-semibold">Total ({totalItems})</p>
          <button onClick={() => removeAllItems()} className="w-10 h-10 text-xl border border-gray-300 rounded-xl hover:bg-red-500 hover:text-white hover:border-transparent"><Icon icon={faTrashAlt} /></button>
        </div>
        {
          cartList.map((item, index) => (
            <Cart key={index} id={item.id} nombre={item.nombre} precio={item.precio} cantidad={item.cantidad} />
          ))
        }
      </div>
      <div className="col-span-2 border-l border-gray-300">
        <div className="flex flex-col justify-between h-full px-8 py-6 gap-y-8">
          <div className="flex flex-col gap-y-8">
            <p className="text-3xl font-semibold">Resumen</p>
            <div className="flex items-end justify-between">
              <p>Subtotal ({totalItems})</p>
              <div className="flex">
                <p className={showCodigoDescuento && "line-through text-gray-400"}>S/. {subtotal}</p>
                {
                  showCodigoDescuento && <p className="ml-1">-20%</p>
                }
              </div>
            </div>
            <div className="flex flex-col items-end mb-2 text-sm gap-y-2">
              {
                showCodigoDescuento && <div className="flex items-center justify-between w-full font-medium text-gray-400"><p>C??digo aplicado: {showCodigoDescuento}</p><button onClick={() => eliminarCodigo()} className="hover:text-gray-700"><Icon icon={faTimes} /></button></div>
              }
              <input disabled={showCodigoDescuento ? true : false} onChange={(e) => setCodigoDescuento(e.target.value)} value={codigoDescuento} type="text" placeholder="Ingresar un c??digo de descuento" className="w-full px-4 py-2 border rounded-xl focus:outline-none" />
              <button disabled={showCodigoDescuento ? true : false} onClick={() => validarCodigo()} type="button" className={`px-4 py-2 text-white bg-blue-600 rounded-xl ${showCodigoDescuento ? 'opacity-70 cursor-default hover:' : 'hover:bg-blue-700'}`}>Aplicar</button>
            </div>
            <div className="flex items-end justify-between text-xl font-medium">
              <p>TOTAL</p>
              <p>S/. {total}</p>
            </div>
          </div>
          <div className="w-full">
            <Link to="/checkout" className="flex items-center justify-center w-full py-2 text-lg font-medium text-white bg-yellow-500 hover:bg-yellow-600 rounded-2xl" ><Icon icon={faLock} /><p className="ml-3">Procesar compra</p></Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartList;
