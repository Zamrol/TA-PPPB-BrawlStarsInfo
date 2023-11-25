import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams} from "react-router-dom";
import './DetailPage.css';

function BrawlerDetail() {
  const { id } = useParams();
  const [brawlers, setBrawlers] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`https://api.brawlapi.com/v1/brawlers/${id}`);
        console.log("API response:", response.data);
        if (response.status === 200) {
          setBrawlers(response.data);
          setIsLoading(false);
        }
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (!brawlers) {
    return <p>Data tidak tersedia</p>;
  }

  return (
    <div className="brawler-detail">
      <img src={brawlers.imageUrl3} alt={brawlers.name} className='brawler-image'/> 
      <h2>{brawlers.name}</h2>
      <p>Rarity : {brawlers.rarity.name}</p>
      <p>Class : {brawlers.class.name}</p>
      <h3>Description : </h3>
      <p className="description">{brawlers.description}</p>
      
    
      <h3>Gadgets</h3>
      <div className="star-powers-container">
      {brawlers.gadgets.map((gadget) => (
        <div key={gadget.id} className="star-power">
          <img src={gadget.imageUrl} alt={gadget.name} className="star-power-image" />
          <h4>{gadget.name}</h4>
          <p>{gadget.description}</p>
        </div>
      ))}
      
      </div>

      <h3>Star Powers:</h3>
      <div className="star-powers-container">
      {brawlers.starPowers.map((starPower) => (
        <div key={starPower.id} className="star-power">
          <img src={starPower.imageUrl} alt={starPower.name} className="star-power-image" />
          <h4>{starPower.name}</h4>
          <p>{starPower.description}</p>
        </div>
      ))}
      </div>
    </div>
  );
}

export default BrawlerDetail;
