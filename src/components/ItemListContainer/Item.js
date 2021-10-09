import React from 'react';
import ItemCount from './ItemCount';

const Item = ({index, nombre, cupos, precio, id, tipo, favoritos, setFavoritos}) => {
  return (
    <div key={index} className="pt-6 bg-white border border-gray-200 rounded-3xl">
      <div className="px-6 pb-2">
        <p className="mb-4 text-lg font-bold text-center text-gray-600">{nombre}</p>
        <p className="py-2 text-2xl font-medium text-center">S/. {precio}</p>
        <ItemCount
          cupos={cupos}
          nombre={nombre}
          id={id}
          tipo={tipo}
          favoritos={favoritos}
          setFavoritos={setFavoritos}
          masInfo={true}
        />
      </div>
      <div className="py-2 text-sm font-medium text-center text-gray-500 border-t border-gray-200 rounded-b-3xl">{cupos} cupos disponibles</div>
    </div>
  )
}

export default Item;
