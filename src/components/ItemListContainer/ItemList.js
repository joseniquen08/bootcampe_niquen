import React from 'react';
import Item from './Item';

const ItemList = ({tipo, items, itemCount}) => {
  return (
    <div className="pt-8">
      <p className="text-3xl font-light text-center">Nuestros {tipo}</p>
      <div className="grid grid-cols-4 px-8 py-6">
        {
          items.map((item, index) => (
            <Item
              key={index}
              index={index}
              nombre={item.nombre}
              duracion={item.duracion}
              precio={item.precio}
              valoracion={item.valoracion}
              cupos={item.cupos}
              urlImg={item.urlImage}
              itemCount={itemCount}
            />
          ))
        }
      </div>
    </div>
  )
}

export default ItemList;