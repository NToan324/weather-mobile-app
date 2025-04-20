// storage/bookmark.ts
import { WeatherInformationProps } from "@/components/weather";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BOOKMARK_KEY = "BOOKMARKED_WEATHER";

export const saveBookmarkWeather = async (weather: WeatherInformationProps) => {
  try {
    const storedWeather = await AsyncStorage.getItem(BOOKMARK_KEY);
    const parseWeather = storedWeather ? JSON.parse(storedWeather) : [];

    const isBookmarked = parseWeather.some(
      (item: WeatherInformationProps) => item.name === weather.name
    );
    if (!isBookmarked) {
      parseWeather.push(weather);
    }

    await AsyncStorage.setItem(BOOKMARK_KEY, JSON.stringify(parseWeather));
  } catch (error) {
    console.error("Error saving bookmarked weather:", error);
  }
};

export const getBookmarkWeather = async (): Promise<
  Array<WeatherInformationProps>
> => {
  try {
    const data = await AsyncStorage.getItem(BOOKMARK_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error reading bookmarked weather:", error);
    return [];
  }
};

export const removeBookmarkWeather = async (name: string) => {
  try {
    //remove item selected
    const storedWeather = await AsyncStorage.getItem(BOOKMARK_KEY);
    const parseWeather = storedWeather ? JSON.parse(storedWeather) : [];
    const filteredWeather = parseWeather.filter(
      (item: WeatherInformationProps) => item.name !== name
    );
    await AsyncStorage.setItem(BOOKMARK_KEY, JSON.stringify(filteredWeather));
  } catch (error) {
    console.error("Error removing bookmarked weather:", error);
  }
};
