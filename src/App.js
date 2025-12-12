import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from "react-router-dom";
import axios from "axios";
import {
  saveUserToLocalStorage,
  removeUserFromLocalStorage,
  getUserFromLocalStorage,
  isAuthenticated,
} from "./components/auth";
import Home from "./components/Home";
import RaceForm from "./components/RaceForm";  // RaceForm bileşenini import ediyoruz
import CanliIstatistikler from "./components/CanliIstatistikler";
import HorseCustomization from "./components/HorseCustomization";
import RaceTrack from "./components/RaceTrack";
import BetForm from "./components/BetForm";
import Login from "./components/Login";
import Register from "./components/Register";
import Logout from "./components/Logout";

import "./styles/App.css";

function App() {
  const [horses, setHorses] = useState([]);
  const [races, setRaces] = useState([]); // Yarışlar için state
  const [loading, setLoading] = useState(true); // Yükleniyor durumu
  const [error, setError] = useState(null); // Hata durumu
  const [bets, setBets] = useState([]);
  const [balance, setBalance] = useState(1000);
  const [menuActive, setMenuActive] = useState(false);
  const [user, setUser] = useState(getUserFromLocalStorage());

  // Yarış verilerini sadece bir kez yüklemek için useEffect
  useEffect(() => {
    const fetchRaces = async () => {
      try {
        // TJK API'den günlük yarış bilgilerini alıyoruz
        const response = await axios.get("https://tjk.org/api/gunluk-yaris-programi");
        setRaces(response.data); // Yarış verilerini state'e kaydediyoruz
        setLoading(false); // Yükleniyor durumunu false yapıyoruz
      } catch (err) {
        console.error("Yarış bilgileri alınamadı:", err);
        setError("Yarış bilgileri alınırken bir hata oluştu.");
        setLoading(false);
      }
    };

    fetchRaces(); // API'yi çağırıyoruz
  }, []); // Boş array ile sadece bir kez çalışmasını sağlıyoruz

  const handleLogin = (userData) => {
    setUser(userData);
    saveUserToLocalStorage(userData);
  };

  const handleLogout = () => {
    setUser(null);
    removeUserFromLocalStorage();
  };

  const toggleMenu = () => {
    setMenuActive((prevState) => !prevState);
  };

  return (
    <Router>
      <div className="App">
        <header>
          <div className="logo">Logo</div>
          <div className="hamburger-menu" onClick={toggleMenu}>
            &#9776;
          </div>
          <div className={`hamburger-menu-content ${menuActive ? "active" : ""}`}>
            {isAuthenticated() ? (
              <Link to="/logout" onClick={handleLogout}>
                Çıkış
              </Link>
            ) : (
              <>
                <Link to="/login">Giriş Yap</Link>
                <Link to="/register">Kayıt Ol</Link>
              </>
            )}
          </div>
          <nav>
            <ul>
              <li>
                <Link to="/">Ana Sayfa</Link>
              </li>
              <li>
                <Link to="/race-list">Günün Yarışları</Link>
              </li>
              <li>
                <Link to="/bet-form">Bahis yap</Link>
              </li>
              <li>
                <Link to="/canli-yaris-takibi">Canlı Yarış Takibi</Link>
              </li>
              <li>
                <Link to="/horse-customization">At Özelleştirme</Link>
              </li>
              <li>
                <Link to="/race-track">Yarış Alanı</Link>
              </li>
              <li>Bakiyeniz: {balance} ₺</li>
            </ul>
          </nav>
        </header>

        <Switch>
          <Route exact path="/" render={() => (isAuthenticated() ? <Home /> : <Redirect to="/login" />)} />
          <Route
            path="/race-list"
            render={() =>
              isAuthenticated() ? (
                <RaceForm races={races} loading={loading} error={error} />  // Burada RaceForm'a yarış verilerini iletiyoruz
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            path="/canli-yaris-takibi"
            render={() => (isAuthenticated() ? <CanliIstatistikler horses={horses} /> : <Redirect to="/login" />)}
          />
          <Route
            path="/horse-customization"
            render={() =>
              isAuthenticated() ? <HorseCustomization onAddHorse={(newHorse) => setHorses([...horses, newHorse])} /> : <Redirect to="/login" />
            }
          />
          <Route
            path="/race-track"
            render={() =>
              isAuthenticated() ? (
                <RaceTrack horses={horses} placedBets={bets} onRaceFinish={(winner, bets) => {
                  bets.forEach((bet) => {
                    if (bet.horse === winner) setBalance((prev) => prev + bet.amount * 2);
                  });
                }} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            path="/bet-form"
            render={() =>
              isAuthenticated() ? (
                <BetForm horses={horses} onPlaceBet={(horse, amount) => setBets([...bets, { horse, amount }])} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route path="/login" render={() => (isAuthenticated() ? <Redirect to="/" /> : <Login onLogin={handleLogin} />)} />
          <Route path="/register" render={() => <Register onRegister={handleLogin} />} />
          <Route
            path="/logout"
            render={() => {
              handleLogout();
              return <Redirect to="/login" />;
            }}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
