import React from 'react';
import CartWidget from './CartWidget';

const NavBar = () => {
  return (
    <nav className="sticky z-10 flex items-center justify-between w-full px-12 py-4 border-b">
      <div className="text-3xl font-semibold"><code>BootcamPe</code></div>
      <ul className="flex flex-row text-base gap-x-10">
        <li><a href="https://www.google.com/">Bootcamps</a></li>
        <li><a href="https://www.google.com/">Cursos</a></li>
        <li><a href="https://www.google.com/">Eventos</a></li>
        <li><a href="https://www.google.com/">Nosotros</a></li>
        <li><CartWidget /></li>
      </ul>
    </nav>
  )
}

export default NavBar;
