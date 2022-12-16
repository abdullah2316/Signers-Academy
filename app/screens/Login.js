import React from "react";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { TextInput } from "react-native-paper";
function Login({ navigation }) {
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

        <Pressable
          style={styles.btn}
          onPress={() => navigation.navigate("menu")}>
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
          onPress={() => navigation.navigate("guestmenu")}>
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
