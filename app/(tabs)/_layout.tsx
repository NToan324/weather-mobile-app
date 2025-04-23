import React, { useState, useRef } from "react";
import { View, StyleSheet } from "react-native";
import PagerView from "react-native-pager-view";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MapIcon } from "react-native-heroicons/outline";
import { MagnifyingGlassIcon } from "react-native-heroicons/solid";
import HomePage from "./index";
import CityPage from "./city";
import SearchPage from "./search";

const SwipeTabs = () => {
  const [page, setPage] = useState(0);
  const pagerRef = useRef<PagerView>(null);

  const goToPage = (pageNumber: number) => {
    pagerRef.current?.setPage(pageNumber);
    setPage(pageNumber);
  };

  return (
    <View style={{ flex: 1 }}>
      <PagerView
        ref={pagerRef}
        style={{ flex: 1 }}
        initialPage={0}
        onPageSelected={(e) => setPage(e.nativeEvent.position)}
      >
        <View key="1" style={styles.page}>
          <HomePage />
        </View>

        <View key="2" style={styles.page}>
          <SearchPage />
        </View>

        <View key="3" style={styles.page}>
          <CityPage />
        </View>
      </PagerView>

      <View style={styles.tabBar}>
        <Ionicons
          name="home-outline"
          size={24}
          color={page === 0 ? "white" : "gray"}
          onPress={() => goToPage(0)}
          style={page === 0 ? styles.iconShadow : {}}
        />
        <MagnifyingGlassIcon
          size={24}
          color={page === 1 ? "white" : "gray"}
          onPress={() => goToPage(1)}
          style={page === 1 ? styles.iconShadow : {}}
        />
        <MapIcon
          size={24}
          color={page === 2 ? "white" : "gray"}
          onPress={() => goToPage(2)}
          style={page === 2 ? styles.iconShadow : {}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#0b3f48", // for visibility
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#0b3f48",
    paddingVertical: 24,
  },
  iconShadow: {
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
});

export default SwipeTabs;
