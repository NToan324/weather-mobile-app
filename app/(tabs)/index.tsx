import {
  View,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import WeatherInformation from "@/components/weather";
import React, { useEffect, useState } from "react";
import weatherService, { WeatherData } from "@/services/weather";
import DailyForecast from "@/components/dailyForecast";
import * as Progress from "react-native-progress";
import { getCachedWeather, saveWeatherToCache } from "@/storage/caching";
import NetInfo from "@react-native-community/netinfo";
import { useLocalSearchParams } from "expo-router";

const WeatherHome = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [weatherData, setWeatherData] = useState<WeatherData>();
  const { city } = useLocalSearchParams();

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

    fetchWeatherData(city?.toString() || "Ho Chi Minh");
  }, [city]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
      keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 0}
    >
      <ImageBackground
        source={require("@/assets/images/bg.png")}
        blurRadius={70}
        className="flex-1"
        resizeMode="cover"
      >
        <ScrollView
          className={`${
            Platform.OS === "android" ? "py-24" : "py-24"
          } relative flex-1`}
        >
          {isLoading ? (
            <View className="absolute w-full h-full flex justify-center items-center bg-black/40 z-50">
              <Progress.CircleSnail color="white" size={50} />
            </View>
          ) : (
            <SafeAreaView>
              <View className="gap-4 px-8">
                {weatherData && (
                  <>
                    <WeatherInformation
                      name={weatherData.location.name}
                      country={weatherData.location.country}
                      temperature={weatherData.current.temp_c}
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
          )}
        </ScrollView>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default WeatherHome;
