import { Button, FlatList, SafeAreaView, Text, View } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AnimeCard from "../components/AnimeCard";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [animes, setAnimes] = useState([]);
  const [error, setError] = useState(false);

  // disable the title
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const fetchAnimes = () => {
    axios
      .get("https://api.jikan.moe/v4/top/anime")
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

  useEffect(() => {
    fetchAnimes();
  }, []);

  return (
    <SafeAreaView>
      {error === true ? (
        <View>
          <Text className="text-gray-400 font-bold text-2xl text-center mt-48">
            Something went wrong
          </Text>
          <Button
            title="Try Again"
            color="#00CCBB"
            onPress={() => fetchAnimes()}
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

export default HomeScreen;
