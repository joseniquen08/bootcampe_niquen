import { faHeart } from '@fortawesome/free-regular-svg-icons';
import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../Stateless/Icon/Icon';
import CartWidget from './CartWidget';

const NavBar = () => {
  return (
    <nav className="sticky top-0 z-10 flex items-center justify-between w-full px-12 py-4 bg-white border-b">
      <Link to={`/`} ><div className="text-3xl font-semibold"><code>BootcamPe</code></div></Link>
      <ul className="flex flex-row text-base gap-x-10">
        <li><a href="https://www.google.com/">Bootcamps</a></li>
        <li><a href="https://www.google.com/">Cursos</a></li>
        <li><a href="https://www.google.com/">Eventos</a></li>
        <li><a href="https://www.google.com/">Nosotros</a></li>
        <li><Link to="/favoritos"><Icon icon={faHeart} /></Link></li>
        <li><CartWidget /></li>
      </ul>
    </nav>
  )
}

export default NavBar;
