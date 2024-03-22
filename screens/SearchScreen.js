import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  FlatList,
  Button,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import AnimeCard from "../components/AnimeCard";
import { useNavigation } from "@react-navigation/native";
import { MagnifyingGlassIcon } from "react-native-heroicons/solid";
import axios from "axios";

const SearchScreen = () => {
  const navigation = useNavigation();

  const [animes, setAnimes] = useState([]);
  const [searchText, setSearchText] = useState("Search your animes");
  const [error, setError] = useState(false);

  const searchAnimes = () => {
    if (searchText.length === 0 || searchText === "Search your animes") return;

    axios
      .get(`https://api.jikan.moe/v4/anime?q=${searchText}`) //https://api.jikan.moe/v4/top/anime
      .then((response) => {
        var result = [];
        response.data.data.forEach((item) => {
          // build genres
          var genres = "";
          item.genres.forEach((genre, index) => {
            if (index === 0) genres = genres + genre.name;
            else genres = genres + ", " + genre.name;
          });

          // build result array from data
          result.push({
            id: item.mal_id,
            thumbImage: item.images.webp.large_image_url,
            promoImage: item.trailer.images.maximum_image_url,
            trailerUrl: item.trailer.url,
            title: item.title_english,
            episodes: item.episodes,
            tvRating: item.rating,
            synopsis: item.synopsis,
            genre: genres,
            originalAirDate: item.aired.string,
          });
        });
        setAnimes(result);
        setError(false);
      })
      .catch((error) => {
        setError(true);
      });
  };

  // disable the title
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView>
      <View className="flex-row flex-1 m-4 space-x-2 bg-gray-200 p-3 rounded-md items-center">
        <MagnifyingGlassIcon size={24} color={"#00CCBB"} />
        <TextInput
          className="text-lg -mt-2"
          placeholder={searchText}
          onChangeText={(newText) => setSearchText(newText)}
          keyboardType="default"
          onSubmitEditing={() => searchAnimes()}
        />
      </View>
      {/* display for search results */}
      {error === true ? (
        <View>
          <Text className="text-gray-400 font-bold text-2xl text-center mt-48">
            Something went wrong
          </Text>
          <Button
            title="Try Again"
            color="#00CCBB"
            onPress={() => searchAnimes()}
          />
        </View>
      ) : (
        <FlatList
          data={animes}
          renderItem={({ item }) => (
            <AnimeCard
              id={item.id}
              thumbImage={item.thumbImage}
              promoImage={item.promoImage}
              trailerUrl={item.trailerUrl}
              title={item.title}
              episodes={item.episodes}
              tvRating={item.tvRating}
              synopsis={item.synopsis}
              genre={item.genre}
              originalAirDate={item.originalAirDate}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </SafeAreaView>
  );
};

export default SearchScreen;
