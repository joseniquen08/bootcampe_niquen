import React, { useEffect, useState } from 'react';
import { getFirestore } from '../../services/firebase.config';
import ItemCount from '../ItemListContainer/ItemCount';
import LoadingFavorites from '../Stateless/Loading/LoadingFavorites';

const Favorite = ({index, id}) => {

  const [info, setInfo] = useState(null);

  useEffect(() => {
    const db = getFirestore();

    setTimeout(async () => {
      await db.collection('items').doc(id).get()
      .then(result => setInfo({id: result.id, ...result.data()}));
    }, 2000);
  }, [id]);

  return (
    <div>
      {
        info === null ? (<LoadingFavorites />) : (
          <div key={index} className="pt-6 pb-3 bg-white border border-gray-200 rounded-3xl">
            <div className="px-6 pb-2">
              <p className="mb-2 text-xl font-bold text-center text-gray-600">{info.nombre}</p>
              <div className="">
                <img className="object-contain w-48 h-48 p-2 mx-auto" src={info.urlImage} alt={info.nombre} />
              </div>
              <p className="py-3 text-2xl font-medium text-center">S/. {info.precio}</p>
              <div>
                <ItemCount
                  cupos={info.cupos}
                  nombre={info.nombre}
                  id={info.id}
                  tipo={info.tipo}
                  precio={info.precio}
                  masInfo={true}
                />
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default Favorite;
