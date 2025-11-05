import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Weather.css";
import locationIcon from "../../assets/location_img.svg";
import temperatureIcon from "../../assets/temperature_img.svg";
import humidityIcon from "../../assets/humidity_img.svg";
import sunnyIcon from "../../assets/sunny_img.svg";
import cloudIcon from "../../assets/cloudy_img.svg";
import RainIcon from "../../assets/Rain_img.svg";
import SnowIcon from "../../assets/snow_img.svg";

const Weather = () => {
  const [weather, setWeather] = useState({
    temp: "--°C",
    condition: "--",
    location: "Getting location...",
    humidity: "--%",
    icon: sunnyIcon,
  });
  const [locationError, setLocationError] = useState(false);

  const API_KEY = "c90c42c92b87b8c6431e6b6568e23bd0";

  // Function to get weather by coordinates
  const getWeatherByCoords = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );

      const weatherData = response.data;
      const weatherCondition = weatherData.weather[0].main;
      const weatherIcons = {
        Clear: sunnyIcon,
        Clouds: cloudIcon,
        Rain: RainIcon,
        Drizzle: RainIcon,
        Snow: SnowIcon,
        Thunderstorm: RainIcon,
        Mist: cloudIcon,
        Smoke: cloudIcon,
        Haze: cloudIcon,
        Dust: cloudIcon,
        Fog: cloudIcon,
        Sand: cloudIcon,
        Ash: cloudIcon,
        Squall: cloudIcon,
        Tornado: cloudIcon,
      };

      setWeather({
        temp: `${Math.round(weatherData.main.temp)}°C`,
        condition: weatherCondition,
        location: `${weatherData.name}, ${weatherData.sys.country}`,
        humidity: `${weatherData.main.humidity}%`,
        icon: weatherIcons[weatherCondition] || sunnyIcon,
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
      // Fallback to default location if weather API fails
      setWeather({
        temp: "25°C",
        condition: "Clear",
        location: "Location unavailable",
        humidity: "60%",
        icon: sunnyIcon,
      });
    }
  };

  // Function to get weather by city name (fallback)
  const getWeatherByCity = async (cityName = "Trichy") => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );

      const weatherData = response.data;
      const weatherCondition = weatherData.weather[0].main;
      const weatherIcons = {
        Clear: sunnyIcon,
        Clouds: cloudIcon,
        Rain: RainIcon,
        Drizzle: RainIcon,
        Snow: SnowIcon,
        Thunderstorm: RainIcon,
        Mist: cloudIcon,
        Smoke: cloudIcon,
        Haze: cloudIcon,
        Dust: cloudIcon,
        Fog: cloudIcon,
        Sand: cloudIcon,
        Ash: cloudIcon,
        Squall: cloudIcon,
        Tornado: cloudIcon,
      };

      setWeather({
        temp: `${Math.round(weatherData.main.temp)}°C`,
        condition: weatherCondition,
        location: `${weatherData.name}, ${weatherData.sys.country}`,
        humidity: `${weatherData.main.humidity}%`,
        icon: weatherIcons[weatherCondition] || sunnyIcon,
      });
    } catch (error) {
      console.error("Error fetching weather data by city:", error);
      setWeather({
        temp: "25°C",
        condition: "Clear",
        location: "Weather unavailable",
        humidity: "60%",
        icon: sunnyIcon,
      });
    }
  };

  // Function to get user's current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      setWeather((prev) => ({ ...prev, location: "Getting location..." }));

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          getWeatherByCoords(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
          setLocationError(true);

          // Handle different geolocation errors
          switch (error.code) {
            case error.PERMISSION_DENIED:
              setWeather((prev) => ({
                ...prev,
                location: "Location access denied",
              }));
              break;
            case error.POSITION_UNAVAILABLE:
              setWeather((prev) => ({
                ...prev,
                location: "Location unavailable",
              }));
              break;
            case error.TIMEOUT:
              setWeather((prev) => ({
                ...prev,
                location: "Location request timeout",
              }));
              break;
            default:
              setWeather((prev) => ({ ...prev, location: "Location error" }));
              break;
          }

          // Fallback to default city
          setTimeout(() => getWeatherByCity(), 2000);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000, // 5 minutes cache
        }
      );
    } else {
      setLocationError(true);
      setWeather((prev) => ({ ...prev, location: "Geolocation not supported" }));
      // Fallback to default city
      getWeatherByCity();
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <div className="weather-container">
      <div className="condition weather-icon">
        <img src={weather.icon} alt="Weather Condition" />
        <p>{weather.condition}</p>
      </div>

      <div className="location weather-icon">
        <img src={locationIcon} alt="Location" />
        <p title={weather.location}>{weather.location}</p>
        {locationError && (
          <button
            className="retry-location"
            onClick={() => {
              setLocationError(false);
              getCurrentLocation();
            }}
            title="Retry getting location"
          >
            📍
          </button>
        )}
      </div>

      <div className="temperature weather-icon">
        <img src={temperatureIcon} alt="Temperature" />
        <p>{weather.temp}</p>
      </div>

      <div className="humidity weather-icon">
        <img src={humidityIcon} alt="Humidity" />
        <p>{weather.humidity}</p>
      </div>
    </div>
  );
};

export default Weather;
