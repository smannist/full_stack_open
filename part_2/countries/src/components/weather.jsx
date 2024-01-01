import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ lat, lon, capital }) => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  const openWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  useEffect(() => {
    axios
      .get(openWeatherUrl)
      .then((response) => {
        setWeather(response.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 429) {
          setError("Too many requests. Please try again later.");
        }
      });
  }, []);

  return (
    <div>
      <h4>Current weather in {capital}</h4>
      {error && <p>{error}</p>}
      {weather && (
        <div>
          {weather.weather && weather.weather.length > 0 && (
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={`Weather icon for ${capital}`}
            />
          )}
          <p>
            <b>Temperature:</b> {weather.main.temp} &deg;C
          </p>
          <p>
            <b>Wind speed:</b> {weather.wind.speed} m/s
          </p>
        </div>
      )}
    </div>
  );

};

export default Weather;
