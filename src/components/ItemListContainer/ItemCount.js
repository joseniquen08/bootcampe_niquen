import React, { useEffect, useState } from 'react'
import Icon from '../Stateless/Icon/Icon';
import { faPlus, faMinus, faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle, faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';

const ItemCount = ({cupos, nombre, id, tipo, favoritos, setFavoritos, masInfo, changeHideItemCount}) => {
  
  const [statusBtnAddCart, setStatusBtnAddCart] = useState(false);
  const [items, setItems] = useState(1);
  const [disabledButton, setDisabledButton] = useState(true);
  const [btnFavorite, setBtnFavorite] = useState(false);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (items > 0) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
    if (favoritos.find((item) => item.id === id)) {
      setBtnFavorite(true);
    } else {
      setBtnFavorite(false);
    }
  }, [items, btnFavorite]);

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

  const changeBtnFavorite = () => {
    if (btnFavorite) {
      favoritos.splice(favoritos.findIndex((item) => item.id === id), 1);
      setFavoritos(favoritos);
      setBtnFavorite(false);
      console.log(favoritos);
    } else {
      setFavoritos([...favoritos, {id: id, tipo: tipo}]);
      setBtnFavorite(true);
      console.log(favoritos);
    }
  }

  const addToCart = () => {
    setModal(true);
    if (!masInfo) {
      setStatusBtnAddCart(true);
    }
  }

  const closeModal = () => {
    setModal(false);
  }

  return (
    <div className="mt-4">
      <div className="grid grid-cols-5 gap-2 mb-2">
        <div className="flex items-center justify-between col-span-4 py-1 my-2 border border-gray-200 rounded-xl">
          <button type="button" onClick={() => decreaseAmount()} className="px-4"><Icon icon={faMinus} /></button>
          <div className="">{items}</div>
          <button type="button" onClick={() => increaseAmount()} className="px-4"><Icon icon={faPlus} /></button>
        </div>
        <button type="button" onClick={() => changeBtnFavorite()} className="col-span-1 py-1 my-2 border border-gray-200 rounded-xl px-w-full disabled:opacity-50 hover:bg-gray-100">{ btnFavorite ? <Icon icon={faSolidHeart} color={'#FB4923'} /> : <Icon icon={faRegularHeart} /> }</button>
      </div>
      {
        masInfo ? (
          <Link to={tipo === 'Bootcamps' ? `/bootcamps/${id}` : (tipo === 'Cursos' ? `/courses/${id}` : `/`)} ><div className="w-full col-span-1 py-2 my-1 font-semibold text-center text-white bg-gray-600 border border-gray-200 rounded-2xl disabled:opacity-50 hover:bg-gray-700">Más información</div></Link>
        ) : (
          <></>
        )
      }
      {
        statusBtnAddCart ? (
          <button type="button" onClick={() => changeHideItemCount()} disabled={disabledButton} className={`w-full py-2 my-1 bg-yellow-500 border text-white font-semibold col-span-1 border-gray-200 rounded-2xl disabled:opacity-50 ${disabledButton === true ? 'cursor-not-allowed' : 'hover:bg-yellow-600'}`}>Finalizar compra</button>
        ) : (
          <button type="button" onClick={() => addToCart(items)} disabled={disabledButton} className={`w-full py-2 my-1 bg-blue-600 border text-white font-semibold col-span-1 border-gray-200 rounded-2xl disabled:opacity-50 ${disabledButton === true ? 'cursor-not-allowed' : 'hover:bg-blue-700'}`}>Agregar al carrito</button>
        )
      }
      {
        modal && (
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
                            items > 1 ? `${items} cupos de ${nombre}` : `${items} cupo de ${nombre}`
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center px-4 py-6">
                  <button type="button" onClick={() => closeModal()} className="inline-flex justify-center w-auto px-8 py-2 text-lg font-medium text-white bg-blue-600 border border-transparent shadow-sm rounded-2xl hover:bg-blue-700">
                    Listo
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default ItemCount;
