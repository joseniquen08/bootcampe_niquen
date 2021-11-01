import React, { useEffect, useState } from 'react';
import Loading from '../Stateless/Loading/Loading';
import ItemList from './ItemList';
import { getFirestore } from '../../services/firebase.config';

const ItemListContainer = () => {

  const [itemsBootcamps, setItemsBootcamps] = useState([]);
  const [itemsCourses, setItemsCourses] = useState([]);

  useEffect(() => {
    const db = getFirestore();

    setTimeout(async () => {
      await db.collection('items').where('tipo', '==', 'bootcamp').get()
      .then(result => setItemsBootcamps(result.docs.map(item => ({id: item.id, ...item.data()}))));
  
      await db.collection('items').where('tipo', '==', 'curso').get()
      .then(result => setItemsCourses(result.docs.map(item => ({id: item.id, ...item.data()}))));
    }, 2000);
  }, []);

  return (
    <div className="w-full bg-gray-100">
      {
        itemsBootcamps.length === 0 || itemsCourses.length === 0 ? (<Loading />) : (
          <>
            <ItemList tipo={'Bootcamps'} items={itemsBootcamps} />
            <ItemList tipo={'Cursos'} items={itemsCourses} />
          </>
        )
      }
    </div>
  )
}

export default ItemListContainer;
