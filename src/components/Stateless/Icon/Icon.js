import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Icon = ({icon, color}) => {
  return (
    <FontAwesomeIcon icon={icon} color={color} />
  )
}

export default Icon;
