import React, { useEffect, useState } from 'react';
import Loading from '../Stateless/Loading/Loading';
import ItemList from './ItemList';
import { getFirestore } from '../../services/firebase.config';
import { useParams } from 'react-router';

const ItemListContainer = ({path}) => {

  const { id } = useParams();

  const [categories, setCategories] = useState([]);

  const [itemsBootcamps, setItemsBootcamps] = useState([]);
  const [itemsCourses, setItemsCourses] = useState([]);

  useEffect(() => {
    const db = getFirestore();

    setTimeout(async () => {
      await db.collection('categories').get()
      .then(result => setCategories(result.docs.map(category => ({id: category.id, ...category.data()}))));
    }, 1000);

    setTimeout(async () => {
      await db.collection('items').where('tipo', '==', 'bootcamp').get()
      .then(result => setItemsBootcamps(result.docs.map(item => ({id: item.id, ...item.data()}))));
  
      await db.collection('items').where('tipo', '==', 'curso').get()
      .then(result => setItemsCourses(result.docs.map(item => ({id: item.id, ...item.data()}))));
    }, 1000);

  }, []);

  return (
    <div className="w-full bg-gray-100">
      {
        path === '/' ? (
          itemsBootcamps.length === 0 || itemsCourses.length === 0 ? (<Loading />) : (
            categories.map(category => (
              <ItemList tipo={category.nombre} items={category.nombre === 'bootcamp' ? itemsBootcamps : itemsCourses} slide={true} />
            ))
          )
        ) : (
          categories.map(category => {
            if (category.id === id) {
              return <ItemList tipo={category.nombre} items={category.nombre === 'bootcamp' ? itemsBootcamps : itemsCourses} slide={false}/>
            }
          })
        )
      }
    </div>
  )
}

export default ItemListContainer;
