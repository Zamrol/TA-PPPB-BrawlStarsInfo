import React, { useState, useEffect } from 'react';
import './SplashScreen.css';

const SplashScreen = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [dots, setDots] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    const dotsInterval = setInterval(() => {
      setDots((prevDots) => (prevDots === '...' ? '' : prevDots + '.'));
    }, 370);

    return () => {
      clearTimeout(timer);
      clearInterval(dotsInterval);
    };
  }, []);

  return isVisible ? (
    <div className="splash-screen">
      <img
        src="https://media.tenor.com/HaxFI-MpgJEAAAAC/el-primo-dance.gif"
        alt="Loading..."
      />
      <div className="starting-text">Starting{dots}</div>
    </div>
  ) : null;
};

export default SplashScreen;
