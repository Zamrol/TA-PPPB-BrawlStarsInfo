import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DetailPage.css";
import { useParams } from "react-router-dom";

function GameModeDetail() {
  const { sort1 } = useParams();
  const [gameMode, setGameMode] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`https://api.brawlapi.com/v1/gamemodes/${sort1}`);
        console.log("API response:", response.data);
        if (response.status === 200) {
          setGameMode(response.data);
          setIsLoading(false);
        }
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [sort1]);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (!gameMode) {
    return <p>Data tidak tersedia</p>;
  }

  return (
    <div className="game-mode-detail">
      <h2 className="game-mode-title">{gameMode.name}</h2>
      <img src={gameMode.imageUrl} alt={gameMode.name} className='brawler-image' />
      <p>{gameMode.title}</p>
      <p>{gameMode.tutorial}</p>
    </div>
  );
}

export default GameModeDetail;
