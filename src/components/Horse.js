import React from 'react';
import './Horse.css';

function Horse({ horse, onAddToCart, raceId }) {
  return (
    <li>
      <img src={`path_to_images/${horse.img}`} alt={horse.name} width="50" />
      {horse.name}
      <button onClick={() => onAddToCart(raceId, horse.name)}>Sepete Ekle</button>
    </li>
  );
}

export default Horse;
