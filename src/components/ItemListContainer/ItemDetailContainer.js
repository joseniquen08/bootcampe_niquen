import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import ItemDetail from './ItemDetail';
import LoadingDetail from '../Stateless/Loading/LoadingDetail';

const ItemDetailContainer = ({favoritos, setFavoritos}) => {

  const {type, id} = useParams();

  const [info, setInfo] = useState(null);

  const promise = new Promise((resolve, reject) => {
    setTimeout(async () => {
      const detailData = await axios.get(`https://bootcamp-api-20.herokuapp.com/api/v1/${type}/${id}`);
      await resolve(detailData.data.data);
    }, 2000);
  });

  useEffect(() => {
    promise.then(result => {
      setInfo(result);
      console.log(result)
    });
  }, []);

  return (
    <div>
      {
        info === null ? (
          <LoadingDetail />
        ) : (
          <div className="w-full max-w-3xl py-16 mx-auto">
            <ItemDetail
              nombre={info.name ? info.name : info.title}
              descripcion={info.description}
              carreras={info.careers && info.careers}
              telefono={info.phone && info.phone}
              email={info.email && info.email}
              precio={info.averageCost ? info.averageCost : info.tuition}
              nivel={info.minimumSkill && info.minimumSkill}
              favoritos={favoritos}
              setFavoritos={setFavoritos}
              tipo={type === 'bootcamps' ? 'Bootcamps' : 'Cursos'}
              id={id}
              cupos={5}
            />
          </div>
        )
      }
    </div>
  )
}

export default ItemDetailContainer;
