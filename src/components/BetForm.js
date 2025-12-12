import React, { useState, useEffect } from "react";
import "./BetForm.css"; // BetForm stil dosyasını import ettik

const BetForm = ({ horses = [], onPlaceBet, balance, setBalance }) => {
  const [selectedHorse, setSelectedHorse] = useState('');
  const [betAmount, setBetAmount] = useState(0);
  const [betStatus, setBetStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [betType, setBetType] = useState("winner"); // Bahis tipi
  const [betHistory, setBetHistory] = useState([]); // Bahis geçmişi
  const [countdown, setCountdown] = useState(300); // Geri sayım süresi
  const [showPopup, setShowPopup] = useState(false); // Pop-up gösterimi
  const [chatVisible, setChatVisible] = useState(false); // Yardım sohbeti

  // Geri sayım fonksiyonu
  useEffect(() => {
    const timer = countdown > 0 && setInterval(() => setCountdown(countdown - 1), 1000);
    if (countdown === 0) {
      setBetStatus("Bahis süresi doldu!");
    }
    return () => clearInterval(timer); // Timerı temizle
  }, [countdown]);

  // Bahis gönderme işlemi
  const handleBetSubmit = () => {
    if (selectedHorse && betAmount > 0) {
      if (betAmount > balance) {
        setBetStatus('Yetersiz bakiye!');
        return;
      }

      setIsLoading(true);
      setTimeout(() => {
        onPlaceBet(selectedHorse, betAmount, betType); // Bahisi yerleştir
        setBalance(balance - betAmount); // Bakiyeyi güncelle
        setBetHistory([...betHistory, { selectedHorse, betAmount, betType }]); // Bahis geçmişine ekle
        setBetStatus(`Bahis başarıyla yapıldı! ${selectedHorse} için ${betAmount} TL bahis yapıldı.`); // Başarı mesajı
        setIsLoading(false);
        setSelectedHorse('');
        setBetAmount(0);
        setShowPopup(true); // Pop-up'ı göster
      }, 2000);
    } else {
      setBetStatus('Lütfen geçerli bir at ve bahis miktarı seçin!');
    }
  };

  return (
    <div className={`bet-form ${isLoading ? 'loading' : ''}`}>
      <h2>Bahis Formu</h2>
      
      {/* Kalan süre */}
      <div className="countdown">
        <p>Bahis için kalan süre: {countdown} saniye</p>
      </div>

      {/* Bilgilendirme Yazıları */}
      <div className="info-box">
        <h3>Yarışa Katılmak İçin Bahis Yapın!</h3>
        <p>Yarışta kazanan atı tahmin etmek, ilk 3 sıralama ya da tam sıralama bahisleri ile kazanma şansınızı arttırabilirsiniz.</p>
        <p>Bahis yaparken hesabınızda yeterli bakiye olduğundan emin olun!</p>
      </div>

      {/* Yarışçı seçimi */}
      <div className="form-group">
        <label>Yarışçı Seçin:</label>
        <select
          value={selectedHorse}
          onChange={(e) => setSelectedHorse(e.target.value)}
        >
          <option value="">Bir at seçin</option>
          {horses.map((horse, index) => (
            <option key={index} value={horse.name}>
              {horse.name}
            </option>
          ))}
        </select>
      </div>

      {/* Bahis miktarı */}
      <div className="form-group">
        <label>Bahis Miktarı:</label>
        <input
          type="number"
          value={betAmount}
          onChange={(e) => setBetAmount(e.target.value)}
          min="1"
        />
      </div>

      {/* Bahis tipi */}
      <div className="form-group">
        <label>Bahis Tipi:</label>
        <select
          value={betType}
          onChange={(e) => setBetType(e.target.value)}
        >
          <option value="winner">Kazanan At</option>
          <option value="place">İlk 3 Sıralama</option>
          <option value="exacta">Tam Sıralama</option>
        </select>
      </div>

      {/* Bahis Yap Butonu */}
      <button className="submit-btn" onClick={handleBetSubmit} disabled={isLoading}>
        {isLoading ? 'Yükleniyor...' : 'Bahis Yap'}
      </button>

      {/* Bahis durumu mesajı */}
      {betStatus && (
        <p className={`bet-status ${betStatus.includes('başarı') ? 'success' : 'error'}`}>
          {betStatus}
        </p>
      )}

      {/* Pop-up mesajı */}
      {showPopup && (
        <div className="popup">
          <p>Bahis Başarıyla Yapıldı!</p>
          <button onClick={() => setShowPopup(false)}>Kapat</button>
        </div>
      )}

      {/* Bahis geçmişi */}
      <h3>Bahis Geçmişi</h3>
      <ul>
        {betHistory.map((bet, index) => (
          <li key={index}>
            {bet.selectedHorse} - {bet.betAmount} TL - {bet.betType}
          </li>
        ))}
      </ul>

      {/* Yardımcı sohbet */}
      {chatVisible && (
        <div className="chatbot">
          <p>Yardımcı bot burada! Ne hakkında konuşmak istersiniz?</p>
          <button onClick={() => setChatVisible(false)}>Çıkış Yap</button>
        </div>
      )}
      
    
      {/* Yarış Detayları */}
      <div className="race-details">
        <h3>Yarış Detayları</h3>
        <p>Yarış saati: 17:00</p>
        <p>Yarış mesafesi: 2400 metre</p>
        <p>Ödüller: 500,000 TL</p>
      </div>
    </div>
  );
};

export default BetForm;
