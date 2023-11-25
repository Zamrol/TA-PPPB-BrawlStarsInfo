import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DetailPage.css"
import { useParams } from "react-router-dom";

function MapDetail() {
  const { id } = useParams();
  const [map, setMap] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`https://api.brawlapi.com/v1/maps/${id}`);
        console.log("API response:", response.data); 
        if (response.status === 200) {
          setMap(response.data);
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
  if (!map) {
    return <p>Data tidak tersedia</p>;
  }

  return (
    <div className="map-detail">
    <div className="environment-container">
      <img src={map.environment.imageUrl} className="environment-image" alt="Environment" />
      <p className="map-name-over-environment">{map.name}</p>
    </div>
    <img src={map.imageUrl} alt={map.name} className="map-image" />
  </div>
  );
}

export default MapDetail;
