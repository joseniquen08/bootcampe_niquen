import React from 'react';

const ItemListContainer = ({items, itemCount}) => {
  return (
    <div className="pt-4 bg-gray-100">
      <p className="text-3xl font-light">Nuestros Bootcamps</p>
      <div className="grid grid-cols-4 px-8 py-6">
        {
          items.map((item, index) => 
            <div key={index} className="px-2 py-6 mx-3 bg-white border border-gray-200 rounded">
              <p className="mb-4 text-xl font-bold uppercase">{item.nombre}</p>
              <p className="my-2 font-medium">Duración: <i className="font-normal">{item.duracion}</i></p>
              <p className="my-2 font-medium">Cupos disponibles: <i className="font-normal">{item.cupos}</i></p>
              {itemCount({cupos: item.cupos})}
            </div>
          )
        }
      </div>
    </div>
  )
}

export default ItemListContainer;
