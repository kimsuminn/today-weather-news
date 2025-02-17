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
        return 'linear-gradient(225deg, rgba(73,73,73,1) 0%, rgba(145,190,243,1) 100%)';
      } else {
        if (data.includes('d')) {
          return 'linear-gradient(45deg, rgba(168,200,237,1) 0%, rgba(79,112,222,1) 100%)';
        } else {
          return 'linear-gradient(45deg, rgba(89,97,137,1) 0%, rgba(38,21,72,1) 100%)';
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
