import React from 'react';

const NavBar = () => {
  return (
    <nav className="sticky z-10 flex items-center justify-between w-full px-8 py-4 border-b">
      <div className="text-3xl"><code>BootcamPe</code></div>
      <ul className="flex flex-row text-xl gap-x-6">
        <li><a href="https://www.google.com/">Bootcamps</a></li>
        <li><a href="https://www.google.com/">Cursos</a></li>
        <li><a href="https://www.google.com/">Eventos</a></li>
        <li><a href="https://www.google.com/">Nosotros</a></li>
      </ul>
    </nav>
  )
}

export default NavBar;
