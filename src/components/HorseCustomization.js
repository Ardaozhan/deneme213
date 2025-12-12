
import React, { useState, useEffect } from 'react';
import './HorseCustomization.css'; // Stil dosyasını dahil ettik
import RaceTrack from './RaceTrack';

const HorseCustomization = () => {
  const [horseName, setHorseName] = useState('');
  const [horseSpeed, setHorseSpeed] = useState(0);
  const [horseStamina, setHorseStamina] = useState(0);
  const [horseReactionTime, setHorseReactionTime] = useState(0);
  const [horseColor, setHorseColor] = useState('brown');
  const [horseBreed, setHorseBreed] = useState('Thoroughbred');
  const [horseMotivation, setHorseMotivation] = useState(100);
  const [horseIntelligence, setHorseIntelligence] = useState(100);
  const [horseFatigue, setHorseFatigue] = useState(0);
  const [horseExperience, setHorseExperience] = useState(0);
  const [horseTraining, setHorseTraining] = useState(100);
  const [horseRaceType, setHorseRaceType] = useState('Flat');
  const [horseHealth, setHorseHealth] = useState(100);
  const [horseAcceleration, setHorseAcceleration] = useState(0);
  const [raceDifficulty, setRaceDifficulty] = useState('Medium');
  const [horseAgility, setHorseAgility] = useState(0);
  const [horseJumpingAbility, setHorseJumpingAbility] = useState(0);
  const [horseTemperament, setHorseTemperament] = useState('Calm');
  const [horseWeight, setHorseWeight] = useState(0);
  const [horseAge, setHorseAge] = useState(0);
  const [horsePreviousInjuries, setHorsePreviousInjuries] = useState('');
  const [horseDiet, setHorseDiet] = useState('');
  const [horseRaceHistory, setHorseRaceHistory] = useState('');
  const [horseOwner, setHorseOwner] = useState('');
  const [horseSt, setHorseSt] = useState(0);
const [horseHp, setHorseHp] = useState(100);
const [horseLast6Races, setHorseLast6Races] = useState('');
const [horseKgs, setHorseKgs] = useState(0);
const [horseS20, setHorseS20] = useState(0);
const [horseBestTime, setHorseBestTime] = useState('');
const [horseCurrentStatus, setHorseCurrentStatus] = useState('Ready');
const [horseAgf, setHorseAgf] = useState(0);


  const [horses, setHorses] = useState([]); // Atları tutmak için durum

  // LocalStorage'dan atları yükleme
  useEffect(() => {
    const storedHorses = JSON.parse(localStorage.getItem('horses'));
    if (storedHorses) {
      setHorses(storedHorses);
    }
  }, []);

  // LocalStorage'a atları kaydetme
  useEffect(() => {
    if (horses.length > 0) {
      localStorage.setItem('horses', JSON.stringify(horses));
    }
  }, [horses]);

  const handleAddHorse = () => {
    const newHorse = {
      id: Date.now(),
      name: horseName,
      speed: horseSpeed,
      stamina: horseStamina,
      reactionTime: horseReactionTime,
      color: horseColor,
      breed: horseBreed,
      motivation: horseMotivation,
      intelligence: horseIntelligence,
      fatigue: horseFatigue,
      experience: horseExperience,
      training: horseTraining,
      raceType: horseRaceType,
      health: horseHealth,
      acceleration: horseAcceleration,
      raceDifficulty: raceDifficulty,
      agility: horseAgility,
      jumpingAbility: horseJumpingAbility,
      temperament: horseTemperament,
      weight: horseWeight,
      age: horseAge,
      previousInjuries: horsePreviousInjuries,
      diet: horseDiet,
      raceHistory: horseRaceHistory,
      owner: horseOwner,
      
    };

    setHorses([...horses, newHorse]); // Yeni atı listeye ekliyoruz
    resetFields(); // Alanları sıfırlıyoruz
  };

  const handleDeleteHorse = (id) => {
    const updatedHorses = horses.filter(horse => horse.id !== id);
    setHorses(updatedHorses); // Atı sil
  };

  const resetFields = () => {
    setHorseName('');
    setHorseSpeed(0);
    setHorseStamina(0);
    setHorseReactionTime(0);
    setHorseColor('brown');
    setHorseBreed('Thoroughbred');
    setHorseMotivation(100);
    setHorseIntelligence(100);
    setHorseFatigue(0);
    setHorseExperience(0);
    setHorseTraining(100);
    setHorseRaceType('Flat');
    setHorseHealth(100);
    setHorseAcceleration(0);
    setRaceDifficulty('Medium');
    setHorseAgility(0);
    setHorseJumpingAbility(0);
    setHorseTemperament('Calm');
    setHorseWeight(0);
    setHorseAge(0);
    setHorsePreviousInjuries('');
    setHorseDiet('');
    setHorseRaceHistory('');
    setHorseOwner('');
  };

  return (
    <div className="horse-customization">
      <h2>At Özelleştirme</h2>

      {/* At Ekleme Formu */}
      <div className="form-group">
        <label>At Adı:</label>
        <input
          type="text"
          value={horseName}
          onChange={(e) => setHorseName(e.target.value)}
          placeholder="Atınızın adını girin"
        />
      </div>

      <div className="form-group">
        <label>Hız:</label>
        <input
          type="number"
          value={horseSpeed}
          onChange={(e) => setHorseSpeed(Number(e.target.value))}
          min="0"
          max="100"
          placeholder="Atınızın hızını girin"
        />
      </div>

      <div className="form-group">
  <label>St:</label>
  <input
    type="number"
    value={horseSt}
    onChange={(e) => setHorseSt(Number(e.target.value))}
    min="0"
    max="100"
    placeholder="St değeri girin"
  />
</div>

<div className="form-group">
  <label>HP:</label>
  <input
    type="number"
    value={horseHp}
    onChange={(e) => setHorseHp(Number(e.target.value))}
    min="0"
    max="100"
    placeholder="HP değeri girin"
  />
</div>

<div className="form-group">
  <label>Son 6 Yarış:</label>
  <input
    type="text"
    value={horseLast6Races}
    onChange={(e) => setHorseLast6Races(e.target.value)}
    placeholder="Son 6 yarış sonuçlarını girin"
  />
</div>

<div className="form-group">
  <label>KGS:</label>
  <input
    type="number"
    value={horseKgs}
    onChange={(e) => setHorseKgs(Number(e.target.value))}
    min="0"
    max="100"
    placeholder="KGS değeri girin"
  />
</div>

<div className="form-group">
  <label>s20:</label>
  <input
    type="number"
    value={horseS20}
    onChange={(e) => setHorseS20(Number(e.target.value))}
    min="0"
    max="20"
    placeholder="s20 değeri girin"
  />
</div>

<div className="form-group">
  <label>En İyi Derece:</label>
  <input
    type="text"
    value={horseBestTime}
    onChange={(e) => setHorseBestTime(e.target.value)}
    placeholder="En iyi dereceyi girin"
  />
</div>

<div className="form-group">
  <label>Güncel Durum:</label>
  <select
    value={horseCurrentStatus}
    onChange={(e) => setHorseCurrentStatus(e.target.value)}
  >
    <option value="Ready">Hazır</option>
    <option value="Injured">Yaralı</option>
    <option value="Training">Antrenmanda</option>
  </select>
</div>

<div className="form-group">
  <label>AGF:</label>
  <input
    type="number"
    value={horseAgf}
    onChange={(e) => setHorseAgf(Number(e.target.value))}
    min="0"
    max="100"
    placeholder="AGF değeri girin"
  />
</div>


      <div class="form-group">
        <label>Dayanıklılık:</label>
        <input
          type="number"
          value={horseStamina}
          onChange={(e) => setHorseStamina(Number(e.target.value))}
          min="0"
          max="100"
          placeholder="Atınızın dayanıklılığını girin"
        />
      </div>

      <div class="form-group">
        <label>Reaksiyon Süresi (saniye):</label>
        <input
          type="number"
          value={horseReactionTime}
          onChange={(e) => setHorseReactionTime(Number(e.target.value))}
          min="0"
          max="10"
          placeholder="Reaksiyon süresi girin"
        />
      </div>

      <div class="form-group">
        <label>At Rengi:</label>
        <select value={horseColor} onChange={(e) => setHorseColor(e.target.value)}>
          <option value="brown">Kahverengi</option>
          <option value="black">Siyah</option>
          <option value="white">Beyaz</option>
          <option value="gray">Gri</option>
          <option value="chestnut">Kızıl</option>
        </select>
      </div>

      <div class="form-group">
        <label>At Cinsi:</label>
        <select value={horseBreed} onChange={(e) => setHorseBreed(e.target.value)}>
          <option value="Thoroughbred">İngiliz Trotteri</option>
          <option value="Arabian">Arap</option>
          <option value="Quarter Horse">Çeyrek At</option>
          <option value="Clydesdale">Clydesdale</option>
        </select>
      </div>

      <div class="form-group">
        <label>Motivasyon (%):</label>
        <input
          type="number"
          value={horseMotivation}
          onChange={(e) => setHorseMotivation(Number(e.target.value))}
          min="0"
          max="100"
        />
      </div>

      <div class="form-group">
        <label>Zeka Seviyesi (%):</label>
        <input
          type="number"
          value={horseIntelligence}
          onChange={(e) => setHorseIntelligence(Number(e.target.value))}
          min="0"
          max="100"
        />
      </div>

      <div class="form-group">
        <label>Yorgunluk (%):</label>
        <input
          type="number"
          value={horseFatigue}
          onChange={(e) => setHorseFatigue(Number(e.target.value))}
          min="0"
          max="100"
        />
      </div>

      <div class="form-group">
        <label>Sağlık Durumu (%):</label>
        <input
          type="number"
          value={horseHealth}
          onChange={(e) => setHorseHealth(Number(e.target.value))}
          min="0"
          max="100"
        />
      </div>

      <div class="form-group">
        <label>Hızlanma (0-100):</label>
        <input
          type="number"
          value={horseAcceleration}
          onChange={(e) => setHorseAcceleration(Number(e.target.value))}
          min="0"
          max="100"
        />
      </div>

      <div class="form-group">
        <label>Çeviklik (0-100):</label>
        <input
          type="number"
          value={horseAgility}
          onChange={(e) => setHorseAgility(Number(e.target.value))}
          min="0"
          max="100"
        />
      </div>

            <div class="form-group">
        <label>Atın Yaşı:</label>
        <input
          type="number"
          value={horseAge}
          onChange={(e) => setHorseAge(Number(e.target.value))}
          min="0"
          max="30"
        />
      </div>

      <div class="form-group">
        <label>Geçmiş Yaralanmalar:</label>
        <input
          type="text"
          value={horsePreviousInjuries}
          onChange={(e) => setHorsePreviousInjuries(e.target.value)}
          placeholder="Geçmiş yaralanmaları girin"
        />
      </div>

      <div class="form-group">
        <label>Diyet:</label>
        <input
          type="text"
          value={horseDiet}
          onChange={(e) => setHorseDiet(e.target.value)}
          placeholder="Atınızın diyetini girin"
        />
      </div>

      <div class="form-group">
        <label>Yarış Geçmişi:</label>
        <input
          type="text"
          value={horseRaceHistory}
          onChange={(e) => setHorseRaceHistory(e.target.value)}
          placeholder="Yarış geçmişini girin"
        />
      </div>

      <div class="form-group">
        <label>Sahibi:</label>
        <input
          type="text"
          value={horseOwner}
          onChange={(e) => setHorseOwner(e.target.value)}
          placeholder="Atın sahibini girin"
        />
      </div>

      <div class="form-group">
        <label>Yarış Tipi:</label>
        <select value={horseRaceType} onChange={(e) => setHorseRaceType(e.target.value)}>
          <option value="Flat">Düz Yarış</option>
          <option value="Steeplechase">Engelli Yarış</option>
          <option value="Harness">Koşu Yarışı</option>
        </select>
      </div>

      <div class="form-group">
        <label>Yarış Zorluk Seviyesi:</label>
        <select value={raceDifficulty} onChange={(e) => setRaceDifficulty(e.target.value)}>
          <option value="Easy">Kolay</option>
          <option value="Medium">Orta</option>
          <option value="Hard">Zor</option>
        </select>
      </div>

      <div class="form-actions">
        <button onClick={handleAddHorse} className="add-button">At Ekle</button>
        <button onClick={resetFields} className="reset-button">Sıfırla</button>
      </div>

      {/* Atlar Listesi */}
      <h3>Eklenen Atlar</h3>
      <table className="horses-table">
        <thead>
          <tr>
            <th>At Adı</th>
            <th>Hız</th>
            <th>Dayanıklılık</th>
            <th>Renk</th>
            <th>Cins</th>
            <th>Motivasyon</th>
            <th>Zeka Seviyesi</th>
            <th>Yorgunluk</th>
            <th>Sağlık Durumu</th>
            <th>Çeviklik</th>
            <th>Atın Yaşı</th>
            <th>Geçmiş Yaralanmalar</th>
            <th>Diyet</th>
            <th>Yarış Geçmişi</th>
            <th>Sahibi</th>
            <th>Sil</th>
          </tr>
        </thead>
        <tbody>
          {horses.map((horse) => (
            <tr key={horse.id}>
              <td>{horse.name}</td>
              <td>{horse.speed}</td>
              <td>{horse.stamina}</td>
              <td>{horse.color}</td>
              <td>{horse.breed}</td>
              <td>{horse.motivation}</td>
              <td>{horse.intelligence}</td>
              <td>{horse.fatigue}</td>
              <td>{horse.health}</td>
              <td>{horse.agility}</td>
              <td>{horse.age}</td>
              <td>{horse.previousInjuries}</td>
              <td>{horse.diet}</td>
              <td>{horse.raceHistory}</td>
              <td>{horse.owner}</td>
              <td>
                <button onClick={() => handleDeleteHorse(horse.id)} className="delete-button">Sil</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HorseCustomization;
