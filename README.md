# React Native Anime App

#### A React Native app consuming this [cool api](https://docs.api.jikan.moe/) to fetch anime characters. Functionalities included browse characters, search characters, favorite (persisted to memory not local storage).

`Dependencies`:

- Expo (wrapper around ReactNative - quick to develop and deploy)
- react navigation (bottom tabs, navigation stack)
- tailwind css (styling lib for css)
- axios (http client library)
- react-native-onboard (libray with onboarding suppport)
- redux (persistance in memory store for favorites)
- hero icons (convenient tool to add icons into the app)

### How to Run

1. `Option1 Expo Go`

- Requires Xcode, iOS Simulator installed
- Open iOS Simulator
- Type in root project `npx expo start` then select `i`

2. `Option2 Android`

- Requires Android SDK, JDK setup.
- Connect physical device and make sure usb debugging mode is enabled.
- Type in root project `npx expo run:android --device`


### App Screen Share
<img src="app-demo.gif" width="400" height="650">
