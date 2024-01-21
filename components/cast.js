import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export const Cast = ({ castData }) => {
  const characterName = "Tony Stark";
  const personName = "Robert Downey Jr.";
  const navigation = useNavigation();

  return (
    <View className="my-6">
      <Text className="text-white mx-4 text-lg mb-5">Top Cast</Text>
      <ScrollView horizontal contentContainerStyle={{ paddingHorizontal: 15 }}>
        {castData &&
          castData.map((person, index) => {
            return (
              <TouchableOpacity
                key={index}
                className="mr-4"
                onPress={() => navigation.navigate("Person", person)}
              >
                <View className="overflow-hidden rounded-full h-20 w-20 items-center border border-neutral-500">
                  <Image
                    source={require("../assets/images/castImage1.png")}
                    className="rounded-2xl h-24 w-20"
                  />
                </View>
                <Text className="text-white text-xs mt-1 ml-1">
                  {personName.length > 10
                    ? personName.slice(0, 10) + "..."
                    : personName}
                </Text>
                <Text className="text-neutral-400 text-xs mt-1 ml-1">
                  {characterName.length > 10
                    ? characterName.slice(0, 10) + "..."
                    : characterName}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
};
