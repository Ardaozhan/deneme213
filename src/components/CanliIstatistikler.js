import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CanliIstatistikler.css";

function CanliIstatistikler() {
  const [races, setRaces] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Yarış verilerini al
  useEffect(() => {
    const fetchRaceData = async () => {
      try {
        const response = await axios.get("https://tjk.org/api/gunluk-yaris-programi");
        setRaces(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Yarış verileri alınamadı", err);
        setError("Yarış verileri alınırken bir hata oluştu.");
        setLoading(false);
      }
    };

    fetchRaceData();
  }, []);

  if (loading) {
    return <div className="loading">Veriler yükleniyor...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="canli-istatistikler">
      <h1>Canlı İstatistikler</h1>

      <div className="race-info">
        <h2>Bugünkü Yarışlar</h2>
        {races.length === 0 ? (
          <p>Bugün için yarış bulunmamaktadır.</p>
        ) : (
          <div className="race-list">
            {races.map((race, index) => (
              <div className="race-item" key={index}>
                <h3>{race.race_name}</h3>
                <p><strong>Yarış Saati:</strong> {race.start_time}</p>
                <p><strong>Yer:</strong> {race.track}</p>
                <p><strong>Açıklama:</strong> {race.description}</p>

                {/* Yarışçı Listesi */}
                <div className="horse-list">
                  <h4>Yarışçılar</h4>
                  <ul>
                    {race.horses.map((horse, horseIndex) => (
                      <li key={horseIndex}>{horse.name}</li>
                    ))}
                  </ul>
                </div>
                {/* Burada daha fazla detaylı istatistikler ve sıralamalar ekleyebilirsiniz */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CanliIstatistikler;
