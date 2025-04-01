import {
  Text,
  View,
  Image,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { MapPinIcon } from "react-native-heroicons/solid";
import WeatherInformation from "@/components/weather";
import { debounce, set } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import weatherService, { City, WeatherData } from "@/services/weather";
import DailyForecast from "@/components/dailyForecast";
import * as Progress from "react-native-progress";

export default function Index() {
  const [showSearch, setShowSearch] = useState(true);
  const [location, setLocation] = useState<Array<City>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [weatherData, setWeatherData] = useState<WeatherData>();
  const [currentCity, setCurrentCity] = useState<City>();

  useEffect(() => {
    const fetchWeatherData = async (currentCity: string) => {
      try {
        setShowSearch(false);
        setIsLoading(true);
        const data = await weatherService.getWeatherByCity(currentCity, 7);
        setWeatherData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchWeatherData(currentCity?.name || "Ho Chi Minh");
  }, [currentCity]);

  const handleChangedText = async (text: string) => {
    try {
      const data = await weatherService.searchCity(text);
      console.log(data);
      setLocation(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTextDebounce = useCallback(debounce(handleChangedText, 900), []);

  return (
    <View className="relative flex-1 ">
      <Image
        blurRadius={70}
        source={require("@/assets/images/bg.png")}
        className="w-full h-full absolute"
      />
      {isLoading ? (
        <View className="absolute w-full h-full flex justify-center items-center bg-black/40 z-50">
          <Progress.CircleSnail color="white" size={50} />
        </View>
      ) : (
        <SafeAreaView>
          <View className="mx-4 gap-10">
            <View
              className={`${
                showSearch
                  ? "w-full flex flex-row items-center justify-end gap-2 p-4"
                  : "w-[50px] p-2"
              } rounded-2xl bg-white/20 h-[50px] transition-all duration-500 ease-in-out`}
            >
              {showSearch ? (
                <TextInput
                  onChangeText={handleTextDebounce}
                  placeholder="Search city"
                  placeholderTextColor={"white"}
                  className="flex-1 text-white"
                />
              ) : null}

              <TouchableOpacity
                className="w-10 h-10 p-2 flex justify-center items-center"
                onPress={() => setShowSearch((prev) => !prev)}
              >
                <MagnifyingGlassIcon color="white" size={25} />
              </TouchableOpacity>
            </View>
            {showSearch ? (
              <View className="absolute w-full top-14 bg-white rounded-2xl mt-2 z-50 transition-all duration-500 ease-in-out">
                {location.length > 0 &&
                  location.map((item, index) => {
                    const showBorder = index !== location.length - 1;
                    const borderStyle = showBorder
                      ? "border-b border-b-gray-400"
                      : "";
                    return (
                      <TouchableOpacity
                        onPress={() => setCurrentCity(item)}
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
            ) : null}
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
                <DailyForecast foreCastDay={weatherData.forecast.forecastday} />
              </>
            )}
          </View>
        </SafeAreaView>
      )}
    </View>
  );
}
