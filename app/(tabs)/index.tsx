import {
  View,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import WeatherInformation, {
  WeatherInformationProps,
} from "@/components/weather";
import React, { useEffect, useState } from "react";
import weatherService, { WeatherData } from "@/services/weather";
import DailyForecast from "@/components/dailyForecast";
import * as Progress from "react-native-progress";
import { getCachedWeather, saveWeatherToCache } from "@/storage/caching";
import NetInfo from "@react-native-community/netinfo";
import { router, useLocalSearchParams } from "expo-router";
import * as Location from "expo-location";
import BouncingArrows from "@/components/ui/bouncingArrow";
import { getBookmarkWeather } from "@/storage/bookmark";

const WeatherHome = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [weatherData, setWeatherData] = useState<WeatherData>();
  const [location, setLocation] = useState<string>("Can Tho");
  const { city } = useLocalSearchParams();
  const [bookmarkWeather, setBookmarkWeather] = useState<
    Array<WeatherInformationProps>
  >([]);

  useEffect(() => {
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
            alert("Không có mạng và không có dữ liệu được lưu.");
            return;
          }
        }

        const data = await weatherService.getWeatherByCity(cityName, 7);
        setWeatherData(data);
        await saveWeatherToCache(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    const updateWeatherWithTime = setInterval(() => {
      fetchWeatherData(city?.toString() || location);
    }, 60 * 1000);
    fetchWeatherData(city?.toString() || location);
    return () => {
      clearInterval(updateWeatherWithTime);
    };
  }, [city]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.warn("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const placemarks = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      if (placemarks.length > 0) {
        setLocation(placemarks[0].city || "Can Tho");
      }
    })();
  }, []);

  useEffect(() => {
    const fetchBookmarkWeather = async () => {
      const cachedWeather = await getBookmarkWeather();
      if (cachedWeather) {
        setBookmarkWeather(cachedWeather);
      }
    };
    fetchBookmarkWeather();
  }, []);

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
          decelerationRate="fast"
          className={`${
            Platform.OS === "ios" ? "mt-16" : "mt-10"
          } relative flex-grow`}
        >
          <SafeAreaView>
            <View className="flex-1 gap-4 px-8">
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
