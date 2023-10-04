import React, { useEffect,useContext } from 'react';
import { useLocation, Navigate,useParams } from 'react-router-dom';
import { MyContext } from '.';


export const PrivateRoute = props => {
  let location = useLocation();
  const { website } = useParams();

  const { context } = useContext(MyContext);
    if (!context.user) {
    return <Navigate to={`/${website}/login/`} state={{ from: location }} />;

  }

  return props.children;
}

