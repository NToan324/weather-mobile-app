import { forecastday } from "@/services/weather";
import { formatDay } from "@/utils/index.utils";
import React from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { CalendarDaysIcon } from "react-native-heroicons/solid";
interface WeatherInformationProps {
  foreCastDay: forecastday[];
}
const DailyForecast = ({ foreCastDay }: WeatherInformationProps) => {
  return (
    <View className="gap-4">
      <View className="flex flex-row items-center gap-2">
        <CalendarDaysIcon size={25} color="white" />
        <Text className="text-white">Daily forecast</Text>
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {foreCastDay &&
          foreCastDay.length > 0 &&
          foreCastDay.map((item, index) => {
            const showMargin = index !== foreCastDay.length - 1;
            const marginStyle = showMargin ? "mr-4" : "";
            const icon = "https:" + item.day.condition.icon;
            return (
              <View
                className={
                  "w-[110px] h-[140px] flex justify-center items-center bg-white/10 px-4 rounded-3xl " +
                  marginStyle
                }
                key={index}
              >
                <Image
                  source={{ uri: icon }}
                  className="object-cover w-20 h-20"
                />
                <Text className="text-white text-base">
                  {formatDay(item.date)}
                </Text>
                <Text className="text-white text-xl font-bold">
                  {parseInt(item.day.avgtemp_c.toString())} &deg;
                </Text>
              </View>
            );
          })}
      </ScrollView>
    </View>
  );
};

export default DailyForecast;
