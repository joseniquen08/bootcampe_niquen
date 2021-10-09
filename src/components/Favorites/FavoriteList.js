import React from 'react';
import Favorite from './Favorite';

const FavoriteList = ({favoritos}) => {
  return (
    <div className="grid grid-cols-4 gap-8 px-8 py-6">
      {
        favoritos.map((favorito, index) => (
          <Favorite key={index} id={favorito.id} tipo={favorito.tipo === 'Bootcamps' ? 'bootcamps' : 'courses'} />
        ))
      }
    </div>
  )
}

export default FavoriteList;
