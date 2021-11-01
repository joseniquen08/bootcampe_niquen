import React from 'react';
import { Link } from 'react-router-dom';
import { useFavoriteContext } from '../../context/favoriteContext';
import FavoriteList from './FavoriteList';

const FavoriteListContainer = () => {

  const { favoriteList } = useFavoriteContext();

  return (
    <div className="w-full">
      {
        favoriteList.length > 0 ? (
          <FavoriteList favoriteList={favoriteList} />
        ) : (
          <div>
            <p className="w-full pt-8 text-3xl font-light text-center">No hay favoritos agregados</p>
            <p className="w-full pt-8 text-xl text-center text-blue-600 hover:underline"><Link to='/'>Regresar al inicio</Link></p>
          </div>
        )
      }
    </div>
  )
}

export default FavoriteListContainer;
