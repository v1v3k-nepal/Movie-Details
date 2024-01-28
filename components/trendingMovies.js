import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import { fallbackMoviePoster, image500 } from "../api/movieDb";

export const TrendingMovies = ({ data }) => {
  const { height, width } = Dimensions.get("window");
  const navigation = useNavigation();

  const handleClick = (data) => {
    navigation.navigate("Movie", data);
  };
  return (
    <View className="mb-8">
      <Text className="text-white text-xl mx-4 my-4">Trending</Text>
      <Carousel
        data={data}
        renderItem={({ item }) => (
          <MovieCard data={item} handleClick={handleClick} />
        )}
        firstItem={1}
        inactiveSlideOpacity={0.6}
        sliderWidth={width}
        itemWidth={width * 0.62}
        slideStyle={{ display: "flex", alignItems: "center" }}
      />
    </View>
  );
};

export const MovieCard = ({ data, handleClick }) => {
  const { height, width } = Dimensions.get("window");

  return (
    <View>
      <TouchableWithoutFeedback onPress={() => handleClick(data)}>
        <Image
          source={
            // require("../assets/images/moviePoster2.png")
            { uri: image500(data?.poster_path) || fallbackMoviePoster }
          }
          style={{ height: height * 0.4, width: width * 0.6 }}
          className="rounded-3xl"
        />
      </TouchableWithoutFeedback>
    </View>
  );
};
