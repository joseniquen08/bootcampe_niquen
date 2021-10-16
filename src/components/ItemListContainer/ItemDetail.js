import { faEnvelope, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import Icon from '../Stateless/Icon/Icon';
import ItemCount from './ItemCount';

const ItemDetail = ({nombre, descripcion, carreras, telefono, email, precio, nivel, favoritos, setFavoritos, tipo, id, cupos}) => {
  
  const [hideItemCount, setHideItemCount] = useState(false);

  const changeHideItemCount = () => {
    setHideItemCount(true);
  }
  
  return (
    <div className="border border-gray-300 w-full rounded-3xl p-10 grid grid-cols-3 grid-rows-[auto,auto,1fr] gap-x-8">
      <div className="col-span-2 pr-8 border-r border-gray-200">
        <h4 className="mb-1 text-base font-medium text-gray-600 uppercase">{tipo === 'Bootcamps' ? 'bootcamp' : 'curso'}</h4>
        <h1 className="text-4xl font-bold text-gray-900">{nombre}</h1>
        <div className="py-4">
          <p className="text-base text-gray-900">{descripcion}</p>
        </div>
        {
          carreras ? (
            <div>
              <h3 className="text-sm font-medium text-gray-900">Carreras</h3>
              <div className="mt-4">
                <ul role="list" className="pl-4 space-y-2 text-sm list-disc">
                  {
                    carreras.map((carrera, index) => (
                      <li key={index} className="text-gray-400"><span className="text-gray-600">{carrera}</span></li>
                    ))
                  }
                </ul>
              </div>
            </div>
          ) : (<></>)
        }
        {
          nivel ? (
            <div className="mt-2">
              <h3 className="text-sm font-medium text-gray-900">Nivel mínimo</h3>
              <div className="mt-1">
                <p className="text-gray-600 capitalize">{nivel}</p>
              </div>
            </div>
          ) : (<></>)
        }
      </div>
      <div className="flex flex-col justify-between col-span-1">
        <div className="flex flex-col gap-y-3">
          {
            telefono ? (
              <p><Icon icon={faPhoneAlt} /> {telefono}</p>
            ) : (<></>)
          }
          {
            email ? (
              <p><Icon icon={faEnvelope} /> {email}</p>
            ) : (<></>)
          }
          <p className="text-2xl">S/. {precio}</p>
        </div>
        <div>
          {
            hideItemCount ? (
              <></>
            ) : (
              <>
                <ItemCount
                  cupos={5}
                  nombre={nombre}
                  id={id}
                  tipo={tipo}
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
