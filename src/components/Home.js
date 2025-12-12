import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import './Home.css';

function Home() {
  const [user, setUser] = useState(null);
  const [popularHorses, setPopularHorses] = useState([]);
  const [nextRaceCountdown, setNextRaceCountdown] = useState(null);
  const [isChatBotVisible, setIsChatBotVisible] = useState(false); // Sohbet botunun görünürlüğünü kontrol et
  const history = useHistory();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUser(userData);
    } else {
      history.push('/login');
    }
  }, [history]);

  useEffect(() => {
    setPopularHorses([
      { name: 'At 1', odds: 3.5 },
      { name: 'At 2', odds: 2.1 },
      { name: 'At 3', odds: 5.0 }
    ]);

    const nextRaceTime = new Date().getTime() + 3600000; // 1 saat sonra yarış
    setNextRaceCountdown(nextRaceTime);

    const countdownInterval = setInterval(() => {
      const now = new Date().getTime();
      const distance = nextRaceTime - now;
      if (distance <= 0) {
        clearInterval(countdownInterval);
        setNextRaceCountdown(null);
      } else {
        setNextRaceCountdown(distance);
      }
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, []);

  const formatCountdown = (countdown) => {
    const hours = Math.floor(countdown / (1000 * 60 * 60));
    const minutes = Math.floor((countdown % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((countdown % (1000 * 60)) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  // Sohbet botunun açılması ve kapanması
  const toggleChatBot = () => {
    setIsChatBotVisible(!isChatBotVisible);
  };

  return (
    <div className="Home">
      {user ? (
        <>
          <div className="welcome-container">
            <h1>Yarış Dünyasına Hoş Geldiniz, {user.username}!</h1>
            <p className="sub-heading">
              <strong>Hadi kazananı bulalım!</strong> 🚀
            </p>
            <p className="intro-text">
              Yarışlar başlamak üzere! Şansını denemek için doğru yerdesin. Bahis yap, heyecanı yakala!
            </p>
            <Link to="/bet-form">
              <button className="cta-button">Bahis Yap ve Kazan</button>
            </Link>
          </div>

          <div className="features-container">
            <div className="feature-item">
              <h2>
                <Link to="/canli-yaris-takibi">Canlı Yarış Takibi</Link>
              </h2>
              <p>
                Yarışları anlık olarak takip edebilir, kazananları tahmin edebilir ve her an kazanç sağlayabilirsiniz. 🏇
              </p>
            </div>
            <div className="feature-item">
              <h2>
                <Link to="/canli-yaris-secimi">Yarışçı Seçimi</Link>
              </h2>
              <p>
                En güçlü yarışçıyı seç, kazanma şansını artır. Hangi at bugün yarışıyor? Hangi at ön planda? 🏆
              </p>
            </div>
            <div className="feature-item">
              <h2>
                <Link to="/canli-istatistikler">Canlı İstatistikler</Link>
              </h2>
              <p>
                Her yarışın verilerini anında görerek stratejik kararlar alabilir, kazancınızı artırabilirsiniz. 📊
              </p>
            </div>
          </div>

          <div className="popular-horses">
            <h2>Popüler Atlar</h2>
            <ul>
              {popularHorses.map((horse, index) => (
                <li key={index}>
                  <strong>{horse.name}</strong> - {horse.odds} Katı
                </li>
              ))}
            </ul>
          </div>

          {nextRaceCountdown && (
            <div className="countdown-container">
              <h3>Sonraki Yarış Başlamak Üzere</h3>
              <p>Yarışa kalan süre: {formatCountdown(nextRaceCountdown)}</p>
            </div>
          )}

          <div className="cta-footer">
            <p>
              Yarışlar Başlıyor, Hazır Mısınız? 🚦 Hızlıca bir bahis yapın ve büyük ödülü kazanın! 💰
            </p>
            <Link to="/bet-form">
              <button className="cta-button">Bahis Yap ve Kazan</button>
            </Link>
          </div>
        </>
      ) : (
        <p>Yükleniyor...</p>
      )}

     
      
     
    </div>
  );
}

export default Home;
