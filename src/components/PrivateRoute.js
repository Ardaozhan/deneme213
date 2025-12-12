import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = JSON.parse(localStorage.getItem('user')); // Giriş yapmış kullanıcıyı kontrol et
  return (
    <Route 
      {...rest} 
      render={props => 
        user ? (
          <Component {...props} />  // Eğer kullanıcı giriş yapmışsa, ilgili sayfayı göster
        ) : (
          <Redirect to="/login" />  // Eğer giriş yapılmamışsa, login sayfasına yönlendir
        )
      }
    />
  );
};

export default PrivateRoute;
