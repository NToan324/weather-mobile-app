import { WeatherData } from "@/services/weather";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CACHE_KEY = "weather_cache";

export const saveWeatherToCache = async (data: WeatherData) => {
  try {
    await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving weather to cache", error);
  }
};

export const getCachedWeather = async (): Promise<WeatherData | null> => {
  try {
    const json = await AsyncStorage.getItem(CACHE_KEY);
    return json ? JSON.parse(json) : null;
  } catch (error) {
    console.error("Error reading weather from cache", error);
    return null;
  }
};
