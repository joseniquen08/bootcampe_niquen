import React from 'react';
import ItemList from './ItemList';

const ItemListContainer = ({items, itemCount}) => {
  return (
    <div className="bg-gray-100">
      {
        items.map((item, index) => (
          <ItemList key={index} tipo={item.tipo} items={item.lista} itemCount={itemCount} />
        ))
      }
    </div>
  )
}

export default ItemListContainer;
