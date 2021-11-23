import React from 'react';
import Icon from '../Stateless/Icon/Icon';
import { faStar as faRegularStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as faSolidStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import ItemCount from './ItemCount';

const Item = ({nombre, cupos, precio, duracion, valoracion, urlImage, id, tipo}) => {
  return (
    <div className="pt-6 bg-white border border-gray-200 rounded-3xl">
      <div className="px-6 pb-2">
        <p className="mb-4 text-lg font-bold text-center text-gray-600">{nombre}</p>
        <div className="w-full">
          <img className="object-contain w-48 h-48 p-4 mx-auto" src={urlImage} alt={nombre} />
        </div>
        <div className="flex items-end justify-between">
          <p className="my-2 text-3xl font-medium">S/. {precio}</p>
          <p className="my-2 text-lg text-gray-500">{duracion}</p>
        </div>
        <div className="flex items-center mt-2">
          {
            [0,1,2,3,4].map((val, index) => (
              valoracion > val ? (
                (valoracion - val) > 0.5 ? (<Icon key={index} icon={faSolidStar} color={'#F1C40F'} />) : (<Icon key={index} icon={faStarHalfAlt} color={'#F1C40F'} />)
              ) : (<Icon key={index} icon={faRegularStar} color={'#F1C40F'} />)
            ))
          }
          <p className="ml-2 text-gray-500">{valoracion}</p>
        </div>
        <ItemCount
          cupos={cupos}
          nombre={nombre}
          id={id}
          tipo={tipo}
          precio={precio}
          urlImage={urlImage}
          masInfo={true}
        />
      </div>
      <div className="py-2 text-sm font-medium text-center text-gray-500 border-t border-gray-200 rounded-b-3xl">{cupos} cupos disponibles</div>
    </div>
  )
}

export default Item;
