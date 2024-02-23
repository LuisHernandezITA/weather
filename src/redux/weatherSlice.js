import { createSlice, createSelector } from '@reduxjs/toolkit';

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    city: 'Mexico',
    weatherData: null,
  },
  reducers: {
    setCity(state, action) {
      state.city = action.payload;
    },
    setWeatherData(state, action) {
      state.weatherData = action.payload;
    },
  },
});

export const { setCity, setWeatherData } = weatherSlice.actions;

export const selectCity = state => state.weather.city;
export const selectWeatherData = state => state.weather.weatherData;

export const selectCityAndWeatherData = createSelector(
  selectCity,
  selectWeatherData,
  (city, weatherData) => ({
    city,
    weatherData,
  })
);

export default weatherSlice.reducer;