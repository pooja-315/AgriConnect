import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';
import sunny_img from '../../assets/sunny_img.svg';
import Rain_img from '../../assets/Rain_img.svg';
import seed_img from '../../assets/seed_img.svg';

const Dashboard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = "c90c42c92b87b8c6431e6b6568e23bd0";

  // Get detailed weather data with forecast
  const getWeatherForecast = async (lat, lon) => {
    try {
      // Current weather
      const currentResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );

      // 5-day forecast
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );

      const currentWeather = currentResponse.data;
      const forecast = forecastResponse.data;

      setWeatherData({
        current: currentWeather,
        forecast: forecast.list.slice(0, 8), // Next 24 hours (3-hour intervals)
        location: `${currentWeather.name}, ${currentWeather.sys.country}`
      });

      generateAlertsAndPredictions(currentWeather, forecast.list);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setLoading(false);
    }
  };

  // Generate weather-based alerts and predictions
  const generateAlertsAndPredictions = (current, forecast) => {
    const newAlerts = [];
    const newPredictions = [];

    // Temperature alerts
    if (current.main.temp > 35) {
      newAlerts.push({
        type: 'warning',
        title: 'High Temperature Alert',
        message: 'Temperature above 35°C. Increase irrigation frequency and provide shade for crops.',
        icon: '🌡️',
        priority: 'high'
      });
    }

    if (current.main.temp < 10) {
      newAlerts.push({
        type: 'danger',
        title: 'Cold Weather Alert',
        message: 'Temperature below 10°C. Protect sensitive crops from frost damage.',
        icon: '❄️',
        priority: 'high'
      });
    }

    // Humidity alerts
    if (current.main.humidity > 85) {
      newAlerts.push({
        type: 'warning',
        title: 'High Humidity Alert',
        message: 'Humidity above 85%. Risk of fungal diseases. Improve ventilation.',
        icon: '💧',
        priority: 'medium'
      });
    }

    // Rain predictions
    const rainForecast = forecast.filter(item => 
      item.weather[0].main === 'Rain' || item.weather[0].main === 'Drizzle'
    );

    if (rainForecast.length > 0) {
      newAlerts.push({
        type: 'info',
        title: 'Rain Expected',
        message: `Rain predicted in next ${rainForecast.length * 3} hours. Plan harvesting accordingly.`,
        icon: '🌧️',
        priority: 'medium'
      });

      newPredictions.push({
        title: 'Irrigation Recommendation',
        description: 'Reduce or skip irrigation due to expected rainfall',
        action: 'Postpone watering schedule',
        savings: 'Save 20-30% water costs'
      });
    }

    // Wind speed alerts
    if (current.wind.speed > 10) {
      newAlerts.push({
        type: 'warning',
        title: 'High Wind Alert',
        message: 'Strong winds detected. Secure loose equipment and check plant supports.',
        icon: '💨',
        priority: 'medium'
      });
    }

    // Farming predictions based on weather
    if (current.main.temp >= 20 && current.main.temp <= 30 && current.main.humidity < 70) {
      newPredictions.push({
        title: 'Optimal Growing Conditions',
        description: 'Perfect weather for most crops growth',
        action: 'Good time for transplanting seedlings',
        benefits: 'Higher germination rates expected'
      });
    }

    if (current.main.humidity < 40) {
      newPredictions.push({
        title: 'Drought Risk Assessment',
        description: 'Low humidity indicates dry conditions',
        action: 'Increase irrigation frequency',
        benefits: 'Prevent crop stress and yield loss'
      });
    }

    // Seasonal recommendations
    const currentMonth = new Date().getMonth();
    if (currentMonth >= 5 && currentMonth <= 8) { // Monsoon season
      newPredictions.push({
        title: 'Monsoon Season Tips',
        description: 'Best time for kharif crops',
        action: 'Plant rice, cotton, sugarcane',
        benefits: 'Maximize monsoon benefits'
      });
    }

    setAlerts(newAlerts);
    setPredictions(newPredictions);
  };

  // Get user location and fetch weather
  const initializeDashboard = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          getWeatherForecast(latitude, longitude);
        },
        (error) => {
          console.error("Geolocation error:", error);
          // Fallback to default location (Trichy)
          getWeatherForecast(10.7905, 78.7047);
        }
      );
    } else {
      getWeatherForecast(10.7905, 78.7047);
    }
  };

  useEffect(() => {
    initializeDashboard();
  }, []);

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading-dashboard">
          <h2>Loading Dashboard...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Farm Dashboard</h1>
        <p>Weather-based insights and recommendations</p>
      </div>

      {/* Weather Summary */}
      <div className="weather-summary">
        <div className="current-weather">
          <h3>Current Conditions</h3>
          {weatherData && (
            <div className="weather-info">
              <div className="weather-main">
                <span className="temperature">{Math.round(weatherData.current.main.temp)}°C</span>
                <span className="condition">{weatherData.current.weather[0].main}</span>
              </div>
              <div className="weather-details">
                <span>Humidity: {weatherData.current.main.humidity}%</span>
                <span>Wind: {Math.round(weatherData.current.wind.speed)} km/h</span>
                <span>Pressure: {weatherData.current.main.pressure} hPa</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Alerts Section */}
      <div className="alerts-section">
        <h2>🚨 Active Alerts</h2>
        {alerts.length > 0 ? (
          <div className="alerts-grid">
            {alerts.map((alert, index) => (
              <div key={index} className={`alert-card ${alert.type} ${alert.priority}`}>
                <div className="alert-icon">{alert.icon}</div>
                <div className="alert-content">
                  <h4>{alert.title}</h4>
                  <p>{alert.message}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-alerts">
            <p>✅ No active weather alerts. Conditions are favorable for farming.</p>
          </div>
        )}
      </div>

      {/* Predictions and Recommendations */}
      <div className="predictions-section">
        <h2>🔮 Predictive Insights</h2>
        {predictions.length > 0 ? (
          <div className="predictions-grid">
            {predictions.map((prediction, index) => (
              <div key={index} className="prediction-card">
                <h4>{prediction.title}</h4>
                <p className="description">{prediction.description}</p>
                <div className="recommendation">
                  <strong>Recommended Action:</strong> {prediction.action}
                </div>
                <div className="benefits">
                  <strong>Benefits:</strong> {prediction.benefits || prediction.savings}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-predictions">
            <p>📊 Analyzing weather patterns for predictions...</p>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="actions-grid">
          <button onClick={() => window.location.href = '/crop-recommender'}>
            🌱 Get Crop Recommendations
          </button>
          <button onClick={() => window.location.href = '/smart-farm-ai'}>
            🤖 Ask Farm AI
          </button>
          <button onClick={() => window.location.href = '/disease-detection'}>
            🔍 Check Plant Health
          </button>
          <button onClick={initializeDashboard}>
            🔄 Refresh Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
export default Dashboard;
