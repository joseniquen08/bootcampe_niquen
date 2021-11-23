import React from 'react';
import ItemCount from '../ItemListContainer/ItemCount';

const Favorite = ({item}) => {
  return (
    <div>
      <div className="pt-6 pb-3 bg-white border border-gray-200 rounded-3xl">
        <div className="px-6 pb-2">
          <p className="mb-2 text-xl font-bold text-center text-gray-600">{item.nombre}</p>
          <div className="">
            <img className="object-contain w-48 h-48 p-2 mx-auto" src={item.urlImage} alt={item.nombre} />
          </div>
          <p className="py-3 text-2xl font-medium text-center">S/. {item.precio}</p>
          <div>
            <ItemCount
              cupos={item.cupos}
              nombre={item.nombre}
              id={item.id}
              tipo={item.tipo}
              precio={item.precio}
              urlImage={item.urlImage}
              masInfo={true}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Favorite;
