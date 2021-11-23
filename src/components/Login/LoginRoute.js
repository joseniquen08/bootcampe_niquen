import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuthContext } from '../../context/authContext';

const LoginRoute = ({ children, ...rest }) => {

  const { session } = useAuthContext();

  return (
    <Route
      {...rest}
      render={({ location }) => 
        session === false ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location }
            }}
          />
        )
      }
    />
  )
}

export default LoginRoute;
