import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const getFiveDaysWeather = async (data) => {
  try {
    const API_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY;
    const lat = data.queryKey[1];
    const lon = data.queryKey[2];

    let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=KR`;

    if (data.queryKey[3]) {
      url = `https://api.openweathermap.org/data/2.5/forecast?q=${data.queryKey[3]}&appid=${API_KEY}&units=metric&lang=KR`;
    }

    const response = await axios.get(url);
    return response.data;

  } catch(e) {
    console.error(e);
  }
};

export const useFiveDaysWeather = (lat, lon, searchCity) => {
  return useQuery({
    queryKey: ['fiveDaysWeather', lat, lon, searchCity],
    queryFn: getFiveDaysWeather,
    retry: 1,
    gcTime: 60 * 60 * 1000,
    staleTime: 59 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    enabled: !!(lat && lon),
  })
}