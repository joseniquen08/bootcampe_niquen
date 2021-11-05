import { faLock, faTimes, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import { useCartContext } from '../../context/cartContext';
import { getFirestore } from '../../services/firebase.config';
import Icon from '../Stateless/Icon/Icon';
import Cart from './Cart';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { useHistory } from 'react-router';

const CartList = ({cartList}) => {

  let history = useHistory();

  const { removeAllItems, totalItems, subtotal, total, applyDiscount, removeDiscount } = useCartContext();
  const [codigoDescuento, setCodigoDescuento] = useState("");
  const [showCodigoDescuento, setShowCodigoDescuento] = useState(null);
  const [buyer, setBuyer] = useState({
    name: '',
    phone: '',
    email: ''
  });
  const [validateEmail, setValidateEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = ({ target }) => {
    setBuyer({
      ...buyer,
      [target.name]: target.value,
    });
  }

  const handleValidateEmailChange = ({ target }) => {
    setValidateEmail(target.value);
  }

  const addOrder = async () => {
    setLoading(true);
    if (name !== '' && phone !== '' && email !== '' && validateEmail !== '') {
      if (email === validateEmail) {
        setLoading(true);
        const db = getFirestore();
        
        const orders = db.collection("orders");
    
        const newOrder = {
          buyer: buyer,
          items: cartList,
          date: firebase.firestore.Timestamp.fromDate(new Date()),
          total: total
        }
    
        orders.add(newOrder).then(({id}) => {
          alert(id);
        }).catch(err => {
          console.log(err);
        }).finally(() => {
          setLoading(false);
          history.push("/checkout");
        });
      }
    } else {
      setLoading(false);
    }
  }

  const validarCodigo = () => {
    if(codigoDescuento !== "") {
      setShowCodigoDescuento(codigoDescuento);
      setCodigoDescuento("");
      applyDiscount(0.2);
    }
  }

  const eliminarCodigo = () => {
    setShowCodigoDescuento(null);
    removeDiscount();
  }

  const { name, phone, email } = buyer;

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
            <div className="flex flex-col items-end text-sm gap-y-2">
              {
                showCodigoDescuento && <div className="flex items-center justify-between w-full font-medium text-gray-400"><p>Código aplicado: {showCodigoDescuento}</p><button onClick={() => eliminarCodigo()} className="hover:text-gray-700"><Icon icon={faTimes} /></button></div>
              }
              <input disabled={showCodigoDescuento ? true : false} onChange={(e) => setCodigoDescuento(e.target.value)} value={codigoDescuento} type="text" placeholder="Ingresar un código de descuento" className="w-full px-4 py-2 border rounded-xl focus:outline-none" />
              <button disabled={showCodigoDescuento ? true : false} onClick={() => validarCodigo()} type="button" className={`px-4 py-2 text-white bg-blue-600 rounded-xl ${showCodigoDescuento ? 'opacity-70 cursor-default hover:' : 'hover:bg-blue-700'}`}>Aplicar</button>
            </div>
            <div className="text-sm">
              <p className="mb-4 text-lg font-semibold">Datos del cliente</p>
              <div className="flex flex-col items-center justify-center gap-y-4">
                <label className="block w-full">
                  <span className="text-gray-600">Nombre completo</span> <span className="text-red-500">*</span>
                  <input name="name" value={name} onChange={(e) => {handleInputChange(e)}} type="text" className="w-full px-4 py-2 mt-1 border rounded-xl focus:outline-none" />
                </label>
                <label className="block w-full">
                  <span className="text-gray-600">Teléfono</span> <span className="text-red-500">*</span>
                  <input name="phone" value={phone} onChange={(e) => {handleInputChange(e)}} type="text" className="w-full px-4 py-2 border rounded-xl focus:outline-none" />
                </label>
                <label className="block w-full">
                  <span className="text-gray-600">Correo Electrónico</span> <span className="text-red-500">*</span>
                  <input name="email" value={email} onChange={(e) => {handleInputChange(e)}} type="text" className="w-full px-4 py-2 border rounded-xl focus:outline-none" />
                </label>
                <label className="block w-full">
                  <span className="text-gray-600">Confirmar Correo Electrónico</span> <span className="text-red-500">*</span>
                  <input name="validateEmail" value={validateEmail} onChange={(e) => {handleValidateEmailChange(e)}} type="text" className="w-full px-4 py-2 border rounded-xl focus:outline-none" />
                </label>
              </div>
            </div>
            <div className="flex items-end justify-between text-xl font-medium">
              <p>TOTAL</p>
              <p>S/. {total}</p>
            </div>
          </div>
          <div className="w-full">
            {
              loading === true ? (
                <button className="flex items-center justify-center w-full py-2 text-xl font-medium text-white bg-yellow-500 cursor-default opacity-70 rounded-2xl">
                  <svg className="text-gray-100 w-7 h-7 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </button>
                ) : (
                <button onClick={() => addOrder()} className="flex items-center justify-center w-full py-2 text-xl font-medium text-white bg-yellow-500 hover:bg-yellow-600 rounded-2xl"><Icon icon={faLock} /><p className="ml-3">Procesar compra</p></button>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartList;
