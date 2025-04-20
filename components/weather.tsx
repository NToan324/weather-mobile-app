import { View, Text, Image } from "react-native";

interface WeatherInformationProps {
  name: string;
  temperature: number;
  weather: string;
  country: string;
  humidity: number;
  wind: number;
  localtime: string;
  icon: string;
}
import { formatDate, formatDay, formatFullDateTime } from "@/utils/formatDate";
const WeatherInformation = ({
  name,
  country,
  temperature,
  weather,
  humidity,
  wind,
  localtime,
  icon,
}: WeatherInformationProps) => {
  return (
    <View className="w-full flex flex-grow justify-between mt-4">
      <View className="flex flex-col items-center justify-between gap-4">
        <View className="flex w-full flex-col items-start justify-center">
          <Text className="text-white text-2xl font-medium ">
            {name}, &nbsp;
            <Text className="text-white/50">{country}</Text>
          </Text>
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
