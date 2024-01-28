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

export const MovieScreen = () => {
  const ios = Platform.OS === "ios";
  const marginTop = ios ? " -mt-2" : " mt-2";
  const { height, width } = Dimensions.get("window");
  const navigation = useNavigation();
  const { params: item } = useRoute();
  const [isFavourite, setIsFavourite] = useState(false);
  const movieName = "Ant Man the Spider Universe Home Coming";
  const [castData, setCastData] = useState([1, 2, 3, 4, 5, 6, 7]);
  const [similarMovies, setSimilarMovies] = useState([
    1, 2, 3, 4, 4, 3, 2, 4, 2,
  ]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //call the api for movie details
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
              source={require("../assets/images/moviePoster2.png")}
              style={{ width: width, height: height * 0.55 }}
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
          <Text className="text-white text-2xl text-center font-bold tracking-wider">
            {movieName}
          </Text>
          <Text className="text-center text-neutral-400 text-base font-semibold">
            Release • 2020 • 170 Min
          </Text>
          {/* genres */}
          <View className="flex-row justify-center space-x-2">
            <Text className="text-center text-neutral-400 text-base font-semibold">
              Action •
            </Text>
            <Text className="text-center text-neutral-400 text-base font-semibold">
              Thrill •
            </Text>
            <Text className="text-center text-neutral-400 text-base font-semibold">
              Comedy
            </Text>
          </View>
          <Text className=" text-neutral-400 mx-4 tracking-wide">
            Armed with a super-suit with the astonishing ability to shrink in
            scale but increase in strength, cat burglar Scott Lang must embrace
            his inner hero and help his mentor, Dr. Hank Pym, pull off a plan
            that will save the world. Armed with a super-suit with the
            astonishing ability to shrink in scale but increase in strength, cat
            burglar Scott
          </Text>
        </View>
      )}
      {/* movie cast details */}
      {!loading && <Cast castData={castData} />}

      {/* similar movies section  */}
      {!loading && (
        <MovieList
          title="Related Movies"
          data={similarMovies}
          hideSeeAll={true}
        />
      )}
    </ScrollView>
  );
};
