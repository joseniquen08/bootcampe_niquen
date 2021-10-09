import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import ItemDetail from './ItemDetail';

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
          <div className="w-full max-w-3xl py-16 mx-auto">
            <div className="w-full p-10 border border-gray-300 animate-pulse rounded-3xl shadow grid grid-cols-3 grid-rows-[auto,auto,1fr] gap-x-8">
              <div className="flex col-span-2 space-x-4">
                <div className="flex-1 py-1 pr-8 space-y-5 border-r border-gray-200">
                  <div className="space-y-2">
                    <div className="w-3/4 h-6 bg-gray-400 rounded"></div>
                    <div className="w-2/4 h-6 bg-gray-400 rounded"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-400 rounded"></div>
                    <div className="h-4 bg-gray-400 rounded"></div>
                    <div className="h-4 bg-gray-400 rounded"></div>
                    <div className="w-5/6 h-4 bg-gray-400 rounded"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-2/6 h-4 bg-gray-400 rounded"></div>
                    <div className="w-3/6 h-4 bg-gray-400 rounded"></div>
                    <div className="w-3/6 h-4 bg-gray-400 rounded"></div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between col-span-1 space-y-4">
                <div className="space-y-2">
                  <div className="w-5/6 h-5 bg-gray-400 rounded"></div>
                  <div className="h-5 bg-gray-400 rounded"></div>
                  <div className="w-1/2 h-5 bg-gray-400 rounded"></div>
                </div>
                <div className="space-y-2">
                  <div className="flex flex-row gap-x-2">
                    <div className="w-5/6 bg-gray-400 rounded h-7"></div>
                    <div className="w-1/6 bg-gray-400 rounded h-7"></div>
                  </div>
                  <div className="h-8 bg-gray-400 rounded"></div>
                </div>
              </div>
            </div>
          </div>
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
