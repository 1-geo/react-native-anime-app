import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { TailwindProvider } from "tailwindcss-react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import AnimeDetailScreen from "./screens/AnimeDetailScreen";
import SearchScreen from "./screens/SearchScreen";
import { HomeIcon as HomeIcon } from "react-native-heroicons/solid";
import { MagnifyingGlassIcon } from "react-native-heroicons/solid";
import { Provider } from "react-redux";
import { store } from "./store";
import LandingScreen from "./screens/LandingScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <TailwindProvider>
          <StackNavigator />
        </TailwindProvider>
      </Provider>
    </NavigationContainer>
  );
}

function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="Home" component={TabNavigator} />
      <Stack.Screen name="Details" component={AnimeDetailScreen} />
    </Stack.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Animes"
        component={HomeScreen}
        options={{
          tabBarActiveTintColor: "#00CCBB",
          tabBarLabelStyle: {
            fontSize: 14,
          },
          tabBarIcon: (tabInfo) => (
            <HomeIcon
              size={24}
              color={tabInfo.focused ? "#00CCBB" : "#8e8e93"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarActiveTintColor: "#00CCBB",
          tabBarLabelStyle: {
            fontSize: 14,
          },
          tabBarIcon: (tabInfo) => (
            <MagnifyingGlassIcon
              size={24}
              color={tabInfo.focused ? "#00CCBB" : "#8e8e93"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
