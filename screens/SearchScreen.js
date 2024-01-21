import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { XMarkIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/core";

export const SearchScreen = () => {
  const navigation = useNavigation();
  const [searchResults, setSearchResults] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 8,
  ]);
  //   const searchResults = [];
  const { height, width } = Dimensions.get("window");
  const movieName =
    "The Adventures of Buckaroo Banzai Across the 8th Dimension";
  return (
    <SafeAreaView className="flex-1 bg-neutral-800">
      <View className="flex-row items-center justify-between border-2 border-neutral-500 rounded-full my-3 mx-4 p-1">
        <TextInput
          placeholder="Search Movie"
          placeholderTextColor="lightgray"
          className="text-white text-base tracking-wider w-full pl-6 font-semibold"
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          className="rounded-full absolute p-1 right-1 bg-neutral-500"
        >
          <XMarkIcon size={20} color="white" />
        </TouchableOpacity>
      </View>
      {searchResults.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          className="space-y-3"
        >
          <Text className="text-white font-semibold ml-1 text-base">
            Results ({searchResults?.length})
          </Text>
          <View className="flex-row justify-between flex-wrap">
            {searchResults.map((item, index) => (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => navigation.push("Movie", item)}
              >
                <View className="space-y-2 mb-4">
                  <Image
                    source={require("../assets/images/moviePoster1.png")}
                    style={{ height: 0.3 * height, width: 0.44 * width }}
                    className="rounded-3xl"
                  />
                  <Text className="text-neutral-300 ml-1 text-sm">
                    {movieName.length > 22
                      ? movieName.slice(0, 22) + "..."
                      : movieName}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            ))}
          </View>
        </ScrollView>
      ) : (
        <View className="items-center mt-6">
          <Text className="text-white">No Results Found</Text>
          <Image
            source={require("../assets/images/movieTime.png")}
            className="h-96 w-96"
          />
        </View>
      )}
    </SafeAreaView>
  );
};
