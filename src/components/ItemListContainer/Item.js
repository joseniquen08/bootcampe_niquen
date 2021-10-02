import { faStar as faRegularStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as faSolidStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import Icon from '../Stateless/Icon/Icon';

const Item = ({index, nombre, duracion, cupos, valoracion, precio, urlImg, itemCount}) => {
  return (
    <div key={index} className="pt-6 mx-3 bg-white border border-gray-200 rounded-3xl">
      <div className="px-6 pb-2">
        <p className="mb-4 text-lg font-bold text-center text-gray-600">{nombre}</p>
        <div className="w-full">
          <img className="object-contain w-48 h-48 p-4 mx-auto" src={urlImg} />
        </div>
        <div className="flex items-end justify-between">
          <p className="my-2 text-3xl font-medium">S/. {precio}</p>
          <p className="my-2 text-lg text-gray-500">{duracion}</p>
        </div>
        <div className="flex items-center">
          {
            [0,1,2,3,4].map(val => (
              valoracion > val ? (
                (valoracion - val) > 0.5 ? (<Icon icon={faSolidStar} color={'#F1C40F'} />) : (<Icon icon={faStarHalfAlt} color={'#F1C40F'} />)
              ) : (<Icon icon={faRegularStar} color={'#F1C40F'} />)
            ))
          }
          <p className="ml-2 text-gray-500">{valoracion}</p>
        </div>
        {itemCount({cupos: cupos, nombre: nombre})}
      </div>
      <div className="py-2 text-sm font-medium text-center text-gray-500 border-t border-gray-200 rounded-b-3xl">{cupos} cupos disponibles</div>
    </div>
  )
}

export default Item;
