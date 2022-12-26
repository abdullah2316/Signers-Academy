import React from "react";
import { Header } from "@react-navigation/native-stack";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  KeyboardAvoidingView,
  StatusBar,
} from "react-native";
import { TextInput } from "react-native-paper";
function Signup({ navigation }) {
  const vh = StatusBar.currentHeight;
  console.log(StatusBar.currentHeight);
  return (
   
      <View style={styles.container}>
        <View style={{ alignItems: "flex-end" }}>
          <Text style={styles.ttext}>Signers</Text>
          <Text style={styles.ttext}>Academy</Text>
        </View>

        <View style={styles.banner}>
          <Image style={styles.img} source={require("../assets/signers.jpg")} />
        </View>
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "center",
            letterSpacing: 0.2,
          }}>
          Sign Up For Free
        </Text>
        {/* <Text style={{color:"#FF3131"}}>Welcome to signers academy</Text> */}

        <View style={styles.banner}>
          <TextInput
            textColor='white'
            mode='outlined'
            label='Username'
            activeOutlineColor='#FF3131'
            outlineColor='#899499'
            style={styles.textInput}></TextInput>
          <TextInput
            secureTextEntry={true}
            textColor='white'
            mode='outlined'
            label='Password'
            activeOutlineColor='#FF3131'
            outlineColor='#899499'
            style={styles.textInput}></TextInput>
          <TextInput
            textColor='white'
            mode='outlined'
            label='Email'
            activeOutlineColor='#FF3131'
            outlineColor='#899499'
            style={styles.textInput}></TextInput>
          <TextInput
            textColor='white'
            mode='outlined'
            label='Contact'
            activeOutlineColor='#FF3131'
            outlineColor='#899499'
            style={styles.textInput}></TextInput>
        </View>

        <View style={{ alignItems: "center" }}>
          <Pressable style={styles.btn}>
            <Text style={{ color: "white", letterSpacing: 0.2 }}>Sign up</Text>
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
            Already have an account?{" "}
          </Text>
          <Text
            style={{ color: "#7393B3", fontWeight: "bold", fontSize: 12 }}
            onPress={() => {
              navigation.navigate("login");
            }}>
            Login
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
  banner: {
    flexDirection: "column",
    alignItems: "center",
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
  },
  img: {
    width: "70%",
    height: 100,
    resizeMode: "stretch",
  },
  ttext: {
    color: "white",
    letterSpacing: 0.2,
  },
});

export default Signup;
