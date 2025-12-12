import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

const Logout = ({ onLogout }) => {
  useEffect(() => {
    onLogout(); // Çıkış yapıldığında kullanıcının bilgisini temizliyoruz
  }, [onLogout]);

  return <Redirect to="/login" />; // Çıkış yapıldığında login sayfasına yönlendiriyoruz
};

export default Logout;
