import React, { useEffect, useState } from 'react';
import Loading from '../Stateless/Loading/Loading';
import ItemList from './ItemList';
import { getFirestore } from '../../services/firebase.config';
import { useParams } from 'react-router';
import { useModalContext } from '../../context/modalContext';
import ModalAddCart from '../Stateless/Modals/ModalAddCart';

const ItemListContainer = ({path}) => {

  const { id } = useParams();

  const [categories, setCategories] = useState([]);

  const [itemsBootcamps, setItemsBootcamps] = useState([]);
  const [itemsCourses, setItemsCourses] = useState([]);

  const { modal } = useModalContext();

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
    <>
      <div className="w-full bg-gray-100">
        {
          path === '/' ? (
            itemsBootcamps.length === 0 || itemsCourses.length === 0 ? (<Loading />) : (
              categories.map(category => (
                <ItemList key={category.id} tipo={category.nombre} items={category.nombre === 'bootcamp' ? itemsBootcamps : itemsCourses} slide={true} />
              ))
            )
          ) : (
            // eslint-disable-next-line
            categories.map(category => {
              if (category.id === id) {
                return <ItemList key={category.id} tipo={category.nombre} items={category.nombre === 'bootcamp' ? itemsBootcamps : itemsCourses} slide={false}/>
              }
            })
          )
        }
      </div>
      {
        modal === true ? (
          <ModalAddCart />
        ) : (<></>)
      }
    </>
  )
}

export default ItemListContainer;
