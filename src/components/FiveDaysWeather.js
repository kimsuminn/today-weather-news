import React from 'react';
import { useSelector } from 'react-redux';
import { useFiveDaysWeather } from '../hook/useFiveDaysWeather';

function FiveDaysWeather() {

  const { currentLocation, searchCity } = useSelector(state => state.weather);
  const { data } = useFiveDaysWeather(currentLocation.lat, currentLocation.lon, searchCity);

  const groupByWeather = (data) => {
    if (data) {
      const group = {};

      data.forEach(item => {
        const date = new Date(item.dt * 1000).toISOString().slice(0, 10);

        if (!(date in group)) {
          group[date] = [];
        }

        group[date].push(item);
      });

      return Object.values(group);
    }
  }

  const groupData = groupByWeather(data?.list);
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  let dailyWeather = [];
  let min, max;
  let prevDate = null;

  if (groupData) {
    groupData.forEach((items, idx_1) => {
      items.forEach((item, idx_2) => {
        let currentDate = new Date(item.dt * 1000).getDay();

        if (prevDate === null || prevDate !== currentDate) {
          if (prevDate !== null) {
            let current = new Date().getDay();
            let date;

            if (current === prevDate) {
              date = '오늘';
            } else {
              date = days[prevDate];
            }

            dailyWeather.push({ date, min, max });
          }

          prevDate = currentDate;
          min = { icon: item.weather[0].icon, temp: Infinity };
          max = { icon: item.weather[0].icon, temp: -Infinity };
        }

        if (min.temp > item.main.temp) {
          min = {icon: item.weather[0].icon, temp: item.main.temp};
        }
  
        if (max.temp < item.main.temp) {
          max = {icon: item.weather[0].icon, temp: item.main.temp};
        }

        if ((idx_1 === groupData.length - 1) && (idx_2 === items.length - 1)) {
          dailyWeather.push({ date: days[currentDate], min, max })
        }
      })
    })
  }

  return (
    <div className="fivedays">
      {
        dailyWeather?.map(item => (
          <div className="item" key={item.date}>
            <p className='date'>{item.date}</p>
            <div className="info">
              <div className="icon">
                <figure><img src={`./img/weather/${item.max.icon}.png`} alt="max" /></figure>
                <figure><img src={`./img/weather/${item.min.icon}.png`} alt="min" /></figure>
              </div>
              <div className="temp">
                <p>{item.max.temp}°</p>
                <p>{item.min.temp}°</p>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default FiveDaysWeather;