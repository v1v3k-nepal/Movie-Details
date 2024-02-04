import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  Dimensions,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ChevronLeftIcon, HeartIcon } from "react-native-heroicons/solid";
// import { HeartIcon } from "react-native-heroicons/outline";
import { styles, theme } from "../theme";
import { LinearGradient } from "expo-linear-gradient";
import { Cast } from "../components/cast";
import { MovieList } from "../components/movieList";
import { StatusBar } from "expo-status-bar";
import { Loading } from "../components/loading";
import {
  fallbackMoviePoster,
  fetchMovieCredits,
  fetchMovieDetails,
  fetchRelatedMovies,
  image500,
} from "../api/movieDb";

export const MovieScreen = () => {
  const ios = Platform.OS === "ios";
  const marginTop = ios ? " -mt-2" : " mt-2";
  const { height, width } = Dimensions.get("window");
  const navigation = useNavigation();
  const { params: item } = useRoute();
  const [isFavourite, setIsFavourite] = useState(false);
  const [castData, setCastData] = useState([]);
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);

  const getMovieDetails = async (id) => {
    const data = await fetchMovieDetails(id);
    if (data) {
      setMovie(data);
    }
  };

  const getMovieCredits = async (id) => {
    const data = await fetchMovieCredits(id);
    if (data) {
      setCastData(data?.cast);
    }
  };

  const getRelatedMovies = async (id) => {
    const data = await fetchRelatedMovies(id);
    if (data && data?.results) {
      setRelatedMovies(data?.results);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      await Promise.all([
        getMovieDetails(item?.id),
        getMovieCredits(item?.id),
        getRelatedMovies(item?.id),
      ]);

      setLoading(false);
    };

    fetchData();
  }, [item]);

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-neutral-900"
    >
      {/* back button and movie poster */}
      <View className="w-full">
        <SafeAreaView
          className={
            "absolute flex-row justify-between items-center px-4 z-20 w-full" +
            marginTop
          }
        >
          <TouchableOpacity
            style={styles.background}
            className="rounded-xl p-1"
            onPress={() => navigation.goBack()}
          >
            <ChevronLeftIcon size={28} strokeWidth={2.5} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsFavourite(!isFavourite)}>
            <HeartIcon
              size={35}
              color={isFavourite ? theme.background : "white"}
            />
          </TouchableOpacity>
        </SafeAreaView>
        {loading ? (
          <View style={{ height: height, width: width }}>
            <Loading />
          </View>
        ) : (
          <View>
            <Image
              source={
                // require("../assets/images/moviePoster2.png")
                { uri: image500(movie?.poster_path) || fallbackMoviePoster }
              }
              style={{ width: width, height: height * 0.75 }}
            />
            <LinearGradient
              colors={[
                "transparent",
                "rgba(23, 23, 23, 0.8)",
                "rgba(23, 23, 23, 1)",
              ]}
              style={{ width: width, height: height * 0.35 }}
              // start={{ x: 0.5, y: 0 }}
              // end={{ x: 0.5, y: 1 }}
              className="absolute bottom-0"
            />
          </View>
        )}
      </View>

      {/* Movie Details section */}
      {!loading && (
        <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
          {/* movie title */}
          <Text className="text-white text-2xl text-center font-bold tracking-wider flex-row flex-wrap p-1">
            {movie?.title}
          </Text>
          <Text className="text-center text-neutral-400 text-base font-semibold">
            Release Date • {movie?.release_date}
          </Text>
          <Text className="text-center text-neutral-400 text-base font-semibold">
            Watch Time • {movie?.runtime} Min
          </Text>
          {/* genres */}
          <View className="flex-row justify-center space-x-2 flex-wrap">
            {movie?.genres?.map((genre, index) => {
              showDots = index + 1 !== movie?.genres?.length;
              return (
                <View key={genre?.id}>
                  <Text className="text-center text-neutral-400 text-base font-semibold">
                    {genre?.name} {showDots ? "•" : null}
                  </Text>
                </View>
              );
            })}
          </View>
          <Text>{"hello"}</Text>
          <Text className=" text-neutral-400 mx-4 tracking-wide">
            {movie?.overview}
          </Text>
        </View>
      )}
      {/* movie cast details */}
      {!loading && castData?.length > 0 && <Cast castData={castData} />}

      {/* related movies section  */}
      {!loading && (
        <MovieList
          title="Related Movies"
          data={relatedMovies.length > 0 ? relatedMovies : [movie, movie]}
          hideSeeAll={true}
        />
      )}
    </ScrollView>
  );
};
