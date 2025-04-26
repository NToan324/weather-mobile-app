import {
  View,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  Platform,
  Text,
  RefreshControl,
} from "react-native";
import WeatherInformation, {
  WeatherInformationProps,
} from "@/components/weather";
import React, { useEffect, useState } from "react";
import weatherService, { WeatherData } from "@/services/weather";
import DailyForecast from "@/components/dailyForecast";
import * as Progress from "react-native-progress";
import { getCachedWeather, saveWeatherToCache } from "@/storage/caching";
import NetInfo, { refresh } from "@react-native-community/netinfo";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as Location from "expo-location";
import { getBookmarkWeather } from "@/storage/bookmark";

const WeatherHome = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [weatherData, setWeatherData] = useState<WeatherData>();
  const [location, setLocation] = useState<string>("Ho Chi Minh");
  const { city } = useLocalSearchParams();
  const [bookmarkWeather, setBookmarkWeather] = useState<
    Array<WeatherInformationProps>
  >([]);
  const [error, setError] = useState<string>("");
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const useLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          return;
        }

        const loc = await Location.getCurrentPositionAsync({});

        const placemarks = await Location.reverseGeocodeAsync({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
        });

        if (placemarks.length > 0) {
          const cityName =
            placemarks[0].city ||
            placemarks[0].region ||
            placemarks[0].subregion ||
            "Ho Chi Minh";
          setLocation(cityName);
        } else {
          setLocation("Ho Chi Minh");
        }
      } catch (error) {
        setLocation("Ho Chi Minh");
      }
    };
    useLocation();

    const updateWeatherWithTime = setInterval(() => {
      fetchWeatherData(city?.toString() || location);
    }, 120 * 1000);

    fetchWeatherData(city?.toString() || location);
    return () => {
      clearInterval(updateWeatherWithTime);
    };
  }, [city, location]);

  const fetchWeatherData = async (cityName: string) => {
    try {
      setIsLoading(true);
      const netState = await NetInfo.fetch();
      if (!netState.isConnected) {
        const cached = await getCachedWeather();
        if (cached) {
          setWeatherData(cached);
          return;
        } else {
          setError("Please check your network connection.");
          return;
        }
      }
      const data = await weatherService.getWeatherByCity(cityName, 7);
      setWeatherData(data);
      await saveWeatherToCache(data);
    } catch (error) {
      setError("Please check your network connection.");
    } finally {
      setIsLoading(false);
    }
  };

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await fetchWeatherData(city?.toString() || location);
    } catch (err) {
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    const fetchBookmarkWeather = async () => {
      const cachedWeather = await getBookmarkWeather();
      if (cachedWeather) {
        setBookmarkWeather(cachedWeather);
      }
    };
    fetchBookmarkWeather();
  }, []);

  if (error && error !== "") {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-white">{error}</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require("@/assets/images/bg.png")}
      blurRadius={70}
      className="flex-1"
      resizeMode="cover"
    >
      {isLoading ? (
        <View className="w-full h-screen flex justify-center items-center bg-black/40 z-50">
          <Progress.CircleSnail color="white" size={50} />
        </View>
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          decelerationRate="fast"
          className={`${
            Platform.OS === "ios" ? "mt-16" : "mt-10"
          } relative flex-grow`}
        >
          <SafeAreaView>
            <View className="flex-1 gap-4 px-4">
              {weatherData && (
                <>
                  <WeatherInformation
                    name={weatherData.location.name}
                    country={weatherData.location.country}
                    temperature={weatherData.current.temp_c}
                    temperature_f={weatherData.current.temp_f}
                    weather={weatherData.current.condition.text}
                    humidity={weatherData.current.humidity}
                    wind={weatherData.current.wind_kph}
                    localtime={weatherData.location.localtime}
                    icon={weatherData.current.condition.icon}
                  />
                  <DailyForecast
                    foreCastDay={weatherData.forecast.forecastday}
                  />
                </>
              )}
            </View>
          </SafeAreaView>
        </ScrollView>
      )}
    </ImageBackground>
  );
};

export default WeatherHome;
