import { faCheck, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { usePaymentContext } from '../../context/paymentContext';
import Icon from '../Stateless/Icon/Icon';

const SuccessPayment = () => {

  const history = useHistory();

  const { ordenPago, nombre, fecha, total, compra, clearPayment } = usePaymentContext();
  
  if (!ordenPago) {
    history.push('/');
  }

  const finishSuccess = () => {
    clearPayment();
    history.push('/');
  }

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-screen-lg py-4 mx-auto">
      <div className="py-10 text-green-500 rounded-full text-9xl">
        <Icon icon={faCheckCircle} />
      </div>
      <p className="text-3xl">
        Compra realizada con éxito
      </p>
      <div className="w-full max-w-lg px-8 py-6 my-6 border rounded-xl">
        <p className="w-full text-xl font-semibold text-center">Orden de Pago</p>
        <div className="py-3 space-y-1 font-medium">
          <p>Número de orden: <span className="font-normal text-gray-600">{ordenPago}</span></p>
          <p>Nombre: <span className="font-normal text-gray-600">{nombre}</span></p>
          <p>Fecha: <span className="font-normal text-gray-600">{fecha}</span></p>
          <p>Total: <span className="font-normal text-gray-600">S/. {total}</span></p>
          <p>Compra:</p>
          {
            compra ? (
              compra.map(item => (
                <div className="flex items-center ml-4 font-normal text-gray-800">
                  <Icon icon={faCheck} />
                  <p className="ml-2 text-gray-600">{item.nombre}</p>
                  <p className="ml-1 text-gray-600">(S/.{item.precio} x {item.cantidad})</p>
                </div>
              ))
            ) : (<></>)
          }
        </div>
      </div>
      <button type="button" onClick={() => finishSuccess()} className="px-4 py-2 text-xl text-white bg-yellow-500 outline-none focus:outline-none rounded-xl">Finalizar</button>
    </div>
  )
}

export default SuccessPayment;
