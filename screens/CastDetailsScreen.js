import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  Image,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ChevronLeftIcon, HeartIcon } from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../theme";
// import { useNavigation } from "@react-navigation/core";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MovieList } from "../components/movieList";
import { Loading } from "../components/loading";
import {
  fallbackCastImage,
  fetchCastDetails,
  fetchCastMovies,
  image500,
} from "../api/movieDb";

export const CastDetailsScreen = () => {
  const ios = Platform.OS == "ios";
  const verticalMargin = ios ? "" : " my-3";
  const [isFavourite, setIsFavourite] = useState(false);
  const navigation = useNavigation();
  const { params: item } = useRoute();
  const { height, width } = Dimensions.get("window");
  const [workedMovies, setWorkedMovies] = useState([]);
  const [personDetails, setPersonDetails] = useState({});
  const [loading, setLoading] = useState(true);

  const getCastDetails = async (id) => {
    const data = await fetchCastDetails(id);
    data && setPersonDetails(data);
  };

  const getCastMovies = async (id) => {
    const data = await fetchCastMovies(id);
    if (data?.cast) setWorkedMovies(data?.cast);
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([getCastDetails(item?.id), getCastMovies(item?.id)]);
      setLoading(false);
    };
    fetchData();
  }, [item]);
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-neutral-900"
    >
      {/* back button */}
      <SafeAreaView
        className={
          "flex-row justify-between items-center px-4 w-full" + verticalMargin
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
          <HeartIcon size={35} color={isFavourite ? "red" : "white"} />
        </TouchableOpacity>
      </SafeAreaView>

      {/* person details */}
      {loading ? (
        <View style={{ height: height, width: width }} className="-mt-20">
          <Loading />
        </View>
      ) : (
        <View
          className="flex-column items-center"
          style={{
            shadowColor: "gray",
            shadowRadius: 40,
            shadowOpacity: 1,
            shadowOffset: { width: 0, height: 5 },
          }}
        >
          <View className="overflow-hidden rounded-full items-center h-72 w-72 border-2 border-neutral-500">
            <Image
              source={
                // require("../assets/images/castImage2.png")
                {
                  uri:
                    image500(personDetails?.profile_path) || fallbackCastImage,
                }
              }
              style={{ height: 0.55 * height, width: width * 0.8 }}
            />
          </View>
          <View className="mt-6">
            <Text className="text-white text-3xl font-bold text-center">
              {personDetails?.name}
            </Text>
            <Text className="text-neutral-500 text-base text-center">
              {personDetails?.place_of_birth}
            </Text>
          </View>
          {/* Gender, birthday, knownfor, popularity section */}

          <View className="flex-row justify-center items-center bg-neutral-700 mt-6 mx-2 px-2 py-4 rounded-full">
            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className="text-white font-semibold">Gender</Text>
              <Text className="text-neutral-300 text-sm">
                {personDetails?.gender == 1 ? "Female" : "Male"}
              </Text>
            </View>
            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className="text-white font-semibold">Birthday</Text>
              <Text className="text-neutral-300 text-sm">
                {personDetails?.birthday ? personDetails?.birthday : "N/A"}
              </Text>
            </View>
            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className="text-white font-semibold">Known For</Text>
              <Text className="text-neutral-300 text-sm">
                {personDetails?.known_for_department}
              </Text>
            </View>
            <View className="px-2 items-center">
              <Text className="text-white font-semibold">Popularity</Text>
              <Text className="text-neutral-300 text-sm">
                {personDetails?.popularity.toFixed(2)}%
              </Text>
            </View>
          </View>

          <View className="self-start mx-4 space-y-2 mt-6">
            <Text className="text-white font-bold text-lg">Biography</Text>
            <Text className="text-neutral-400 tracking-wide">
              {personDetails?.biography ? personDetails?.biography : "N/A"}
            </Text>
          </View>
          <View className="mt-6">
            {!loading && workedMovies.length > 0 && (
              <MovieList title="Movies" data={workedMovies} />
            )}
          </View>
        </View>
      )}
    </ScrollView>
  );
};
