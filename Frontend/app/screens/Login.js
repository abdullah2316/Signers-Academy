import React, { useState, useEffect } from "react";
//import axios from "axios";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Alert,
  Modal,
  Switch,
} from "react-native";
import { Icon } from "react-native-elements";
import { TextInput } from "react-native-paper";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { API_BASE_URL } from "../../config";

function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const Userlogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Empty field", "All fields are required!", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);

      return;
    }
    try {
      console.log(email);

      var response;
      if (isEnabled) {
        response = await axios.post(`${API_BASE_URL}/auth/alogin/`, {
          email: email,
          password: password,
        });
      } else {
        response = await axios.post(`${API_BASE_URL}/auth/login/`, {
          email: email,
          password: password,
        });
      }

      console.log(response.data.token);
      await SecureStore.setItemAsync("token", response.data.token);
      Alert.alert("Login successfull", "continue", [
        {
          text: "OK",
          onPress: () => {
            setEmail("");
            setPassword("");
            isEnabled
              ? navigation.navigate("adminmenu")
              : navigation.navigate("menu");
          },
        },
      ]);
      // handle successful login here

      // navigation.navigate("menu");
    } catch (error) {
      Alert.alert("Login Failed", "Invalid Username/Password", [
        {
          text: "OK",
        },
      ]);
      console.log(error);

      // handle login error here
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <Image style={styles.img} source={require("../assets/signers.png")} />
      </View>
      <View style={{ alignItems: "center" }}>
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
        <Modal
          animationType='fade'
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalstyle}>
              <Pressable
                style={{ alignSelf: "flex-end" }}
                onPress={() => setModalVisible(!modalVisible)}>
                <Icon
                  style={{
                    backgroundColor: "red",
                    borderWidth: 2,
                    borderRadius: 15,
                  }}
                  name='close'
                  color='white'
                  size={20}
                  type='material'
                />
              </Pressable>
              <Text style={styles.ttext}>Enter Email to receive an OTP</Text>
              <TextInput
                textColor='black'
                mode='outlined'
                label='Email'
                value={email}
                onChangeText={setEmail}
                activeOutlineColor='#5DBB63'
                outlineColor='#899499'
                style={styles.textInput}></TextInput>
              <Pressable style={styles.btn}>
                <Text>get OTP</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        <TextInput
          textColor='black'
          mode='outlined'
          label='Email'
          value={email}
          onChangeText={setEmail}
          activeOutlineColor='#5DBB63'
          outlineColor='#899499'
          style={styles.textInput}></TextInput>
        <TextInput
          secureTextEntry={true}
          textColor='black'
          mode='outlined'
          label='Password'
          value={password}
          onChangeText={setPassword}
          activeOutlineColor='#5DBB63'
          outlineColor='#899499'
          style={styles.textInput}></TextInput>

        <Pressable style={styles.btn} onPress={Userlogin}>
          {/* onPress={() => navigation.navigate("menu")}> */}
          <Text style={{ color: "white", letterSpacing: 0.2 }}>Log in</Text>
        </Pressable>
        <Pressable onPress={() => setModalVisible(true)}>
          <Text
            style={{
              color: "#7393B3",
              fontWeight: "bold",
              fontSize: 12,
            }}>
            Forgot password?
          </Text>
        </Pressable>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              paddingTop: "5%",
              color: "#7393B3",
              fontWeight: "bold",
              fontSize: 14,
            }}>
            Admin
          </Text>
          <Switch
            trackColor={{ false: "#767577", true: "#5DBB63" }}
            thumbColor={isEnabled ? "#5DBB63" : "#f4f3f4"}
            ios_backgroundColor='#3e3e3e'
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
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
        <Text style={{ color: "black", fontSize: 12 }}>
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
    backgroundColor: "white",
    paddingBottom: "10%",
    paddingTop: "15%",
    paddingLeft: "5%",
    paddingRight: "5%",
  },
  ttext: {
    color: "black",
    letterSpacing: 0.2,
    fontSize: 20,
    fontWeight: "bold",
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
    backgroundColor: "white",
    color: "black",
    width: "70%",
    marginBottom: "5%",
  },
  btn: {
    backgroundColor: "#5DBB63",
    width: "70%",
    alignItems: "center",
    paddingTop: "2%",
    paddingBottom: "2%",
    borderRadius: 100,
    marginBottom: "5%",
  },
  btn2: {
    backgroundColor: "#24743F",
    width: "70%",
    alignItems: "center",
    paddingTop: "2%",
    paddingBottom: "2%",
    borderRadius: 100,
    marginBottom: "5%",
  },
  modalstyle: {
    margin: "4%",
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#B2BEB5",
    borderRadius: 20,
    padding: "6%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    marginTop: "12%",
  },
});
export default Login;
