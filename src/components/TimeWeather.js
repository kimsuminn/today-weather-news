import React from 'react';
import { useSelector } from 'react-redux';
import { useFiveDaysWeather } from '../hook/useFiveDaysWeather';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDroplet } from '@fortawesome/free-solid-svg-icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

function TimeWeather({ timestampToHour }) {

  const { currentLocation, searchCity } = useSelector(state => state.weather);
  const { data, isLoading } = useFiveDaysWeather(currentLocation.lat, currentLocation.lon, searchCity);

  const current = Date.now();
  const timeList = data?.list.filter(item => item.dt * 1000 > current).slice(0, 8);

  return (
    <div className="time_weather">
      <Swiper 
        className="item_wrap"
        modules={[Autoplay]}
        spaceBetween={16}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
          0: {
            slidesPerView: 2
          },
          400: {
            slidesPerView: 3
          },
          600: {
            slidesPerView: 5
          }
        }}
      >
        {
          isLoading || !(currentLocation.lat && currentLocation.lon) ? 
            [1, 2, 3, 4, 5, 6].map(val => (
              <SwiperSlide className="item" key={val}></SwiperSlide>
            )) :
            timeList?.map(item => (
              <SwiperSlide className="item" key={item.dt}>
                <p className="time">{timestampToHour(item.dt * 1000)}시</p>
                <figure><img src={`./img/weather/${item.weather[0].icon}.png`} alt="icon" /></figure>
                <div className="info">
                  <p className="temp">{item.main.temp}°</p>
                  <div className="humidity">
                    <FontAwesomeIcon icon={faDroplet} />
                    <p>{item.main.humidity}%</p>
                  </div>
                </div>
              </SwiperSlide>
            ))
        }
      </Swiper>
    </div>
  )
}

export default TimeWeather;