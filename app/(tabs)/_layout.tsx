import React, { useState, useRef } from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import PagerView from "react-native-pager-view";
import Ionicons from "@expo/vector-icons/Ionicons";
import IndexPage from "./index";
import HomePage from "./home";

const { width } = Dimensions.get("window");

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
          <IndexPage />
        </View>

        <View key="3" style={styles.page}>
          <HomePage />
        </View>
      </PagerView>

      <View style={styles.tabBar}>
        <Ionicons
          name="home-outline"
          size={24}
          color={page === 0 ? "white" : "gray"}
          onPress={() => goToPage(0)}
        />
        <Ionicons
          name="menu"
          size={24}
          color={page === 2 ? "white" : "gray"}
          onPress={() => goToPage(2)}
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
});

export default SwipeTabs;
