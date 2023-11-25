import React, { useState, useEffect } from 'react';
import './Avatars.css'; 

const defaultImageUrl = 'https://media.tenor.com/HaxFI-MpgJEAAAAC/el-primo-dance.gif';

const IconPage = () => {
  const [randomIcon, setRandomIcon] = useState(null);
  const [imageError, setImageError] = useState(false);

  const fetchRandomIcon = async () => {
    try {
      const response = await fetch('https://api.brawlapi.com/v1/icons');
      const data = await response.json();

      const icons = Object.values(data.player);
      const randomIndex = Math.floor(Math.random() * icons.length);
      const randomIconData = icons[randomIndex];

      setRandomIcon(randomIconData);
      setImageError(false); 
    } catch (error) {
      console.error('Error fetching icon data:', error);
      setImageError(true);
    }
  };

  useEffect(() => {
    fetchRandomIcon();
    document.body.classList.add('avatars-detail-overflow-hidden');

    return () => {
      document.body.classList.remove('avatars-detail-overflow-hidden');
    };

  }, []); 

  const handleRandomIconClick = () => {
    fetchRandomIcon();
  };

  return (
    <div className="avatars-container">
      {randomIcon && !imageError && (
        <div className="random-icon-container">
          <img className="random-icon" src={randomIcon.imageUrl2} alt="Random Icon" onError={() => setImageError(true)} />
          <div className="icon-info">
            <p><strong>Name:</strong> {randomIcon.name}</p>
            <p><strong>ID:</strong> {randomIcon.id}</p>
          </div>
        </div>
      )}
      {(imageError || !randomIcon) && (
        <div className="random-icon-container">
          <img className="random-icon" src={defaultImageUrl} alt="Default Icon" />
          <div className="icon-info">
            <p><strong>Name:</strong> Default Icon</p>
            <p><strong>ID:</strong> N/A</p>
          </div>
        </div>
      )}
      <div className="button-container">
        <button className="randomize-button" onClick={handleRandomIconClick}>
          Get Avatar
        </button>
      </div>
    </div>
  );
};

export default IconPage;
