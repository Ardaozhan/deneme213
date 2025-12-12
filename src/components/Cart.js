import React from 'react';
import './Cart.css';

function Cart({ cart, onRemoveFromCart }) {
  return (
    <div className="Cart">
      <h2>Sepetim</h2>
      {cart.length === 0 ? (
        <p>Sepetiniz boş.</p>
      ) : (
        <ul>
          {cart.map((item, index) => (
            <li key={index} className="cart-item">
              <span>{item.horse}</span>
              <button onClick={() => onRemoveFromCart(item.horse)}>Kaldır</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Cart;
