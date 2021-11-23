import React, { useEffect, useState } from 'react'
import Icon from '../Stateless/Icon/Icon';
import { faPlus, faMinus, faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import { useCartContext } from '../../context/cartContext';
import { useFavoriteContext } from '../../context/favoriteContext';
import { useModalContext } from '../../context/modalContext';

const ItemCount = ({cupos, nombre, id, tipo, precio, urlImage, masInfo}) => {
  
  const [items, setItems] = useState(1);
  const [btnFavorite, setBtnFavorite] = useState(false);

  const { addItemToCart } = useCartContext();
  const { favoriteList, addItemFavorite, removeItemFavorite } = useFavoriteContext();
  const { showModal, addInfoItemModal } = useModalContext();

  useEffect(() => {
    if (favoriteList.some(itemFav => itemFav.id === id)) {
      setBtnFavorite(true);
    } else {
      setBtnFavorite(false);
    }
  }, [favoriteList, id]);

  const decreaseAmount = () => {
    if (items > 1) {
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
      removeItemFavorite(id);
      setBtnFavorite(false);
    } else {
      addItemFavorite({id: id, nombre: nombre, precio: precio, urlImage: urlImage, cupos: cupos, tipo: tipo});
      setBtnFavorite(true);
    }
  }

  const addToCart = () => {
    showModal();
    addInfoItemModal({nombre: nombre, cantidad: items});
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
      <button type="button" onClick={() => addToCart(items)} className='w-full col-span-1 py-2 my-1 font-semibold text-white bg-blue-600 border border-gray-200 rounded-2xl disabled:opacity-50 hover:bg-blue-700'>Agregar al carrito</button>
    </div>
  )
}

export default ItemCount;
