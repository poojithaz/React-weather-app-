import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS file

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('London');
  const [currentTime, setCurrentTime] = useState('');

  const API_KEY = ' Your API key'; 

  useEffect(() => {
    const fetchWeather = async () => { 
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
        setWeather(response.data);
        updateCurrentTime(response.data.timezone);
      } catch (error) {
        console.error('Error fetching the weather data:', error);
      }
    };
    fetchWeather();
  }, [city]);

  const updateCurrentTime = (timezone) => {
    const localTime = new Date();
    const localOffset = localTime.getTimezoneOffset() * 60000; // Local time offset in milliseconds
    const cityOffset = timezone * 1000; // Convert timezone from seconds to milliseconds

    const cityTime = new Date(localTime.getTime() + localOffset + cityOffset);
    setCurrentTime(cityTime.toLocaleTimeString());
  };

  return (
    <div className="container">
      <h1 className="heading">Weather App</h1>
      <input 
        type="text" 
        value={city} 
        onChange={e => setCity(e.target.value)} 
        className="input"
        placeholder="Enter city"
      />
      {weather && (
        <div className="weather">
          <h2>{weather.name}</h2>
          <p>{weather.weather[0].description}</p>
          <p>{Math.round(weather.main.temp - 273.15)}°C</p>
          <p>Current Time: {currentTime}</p>
        </div>
      )}
    </div>
  );
}

export default App;
