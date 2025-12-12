// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <h1>Bahis Uygulaması</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Anasayfa</Link>
          </li>
          <li>
            <Link to="/bet">Bahis Yap</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
