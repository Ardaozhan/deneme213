// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './styles/styles.css';  // Global stil dosyasını import et

import App from './App';  // App.js dosyasının doğru yolunu kullanın


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
