import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './MainPage.css';

const GameMode = () => {
  const [gameMode, setGameMode] = useState([]);
  const [query, setQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); 
  const [sortBy, setSortBy] = useState('id'); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.brawlapi.com/v1/gamemodes');
        setGameMode(response.data.list);
      } catch (error) {
        console.error('Error fetching Game Modes:', error);
      }
    };

    fetchData();
  }, []);

  const onSearch = (e) => {
    if (e.key === 'Enter') {
      setQuery(e.target.value);
    }
  };

  const handleSort = (property) => {
    setSortBy(property);
    setSortOrder((prevSortOrder) => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
  };

  const sortedGameMode = [...gameMode].sort((a, b) => {
    const order = sortOrder === 'asc' ? 1 : -1;
  
    if (sortBy === 'id') {
      return (a.id - b.id) * order;
    } else if (sortBy === 'name') {
      const nameA = a.name.toString().toLowerCase();
      const nameB = b.name.toString().toLowerCase();
      return nameA.localeCompare(nameB) * order;
    }
  
    return 0; 
  });

  const filteredGameMode = sortedGameMode.filter((gameMode) =>
    gameMode.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className='game-mode-container'>
      <div className='search-sort-container'>
        <div className='search-container'>
          <input
            className='search-bar'
            type="text"
            placeholder="Search maps by name"
            onKeyDown={(e) => onSearch(e)}
          />
        </div>
        <div className='sort-container'>
          <button
            className={`sort-button ${sortBy === 'id' && 'active'}`}
            onClick={() => handleSort('id')}
          >
            Sort by ID {sortOrder === 'asc' ? '▲' : '▼'}
          </button>
          <button
            className={`sort-button ${sortBy === 'name' && 'active'}`}
            onClick={() => handleSort('name')}
          >
            Sort by Name {sortOrder === 'asc' ? '▲' : '▼'}
          </button>
        </div>
      </div>

      <ul className='game-mode-list'>
        {filteredGameMode.map((gameMode) => (
          <li key={gameMode.sort1} className='game-mode-list-item'>
            {gameMode && (
              <Link to={`/game-mode/${gameMode.sort1}`}>
                <img src={gameMode.imageUrl} alt={gameMode.name} className='game-mode-image' />
                <p>{gameMode.name}</p>
                
                
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GameMode;
