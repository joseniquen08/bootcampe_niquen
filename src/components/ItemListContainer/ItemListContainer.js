import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../Stateless/Loading/Loading';
import ItemList from './ItemList';

const ItemListContainer = ({favoritos, setFavoritos}) => {

  const [items, setItems] = useState(null);

  const promise = new Promise((resolve, reject) => {
    setTimeout(async () => {
      const responseBootcamps = await axios.get('https://bootcamp-api-20.herokuapp.com/api/v1/bootcamps');
      const responseCourses = await axios.get('https://bootcamp-api-20.herokuapp.com/api/v1/courses');
      await resolve([
        {
          tipo: 'Bootcamps',
          dt: responseBootcamps
        },
        {
          tipo: 'Cursos',
          dt: responseCourses
        }
      ]);
    }, 2000);
  });

  useEffect(() => {
    promise.then(result => {
     setItems(result);
    });
  }, []);

  return (
    <div className="bg-gray-100">
      {
        items === null ? (<Loading />) : (
          items.map((item, index) => (
            <ItemList favoritos={favoritos} setFavoritos={setFavoritos} key={index} tipo={item.tipo} items={item.dt} />
          ))
        )
      }
    </div>
  )
}

export default ItemListContainer;
