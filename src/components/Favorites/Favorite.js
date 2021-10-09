import axios from 'axios';
import React, { useEffect, useState } from 'react';
import LoadingFavorites from '../Stateless/Loading/LoadingFavorites';

const Favorite = ({index, id, tipo}) => {

  const [info, setInfo] = useState(null);

  const promise = new Promise((resolve, reject) => {
    setTimeout(async () => {
      const detailData = await axios.get(`https://bootcamp-api-20.herokuapp.com/api/v1/${tipo}/${id}`);
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
        info === null ? (<LoadingFavorites />) : (
          <div key={index} className="pt-6 bg-white border border-gray-200 rounded-3xl">
            <div className="px-6 pb-2">
              <p className="mb-2 text-xl font-bold text-center text-gray-600">{info.name ? info.name : info.title}</p>
              <p className="py-3 text-2xl font-medium text-center">S/. {info.averageCost ? info.averageCost : info.tuition}</p>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default Favorite;
