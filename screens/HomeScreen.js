import React, { useEffect, useState } from "react";
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
import { useNavigation } from "@react-navigation/core";
import { Loading } from "../components/loading";
import {
  fetchTopRatedMovies,
  fetchTrendingMovies,
  fetchUpcomingMovies,
} from "../api/movieDb";
const ios = Platform.OS == "ios";

export const HomeScreen = () => {
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    getTrendingMovies();
    getUpcomingMovies();
    getTopRatedMovies();
  }, []);

  const getTrendingMovies = async () => {
    const data = await fetchTrendingMovies();
    if (data && data?.results) setTrending(data?.results);
    console.log(data);
    setLoading(false);
  };

  const getUpcomingMovies = async () => {
    const data = await fetchUpcomingMovies();
    if (data && data?.results) setUpcoming(data?.results);
    setLoading(false);
  };

  const getTopRatedMovies = async () => {
    const data = await fetchTopRatedMovies();
    if (data && data?.results) setTopRated(data?.results);
    setLoading(false);
  };
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
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <MagnifyingGlassIcon color="white" strokeWidth={2} size={30} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {loading ? (
        <Loading />
      ) : (
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
      )}
    </View>
  );
};
