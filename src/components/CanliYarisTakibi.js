import React, { useEffect, useState } from 'react';

const CanliYarisTakibi = () => {
  const [races, setRaces] = useState([]); // Yarış verisini tutmak için state

  useEffect(() => {
    // JSON dosyasını fetch etme
    fetch('/data/races.json') // public klasöründeki JSON dosyasına erişim
      .then((response) => response.json()) // Veriyi JSON formatında al
      .then((data) => {
        setRaces(data); // Aldığınız veriyi React state'ine aktarın
      })
      .catch((error) => {
        console.error("Veriler alınırken bir hata oluştu:", error); // Hata durumunu handle et
      });
  }, []); // Boş bağımlılık dizisi, sayfa ilk render edildiğinde çalışır

  return (
    <div>
      <h1>Canlı Yarış Takibi</h1>
      <div>
        {races.length > 0 ? (
          races.map((race) => (
            <div key={race.id}>
              <h2>{race.raceName}</h2>
              <p>{race.city}</p>
              <p>{race.date} - {race.time}</p>
              <ul>
                {race.participants.map((participant, index) => (
                  <li key={index}>{participant.name} - {participant.jockey} (Odds: {participant.odds})</li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p>Yarışlar yükleniyor...</p> // Veriler yüklenene kadar gösterilecek mesaj
        )}
      </div>
    </div>
  );
};

export default CanliYarisTakibi;
