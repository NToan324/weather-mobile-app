import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
  Animated,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
import {
  EllipsisHorizontalIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  PencilIcon,
} from "react-native-heroicons/solid";
import { BlurView } from "expo-blur";
import { debounce, floor } from "lodash";
import weatherService, { City } from "@/services/weather";
import { useRouter } from "expo-router";
import { getBookmarkWeather } from "@/storage/bookmark";
import { WeatherInformationProps } from "@/components/weather";
import { formatDay } from "@/utils/formatDate";
import { useContext } from "react";
import { WeatherContext } from "@/context/context";

export default function SavedWeatherList() {
  const [isOpen, setIsOpen] = useState(false);
  const [weathers, setWeathers] = useState<Array<WeatherInformationProps>>([]);
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-20)).current;
  const [showSearch, setShowSearch] = useState(true);
  const { setIsLoading, isLoading } = useContext(WeatherContext);
  const router = useRouter();

  const [location, setLocation] = useState<Array<City>>([]);

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

  const handleTextDebounce = useCallback(debounce(handleChangedText, 900), []);

  useEffect(() => {
    if (isOpen) {
      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.spring(translateY, {
          toValue: 0,
          friction: 5,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: -20,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isOpen]);

  useEffect(() => {
    const fetchBookmarkWeather = async () => {
      const data = await getBookmarkWeather();
      if (data) {
        setWeathers(data);
      }
    };
    fetchBookmarkWeather();
  }, [isLoading]);

  const handleSearchCity = (item: City) => {
    if (item) {
      router.setParams({ city: item.name });
      setLocation([]);
      setShowSearch(false);
      router.replace(`/?city=${encodeURIComponent(item.name)}`);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
      keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 0}
    >
      <View className="flex-1 px-4 mt-16 gap-2">
        <View className="w-full flex flex-row items-end justify-end">
          <TouchableOpacity
            onPress={() => setIsOpen((prev) => !prev)}
            className="w-8 h-8 p-1 border-2 border-white rounded-full flex items-center justify-center"
          >
            <EllipsisHorizontalIcon size={20} color={"white"} />
          </TouchableOpacity>
        </View>

        {/* Animated menu */}
        {isOpen && (
          <TouchableWithoutFeedback onPress={() => setIsOpen(false)}>
            <View className="absolute inset-0 z-40">
              <Animated.View
                style={{
                  position: "absolute",
                  right: 16,
                  top: 48,
                  width: "66%",
                  borderRadius: 20,
                  overflow: "hidden",
                  zIndex: 50,
                  opacity: opacityAnim,
                  transform: [{ translateY }],
                }}
                pointerEvents="auto"
              >
                <BlurView
                  intensity={80}
                  tint="dark"
                  style={StyleSheet.absoluteFill}
                />
                <TouchableOpacity className="flex flex-row items-center justify-between p-4">
                  <Text className="text-white text-base font-medium">
                    Edit List
                  </Text>
                  <PencilIcon color={"white"} size={16} />
                </TouchableOpacity>
                <View className="w-full h-[1px] bg-white/20"></View>
                <TouchableOpacity className="flex flex-row items-center justify-between p-4">
                  <Text className="text-white text-base font-medium">
                    Celsius
                  </Text>
                  <Text className="text-white">&deg;C</Text>
                </TouchableOpacity>
                <View className="w-full h-[1px] bg-white/20"></View>
                <TouchableOpacity className="flex flex-row items-center justify-between p-4">
                  <Text className="text-white text-base font-medium">
                    Fahrenheit
                  </Text>
                  <Text className="text-white">&deg;F</Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          </TouchableWithoutFeedback>
        )}

        {/* Weather cards */}
        <ScrollView contentContainerStyle={styles.scroll}>
          <Text className="text-4xl font-bold text-white">Weather</Text>
          <View>
            <View className="w-full flex flex-row items-center justify-end gap-2 px-4 rounded-3xl h-[50px] border-[0.2px] bg-white/20 border-white/45 transition-all duration-500 ease-in-out">
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
            <View className="absolute w-full top-16 bg-white rounded-2xl z-50 transition-all duration-500 ease-in-out">
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
          {weathers.map((item, index) => {
            const icon = "https:" + item.icon;
            return (
              <View
                key={index}
                style={styles.card}
                className="bg-white/20 border border-white/20"
              >
                <View className="flex-1 justify-between">
                  <View className="flex justify-start items-start gap-1">
                    <Text className="text-2xl text-white">{item.name}</Text>
                    <View className="flex flex-row items-center justify-start gap-2">
                      <Text className="text-base text-white font-medium">
                        {item.country}
                      </Text>
                      <Text className="text-sm text-white">
                        {formatDay(item.localtime)}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.description}>{item.weather}</Text>
                </View>
                <View
                  style={{ alignItems: "flex-end", justifyContent: "center" }}
                >
                  <Text className="text-6xl text-white">
                    {floor(item.temperature)}&deg;
                  </Text>
                  <Image source={{ uri: icon }} style={styles.icon} />
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    gap: 16,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  description: {
    color: "white",
    marginTop: 4,
  },
  icon: {
    width: 32,
    height: 32,
  },
});
