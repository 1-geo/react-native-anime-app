import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { HeartIcon as HeartFilledIcon } from "react-native-heroicons/solid";
import { HeartIcon as HeartIconOutline } from "react-native-heroicons/outline";
import { useDispatch, useSelector } from "react-redux";
import {
  addToAnimes,
  getAnimeWithId,
  removeFromAnimes,
} from "../features/animeSlice";

const AnimeDetailScreen = () => {
  const {
    params: {
      id,
      thumbImage,
      promoImage,
      trailerUrl,
      title,
      episodes,
      tvRating,
      synopsis,
      genre,
      originalAirDate,
    },
  } = useRoute();

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Details",
    });
  }, []);

  const isFavorited = useSelector((state) => getAnimeWithId(state, id));

  const actionDipatcher = useDispatch();
  const toggleFavorite = () => {
    if (isFavorited) actionDipatcher(removeFromAnimes({ id }));
    else actionDipatcher(addToAnimes({ id }));
  };

  return (
    <ScrollView>
      <View className="relative">
        <Image
          defaultSource={require("../assets/manga-placeholder.png")}
          source={{
            uri: promoImage,
          }}
          className="h-56 w-full p-4"
        />
        <TouchableOpacity className="absolute top-4 right-4">
          {isFavorited === true ? (
            <HeartFilledIcon
              size={28}
              color="#ff0000"
              onPress={toggleFavorite}
            />
          ) : (
            <HeartIconOutline
              size={28}
              color="black"
              onPress={toggleFavorite}
            />
          )}
        </TouchableOpacity>
        <View className="pl-4 pr-4 pt-2 pb-28">
          <Text className="text-3xl font-bold">{title}</Text>
          <Text
            className="text-sm font-bold mt-2"
            numberOfLines={6}
            ellipsizeMode="tail"
          >
            Genre: <Text className="font-normal">{genre}</Text>
          </Text>
          <Text
            className="text-sm font-bold"
            numberOfLines={6}
            ellipsizeMode="tail"
          >
            Episodes: <Text className="font-normal">{episodes}</Text>
          </Text>
          <Text
            className="text-sm font-bold"
            numberOfLines={6}
            ellipsizeMode="tail"
          >
            Aired on: <Text className="font-normal">{originalAirDate}</Text>
          </Text>
          <Text
            className="text-sm font-bold"
            numberOfLines={6}
            ellipsizeMode="tail"
          >
            Synopsis
          </Text>
          <Text ellipsizeMode="tail" className="text-sm text-gray-900 mt-1">
            {synopsis}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default AnimeDetailScreen;
