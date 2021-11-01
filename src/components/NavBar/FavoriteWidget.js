import { faHeart } from '@fortawesome/free-regular-svg-icons';
import React from 'react';
import { useFavoriteContext } from '../../context/favoriteContext';
import Icon from '../Stateless/Icon/Icon';

const FavoriteWidget = () => {

  const { totalFavorites } = useFavoriteContext();

  return (
    <div>
      <Icon icon={faHeart} />
      <span className="ml-2">{totalFavorites}</span>
    </div>
  )
}

export default FavoriteWidget;
