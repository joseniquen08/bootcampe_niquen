import React, { useEffect, useState } from 'react'
import Icon from '../Stateless/Icon/Icon';
import { faPlus, faMinus, faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import { useCartContext } from '../../context/cartContext';
import { useFavoriteContext } from '../../context/favoriteContext';
import { useModalContext } from '../../context/modalContext';

const ItemCount = ({cupos, nombre, id, tipo, precio, masInfo}) => {
  
  const [statusBtnAddCart, setStatusBtnAddCart] = useState(false);
  const [items, setItems] = useState(1);
  const [disabledButton, setDisabledButton] = useState(true);
  const [btnFavorite, setBtnFavorite] = useState(false);

  const { addItemToCart } = useCartContext();
  const { favoriteList, btnItemFavorite } = useFavoriteContext();
  const { showModal } = useModalContext();

  useEffect(() => {
    if (items > 0) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
    if (favoriteList.find((idItem) => idItem === id)) {
      setBtnFavorite(true);
    } else {
      setBtnFavorite(false);
    }
  }, [favoriteList, id, items]);

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
      btnItemFavorite(id);
      setBtnFavorite(false);
    } else {
      btnItemFavorite(id);
      setBtnFavorite(true);
    }
  }

  const addToCart = () => {
    showModal();
    if (!masInfo) {
      setStatusBtnAddCart(true);
    }
    addItemToCart({id: id, nombre: nombre, precio: precio, cantidad: items});
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
          <Link to={tipo === 'bootcamp' ? `/bootcamps/${id}` : (tipo === 'curso' ? `/cursos/${id}` : `/`)} ><div className="w-full col-span-1 py-2 my-1 font-semibold text-center text-white bg-gray-600 border border-gray-200 rounded-2xl disabled:opacity-50 hover:bg-gray-700">Más información</div></Link>
        ) : (
          <></>
        )
      }
      {
        statusBtnAddCart ? (
          <div className="flex justify-center w-full my-1 align-center">
            <Link to='/cart' className="w-full py-2 font-semibold text-center text-white bg-yellow-500 border border-gray-200 rounded-2xl hover:bg-yellow-600">Finalizar compra</Link>
          </div>
        ) : (
          <button type="button" onClick={() => addToCart(items)} disabled={disabledButton} className={`w-full py-2 my-1 bg-blue-600 border text-white font-semibold col-span-1 border-gray-200 rounded-2xl disabled:opacity-50 ${disabledButton === true ? 'cursor-not-allowed' : 'hover:bg-blue-700'}`}>Agregar al carrito</button>
        )
      }
    </div>
  )
}

export default ItemCount;
