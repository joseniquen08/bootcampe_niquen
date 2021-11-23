import React, { useEffect, useState } from 'react';
import { getFirestore } from '../../services/firebase.config';
import firebase from 'firebase/app';
import { useHistory } from 'react-router';
import Icon from '../Stateless/Icon/Icon';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { useCartContext } from '../../context/cartContext';
import { Link } from 'react-router-dom';
import { usePaymentContext } from '../../context/paymentContext';

const Checkout = () => {

  let history = useHistory();

  const { cartList, total, subtotal, totalItems, applyDiscount, removeDiscount, removeAllItems } = useCartContext();
  const { setOrdenPago, setNombre, setFecha, setTotal, setCompra } = usePaymentContext();
  
  const [buyer, setBuyer] = useState({
    name: '',
    phone: '',
    email: ''
  });
  const [validateEmail, setValidateEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    if (localStorage.getItem('user')) {
      const user_data = JSON.parse(localStorage.getItem('user'))
      setBuyer({
        name: user_data.name,
        phone: '',
        email: user_data.email
      })
    }
    if (localStorage.getItem('coupon')) {
      applyDiscount(0.2);
      setDiscount(subtotal * 0.2);
    } else {
      removeDiscount();
    }
  }, [])

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
    
        orders.add(newOrder).then((data) => {
          console.log(data);
          setOrdenPago(data.id);
          orders.doc(data.id).get().then((doc) => {
            console.log(doc.data());
            setNombre(doc.data().buyer.name);
            setFecha(doc.data().date.toDate().toDateString() + ' at ' + doc.data().date.toDate().toLocaleTimeString());
            setTotal(doc.data().total);
            setCompra(doc.data().items);
            removeAllItems();
            localStorage.removeItem('cart');
            if (localStorage.getItem('coupon')){
              localStorage.removeItem('coupon');
            }
          });
        }).catch(err => {
          console.log(err);
        }).finally(() => {
          setLoading(false);
          history.push("/success");
        });
      }
    } else {
      setLoading(false);
    }
  }

  const { name, phone, email } = buyer;

  return (
    <div className="flex max-w-screen-lg py-10 mx-auto">
      <div className="flex flex-col w-3/5 px-10 gap-y-6">
        <div className="flex items-center justify-between">
          <p className="text-3xl font-semibold">Total ({totalItems})</p>
        </div>
        <div className="py-2 border border-gray-200 divide-y divide-gray-200 rounded-2xl">
          {
            cartList.map((item, index) => (
              <div key={index} className="">
                <div className="flex items-center justify-between px-8 py-4 bg-white">
                  <div className="flex flex-col w-full gap-y-3">
                    <p className="text-xl font-bold text-left text-gray-800">{item.nombre}</p>
                    <div className="flex items-end justify-between">
                      <p className="text-left">{item.cantidad} {item.cantidad > 1 ? 'cupos' : 'cupo' }</p>
                      <p className="font-semibold text-right text-gray-600">S/. {item.precio}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
        <div className="flex flex-col px-8 gap-y-6">
          <div className="flex flex-col pb-8 text-gray-600 border-b border-gray-300 gap-y-6">
            <div className="flex items-end justify-between">
              <p>Subtotal ({totalItems})</p>
              <p>S/. {subtotal}</p>
            </div>
            <div className="flex items-end justify-between">
              <p>Descuento</p>
              <p>S/. {discount}</p>
            </div>
          </div>
          <div className="flex items-end justify-between text-xl font-medium">
            <p>Total</p>
            <p>S/. {total}</p>
          </div>
        </div>
        <Link to="/cart" className="mt-10 text-blue-600 hover:underline">Volver</Link>
      </div>
      <div className="w-2/5 px-10 border-l border-gray-300">
        <div className="text-sm">
          <p className="mb-4 text-lg font-semibold">Datos del cliente</p>
          <div className="flex flex-col items-center justify-center gap-y-4">
            <label className="block w-full">
              <span className="text-gray-600">Nombre completo</span> <span className="text-red-500">*</span>
              <input name="name" value={name} onChange={(e) => {handleInputChange(e)}} type="text" className="w-full px-4 py-2 mt-1 border rounded-xl focus:outline-none" />
            </label>
            <label className="block w-full">
              <span className="text-gray-600">Teléfono</span> <span className="text-red-500">*</span>
              <input name="phone" value={phone} onChange={(e) => {handleInputChange(e)}} type="text" className="w-full px-4 py-2 mt-1 border rounded-xl focus:outline-none" />
            </label>
            <label className="block w-full">
              <span className="text-gray-600">Correo Electrónico</span> <span className="text-red-500">*</span>
              <input name="email" value={email} onChange={(e) => {handleInputChange(e)}} type="text" className="w-full px-4 py-2 mt-1 border rounded-xl focus:outline-none" />
            </label>
            <label className="block w-full">
              <span className="text-gray-600">Confirmar Correo Electrónico</span> <span className="text-red-500">*</span>
              <input name="validateEmail" value={validateEmail} onChange={(e) => {handleValidateEmailChange(e)}} type="text" className="w-full px-4 py-2 mt-1 border rounded-xl focus:outline-none" />
            </label>
          </div>
        </div>
        <div className="w-full mt-8">
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
  )
}

export default Checkout;
