import { Image } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { OnboardFlow } from "react-native-onboard";

const LandingScreen = () => {
  const navigation = useNavigation();

  // disable the title
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <OnboardFlow
      pages={[
        {
          title: "Browse",
          subtitle: "Browse through your favorite anime characters",
          imageUri: Image.resolveAssetSource(
            require("../assets/manga-placeholder.png")
          ).uri,
        },
        {
          title: "Search",
          subtitle: "Search your favorite anime characters and favorite them",
          imageUri: Image.resolveAssetSource(
            require("../assets/anime-intro-2.webp")
          ).uri,
        },
      ]}
      type={"fullscreen"}
      primaryColor="#00CCBB"
      onDone={() => {
        navigation.replace("Home");
      }}
      primaryButtonStyle={{ backgroundColor: "#00CCBB" }}
      primaryButtonTextStyle={{ fontWeight: "bold" }}
    />
  );
};

export default LandingScreen;
