import { faFacebook, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import React from 'react';
import Icon from '../Stateless/Icon/Icon';

const Footer = () => {
  return (
    <footer className="w-full px-12 py-4 bg-white border-t">
      <div className="flex items-center justify-between mx-auto max-w-7xl">
        <div className="text-center">© 2021 BootcamPe. Todos los derechos reservados.</div>
        <ul className="grid grid-cols-3 text-2xl gap-x-4">
          <li><Icon icon={faFacebook} /></li>
          <li><Icon icon={faInstagram} /></li>
          <li><Icon icon={faYoutube} /></li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer;
