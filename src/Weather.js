import React, { useState, useEffect } from 'react';
import { Form, Container, Row, Col, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './App.css';

function Weather() {
  const [city, setCity] = useState('Mexico');
  const [weatherData, setWeatherData] = useState(null);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      const response = await fetch('http://localhost:5000/cities');
      const data = await response.json();
      setCities(data);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const API_KEY = 'Q2vzfSk9STR0RFhRroeKxvA1lWJ0DVx2';

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = async () => {
    try {
        //https://api.tomorrow.io/v4/timelines?location=${city}&fields=temperature&timesteps=1h&units=metric&apikey=${API_KEY}
        //https://api.tomorrow.io/v4/timelines?location=${city}&fields=temperature&timesteps=1h&units=metric&apikey=${API_KEY}
      const response = await axios.get(`https://api.tomorrow.io/v4/timelines?location=${city}&fields=temperature&timesteps=1h&units=metric&apikey=${API_KEY}
      `);
      setWeatherData(response.data.data.timelines[0].intervals[0].values.temperature);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      fetchWeatherData();
    }
  };

  return (
    <Container className="weather-container">
      <Row className="justify-content-center align-items-center">
        <Col xs={12} className="text-center">
          <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Rotating_earth_%28huge%29.gif/480px-Rotating_earth_%28huge%29.gif" alt="Planet Logo" className="planet-logo" />
          <h1 className="weather-title">Weather App</h1>
          <Form.Group controlId="cityInput">
            <Form.Label className="select-label">Enter a city:</Form.Label>
            <Form.Control
              type="text"
              value={city}
              onChange={(event) => setCity(event.target.value)}
              onKeyPress={handleKeyPress}
              className="city-input"
              list="cities"
            />
            <datalist id="cities">
              {cities.map((city, index) => (
                <option key={index} value={city} />
              ))}
            </datalist>
          </Form.Group>
          <div className="weather-info">
            {weatherData !== null ? (
              <p className="temperature-info">The current temperature in {city} is: {weatherData}°C</p>
            ) : (
              <p className="loading-info">Loading...</p>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Weather;