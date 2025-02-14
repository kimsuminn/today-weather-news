import React from "react";
import { useCurrentWeather } from '../hook/useCurrentWeather';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWind, faDroplet, faArrowsDownToLine } from "@fortawesome/free-solid-svg-icons";

function CurrentWeather() {

  const { currentLocation, searchCity } = useSelector(state => state.weather);
  const { data, isLoading } = useCurrentWeather(currentLocation.lat, currentLocation.lon, searchCity);

  const windImg = (deg) => {
    switch(true) {
      case deg === 0:
        return './img/wind/north.png';
      case 0 < deg && deg < 90:
        return './img/wind/northeast.png';
      case deg === 90:
        return './img/wind/east.png';
      case 90 < deg && deg < 180:
        return './img/wind/southeast.png';
      case deg === 180:
        return './img/wind/south.png';
      case 180 < deg && deg < 270:
        return './img/wind/southwest.png';
      case deg === 270:
        return './img/wind/west.png';
      case 270 < deg && deg < 360:
        return './img/wind/northwest.png';
      case deg === 360:
        return './img/wind/north.png';
    }
  }

  return (
    <div className="current">
      <div className="box_1">
        {
          isLoading || !(currentLocation.lat && currentLocation.lon) ? '' : <figure><img src={`./img/weather/${data?.weather[0].icon}.png`} alt="icon" /></figure>
        }
        {
          isLoading || !(currentLocation.lat && currentLocation.lon) ? '' : 
            <div className="info">
              <h2>{data?.main.temp}°</h2>
              <p>{data?.weather[0].description}</p>
              <div className="temp">
                <p>{data?.main.temp_max}° / {data?.main.temp_min}°</p>
                <p>체감온도 {data?.main.feels_like}°</p>
              </div>
            </div>
        }
      </div>
      <div className="box_2">
        <div className="wind">
          <div className="title">
            <FontAwesomeIcon icon={faWind} />
            <p>바람</p>
          </div>
          {
            isLoading || !(currentLocation.lat && currentLocation.lon) ? '' : 
              <div className="info">
                <figure><img src={windImg(data?.wind.deg)} alt="wind" /></figure>
                <p>{data?.wind.speed}m/s</p>
              </div>
          }
        </div>
        <div className="air_box">
          <div className="humidity">
            <div className="title">
              <FontAwesomeIcon icon={faDroplet} />
              <p>습도</p>
            </div>
            <div className="info">
              {
                isLoading || !(currentLocation.lat && currentLocation.lon) ? '' : <p>{data?.main.humidity}%</p>
              }
            </div>
          </div>
          <div className="pressure">
            <div className="title">
              <FontAwesomeIcon icon={faArrowsDownToLine} />
              <p>기압</p>
            </div>
            <div className="info">
              {
                isLoading || !(currentLocation.lat && currentLocation.lon) ? '' : <p>{data?.main.pressure}hPa</p>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CurrentWeather;