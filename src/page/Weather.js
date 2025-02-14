import React from 'react';
import CurrentWeather from '../components/CurrentWeather';
import TimeWeather from '../components/TimeWeather';
import FiveDaysWeather from '../components/FiveDaysWeather';
import "../style/Weather.css";
import { useSelector } from 'react-redux';

function Weather() {

  const { searchBtnClick } = useSelector(state => state.weather);

  const timestampToHour = (dt) => {
    let date = new Date(dt);
    let hour = ('0' + date.getHours()).slice(-2);

    if (hour === '00') {
      hour = '24';
    }

    return hour;
  }
  
  return (
    <div className={`${searchBtnClick ? "weather on" : "weather"}`}>
      <div className="weather_inner">
        <CurrentWeather />
        <TimeWeather timestampToHour={timestampToHour} />
        <FiveDaysWeather />
      </div>
    </div>
  )
}

export default Weather;