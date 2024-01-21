import React from "react";
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

export const MovieList = ({ title, data, hideSeeAll }) => {
  const navigation = useNavigation();
  const { height, width } = Dimensions.get("window");
  const movieName = "Ant Man the Spider Universe Home Coming";
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
        {data.map((item, index) => {
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => navigation.push("Movie", item)}
            >
              <View className="space-y-1 flex-column mr-4">
                <Image
                  source={require("../assets/images/moviePoster1.png")}
                  style={{ height: height * 0.22, width: width * 0.33 }}
                  className="rounded-3xl"
                />
                <Text className="text-neutral-300 ml-1">
                  {movieName.length > 14
                    ? movieName.slice(0, 14) + "..."
                    : movieName}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
};
