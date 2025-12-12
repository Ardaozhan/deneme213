import React, { useState, useEffect } from 'react';
import './CanliYarisSecimi.css';

function CanliYarisSecimi() {
  // Yarışları simüle eden veri
  const [races, setRaces] = useState([]);
  
  // API'den veri çekmek için örnek
  useEffect(() => {
    // Simüle edilen yarış verisi
    const simulatedRaces = [
      { id: 1, name: "İstanbul 1. Koşu", time: "14:30", location: "İstanbul", horses: ["At 1", "At 2", "At 3"] },
      { id: 2, name: "Ankara 2. Koşu", time: "15:00", location: "Ankara", horses: ["At 4", "At 5", "At 6"] },
      { id: 3, name: "İzmir 3. Koşu", time: "16:00", location: "İzmir", horses: ["At 7", "At 8", "At 9"] },
    ];

    // Veriyi güncelle
    setRaces(simulatedRaces);
  }, []);

  return (
    <div className="CanliYarisSecimi">
      <h1>Canlı Yarış Seçimi</h1>
      <p>Bugün yapılacak yarışları seçebilirsiniz:</p>

      <div className="race-list">
        {races.map((race) => (
          <div key={race.id} className="race-item">
            <h2>{race.name}</h2>
            <p><strong>Yarış Saati:</strong> {race.time}</p>
            <p><strong>Yarış Yeri:</strong> {race.location}</p>
            <p><strong>Katılan Atlar:</strong> {race.horses.join(", ")}</p>
            
            <button className="cta-button" >   <a href="https://www.tjk.org/TR/YarisSever/Info/Page/GunlukYarisProgrami">yarisi izle</a></button>
            
          </div>
        ))}
      </div>
    </div>
  );
}

export default CanliYarisSecimi;
