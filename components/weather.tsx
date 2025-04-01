import { View, Text, Image, ScrollView } from "react-native";
import { CalendarDaysIcon } from "react-native-heroicons/solid";
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
import { formatDate } from "@/utils/formatDate";
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
    <View className="w-full flex flex-grow justify-between gap-10">
      <View className="flex flex-col items-center justify-between gap-10">
        <Text className="text-white text-2xl font-bold">
          {name}, &nbsp;
          <Text className="text-white/50">{country}</Text>
        </Text>
        <Image
          source={{ uri: "https:" + icon }}
          className="object-cover w-60 h-60"
        />
        <View className="flex flex-col items-center justify-center gap-4">
          <Text className="text-white font-bold text-6xl">
            {parseInt(temperature.toString())}&deg;
          </Text>
          <Text className="text-white/80 font-bold text-xl">{weather}</Text>
        </View>
      </View>
      <View className="flex flex-row justify-between items-center px-4">
        <View className="flex flex-row items-center gap-2">
          <Image
            source={require("@/assets/icons/wind.png")}
            className="w-10 h-10"
          />
          <Text className="text-white">{wind} Km/h</Text>
        </View>
        <View className="flex flex-row items-center gap-2">
          <Image
            source={require("@/assets/icons/drop.png")}
            className="w-10 h-10"
          />
          <Text className="text-white">{humidity}%</Text>
        </View>
        <View className="flex flex-row items-center gap-2">
          <Image
            source={require("@/assets/icons/sun.png")}
            className="w-10 h-10"
          />
          <Text className="text-white">{formatDate(localtime.toString())}</Text>
        </View>
      </View>
    </View>
  );
};

export default WeatherInformation;
