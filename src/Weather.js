import React, { useState, useEffect } from 'react';
import { Form, Container, Row, Col, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { setCity, setWeatherData, selectCityAndWeatherData } from './redux/weatherSlice';

function Weather() {
  const dispatch = useDispatch();
  const { city, weatherData } = useSelector(selectCityAndWeatherData);
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
  }, [city]);

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(`https://api.tomorrow.io/v4/timelines?location=${city}&fields=temperature&timesteps=1h&units=metric&apikey=${API_KEY}`);
      const data = await response.json();
      dispatch(setWeatherData(data.data.timelines[0].intervals[0].values.temperature));
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
        <h1 className="weather-title">WEATHER APP</h1>
          <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Rotating_earth_%28huge%29.gif/480px-Rotating_earth_%28huge%29.gif" alt="Planet Logo" className="planet-logo" />
          <Form.Group controlId="cityInput">
            <Form.Label className="select-label">Enter a city:</Form.Label>
            <Form.Control
              type="text"
              value={city}
              onChange={(event) => dispatch(setCity(event.target.value))}
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
