import {
  Text,
  View,
  Image,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { MapPinIcon, Bars3Icon } from "react-native-heroicons/solid";
import WeatherInformation from "@/components/weather";
import { debounce, set } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import weatherService, { City, WeatherData } from "@/services/weather";
import DailyForecast from "@/components/dailyForecast";
import * as Progress from "react-native-progress";
import { getCachedWeather, saveWeatherToCache } from "@/storage/caching";
import NetInfo from "@react-native-community/netinfo";

const WeatherHome = () => {
  const [showSearch, setShowSearch] = useState(true);
  const [location, setLocation] = useState<Array<City>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [weatherData, setWeatherData] = useState<WeatherData>();
  const [currentCity, setCurrentCity] = useState<City>();

  useEffect(() => {
    const fetchWeatherData = async (cityName: string) => {
      try {
        setShowSearch(false);
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

    fetchWeatherData(currentCity?.name || "Ho Chi Minh");
  }, [currentCity]);

  const handleChangedText = async (text: string) => {
    if (text.length < 3) {
      setLocation([]);
      return;
    }
    try {
      const data = await weatherService.searchCity(text);
      setLocation(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchCity = (item: City) => {
    if (item) {
      setCurrentCity(item);
      setLocation([]);
      setShowSearch(false);
    }
  };

  const handleTextDebounce = useCallback(debounce(handleChangedText, 900), []);

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
            Platform.OS === "android" ? "py-16" : "py-"
          } relative flex-1`}
        >
          {isLoading ? (
            <View className="absolute w-full h-full flex justify-center items-center bg-black/40 z-50">
              <Progress.CircleSnail color="white" size={50} />
            </View>
          ) : (
            <SafeAreaView>
              <View className="gap-4 px-8">
                <View>
                  <View className="w-full flex flex-row items-center justify-end gap-2 px-4 rounded-3xl h-[50px] border-[0.2px] border-white/45 transition-all duration-500 ease-in-out">
                    <TextInput
                      onChangeText={handleTextDebounce}
                      placeholder="Search city"
                      placeholderTextColor="white"
                      className="flex-1 text-white"
                    />

                    <TouchableOpacity
                      className="w-10 h-10 p-2 flex justify-center items-center"
                      onPress={() => setShowSearch((prev) => !prev)}
                    >
                      <MagnifyingGlassIcon color="white" size={25} />
                    </TouchableOpacity>
                  </View>
                  <View className="absolute w-full top-14 bg-white rounded-2xl mt-2 z-50 transition-all duration-500 ease-in-out">
                    {location.length > 0 &&
                      location.map((item, index) => {
                        const showBorder = index !== location.length - 1;
                        const borderStyle = showBorder
                          ? "border-b border-b-gray-400"
                          : "";
                        return (
                          <TouchableOpacity
                            onPress={() => handleSearchCity(item)}
                            key={index}
                            className={
                              "p-4 w-full h-[50px] flex flex-row items-center gap-2 " +
                              borderStyle
                            }
                          >
                            <MapPinIcon size={25} color="red" />
                            <Text className="text-black">
                              {item.name}, {item.country}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                  </View>
                </View>
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
