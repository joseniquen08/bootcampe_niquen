import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import React from 'react';
import { Link } from 'react-router-dom';
import { useModalContext } from '../../../context/modalContext';
import Icon from '../Icon/Icon';

const ModalAddCart = () => {

  const { closeModal, infoItem } = useModalContext();

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-center justify-center min-h-screen px-4 text-center">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" aria-hidden="true"></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white shadow-xl rounded-3xl sm:max-w-md sm:w-full">
          <div className="px-4 py-4 bg-white sm:p-6 sm:pb-4">
            <div className="">
              <div className="flex items-center justify-center flex-shrink-0 py-4 mx-auto text-green-500 rounded-full text-7xl">
                <Icon icon={faCheckCircle} />
              </div>
              <div className="mt-3 text-center sm:mt-0">
                <h3 className="text-2xl font-medium leading-6 text-gray-900">
                  ¡Agregado al carrito!
                </h3>
                <div className="mt-8">
                  <p className="text-sm text-gray-500">
                    {
                      infoItem[0].cantidad > 1 ? `${infoItem[0].cantidad} cupos de ${infoItem[0].nombre}` : `${infoItem[0].cantidad} cupo de ${infoItem[0].nombre}`
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center px-16 py-6 gap-x-4">
            <button type="button" onClick={() => closeModal()} className="inline-flex justify-center w-1/2 px-3 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent shadow-sm rounded-2xl">
              Seguir comprando
            </button>
            <div className="flex justify-center w-1/2 my-1 align-center">
              <Link to='/cart' onClick={() => closeModal()} className="w-full px-3 py-2 text-sm font-semibold text-center text-white bg-yellow-500 border border-gray-200 rounded-2xl">Ir al carrito</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalAddCart;
