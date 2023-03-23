import React, { useState, useEffect } from "react";
//import axios from "axios";
import { StyleSheet, Text, View, Image, Pressable, Alert } from "react-native";
import { TextInput } from "react-native-paper";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { API_BASE_URL } from '../../config';

function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const Userlogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Empty field", "All fields are required!", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);

      return;
    }
    try {
      console.log(email);
      const response = await axios.post(`${API_BASE_URL}/auth/login/`, {
        email: email,
        password: password,
      });
      console.log(response.data.token);
      await SecureStore.setItemAsync("token", response.data.token);
      Alert.alert("Login successfull", "Login to continue", [
        {
          text: "OK",
          onPress: () => {
            setEmail("");
            setPassword("");

            navigation.navigate("menu");
          },
        },
      ]);
      // handle successful login here

      navigation.navigate("menu");
    } catch (error) {
      console.log(error);
      // handle login error here
    }
  };

  // function Userlogin() {
  //   if (!email.trim() || !password.trim()) {
  //     Alert.alert("Empty field", "All fields are required!", [
  //       { text: "OK", onPress: () => console.log("OK Pressed") },
  //     ]);

  //     return;
  //   }
  //   fetch(
  //     "http://192.168.1.3:8000/api/v1/Users/login/?email=" +
  //       email +
  //       "&password=" +
  //       password,
  //     {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   )
  //     .then((resp) => resp.json())
  //     .then((data) => {
  //       console.log(data.length);
  //       if (data.length === 0) {
  //         Alert.alert("Login Failed", "Invalid email or password", [
  //           { text: "OK" },
  //         ]);
  //         return;
  //       }
  //       console.log(data[0].name);
  //       global.user_id = data[0].email;
  //       navigation.navigate("menu");
  //     })
  //     .catch((error) => console.log("Error", error));
  // }

  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <Image style={styles.img} source={require("../assets/signers.jpg")} />
      </View>
      <View style={{ alignItems: "flex-end" }}>
        <Text style={styles.ttext}>Signers</Text>
        <Text style={styles.ttext}>Academy</Text>
      </View>

      <View>
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "center",
            letterSpacing: 0.2,
          }}>
          Hello Again!
        </Text>
        <Text
          style={{
            color: "#808080",
            fontWeight: "bold",
            textAlign: "center",
            fontSize: 12,
          }}>
          Sign in to continue
        </Text>
      </View>
      <View style={styles.banner}>
        <TextInput
          textColor='white'
          mode='outlined'
          label='Email'
          value={email}
          onChangeText={setEmail}
          activeOutlineColor='#FF3131'
          outlineColor='#899499'
          style={styles.textInput}></TextInput>
        <TextInput
          secureTextEntry={true}
          textColor='white'
          mode='outlined'
          label='Password'
          value={password}
          onChangeText={setPassword}
          activeOutlineColor='#FF3131'
          outlineColor='#899499'
          style={styles.textInput}></TextInput>

        <Pressable style={styles.btn} onPress={Userlogin}>
          {/* onPress={() => navigation.navigate("menu")}> */}
          <Text style={{ color: "white", letterSpacing: 0.2 }}>Log in</Text>
        </Pressable>

        <Text //forgot password
          style={{
            color: "#7393B3",
            fontWeight: "bold",
            fontSize: 12,
          }}>
          Forgot password?
        </Text>
      </View>

      <Text
        style={{
          color: "white",

          fontWeight: "bold",
          textAlign: "center",
          letterSpacing: 0.2,
        }}>
        or
      </Text>

      <View style={{ alignItems: "center" }}>
        <Pressable
          style={styles.btn2}
          onPress={() => navigation.navigate("menu", {})}>
          <Text style={{ color: "white", letterSpacing: 0.2 }}>
            Continue as guest
          </Text>
        </Pressable>
      </View>

      <View
        style={{
          borderBottomColor: "grey",
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
      />
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Text style={{ color: "white", fontSize: 12 }}>
          Don't have an account?{" "}
        </Text>
        <Text
          style={{ color: "#7393B3", fontWeight: "bold", fontSize: 12 }}
          onPress={() => navigation.navigate("signup")}>
          Sign up
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "black",
    paddingBottom: "10%",
    paddingTop: "15%",
    paddingLeft: "5%",
    paddingRight: "5%",
  },
  ttext: {
    color: "white",
    letterSpacing: 0.2,
  },
  banner: {
    flexDirection: "column",
    alignItems: "center",
  },
  img: {
    width: "70%",
    height: 100,
    resizeMode: "stretch",
  },
  textInput: {
    backgroundColor: "black",
    width: "70%",
    marginBottom: "5%",
  },
  btn: {
    backgroundColor: "#FF3131",
    width: "70%",
    alignItems: "center",
    paddingTop: "2%",
    paddingBottom: "2%",
    borderRadius: 2,
    marginBottom: "5%",
  },
  btn2: {
    backgroundColor: "#B2BEB5",
    width: "70%",
    alignItems: "center",
    paddingTop: "2%",
    paddingBottom: "2%",
    borderRadius: 2,
    marginBottom: "5%",
  },
});
export default Login;
