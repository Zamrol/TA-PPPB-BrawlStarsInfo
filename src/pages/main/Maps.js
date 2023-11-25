import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './MainPage.css'

const Maps = () => {
  const [maps, setMaps] = useState([]);
  const [query, setQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); 
  const [sortBy, setSortBy] = useState('id'); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.brawlapi.com/v1/maps');
        setMaps(response.data.list);
      } catch (error) {
        console.error('Error fetching Brawlers:', error);
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

  const sortedMaps = [...maps].sort((a, b) => {
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

  const filteredMaps = sortedMaps.filter((map) =>
    map.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className='maps-container'>
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

      <ul className='maps-list'>
        {filteredMaps.map((map) => (
          <li key={map.id} className='maps-list-item'>
            <Link to={`/map/${map.id}`}>
              <img src={map.imageUrl} alt={map.name} className='maps-image' />
              <p className='maps-title'>{map.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Maps;