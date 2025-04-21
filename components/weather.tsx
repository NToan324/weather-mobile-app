import { View, Text, Image, Animated, TouchableOpacity } from "react-native";
import { BookmarkIcon as OutlineBookmarkIcon } from "react-native-heroicons/outline";
import { BookmarkIcon as SolidBookmarkIcon } from "react-native-heroicons/solid";
import { useContext } from "react";
import { WeatherContext } from "@/context/context";

export interface WeatherInformationProps {
  name: string;
  temperature: number;
  temperature_f: number;
  weather: string;
  country: string;
  humidity: number;
  wind: number;
  localtime: string;
  icon: string;
}
import { formatDate, formatFullDateTime } from "@/utils/formatDate";
import { useEffect, useRef, useState } from "react";
import {
  removeBookmarkWeather,
  saveBookmarkWeather,
  getBookmarkWeather,
} from "@/storage/bookmark";

const WeatherInformation = ({
  name,
  country,
  temperature,
  weather,
  humidity,
  wind,
  localtime,
  icon,
  temperature_f,
}: WeatherInformationProps) => {
  const [marked, setMarked] = useState(false);
  const scale = useRef(new Animated.Value(1)).current;
  const { isLoading, setIsLoading } = useContext(WeatherContext);

  const handleToggle = async () => {
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1.1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    const newMarked = !marked;
    setMarked(newMarked);

    if (newMarked) {
      await saveBookmarkWeather({
        name,
        temperature,
        weather,
        country,
        humidity,
        wind,
        localtime,
        icon,
        temperature_f,
      });
    } else {
      const data = await getBookmarkWeather();
      const filteredData = data.find(
        (item: WeatherInformationProps) => item.name == name
      );

      if (filteredData) {
        await removeBookmarkWeather(filteredData.name);
      }
    }
    setIsLoading(!isLoading);
  };

  useEffect(() => {
    const checkBookmarkStatus = async () => {
      const data = await getBookmarkWeather();
      if (data) {
        const isBookmarked = data.some(
          (item: WeatherInformationProps) => item.name === name
        );
        if (isBookmarked) {
          setMarked(true);
        }
      }
    };
    checkBookmarkStatus();
  }, [isLoading]);

  return (
    <View className="w-full flex flex-grow justify-between mt-4">
      <View className="flex flex-col items-center justify-between gap-4">
        <View className="flex w-full flex-col items-start justify-center">
          <View className="flex flex-row items-center justify-between w-full">
            <Text className="text-white text-2xl font-medium ">
              {name}, &nbsp;
              <Text className="text-white/50">{country}</Text>
            </Text>
            <Animated.View style={{ transform: [{ scale }] }}>
              <TouchableOpacity onPress={handleToggle}>
                {marked ? (
                  <SolidBookmarkIcon size={30} color="yellow" />
                ) : (
                  <OutlineBookmarkIcon size={30} color="white" />
                )}
              </TouchableOpacity>
            </Animated.View>
          </View>
          <Text className="text-white/50 text-sm font-bold">
            {formatFullDateTime(localtime.toString())}
          </Text>
        </View>
        <Image
          source={require("@/assets/images/heavyrain.png")}
          // source={{ uri: "https:" + icon }}
          className="object-cover w-52 h-52"
        />
        <View className="flex flex-col items-center justify-center">
          <Text className="text-white font-medium text-7xl">
            {parseInt(temperature.toString())}
            <Text className="font-light">&deg;</Text>
          </Text>
          <Text className="text-white/80 font-medium text-2xl">{weather}</Text>
        </View>
      </View>
      <View className="flex flex-row justify-between items-center w-full mt-6 ">
        <View className="flex flex-row justify-center items-center gap-2 bg-white/10 rounded-3xl p-4">
          <Image
            source={require("@/assets/icons/wind.png")}
            className="w-6 h-6"
          />
          <Text className="text-white text-xs">
            <Text className="text-xl">{wind}</Text> Km/h
          </Text>
        </View>
        <View className="flex flex-row justify-center items-center gap-2 bg-white/10 rounded-3xl p-4">
          <Image
            source={require("@/assets/icons/humidity.png")}
            className="w-6 h-6"
          />
          <Text className="text-white text-xs">
            <Text className="text-xl">{humidity}</Text> %
          </Text>
        </View>
        <View className="flex flex-row justify-center items-center gap-2 bg-white/10 rounded-3xl p-4">
          <Image
            source={require("@/assets/icons/clock.png")}
            className="w-6 h-6"
          />
          <Text className="text-white text-xl">
            {formatDate(localtime.toString())}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default WeatherInformation;
