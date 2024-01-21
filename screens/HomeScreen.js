import React, { useState } from "react";
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/solid";
import { StatusBar } from "expo-status-bar";
import {
  Text,
  Platform,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../theme";
import { TrendingMovies } from "../components/trendingMovies";
import { MovieList } from "../components/movieList";
const ios = Platform.OS == "ios";

export const HomeScreen = () => {
  const [trending, setTrending] = useState([1, 2, 3, 4, 5]);
  const [upcoming, setUpcoming] = useState([1, 2, 3, 4, 5]);
  const [topRated, setTopRated] = useState([1, 2, 3, 4, 5]);
  return (
    <View className="flex-1 bg-neutral-800">
      {/* Search Bar and logo section */}
      <SafeAreaView className={`${ios} ? "-mb-2" : "mb-2"`}>
        <StatusBar style="light" />
        <View className="flex-row justify-between items-center mx-4 mt-2">
          <Bars3CenterLeftIcon size={30} strokeWidth={2} color="white" />
          <Text className="text-white text-3xl font-bold">
            <Text style={styles.text}>M</Text>ovies
          </Text>
          <TouchableOpacity>
            <MagnifyingGlassIcon color="white" strokeWidth={2} size={30} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: "10px" }}
      >
        {/* Trending Movies Section */}
        <TrendingMovies data={trending} />

        {/* Upcoming Movies Section */}
        <MovieList title="Upcoming" data={upcoming} />

        {/* Top Rated Movies Section */}
        <MovieList title="Top Rated" data={topRated} />
      </ScrollView>
    </View>
  );
};
