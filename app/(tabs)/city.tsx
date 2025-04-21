import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import weatherService from "@/services/weather";
import { useRouter } from "expo-router";

<svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  strokeWidth={1.5}
  stroke="currentColor"
  className="size-6"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"
  />
</svg>;

export default function SettingsScreen() {
  const [provinces, setProvinces] = useState<{ code: number; name: string }[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getCity = async () => {
      setLoading(true);
      try {
        const response = await weatherService.getCity();
        setProvinces(response);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
      setLoading(false);
    };
    getCity();
  }, []);

  const handleCitySelect = async (city: { code: number; name: string }) => {
    try {
      const citySearch = formatCityName(city.name);
      await weatherService.searchCity(citySearch);
      router.replace(`/?city=${encodeURIComponent(citySearch)}`);
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  const formatCityName = (name: string) => {
    const words = name
      .replace(/^(Tỉnh|Thành phố)\s*/i, "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .trim();
    return words;
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <View className="flex-1 px-4 mt-24">
      <FlatList
        data={provinces}
        keyExtractor={(item) => item.code.toString()}
        ListHeaderComponent={() => (
          <Text className="text-start text-4xl font-bold text-white mb-4">
            Choose your city
          </Text>
        )}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="bg-white/10 rounded-2xl mb-4 p-2 border border-white/20"
            onPress={() => handleCitySelect(item)}
          >
            <Text className="text-base py-2  text-white">{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
