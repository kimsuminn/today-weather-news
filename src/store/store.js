import { configureStore } from "@reduxjs/toolkit";
import WeatherReducer from './reducer/WeatherReducer';

const store = configureStore({
  reducer: {
    weather: WeatherReducer,
  }
})

export default store;