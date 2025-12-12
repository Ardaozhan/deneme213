import React, { useState } from "react";

const RaceList = ({ races, loading, error, onAddRace, onDeleteRace }) => {
  const [newRaceName, setNewRaceName] = useState("");

  const handleAddRace = () => {
    if (newRaceName.trim()) {
      const newRace = {
        id: races.length + 1,  // ID'yi basitçe yarışların uzunluğuna göre oluşturuyoruz
        name: newRaceName,
      };
      onAddRace(newRace);  // Yarışı ekliyoruz
      setNewRaceName("");  // Inputu temizliyoruz
    }
  };

  const handleDeleteRace = (id) => {
    onDeleteRace(id);  // Yarışı siliyoruz
  };

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Yarış Listesi</h1>
      
      {/* Yeni yarış ekleme */}
      <div>
        <input
          type="text"
          value={newRaceName}
          onChange={(e) => setNewRaceName(e.target.value)}
          placeholder="Yeni yarış adı"
        />
        <button onClick={handleAddRace}>Yarış Ekle</button>
      </div>

      {/* Yarışları listeleme */}
      <ul>
        {races.map((race) => (
          <li key={race.id}>
            {race.name}
            <button onClick={() => handleDeleteRace(race.id)}>Sil</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RaceList;
