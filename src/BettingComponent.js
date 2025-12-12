// src/BettingComponent.js
import React, { useState } from 'react';

function BettingComponent() {
  const [betAmount, setBetAmount] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('');

  const handleBetAmountChange = (event) => {
    setBetAmount(event.target.value);
  };

  const handleTeamChange = (event) => {
    setSelectedTeam(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Bahis Miktarı: ${betAmount}, Seçilen Takım: ${selectedTeam}`);
  };

  return (
    <div className="betting-component">
      <h2>Bahis Yap</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Bahis Miktarı:
          <input
            type="number"
            value={betAmount}
            onChange={handleBetAmountChange}
            min="1"
            required
          />
        </label>
        <br />
        <label>
          Takım Seç:
          <select value={selectedTeam} onChange={handleTeamChange} required>
            <option value="">Bir takım seçin</option>
            <option value="Team A">Takım A</option>
            <option value="Team B">Takım B</option>
          </select>
        </label>
        <br />
        <button type="submit">Bahis Yap</button>
      </form>
    </div>
  );
}

export default BettingComponent;
