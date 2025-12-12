import React, { useState } from 'react';

const Register = ({ onRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Burada basit bir kullanıcı kayıt işlemi yapıyoruz
    const userData = { email, password };
    onRegister(userData); // Kayıt işlemi başarılıysa onRegister fonksiyonu ile kullanıcıyı giriş yaptırıyoruz
  };

  return (
    <div>
      <h2>Kayıt Ol</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder="E-posta" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Şifre" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button type="submit">Kayıt Ol</button>
      </form>
      <p>Zaten hesabınız var mı? <a href="/login">Giriş Yap</a></p>
    </div>
  );
};

export default Register;
