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
