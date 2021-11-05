import { faStar as faRegularStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as faSolidStar, faStarHalfAlt, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import Icon from '../Stateless/Icon/Icon';
import ItemCount from './ItemCount';

const ItemDetail = ({nombre, descripcion, telefono, precio, duracion, valoracion, urlImage, favoritos, setFavoritos, tipo, id, cupos}) => {
  
  const [hideItemCount, setHideItemCount] = useState(false);

  const changeHideItemCount = () => {
    setHideItemCount(true);
  }
  
  return (
    <div className="border border-gray-300 w-full rounded-3xl p-10 grid grid-cols-3 grid-rows-[auto,auto,1fr] gap-x-8">
      <div className="col-span-2 pr-8 border-r border-gray-200">
        <div className="flex items-end">
          <div className="border-r">
            <img className="object-contain w-24 h-24 p-2 mx-auto" src={urlImage} alt={nombre} />
          </div>
          <div className="ml-4">
            <h4 className="mb-1 text-base font-bold text-gray-600 uppercase">{tipo === 'Bootcamps' ? 'bootcamp' : 'curso'}</h4>
            <h1 className="pb-1 text-4xl font-bold text-gray-900">{nombre}</h1>
          </div>
        </div>
        <div className="py-4">
          <p className="text-base text-justify text-gray-900">{descripcion}</p>
        </div>
        <div className="py-2">
          <p className="text-base text-gray-700"><b>Duración:</b> {duracion}</p>
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
      </div>
      <div className="flex flex-col justify-between col-span-1">
        <div className="flex flex-col gap-y-3">
          {
            telefono ? (
              <p><Icon icon={faPhoneAlt} /> {telefono}</p>
            ) : (<></>)
          }
          <p className="text-4xl font-medium">S/. {precio}</p>
        </div>
        <div>
          {
            hideItemCount ? (
              <></>
            ) : (
              <>
                <ItemCount
                  cupos={cupos}
                  nombre={nombre}
                  id={id}
                  tipo={tipo}
                  precio={precio}
                  favoritos={favoritos}
                  setFavoritos={setFavoritos}
                  masInfo={false}
                  changeHideItemCount={changeHideItemCount}
                />
                <div className="pt-2 text-sm font-medium text-center text-gray-500">{cupos} cupos disponibles</div>
              </>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default ItemDetail;
