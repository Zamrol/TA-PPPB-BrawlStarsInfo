import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/header";
import Brawlers from "./pages/main/Brawlers";
import Maps from "./pages/main/Maps";
import GameMode from "./pages/main/GameMode";
import IconPage from "./pages/Avatars";
import About from './pages/About';
import BrawlerDetail from "./pages/details/BrawlerDetail";
import GameModeDetail from "./pages/details/GameModeDetail";
import MapDetail from './pages/details/MapDetail';
import SplashScreen from "./pages/SplashScreen";
import "./App.css";

function App() {
  const [isSplashScreenVisible, setIsSplashScreenVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplashScreenVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      {isSplashScreenVisible ? (
        <SplashScreen />
      ) : (
        <>
          <Router>
            <Header />
            <Routes>
              <Route exact path="/" element={<Brawlers />} />
              <Route exact path="/brawlers" element={<Brawlers />} />
              <Route exact path="/maps" element={<Maps />} />
              <Route exact path="/gamemodes" element={<GameMode />} />
              <Route exact path="/avatars" element={<IconPage />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/brawler/:id" element={<BrawlerDetail />} />
              <Route exact path="/map/:id" element={<MapDetail />} />
              <Route exact path="/game-mode/:sort1" element={<GameModeDetail />} /> 
            </Routes>
          </Router>
        </>
      )}
    </div>
  );
}

export default App;