import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from "react-native";
import { styles } from "../theme";
import { useNavigation } from "@react-navigation/native";
import { Loading } from "./loading";
import * as Progress from "react-native-progress";
import { theme } from "../theme";
import { fallbackMoviePoster, image500 } from "../api/movieDb";

export const MovieList = ({ title, data, hideSeeAll }) => {
  const navigation = useNavigation();
  const { height, width } = Dimensions.get("window");
  // const movieName = "Ant Man the Spider Universe Home Coming";
  const [loading, setLoading] = useState(true);
  return (
    <View className="mb-8 space-y-4">
      <View className="mx-4 flex-row justify-between items-center">
        <Text className="text-xl text-white">{title}</Text>
        <TouchableOpacity>
          {!hideSeeAll && (
            <Text style={styles.text} className="text-lg">
              See All
            </Text>
          )}
        </TouchableOpacity>
      </View>
      {/* Movies in a row */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {data?.map((item, index) => {
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => navigation.push("Movie", item)}
            >
              <View className="space-y-1 flex-column mr-4">
                <Image
                  source={
                    // require("../assets/images/moviePoster1.png")
                    { uri: image500(item?.poster_path) || fallbackMoviePoster }
                  }
                  style={{ height: height * 0.22, width: width * 0.33 }}
                  className="rounded-3xl"
                />
                <Text className="text-neutral-300 ml-1">
                  {item?.title?.length > 14
                    ? item?.title?.slice(0, 14) + "..."
                    : item?.title}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
};
