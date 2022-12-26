// import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";

import Signup from "./app/screens/Signup.js";
import Login from "./app/screens/Login.js";
import Menu from "./app/screens/Menu.js";
import GuestMenu from "./app/screens/GuestMenu.js";
import Favorites from "./app/screens/Favorites.js";
import Recent from "./app/screens/Recent.js";
import PSLPlayer from "./app/screens/PslPlayer.js";
import Capture from "./app/screens/Capture.js";
import Display from "./app/screens/DisplayImg.js";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <SafeAreaView style={styles.safe}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='login'
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name='login' component={Login} />
          <Stack.Screen name='signup' component={Signup} />
          <Stack.Screen name='menu' component={Menu} />
          <Stack.Screen name='guestmenu' component={GuestMenu} />
          <Stack.Screen name='favorites' component={Favorites} />
          <Stack.Screen name='recent' component={Recent} />
          <Stack.Screen name='capture' component={Capture} />
          <Stack.Screen name='display' component={Display} />
          <Stack.Screen name='player' component={PSLPlayer} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
