import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import ItemDetail from './ItemDetail';
import LoadingDetail from '../Stateless/Loading/LoadingDetail';
import { getFirestore } from '../../services/firebase.config';

const ItemDetailContainer = ({favoritos, setFavoritos}) => {

  const {type, id} = useParams();

  const [info, setInfo] = useState(null);

  useEffect(() => {
    const db = getFirestore();

    setTimeout(async () => {
      await db.collection('items').doc(id).get()
      .then(result => setInfo({id: result.id, ...result.data()}));
    }, 2000);
  }, []);

  console.log(info);

  return (
    <div>
      {
        info === null ? (
          <LoadingDetail />
        ) : (
          <div className="w-full max-w-4xl py-16 mx-auto">
            <ItemDetail
              nombre={info.nombre}
              descripcion={info.descripcion}
              telefono={info.telefono}
              precio={info.precio}
              duracion={info.duracion}
              valoracion={info.valoracion}
              urlImage={info.urlImage}
              favoritos={favoritos}
              setFavoritos={setFavoritos}
              tipo={info.tipo === 'bootcamp' ? 'Bootcamps' : 'Cursos'}
              id={id}
              cupos={info.cupos}
            />
          </div>
        )
      }
    </div>
  )
}

export default ItemDetailContainer;
