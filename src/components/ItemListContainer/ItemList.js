import React, { memo } from 'react';
import Item from './Item';

const ItemList = memo(({tipo, items}) => {
  return (
    <div className="pt-8 mx-auto max-w-7xl" id={tipo.toLowerCase()}>
      <p className="text-3xl font-light text-center">Nuestros {tipo}</p>
      <div className="grid grid-cols-4 gap-8 px-8 py-6">
        {
          items.map(item => (
            <Item
              key={item.id}
              nombre={item.nombre}
              precio={item.precio}
              duracion={item.duracion}
              valoracion={item.valoracion}
              urlImage={item.urlImage}
              cupos={item.cupos}
              id={item.id}
              tipo={item.tipo}
            />
          ))
        }
      </div>
    </div>
  )
})

export default ItemList;