import React, { useEffect, useState } from 'react';
import Favorite from './Favorite';
import { useModalContext } from '../../context/modalContext';
import ModalAddCart from '../Stateless/Modals/ModalAddCart';

const FavoriteList = ({favoriteList}) => {

  const [favorites, setFavorites] = useState([]);
  const { modal } = useModalContext();

  useEffect(() => {
    setFavorites(favoriteList);
    // eslint-disable-next-line
  }, [favoriteList]);

  return (
    <>
      <div className="grid grid-cols-4 gap-8 px-8 py-6">
        {
          favorites.map((item, index) => (
            <Favorite key={index} item={item} />
          ))
        }
      </div>
      {
        modal === true ? (
          <ModalAddCart />
        ) : (<></>)
      }
    </>
  )
}

export default FavoriteList;
