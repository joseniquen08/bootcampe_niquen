import React from 'react';

const ItemListContainer = ({items}) => {
  return (
    <div className="grid grid-cols-4 px-8 py-6">
      {
        items.map((item, index) => 
          <div key={index} className="h-20 mx-4 border border-gray-200 rounded">{item}</div>
        )
      }
    </div>
  )
}

export default ItemListContainer;
