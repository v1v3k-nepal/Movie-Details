import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  Image,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { ChevronLeftIcon, HeartIcon } from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../theme";
import { useNavigation } from "@react-navigation/core";
import { MovieList } from "../components/movieList";
import { Loading } from "../components/loading";

export const CastDetailsScreen = () => {
  const ios = Platform.OS == "ios";
  const verticalMargin = ios ? "" : " my-3";
  const [isFavourite, setIsFavourite] = useState(false);
  const navigation = useNavigation();
  const { height, width } = Dimensions.get("window");
  const { heightSc, widthSc } = Dimensions.get("screen");
  const [workedMovies, setWorkedMovies] = useState([1, 2, 3, 4, 5, 6, 6, 7]);
  const [loading, setLoading] = useState(false);
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
              source={require("../assets/images/castImage2.png")}
              style={{ height: 0.55 * height, width: width * 0.8 }}
            />
          </View>
          <View className="mt-6">
            <Text className="text-white text-3xl font-bold text-center">
              Tony Stark
            </Text>
            <Text className="text-neutral-500 text-base text-center">
              London, United Kingdom
            </Text>
          </View>
          {/* Gender, birthday, knownfor, popularity section */}

          <View className="flex-row justify-center items-center bg-neutral-700 mt-6 mx-2 px-2 py-4 rounded-full">
            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className="text-white font-semibold">Gender</Text>
              <Text className="text-neutral-300 text-sm">Male</Text>
            </View>
            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className="text-white font-semibold">Birthday</Text>
              <Text className="text-neutral-300 text-sm">1964-09-02</Text>
            </View>
            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className="text-white font-semibold">Known For</Text>
              <Text className="text-neutral-300 text-sm">Acting</Text>
            </View>
            <View className="px-2 items-center">
              <Text className="text-white font-semibold">Popularity</Text>
              <Text className="text-neutral-300 text-sm">64.23</Text>
            </View>
          </View>

          <View className="self-start mx-4 space-y-2 mt-6">
            <Text className="text-white font-bold text-lg">Biography</Text>
            <Text className="text-neutral-400 tracking-wide">
              Tony Stark, also known as Iron Man, is a fictional character in
              the Marvel Comics universe. Created by writer and editor Stan Lee,
              scripter Larry Lieber, and artists Don Heck and Jack Kirby, Tony
              Stark made his first appearance in "Tales of Suspense" #39 in
              1963. Name: Anthony Edward Stark Alter Ego: Iron Man Occupation:
              Inventor, Industrialist, Genius, Philanthropist, Superhero First
              Appearance: Tales of Suspense #39 (March 1963) Background: Tony
              Stark is portrayed as a wealthy and brilliant industrialist. He
              inherited Stark Industries, a multinational industrial company,
              from his father, Howard Stark. Tony is known for his genius-level
              intellect and his skills as an inventor and engineer.
            </Text>
          </View>
          <View className="mt-6">
            <MovieList title="Movies" data={workedMovies} />
          </View>
        </View>
      )}
    </ScrollView>
  );
};
