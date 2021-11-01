import React, { useEffect, useState } from 'react';
import Favorite from './Favorite';

const FavoriteList = ({favoriteList}) => {

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(favoriteList);
  }, [favorites]);

  return (
    <div className="grid grid-cols-4 gap-8 px-8 py-6">
      {
        favorites.map((id, index) => (
          <Favorite key={index} id={id} />
        ))
      }
    </div>
  )
}

export default FavoriteList;
