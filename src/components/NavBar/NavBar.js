import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getFirestore } from '../../services/firebase.config';
import CartWidget from './CartWidget';
import FavoriteWidget from './FavoriteWidget';

const NavBar = () => {

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const db = getFirestore();

    db.collection('categories').get()
    .then(result => setCategories(result.docs.map(category => ({id: category.id, ...category.data()}))));
  }, []);

  return (
    <nav className="sticky top-0 z-10 w-full px-12 py-4 bg-white border-b">
      <div className="flex items-center justify-between mx-auto max-w-7xl">
        <Link to={`/`} ><div className="text-3xl font-semibold"><code>BootcamPe</code></div></Link>
        <ul className="flex flex-row text-base gap-x-10">
          {
            categories.length !== 0 ? (
              categories.map(category => {
                return <li><Link to={`/category/${category.id}`}>{category.nombre === 'bootcamp' ? 'Bootcamps' : 'Cursos'}</Link></li>
              })
            ) : (<></>)
          }
          <li><a href="https://www.google.com/">Eventos</a></li>
          <li><a href="https://www.google.com/">Nosotros</a></li>
          <li><Link to="/favoritos"><FavoriteWidget /></Link></li>
          <li><Link to="/cart"><CartWidget /></Link></li>
        </ul>
      </div>
    </nav>
  )
}

export default NavBar;
