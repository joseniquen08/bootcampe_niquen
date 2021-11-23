import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../context/authContext';
import { getFirestore } from '../../services/firebase.config';
import CartWidget from './CartWidget';
import FavoriteWidget from './FavoriteWidget';

const NavBar = () => {

  const [categories, setCategories] = useState([]);

  const { session, logout, showBtnLogout, btnLogout, email } = useAuthContext();

  useEffect(() => {
    const db = getFirestore();

    db.collection('categories').get()
    .then(result => setCategories(result.docs.map(category => ({id: category.id, ...category.data()}))));
  }, []);

  return (
    <nav className="sticky top-0 z-10 w-full px-12 py-4 bg-white border-b">
      <div className="flex items-center justify-between mx-auto max-w-7xl">
        <Link to="/"><div className="text-3xl font-semibold"><code>BootcamPe</code></div></Link>
        <div className="flex flex-row items-center text-base gap-x-6">
          {
            categories.length !== 0 ? (
              categories.map(category => {
                return <div key={category.id}><Link to={`/category/${category.id}`}>{category.nombre === 'bootcamp' ? 'Bootcamps' : 'Cursos'}</Link></div>
              })
            ) : (<></>)
          }
          <div><Link to="/events">Eventos</Link></div>
          <div><Link to="/team">Nosotros</Link></div>
          <div><Link to="/favoritos"><FavoriteWidget /></Link></div>
          <div><Link to="/cart"><CartWidget /></Link></div>
          <div className="relative">
            {
              session === true ? (
                <>
                  <div className="px-3 py-1 text-white bg-blue-600 rounded-xl">
                    <button onClick={() => showBtnLogout()} type="button" className="text-sm outline-none focus:outline-none">{email}</button>
                  </div>
                  {
                    logout && (
                      <div onClick={() => btnLogout()} className="absolute w-full text-sm flex items-center justify-center h-full mt-1.5 cursor-pointer hover:bg-gray-100 bg-white border border-gray-400 rounded-xl">
                        Cerrar sesión
                      </div>
                    )
                  }
                </>
              ) : (
                <div><Link to="/login">Login</Link></div>
              )
            }
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar;
