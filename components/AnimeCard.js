import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { HeartIcon as HeartFilledIcon } from "react-native-heroicons/solid";
import { HeartIcon as HeartIconOutline } from "react-native-heroicons/outline";
import { useDispatch, useSelector } from "react-redux";
import {
  addToAnimes,
  getAnimeWithId,
  removeFromAnimes,
} from "../features/animeSlice";

const AnimeCard = ({
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
}) => {
  const navigation = useNavigation();

  const isFavorited = useSelector((state) => getAnimeWithId(state, id));

  const actionDipatcher = useDispatch();
  const toggleFavorite = () => {
    if (isFavorited) actionDipatcher(removeFromAnimes({ id }));
    else actionDipatcher(addToAnimes({ id }));
  };

  return (
    <TouchableOpacity
      className="p-4"
      onPress={() => {
        navigation.navigate("Details", {
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
        });
      }}
    >
      <View className="flex-row">
        <Image
          source={{
            uri: thumbImage,
          }}
          className="h-34 w-32 rounded-md"
        />
        <View className="flex-1 ml-2 -mt-1">
          <Text className="text-lg font-bold text-[#00CCBB]">{title}</Text>
          <Text
            className="text-sm mt-1 font-bold"
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            Description: <Text className="font-normal">{synopsis}</Text>
          </Text>
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
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default AnimeCard;
