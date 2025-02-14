import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const getNewsData = async () => {
  try {
    const API_KEY = process.env.REACT_APP_NEWS_DATA_IO_API_KEY;
    const response = await axios.get(`https://newsdata.io/api/1/latest?country=kr&category=top&apikey=${API_KEY}`);
    return response.data;
  } catch (e) {
    console.error(e);
  }
}

export const useNews = () => {
  return useQuery({
    queryKey: ['news'],
    queryFn: getNewsData,
    retry: 1,
    gcTime: 60 * 60 * 1000,
    staleTime: 59 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true
  })
}