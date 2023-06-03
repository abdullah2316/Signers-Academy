// import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
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
import MyMenu from "./app/screens/Menu.js";
import Favorites from "./app/screens/Favorites.js";
import Recent from "./app/screens/Recent.js";
import PSLPlayer from "./app/screens/PslPlayer.js";
import Capture from "./app/screens/Capture.js";
import Display from "./app/screens/DisplayImg.js";
import Dictionary from "./app/screens/Dictionary.js";
import AddWord from "./app/screens/AddWord.js";
import otp from "./app/screens/otp.js";
import * as SecureStore from "expo-secure-store";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function App() {
  const Stack = createNativeStackNavigator();
  const [startpage, setStartpage] = useState(null);

  useEffect(() => {
    async function checkKey() {
      const token = await SecureStore.getItemAsync("token");
      console.log(token);
      if (Boolean(token)) {
        console.log("ououo");
        setStartpage("menu");
        console.log(startpage);
      } else {
        console.log("nop");
        setStartpage("login");
      }
    }
    checkKey();
  }, [startpage]);
  return (
    <>
    {startpage && (
      <><SafeAreaView style={styles.safe}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={startpage}
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name='login' component={MyMenu} />
          <Stack.Screen name='signup' component={Signup} />
          <Stack.Screen name='menu' component={MyMenu} />
          <Stack.Screen name='favorites' component={Favorites} />
          <Stack.Screen name='recent' component={Recent} />
          <Stack.Screen name='capture' component={Capture} />
          <Stack.Screen name='display' component={Display} />
          <Stack.Screen name='player' component={PSLPlayer} />
          <Stack.Screen name='dictionary' component={Dictionary} />
          <Stack.Screen name='otp' component={otp} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView></>)}
    </>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
