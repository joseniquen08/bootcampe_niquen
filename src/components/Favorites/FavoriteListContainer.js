import React from 'react';
import FavoriteList from './FavoriteList';

const FavoriteListContainer = ({favoritos}) => {
  return (
    <div>
      {
        favoritos.length > 0 ? (
          <FavoriteList favoritos={favoritos} />
        ) : (
          <p className="w-full pt-8 text-3xl font-light text-center">No hay favoritos agregados</p>
        )
      }
    </div>
  )
}

export default FavoriteListContainer;
