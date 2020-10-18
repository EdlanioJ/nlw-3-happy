import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAuth } from '../context/auth';

const PrivateRoute: React.FC<RouteProps> = ({ component, ...rest }) => {
  const { signed } = useAuth();
  return signed ? (
    <Route component={component} {...rest} />
  ) : (
    <Redirect to={{ pathname: '/login' }} />
  );
};

export default PrivateRoute;
