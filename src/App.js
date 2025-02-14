import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentLocation } from './store/reducer/WeatherReducer';
import { useCurrentWeather } from './hook/useCurrentWeather';
import Weather from './page/Weather';
import News from './page/News';
import Header from './components/Header';
import Menu from './components/Menu';
import './App.css';

function App() {

  const dispatch = useDispatch();

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      dispatch(setCurrentLocation({ lat, lon }));
    })
  }

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const { currentLocation, searchCity } = useSelector(state => state.weather);
  const { data } = useCurrentWeather(currentLocation.lat, currentLocation.lon, searchCity);

  const backgroundColor = (data) => {
    if (data) {
      if (!['01', '02'].includes(data.slice(0, 2))) {
        return 'linear-gradient(180deg, rgba(124,124,124,1) 0%, rgba(36,88,138,1) 100%)';
      } else {
        if (data.includes('d')) {
          return 'linear-gradient(180deg, rgba(55,152,247,1) 0%, rgba(32,19,158,1) 100%)';
        } else {
          return 'linear-gradient(180deg, rgba(26,28,59,1) 0%, rgba(1,0,14,1) 100%)';
        }
      }
    }
  }

  return (
    <div className="App" style={{ background: `${backgroundColor(data?.weather[0].icon)}`}}>
      <Menu />
      <Header />
      <Routes>
        <Route path='/' element={<Weather />} />
        <Route path='/news' element={<News />} />
      </Routes>
    </div>
  );
}

export default App;
