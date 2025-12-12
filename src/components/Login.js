import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Burada basit bir kullanıcı doğrulama işlemi yapıyoruz
    if (email === 'test@test.com' && password === '123456') {
      const userData = { email };
      onLogin(userData); // Giriş işlemi başarılıysa onLogin fonksiyonu ile kullanıcıyı giriş yaptırıyoruz
    } else {
      alert('Giriş Bilgileri Yanlış');
    }
  };

  return (
    <div>
      <h2>Giriş Yap</h2>
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
        <button type="submit">Giriş Yap</button>
      </form>
      <p>Hesabınız yok mu? <a href="/register">Kayıt Ol</a></p>
    </div>
  );
};

export default Login;
