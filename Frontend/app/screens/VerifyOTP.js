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

function VerifyOTP({ navigation, route }) {
  const [otp, setOTP] = useState("");
  const [password, setPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const SendOTP = async () => {
    console.log("wtf");
    if (!otp.trim()) {
      Alert.alert("Empty field", "All fields are required!", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }
    try {
      console.log(route.params.em, "   email");
      const response = await axios.post(`${API_BASE_URL}/user/verifyotp/`, {
        email: route.params.em,
        otp: otp,
      });
      setModalVisible(true);
      //navigation.navigate("menu");
    } catch (error) {
      Alert.alert("OTP verification Failed", "Invalid OTP", [
        {
          text: "OK",
        },
      ]);
      console.log(error);
    }

    return;
  };
  const Reset = async () => {
    if (!password.trim()) {
      Alert.alert("Empty field", "Password can't be empty", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
      return;
    }
    try {
      const response = await axios.post(`${API_BASE_URL}/user/setpassword/`, {
        email: route.params.em,
        otp: otp,
        password: password,
      });
      setOTP("");
      setPassword("");
      setModalVisible(false);
      Alert.alert(
        "Success",
        "Password changed successfully,Login to continue",
        [
          {
            text: "OK",
          },
        ]
      );
      navigation.navigate("login");
    } catch (error) {
      Alert.alert("Failed", "Couldnot Change Password", [
        {
          text: "OK",
        },
      ]);
      console.log(error);
    }

    return;
  };
  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <Image style={styles.img} source={require("../assets/signers.png")} />
      </View>
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
          Enter your 5 digit OTP for verification
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
              <Text style={styles.ttext}>Enter New Password</Text>
              <TextInput
                secureTextEntry={true}
                textColor='black'
                mode='outlined'
                label='password'
                value={password}
                onChangeText={setPassword}
                activeOutlineColor='#5DBB63'
                outlineColor='#899499'
                style={styles.textInput}></TextInput>
              <Pressable onPress={() => Reset()} style={styles.btn}>
                <Text>Reset</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        <TextInput
          textColor='black'
          mode='outlined'
          label='OTP'
          value={otp}
          keyboardType='numeric'
          onChangeText={setOTP}
          activeOutlineColor='#5DBB63'
          outlineColor='#899499'
          style={styles.textInput}></TextInput>

        <Pressable onPress={() => SendOTP()} style={styles.btn}>
          {/* onPress={() => navigation.navigate("menu")}> */}
          <Text style={{ color: "white", letterSpacing: 0.2 }}>Verify OTP</Text>
        </Pressable>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
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

export default VerifyOTP;
