import React, { useState, useEffect } from 'react';
import './RaceTrack.css';

const RaceTrack = () => {
  const [horses, setHorses] = useState([]); // LocalStorage'dan yüklenecek atlar
  const [racingHorses, setRacingHorses] = useState([]);
  const [raceDistance, setRaceDistance] = useState(1000); // Varsayılan mesafe
  const [raceInProgress, setRaceInProgress] = useState(false);
  const [isPaused, setIsPaused] = useState(false); // Yarışı duraklatma durumu
  const [winner, setWinner] = useState(null);
  const [countdown, setCountdown] = useState(3);
  

  // LocalStorage'dan atları yükleme
  useEffect(() => {
    const storedHorses = JSON.parse(localStorage.getItem('horses')) || [];
    setHorses(storedHorses);
  }, []);

  // Yarışı başlat
  const startRace = () => {
    setWinner(null);
    setRaceInProgress(true);
    setIsPaused(false);
    setCountdown(3);

    setTimeout(() => {
      const preparedHorses = horses.map((horse) => ({
        ...horse,
        position: 0,
        speed: Math.random() * 10 + 5, // Rasgele başlangıç hızı
      }));
      setRacingHorses(preparedHorses);
      setCountdown(0);
    }, 3000);
  };

  // Yarış simülasyonu
  useEffect(() => {
    if (raceInProgress && countdown === 0 && !isPaused) {
      const interval = setInterval(() => {
        setRacingHorses((prevHorses) =>
          prevHorses.map((horse) => {
            const randomSpeedChange = Math.random() * 4 - 2; // Rasgele hız değişimi
            const newSpeed = Math.max(0, horse.speed + randomSpeedChange);
            const newPosition = horse.position + newSpeed;

            if (newPosition >= raceDistance && !winner) {
              setWinner(horse); // Kazananı belirle
              setRaceInProgress(false);
            }

            return { ...horse, speed: newSpeed, position: newPosition };
          })
        );
      }, 500);

      return () => clearInterval(interval);
    }
  }, [raceInProgress, countdown, isPaused, raceDistance, winner]);

  const pauseRace = () => {
    setIsPaused(true);
  };

  const resumeRace = () => {
    setIsPaused(false);
  };

  const resetRace = () => {
    setRacingHorses([]);
    setWinner(null);
    setRaceInProgress(false);
    setCountdown(3);
    setIsPaused(false);
  };

  return (
    <div className="race-track">
      <h2>At Yarışı</h2>
      <div className="race-settings">
        <label>Yarış Mesafesi (metre):</label>
        <input
          type="number"
          value={raceDistance}
          onChange={(e) => setRaceDistance(Number(e.target.value))}
          min="100"
          max="5000"
          step="100"
        />
      </div>

      <div className="race-info">
        <p>Yarış Mesafesi: {raceDistance} metre</p>
        {countdown > 0 && <p>Yarış {countdown} saniye içinde başlayacak...</p>}
        {winner && (
          <div className="winner-info">
            <strong>Kazanan:</strong> {winner.name}
            <p>Hız: {winner.speed.toFixed(2)} m/s</p>
          </div>
        )}
      </div>

      <div className="track">
        {racingHorses.map((horse) => (
          <div
            key={horse.id}
            className={`horse ${winner && winner.id === horse.id ? 'winner' : ''}`}
            style={{
              left: `${(horse.position / raceDistance) * 100}%`,
              transition: 'left 0.5s linear',
            }}
          >
            <div className="horse-name">{horse.name}</div>
            <div className="horse-info">
              <p>Hız: {horse.speed.toFixed(2)} m/s</p>
              <p>İlerleme: {horse.position.toFixed(2)} m</p>
            </div>
          </div>
        ))}
      </div>

      <div className="buttons">
        {!raceInProgress && <button onClick={startRace}>Yarışı Başlat</button>}
        {raceInProgress && !isPaused && <button onClick={pauseRace}>Yarışı Duraklat</button>}
        {raceInProgress && isPaused && <button onClick={resumeRace}>Yarışı Devam Ettir</button>}
        <button onClick={resetRace} disabled={!raceInProgress && !winner}>
          Yarışı Sıfırla
        </button>
      </div>
    </div>
  );
};

export default RaceTrack;
